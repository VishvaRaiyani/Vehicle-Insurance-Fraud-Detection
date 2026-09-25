import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import { useEffect, useState } from 'react';

function Core({ riskLevel }) {
  // idle -> blue, high -> red, low -> green
  const color = riskLevel === 'high' ? '#ef4444' : riskLevel === 'low' ? '#10b981' : '#3b82f6';
  const distort = riskLevel === 'high' ? 0.6 : 0.3;
  const speed = riskLevel === 'high' ? 4 : 2;

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

export default function CyberScene({ riskLevel = 'idle' }) {
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  // Observe theme changes to adjust stars/lighting slightly if needed
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[500px] rounded-2xl overflow-hidden relative bg-slate-100 dark:bg-slate-900 transition-colors duration-500 shadow-inner">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-200 dark:from-slate-950 via-transparent to-transparent z-10 pointer-events-none" />
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={isDark ? 0.2 : 0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        {isDark && <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />}
        <Core riskLevel={riskLevel} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={riskLevel === 'high' ? 3 : 1} />
      </Canvas>
      
      <div className="absolute bottom-6 left-0 right-0 z-20 text-center pointer-events-none">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-slate-200 dark:border-slate-700 text-xs font-mono tracking-widest text-slate-700 dark:text-slate-300 shadow-sm">
          <span className={`w-2 h-2 rounded-full ${riskLevel === 'high' ? 'bg-red-500 animate-pulse' : riskLevel === 'low' ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
          <span>AI NEURAL CORE</span>
        </div>
      </div>
    </div>
  );
}