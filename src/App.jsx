import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, HeartPulse, TrendingUp, BellOff, Lock, Building2, 
  Sparkles, Layers, RotateCcw, CheckCircle2, User, ChevronRight 
} from 'lucide-react';

import DailyCheckIn from './components/DailyCheckIn';
import BurnoutRiskAnalyzer from './components/BurnoutRiskAnalyzer';
import CommunicationShield from './components/CommunicationShield';
import AdminWellnessDashboard from './components/AdminWellnessDashboard';
import PrivacySecurityHub from './components/PrivacySecurityHub';

const SEED_HISTORY_LOGS = [
  { date: 'Mon', moodScore: 4, totalWorkloadHours: 5.0, gradingHours: 1.5, prepHours: 2.0, meetingHours: 1.5, journalText: "Great energy in class today! Finished lesson prep early.", sentimentData: { stressCount: 0, posCount: 2, adminCount: 1 } },
  { date: 'Tue', moodScore: 3, totalWorkloadHours: 6.5, gradingHours: 3.0, prepHours: 2.0, meetingHours: 1.5, journalText: "Grading essay stack took longer than expected. Feeling slightly tired.", sentimentData: { stressCount: 1, posCount: 1, adminCount: 2 } },
  { date: 'Wed', moodScore: 2, totalWorkloadHours: 7.5, gradingHours: 4.0, prepHours: 2.0, meetingHours: 1.5, journalText: "Late parent email kept me up. Overwhelmed by the stack of rubrics.", sentimentData: { stressCount: 3, posCount: 0, adminCount: 3 } },
  { date: 'Thu', moodScore: 2, totalWorkloadHours: 8.0, gradingHours: 4.5, prepHours: 2.0, meetingHours: 1.5, journalText: "Stressed about administrative meetings and grading backlog.", sentimentData: { stressCount: 3, posCount: 0, adminCount: 2 } },
  { date: 'Fri', moodScore: 1, totalWorkloadHours: 9.0, gradingHours: 5.0, prepHours: 2.5, meetingHours: 1.5, journalText: "Completely exhausted. Spent 5 hours grading AP History essays tonight.", sentimentData: { stressCount: 4, posCount: 0, adminCount: 3 } }
];

export default function App() {
  const [role, setRole] = useState('EDUCATOR'); // EDUCATOR | ADMIN
  const [activeTab, setActiveTab] = useState('CHECK_IN'); // CHECK_IN, ANALYZER, SHIELD, PRIVACY
  const [activeShield, setActiveShield] = useState(true);
  const [historyLogs, setHistoryLogs] = useState(() => {
    const saved = localStorage.getItem('tb_shield_history');
    return saved ? JSON.parse(saved) : SEED_HISTORY_LOGS;
  });

  useEffect(() => {
    localStorage.setItem('tb_shield_history', JSON.stringify(historyLogs));
  }, [historyLogs]);

  const handleSaveEntry = (newEntry) => {
    setHistoryLogs([...historyLogs, newEntry]);
  };

  const handleResetData = () => {
    setHistoryLogs(SEED_HISTORY_LOGS);
    localStorage.setItem('tb_shield_history', JSON.stringify(SEED_HISTORY_LOGS));
    alert("Telemetry data reset to default demonstration logs.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 glass-card border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-slate-950 shadow-lg shadow-teal-500/20 font-black text-xl">
              🛡️
              {activeShield && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse"></span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight text-white">Teacher Burnout Shield</h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 border border-teal-500/30 text-teal-300">
                  v1.0
                </span>
              </div>
              <p className="text-xs text-slate-400">Educator Boundary & Wellness Management System</p>
            </div>
          </div>

          {/* Center/Right Controls & Role Switcher */}
          <div className="flex items-center gap-3">
            
            {/* Quick Shield Status Pill */}
            <button
              onClick={() => setActiveShield(!activeShield)}
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                activeShield
                  ? 'bg-teal-500/15 border-teal-500/30 text-teal-300 hover:bg-teal-500/25'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <BellOff className={`w-3.5 h-3.5 ${activeShield ? 'text-teal-400 animate-pulse' : ''}`} />
              <span>Shield: {activeShield ? 'ACTIVE' : 'PAUSED'}</span>
            </button>

            {/* Role Switcher Button */}
            <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex items-center text-xs font-bold">
              <button
                onClick={() => setRole('EDUCATOR')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  role === 'EDUCATOR'
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <User className="w-3.5 h-3.5" /> Educator
              </button>
              <button
                onClick={() => setRole('ADMIN')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  role === 'ADMIN'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" /> School Admin
              </button>
            </div>

            {/* Reset Demo Data */}
            <button
              onClick={handleResetData}
              title="Reset Demo Data"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Navigation Tabs for Educator View */}
        {role === 'EDUCATOR' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveTab('CHECK_IN')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'CHECK_IN'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-lg shadow-teal-500/10'
                  : 'bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <HeartPulse className="w-4 h-4 text-teal-400" /> Daily Check-In UI
            </button>

            <button
              onClick={() => setActiveTab('ANALYZER')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'ANALYZER'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-lg shadow-teal-500/10'
                  : 'bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-amber-400" /> Burnout Risk Analyzer
            </button>

            <button
              onClick={() => setActiveTab('SHIELD')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'SHIELD'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-lg shadow-teal-500/10'
                  : 'bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-teal-400" /> Communication Shield
            </button>

            <button
              onClick={() => setActiveTab('PRIVACY')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'PRIVACY'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-lg shadow-teal-500/10'
                  : 'bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Lock className="w-4 h-4 text-emerald-400" /> Privacy & Access Control
            </button>
          </div>
        )}

        {/* View Switch Logic */}
        {role === 'ADMIN' ? (
          <AdminWellnessDashboard />
        ) : (
          <>
            {activeTab === 'CHECK_IN' && (
              <DailyCheckIn 
                currentData={historyLogs[historyLogs.length - 1]} 
                onSaveEntry={handleSaveEntry} 
              />
            )}

            {activeTab === 'ANALYZER' && (
              <BurnoutRiskAnalyzer 
                historyLogs={historyLogs} 
                activeShield={activeShield} 
                onToggleShield={() => setActiveShield(!activeShield)} 
              />
            )}

            {activeTab === 'SHIELD' && (
              <CommunicationShield 
                activeShield={activeShield} 
                onToggleShield={() => setActiveShield(!activeShield)} 
              />
            )}

            {activeTab === 'PRIVACY' && (
              <PrivacySecurityHub />
            )}
          </>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>🛡️ Teacher Burnout Shield</span>
            <span>•</span>
            <span>Problem Statement 17 Solution</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Lock className="w-3 h-3" /> Encrypted & Anonymized
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
