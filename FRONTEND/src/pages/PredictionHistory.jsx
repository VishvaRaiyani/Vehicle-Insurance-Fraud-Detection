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