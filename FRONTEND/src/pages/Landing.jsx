import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, LayoutDashboard, BrainCircuit, Activity, Database, Server, 
  ChevronRight, FileText, Cpu, Network, Lock, Zap, ChevronDown, CheckCircle 
} from 'lucide-react';
import AbstractBackground3D from '../components/prediction/AbstractBackground3D';

export default function Landing() {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "What is FraudShield AI?",
      a: "FraudShield AI is a machine learning platform designed to analyze structured vehicle insurance claim data to predict the likelihood of fraud based on historical patterns."
    },
    {
      q: "How does the prediction work?",
      a: "The application collects 23 specific data points about the driver, vehicle, and incident, and sends them to a FastAPI backend where a trained Gradient Boosting model evaluates the claim."
    },
    {
      q: "What information is required?",
      a: "The model requires driver demographics, vehicle details, incident specifics (like police reports and witness presence), and financial claim amounts."
    },
    {
      q: "Where is the prediction generated?",
      a: "Predictions are generated entirely on the Python backend using a pre-trained scikit-learn machine learning pipeline."
    },
    {
      q: "Does the system guarantee fraud detection?",
      a: "No. FraudShield AI provides a statistical probability based on historical data. It is an intelligence tool designed to assist—not replace—human investigation and decision-making."
    }
  ];

  return (
    <div className="flex flex-col w-full relative">
      
      {/* GLOBAL ABSTRACT 3D BACKGROUND */}
      <AbstractBackground3D isAnalyzing={false} />

      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-32 pb-20 flex items-center justify-center overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center relative z-10 animate-in slide-in-from-bottom-8 fade-in duration-1000">
          
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-200/50 dark:border-blue-800/50 bg-blue-50/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-black tracking-[0.2em] uppercase backdrop-blur-sm shadow-sm mb-8">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
            AI-Powered Fraud Intelligence
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-8 max-w-4xl mx-auto">
            Detect Insurance Fraud With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">Machine Learning</span> Intelligence.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            FraudShield AI analyzes vehicle insurance information using machine learning to help identify potential fraud through intelligent prediction.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/fraud-analysis" className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-lg">
              <ShieldCheck className="mr-2 w-5 h-5" /> Analyze a Claim
            </Link>
            <Link to="/about" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-1 transition-all duration-300 backdrop-blur-md w-full sm:w-auto text-lg shadow-sm">
              <LayoutDashboard className="mr-2 w-5 h-5" /> Learn More
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            <span className="flex items-center"><BrainCircuit className="w-4 h-4 mr-2"/> Machine Learning</span>
            <span className="hidden sm:flex items-center">•</span>
            <span className="flex items-center"><Server className="w-4 h-4 mr-2"/> FastAPI Prediction</span>
            <span className="hidden sm:flex items-center">•</span>
            <span className="flex items-center"><Activity className="w-4 h-4 mr-2"/> Real-Time Analysis</span>
          </div>
          
        </div>
      </section>

      {/* 2. TRUST / PRODUCT INTRO */}
      <section className="py-16 lg:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Built for Intelligent Insurance Analysis</h2>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white max-w-2xl mx-auto mb-16">
            FraudShield AI combines structured insurance information with machine learning to transform input data into clear prediction results.
          </h3>
          
          <div className="flex flex-col md:flex-row items-center justify-between glass-card p-8 rounded-[2rem] overflow-x-auto relative">
            {['Insurance Data', 'Data Processing', 'Machine Learning', 'Prediction', 'Analysis'].map((step, idx) => (
              <div key={idx} className="flex items-center">
                <div className="flex flex-col items-center min-w-[120px] relative z-10 my-4 md:my-0">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 shadow-sm">
                    {idx === 0 && <Database className="w-8 h-8"/>}
                    {idx === 1 && <Server className="w-8 h-8"/>}
                    {idx === 2 && <BrainCircuit className="w-8 h-8"/>}
                    {idx === 3 && <Activity className="w-8 h-8"/>}
                    {idx === 4 && <ShieldCheck className="w-8 h-8"/>}
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{step}</span>
                </div>
                {idx < 4 && <ChevronRight className="w-8 h-8 text-slate-300 dark:text-slate-700 hidden md:block mx-4" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROBLEM SECTION */}
      <section className="py-16 lg:py-20 relative z-10 border-t border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">The Challenge</h2>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white">Insurance Data Can Be Complex.</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-10 rounded-3xl border-t-4 border-t-blue-500">
              <Database className="w-10 h-10 text-blue-500 mb-6" />
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Complex Information</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Insurance prediction involves multiple input attributes across demographics, vehicle specifications, and incident reports.</p>
            </div>
            <div className="glass-card p-10 rounded-3xl border-t-4 border-t-purple-500">
              <Network className="w-10 h-10 text-purple-500 mb-6" />
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Hidden Patterns</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Relationships between independent data points may not be obvious to standard rule-based evaluation systems.</p>
            </div>
            <div className="glass-card p-10 rounded-3xl border-t-4 border-t-cyan-500">
              <Zap className="w-10 h-10 text-cyan-500 mb-6" />
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Faster Analysis</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Machine learning algorithms can process structured input efficiently to provide rapid statistical assessments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SOLUTION SECTION */}
      <section className="py-16 lg:py-20 relative z-10 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">Turn Insurance Data Into Intelligence.</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-16">
            FraudShield AI provides a structured workflow for submitting insurance information and receiving machine learning-based prediction results.
          </p>
          
          <div className="inline-flex flex-col md:flex-row items-center justify-center p-4 rounded-3xl glass-card text-sm font-bold text-slate-700 dark:text-slate-300 gap-4 md:gap-8">
            <span>INPUT</span>
            <ChevronRight className="w-4 h-4 text-blue-500" />
            <span>VALIDATION</span>
            <ChevronRight className="w-4 h-4 text-blue-500" />
            <span>API</span>
            <ChevronRight className="w-4 h-4 text-blue-500" />
            <span>ML MODEL</span>
            <ChevronRight className="w-4 h-4 text-blue-500" />
            <span className="text-blue-600 dark:text-blue-400">PREDICTION</span>
            <ChevronRight className="w-4 h-4 text-blue-500" />
            <span className="text-emerald-600 dark:text-emerald-400">RESULT</span>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-16 lg:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">How It Works</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">A streamlined workflow from data entry to intelligent insight.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Enter Information', desc: 'Users provide the information required by the prediction model via the secure form interface.' },
              { num: '02', title: 'Validate', desc: 'The input is checked against the application requirements to ensure schema accuracy.' },
              { num: '03', title: 'Analyze', desc: 'The FastAPI backend processes the request and passes it through the ML pipeline.' },
              { num: '04', title: 'Receive Prediction', desc: 'The actual model output is returned and presented clearly through the application.' }
            ].map((step, idx) => (
              <div key={idx} className="glass-card p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-300">
                <div className="text-7xl font-black text-slate-100 dark:text-slate-800/50 absolute -top-6 -right-6 group-hover:scale-110 transition-transform">{step.num}</div>
                <div className="relative z-10 mt-12">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CORE FEATURES BENTO GRID */}
      <section className="py-16 lg:py-20 relative z-10 border-t border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white">Core Capabilities</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="md:col-span-2 glass-card p-10 rounded-[2rem] bg-gradient-to-br from-blue-500/5 to-purple-500/5 hover:shadow-xl transition-all group">
              <BrainCircuit className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">AI Fraud Prediction</h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-md">
                Directly interface with the FastAPI backend. Submit claim details and receive real-time evaluations from the deployed Machine Learning model based on actual dataset parameters.
              </p>
            </div>
            
            <div className="md:col-span-1 glass-card p-10 rounded-[2rem] group hover:shadow-xl transition-all">
              <Server className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Fast API Integration</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                High-performance Python backend routing providing instantaneous prediction rendering and robust schema validation.
              </p>
            </div>

            <div className="md:col-span-1 glass-card p-10 rounded-[2rem] group hover:shadow-xl transition-all">
              <ShieldCheck className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Clear Prediction Results</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Present actual model output, including probabilities and feature importances, in a clean and understandable interface.
              </p>
            </div>

            <div className="md:col-span-1 glass-card p-10 rounded-[2rem] group hover:shadow-xl transition-all">
              <FileText className="w-10 h-10 text-orange-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Prediction History</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Review historical claims data ingested directly from the local dataset to understand overarching trends.
              </p>
            </div>

            <div className="md:col-span-1 glass-card p-10 rounded-[2rem] group hover:shadow-xl transition-all">
              <Activity className="w-10 h-10 text-cyan-600 dark:text-cyan-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Analytics</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                View aggregated visualizations and statistics directly mapped to the underlying historical claim dataset.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 7. ARCHITECTURE & TECHNOLOGY */}
      <section className="py-16 lg:py-20 relative z-10 bg-slate-900 dark:bg-black/50 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black uppercase tracking-widest text-blue-400 mb-2">Technical Architecture</h2>
            <h3 className="text-4xl font-black mb-6">Built on a Modern AI Stack</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-8 rounded-3xl bg-slate-800/50 border border-slate-700 backdrop-blur-md">
              <Cpu className="w-8 h-8 text-blue-400 mb-4" />
              <h4 className="text-xl font-bold mb-2">React + Vite</h4>
              <p className="text-slate-400 text-sm">Frontend experience optimized for performance, using modern hooks and glassmorphism styling.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-800/50 border border-slate-700 backdrop-blur-md">
              <Server className="w-8 h-8 text-emerald-400 mb-4" />
              <h4 className="text-xl font-bold mb-2">FastAPI</h4>
              <p className="text-slate-400 text-sm">Lightning-fast Python prediction API handling data validation, feature engineering, and model execution.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-800/50 border border-slate-700 backdrop-blur-md">
              <BrainCircuit className="w-8 h-8 text-purple-400 mb-4" />
              <h4 className="text-xl font-bold mb-2">Python + ML</h4>
              <p className="text-slate-400 text-sm">Gradient Boosting machine learning engine pipeline handling preprocessing and statistical evaluation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. RESPONSIBLE AI & USE CASES */}
      <section className="py-16 lg:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">AI Should Support Decisions — Not Hide Them.</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              FraudShield AI presents machine learning predictions through a clear interface so users can understand what the system returned. It is designed to assist human analysts, not replace them.
            </p>
            <div className="space-y-6">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-500 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Claim Analysis</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Submit supported insurance information for prediction.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-500 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Fraud Screening</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Use the model's actual prediction output as part of an analysis workflow.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-blue-500 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Data Exploration</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Review available historical predictions and analytics.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-8 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50">
             <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Understand the Model</h4>
             <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Example Feature Importance returned by the ML pipeline.</p>
             <div className="space-y-4">
                {['Total Claim Amount', 'Injury Claim Ratio', 'Vehicle Category', 'Driver Age'].map((feat, idx) => (
                  <div key={idx} className="w-full">
                    <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                      <span>{feat}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-blue-500" style={{ width: `${85 - (idx * 15)}%` }}></div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section className="py-16 lg:py-20 relative z-10 border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="glass-card border border-slate-200/50 dark:border-slate-800/50 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors focus:outline-none"
                >
                  <span className="font-bold text-slate-900 dark:text-white">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="p-6 pt-0 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-200/20 dark:border-slate-800/20">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="py-20 relative z-10 overflow-hidden border-t border-slate-200/50 dark:border-slate-800/50">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
              Ready to Analyze a Claim?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
              Start an AI-powered insurance fraud analysis with FraudShield AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/fraud-analysis" className="inline-flex items-center justify-center px-10 py-5 rounded-2xl text-lg text-white font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                Start Fraud Analysis <ChevronRight className="ml-2 w-6 h-6" />
              </Link>
            </div>
         </div>
      </section>



    </div>
  );
}
