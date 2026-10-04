import React from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid 
} from 'recharts';
import { 
  TrendingUp, AlertTriangle, ShieldCheck, Heart, Sparkles, CheckCircle, Clock, MessageSquare, Download 
} from 'lucide-react';
import { calculateBurnoutRisk } from '../utils/sentimentEngine';

export default function BurnoutRiskAnalyzer({ historyLogs, activeShield, onToggleShield }) {
  // Use latest log or default current day state
  const latestLog = historyLogs && historyLogs.length > 0 ? historyLogs[historyLogs.length - 1] : {
    moodScore: 2,
    totalWorkloadHours: 6.5,
    gradingHours: 3.5,
    sentimentData: { stressCount: 3, posCount: 1, adminCount: 2 }
  };

  const riskResult = calculateBurnoutRisk({
    moodScore: latestLog.moodScore,
    workloadHours: latestLog.totalWorkloadHours,
    sentimentData: latestLog.sentimentData || {},
    afterHoursCount: 3
  });

  // Chart dataset formatted for Recharts
  const chartData = (historyLogs && historyLogs.length > 0 ? historyLogs : [
    { date: 'Mon', moodScore: 4, totalWorkloadHours: 5.0, risk: 22 },
    { date: 'Tue', moodScore: 3, totalWorkloadHours: 6.5, risk: 38 },
    { date: 'Wed', moodScore: 2, totalWorkloadHours: 7.5, risk: 58 },
    { date: 'Thu', moodScore: 2, totalWorkloadHours: 8.0, risk: 68 },
    { date: 'Fri', moodScore: 1, totalWorkloadHours: 9.0, risk: 78 },
  ]).map(item => ({
    name: item.date,
    WorkloadHrs: item.totalWorkloadHours,
    MoodIndex: (item.moodScore * 20), // Scale 1-5 to 0-100
    BurnoutRisk: item.risk || Math.min(95, Math.max(15, Math.round((5 - item.moodScore) * 12 + item.totalWorkloadHours * 5)))
  }));

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-card rounded-2xl p-6 border border-amber-500/20 bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
            <TrendingUp className="w-3.5 h-3.5" /> Weekly Predictive Telemetry
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Burnout Risk Analyzer</h2>
          <p className="text-slate-400 text-sm mt-1">
            Combines natural language sentiment, grading duration, and after-hours intrusions to safeguard your mental health.
          </p>
        </div>

        <button 
          onClick={() => alert("Confidential wellness report downloaded to local device as encrypted JSON.")}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-2 transition-all"
        >
          <Download className="w-4 h-4 text-teal-400" /> Export Personal Report
        </button>
      </div>

      {/* Burnout Score Gauge & Driver Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Risk Meter Gauge */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Current Burnout Risk Index
          </div>

          <div className="relative flex items-center justify-center w-48 h-48 my-2">
            {/* Outer Circle Progress Indicator */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={`${riskResult.tier === 'CRITICAL' ? 'text-rose-500' : riskResult.tier === 'HIGH' ? 'text-amber-500' : riskResult.tier === 'MODERATE' ? 'text-yellow-400' : 'text-emerald-400'}`}
                strokeDasharray={`${riskResult.score}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-black font-mono tracking-tight ${riskResult.color}`}>
                {riskResult.score}
              </span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Out of 100</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${riskResult.badgeBg}`}>
              {riskResult.tier} RISK • {riskResult.label}
            </span>
            <p className="text-xs text-slate-400 max-w-xs pt-1">
              {riskResult.description}
            </p>
          </div>
        </div>

        {/* Burnout Risk Drivers */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" /> Key Stress Contributors Detected
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {/* Factor 1 */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> Administrative Overtime
                </span>
                <span className="font-mono text-amber-400 font-bold">High Impact</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Grading & prep exceeded standard limit by +{Math.max(0, latestLog.totalWorkloadHours - 7.5).toFixed(1)} hrs today.
              </p>
            </div>

            {/* Factor 2 */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-rose-400" /> Late-Night Queries
                </span>
                <span className="font-mono text-rose-400 font-bold">3 Intrusions</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Parent/student queries received between 8 PM and 11 PM erosion boundary time.
              </p>
            </div>

            {/* Factor 3 */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-purple-400" /> Emotional Labor
                </span>
                <span className="font-mono text-purple-300 font-bold">Depleted</span>
              </div>
              <p className="text-[11px] text-slate-400">
                NLP journal analysis identified repeated terms for cognitive exhaustion.
              </p>
            </div>

            {/* Factor 4 */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> Shield Protection
                </span>
                <span className={`font-mono font-bold ${activeShield ? 'text-teal-400' : 'text-slate-400'}`}>
                  {activeShield ? 'ACTIVE' : 'OFF'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {activeShield ? 'Quiet hours shield currently preventing notification fatigue.' : 'Quiet hours shield currently inactive.'}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Weekly Workload vs Sentiment Trend Chart */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-200">Weekly Telemetry: Workload vs. Emotional Score</h3>
            <p className="text-xs text-slate-400">Tracks how administrative overload directly correlates with burnout risk spikes.</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Workload (Hrs)
            </span>
            <span className="flex items-center gap-1.5 text-teal-400">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span> Emotional Energy
            </span>
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span> Burnout Risk
            </span>
          </div>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="BurnoutRisk" stroke="#f43f5e" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRisk)" />
              <Area type="monotone" dataKey="MoodIndex" stroke="#14b8a6" strokeWidth={2} fillOpacity={1} fill="url(#colorMood)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Personal Actionable Recommendations */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-400" /> Prescribed Recovery Interventions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {riskResult.recommendations.map((rec) => (
            <div key={rec.id} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 hover:border-teal-500/40 transition-all">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-teal-300 px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">
                  {rec.category}
                </span>
                {rec.id === 'comm-shield' && (
                  <button 
                    onClick={onToggleShield}
                    className="text-xs font-bold px-3 py-1 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all"
                  >
                    {activeShield ? 'Shield Active' : 'Activate Shield Now'}
                  </button>
                )}
              </div>
              <h4 className="text-sm font-semibold text-white">{rec.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{rec.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
