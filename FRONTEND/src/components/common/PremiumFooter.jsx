import { ShieldAlert } from 'lucide-react';

export default function PremiumFooter() {
  return (
    <footer className="relative mt-12 overflow-hidden border-t border-slate-200/50 dark:border-slate-800/50">
      
      {/* 3D Gradient Mesh / Orb effect inside footer */}
      <div className="absolute inset-0 -z-10 bg-slate-100 dark:bg-slate-950">
        <div className="absolute bottom-[-50%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/20 dark:bg-blue-600/20 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <ShieldAlert className="w-8 h-8 text-blue-600 dark:text-blue-500 drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                FraudShield<span className="text-blue-600 dark:text-blue-500">AI</span>
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm">
              AI-powered vehicle insurance fraud intelligence. Turn raw claims data into actionable risk insights instantly.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="/fraud-analysis" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Fraud Analysis</a></li>
              <li><a href="/about" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a></li>
              <li><a href="/contact" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><span className="text-sm text-slate-500 dark:text-slate-400">Machine Learning API</span></li>
              <li><span className="text-sm text-slate-500 dark:text-slate-400">Prediction Engine</span></li>
              <li><span className="text-sm text-slate-500 dark:text-slate-400">Risk Assessment</span></li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} FraudShield AI. Built for intelligent claim investigation.
          </p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest">System Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
