import "./App.css"
import computeCurl from "./helpers/computeCurl"
import { useMemo } from "react"
import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Material from "./Material"

const getCurve = (start: THREE.Vector3) => {
  const scale = 1
  let points = []

  points.push(start)
  let currentPoint = start.clone()

  for (let i = 0; i < 500; i++) {
    let velocity = computeCurl(
      currentPoint.x / scale,
      currentPoint.y / scale,
      currentPoint.z / scale
    )
    currentPoint.addScaledVector(velocity, 0.001)

    points.push(currentPoint.clone())
  }

  return points
}

const App = () => {
  const curves = useMemo(() => {
    let curves = []

    for (let i = 0; i < 500; i++) {
      curves.push(
        new THREE.CatmullRomCurve3(
          getCurve(
            new THREE.Vector3(Math.random(), Math.random(), Math.random())
          )
        )
      )
    }

    return curves
  }, [])

  return (
    <div className='App'>
      <Canvas>
        <OrbitControls />
        {curves.map((d, i) => (
          <mesh key={`curl-${i}`}>
            <tubeBufferGeometry args={[d, 600, 0.005, 8, false]} />
            <Material />
          </mesh>
        ))}
      </Canvas>
    </div>
  )
}

export default App
