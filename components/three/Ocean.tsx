"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { Palette } from "./theme";

// Keep in sync with the GLSL `wave` below so floating objects ride the surface
export function waveHeight(x: number, z: number, t: number) {
  return (
    0.22 * Math.sin(x * 0.35 + t * 0.9) +
    0.16 * Math.sin(z * 0.5 + t * 1.1) +
    0.1 * Math.sin((x + z) * 0.7 + t * 1.6) +
    0.05 * Math.sin(x * 1.7 - z * 1.3 + t * 2.3)
  );
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec3 vWorld;
  varying float vHeight;

  float wave(vec2 p) {
    return 0.22 * sin(p.x * 0.35 + uTime * 0.9)
         + 0.16 * sin(p.y * 0.5 + uTime * 1.1)
         + 0.10 * sin((p.x + p.y) * 0.7 + uTime * 1.6)
         + 0.05 * sin(p.x * 1.7 - p.y * 1.3 + uTime * 2.3);
  }

  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    float h = wave(world.xz);
    world.y += h;
    vHeight = h;
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uDeep;
  uniform vec3 uShallow;
  uniform vec3 uFoam;
  uniform vec3 uFog;
  uniform vec3 uSun;
  uniform vec3 uSunDir;
  uniform float uFogNear;
  uniform float uFogFar;
  varying vec3 vWorld;
  varying float vHeight;

  void main() {
    // Flat-shaded low-poly facets from screen-space derivatives
    vec3 n = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
    if (n.y < 0.0) n = -n;

    vec3 viewDir = normalize(cameraPosition - vWorld);
    vec3 sunDir = normalize(uSunDir);
    bool underwater = cameraPosition.y < vWorld.y;

    vec3 col = mix(uDeep, uShallow, smoothstep(-0.35, 0.4, vHeight));
    col *= 0.55 + 0.6 * max(dot(n, sunDir), 0.0);
    col += uSun * pow(max(dot(n, normalize(sunDir + viewDir)), 0.0), 90.0) * 0.45;
    col = mix(col, uFoam, smoothstep(0.38, 0.55, vHeight) * 0.35);

    if (underwater) {
      // Looking up at the surface from below
      col = mix(uShallow, uFoam, 0.2 + 0.3 * max(dot(n, vec3(0.0, 1.0, 0.0)), 0.0));
    }

    float fog = smoothstep(uFogNear, uFogFar, length(cameraPosition - vWorld));
    gl_FragColor = vec4(mix(col, uFog, fog), 1.0);
    #include <colorspace_fragment>
  }
`;

export function Ocean({ palette, fogNear, fogFar }: { palette: Palette; fogNear: number; fogFar: number }) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color() },
      uShallow: { value: new THREE.Color() },
      uFoam: { value: new THREE.Color() },
      uFog: { value: new THREE.Color() },
      uSun: { value: new THREE.Color() },
      uSunDir: { value: new THREE.Vector3(-0.5, 0.6, -0.6) },
      uFogNear: { value: fogNear },
      uFogFar: { value: fogFar },
    }),
    [fogNear, fogFar],
  );

  useFrame(({ clock }) => {
    if (!material.current) return;
    const u = material.current.uniforms;
    u.uTime.value = clock.elapsedTime;
    u.uDeep.value.set(palette.waterDeep);
    u.uShallow.value.set(palette.waterShallow);
    u.uFoam.value.set(palette.foam);
    u.uFog.value.set(palette.background);
    u.uSun.value.set(palette.sun);
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[120, 120, 160, 160]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
