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