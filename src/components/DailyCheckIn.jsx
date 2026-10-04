import React, { useState } from 'react';
import { 
  Smile, Frown, Meh, Sparkles, HeartPulse, Clock, FileText, 
  CheckCircle2, AlertCircle, ShieldCheck, Zap, Lightbulb 
} from 'lucide-react';
import { analyzeSentiment } from '../utils/sentimentEngine';

const MOOD_OPTIONS = [
  { level: 1, label: 'Exhausted', emoji: '😫', color: 'border-rose-500/50 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20' },
  { level: 2, label: 'Drained', emoji: '😔', color: 'border-amber-500/50 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20' },
  { level: 3, label: 'Steady', emoji: '😐', color: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20' },
  { level: 4, label: 'Energized', emoji: '😊', color: 'border-teal-500/50 bg-teal-500/10 text-teal-300 hover:bg-teal-500/20' },
  { level: 5, label: 'Thriving', emoji: '🌟', color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20' },
];

export default function DailyCheckIn({ currentData, onSaveEntry }) {
  const [selectedMood, setSelectedMood] = useState(currentData?.moodScore || 2);
  const [gradingHours, setGradingHours] = useState(currentData?.gradingHours || 2.5);
  const [prepHours, setPrepHours] = useState(currentData?.prepHours || 2.0);
  const [meetingHours, setMeetingHours] = useState(currentData?.meetingHours || 1.5);
  const [journalText, setJournalText] = useState(
    currentData?.journalText || "Spent 3 hours grading AP History essays tonight. Feeling overwhelmed by the stack of late resubmissions and parent emails."
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Live sentiment analysis
  const sentiment = analyzeSentiment(journalText);
  const totalWorkloadHours = Number(gradingHours) + Number(prepHours) + Number(meetingHours);

  const handleSave = () => {
    const entry = {
      date: new Date().toISOString().split('T')[0],
      moodScore: selectedMood,
      gradingHours: Number(gradingHours),
      prepHours: Number(prepHours),
      meetingHours: Number(meetingHours),
      totalWorkloadHours,
      journalText,
      sentimentData: sentiment,
    };
    onSaveEntry(entry);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-card rounded-2xl p-6 border border-teal-500/20 bg-gradient-to-r from-slate-900 via-teal-950/20 to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <HeartPulse className="w-48 h-48 text-teal-400" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" /> Private Educator Sanctuary
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Daily Emotional & Workload Check-In</h2>
          <p className="text-slate-400 text-sm mt-1">
            Log your daily energy, administrative burden, and feelings. Your journal entries are 100% confidential and encrypted locally.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-3 animate-pulse">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div className="text-sm font-medium">
            Daily log recorded securely! Burnout Shield algorithms have updated your wellness telemetry.
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Mood Selector */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-400" /> 1. How is your emotional energy today?
              </label>
              <span className="text-xs text-slate-400 font-mono">Confidential</span>
            </div>

            <div className="grid grid-cols-5 gap-2.5">
              {MOOD_OPTIONS.map((item) => {
                const isSelected = selectedMood === item.level;
                return (
                  <button
                    key={item.level}
                    type="button"
                    onClick={() => setSelectedMood(item.level)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                      isSelected
                        ? `${item.color} ring-2 ring-teal-400 scale-[1.03] shadow-lg shadow-teal-500/10`
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-2xl mb-1">{item.emoji}</span>
                    <span className="text-xs font-semibold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Administrative Workload Breakdown */}
          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" /> 2. Administrative Time Log (Hours Today)
              </label>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Total: {totalWorkloadHours.toFixed(1)} hrs
              </span>
            </div>

            <div className="space-y-4">
              {/* Grading Slider */}
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                  <span>Grading & Feedback</span>
                  <span className="font-mono text-teal-400">{gradingHours} hrs</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  step="0.5"
                  value={gradingHours}
                  onChange={(e) => setGradingHours(e.target.value)}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
              </div>

              {/* Lesson Prep Slider */}
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                  <span>Lesson Prep & Material Creation</span>
                  <span className="font-mono text-teal-400">{prepHours} hrs</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={prepHours}
                  onChange={(e) => setPrepHours(e.target.value)}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
              </div>

              {/* Meetings Slider */}
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                  <span>Administrative Meetings & IEP Compliance</span>
                  <span className="font-mono text-teal-400">{meetingHours} hrs</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="0.5"
                  value={meetingHours}
                  onChange={(e) => setMeetingHours(e.target.value)}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Journal Reflection */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-400" /> 3. Natural Language Reflection & Stress Log
              </label>
              <span className="text-xs text-slate-400">NLP Powered</span>
            </div>

            <textarea
              rows={4}
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="Express how your day felt... e.g., 'Grading took up my entire evening, felt stressed about parent emails, but students enjoyed today's science demo.'"
              className="w-full rounded-xl p-3.5 glass-input text-sm text-slate-100 placeholder-slate-500 focus:outline-none resize-none"
            />

            <button
              type="button"
              onClick={handleSave}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Save Confidential Check-In Log
            </button>
          </div>
        </div>

        {/* Right Column: NLP Live Insights & Micro-Break Assistant */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Real-time NLP Analysis Card */}
          <div className="glass-card rounded-2xl p-6 space-y-4 border-l-4 border-l-teal-500">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Zap className="w-4 h-4 text-teal-400" /> Real-Time NLP Sentiment Analysis
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Detected Tone Category:</span>
                <span className="font-semibold text-teal-300">{sentiment.sentimentCategory}</span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {sentiment.detectedEmotions.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-semibold bg-teal-500/10 border border-teal-500/20 text-teal-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
              <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="text-emerald-400 font-bold font-mono text-base">{sentiment.posCount}</div>
                <div className="text-slate-400 text-[10px]">Positive Signals</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="text-rose-400 font-bold font-mono text-base">{sentiment.stressCount}</div>
                <div className="text-slate-400 text-[10px]">Stress Triggers</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="text-amber-400 font-bold font-mono text-base">{sentiment.adminCount}</div>
                <div className="text-slate-400 text-[10px]">Admin Keywords</div>
              </div>
            </div>
          </div>

          {/* Micro-Break & Boundary Recommendation Card */}
          <div className="glass-card rounded-2xl p-6 space-y-4 bg-gradient-to-b from-slate-900 to-slate-950">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" /> AI Decompression Prescription
            </h3>

            {totalWorkloadHours > 5.5 || sentiment.stressCount > 1 ? (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4" /> Recommended Relief Protocol
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your entry indicates elevated grading pressure and late-night task cognitive fatigue.
                </p>
                <ul className="text-xs space-y-1.5 text-slate-300 list-disc list-inside pt-1">
                  <li>Enable <strong>Quiet Hours Shield</strong> from 5:30 PM today.</li>
                  <li>Cap remaining grading to 30 minutes using batch rubrics.</li>
                  <li>Perform a 5-minute breathing reset before closing your laptop.</li>
                </ul>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" /> Balanced Energy State
                </div>
                <p className="text-xs text-slate-300">
                  Great job staying within healthy parameters today! Keep maintaining your evening boundaries.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
