import { useGLTF } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

/*
    Notes:
    - Export the model as a glTF file (.glb/.gltf) from Blender or any 3D modeling software.
    - If you want to make something interactable in the model, you need to separate the objects in Blender before exporting
        - If not separated, the whole model will be treated as one object and you won't be able to interact with individual parts.
        - Name them something meaningful in Blender so you can easily identify them in the code.

    How to make the whole model interactable
    To make the objects inside the model interactable while keeping the whole model visible, 
    you handle them as individual components within that single scene:
    - The Component Structure: When you run npx gltfjsx model.glb --types, the tool creates a single 
    React component that contains multiple <mesh /> elements. Each mesh represents an object from your model. 
        - In the current case, just use the dynamic model, make sure the names aren't duplicated if using multiple models
        - Run the script below and update the model name accordingly if you want to use multiple models with the same object names (e.g., multiple chairs all named "Chair" in Blender will cause conflicts in React)
    - Targeted Interactivity: You don't have to do anything special to "show" the whole model; 
    simply rendering the generated component does that. To make it interactive, you just attach onClick or onPointerOver to the specific mesh you want to target inside that component. 

    - Separation is Key: If the model you downloaded from Sketchfab has everything "joined" as one big object, 
    you must first open it in Blender, separate the parts (as mentioned before), and then re-export it. 
    This gives you the individual nodes you need in your React code to trigger clicks on specific parts


    python script to separate objects in Blender:
    import bpy

    for obj in bpy.context.scene.objects:
        if obj.type == 'MESH':
            # This renames the container AND the geometry inside it
            new_name = "Item_" + obj.name if not obj.name.startswith("Item_") else obj.name
            obj.name = new_name
            if obj.data:
                obj.data.name = new_name

    The script that can be used to add a prefix to all objects in a model (useful when you have multiple models with overlapping object names):
    import bpy

    # Change this for every file (e.g., "Car", "House", "UI")
    model_prefix = "Car_" 

    for obj in bpy.context.scene.objects:
        if obj.type == 'MESH':
            if not obj.name.startswith(model_prefix):
                obj.name = model_prefix + obj.name
                if obj.data:
                    obj.data.name = model_prefix + obj.name

*/

export function DynamicModel({
  url,
  onSelect,
  interactiveItemNames = ["Item_Lamp"],
}: {
  url: string;
  onSelect?: (name: string) => void;
  interactiveItemNames?: string[];
}) {
  // Directly load the scene. No hardcoded nodes or materials.
  const { scene } = useGLTF(url);
  const hoveredMaterialRef = useRef<THREE.Material | THREE.Material[] | null>(null);

  //   Put other actions here based on object names in the model
  const actions: Record<string, () => void> = {
    Item_Lamp: () => turnOnLamp(),
  };

  const turnOnLamp = () => {
    console.log("Turning on the lamp!");
    // Implement your lamp logic here (e.g., add a PointLight to the scene, change material emissive, etc.)
  };

  const getObjectName = (object: THREE.Object3D) => object.name || object.parent?.name || "Unnamed Object";

  const isInteractiveObject = (object: THREE.Object3D) => {
    const name = getObjectName(object);
    return interactiveItemNames.includes(name);
  };

  const applyHoverHighlight = (mesh: THREE.Mesh) => {
    if (hoveredMaterialRef.current) {
      return;
    }

    const { material } = mesh;

    if (Array.isArray(material)) {
      const clonedMaterials = material.map((entry) => entry.clone());
      mesh.material = clonedMaterials as unknown as THREE.Material[];
      hoveredMaterialRef.current = material;

      clonedMaterials.forEach((entry) => {
        if ("emissive" in entry) {
          (entry as unknown as { emissive: THREE.Color }).emissive.set("#f472b6");
        }
        if ("emissiveIntensity" in entry) {
          (entry as unknown as { emissiveIntensity: number }).emissiveIntensity = 0.8;
        }
        if ("color" in entry) {
          (entry as unknown as { color: THREE.Color }).color.offsetHSL(0.05, 0.1, 0.18);
        }
      });
      return;
    }

    const clonedMaterial = material.clone() as THREE.Material;
    mesh.material = clonedMaterial;
    hoveredMaterialRef.current = material;

    if ("emissive" in clonedMaterial) {
      (clonedMaterial as unknown as { emissive: THREE.Color }).emissive.set("#f472b6");
    }
    if ("emissiveIntensity" in clonedMaterial) {
      (clonedMaterial as unknown as { emissiveIntensity: number }).emissiveIntensity = 0.8;
    }
    if ("color" in clonedMaterial) {
      (clonedMaterial as unknown as { color: THREE.Color }).color.offsetHSL(0.05, 0.1, 0.18);
    }
  };

  const clearHoverHighlight = (mesh: THREE.Mesh) => {
    const originalMaterial = hoveredMaterialRef.current;

    if (!originalMaterial) {
      return;
    }

    mesh.material = originalMaterial;
    hoveredMaterialRef.current = null;
  };

  return (
    <primitive
      object={scene}
      onPointerOver={(event: ThreeEvent<PointerEvent>) => {
        if (isInteractiveObject(event.object)) {
          document.body.style.cursor = "pointer";
          applyHoverHighlight(event.object as THREE.Mesh);
        }
      }}
      onPointerOut={(event: ThreeEvent<PointerEvent>) => {
        document.body.style.cursor = "auto";
        if (isInteractiveObject(event.object)) {
          clearHoverHighlight(event.object as THREE.Mesh);
        }
      }}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        // Not exactlty needed, used to differentiate between different models
        const name = getObjectName(e.object);
        onSelect?.(name);
        // Dynamic color change on whatever was clicked
        const mesh = e.object as THREE.Mesh;
        const material = mesh.material;
        if (!material) return;

        // Handle both single material and multi-material meshes
        if (Array.isArray(material)) {
          const cloned = material.map((m) => m.clone());
          mesh.material = cloned as unknown as THREE.Material[];
          cloned.forEach((m) => {
            if ("color" in m) {
              (m as unknown as { color: THREE.Color }).color.set("purple");
            }
          });
        } else {
          const cloned = material.clone() as THREE.Material;
          mesh.material = cloned;
          if ("color" in cloned) {
            (cloned as unknown as { color: THREE.Color }).color.set("purple");
          }
        }

        console.log(
          "Interactable Name:",
          name,
        );
        // Add your custom interaction logic here (e.g., open a modal, play a sound, etc.)
        if (actions[name]) {
          actions[name]();
        }
      }}
    />
  );
}
