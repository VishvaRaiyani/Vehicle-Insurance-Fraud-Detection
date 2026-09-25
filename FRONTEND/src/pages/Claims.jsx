import { useState, useEffect } from 'react';
import { getClaims } from '../api/api';
import { Loader2, AlertCircle } from 'lucide-react';

// Claims component pulls historical data directly from the CSV using the new backend endpoint
export default function Claims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const data = await getClaims();
        setClaims(data || []);
      } catch (err) {
        console.error("Failed to load claims", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClaims();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (claims.length === 0 || claims.error) {
    return (
      <div className="text-center mt-20">
        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Unable to load claims</h2>
        <p className="text-slate-500 mt-2">Could not read data from backend.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Claims Database</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Historical insurance claim records retrieved from backend.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                <th className="px-6 py-4">Claim #</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Vehicle Category</th>
                <th className="px-6 py-4 text-right">Amount ($)</th>
                <th className="px-6 py-4">Fraud Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {claims.map((claim, index) => (
                <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm text-slate-700 dark:text-slate-300">
                    {claim.claim_number}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                    {claim.claim_date}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                    {claim.vehicle_category}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-right text-slate-700 dark:text-slate-300">
                    ${parseFloat(claim.total_claim || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {claim['fraud reported'] === 'Y' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400">
                        Fraudulent
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400">
                        Genuine
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}