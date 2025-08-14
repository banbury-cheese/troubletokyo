"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./PlateViewer3D.module.scss";

interface PlateViewer3DProps {
  modelSrc?: string; // Optional since we'll use the FBX model
  title?: string;
  colorOption?: number; // 1-6 for different color options (1=blue, 2=green, 3=red, 4=white, 5=yellow, 6=silver/metallic)
}

export default function PlateViewer3D({
  modelSrc,
  title,
  colorOption = 1,
}: PlateViewer3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const meshRef = useRef<THREE.Object3D | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentColorOption, setCurrentColorOption] = useState(colorOption);

  // Helper: prepare textures so the atlas doesn't tile or flip unexpectedly
  const prepareColorTexture = (tex: THREE.Texture) => {
    // Color textures should be in sRGB and not repeat
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.flipY = true; // FBX UVs generally expect default flipY=true for images
    tex.center.set(0.5, 0.5);
    tex.rotation = 0;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = rendererRef.current
      ? rendererRef.current.capabilities.getMaxAnisotropy()
      : 8;
    tex.needsUpdate = true;
    return tex;
  };
  const prepareDataTexture = (tex: THREE.Texture) => {
    // Non-color data should not repeat either to avoid seams
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.flipY = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    return tex;
  };

  // Handle color change
  const handleColorChange = (newColorOption: number) => {
    setCurrentColorOption(newColorOption);

    // Update material if mesh is loaded
    if (meshRef.current) {
      updateMeshColor(newColorOption);
    }
  };

  // Function to update mesh color
  const updateMeshColor = (colorNum: number) => {
    if (!meshRef.current) return;

    const textureLoader = new THREE.TextureLoader();
    let path: string;

    if (colorNum === 6) {
      path = "/Plates/Metallic/DefaultMaterial_Base_color_sRGB.png";
    } else {
      const colorNames = ["blue", "green", "red", "white", "yellow"];
      const colorName = colorNames[colorNum - 1];
      path = `/Plates/Colors/${colorName}.png`;
    }

    const newColorTexture = prepareColorTexture(textureLoader.load(path));

    meshRef.current.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        // Only update the color texture for the main plate material
        if (
          child.name.toLowerCase().includes("plate") ||
          child.name.toLowerCase().includes("surface") ||
          child.geometry.attributes.position.count > 1000
        ) {
          if (child.material.map) child.material.map.dispose();
          child.material.map = newColorTexture;
          child.material.needsUpdate = true;
        }
      }
    });
  };

  useEffect(() => {
    if (!mountRef.current) return;

    setIsLoading(true);

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f8f8); // Slightly warmer background
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50, // Reduced FOV for better view of the plate
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 3.5); // Moved camera back slightly

    // Renderer setup - Enable physically based rendering with enhanced quality
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2; // Slightly increased for better brightness
    renderer.shadowMap.autoUpdate = true;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Professional 3-point lighting setup for license plate viewing
    // 1. Key Light - Main directional light with soft shadows
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(4, 6, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 4096;
    keyLight.shadow.mapSize.height = 4096;
    keyLight.shadow.camera.near = 0.1;
    keyLight.shadow.camera.far = 50;
    keyLight.shadow.camera.left = -8;
    keyLight.shadow.camera.right = 8;
    keyLight.shadow.camera.top = 8;
    keyLight.shadow.camera.bottom = -8;
    keyLight.shadow.bias = -0.0001;
    keyLight.shadow.radius = 8;
    scene.add(keyLight);

    // 2. Fill Light - Softer light to fill shadows
    const fillLight = new THREE.DirectionalLight(0xf0f8ff, 1.2); // Slightly blue tint
    fillLight.position.set(-3, 2, 4);
    scene.add(fillLight);

    // 3. Rim Light - Backlight for edge definition
    const rimLight = new THREE.DirectionalLight(0xfff8dc, 0.8); // Warm rim light
    rimLight.position.set(-2, -3, -4);
    scene.add(rimLight);

    // 4. Ambient Light - Global illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Reduced for more dramatic lighting
    scene.add(ambientLight);

    // 5. Top Light - Additional overhead illumination
    const topLight = new THREE.DirectionalLight(0xffffff, 0.6);
    topLight.position.set(0, 8, 0);
    scene.add(topLight);

    // 6. Hemisphere Light - Sky/ground color variation
    const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x362d1d, 0.3); // Sky blue to brown
    scene.add(hemisphereLight);

    // Environment map for reflections
    const addEnvironmentMap = async () => {
      try {
        const { RGBELoader } = await import(
          "three/examples/jsm/loaders/RGBELoader.js"
        );
        // For now, we'll use a simple cube camera for environment reflection
        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
        const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
        scene.add(cubeCamera);
        return cubeRenderTarget.texture;
      } catch (error) {
        console.log("Environment map not available, using basic setup");
        return null;
      }
    };

    // Load FBX model with PBR materials
    const loadModel = async () => {
      try {
        // Import required loaders
        const { FBXLoader } = await import(
          "three/examples/jsm/loaders/FBXLoader.js"
        );
        const { OrbitControls } = await import(
          "three/examples/jsm/controls/OrbitControls.js"
        );

        // Add orbit controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.enablePan = false;
        controls.autoRotate = false;
        controls.autoRotateSpeed = 2.0;
        controls.target.set(0, 0, 0);

        // Load textures for materials
        const textureLoader = new THREE.TextureLoader();

        // Load base color from Metallic folder (also used for Metallic option)
        const baseColorTexture = prepareColorTexture(
          textureLoader.load(
            "/Plates/Metallic/DefaultMaterial_Base_color_sRGB.png",
            () => console.log("Base color texture loaded"),
            undefined,
            (error) => console.error("Error loading base color texture:", error)
          )
        );

        // Color overlay texture (from Colors folder) for options 1-5
        let colorTexture: THREE.Texture | null = null;
        if (currentColorOption !== 6) {
          const colorNames = ["blue", "green", "red", "white", "yellow"];
          const colorName = colorNames[currentColorOption - 1];
          colorTexture = prepareColorTexture(
            textureLoader.load(
              `/Plates/Colors/${colorName}.png`,
              () => console.log(`${colorName} texture loaded`),
              undefined,
              (error) =>
                console.error(`Error loading ${colorName} texture:`, error)
            )
          );
        }

        // PBR material maps from Metallic folder
        const metallicTexture = prepareDataTexture(
          textureLoader.load(
            "/Plates/Metallic/DefaultMaterial_Metallic_Raw.png",
            () => console.log("Metallic texture loaded"),
            undefined,
            (error) => console.error("Error loading metallic texture:", error)
          )
        );

        const normalTexture = prepareDataTexture(
          textureLoader.load(
            "/Plates/Metallic/DefaultMaterial_Normal_OpenGL_Raw.png",
            () => console.log("Normal texture loaded"),
            undefined,
            (error) => console.error("Error loading normal texture:", error)
          )
        );

        const roughnessTexture = prepareDataTexture(
          textureLoader.load(
            "/Plates/Metallic/DefaultMaterial_Roughness_Raw.png",
            () => console.log("Roughness texture loaded"),
            undefined,
            (error) => console.error("Error loading roughness texture:", error)
          )
        );

        // Create materials for different parts of the plate
        const plateMaterial = new THREE.MeshStandardMaterial({
          map:
            currentColorOption === 6
              ? baseColorTexture
              : (colorTexture as THREE.Texture),
          metalnessMap: metallicTexture,
          normalMap: normalTexture,
          roughnessMap: roughnessTexture,
          metalness: 0.15, // Slightly increased for better reflections
          roughness: 0.7, // Slightly reduced for more shine
          normalScale: new THREE.Vector2(0.8, 0.8), // More pronounced normal mapping
          envMapIntensity: 0.5, // Environment map reflection intensity
        });

        const frameMaterial = new THREE.MeshStandardMaterial({
          map: baseColorTexture, // Use base color for frame
          metalnessMap: metallicTexture,
          normalMap: normalTexture,
          roughnessMap: roughnessTexture,
          metalness: 0.4, // More metallic for frame
          roughness: 0.5, // Smoother frame
          normalScale: new THREE.Vector2(1.2, 1.2), // More pronounced normals for frame detail
          envMapIntensity: 0.7, // Higher reflection for frame
        });

        // Load the FBX model
        const fbxLoader = new FBXLoader();
        const modelPath = modelSrc || "/Plates/Model/Plate.fbx";

        fbxLoader.load(
          modelPath,
          (object) => {
            console.log("FBX model loaded successfully");

            // Ensure geometries have a primary UV set and keep UVs within [0,1]
            object.traverse((child: any) => {
              if (child instanceof THREE.Mesh && child.geometry) {
                const geom = child.geometry as THREE.BufferGeometry;
                const attrs: any = geom.attributes as any;
                if (!attrs.uv && attrs.uv2) {
                  geom.setAttribute("uv", attrs.uv2);
                }
                if (attrs.uv) {
                  const uv = attrs.uv as THREE.BufferAttribute;
                  const arr = uv.array as Float32Array;
                  for (let i = 0; i < arr.length; i++) {
                    arr[i] = THREE.MathUtils.clamp(arr[i], 0, 1);
                  }
                  uv.needsUpdate = true;
                }
              }
            });

            // Apply different materials to different parts of the model
            object.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                if (
                  child.name.toLowerCase().includes("plate") ||
                  child.name.toLowerCase().includes("surface") ||
                  child.geometry.attributes.position.count > 1000
                ) {
                  child.material = plateMaterial;
                } else {
                  child.material = frameMaterial;
                }

                child.castShadow = true;
                child.receiveShadow = true;

                console.log(
                  "Mesh found:",
                  child.name,
                  "Vertices:",
                  (child.geometry as THREE.BufferGeometry).attributes.position
                    .count
                );
              }
            });

            // Center and scale the model
            const box = new THREE.Box3().setFromObject(object);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            object.position.sub(center);
            const maxSize = Math.max(size.x, size.y, size.z);
            const scale = 3 / maxSize; // Slightly smaller scale for better viewing
            object.scale.setScalar(scale);
            object.position.set(0, 0, 0);

            // Heuristic: rotate the model so the thinnest dimension becomes depth (Z)
            // This avoids loading the plate edge-on.
            const smallestAxis =
              size.x < size.y
                ? size.x < size.z
                  ? "x"
                  : "z"
                : size.y < size.z
                ? "y"
                : "z";
            if (smallestAxis === "y") {
              // Lying in XZ plane – stand it up to face camera
              object.rotateX(Math.PI / 2);
            } else if (smallestAxis === "x") {
              // Thin along X – rotate so Z becomes the thin axis
              object.rotateZ(Math.PI / 2);
              object.rotateX(-Math.PI / 2);
            }
            // Give a small forward tilt for a nicer initial look
            object.rotateX(THREE.MathUtils.degToRad(5));

            // Store mesh reference
            meshRef.current = object;

            scene.add(object);
            setIsLoading(false);
          },
          (progress) => {
            const percentComplete = (progress.loaded / progress.total) * 100;
            console.log(
              "Model loading progress:",
              percentComplete.toFixed(2) + "%"
            );
          },
          (error) => {
            console.error("Error loading FBX model:", error);
            setIsLoading(false);
          }
        );

        // Animation loop
        const animate = () => {
          animationIdRef.current = requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };
        animate();
      } catch (error) {
        console.error("Error setting up 3D scene:", error);
        setIsLoading(false);
      }
    };

    loadModel();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;

      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      if (
        mountRef.current &&
        renderer.domElement &&
        mountRef.current.contains(renderer.domElement)
      ) {
        mountRef.current.removeChild(renderer.domElement);
      }

      renderer.dispose();

      // Dispose of geometries, materials, and textures
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (child.material instanceof THREE.Material) {
            const material = child.material as any;
            if (material.map && typeof material.map.dispose === "function") {
              material.map.dispose();
            }
            if (
              material.metalnessMap &&
              typeof material.metalnessMap.dispose === "function"
            ) {
              material.metalnessMap.dispose();
            }
            if (
              material.normalMap &&
              typeof material.normalMap.dispose === "function"
            ) {
              material.normalMap.dispose();
            }
            if (
              material.roughnessMap &&
              typeof material.roughnessMap.dispose === "function"
            ) {
              material.roughnessMap.dispose();
            }
            child.material.dispose();
          }
        }
      });
    };
  }, [modelSrc, currentColorOption]);

  // Update color when prop changes
  useEffect(() => {
    if (colorOption !== currentColorOption) {
      setCurrentColorOption(colorOption);
      if (meshRef.current) {
        updateMeshColor(colorOption);
      }
    }
  }, [colorOption]);

  return (
    <div className={styles.viewer3DContainer}>
      {/* {title && <h2 className={styles.viewerTitle}>{title}</h2>} */}

      <div className={styles.viewer3D} ref={mountRef}>
        {isLoading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>Loading 3D Model...</p>
          </div>
        )}
      </div>

      {/* <div className={styles.controls}>
        <p className={styles.controlsText}>
          Auto-rotating • Drag to rotate • Scroll to zoom • Interactive 3D model
          with PBR materials
        </p>
      </div> */}
    </div>
  );
}
