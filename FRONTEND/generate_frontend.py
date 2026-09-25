import os
import textwrap

BASE_DIR = r"D:\B.Tech ( CSE )\Sem - 5\ML\Project_ML\FRONTEND"

files = {
    "vite.config.js": """
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
""",
    "src/index.css": """
@import "tailwindcss";

:root {
  --primary: #0f172a;
  --secondary: #1e293b;
  --accent: #3b82f6;
  --background: #f8fafc;
  --text: #0f172a;
  --text-muted: #64748b;
  --success: #10b981;
  --danger: #ef4444;
  --warning: #f59e0b;
}

body {
  background-color: var(--background);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
""",
    "src/main.jsx": """
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
""",
    "src/App.jsx": """
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Dashboard from './pages/Dashboard';
import FraudAnalysis from './pages/FraudAnalysis';
import Claims from './pages/Claims';
import PredictionHistory from './pages/PredictionHistory';
import Analytics from './pages/Analytics';
import ModelInsights from './pages/ModelInsights';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="fraud-analysis" element={<FraudAnalysis />} />
        <Route path="claims" element={<Claims />} />
        <Route path="prediction-history" element={<PredictionHistory />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="model-insights" element={<ModelInsights />} />
      </Route>
    </Routes>
  );
}

export default App;
""",
    "src/layouts/Layout.jsx": """
import { Outlet, NavLink } from 'react-router-dom';
import { ShieldAlert, LayoutDashboard, Search, FileText, History, BarChart2, BrainCircuit, Menu } from 'lucide-react';
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
    <div className="flex h-screen bg-slate-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-slate-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-center h-16 border-b border-slate-800">
          <ShieldAlert className="w-8 h-8 text-blue-500 mr-2" />
          <span className="text-xl font-bold tracking-tight">FraudShield<span className="text-blue-500">AI</span></span>
        </div>
        <div className="px-4 py-2 text-xs text-slate-400 font-medium uppercase tracking-wider">
          Intelligence Platform
        </div>
        <nav className="mt-4 px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center lg:hidden">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="text-slate-500 hover:text-slate-700 focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 flex justify-end items-center">
             <div className="text-sm font-medium text-slate-500">
               Connected to: Vehicle Fraud API
             </div>
          </div>
        </header>

        {/* Main Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
""",
    "src/pages/Dashboard.jsx": """
import { LayoutDashboard, AlertCircle, TrendingUp, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">Analytics data is not available from the current backend.</h3>
        <p className="text-slate-500 mb-6 max-w-md mx-auto">
          The backend API currently does not provide endpoints for aggregate claim statistics, fraud rates, or historical metrics.
        </p>
        <Link 
          to="/fraud-analysis" 
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Go to Fraud Analysis
        </Link>
      </div>
    </div>
  );
}
""",
    "src/pages/Claims.jsx": """
import { FileText } from 'lucide-react';

export default function Claims() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Claims Database</h1>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
        <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">No claims have been analyzed yet.</h3>
        <p className="text-slate-500">
          The backend API does not currently expose an endpoint to fetch stored claims.
        </p>
      </div>
    </div>
  );
}
""",
    "src/pages/PredictionHistory.jsx": """
import { History } from 'lucide-react';

export default function PredictionHistory() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Prediction History</h1>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
        <History className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">No prediction history available.</h3>
        <p className="text-slate-500">
          The backend API does not currently support fetching past ML predictions.
        </p>
      </div>
    </div>
  );
}
""",
    "src/pages/Analytics.jsx": """
import { BarChart2 } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Fraud Analytics</h1>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
        <BarChart2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">Analytics data is not available from the current backend.</h3>
        <p className="text-slate-500">
          The backend does not provide analytics endpoints to populate charts and graphs.
        </p>
      </div>
    </div>
  );
}
""",
    "src/pages/ModelInsights.jsx": """
import { BrainCircuit } from 'lucide-react';

export default function ModelInsights() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Model Insights</h1>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
        <BrainCircuit className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">Model explanation is not available from the current API.</h3>
        <p className="text-slate-500">
          The backend does not currently expose feature importance, SHAP values, or detailed model metrics.
        </p>
      </div>
    </div>
  );
}
""",
    "src/api/client.js": """
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
""",
    "src/api/predictionApi.js": """
import client from './client';

export const predictFraud = async (data) => {
  const response = await client.post('/predict', data);
  return response.data;
};
""",
    "src/pages/FraudAnalysis.jsx": """
import { useState } from 'react';
import { predictFraud } from '../api/predictionApi';
import { ShieldAlert, CheckCircle, Loader2, AlertTriangle } from 'lucide-react';

export default function FraudAnalysis() {
  const [formData, setFormData] = useState({
    age_of_driver: 30,
    safety_rating: 80,
    annual_income: 60000,
    high_education: 1,
    address_change: 0,
    property_status: 'Own',
    claim_date: '2023-01-01',
    claim_day_of_week: 'Monday',
    accident_site: 'Highway',
    past_num_of_claims: 0,
    witness_present: 0,
    liab_prct: 50.0,
    channel: 'Online',
    police_report: 1,
    age_of_vehicle: 5,
    vehicle_category: 'Sedan',
    vehicle_price: 25000.0,
    total_claim: 5000.0,
    injury_claim: 1000.0,
    policy_deductible: 500.0,
    annual_premium: 1200.0,
    days_open: 30.0,
    form_defects: 0
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let parsedValue = value;
    
    if (type === 'number') {
      parsedValue = value === '' ? '' : Number(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await predictFraud(formData);
      setResult(res);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'An error occurred while communicating with the backend API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Vehicle Insurance Claim Analysis</h1>
        <p className="text-slate-500 mt-1">Enter claim details below to assess the risk of fraud using the ML model.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6">
              
              <div className="space-y-8">
                {/* Driver Info */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4">Driver Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Age of Driver</label>
                      <input type="number" name="age_of_driver" value={formData.age_of_driver} onChange={handleChange} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Safety Rating</label>
                      <input type="number" name="safety_rating" value={formData.safety_rating} onChange={handleChange} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Annual Income</label>
                      <input type="number" step="0.01" name="annual_income" value={formData.annual_income} onChange={handleChange} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">High Education (1=Yes, 0=No)</label>
                      <select name="high_education" value={formData.high_education} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value={1}>Yes (1)</option>
                        <option value={0}>No (0)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Address Change (1=Yes, 0=No)</label>
                      <select name="address_change" value={formData.address_change} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value={1}>Yes (1)</option>
                        <option value={0}>No (0)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Property Status</label>
                      <input type="text" name="property_status" value={formData.property_status} onChange={handleChange} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                </div>

                {/* Vehicle Info */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4">Vehicle & Policy Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Age of Vehicle</label>
                      <input type="number" name="age_of_vehicle" value={formData.age_of_vehicle} onChange={handleChange} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Category</label>
                      <input type="text" name="vehicle_category" value={formData.vehicle_category} onChange={handleChange} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Price</label>
                      <input type="number" step="0.01" name="vehicle_price" value={formData.vehicle_price} onChange={handleChange} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Annual Premium</label>
                      <input type="number" step="0.01" name="annual_premium" value={formData.annual_premium} onChange={handleChange} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Policy Deductible</label>
                      <input type="number" step="0.01" name="policy_deductible" value={formData.policy_deductible} onChange={handleChange} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                </div>

                {/* Claim Info */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4">Claim & Accident Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Claim Date</label>
                      <input type="date" name="claim_date" value={formData.claim_date} onChange={handleChange} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Claim Day of Week</label>
                      <select name="claim_day_of_week" value={formData.claim_day_of_week} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Accident Site</label>
                      <input type="text" name="accident_site" value={formData.accident_site} onChange={handleChange} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Past Num of Claims</label>
                      <input type="number" name="past_num_of_claims" value={formData.past_num_of_claims} onChange={handleChange} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Witness Present (1=Yes, 0=No)</label>
                      <select name="witness_present" value={formData.witness_present} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value={1}>Yes (1)</option>
                        <option value={0}>No (0)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Liability %</label>
                      <input type="number" step="0.01" name="liab_prct" value={formData.liab_prct} onChange={handleChange} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Channel</label>
                      <input type="text" name="channel" value={formData.channel} onChange={handleChange} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Police Report (1=Yes, 0=No)</label>
                      <select name="police_report" value={formData.police_report} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value={1}>Yes (1)</option>
                        <option value={0}>No (0)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Total Claim Amount</label>
                      <input type="number" step="0.01" name="total_claim" value={formData.total_claim} onChange={handleChange} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Injury Claim Amount</label>
                      <input type="number" step="0.01" name="injury_claim" value={formData.injury_claim} onChange={handleChange} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Days Open</label>
                      <input type="number" step="0.01" name="days_open" value={formData.days_open} onChange={handleChange} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Form Defects</label>
                      <input type="number" name="form_defects" value={formData.form_defects} onChange={handleChange} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Analyzing Claim...
                    </>
                  ) : (
                    'Analyze Risk Assessment'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 sticky top-6">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800">Fraud Risk Assessment</h3>
            </div>
            
            <div className="p-6">
              {error && (
                <div className="p-4 bg-red-50 rounded-lg flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-red-800">Prediction Failed</h4>
                    <p className="text-sm text-red-600 mt-1">{error}</p>
                  </div>
                </div>
              )}

              {!error && !result && !loading && (
                <div className="text-center py-10">
                  <ShieldAlert className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm">Submit the claim form to generate a fraud risk assessment based on the ML model.</p>
                </div>
              )}

              {loading && (
                <div className="text-center py-12">
                  <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-4" />
                  <p className="text-slate-500 text-sm font-medium">Processing through ML model...</p>
                </div>
              )}

              {result && !loading && (
                <div className="space-y-6">
                  <div className={`p-6 rounded-xl border ${result.prediction === 1 ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium uppercase tracking-wider text-slate-500">Prediction</span>
                      {result.prediction === 1 ? (
                        <ShieldAlert className="w-6 h-6 text-red-500" />
                      ) : (
                        <CheckCircle className="w-6 h-6 text-emerald-500" />
                      )}
                    </div>
                    <div className="text-center">
                      <h4 className={`text-2xl font-bold ${result.prediction === 1 ? 'text-red-700' : 'text-emerald-700'}`}>
                        {result.result || (result.prediction === 1 ? 'Fraud' : 'Not Fraud')}
                      </h4>
                      <p className={`text-sm mt-1 font-medium ${result.prediction === 1 ? 'text-red-600' : 'text-emerald-600'}`}>
                        {result.prediction === 1 ? 'High Risk of Fraud Detected' : 'Low Risk - Genuine Claim'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Probability / Score</span>
                      <span className="text-sm font-medium text-slate-700">Not provided by model</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Confidence</span>
                      <span className="text-sm font-medium text-slate-700">Not provided by model</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Model Version</span>
                      <span className="text-sm font-medium text-slate-700">Production</span>
                    </div>
                  </div>
                  
                  {result.prediction === 1 && (
                     <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                       <h5 className="text-sm font-semibold text-amber-800 mb-1">Action Required</h5>
                       <p className="text-xs text-amber-700">This claim exhibits patterns associated with historical fraud cases. Manual investigation is recommended before approval.</p>
                     </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"""
}

for filepath, content in files.items():
    full_path = os.path.join(BASE_DIR, filepath)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content.strip())

print("Frontend files generated successfully.")
