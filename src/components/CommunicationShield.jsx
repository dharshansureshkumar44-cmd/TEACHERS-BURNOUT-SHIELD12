import React, { useState } from 'react';
import { 
  ShieldCheck, ShieldAlert, Clock, MessageSquare, Send, CheckCircle2, 
  AlertTriangle, Filter, Sparkles, User, BellOff, Bell, Play, RefreshCw 
} from 'lucide-react';
import { MOCK_INCOMING_MESSAGES, triageQuery } from '../utils/communicationShieldEngine';

export default function CommunicationShield({ activeShield, onToggleShield }) {
  const [quietStart, setQuietStart] = useState('17:00');
  const [quietEnd, setQuietEnd] = useState('07:30');
  const [weekendLock, setWeekendLock] = useState(true);

  // Message feed state
  const [messages, setMessages] = useState(MOCK_INCOMING_MESSAGES);
  const [simulatedCustomText, setSimulatedCustomText] = useState('');
  const [simulatedParentName, setSimulatedParentName] = useState('Helena Troy (Parent)');
  const [activeTab, setActiveTab] = useState('ALL'); // ALL, SHIELDED, EMERGENCY

  // Add custom simulated message
  const handleSimulateCustom = (e) => {
    e.preventDefault();
    if (!simulatedCustomText.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      senderName: simulatedParentName || 'Parent Query',
      senderType: 'Parent',
      studentName: 'Student',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isLateHours: true,
      rawText: simulatedCustomText,
      urgencyLevel: 'CUSTOM'
    };

    setMessages([newMsg, ...messages]);
    setSimulatedCustomText('');
  };

  // Filter messages based on tab
  const triagedList = messages.map(msg => ({
    ...msg,
    triaged: triageQuery(msg)
  }));

  const filteredList = triagedList.filter(item => {
    if (activeTab === 'SHIELDED') return item.triaged.status !== 'EMERGENCY_BYPASS';
    if (activeTab === 'EMERGENCY') return item.triaged.status === 'EMERGENCY_BYPASS';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Quiet Hours Control */}
      <div className="glass-card rounded-2xl p-6 border border-teal-500/20 bg-gradient-to-r from-slate-900 via-teal-950/20 to-slate-900 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="max-w-xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> Automated Boundary Defense
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">After-Hours Communication Shield</h2>
          <p className="text-slate-400 text-sm">
            Context-aware AI response agent that filters late-night student/parent queries, softens hostile email tone, and preserves personal evening boundaries.
          </p>
        </div>

        {/* Master Shield Switcher Card */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-4 w-full lg:w-auto justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${activeShield ? 'bg-teal-500/20 text-teal-400 border border-teal-500/40' : 'bg-slate-800 text-slate-500'}`}>
              {activeShield ? <BellOff className="w-6 h-6 animate-pulse" /> : <Bell className="w-6 h-6" />}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Quiet Hours Shield</div>
              <div className={`text-sm font-extrabold ${activeShield ? 'text-teal-400' : 'text-slate-400'}`}>
                {activeShield ? 'ACTIVE (5:00 PM - 7:30 AM)' : 'PAUSED'}
              </div>
            </div>
          </div>

          <button
            onClick={onToggleShield}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md ${
              activeShield
                ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40'
                : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/20'
            }`}
          >
            {activeShield ? 'Pause Shield' : 'Activate Shield'}
          </button>
        </div>
      </div>

      {/* Boundary Hours Configuration Bar */}
      <div className="glass-card rounded-2xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium border-l-4 border-l-teal-500">
        <div className="flex items-center gap-3">
          <Clock className="w-4 h-4 text-teal-400 flex-shrink-0" />
          <div className="space-y-0.5">
            <span className="text-slate-400">Quiet Hours Start:</span>
            <input 
              type="time" 
              value={quietStart} 
              onChange={(e) => setQuietStart(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 ml-2 font-mono"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="w-4 h-4 text-teal-400 flex-shrink-0" />
          <div className="space-y-0.5">
            <span className="text-slate-400">Quiet Hours End:</span>
            <input 
              type="time" 
              value={quietEnd} 
              onChange={(e) => setQuietEnd(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 ml-2 font-mono"
            />
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3">
          <span className="text-slate-300">Weekend Auto-Lock:</span>
          <button 
            type="button"
            onClick={() => setWeekendLock(!weekendLock)}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
              weekendLock ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'bg-slate-800 text-slate-500'
            }`}
          >
            {weekendLock ? 'ENABLED (Sat-Sun Lock)' : 'DISABLED'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Live Shield Triage Stream */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Header & Category Filters */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" /> Incoming Query Triage Feed
            </h3>

            <div className="flex gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('ALL')}
                className={`px-3 py-1 rounded-lg transition-all ${activeTab === 'ALL' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                All ({triagedList.length})
              </button>
              <button
                onClick={() => setActiveTab('SHIELDED')}
                className={`px-3 py-1 rounded-lg transition-all ${activeTab === 'SHIELDED' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Shielded ({triagedList.filter(i => i.triaged.status !== 'EMERGENCY_BYPASS').length})
              </button>
              <button
                onClick={() => setActiveTab('EMERGENCY')}
                className={`px-3 py-1 rounded-lg transition-all ${activeTab === 'EMERGENCY' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Safety Alerts ({triagedList.filter(i => i.triaged.status === 'EMERGENCY_BYPASS').length})
              </button>
            </div>
          </div>

          {/* Feed Items */}
          <div className="space-y-4">
            {filteredList.map((item) => {
              const { triaged } = item;
              return (
                <div 
                  key={item.id} 
                  className={`glass-card rounded-2xl p-5 border transition-all space-y-3 ${
                    triaged.status === 'EMERGENCY_BYPASS'
                      ? 'border-rose-500/40 bg-rose-950/10'
                      : triaged.status === 'SHIELDED_TONE_SOFTENED'
                      ? 'border-amber-500/30 bg-slate-900/90'
                      : 'border-slate-800 bg-slate-900/60'
                  }`}
                >
                  {/* Item Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-xs">
                        <User className="w-4 h-4 text-teal-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          {item.senderName}
                          <span className="text-[10px] text-slate-400 font-normal">({item.studentName})</span>
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <Clock className="w-3 h-3 text-slate-500" /> {item.timestamp} (After Hours)
                        </div>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${triaged.badgeColor} self-start sm:self-auto`}>
                      {triaged.actionLabel}
                    </span>
                  </div>

                  {/* Raw Text vs Tone Shielded Summary */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-400">Original Incoming Email / Message:</div>
                    <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 italic leading-relaxed">
                      "{item.rawText}"
                    </p>

                    {triaged.status === 'SHIELDED_TONE_SOFTENED' && (
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
                        <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                          <ShieldAlert className="w-3.5 h-3.5" /> Tone Transformer Summary (Hostility Neutralized)
                        </div>
                        <p className="text-xs text-slate-200 font-medium">
                          {triaged.toneSoftenedText}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* AI Response Agent Draft */}
                  <div className="p-3.5 rounded-xl bg-slate-950/90 border border-teal-500/20 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-teal-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Context-Aware AI Auto-Reply Draft
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Scheduled: {triaged.scheduledTime}
                      </span>
                    </div>

                    <pre className="text-xs font-sans text-slate-300 whitespace-pre-wrap leading-relaxed bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                      {triaged.aiDraft}
                    </pre>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button 
                        onClick={() => alert(`Approved draft for ${item.senderName}. Scheduled dispatch for 8:15 AM.`)}
                        className="px-3 py-1.5 rounded-lg bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 border border-teal-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Queue Dispatch
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Live Simulator Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card rounded-2xl p-6 space-y-4 border border-teal-500/30">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Play className="w-4 h-4 text-teal-400" /> Incoming Query Simulator
            </h3>
            <p className="text-xs text-slate-400">
              Test how the AI Communication Shield processes late parent queries and handles hostile or emergency messages.
            </p>

            <form onSubmit={handleSimulateCustom} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  Sender Name / Role
                </label>
                <input
                  type="text"
                  value={simulatedParentName}
                  onChange={(e) => setSimulatedParentName(e.target.value)}
                  className="w-full glass-input rounded-xl p-2.5 text-xs text-slate-200"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  Late Night Message Content
                </label>
                <textarea
                  rows={3}
                  value={simulatedCustomText}
                  onChange={(e) => setSimulatedCustomText(e.target.value)}
                  placeholder="Type a demanding late night email or emergency notice..."
                  className="w-full glass-input rounded-xl p-2.5 text-xs text-slate-200 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/10"
              >
                <Send className="w-3.5 h-3.5" /> Simulate Incoming After-Hours Query
              </button>
            </form>

            <div className="border-t border-slate-800 pt-3 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Preset Scenarios</div>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSimulatedParentName('Dr. Gregory House (Parent)');
                    setSimulatedCustomText("I demand a complete re-grade of the midterm tonight! My son never gets B grades!");
                  }}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-left text-xs text-slate-300 transition-all"
                >
                  ⚡ Hostile Parent Re-grade Demand
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSimulatedParentName('Emergency Contacts (School Nurse)');
                    setSimulatedCustomText("URGENT SAFETY ALERT: Student Sarah requires inhaler confirmation for field trip tomorrow.");
                  }}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-rose-500/50 text-left text-xs text-slate-300 transition-all"
                >
                  🚨 Emergency Safety Alert (Bypass)
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
