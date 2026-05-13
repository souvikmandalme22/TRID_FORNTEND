"use client";

export function SceneLighting() {
  return (
    <>
      {/* Ambient base */}
      <ambientLight intensity={0.35} />

      {/* Key light — top front left */}
      <directionalLight
        position={[80, 120, 80]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={500}
        shadow-camera-left={-150}
        shadow-camera-right={150}
        shadow-camera-top={150}
        shadow-camera-bottom={-150}
      />

      {/* Fill light — soft opposite */}
      <directionalLight position={[-60, 40, -80]} intensity={0.4} />

      {/* Rim light — back top */}
      <directionalLight position={[0, -60, -100]} intensity={0.25} color="#5B9EFF" />

      {/* Ground hemisphere */}
      <hemisphereLight args={["#E0E8FF", "#1A1A2E", 0.3]} />
    </>
  );
}
