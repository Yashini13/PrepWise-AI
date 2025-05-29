'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function GradientPlane() {
  const materialRef = useRef()

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh scale={[10, 10, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;

          void main() {
            vec2 uv = vUv;
            float pulse = 0.5 + 0.5 * sin(uTime + uv.x * 5.0);
            vec3 color = mix(vec3(0.8, 0.3, 1.0), vec3(0.3, 1.0, 0.9), pulse);
            gl_FragColor = vec4(color, 0.5);
          }
        `}
        transparent
        uniforms={{
          uTime: { value: 0 },
        }}
      />
    </mesh>
  )
}

export default function AnimatedGradient() {
  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -10,
        width: '100%',
        height: '100%',
      }}
      camera={{ position: [0, 0, 2] }}
    >
      <GradientPlane />
    </Canvas>
  )
}
