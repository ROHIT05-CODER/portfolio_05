import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, Lightformer, RoundedBox, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { images } from '../data/portfolio'
import { useInView } from '../hooks/useInView'

/** Chrome frame with the real portrait mapped flat on the front (no distortion, only a gentle pointer tilt). */
function Portrait({ onReady }: { onReady: () => void }) {
  const tex = useTexture(images.heroPortrait.src)

  useEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8
    tex.needsUpdate = true
    onReady()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tex])

  return (
    <group>
      <RoundedBox args={[2.56, 3.16, 0.14]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#d0d0d0" metalness={1} roughness={0.16} envMapIntensity={1.3} />
      </RoundedBox>
      {/* 2.4 x 3 matches the 800 x 1000 source (4:5), so the face keeps its proportions. */}
      <mesh position={[0, 0, 0.074]}>
        <planeGeometry args={[2.4, 3]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
    </group>
  )
}

function Backdrop() {
  const knot = useRef<THREE.Mesh>(null)
  const wire = useRef<THREE.Mesh>(null)

  useFrame((_, dt) => {
    if (knot.current) {
      knot.current.rotation.x += dt * 0.22
      knot.current.rotation.y += dt * 0.31
    }
    if (wire.current) {
      wire.current.rotation.y -= dt * 0.08
      wire.current.rotation.z += dt * 0.03
    }
  })

  return (
    <>
      <mesh ref={wire} position={[0, 0, -1.4]}>
        <icosahedronGeometry args={[2.25, 1]} />
        <meshBasicMaterial wireframe color="#8c8c8c" transparent opacity={0.28} />
      </mesh>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh ref={knot} position={[1.45, 1.25, -0.7]}>
          <torusKnotGeometry args={[0.46, 0.15, 180, 28]} />
          <meshStandardMaterial color="#e6e6e6" metalness={1} roughness={0.12} envMapIntensity={1.4} />
        </mesh>
      </Float>
      <Float speed={1.8} floatIntensity={0.8}>
        <mesh position={[-1.45, -1.25, 0.55]}>
          <sphereGeometry args={[0.27, 48, 48]} />
          <meshStandardMaterial color="#f5f5f5" metalness={1} roughness={0.06} envMapIntensity={1.6} />
        </mesh>
      </Float>
    </>
  )
}

function Rig({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.2, 3, dt)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.1, 3, dt)
  })

  const s = Math.min(1, viewport.width / 3.3, viewport.height / 3.7)
  return (
    <group ref={group} scale={s}>
      {children}
    </group>
  )
}

export default function HeroScene({ onReady }: { onReady: () => void }) {
  const [ref, inView] = useInView<HTMLDivElement>('150px')

  return (
    <div ref={ref} className="h-full w-full">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6.5], fov: 35 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        frameloop={inView ? 'always' : 'never'}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 5]} intensity={1.1} />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={4} position={[0, 3, 3]} scale={[8, 2, 1]} />
          <Lightformer form="rect" intensity={2.2} position={[-4, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} />
          <Lightformer form="rect" intensity={2.2} position={[4, 0, 2]} rotation-y={-Math.PI / 2} scale={[6, 2, 1]} />
          <Lightformer form="ring" intensity={3} position={[0, -1, -3]} scale={4} />
        </Environment>
        <Rig>
          <Backdrop />
          <Portrait onReady={onReady} />
        </Rig>
      </Canvas>
    </div>
  )
}
