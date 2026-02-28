"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

function PointPlanet({
    radius,
    color,
    pointSize
}: {
    radius: number;
    color: string;
    pointSize: number;
}) {
    const ref = useRef<THREE.Points>(null);

    const geometry = useMemo(() => {
        return new THREE.SphereGeometry(radius, 64, 64);
    }, [radius]);

    return (
        <points ref={ref} geometry={geometry}>
            <pointsMaterial
                color={color}
                size={pointSize}
                sizeAttenuation
                transparent
                opacity={0.9}
            />
        </points>
    );
}

function EarthWithMoon() {
    const earthRef = useRef<THREE.Points>(null);
    const moonGroupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // 🌍 Earth rotation
        if (earthRef.current) {
            earthRef.current.rotation.y = t * 0.4;
        }

        // 🌙 Moon orbit
        if (moonGroupRef.current) {
            moonGroupRef.current.rotation.y = t * 0.6;
        }
    });

    return (
        <>
            {/* Earth */}
            <points
                ref={earthRef}
                geometry={new THREE.SphereGeometry(2, 64, 64)}
            >
                <pointsMaterial
                    color="#2563eb"
                    size={0.03}
                    sizeAttenuation
                    transparent
                    opacity={0.9}
                />
            </points>

            {/* Moon Orbit Group */}
            <group ref={moonGroupRef}>
                <points
                    position={[4, 0, 0]}
                    geometry={new THREE.SphereGeometry(0.5, 32, 32)}
                >
                    <pointsMaterial
                        color="#e5e7eb"
                        size={0.02}
                        sizeAttenuation
                        transparent
                        opacity={0.9}
                    />
                </points>
            </group>
        </>
    );
}

export default function EarthScene() {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />
                    <EarthWithMoon />
                </Suspense>
            </Canvas>
        </div>
    );
}