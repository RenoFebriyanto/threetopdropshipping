'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';

function FabricMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const vertexShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      vUv = uv;
      vPosition = position;

      vec3 pos = position;
      pos.z += sin(position.x * 3.0 + uTime * 0.5) * 0.1;
      pos.z += sin(position.y * 3.0 + uTime * 0.3) * 0.1;
      pos.y += cos(position.x * 2.0 + uTime * 0.4) * 0.08;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      // Base dark color
      vec3 color = vec3(0.05);

      // Add subtle waves
      float wave = sin(vUv.x * 6.0 + uTime * 0.3) * 0.5 + 0.5;
      float wave2 = cos(vUv.y * 6.0 + uTime * 0.2) * 0.5 + 0.5;

      // Subtle iridescence
      vec3 iridescence = vec3(
        sin(vUv.x * 10.0 + uTime) * 0.1 + 0.1,
        sin(vUv.y * 10.0 + uTime * 0.7) * 0.1 + 0.1,
        sin((vUv.x + vUv.y) * 10.0 + uTime * 0.5) * 0.1 + 0.1
      );

      color += iridescence * (wave + wave2) * 0.3;

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI * 0.45, 0, 0]}
      position={[0, -0.5, 0]}
      scale={[2, 2, 1]}
    >
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
}

export default function FabricScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{
          position: [0, 0, 2],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <color attach="background" args={['#000000']} />
        <Suspense fallback={null}>
          <FabricMesh />
        </Suspense>
      </Canvas>
    </div>
  );
}
