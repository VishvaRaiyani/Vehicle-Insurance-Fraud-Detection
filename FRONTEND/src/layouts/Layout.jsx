import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { ShieldAlert, LayoutDashboard, Search, Moon, Sun, FileText, BarChart2, Menu, X, MessageSquare, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Background from '../components/common/Background';
import PremiumFooter from '../components/common/PremiumFooter';

export default function Layout() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';

  const navLinks = [
    { to: "/", icon: <LayoutDashboard className="w-4 h-4"/>, label: "Home" },
    { to: "/fraud-analysis", icon: <Search className="w-4 h-4"/>, label: "Predict" },
    { to: "/about", icon: <FileText className="w-4 h-4"/>, label: "About" },
    { to: "/contact", icon: <MessageSquare className="w-4 h-4"/>, label: "Contact" }
  ];

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-blue-500/30 font-sans flex flex-col relative">
      
      {/* Centralized dynamic background */}
      <Background />

      <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b ${
          isScrolled 
            ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-800/50 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)]" 
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <NavLink to="/" className="flex items-center space-x-2 group relative z-50">
            <ShieldAlert className="w-8 h-8 text-blue-600 dark:text-blue-500 drop-shadow-[0_0_12px_rgba(59,130,246,0.6)] group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              FraudShield<span className="text-blue-600 dark:text-blue-500">AI</span>
            </span>
          </NavLink>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.to}
                to={link.to} 
                className={({isActive}) => `text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${isActive ? 'text-blue-600 dark:text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
              >
                <div className="flex items-center space-x-1.5">{link.icon}<span>{link.label}</span></div>
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setIsDark(!isDark)} 
              className="p-2.5 rounded-full glass hover:scale-110 transition-transform focus:outline-none mr-2"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-slate-300" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
            <Link 
              to="/fraud-analysis" 
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-white font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 transition-all duration-300 text-sm"
            >
              Start Prediction
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center relative z-50">
             <button 
                onClick={() => setIsDark(!isDark)} 
                className="p-2 mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
             >
                {isDark ? <Sun className="w-5 h-5 text-slate-300" /> : <Moon className="w-5 h-5 text-slate-600" />}
             </button>
             <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
             >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
             </button>
          </div>

        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden absolute top-0 left-0 w-full h-screen bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl transition-transform duration-500 ease-in-out flex flex-col ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
           <div className="flex flex-col items-center justify-center h-full space-y-8 pt-20 flex-1">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.to}
                  to={link.to} 
                  className={({isActive}) => `text-2xl font-black transition-colors ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white hover:text-blue-500'}`}
                >
                  <div className="flex items-center space-x-3">{link.icon}<span>{link.label}</span></div>
                </NavLink>
              ))}
           </div>
           <div className="p-8 mt-auto w-full mb-8">
              <Link 
                to="/fraud-analysis" 
                className="w-full flex items-center justify-center px-6 py-4 rounded-2xl text-white font-bold bg-blue-600 hover:bg-blue-500 shadow-xl transition-colors text-lg"
              >
                Start Prediction <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
           </div>
        </div>
      </header>

      {/* Main Area */}
      <main className={`flex-1 w-full mx-auto relative z-10 animate-in fade-in duration-700 ${!isHome ? "max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-24" : ""}`}>
        <Outlet />
      </main>
      
      {/* Footer handles its own spacing */}
      <PremiumFooter />
    </div>
  );
}
