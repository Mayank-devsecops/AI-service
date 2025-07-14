"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, Text3D, OrbitControls, Stars, Environment, Sparkles } from "@react-three/drei"
import * as THREE from "three"

function ParticleField() {
  const points = useRef<THREE.Points>(null)
  const particleCount = 1000

  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20

    colors[i * 3] = Math.random()
    colors[i * 3 + 1] = Math.random()
    colors[i * 3 + 2] = Math.random()
  }

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.1
      points.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} vertexColors transparent opacity={0.6} />
    </points>
  )
}

function AnimatedText({ position }: { position: [number, number, number] }) {
  const textRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group ref={textRef} position={position}>
      <Text3D
        font="/fonts/Inter_Bold.json"
        size={0.3}
        height={0.05}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        AI
        <meshStandardMaterial color="#3b82f6" />
      </Text3D>
    </group>
  )
}

function InteractiveOrb({ position }: { position: [number, number, number] }) {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.scale.setScalar(hovered ? 1.2 : clicked ? 0.8 : 1)
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        <icosahedronGeometry args={[0.4, 1]} />
        <meshStandardMaterial
          color={hovered ? "#f59e0b" : clicked ? "#ec4899" : "#8b5cf6"}
          transparent
          opacity={0.8}
          wireframe={clicked}
        />
      </mesh>
    </Float>
  )
}

function DNAHelix({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  const helixPoints = []
  for (let i = 0; i < 50; i++) {
    const angle = (i / 50) * Math.PI * 4
    const x = Math.cos(angle) * 0.5
    const z = Math.sin(angle) * 0.5
    const y = (i / 50) * 3 - 1.5
    helixPoints.push([x, y, z])
  }

  return (
    <group ref={groupRef} position={position}>
      {helixPoints.map((point, index) => (
        <mesh key={index} position={point as [number, number, number]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color={index % 2 === 0 ? "#3b82f6" : "#ec4899"} />
        </mesh>
      ))}
    </group>
  )
}

function FloatingNetwork({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const nodes = [
    [0, 0, 0],
    [1, 0.5, 0],
    [-1, 0.5, 0],
    [0.5, -0.5, 0.5],
    [-0.5, -0.5, 0.5],
    [0, 1, -0.5],
  ]

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.2
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} position={position}>
        {/* Nodes */}
        {nodes.map((node, index) => (
          <mesh key={index} position={node as [number, number, number]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.2} />
          </mesh>
        ))}

        {/* Connections */}
        {nodes.map((node, index) => {
          if (index === 0) return null
          const start = new THREE.Vector3(...nodes[0])
          const end = new THREE.Vector3(...node)
          const direction = end.clone().sub(start)
          const length = direction.length()
          const center = start.clone().add(end).multiplyScalar(0.5)

          return (
            <mesh key={`line-${index}`} position={center.toArray()}>
              <cylinderGeometry args={[0.01, 0.01, length, 8]} />
              <meshStandardMaterial color="#06b6d4" transparent opacity={0.6} />
            </mesh>
          )
        })}
      </group>
    </Float>
  )
}

function MouseTracker() {
  const { mouse, viewport } = useThree()
  const sphereRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.position.x = (mouse.x * viewport.width) / 2
      sphereRef.current.position.y = (mouse.y * viewport.height) / 2
    }
  })

  return (
    <mesh ref={sphereRef} position={[0, 0, -2]}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color="#f59e0b" transparent opacity={0.5} />
      <Sparkles count={20} scale={2} size={2} speed={0.4} />
    </mesh>
  )
}

export function Enhanced3DScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#8b5cf6" />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ParticleField />

      {/* Interactive Elements */}
      <InteractiveOrb position={[-3, 2, -4]} />
      <InteractiveOrb position={[3, -1, -3]} />
      <InteractiveOrb position={[0, 3, -6]} />

      {/* AI-themed 3D Text */}
      <AnimatedText position={[-2, 1, -5]} />
      <AnimatedText position={[2, -2, -4]} />

      {/* DNA Helix */}
      <DNAHelix position={[4, 0, -7]} />
      <DNAHelix position={[-4, 0, -8]} />

      {/* Network Visualization */}
      <FloatingNetwork position={[0, -1, -9]} />
      <FloatingNetwork position={[5, 2, -6]} />
      <FloatingNetwork position={[-5, -2, -5]} />

      {/* Mouse Tracker */}
      <MouseTracker />

      <Environment preset="night" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
    </Canvas>
  )
}
