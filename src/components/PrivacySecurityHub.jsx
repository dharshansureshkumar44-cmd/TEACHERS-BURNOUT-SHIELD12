import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, EyeOff, Key, Database, CheckCircle2, AlertCircle, ArrowRight, RefreshCw 
} from 'lucide-react';

export default function PrivacySecurityHub() {
  const [sampleRawText, setSampleRawText] = useState(
    "Exhausted from 4 hours of AP History essay grading. Frustrated by parent email from Patricia Vance demanding immediate callback at 9:45 PM."
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 border border-emerald-500/20 bg-gradient-to-r from-slate-900 via-emerald-950/20 to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <Lock className="w-3.5 h-3.5" /> Zero Punitive Tracking Architecture
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Privacy & Confidentiality Guarantee</h2>
          <p className="text-slate-400 text-sm mt-1">
            Built to strictly protect educators from administrative surveillance, punitive tracking, or performance evaluation misuse.
          </p>
        </div>

        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <ShieldCheck className="w-4 h-4" /> Confidentiality Lock Enabled
        </div>
      </div>

      {/* 3 Core Pillars of Protection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-card rounded-2xl p-6 space-y-3 border-l-4 border-l-emerald-500">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
            <Key className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">1. Local Encrypted Storage</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your daily mood ratings, journal reflections, and personal micro-break notes remain strictly encrypted on your local device.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 space-y-3 border-l-4 border-l-teal-500">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">2. Differential Privacy Aggregation</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            School administration receives aggregate index scores only when N ≥ 5 teachers participate. Individual identities are mathematically erased.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 space-y-3 border-l-4 border-l-indigo-500">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">3. Anti-Punitive Governance</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Data contracts prohibit administration from referencing burnout telemetry in tenure reviews, evaluations, or staffing penalties.
          </p>
        </div>

      </div>

      {/* Interactive Data Flow Anonymization Visualizer */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-teal-400" /> Interactive Anonymization Pipeline Simulator
        </h3>
        <p className="text-xs text-slate-400">
          Compare what you write in your private journal versus what administration sees in their institutional dashboard.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 pt-2 items-center">
          
          {/* Educator Private Record */}
          <div className="lg:col-span-5 p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-rose-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-rose-400" /> Educator Private Journal Record
              </span>
              <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-mono">
                100% Locked to Educator
              </span>
            </div>

            <textarea
              rows={3}
              value={sampleRawText}
              onChange={(e) => setSampleRawText(e.target.value)}
              className="w-full text-xs font-sans bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-200 resize-none"
            />
            <p className="text-[11px] text-slate-400 italic">
              Contains names, specific emotional state, and personal notes.
            </p>
          </div>

          {/* Pipeline Arrow */}
          <div className="lg:col-span-1 flex items-center justify-center text-teal-400 py-2">
            <ArrowRight className="w-6 h-6 hidden lg:block" />
            <span className="text-xs font-bold text-teal-400 lg:hidden">Anonymized Pipeline ⬇</span>
          </div>

          {/* Admin Aggregated Output */}
          <div className="lg:col-span-5 p-4 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Administration Telemetry Output
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                Anonymized Aggregated
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono space-y-1.5 text-slate-300">
              <div><span className="text-slate-500">Dept_Id:</span> "Humanities_Dept"</div>
              <div><span className="text-slate-500">Agg_Burnout_Risk:</span> 68 / 100</div>
              <div><span className="text-slate-500">Avg_Grading_Overtime:</span> 3.8 hrs</div>
              <div><span className="text-slate-500">PII_Stripped:</span> true</div>
              <div><span className="text-slate-500">Raw_Text_Exposed:</span> FALSE (Permanently Encrypted)</div>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Contains ZERO names or personal text. Protects individual teacher identity completely.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
