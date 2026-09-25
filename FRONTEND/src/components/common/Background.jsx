import { useEffect, useState } from 'react';

export default function Background() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden pointer-events-none bg-slate-50 dark:bg-[#020617] transition-colors duration-700">
      
      {/* Dynamic Orbs */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-40 dark:opacity-20 orb-1 bg-blue-300 dark:bg-blue-800"
        style={{ transform: 'translate(' + mousePos.x + 'px, ' + mousePos.y + 'px)' }}
      />
      <div 
        className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-30 dark:opacity-20 orb-2 bg-purple-300 dark:bg-indigo-900"
        style={{ transform: 'translate(' + (-mousePos.x) + 'px, ' + (-mousePos.y) + 'px)' }}
      />
      <div 
        className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-30 dark:opacity-10 orb-3 bg-cyan-200 dark:bg-cyan-900"
        style={{ transform: 'translate(' + (mousePos.x * 0.5) + 'px, ' + (-mousePos.y * 0.5) + 'px)' }}
      />

      {/* Grid overlay for futuristic feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />
    </div>
  );
}
