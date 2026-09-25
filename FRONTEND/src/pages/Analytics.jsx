import { useState, useEffect } from 'react';
import { getAnalytics } from '../api/api';
import { Loader2, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const result = await getAnalytics();
        setData(result);
      } catch (err) {
        console.error("Failed to load analytics", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!data || data.error) {
    return (
      <div className="text-center mt-20">
        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Unable to load analytics</h2>
        <p className="text-slate-500 mt-2">Could not read data from backend.</p>
      </div>
    );
  }

  // Formatting data for Recharts
  const fraudPieData = [
    { name: 'Genuine', value: data.fraud_vs_genuine['N'] || 0, color: '#10b981' },
    { name: 'Fraudulent', value: data.fraud_vs_genuine['Y'] || 0, color: '#ef4444' }
  ];

  const vehicleBarData = Object.entries(data.fraud_by_vehicle || {}).map(([key, value]) => ({
    name: key,
    cases: value
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Fraud Analytics</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Data visualizations based on the historical claims dataset.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Fraud Ratio Pie Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-2xl border border-slate-200 dark:border-slate-800 p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Genuine vs Fraudulent Claims</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fraudPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {fraudPieData.map((entry, index) => (
                    <Cell key={"cell-" + index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {fraudPieData.map(item => (
              <div key={item.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fraud by Vehicle Category Bar Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-2xl border border-slate-200 dark:border-slate-800 p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Top Fraud Cases by Vehicle Category</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vehicleBarData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="cases" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
