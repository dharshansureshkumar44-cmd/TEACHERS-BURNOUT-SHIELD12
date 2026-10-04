import React, { useState } from 'react';
import { 
  Building2, ShieldCheck, Lock, AlertTriangle, Users, TrendingUp, 
  CheckCircle2, Sparkles, PieChart, Layers, HeartPulse, Zap 
} from 'lucide-react';

export default function AdminWellnessDashboard() {
  const [departmentData, setDepartmentData] = useState([
    { id: 'math', name: 'Mathematics Dept', teacherCount: 12, avgBurnoutRisk: 72, riskLevel: 'HIGH', overtimeHrs: 16.4, boundaryProtection: '82%' },
    { id: 'sci', name: 'Science & STEM', teacherCount: 14, avgBurnoutRisk: 64, riskLevel: 'MODERATE', overtimeHrs: 12.8, boundaryProtection: '89%' },
    { id: 'eng', name: 'Humanities & English', teacherCount: 18, avgBurnoutRisk: 78, riskLevel: 'CRITICAL', overtimeHrs: 19.2, boundaryProtection: '74%' },
    { id: 'art', name: 'Arts & Music', teacherCount: 8, avgBurnoutRisk: 34, riskLevel: 'LOW', overtimeHrs: 5.5, boundaryProtection: '95%' },
    { id: 'sped', name: 'Special Education (IEP)', teacherCount: 10, avgBurnoutRisk: 84, riskLevel: 'CRITICAL', overtimeHrs: 21.0, boundaryProtection: '68%' },
  ]);

  const [policyActions, setPolicyActions] = useState([
    { id: 'act-1', name: 'Campus-Wide Evening Email Lock (6 PM - 7 AM)', status: 'ACTIVE', impact: 'Prevents admin email intrusion on teacher off-hours' },
    { id: 'act-2', name: 'Floating Grading Support Allocation', status: 'PENDING', impact: 'Deploys 2 TA positions to Humanities & SPED departments' },
    { id: 'act-3', name: 'Institutional Wellness Day Credit', status: 'ACTIVE', impact: 'Provides 2 peer-covered wellness flex days per semester' },
  ]);

  const togglePolicy = (id) => {
    setPolicyActions(policyActions.map(p => {
      if (p.id === id) {
        return { ...p, status: p.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE' };
      }
      return p;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-card rounded-2xl p-6 border border-indigo-500/20 bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
            <Building2 className="w-3.5 h-3.5" /> Institutional Administration Portal
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">School Wellness & Burnout Analytics</h2>
          <p className="text-slate-400 text-sm mt-1">
            Systemic telemetry enabling school leadership to identify department-level administrative overload without violating teacher privacy.
          </p>
        </div>

        {/* Confidentiality Guard Badge */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/40 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <div className="font-bold text-emerald-300">Privacy Safeguard Active</div>
            <div className="text-slate-400">Strict Anonymized Aggregation (N ≥ 5)</div>
          </div>
        </div>
      </div>

      {/* Aggregate School Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card rounded-2xl p-5 space-y-2 border-l-4 border-l-amber-500">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Institutional Burnout Index</div>
          <div className="text-3xl font-black text-amber-400 font-mono">66.4</div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-amber-400" /> +4.2% from last month
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-2 border-l-4 border-l-rose-500">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Grading Overtime</div>
          <div className="text-3xl font-black text-rose-400 font-mono">14.9 <span className="text-xs text-slate-400">hrs/wk</span></div>
          <div className="text-[11px] text-slate-400">
            High overload in SPED & Humanities
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-2 border-l-4 border-l-teal-500">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quiet Hours Shield Rate</div>
          <div className="text-3xl font-black text-teal-400 font-mono">84.2%</div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-teal-400" /> 62 teachers protected
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-2 border-l-4 border-l-indigo-500">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Educator Count</div>
          <div className="text-3xl font-black text-indigo-300 font-mono">62</div>
          <div className="text-[11px] text-slate-400">
            100% anonymized data stream
          </div>
        </div>

      </div>

      {/* Departmental Heatmap & Overload Matrix */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-400" /> Departmental Administrative Heatmap
            </h3>
            <p className="text-xs text-slate-400">
              Allows administration to allocate resources directly to overloaded faculties.
            </p>
          </div>

          <span className="text-xs font-mono text-slate-400">
            Updated: Live Telemetry
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Educators</th>
                <th className="py-3 px-4">Avg Burnout Risk</th>
                <th className="py-3 px-4">Avg Overtime / Wk</th>
                <th className="py-3 px-4">Shield Rate</th>
                <th className="py-3 px-4 text-right">Systemic Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {departmentData.map((dept) => (
                <tr key={dept.id} className="hover:bg-slate-900/50 transition-all">
                  <td className="py-3.5 px-4 font-bold text-slate-200">{dept.name}</td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono">{dept.teacherCount} teachers</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-md font-bold font-mono ${
                      dept.riskLevel === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                      dept.riskLevel === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      dept.riskLevel === 'MODERATE' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {dept.avgBurnoutRisk} / 100 ({dept.riskLevel})
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 font-mono">{dept.overtimeHrs} hrs</td>
                  <td className="py-3.5 px-4 text-teal-400 font-mono font-bold">{dept.boundaryProtection}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => alert(`Systemic relief package (TA hours & grading caps) dispatched to ${dept.name}.`)}
                      className="px-3 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-[11px] font-bold transition-all"
                    >
                      Deploy Relief Support
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Institutional Policy Action Hub */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" /> Administrative Policy & Workload Controls
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {policyActions.map((policy) => (
            <div key={policy.id} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    policy.status === 'ACTIVE' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {policy.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white">{policy.name}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{policy.impact}</p>
              </div>

              <button
                onClick={() => togglePolicy(policy.id)}
                className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${
                  policy.status === 'ACTIVE'
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    : 'bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold'
                }`}
              >
                {policy.status === 'ACTIVE' ? 'Modify Policy' : 'Enforce Policy'}
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
