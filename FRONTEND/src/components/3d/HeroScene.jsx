import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Box, Sphere, MeshDistortMaterial } from '@react-three/drei';

export default function HeroScene() {
  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[500px]">
      <Canvas camera={{ position: [5, 3, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        
        {/* Core Vehicle Placeholder (Abstract geometric car representation) */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <group position={[0, 0, 0]}>
            {/* Chassis */}
            <Box args={[3, 0.8, 1.6]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} wireframe />
            </Box>
            {/* Cabin */}
            <Box args={[1.6, 0.6, 1.4]} position={[-0.2, 0.7, 0]}>
              <meshStandardMaterial color="#3b82f6" transparent opacity={0.6} metalness={1} roughness={0} />
            </Box>
          </group>
        </Float>

        {/* AI Shield / Scanning Ring */}
        <Float speed={1} rotationIntensity={4} floatIntensity={0}>
          <Sphere args={[2.5, 32, 32]} scale={[1, 0.2, 1]}>
             <MeshDistortMaterial 
                color="#3b82f6" 
                attach="material" 
                distort={0.2} 
                speed={2} 
                transparent 
                opacity={0.3} 
                wireframe 
             />
          </Sphere>
        </Float>
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
}
