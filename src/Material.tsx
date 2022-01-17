import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import { ShaderMaterial } from "three"

const vertexShader = /* glsl */ `
varying vec2 vUv; 

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv; 
}
`

const fragmentShader = /* glsl */ `
uniform float uTime; 
varying vec2 vUv; 


void main() {
    float dash = sin(vUv.x);

    float time = sin(uTime * 2.0); 

    if(dash > time) discard; 

    gl_FragColor = vec4(vec3(0.5), 1.0);
}
`

const Material = () => {
  const ref = useRef<ShaderMaterial>(null!)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  )

  useFrame(({ clock }) => {
    ref.current.uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <shaderMaterial
      ref={ref}
      uniforms={uniforms}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
    />
  )
}

export default Material
