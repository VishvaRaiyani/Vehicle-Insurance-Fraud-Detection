import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Box, Sphere, MeshDistortMaterial, Line } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function ScanningVehicle({ isScanning }) {
  const scanLineRef = useRef();

  useFrame(({ clock }) => {
    if (isScanning && scanLineRef.current) {
      // Move scan line back and forth
      scanLineRef.current.position.z = Math.sin(clock.getElapsedTime() * 3) * 2;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[0, 0, 0]}>
          {/* Futuristic Abstract Vehicle */}
          <Box args={[2.5, 0.6, 1.2]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} wireframe />
          </Box>
          <Box args={[1.4, 0.5, 1.0]} position={[-0.2, 0.55, 0]}>
            <meshStandardMaterial color="#3b82f6" transparent opacity={0.4} metalness={1} roughness={0} />
          </Box>
        </group>
      </Float>

      {/* Scanning Effect */}
      {isScanning && (
        <group ref={scanLineRef}>
          <Box args={[3, 2, 0.05]} position={[0, 0.5, 0]}>
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} side={THREE.DoubleSide} />
          </Box>
        </group>
      )}

      {/* Persistent AI Shield Ring */}
      <Sphere args={[2.2, 32, 32]} scale={[1, 0.1, 1]} position={[0, -0.5, 0]}>
         <MeshDistortMaterial 
            color={isScanning ? "#3b82f6" : "#64748b"} 
            attach="material" 
            distort={0.1} 
            speed={isScanning ? 3 : 1} 
            transparent 
            opacity={isScanning ? 0.6 : 0.2} 
            wireframe 
         />
      </Sphere>
    </group>
  );
}

function RiskOrb({ probability }) {
  // Determine color based on exact backend probability
  const color = probability >= 70 ? '#ef4444' : probability >= 40 ? '#f59e0b' : '#10b981';
  const distort = probability >= 70 ? 0.6 : probability >= 40 ? 0.4 : 0.2;
  const speed = probability >= 70 ? 4 : probability >= 40 ? 2 : 1;

  return (
    <Float speed={speed} rotationIntensity={2} floatIntensity={2}>
      <Sphere args={[1.2, 64, 64]}>
        <MeshDistortMaterial 
          color={color} 
          attach="material" 
          distort={distort} 
          speed={speed} 
          roughness={0.2} 
          metalness={0.8} 
          wireframe 
        />
      </Sphere>
      <Sphere args={[0.8, 32, 32]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </Sphere>
    </Float>
  );
}

export default function PredictionScene({ status, result }) {
  const isScanning = status === 'loading';
  const hasResult = status === 'result' && result;

  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[500px] rounded-[2rem] overflow-hidden relative">
      <Canvas camera={{ position: [4, 3, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        
        {hasResult ? (
          <RiskOrb probability={result.probability || 0} />
        ) : (
          <ScanningVehicle isScanning={isScanning} />
        )}
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={isScanning || hasResult ? 2 : 0.5} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
}
