import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";

function BoxModel() {
  const modelRef = useRef();
  const modelPath = `${import.meta.env.BASE_URL}headphones1.glb`;
const { scene } = useGLTF(modelPath);

  const { scale, center } = React.useMemo(() => {
    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);

    return {
      scale: maxDimension > 0 ? 1.3 / maxDimension : 1,
      center,
    };
  }, [scene]);

  useFrame((state) => {
    if (!modelRef.current) return;

    modelRef.current.rotation.y =
      state.clock.elapsedTime * 0.4;

    modelRef.current.position.y =
      Math.sin(state.clock.elapsedTime) * 0.04;
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

export default function HeadphonesBox3D() {
  return (
    <div className="box-model-canvas">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[3, 4, 5]} intensity={3} />

        <Suspense fallback={null}>
          <Environment preset="studio" />
          <BoxModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/headphones1.glb");