import React, { useState } from 'react';
import { UserRole } from '../types';
import { UserCheck, X, Shield, Building2, FlaskConical, Gem, GraduationCap, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (role: UserRole, name: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('MANUFACTURER');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orgOrInstitution, setOrgOrInstitution] = useState('');

  if (!isOpen) return null;

  const rolesList: { id: UserRole; title: string; desc: string; icon: any }[] = [
    {
      id: 'MANUFACTURER',
      title: 'Manufacturer / MSME',
      desc: 'Discover applicable standards, plan testing, and monitor QCO compliance',
      icon: Building2
    },
    {
      id: 'CONSUMER',
      title: 'Consumer Citizen',
      desc: 'Verify genuine ISI marks, 6-digit HUID, and report sub-standard goods',
      icon: Shield
    },
    {
      id: 'LABORATORY',
      title: 'Testing Laboratory',
      desc: 'Browse test parameters, manage recognition status, and connect with MSMEs',
      icon: FlaskConical
    },
    {
      id: 'JEWELLER',
      title: 'Jeweller / Bullion Dealer',
      desc: 'Access hallmarking compliance, AHC guidelines, and HUID verification',
      icon: Gem
    },
    {
      id: 'STUDENT',
      title: 'Student / Researcher',
      desc: 'Explore Indian Standards catalog, technical committees, and academic research',
      icon: GraduationCap
    }
  ];

  const quickDemoAccounts = [
    { role: 'MANUFACTURER' as UserRole, name: 'Ananya Sharma', org: 'Vayu Engineering Pvt Ltd', label: 'MSME Manufacturer' },
    { role: 'CONSUMER' as UserRole, name: 'Rajesh Kulkarni', org: 'Pune Consumer Forum', label: 'Citizen Consumer' },
    { role: 'JEWELLER' as UserRole, name: 'Priya Mehra', org: 'Mehra Jewellers & Assay', label: 'Jeweller / Hallmarking' },
    { role: 'LABORATORY' as UserRole, name: 'Dr. Suresh Nair', org: 'Central Quality Test Labs', label: 'Testing Laboratory' },
    { role: 'STUDENT' as UserRole, name: 'Kavita Sundaram', org: 'IIT Madras Standards Club', label: 'Student / Researcher' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || (selectedRole === 'MANUFACTURER' ? 'MSME Manufacturer Demo' : 'Citizen User');
    onSuccess(selectedRole, finalName);
    onClose();
  };

  const handleQuickFill = (acc: typeof quickDemoAccounts[0]) => {
    onSuccess(acc.role, acc.name);
    onClose();
  };

  return (
    <div 
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="auth-modal-dialog"
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 relative my-6"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
            DEMO ACCESS ONLY — NO PASSWORDS NEEDED
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1.5">
            {isRegister ? 'Create BISENCE Account' : 'Sign In to BISENCE'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select your user role to calibrate personalized compliance journeys and workspaces.
          </p>
        </div>

        {/* Evaluator Quick-Fill Section */}
        <div className="mb-5 p-3 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50">
          <div className="text-xs font-bold text-[#0F2C61] dark:text-blue-300 mb-2 flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>Evaluator 1-Click Demo Profiles:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickDemoAccounts.map((acc, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleQuickFill(acc)}
                className="text-xs px-2.5 py-1 rounded bg-white dark:bg-slate-800 hover:bg-[#0F2C61] hover:text-white dark:hover:bg-blue-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium transition shadow-2xs"
              >
                {acc.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Choice */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Choose Your Primary Persona / Role:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {rolesList.map(r => {
                const Icon = r.icon;
                const isSel = selectedRole === r.id;
                return (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRole(r.id)}
                    className={`p-2.5 rounded-lg border cursor-pointer transition flex items-start gap-2.5 ${
                      isSel
                        ? 'bg-blue-50/80 dark:bg-blue-950/40 border-[#0F2C61] dark:border-blue-500 ring-1 ring-[#0F2C61]'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className={`p-1.5 rounded-md mt-0.5 ${isSel ? 'bg-[#0F2C61] text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {r.title}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight mt-0.5">
                        {r.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Text Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g., Rajesh Kumar"
                className="w-full px-3 py-2 rounded-lg text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-[#0F2C61]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Email Address (Demo)
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3 py-2 rounded-lg text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-[#0F2C61]"
              />
            </div>
          </div>

          {selectedRole !== 'CONSUMER' && (
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Company / Organization / Institution Name
              </label>
              <input
                type="text"
                value={orgOrInstitution}
                onChange={e => setOrgOrInstitution(e.target.value)}
                placeholder="e.g., Bharat Appliances Ltd."
                className="w-full px-3 py-2 rounded-lg text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-[#0F2C61]"
              />
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg text-xs font-bold bg-[#0F2C61] hover:bg-[#163D7A] text-white shadow-sm transition flex items-center justify-center gap-2"
            >
              <span>{isRegister ? 'Register & Continue' : 'Sign In as Selected Role'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-[#0F2C61] dark:text-blue-400 hover:underline"
            >
              {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
