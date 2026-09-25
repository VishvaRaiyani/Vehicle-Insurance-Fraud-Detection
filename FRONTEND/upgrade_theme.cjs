const fs = require('fs');
const path = require('path');

const BASE_DIR = "D:\\B.Tech ( CSE )\\Sem - 5\\ML\\Project_ML\\FRONTEND";

const files = {
  "src/index.css": `
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

:root {
  color-scheme: light;
}

.dark {
  color-scheme: dark;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Premium input styling adapting to theme */
.premium-input {
  transition: all 0.2s ease-in-out;
  outline: none;
}

.premium-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}
`,

  "src/components/CyberScene.jsx": `
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
          <span className={\`w-2 h-2 rounded-full \${riskLevel === 'high' ? 'bg-red-500 animate-pulse' : riskLevel === 'low' ? 'bg-emerald-500' : 'bg-blue-500'}\`}></span>
          <span>AI NEURAL CORE</span>
        </div>
      </div>
    </div>
  );
}
`,

  "src/layouts/Layout.jsx": `
import { Outlet, NavLink } from 'react-router-dom';
import { ShieldAlert, LayoutDashboard, Search, Moon, Sun, Github } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Layout() {
  // Check local storage or system preference
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-blue-500/30">
      
      {/* Top Navbar matching the classic layout feel but premium */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm dark:shadow-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-7 h-7 text-blue-600 dark:text-blue-500 drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              FraudShield<span className="text-blue-600 dark:text-blue-500">AI</span>
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/fraud-analysis" className={({isActive}) => \`text-sm font-semibold transition-colors \${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}\`}>
              <div className="flex items-center space-x-1.5"><Search className="w-4 h-4"/><span>Analyze Claim</span></div>
            </NavLink>
            <NavLink to="/dashboard" className={({isActive}) => \`text-sm font-semibold transition-colors \${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}\`}>
              <div className="flex items-center space-x-1.5"><LayoutDashboard className="w-4 h-4"/><span>Dashboard</span></div>
            </NavLink>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsDark(!isDark)} 
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10 animate-in fade-in duration-500">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/50 mt-12 py-8 text-center text-sm text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-950/50">
        <p>© 2026 FraudShield AI Platform. Connected to real backend ML models.</p>
      </footer>
    </div>
  );
}
`,

  "src/pages/FraudAnalysis.jsx": `
import { useState, useRef } from 'react';
import { predictFraud } from '../api/predictionApi';
import { ShieldAlert, CheckCircle, Loader2, AlertTriangle, ScanLine, Activity } from 'lucide-react';
import CyberScene from '../components/CyberScene';

export default function FraudAnalysis() {
  const [formData, setFormData] = useState({
    age_of_driver: 30, safety_rating: 80, annual_income: 60000, high_education: 1, address_change: 0,
    property_status: 'Own', claim_date: '2023-01-01', claim_day_of_week: 'Monday', accident_site: 'Highway',
    past_num_of_claims: 0, witness_present: 0, liab_prct: 50.0, channel: 'Online', police_report: 1,
    age_of_vehicle: 5, vehicle_category: 'Sedan', vehicle_price: 25000.0, total_claim: 5000.0,
    injury_claim: 1000.0, policy_deductible: 500.0, annual_premium: 1200.0, days_open: 30.0, form_defects: 0
  });

  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const resultRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let parsedValue = value;
    if (type === 'number') parsedValue = value === '' ? '' : Number(value);
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
    if (status !== 'loading') setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError(null);
    setResult(null);

    try {
      const res = await predictFraud(formData);
      setResult(res);
      setStatus('result');
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'An error occurred while communicating with the API.');
      setStatus('error');
    }
  };

  const riskLevel = status === 'result' ? (result?.prediction === 1 ? 'high' : 'low') : status === 'loading' ? 'loading' : 'idle';

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto mb-12 pt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Vehicle Fraud Intelligence
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Leverage our advanced Machine Learning model to evaluate insurance claims in real-time. Fast, accurate, and professional risk assessment.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left: Form */}
        <div className="xl:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
            
            <div className="p-6 sm:p-8 space-y-8">
              
              {/* Section 1 */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3 text-sm">1</span>
                  Driver & Policy
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Age of Driver</label>
                    <input type="number" name="age_of_driver" value={formData.age_of_driver} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Safety Rating</label>
                    <input type="number" name="safety_rating" value={formData.safety_rating} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Annual Income</label>
                    <input type="number" step="0.01" name="annual_income" value={formData.annual_income} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">High Education</label>
                    <select name="high_education" value={formData.high_education} onChange={handleChange} className="w-full premium-input rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white appearance-none">
                      <option value={1}>Yes</option>
                      <option value={0}>No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Property Status</label>
                    <input type="text" name="property_status" value={formData.property_status} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Address Change</label>
                    <select name="address_change" value={formData.address_change} onChange={handleChange} className="w-full premium-input rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white appearance-none">
                      <option value={1}>Yes</option>
                      <option value={0}>No</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3 text-sm">2</span>
                  Vehicle Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Vehicle Age</label>
                    <input type="number" name="age_of_vehicle" value={formData.age_of_vehicle} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Category</label>
                    <input type="text" name="vehicle_category" value={formData.vehicle_category} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Vehicle Price</label>
                    <input type="number" step="0.01" name="vehicle_price" value={formData.vehicle_price} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Annual Premium</label>
                    <input type="number" step="0.01" name="annual_premium" value={formData.annual_premium} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Policy Deductible</label>
                    <input type="number" step="0.01" name="policy_deductible" value={formData.policy_deductible} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" />
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3 text-sm">3</span>
                  Accident Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Claim Date</label>
                    <input type="date" name="claim_date" value={formData.claim_date} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Day of Week</label>
                    <select name="claim_day_of_week" value={formData.claim_day_of_week} onChange={handleChange} className="w-full premium-input rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white appearance-none">
                      <option value="Monday">Monday</option><option value="Tuesday">Tuesday</option><option value="Wednesday">Wednesday</option><option value="Thursday">Thursday</option><option value="Friday">Friday</option><option value="Saturday">Saturday</option><option value="Sunday">Sunday</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Accident Site</label>
                    <input type="text" name="accident_site" value={formData.accident_site} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Channel</label>
                    <input type="text" name="channel" value={formData.channel} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Total Claim Amount</label>
                    <input type="number" step="0.01" name="total_claim" value={formData.total_claim} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Injury Claim</label>
                    <input type="number" step="0.01" name="injury_claim" value={formData.injury_claim} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Liability %</label>
                    <input type="number" step="0.01" name="liab_prct" value={formData.liab_prct} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Past Claims</label>
                    <input type="number" name="past_num_of_claims" value={formData.past_num_of_claims} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Days Open</label>
                    <input type="number" step="0.01" name="days_open" value={formData.days_open} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Form Defects</label>
                    <input type="number" name="form_defects" value={formData.form_defects} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Police Report</label>
                    <select name="police_report" value={formData.police_report} onChange={handleChange} className="w-full premium-input rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white appearance-none">
                      <option value={1}>Yes</option><option value={0}>No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Witness Present</label>
                    <select name="witness_present" value={formData.witness_present} onChange={handleChange} className="w-full premium-input rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white appearance-none">
                      <option value={1}>Yes</option><option value={0}>No</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>

            <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex justify-center items-center py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 text-white font-bold tracking-wide"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-6 w-6" />
                    Processing ML Model...
                  </>
                ) : (
                  <>
                    <ScanLine className="mr-3 h-6 w-6" />
                    Analyze Risk Intelligence
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right: 3D Visualization & Results */}
        <div className="xl:col-span-5 space-y-6" ref={resultRef}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-1.5 shadow-xl dark:shadow-2xl border border-slate-200 dark:border-slate-800 transition-colors duration-300">
             <CyberScene riskLevel={riskLevel} />
          </div>

          {/* Results Panel */}
          <div className={\`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl p-6 md:p-8 transition-all duration-700 \${status === 'result' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}\`}>
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center justify-between">
               <span>Assessment Output</span>
               <Activity className={\`w-6 h-6 \${riskLevel === 'high' ? 'text-red-600 dark:text-red-500' : riskLevel === 'low' ? 'text-emerald-600 dark:text-emerald-500' : 'text-slate-500'}\`} />
             </h3>
             
             {status === 'error' && (
                <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-red-800 dark:text-red-400">Analysis Failed</h4>
                    <p className="text-sm text-red-600 dark:text-red-300/80 mt-1">{error}</p>
                  </div>
                </div>
              )}

             {status === 'result' && result && (
               <div className="space-y-6 animate-in zoom-in-95 duration-500">
                  <div className={\`p-6 rounded-xl border relative overflow-hidden \${result.prediction === 1 ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-500/30' : 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-500/30'}\`}>
                    
                    <div className="flex items-center justify-between mb-3 relative z-10">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">AI Verdict</span>
                      {result.prediction === 1 ? (
                        <ShieldAlert className="w-6 h-6 text-red-600 dark:text-red-500" />
                      ) : (
                        <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />
                      )}
                    </div>
                    
                    <div className="relative z-10">
                      <h4 className={\`text-3xl font-black uppercase tracking-tight \${result.prediction === 1 ? 'text-red-700 dark:text-red-400' : 'text-emerald-700 dark:text-emerald-400'}\`}>
                        {result.prediction === 1 ? 'High Risk' : 'Low Risk'}
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300 mt-2 text-sm font-medium">
                        {result.prediction === 1 
                          ? 'This claim exhibits patterns strongly associated with historical fraud cases. Manual investigation is required.' 
                          : 'This claim aligns with genuine historical patterns. Standard processing recommended.'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1 bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Prediction Result</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{result.result || (result.prediction === 1 ? 'Fraud' : 'Not Fraud')}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-t border-slate-200 dark:border-slate-800">
                      <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Probability</span>
                      <span className="text-sm font-mono text-slate-400 italic">N/A</span>
                    </div>
                  </div>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
`,

  "src/pages/Dashboard.jsx": `
import { LayoutDashboard, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto mt-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Fraud Intelligence Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Monitor claim activity, model predictions and fraud-risk signals.</p>
      </div>
      
      <div className="bg-white dark:bg-slate-900 p-10 md:p-16 rounded-3xl shadow-xl dark:shadow-2xl border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden transition-colors">
        <AlertCircle className="w-16 h-16 text-slate-400 dark:text-slate-500 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Analytics Unavailable</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">
          The backend API currently does not provide endpoints for aggregate claim statistics, fraud rates, or historical metrics. Displaying real data only.
        </p>
        <Link 
          to="/fraud-analysis" 
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/25 transition-all"
        >
          Proceed to Predict
        </Link>
      </div>
    </div>
  );
}
`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(BASE_DIR, filepath);
  fs.writeFileSync(fullPath, content.trim(), 'utf8');
}
console.log("Theme upgrade applied successfully.");
