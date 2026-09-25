import { ShieldCheck, Cpu, Code2, Database, BrainCircuit, Globe2 } from 'lucide-react';
import AbstractBackground3D from '../components/prediction/AbstractBackground3D';

export default function About() {
  return (
    <div className="min-h-screen pb-24 relative">
      
      {/* Background 3D Scene */}
      <AbstractBackground3D isAnalyzing={false} />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 pt-12">
        
        {/* Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4">
          <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-3">About The Project</div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
            Bridging AI and <br className="hidden md:block" />Insurance Intelligence.
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            FraudShield AI is a state-of-the-art machine learning platform built to demonstrate the integration of predictive analytics into complex, real-world insurance workflows.
          </p>
        </div>

        {/* Mission / Intro */}
        <div className="glass-card p-8 md:p-12 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 shadow-2xl mb-16 animate-in fade-in slide-in-from-bottom-8">
          <div className="flex items-start space-x-6">
            <div className="hidden md:flex p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                The detection of insurance fraud is traditionally a slow, rule-based, manual process. FraudShield AI was developed to show how machine learning pipelines can instantly parse dozens of independent variables—from driver demographics to incident reports—and deliver a mathematical probability of fraud to assist human investigators.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                By providing an intuitive, extremely fast, and highly visual interface, we aim to make complex AI decisions transparent and accessible to analysts.
              </p>
            </div>
          </div>
        </div>

        {/* The Stack */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">Technical Architecture</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="glass-card p-8 rounded-3xl group hover:-translate-y-1 transition-transform">
              <Code2 className="w-8 h-8 text-blue-500 mb-4" />
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Frontend Interface</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Built with <strong>React</strong> and <strong>Vite</strong>. The interface utilizes a custom Glassmorphism design system powered by <strong>Tailwind CSS v4</strong>. The ambient 3D environments are rendered natively in the browser using <strong>React Three Fiber</strong> and WebGL, providing a premium SaaS aesthetic without compromising performance.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl group hover:-translate-y-1 transition-transform">
              <Globe2 className="w-8 h-8 text-emerald-500 mb-4" />
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">API Gateway</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Powered by <strong>FastAPI</strong> and Python. The backend provides lightning-fast asynchronous endpoints that handle schema validation, data sanitization, and seamless routing between the client application and the machine learning pipeline.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl group hover:-translate-y-1 transition-transform">
              <BrainCircuit className="w-8 h-8 text-purple-500 mb-4" />
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Machine Learning Pipeline</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                At the core is a <strong>Gradient Boosting Classifier</strong> wrapped in a Scikit-Learn Pipeline. It features a custom <strong>ColumnTransformer</strong> that automatically derives engineered features (like claim-to-vehicle-price ratios and temporal data) from the raw JSON payload in real time.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl group hover:-translate-y-1 transition-transform">
              <Database className="w-8 h-8 text-cyan-500 mb-4" />
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Analytics & Explainability</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                The system doesn't just return a binary result. It extracts and normalizes the internal <strong>Feature Importances</strong> from the Gradient Boosting model's decision trees, allowing the frontend to dynamically render exactly which factors influenced a specific prediction.
              </p>
            </div>

          </div>
        </div>

        {/* Conclusion */}
        <div className="text-center py-12 border-t border-slate-200/50 dark:border-slate-800/50">
          <Cpu className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-6" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Built for the Future of Insurance</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl mx-auto">
            FraudShield AI represents the intersection of robust data engineering, advanced predictive modeling, and premium user experience design.
          </p>
        </div>

      </div>
    </div>
  );
}
