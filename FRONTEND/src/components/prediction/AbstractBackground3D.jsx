import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

export default function AbstractBackground3D({ isAnalyzing }) {
  // A completely abstract, futuristic data environment. Tiny sprinkles (particles) only.
  
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-40 transition-opacity duration-1000 opacity-70 dark:opacity-50">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        
        {/* Floating particles representing tiny sprinkles of data */}
        <Stars 
          radius={30} 
          depth={50} 
          count={isAnalyzing ? 8000 : 4000} 
          factor={4} 
          saturation={1} 
          fade 
          speed={isAnalyzing ? 3 : 1} 
        />
        
        {/* A second layer of slightly larger/different colored sprinkles for depth */}
        <Stars 
          radius={20} 
          depth={30} 
          count={isAnalyzing ? 3000 : 1500} 
          factor={6} 
          saturation={0.5} 
          fade 
          speed={isAnalyzing ? 2 : 0.5} 
        />
      </Canvas>
    </div>
  );
}
