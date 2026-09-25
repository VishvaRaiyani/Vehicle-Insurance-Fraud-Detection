const fs = require('fs');
const path = require('path');

const BASE_DIR = "D:\\B.Tech ( CSE )\\Sem - 5\\ML\\Project_ML\\FRONTEND";

const files = {
  "src/index.css": `
@import "tailwindcss";

:root {
  --background: #020617; /* slate-950 */
  --text: #f8fafc; /* slate-50 */
  --glass-bg: rgba(15, 23, 42, 0.6); /* slate-900 with opacity */
  --glass-border: rgba(51, 65, 85, 0.5); /* slate-700 with opacity */
}

body {
  background-color: var(--background);
  color: var(--text);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-image: 
    radial-gradient(at 0% 0%, rgba(30, 58, 138, 0.15) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(15, 23, 42, 0.8) 0px, transparent 50%);
  background-attachment: fixed;
}

.glass-panel {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.premium-input {
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(71, 85, 105, 0.5);
  color: white;
  transition: all 0.2s ease-in-out;
}

.premium-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  background: rgba(30, 41, 59, 0.8);
}
`,

  "src/components/CyberScene.jsx": `
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars, Rings } from '@react-three/drei';

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
  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[600px] rounded-2xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 pointer-events-none" />
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <Core riskLevel={riskLevel} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={riskLevel === 'high' ? 3 : 1} />
      </Canvas>
      
      <div className="absolute bottom-6 left-0 right-0 z-20 text-center pointer-events-none">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-panel text-xs font-mono tracking-widest text-slate-300">
          <span className={\`w-2 h-2 rounded-full \${riskLevel === 'high' ? 'bg-red-500 animate-pulse' : riskLevel === 'low' ? 'bg-emerald-500' : 'bg-blue-500'}\`}></span>
          <span>AI NEURAL CORE ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
`,

  "src/layouts/Layout.jsx": `
import { Outlet, NavLink } from 'react-router-dom';
import { ShieldAlert, LayoutDashboard, Search, FileText, History, BarChart2, BrainCircuit, Menu, Bell, User } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Fraud Analysis', path: '/fraud-analysis', icon: Search },
  { name: 'Claims', path: '/claims', icon: FileText },
  { name: 'Prediction History', path: '/prediction-history', icon: History },
  { name: 'Analytics', path: '/analytics', icon: BarChart2 },
  { name: 'Model Insights', path: '/model-insights', icon: BrainCircuit },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={\`
        fixed inset-y-0 left-0 z-50 w-72 glass-panel border-r border-slate-800/50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        \${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      \`}>
        <div className="flex items-center justify-center h-20 border-b border-slate-800/50 bg-slate-900/20">
          <ShieldAlert className="w-8 h-8 text-blue-500 mr-3 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          <span className="text-xl font-bold tracking-tight text-white">FraudShield<span className="text-blue-500">AI</span></span>
        </div>
        
        <div className="px-6 py-4">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4">
            Intelligence Platform
          </div>
          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  \`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 \${
                    isActive 
                      ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }\`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className={\`w-5 h-5 mr-3 \${(isActive) => isActive ? 'text-blue-400' : 'text-slate-500'}\`} />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-800/50 bg-slate-900/20">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2 shadow-[0_0_5px_#10b981]"></div>
            <span className="text-xs font-mono text-slate-400">SYSTEM ONLINE</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Navbar */}
        <header className="glass-panel border-b border-slate-800/50 h-20 flex items-center justify-between px-6 z-30 sticky top-0">
          <div className="flex items-center lg:hidden">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-slate-200 focus:outline-none"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
          
          <div className="hidden lg:flex flex-1 items-center">
             {/* decorative breadcrumb or info */}
             <div className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs font-mono text-slate-400 flex items-center space-x-2">
                <span>API Connection:</span>
                <span className="text-emerald-400">SECURE</span>
             </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-slate-800/50 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700/50">
              <Search className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full bg-slate-800/50 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700/50 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_5px_#3b82f6]"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center border border-slate-700/50">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </header>

        {/* Main Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative z-10 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
`,

  "src/pages/Dashboard.jsx": `
import { LayoutDashboard, AlertCircle, TrendingUp, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Fraud Intelligence Dashboard</h1>
        <p className="text-slate-400 mt-2 text-sm">Monitor claim activity, model predictions and fraud-risk signals.</p>
      </div>
      
      <div className="glass-panel p-10 rounded-2xl text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none"></div>
        <AlertCircle className="w-16 h-16 text-slate-500 mx-auto mb-6 group-hover:text-blue-500 transition-colors duration-500" />
        <h3 className="text-xl font-semibold text-white mb-3">Analytics data is not available from the current backend.</h3>
        <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
          The backend API currently does not provide endpoints for aggregate claim statistics, fraud rates, or historical metrics. Displaying real data only.
        </p>
        <Link 
          to="/fraud-analysis" 
          className="inline-flex items-center justify-center px-6 py-3 border border-blue-500/50 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.3)] text-sm font-medium text-white bg-blue-600/80 hover:bg-blue-500 transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
        >
          Proceed to Fraud Analysis
        </Link>
      </div>
    </div>
  );
}
`,

  "src/pages/FraudAnalysis.jsx": `
import { useState, useRef, useEffect } from 'react';
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

  const [status, setStatus] = useState('idle'); // idle, loading, result, error
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const resultRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let parsedValue = value;
    if (type === 'number') parsedValue = value === '' ? '' : Number(value);
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
    if (status !== 'loading') setStatus('idle'); // Reset UI slightly when typing
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
      // Scroll to result smoothly on mobile
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'An error occurred while communicating with the backend API.');
      setStatus('error');
    }
  };

  const riskLevel = status === 'result' ? (result?.prediction === 1 ? 'high' : 'low') : status === 'loading' ? 'loading' : 'idle';

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="border-b border-slate-800/50 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center">
          <ScanLine className="w-8 h-8 mr-3 text-blue-500" />
          AI Vehicle Claim Analysis
        </h1>
        <p className="text-slate-400 mt-2 text-sm max-w-2xl">
          Submit claim information for machine-learning based fraud risk assessment. Our AI scans 23 distinct datapoints to evaluate risk probability.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left: Form */}
        <div className="xl:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="glass-panel rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center mr-3 border border-blue-500/20">1</span>
                Driver & Policy Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Age of Driver</label>
                  <input type="number" name="age_of_driver" value={formData.age_of_driver} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Safety Rating</label>
                  <input type="number" name="safety_rating" value={formData.safety_rating} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Annual Income ($)</label>
                  <input type="number" step="0.01" name="annual_income" value={formData.annual_income} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">High Education</label>
                  <select name="high_education" value={formData.high_education} onChange={handleChange} className="w-full premium-input rounded-xl px-4 py-2.5 text-sm appearance-none">
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Property Status</label>
                  <input type="text" name="property_status" value={formData.property_status} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Address Change</label>
                  <select name="address_change" value={formData.address_change} onChange={handleChange} className="w-full premium-input rounded-xl px-4 py-2.5 text-sm appearance-none">
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center mr-3 border border-blue-500/20">2</span>
                Vehicle Data
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Vehicle Age (Years)</label>
                  <input type="number" name="age_of_vehicle" value={formData.age_of_vehicle} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Category</label>
                  <input type="text" name="vehicle_category" value={formData.vehicle_category} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Price ($)</label>
                  <input type="number" step="0.01" name="vehicle_price" value={formData.vehicle_price} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Annual Premium ($)</label>
                  <input type="number" step="0.01" name="annual_premium" value={formData.annual_premium} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Policy Deductible ($)</label>
                  <input type="number" step="0.01" name="policy_deductible" value={formData.policy_deductible} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm" />
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center mr-3 border border-blue-500/20">3</span>
                Accident & Claim Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Claim Date</label>
                  <input type="date" name="claim_date" value={formData.claim_date} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm [color-scheme:dark]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Day of Week</label>
                  <select name="claim_day_of_week" value={formData.claim_day_of_week} onChange={handleChange} className="w-full premium-input rounded-xl px-4 py-2.5 text-sm appearance-none">
                    <option value="Monday">Monday</option><option value="Tuesday">Tuesday</option><option value="Wednesday">Wednesday</option><option value="Thursday">Thursday</option><option value="Friday">Friday</option><option value="Saturday">Saturday</option><option value="Sunday">Sunday</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Accident Site</label>
                  <input type="text" name="accident_site" value={formData.accident_site} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Channel</label>
                  <input type="text" name="channel" value={formData.channel} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Total Claim ($)</label>
                  <input type="number" step="0.01" name="total_claim" value={formData.total_claim} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Injury Claim ($)</label>
                  <input type="number" step="0.01" name="injury_claim" value={formData.injury_claim} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Liability Prct (%)</label>
                  <input type="number" step="0.01" name="liab_prct" value={formData.liab_prct} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Past Claims</label>
                  <input type="number" name="past_num_of_claims" value={formData.past_num_of_claims} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Days Open</label>
                  <input type="number" step="0.01" name="days_open" value={formData.days_open} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Form Defects</label>
                  <input type="number" name="form_defects" value={formData.form_defects} onChange={handleChange} required className="w-full premium-input rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Police Report</label>
                  <select name="police_report" value={formData.police_report} onChange={handleChange} className="w-full premium-input rounded-xl px-4 py-2.5 text-sm appearance-none">
                    <option value={1}>Yes</option><option value={0}>No</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Witness Present</label>
                  <select name="witness_present" value={formData.witness_present} onChange={handleChange} className="w-full premium-input rounded-xl px-4 py-2.5 text-sm appearance-none">
                    <option value={1}>Yes</option><option value={0}>No</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full relative overflow-hidden group glass-panel flex justify-center items-center py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed border border-blue-500/30 bg-blue-600/10 hover:bg-blue-600/20"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-6 w-6 text-blue-400" />
                  <span className="text-blue-400 font-semibold tracking-wide uppercase text-sm">Processing Neural Network...</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="mr-3 h-6 w-6 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="text-white font-semibold tracking-wide uppercase text-sm">Analyze Risk Intelligence</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: 3D Visualization & Results */}
        <div className="xl:col-span-5 space-y-6" ref={resultRef}>
          <div className="glass-panel rounded-2xl p-1 shadow-2xl relative overflow-hidden group h-[400px] lg:h-[500px]">
             {/* 3D Scene */}
             <CyberScene riskLevel={riskLevel} />
          </div>

          {/* Results Panel */}
          <div className={\`glass-panel rounded-2xl p-6 transition-all duration-700 \${status === 'result' ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 pointer-events-none'}\`}>
             <h3 className="text-lg font-semibold text-white mb-6 border-b border-slate-800/50 pb-4 flex items-center justify-between">
               <span>Risk Assessment Result</span>
               <Activity className={\`w-5 h-5 \${riskLevel === 'high' ? 'text-red-500' : riskLevel === 'low' ? 'text-emerald-500' : 'text-slate-500'}\`} />
             </h3>
             
             {status === 'error' && (
                <div className="p-4 bg-red-950/40 border border-red-900/50 rounded-xl flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-red-400">Analysis Failed</h4>
                    <p className="text-sm text-red-300/70 mt-1">{error}</p>
                  </div>
                </div>
              )}

             {status === 'result' && result && (
               <div className="space-y-6 animate-in zoom-in-95 duration-500">
                  <div className={\`p-6 rounded-xl border relative overflow-hidden \${result.prediction === 1 ? 'bg-red-950/20 border-red-500/30' : 'bg-emerald-950/20 border-emerald-500/30'}\`}>
                    <div className={\`absolute top-0 right-0 w-32 h-32 blur-3xl -mr-10 -mt-10 \${result.prediction === 1 ? 'bg-red-500/20' : 'bg-emerald-500/20'}\`}></div>
                    
                    <div className="flex items-center justify-between mb-2 relative z-10">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">AI Verdict</span>
                      {result.prediction === 1 ? (
                        <span className="flex h-3 w-3 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                      ) : (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      )}
                    </div>
                    
                    <div className="relative z-10">
                      <h4 className={\`text-3xl font-black uppercase tracking-tight \${result.prediction === 1 ? 'text-red-400' : 'text-emerald-400'}\`}>
                        {result.prediction === 1 ? 'High Risk' : 'Low Risk'}
                      </h4>
                      <p className="text-slate-300 mt-2 text-sm">
                        {result.prediction === 1 
                          ? 'This claim exhibits patterns strongly associated with historical fraud cases. Manual investigation is highly recommended.' 
                          : 'This claim aligns with genuine historical patterns. Standard processing recommended.'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center py-3 border-b border-slate-800/50">
                      <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">Model Output</span>
                      <span className="text-sm font-mono text-slate-200">{result.result || (result.prediction === 1 ? 'Fraud' : 'Not Fraud')}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-800/50">
                      <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">Probability Score</span>
                      <span className="text-sm font-mono text-slate-500 italic">Not provided by backend</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">Engine Version</span>
                      <span className="text-sm font-mono text-slate-400 bg-slate-800/50 px-2 py-1 rounded">v1.0.0-PROD</span>
                    </div>
                  </div>
               </div>
             )}

             {status === 'idle' && (
               <div className="text-center py-12 opacity-50">
                 <ShieldAlert className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                 <p className="text-slate-400 text-sm">Awaiting claim data submission.</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
`,

  "src/pages/Claims.jsx": `
import { FileText } from 'lucide-react';
export default function Claims() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Claims Database</h1>
      </div>
      <div className="glass-panel p-10 rounded-2xl text-center">
        <FileText className="w-16 h-16 text-slate-500 mx-auto mb-6" />
        <h3 className="text-xl font-semibold text-white mb-2">No claims have been analyzed yet.</h3>
        <p className="text-slate-400">The backend API does not currently expose an endpoint to fetch stored claims.</p>
      </div>
    </div>
  );
}
`,

  "src/pages/PredictionHistory.jsx": `
import { History } from 'lucide-react';
export default function PredictionHistory() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Prediction History</h1>
      </div>
      <div className="glass-panel p-10 rounded-2xl text-center">
        <History className="w-16 h-16 text-slate-500 mx-auto mb-6" />
        <h3 className="text-xl font-semibold text-white mb-2">No prediction history available.</h3>
        <p className="text-slate-400">The backend API does not currently support fetching past ML predictions.</p>
      </div>
    </div>
  );
}
`,

  "src/pages/Analytics.jsx": `
import { BarChart2 } from 'lucide-react';
export default function Analytics() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Fraud Analytics</h1>
      </div>
      <div className="glass-panel p-10 rounded-2xl text-center">
        <BarChart2 className="w-16 h-16 text-slate-500 mx-auto mb-6" />
        <h3 className="text-xl font-semibold text-white mb-2">Analytics data is not available from the current backend.</h3>
        <p className="text-slate-400">The backend does not provide analytics endpoints to populate charts and graphs.</p>
      </div>
    </div>
  );
}
`,

  "src/pages/ModelInsights.jsx": `
import { BrainCircuit } from 'lucide-react';
export default function ModelInsights() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Model Insights</h1>
      </div>
      <div className="glass-panel p-10 rounded-2xl text-center">
        <BrainCircuit className="w-16 h-16 text-slate-500 mx-auto mb-6" />
        <h3 className="text-xl font-semibold text-white mb-2">Model explanation is not available from the current API.</h3>
        <p className="text-slate-400">The backend does not currently expose feature importance, SHAP values, or detailed model metrics.</p>
      </div>
    </div>
  );
}
`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(BASE_DIR, filepath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, content.trim(), 'utf8');
}
console.log("3D Premium Frontend generated successfully.");
