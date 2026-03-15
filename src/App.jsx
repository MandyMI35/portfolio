import * as THREE from "three"
import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { EffectComposer, N8AO } from "@react-three/postprocessing"
import { BallCollider, Physics, RigidBody } from "@react-three/rapier"
import { Overlay, Underlay } from "./pages/page1.jsx"

// Initial Setup
THREE.ColorManagement.legacyMode = false
const baubleMaterial = new THREE.MeshLambertMaterial({ 
  color: "#b5b3a1",
  emissive: "#8cc3ed" 
})
const sphereGeometry = new THREE.SphereGeometry(1, 16, 16)
const baubles = [...Array(28)].map(() => ({ scale: [0.75, 0.75, 1, 1, 1.25][Math.floor(Math.random() * 5)] }))

function Bauble({ vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread }) {
  const api = useRef()
  useFrame((state, delta) => {
    if (!api.current) return
    delta = Math.min(0.1, delta)
    api.current.applyImpulse(
      vec.copy(api.current.translation()).normalize().multiply({ x: -300 * delta * scale, y: -450 * delta * scale, z: -300 * delta * scale })
    )
  })
  return (
    <RigidBody 
      linearDamping={0.3} 
      angularDamping={0.25} 
      friction={0.2}
      position={[r(15), r(15) - 20, r(15) - 8]} 
      ref={api} colliders={false}>
      <BallCollider args={[scale]} />
      <mesh castShadow receiveShadow scale={scale} geometry={sphereGeometry} material={baubleMaterial} />
    </RigidBody>
  )
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef()
  useFrame(({ mouse, viewport }) => {
    vec.lerp({ x: (mouse.x * viewport.width) / 2, y: (mouse.y * viewport.height) / 2, z: 0 }, 0.2)
    ref.current?.setNextKinematicTranslation(vec)
  })
  return (
    <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[2]} />
    </RigidBody>
  )
}

export default function App() {
  return (
    <>
      <Underlay />
      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        dpr={1}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}>
        
        <ambientLight intensity={1.5} />
        <spotLight position={[20, 20, 25]} penumbra={1} angle={0.2} color="white" castShadow shadow-mapSize={[256, 256]} />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <directionalLight position={[0, -15, 0]} intensity={2} color="red" />
        
        <Suspense fallback={null}>
          <Physics gravity={[0, 0, 0]} timeStep="vary">
            <Pointer />
            {baubles.map((props, i) => <Bauble key={i} {...props} />)}
          </Physics>
          <Environment files="/adamsbridge.hdr" />
        </Suspense>

        <EffectComposer disableNormalPass multisampling={0}>
          <N8AO color="red" aoRadius={1} intensity={0.8} />
        </EffectComposer>
      </Canvas>
      <Overlay />
    </>
  )
}