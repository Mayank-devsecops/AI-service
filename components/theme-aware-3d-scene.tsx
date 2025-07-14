"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars, Environment, Float, Text } from "@react-three/drei"
import { useTheme } from "@/components/theme-provider"
import { WorkingMan } from "@/components/working-character"
import type * as THREE from "three"

function Sun({ position }: { position: [number, number, number] }) {
  const sunRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y = state.clock.elapsedTime * 0.5
      sunRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 8
      sunRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.2) * 3 + 5
    }
  })

  return (
    <mesh ref={sunRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.5} />
      <pointLight color="#ffd700" intensity={2} distance={20} />
    </mesh>
  )
}

function Planet({ position, color, size }: { position: [number, number, number]; color: string; size: number }) {
  const planetRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = state.clock.elapsedTime * 0.3
      const orbit = state.clock.elapsedTime * 0.1
      planetRef.current.position.x = position[0] + Math.sin(orbit) * 3
      planetRef.current.position.z = position[2] + Math.cos(orbit) * 3
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={planetRef} position={position}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </Float>
  )
}

function AnimatedText({ position, text }: { position: [number, number, number]; text: string }) {
  const textRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group ref={textRef} position={position}>
      <Text fontSize={0.5} color="#3b82f6" anchorX="center" anchorY="middle">
        {text}
      </Text>
    </group>
  )
}

function LightModeScene() {
  return (
    <>
      <ambientLight intensity={0.8} color="#fff5e6" />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffd700" />
      <Sun position={[8, 5, -10]} />

      {/* Floating clouds */}
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh position={[-5, 3, -8]}>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.7} />
        </mesh>
      </Float>
      <Float speed={0.3} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh position={[6, 4, -6]}>
          <sphereGeometry args={[1.2, 16, 16]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      </Float>

      <WorkingMan position={[2, 0, -4]} />
      <AnimatedText position={[-2, 1, -5]} text="AI" />
      <Environment preset="sunset" />
    </>
  )
}

function DarkModeScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#8b5cf6" />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Planets */}
      <Planet position={[-8, 2, -10]} color="#ff6b6b" size={0.5} />
      <Planet position={[6, -3, -12]} color="#4ecdc4" size={0.7} />
      <Planet position={[0, 5, -15]} color="#45b7d1" size={0.3} />

      <WorkingMan position={[2, 0, -4]} />
      <AnimatedText position={[-2, 1, -5]} text="AI" />
      <Environment preset="night" />
    </>
  )
}

function SceneContent() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <>
      {isDark ? <DarkModeScene /> : <LightModeScene />}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />
    </>
  )
}

export function ThemeAware3DScene() {
  return (
    <Canvas camera={{ position: [0, 2, 8], fov: 75 }}>
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  )
}
