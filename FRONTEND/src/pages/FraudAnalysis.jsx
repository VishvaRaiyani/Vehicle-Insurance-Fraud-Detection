import { useState, useRef, useEffect } from 'react';
import { predictFraud } from '../api/api';
import { ShieldCheck, ChevronDown, ChevronUp, Loader2, AlertCircle, FileJson, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import AbstractBackground3D from '../components/prediction/AbstractBackground3D';

export default function FraudAnalysis() {
  const [formData, setFormData] = useState({
    age_of_driver: '', safety_rating: '', annual_income: '', high_education: '', address_change: '',
    property_status: '', claim_date: '', claim_day_of_week: '', accident_site: '',
    past_num_of_claims: '', witness_present: '', liab_prct: '', channel: '', police_report: '',
    age_of_vehicle: '', vehicle_category: '', vehicle_price: '', total_claim: '',
    injury_claim: '', policy_deductible: '', annual_premium: '', days_open: '', form_defects: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'result' | 'error'
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [showRaw, setShowRaw] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const resultRef = useRef(null);

  const steps = [
    { id: 1, title: 'Driver & Policy' },
    { id: 2, title: 'Vehicle Information' },
    { id: 3, title: 'Incident Report' },
    { id: 4, title: 'Financial & Legal' }
  ];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let parsedValue = value;
    if (type === 'number') parsedValue = value === '' ? '' : Number(value);
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
    if (status === 'error') setStatus('idle'); 
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const formRef = useRef(null);

  const validateCurrentStep = () => {
    if (!formRef.current) return false;
    const visibleElements = formRef.current.querySelectorAll('input:not([type="hidden"]), select, textarea');
    let isValid = true;
    const newErrors = {};
    visibleElements.forEach(el => {
      if (!el.checkValidity()) {
        isValid = false;
        newErrors[el.name] = el.validationMessage;
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (!validateCurrentStep()) return;
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateCurrentStep()) return;
    if (status === 'loading') return;
    
    setStatus('loading');
    setError(null);
    setResult(null);

    try {
      const res = await predictFraud(formData);
      setResult(res);
      setStatus('result');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Prediction service unavailable. Please check the backend connection and try again.');
      setStatus('error');
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setResult(null);
    setCurrentStep(1);
    setErrors({});
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const renderInput = (label, name, type, description = "", extraProps = {}) => (
    <div className="flex flex-col mb-4 relative">
      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
      <input 
        type={type} 
        name={name} 
        value={formData[name]} 
        onChange={handleChange} 
        required 
        className={`w-full premium-input rounded-xl px-4 py-3.5 text-sm focus:ring-2 transition-all shadow-sm bg-white/70 dark:bg-slate-900/50 ${errors[name] ? 'border-red-500 focus:ring-red-500/50' : 'focus:ring-blue-500/50'}`}
        placeholder={"Enter " + label.toLowerCase()}
        {...extraProps} 
      />
      {errors[name] ? (
        <span className="text-xs text-red-500 mt-1.5 font-bold animate-in fade-in slide-in-from-top-1">{errors[name]}</span>
      ) : description ? (
        <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 ml-1">{description}</span>
      ) : null}
    </div>
  );

  const renderSelect = (label, name, options, description = "") => (
    <div className="flex flex-col mb-4 relative">
      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
      <div className="relative">
        <select 
          name={name} 
          value={formData[name]} 
          onChange={handleChange} 
          required
          className={`w-full premium-input rounded-xl px-4 py-3.5 text-sm appearance-none focus:ring-2 shadow-sm transition-all bg-white/70 dark:bg-slate-900/50 ${errors[name] ? 'border-red-500 focus:ring-red-500/50' : 'focus:ring-blue-500/50'}`}
        >
          {options.map(opt => <option key={opt.value} value={opt.value} disabled={opt.value === ''}>{opt.label}</option>)}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
      {errors[name] ? (
        <span className="text-xs text-red-500 mt-1.5 font-bold animate-in fade-in slide-in-from-top-1">{errors[name]}</span>
      ) : description ? (
        <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 ml-1">{description}</span>
      ) : null}
    </div>
  );

  return (
    <div className="min-h-screen pb-24 relative">
      
      {/* Background 3D Scene */}
      <AbstractBackground3D isAnalyzing={status === 'loading'} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 pt-12">
        
        {/* Header */}
        <div className="text-center mb-10 animate-in fade-in slide-in-from-top-4">
          <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-3">AI Fraud Analysis</div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Predict Claim Authenticity
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Process insurance claims through our FastAPI machine learning pipeline.
          </p>
        </div>

        {/* Error State */}
        {status === 'error' && (
          <div className="mb-8 glass-card border border-red-500/50 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between text-left animate-in fade-in zoom-in-95">
            <div className="flex items-center mb-4 md:mb-0">
              <AlertCircle className="w-8 h-8 text-red-500 mr-4 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Analysis could not be completed.</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{error}</p>
              </div>
            </div>
            <button 
              onClick={() => setStatus('idle')}
              className="px-6 py-2 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold hover:scale-105 transition-transform"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Prediction Form Wizard */}
        {status !== 'result' && (
          <div className={"transition-all duration-500 " + (status === 'loading' ? 'opacity-50 scale-95 pointer-events-none' : 'opacity-100')}>
            
            {/* Wizard Progress Bar */}
            <div className="glass-card p-4 sm:p-6 rounded-3xl mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 border border-slate-200/50 dark:border-slate-800/50">
               <div className="flex items-center space-x-2 sm:space-x-4 w-full justify-between sm:justify-start">
                  {steps.map((step) => (
                    <div key={step.id} className="flex items-center">
                       <button 
                          onClick={() => setCurrentStep(step.id)}
                          className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all duration-300 ${
                            currentStep === step.id 
                              ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] scale-110'
                              : currentStep > step.id
                                ? 'bg-emerald-500 text-white'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700'
                          }`}
                       >
                          {currentStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                       </button>
                       <span className={`hidden md:block ml-3 text-sm font-semibold transition-colors ${currentStep === step.id ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                          {step.title}
                       </span>
                       {step.id !== 4 && (
                         <div className={`hidden sm:block w-12 h-1 mx-4 rounded-full transition-colors ${currentStep > step.id ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
                       )}
                    </div>
                  ))}
               </div>
            </div>

            <form ref={formRef} onSubmit={e => { e.preventDefault(); handleSubmit(); }} className="glass-card rounded-[2rem] p-6 md:p-10 border border-slate-200/50 dark:border-slate-800/50 shadow-2xl relative overflow-hidden">
              
              <div className="relative z-10 min-h-[350px]">
                
                {/* Step 1 */}
                {currentStep === 1 && (
                  <div className="animate-in slide-in-from-right-8 fade-in duration-500">
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Driver & Policy Details</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Information regarding the insured individual and their policy status.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                      {renderInput('Age of Driver', 'age_of_driver', 'number')}
                      {renderInput('Safety Rating', 'safety_rating', 'number', 'Internal score (0-100)')}
                      {renderInput('Annual Income', 'annual_income', 'number', 'Driver\'s reported income', { step: '0.01' })}
                      {renderSelect('Higher Education', 'high_education', [{label: 'Select Option', value: ''}, {label: 'Yes', value: 1}, {label: 'No', value: 0}])}
                      {renderSelect('Property Status', 'property_status', [{label: 'Select Status', value: ''}, {label: 'Own', value: 'Own'}, {label: 'Rent', value: 'Rent'}])}
                      {renderSelect('Address Change', 'address_change', [{label: 'Select Option', value: ''}, {label: 'Yes', value: 1}, {label: 'No', value: 0}])}
                    </div>
                  </div>
                )}
                
                {/* Step 2 */}
                {currentStep === 2 && (
                  <div className="animate-in slide-in-from-right-8 fade-in duration-500">
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Vehicle Information</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Details about the vehicle involved in the claim.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                      {renderInput('Vehicle Age', 'age_of_vehicle', 'number')}
                      {renderInput('Category', 'vehicle_category', 'text')}
                      {renderInput('Vehicle Price ($)', 'vehicle_price', 'number', '', { step: '0.01' })}
                      {renderInput('Annual Premium ($)', 'annual_premium', 'number', '', { step: '0.01' })}
                      {renderInput('Policy Deductible ($)', 'policy_deductible', 'number', '', { step: '0.01' })}
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {currentStep === 3 && (
                  <div className="animate-in slide-in-from-right-8 fade-in duration-500">
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Incident Report</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Location, timing, and conditions of the accident.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                      {renderInput('Claim Date', 'claim_date', 'date')}
                      {renderSelect('Day of Week', 'claim_day_of_week', [{label: 'Select Day', value: ''}, ...['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d => ({label: d, value: d}))])}
                      {renderInput('Accident Site', 'accident_site', 'text')}
                      {renderInput('Reporting Channel', 'channel', 'text', 'e.g., Online, Phone')}
                      {renderInput('Past Claims', 'past_num_of_claims', 'number')}
                      {renderSelect('Witness Present', 'witness_present', [{label: 'Select Option', value: ''}, {label: 'Yes', value: 1}, {label: 'No', value: 0}])}
                      {renderSelect('Police Report', 'police_report', [{label: 'Select Option', value: ''}, {label: 'Yes', value: 1}, {label: 'No', value: 0}])}
                    </div>
                  </div>
                )}

                {/* Step 4 */}
                {currentStep === 4 && (
                  <div className="animate-in slide-in-from-right-8 fade-in duration-500">
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Financial & Legal</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Liability distribution and requested amounts.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                      {renderInput('Total Claim Amount ($)', 'total_claim', 'number', '', { step: '0.01' })}
                      {renderInput('Injury Claim Portion ($)', 'injury_claim', 'number', '', { step: '0.01' })}
                      {renderInput('Liability %', 'liab_prct', 'number', 'Assessed liability (0-100)', { step: '0.01' })}
                      {renderInput('Days Open', 'days_open', 'number', '', { step: '0.01' })}
                      {renderInput('Form Defects', 'form_defects', 'number', 'Documented errors')}
                    </div>
                  </div>
                )}

              </div>

              {/* Navigation / Submit Controls */}
              <div className="mt-12 pt-8 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between relative z-10">
                 <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1 || status === 'loading'}
                    className="inline-flex items-center px-6 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                 </button>
                 
                 {currentStep < 4 ? (
                   <button
                      type="button"
                      onClick={nextStep}
                      className="inline-flex items-center px-8 py-3 rounded-xl text-white font-bold bg-slate-900 dark:bg-white dark:text-slate-900 hover:scale-105 transition-transform shadow-xl"
                   >
                      Next Step <ArrowRight className="w-5 h-5 ml-2" />
                   </button>
                 ) : (
                   <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={status === 'loading'}
                      className="inline-flex items-center px-8 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all duration-300 disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="animate-spin mr-2 w-5 h-5" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="mr-2 w-5 h-5" />
                          Analyze Claim
                        </>
                      )}
                   </button>
                 )}
              </div>

            </form>
          </div>
        )}

        {/* Prediction Result State */}
        {status === 'result' && result && (
          <div ref={resultRef} className="animate-in fade-in zoom-in-95 duration-700 mt-4">
            
            <div className="text-center mb-8">
               <button 
                 onClick={resetForm} 
                 className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
               >
                 <ArrowLeft className="w-4 h-4 mr-2" /> Analyze Another Claim
               </button>
            </div>

            <div className="glass-card rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/50 shadow-2xl overflow-hidden backdrop-blur-2xl">
               
               {/* Result Header */}
               <div className={"p-12 md:p-16 text-center border-b border-slate-200/50 dark:border-slate-800/50 relative overflow-hidden " + (result.prediction === 1 ? 'bg-red-500/5' : 'bg-emerald-500/5')}>
                  {/* Decorative Glow */}
                  <div className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-[100px] opacity-30 -z-10 " + (result.prediction === 1 ? 'bg-red-500' : 'bg-emerald-500')}></div>
                  
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                     {result.prediction === 1 ? <AlertCircle className="w-8 h-8 text-red-500" /> : <CheckCircle2 className="w-8 h-8 text-emerald-500" />}
                  </div>
                  <div className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">AI Analysis Complete</div>
                  <h3 className={"text-5xl md:text-7xl font-black uppercase tracking-tight mb-6 " + (result.prediction === 1 ? 'text-red-600 dark:text-red-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'text-emerald-600 dark:text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]')}>
                     {result.result || (result.prediction === 1 ? 'Fraud Detected' : 'Genuine Claim')}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 text-lg max-w-2xl mx-auto font-medium">
                    {result.prediction === 1 
                      ? 'This claim exhibits highly anomalous patterns associated with historical fraud cases. Manual SIU investigation is strongly recommended.' 
                      : 'This claim aligns seamlessly with genuine historical patterns. Standard automated processing is recommended.'}
                  </p>
               </div>

               <div className="p-8 md:p-12 lg:p-16">
                  
                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                     <div className="bg-white/50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm relative overflow-hidden">
                        <div className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">Model Probability</div>
                        <div className="text-5xl font-mono font-black text-slate-900 dark:text-white tracking-tight">
                          {result.probability !== null && result.probability !== undefined ? result.probability + '%' : 'N/A'}
                        </div>
                     </div>
                     <div className="bg-white/50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm relative overflow-hidden">
                        <div className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">Confidence Level</div>
                        <div className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                          {result.probability !== null && result.probability !== undefined ? (result.probability >= 80 ? 'Very High' : result.probability >= 50 ? 'High' : 'Moderate') : 'Unknown'}
                        </div>
                     </div>
                  </div>

                  {/* Feature Importance Bar Chart */}
                  <div className="mb-16 text-left">
                     <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Decision Drivers</h4>
                     <p className="text-slate-600 dark:text-slate-400 mb-8">Top factors influencing this specific model prediction.</p>
                     
                     {result.explanation ? (
                        <div className="space-y-6">
                           {Object.entries(result.explanation).map(([feature, importance]) => (
                             <div key={feature} className="w-full">
                               <div className="flex justify-between text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                                 <span>{feature.replace(/_/g, ' ')}</span>
                                 <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">{importance}%</span>
                               </div>
                               <div className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                                 <div 
                                   className={"h-full rounded-full shadow-sm transition-all duration-1000 " + (result.prediction === 1 ? 'bg-red-500' : 'bg-emerald-500')}
                                   style={{ width: `${importance}%` }}
                                 ></div>
                               </div>
                             </div>
                           ))}
                        </div>
                     ) : (
                        <div className="p-8 rounded-3xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-center">
                           <p className="text-slate-500 dark:text-slate-400 font-medium">
                             Model explanation is not available for this prediction.
                           </p>
                        </div>
                     )}
                  </div>

                  {/* Raw JSON Debugger */}
                  <div className="border border-slate-200/50 dark:border-slate-800/50 rounded-2xl overflow-hidden shadow-sm">
                     <button 
                        onClick={() => setShowRaw(!showRaw)}
                        className="w-full flex items-center justify-between p-6 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors"
                     >
                        <span className="flex items-center text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          <FileJson className="w-5 h-5 mr-3 text-blue-500" /> View Raw API Response
                        </span>
                        {showRaw ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                     </button>
                     {showRaw && (
                        <div className="p-6 border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-950 text-left overflow-x-auto">
                          <pre className="text-xs font-mono text-cyan-400">
                            {JSON.stringify(result, null, 2)}
                          </pre>
                        </div>
                     )}
                  </div>

               </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
