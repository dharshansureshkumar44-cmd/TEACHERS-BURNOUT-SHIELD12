// Natural Language Sentiment & Burnout Risk Analysis Engine

const POSITIVE_MARKERS = [
  'great', 'happy', 'productive', 'accomplished', 'supported', 'inspired', 'grateful', 
  'relaxed', 'calm', 'energized', 'rewarding', 'enjoyed', 'progress', 'helpful', 'balanced'
];

const STRESS_MARKERS = [
  'overwhelmed', 'exhausted', 'tired', 'drained', 'stressed', 'anxious', 'impossible', 
  'too much', 'grading', 'stack', 'pile', 'late', 'demanding', 'unreasonable', 'frustrated',
  'burnout', 'no time', 'furious', 'swamped', 'can\'t keep up', 'depleted', 'headless'
];

const ADMIN_OVERLOAD_MARKERS = [
  'paperwork', 'compliance', 'meeting', 'grading', 'documentation', 'ieps', 'rubric',
  'administrative', 'bureaucracy', 'emails', 'reports', 'lesson plans', 'curriculum'
];

/**
 * Analyzes natural language journal entry or check-in note
 */
export function analyzeSentiment(text = "") {
  const lowerText = text.toLowerCase();
  
  let posCount = 0;
  let stressCount = 0;
  let adminCount = 0;

  POSITIVE_MARKERS.forEach(word => {
    if (lowerText.includes(word)) posCount++;
  });

  STRESS_MARKERS.forEach(word => {
    if (lowerText.includes(word)) stressCount++;
  });

  ADMIN_OVERLOAD_MARKERS.forEach(word => {
    if (lowerText.includes(word)) adminCount++;
  });

  const netScore = posCount - stressCount;
  let sentimentCategory = 'Neutral';
  if (netScore > 1) sentimentCategory = 'Positive & Fulfilling';
  else if (netScore < -2) sentimentCategory = 'High Emotional Strain';
  else if (netScore < 0) sentimentCategory = 'Moderate Fatigue';

  const detectedEmotions = [];
  if (stressCount > 2) detectedEmotions.push('Overwhelmed');
  if (adminCount > 2) detectedEmotions.push('Administrative Fatigue');
  if (posCount > 1) detectedEmotions.push('Fulfilling Moments');
  if (lowerText.includes('tired') || lowerText.includes('exhausted')) detectedEmotions.push('Physical Exhaustion');
  if (lowerText.includes('late') || lowerText.includes('parent')) detectedEmotions.push('Boundary Intrusion');

  if (detectedEmotions.length === 0) {
    detectedEmotions.push(netScore >= 0 ? 'Steady' : 'Mild Strain');
  }

  return {
    netScore,
    posCount,
    stressCount,
    adminCount,
    sentimentCategory,
    detectedEmotions,
  };
}

/**
 * Calculates Burnout Risk Index (0 - 100) based on multiple parameters:
 * - Mood Score (1-5)
 * - Workload Hours (Grading, Prep, Admin)
 * - Text Sentiment
 * - After-hours communications received
 */
export function calculateBurnoutRisk({ moodScore = 3, workloadHours = 8, sentimentData = {}, afterHoursCount = 2 }) {
  // Base score from inverse of mood (mood 1 = 40 pts, mood 5 = 0 pts)
  let riskScore = (5 - moodScore) * 10; // Max 40

  // Workload penalty (standard healthy limit = 7.5 hrs/day)
  if (workloadHours > 7.5) {
    const overtime = workloadHours - 7.5;
    riskScore += overtime * 6; // +6 pts per overtime hour
  }

  // Sentiment penalty
  if (sentimentData.stressCount) {
    riskScore += sentimentData.stressCount * 4;
  }
  if (sentimentData.adminCount) {
    riskScore += sentimentData.adminCount * 3;
  }
  if (sentimentData.posCount) {
    riskScore -= sentimentData.posCount * 3;
  }

  // After-hours intrusion penalty (+4 pts per late query)
  riskScore += afterHoursCount * 4;

  // Clamp 0 - 100
  riskScore = Math.max(5, Math.min(98, Math.round(riskScore)));

  let tier = 'LOW';
  let color = 'text-emerald-400';
  let badgeBg = 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
  let label = 'Healthy Boundary Balance';
  let description = 'Workload and emotional state are within sustainable parameters.';

  if (riskScore >= 75) {
    tier = 'CRITICAL';
    color = 'text-rose-500';
    badgeBg = 'bg-rose-500/15 border-rose-500/30 text-rose-400';
    label = 'Critical Burnout Alert';
    description = 'Immediate boundary enforcement and administrative workload relief required.';
  } else if (riskScore >= 50) {
    tier = 'HIGH';
    color = 'text-amber-500';
    badgeBg = 'bg-amber-500/15 border-amber-500/30 text-amber-400';
    label = 'High Exhaustion Risk';
    description = 'Elevated emotional labor and administrative fatigue detected.';
  } else if (riskScore >= 25) {
    tier = 'MODERATE';
    color = 'text-yellow-400';
    badgeBg = 'bg-yellow-500/15 border-yellow-500/30 text-yellow-300';
    label = 'Moderate Stress Warning';
    description = 'Minor boundary erosion detected. Monitor grading & email hours.';
  }

  return {
    score: riskScore,
    tier,
    color,
    badgeBg,
    label,
    description,
    recommendations: generateRecommendations(riskScore, workloadHours, sentimentData, afterHoursCount)
  };
}

function generateRecommendations(riskScore, workloadHours, sentimentData, afterHoursCount) {
  const recs = [];

  if (afterHoursCount > 1) {
    recs.push({
      id: 'comm-shield',
      title: 'Strict Evening Shield Activation',
      desc: 'You received multiple after-hours parent queries. Enable automated AI auto-triage and hold non-emergency notifications until 8:00 AM.',
      category: 'Boundary'
    });
  }

  if (workloadHours > 8.5) {
    recs.push({
      id: 'grading-cap',
      title: 'Grading Time Cap',
      desc: 'Administrative grading exceeded 3+ hours today. Apply rubric spot-checking or request peer-review tools.',
      category: 'Workload'
    });
  }

  if (sentimentData.stressCount > 1 || riskScore > 50) {
    recs.push({
      id: 'micro-break',
      title: 'Decompression Reset',
      desc: 'High emotional tension detected in journal. Schedule a 10-minute non-digital reset before leaving school premises.',
      category: 'Wellness'
    });
  }

  recs.push({
    id: 'admin-shield',
    title: 'Anonymized Overload Escalation',
    desc: 'Your aggregate workload telemetry will alert administration to department-level stress without revealing your identity.',
    category: 'Privacy'
  });

  return recs;
}
