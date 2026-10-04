// Communication Shield & Context-Aware AI Response Engine

export const MOCK_INCOMING_MESSAGES = [
  {
    id: 'msg-1',
    senderName: 'Patricia Vance (Parent)',
    senderType: 'Parent',
    studentName: 'Ethan Vance',
    timestamp: '9:42 PM',
    isLateHours: true,
    rawText: "I saw Ethan got a 72% on his History essay. This is unacceptable! He studied all weekend. I need an explanation immediately tonight or I am calling the principal tomorrow morning!",
    urgencyLevel: 'HIGH_STRESS', // Demanding / Hostile
  },
  {
    id: 'msg-2',
    senderName: 'Marcus Wright (Student)',
    senderType: 'Student',
    studentName: 'Marcus Wright',
    timestamp: '10:15 PM',
    isLateHours: true,
    rawText: "Mr. Davis, I forgot where the lab safety submission link is on Google Classroom. Is it due tomorrow at 8 AM? Sorry for bothering so late!",
    urgencyLevel: 'STANDARD',
  },
  {
    id: 'msg-3',
    senderName: 'Sarah Jenkins (Parent)',
    senderType: 'Parent',
    studentName: 'Leo Jenkins',
    timestamp: '11:05 PM',
    isLateHours: true,
    rawText: "URGENT SAFETY NOTICE: Leo had an allergic reaction tonight and was admitted to urgent care. He will be absent tomorrow and needs his asthma inhaler accommodations logged.",
    urgencyLevel: 'EMERGENCY',
  },
  {
    id: 'msg-4',
    senderName: 'David Miller (Parent)',
    senderType: 'Parent',
    studentName: 'Chloe Miller',
    timestamp: '8:20 PM',
    isLateHours: true,
    rawText: "Can Chloe get an extension on the Algebra problem set? We had a family dinner tonight and couldn't finish page 4.",
    urgencyLevel: 'STANDARD',
  }
];

/**
 * Triage incoming after-hours query into classified category
 */
export function triageQuery(message) {
  const text = message.rawText.toLowerCase();

  // Emergency keywords
  if (
    text.includes('urgent safety') || 
    text.includes('hospital') || 
    text.includes('allergic') || 
    text.includes('emergency') || 
    text.includes('injury') ||
    text.includes('crisis')
  ) {
    return {
      status: 'EMERGENCY_BYPASS',
      badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
      actionLabel: 'Immediate Alert Bypassed Shield',
      scheduledTime: 'Immediate Delivery (Safety Rule)',
      summary: 'Critical student safety / medical notice.',
      aiDraft: 'Immediate notification dispatched to educator device.',
      toneSoftenedText: message.rawText,
      requiresTeacherAttention: true
    };
  }

  // Hostile / Demanding late night email
  if (
    text.includes('unacceptable') || 
    text.includes('immediately') || 
    text.includes('calling the principal') || 
    text.includes('demand') || 
    text.includes('tonight!')
  ) {
    return {
      status: 'SHIELDED_TONE_SOFTENED',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      actionLabel: 'Tone Shielded & Morning Scheduled',
      scheduledTime: 'Tomorrow at 8:15 AM (Office Hours)',
      summary: 'Parent inquiring about essay grade with high emotional urgency.',
      toneSoftenedText: `[Shield Filtered Summary]: Parent (Patricia Vance) expressed concern regarding Ethan's essay grade (72%) and requested a review during office hours.`,
      aiDraft: `Dear Ms. Vance,\n\nThank you for reaching out. I understand your concern regarding Ethan's essay grade. I value Ethan's hard work and will review his grading rubrics in detail during my morning planning session. I will follow up with you tomorrow by 9:30 AM with specific feedback.\n\nWarm regards,\nEducator Communication Shield`,
      requiresTeacherAttention: false
    };
  }

  // Standard query
  return {
    status: 'AUTO_SCHEDULED_MORNING',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    actionLabel: 'Queued for Morning Dispatch',
    scheduledTime: 'Tomorrow at 8:00 AM (Quiet Hours Active)',
    summary: 'Routine coursework / submission location inquiry.',
    toneSoftenedText: message.rawText,
    aiDraft: `Hello ${message.senderName.split(' ')[0]},\n\nThank you for your message. The Teacher Communication Shield has received your note. The requested information will be processed when office hours reopen at 8:00 AM tomorrow.\n\nBest regards,\nEducator Office Hours Assistant`,
    requiresTeacherAttention: false
  };
}
