import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Html,
  useGLTF,
} from "@react-three/drei";
import { Box3, Vector3 } from "three";

function ModelLoader() {
  return (
    <Html center>
      <div
        style={{
          color: "#d4ff64",
          fontSize: "10px",
          whiteSpace: "nowrap",
        }}
      >
        Loading headphones...
      </div>
    </Html>
  );
}

function HeadphoneModel({ modelScale = 1.1 }) {
  const modelRef = useRef();
  const modelPath = `${import.meta.env.BASE_URL}headphones.glb`;
const { scene } = useGLTF(modelPath);

  const { scale, center } = React.useMemo(() => {
    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    const modelCenter = box.getCenter(new Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);

    return {
      scale: maxDimension > 0 ? modelScale / maxDimension : 1,
      center: modelCenter,
    };
  }, [scene, modelScale]);

  useFrame((state) => {
    if (!modelRef.current) return;

    modelRef.current.rotation.y = state.clock.elapsedTime * 0.35;
    modelRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 1.2) * 0.04;
  });

  return (
    <group ref={modelRef}>
      <primitive
        object={scene}
        scale={scale}
        position={[
          -center.x * scale,
          -center.y * scale,
          -center.z * scale,
        ]}
      />
    </group>
  );
}

export default function Headphones3D({ compact = false }) {
  return (
    <div
      className={`real-3d-headphones ${compact ? "compact-3d-headphones" : ""}`}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, compact ? 4 : 5],
          fov: compact ? 38 : 40,
        }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={2} />

        <directionalLight position={[3, 5, 4]} intensity={3} />

        <directionalLight
          position={[-4, 2, -3]}
          intensity={2}
          color="#d4ff64"
        />

        <Suspense fallback={<ModelLoader />}>
          <Environment preset="studio" />

          <HeadphoneModel modelScale={compact ? 1.15 : 2.5} />

          {!compact && (
            <ContactShadows
              position={[0, -1.1, 0]}
              opacity={0.3}
              scale={3}
              blur={2}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/headphones.glb");
