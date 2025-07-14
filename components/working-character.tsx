"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Text } from "@react-three/drei"
import type * as THREE from "three"

function WorkingMan({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const [isTyping, setIsTyping] = useState(true)
  const [showGreeting, setShowGreeting] = useState(true)

  useEffect(() => {
    // Hide greeting after 3 seconds
    const timer = setTimeout(() => {
      setShowGreeting(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle breathing animation
      groupRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02

      // Typing animation - move arms slightly
      if (isTyping) {
        const armMovement = Math.sin(state.clock.elapsedTime * 8) * 0.1
        // This would animate the arms if we had separate arm references
      }
    }
  })

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={groupRef} position={position}>
        {/* Head */}
        <mesh position={[0, 1.7, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>

        {/* Body */}
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.2, 0.25, 0.6, 8]} />
          <meshStandardMaterial color="#4a90e2" />
        </mesh>

        {/* Arms */}
        <mesh position={[-0.3, 1.3, 0]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>
        <mesh position={[0.3, 1.3, 0]} rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>

        {/* Hands on keyboard */}
        <mesh position={[-0.2, 0.9, 0.3]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>
        <mesh position={[0.2, 0.9, 0.3]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>

        {/* Legs */}
        <mesh position={[-0.1, 0.6, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        <mesh position={[0.1, 0.6, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>

        {/* Desktop/Laptop */}
        <mesh position={[0, 0.95, 0.4]}>
          <boxGeometry args={[0.6, 0.02, 0.4]} />
          <meshStandardMaterial color="#34495e" />
        </mesh>

        {/* Screen */}
        <mesh position={[0, 1.1, 0.6]} rotation={[-0.1, 0, 0]}>
          <boxGeometry args={[0.5, 0.3, 0.02]} />
          <meshStandardMaterial color="#000" />
        </mesh>

        {/* Screen glow */}
        <mesh position={[0, 1.1, 0.59]} rotation={[-0.1, 0, 0]}>
          <planeGeometry args={[0.45, 0.25]} />
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.3} />
        </mesh>

        {/* Chair */}
        <mesh position={[0, 0.8, -0.2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 8]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
        <mesh position={[0, 1.2, -0.35]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.4, 0.5, 0.05]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>

        {/* Greeting Text */}
        {showGreeting && (
          <group position={[0, 2.2, 0]}>
            <Text fontSize={0.2} color="#ff6b6b" anchorX="center" anchorY="middle">
              Hi! 👋
            </Text>
          </group>
        )}

        {/* Typing indicator */}
        <group position={[0.3, 1.0, 0.5]}>
          <mesh>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial
              color="#00ff88"
              emissive="#00ff88"
              emissiveIntensity={Math.sin(Date.now() * 0.01) * 0.5 + 0.5}
            />
          </mesh>
        </group>
      </group>
    </Float>
  )
}

export { WorkingMan }
