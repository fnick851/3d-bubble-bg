import { MathUtils, InstancedMesh as InstancedMeshType } from 'three'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Instances, Instance, ContactShadows } from '@react-three/drei'
import { EffectComposer, SSAO } from '@react-three/postprocessing'

const BABY_BLUE = '#89CFF0'

const particles = Array.from({ length: 200 }, () => ({
  factor: MathUtils.randInt(90, 100),
  speed: MathUtils.randFloat(0.01, 1),
  xFactor: MathUtils.randFloatSpread(80),
  yFactor: MathUtils.randFloatSpread(40),
  zFactor: MathUtils.randFloatSpread(40),
}))

function Bubble({
  factor,
  speed,
  xFactor,
  yFactor,
  zFactor,
}: {
  factor: number
  speed: number
  xFactor: number
  yFactor: number
  zFactor: number
}) {
  const ref = useRef<InstancedMeshType>(null)
  useFrame((state) => {
    if (ref.current) {
      const t = factor + state.clock.elapsedTime * (speed / 2)
      ref.current.scale.setScalar(Math.max(1.5, Math.cos(t) * 5))
      ref.current.position.set(
        Math.cos(t) +
          Math.sin(t * 1) / 10 +
          xFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        Math.sin(t) +
          Math.cos(t * 2) / 10 +
          yFactor +
          Math.sin((t / 10) * factor) +
          (Math.cos(t * 2) * factor) / 10,
        Math.sin(t) +
          Math.cos(t * 2) / 10 +
          zFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 3) * factor) / 10
      )
    }
  })
  return <Instance ref={ref} />
}

function Bubbles() {
  const ref = useRef<InstancedMeshType>(null)
  useFrame((state, delta) => {
    if (ref.current)
      ref.current.rotation.y = MathUtils.damp(
        ref.current.rotation.y,
        (-state.mouse.x * Math.PI) / 6,
        0.75,
        delta
      )
  })
  return (
    <Instances
      limit={particles.length}
      ref={ref}
      castShadow
      receiveShadow
      position={[0, 10, 0]}
    >
      <sphereBufferGeometry args={[1, 32, 32]} />
      <meshStandardMaterial roughness={0.5} color={BABY_BLUE} />
      {particles.map((data, i) => (
        <Bubble key={i} {...data} />
      ))}
    </Instances>
  )
}

function Scene() {
  return (
    <Canvas
      shadows
      camera={{ fov: 75, position: [0, 0, 60], near: 10, far: 150 }}
    >
      <color attach="background" args={['aliceblue']} />
      <fog attach="fog" args={[BABY_BLUE, 50, 100]} />
      <ambientLight intensity={1.5} />
      <pointLight position={[100, 10, -50]} intensity={20} castShadow />
      <pointLight position={[-100, -100, -100]} intensity={10} color="blue" />
      <Bubbles />
      <ContactShadows
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -30, 0]}
        opacity={0.5}
        width={100}
        height={100}
        blur={1}
        far={40}
      />
      <EffectComposer multisampling={0}>
        <SSAO
          samples={31}
          radius={10}
          luminanceInfluence={0.1}
          // @ts-ignore
          color="blue"
          intensity={20}
        />
      </EffectComposer>
    </Canvas>
  )
}

export default Scene
