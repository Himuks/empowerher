import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function createPageUrl(path) {
  return path
}

// ─── Mock entity operations for frontend-only version ─────────────────────────
export const mockEntityOperations = {
  getStorageKey: (entityName) => `empowerher_${entityName}`,

  create: async (entityName, data) => {
    const key = mockEntityOperations.getStorageKey(entityName)
    const existing = JSON.parse(localStorage.getItem(key) || '[]')
    const newItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    existing.push(newItem)
    localStorage.setItem(key, JSON.stringify(existing))
    return newItem
  },

  list: async (entityName) => {
    const key = mockEntityOperations.getStorageKey(entityName)
    return JSON.parse(localStorage.getItem(key) || '[]')
  },

  filter: async (entityName, filterFn) => {
    const items = await mockEntityOperations.list(entityName)
    return items.filter(filterFn)
  },

  update: async (entityName, id, updates) => {
    const key = mockEntityOperations.getStorageKey(entityName)
    const items = JSON.parse(localStorage.getItem(key) || '[]')
    const index = items.findIndex(item => item.id === id)
    if (index !== -1) {
      items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() }
      localStorage.setItem(key, JSON.stringify(items))
      return items[index]
    }
    return null
  },

  delete: async (entityName, id) => {
    const key = mockEntityOperations.getStorageKey(entityName)
    const items = JSON.parse(localStorage.getItem(key) || '[]')
    const filtered = items.filter(item => item.id !== id)
    localStorage.setItem(key, JSON.stringify(filtered))
    return true
  },

  // Upsert: find first item matching a filter, update it or create new
  upsert: async (entityName, filterFn, data) => {
    const items = await mockEntityOperations.list(entityName)
    const existing = items.find(filterFn)
    if (existing) {
      return await mockEntityOperations.update(entityName, existing.id, data)
    } else {
      return await mockEntityOperations.create(entityName, data)
    }
  }
}

// ─── Mock User operations ─────────────────────────────────────────────────────
export const User = {
  me: async () => {
    const stored = localStorage.getItem('empowerher_currentUser')
    if (stored) return JSON.parse(stored)
    // Guest user — no hardcoded name
    const defaultUser = {
      id: 'guest',
      firstName: '',
      lastName: '',
      email: '',
      joinedAt: new Date().toISOString()
    }
    return defaultUser
  },

  updateMyUserData: async (updates) => {
    const current = await User.me()
    const updated = { ...current, ...updates }
    localStorage.setItem('empowerher_currentUser', JSON.stringify(updated))
    return updated
  }
}

// ─── Activity logging ─────────────────────────────────────────────────────────
export const logActivity = async (activity) => {
  const entry = {
    ...activity,
    timestamp: new Date().toISOString(),
    time: getRelativeTime(new Date())
  }
  await mockEntityOperations.create('ActivityLog', entry)
  return entry
}

// ─── Stats helpers ────────────────────────────────────────────────────────────
export const updateUserStats = async (pointsToAdd = 0, extraUpdates = {}) => {
  const statsList = await mockEntityOperations.list('UserStats')
  let stats = statsList[0]
  if (!stats) return null

  const today = new Date().toISOString().split('T')[0]
  const lastActivity = stats.last_activity || ''

  // Streak logic
  let currentStreak = stats.current_streak || 0
  let longestStreak = stats.longest_streak || 0

  if (lastActivity !== today) {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    if (lastActivity === yesterdayStr) {
      currentStreak += 1
    } else if (lastActivity === '') {
      currentStreak = 1
    } else {
      currentStreak = 1
    }
    longestStreak = Math.max(longestStreak, currentStreak)
  }

  // Points and level
  const newPoints = (stats.total_points || 0) + pointsToAdd
  const newLevel = Math.floor(newPoints / 200) + 1

  const updates = {
    total_points: newPoints,
    level: newLevel,
    current_streak: currentStreak,
    longest_streak: longestStreak,
    last_activity: today,
    ...extraUpdates
  }

  await mockEntityOperations.update('UserStats', stats.id, updates)

  // Check badge unlocks
  await checkBadgeUnlocks({ ...stats, ...updates })

  return { ...stats, ...updates }
}

export const checkBadgeUnlocks = async (stats) => {
  const badges = stats.badges_earned || []
  const newBadges = [...badges]
  let changed = false

  // Streak-based badges
  if (stats.current_streak >= 3 && !badges.includes('streak_3')) {
    newBadges.push('streak_3'); changed = true
  }
  if (stats.current_streak >= 7 && !badges.includes('streak_7')) {
    newBadges.push('streak_7'); changed = true
  }
  if (stats.current_streak >= 30 && !badges.includes('streak_30')) {
    newBadges.push('streak_30'); changed = true
  }

  // Points-based badges
  if (stats.total_points >= 100 && !badges.includes('century')) {
    newBadges.push('century'); changed = true
  }
  if (stats.total_points >= 500 && !badges.includes('high_achiever')) {
    newBadges.push('high_achiever'); changed = true
  }

  // First lesson badge
  const progress = await mockEntityOperations.list('TrainingProgress')
  const completedCount = progress.filter(p => p.completion_percentage === 100).length
  if (completedCount >= 1 && !badges.includes('first_lesson')) {
    newBadges.push('first_lesson'); changed = true
  }

  // Module completion badges
  const legalDone = progress.filter(p => p.module_type === 'legal_rights' && p.completion_percentage === 100)
  if (legalDone.length >= 2 && !badges.includes('legal_expert')) {
    newBadges.push('legal_expert'); changed = true
  }

  const voiceDone = progress.filter(p => p.module_type === 'voice_assertiveness' && p.completion_percentage === 100)
  if (voiceDone.length >= 2 && !badges.includes('confident_voice')) {
    newBadges.push('confident_voice'); changed = true
  }

  const defenseDone = progress.filter(p => p.module_type === 'self_defense' && p.completion_percentage === 100)
  if (defenseDone.length >= 2 && !badges.includes('safety_champion')) {
    newBadges.push('safety_champion'); changed = true
  }

  // Challenge badges
  const challengeLog = await mockEntityOperations.list('DailyChallengeLog')
  if (challengeLog.length >= 5 && !badges.includes('challenge_lover')) {
    newBadges.push('challenge_lover'); changed = true
  }

  if (changed) {
    const statsList = await mockEntityOperations.list('UserStats')
    if (statsList[0]) {
      await mockEntityOperations.update('UserStats', statsList[0].id, { badges_earned: newBadges })
    }
  }
}

// ─── Module progress from localStorage ────────────────────────────────────────
export const getModuleProgressFromStorage = async (moduleType) => {
  const progress = await mockEntityOperations.list('TrainingProgress')
  return progress.filter(p => p.module_type === moduleType)
}

export const getModulePoints = async (moduleType) => {
  const progress = await getModuleProgressFromStorage(moduleType)
  return progress.reduce((sum, p) => sum + (p.points_earned || 0), 0)
}

export const getOverallProgress = async () => {
  const progress = await mockEntityOperations.list('TrainingProgress')
  // Total possible lessons: 12  (4 legal + 4 voice + 4 defense)
  const totalPossible = 12
  const completed = progress.filter(p => p.completion_percentage === 100).length
  return Math.round((completed / totalPossible) * 100)
}

// ─── Resource download helpers ────────────────────────────────────────────────
export const generateResourceContent = (resourceId) => {
  const resources = {
    legal_guide: `
═══════════════════════════════════════════
  COMPLETE LEGAL RIGHTS GUIDE FOR WOMEN
  EmpowerHer Educational Resource
═══════════════════════════════════════════

TABLE OF CONTENTS
──────────────────
1. Workplace Rights
2. Domestic Violence Laws
3. Property & Financial Rights
4. Filing a First Information Report (FIR)
5. Court Procedures
6. Important Helpline Numbers

──────────────────────────────────────────
1. WORKPLACE RIGHTS
──────────────────────────────────────────

• Equal Remuneration Act, 1976: Women are entitled to equal pay for equal work.

• Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013:
  - Every employer must constitute an Internal Complaints Committee (ICC).
  - A woman can file a written complaint within 3 months of the incident.
  - The ICC must complete inquiry within 90 days.
  - The employer is required to provide a safe working environment.

• Maternity Benefit Act, 1961 (Amended 2017):
  - 26 weeks of paid maternity leave for first two children.
  - 12 weeks for third child onwards.
  - Work-from-home option after 26 weeks (if nature of work permits).
  - Crèche facility mandatory for establishments with 50+ employees.

• Key Actions:
  - Document all incidents of harassment (dates, witnesses, details).
  - File written complaint with Internal Complaints Committee.
  - Keep copies of all communications.
  - You have the right to continue working during investigation.

──────────────────────────────────────────
2. DOMESTIC VIOLENCE LAWS
──────────────────────────────────────────

• Protection of Women from Domestic Violence Act (PWDVA), 2005:
  - Covers physical, sexual, verbal, emotional, and economic abuse.
  - Applies to wives, live-in partners, sisters, mothers, etc.
  - You can file a complaint with a Protection Officer or Magistrate.

• Available Remedies:
  - Protection Order: Restrains the abuser from committing domestic violence.
  - Residence Order: Ensures you can continue living in the shared household.
  - Monetary Relief: Covers expenses, losses, medical costs, and maintenance.
  - Custody Order: Temporary custody of children.

• Section 498A IPC (Cruelty by Husband/Relatives):
  - Non-bailable and cognizable offense.
  - Punishment: Up to 3 years imprisonment and fine.

──────────────────────────────────────────
3. PROPERTY & FINANCIAL RIGHTS
──────────────────────────────────────────

• Hindu Succession Act (Amended 2005):
  - Daughters have equal coparcenary rights as sons in ancestral property.
  - Right to demand partition of ancestral property.

• Muslim Personal Law:
  - Right to Mehr (dower) at the time of marriage.
  - Right to maintenance during Iddat period after divorce.

• Maintenance Rights:
  - Section 125 CrPC: Wife can claim maintenance from husband.
  - Available regardless of religion.
  - Applies to divorced women until remarriage.

──────────────────────────────────────────
4. FILING AN FIR
──────────────────────────────────────────

Step 1: Go to the nearest police station.
Step 2: State your complaint clearly to the duty officer.
Step 3: The police are REQUIRED to register an FIR for cognizable offenses.
Step 4: Get a copy of the FIR (it's your right).
Step 5: If police refuse, approach the Superintendent of Police or Magistrate.

• Zero FIR: You can file an FIR at ANY police station, regardless of jurisdiction.
• E-FIR: Many states allow online FIR filing.
• Women's right: You can request a female officer to record your statement.

──────────────────────────────────────────
5. IMPORTANT NUMBERS
──────────────────────────────────────────

• Police Emergency: 100
• Women's Helpline: 181
• Domestic Violence: 1091
• Emergency Services: 112
• Legal Aid: 15100
• Cyber Crime: 1930

═══════════════════════════════════════════
  Remember: You are not alone. Help is available.
  Your safety is the top priority.
═══════════════════════════════════════════
`,

    safety_checklist: `
═══════════════════════════════════════════
  PERSONAL SAFETY CHECKLIST
  EmpowerHer Daily Safety Practices
═══════════════════════════════════════════

DAILY SAFETY HABITS
──────────────────────────────────────────

□ Share your daily schedule with a trusted person
□ Keep your phone charged at all times
□ Have emergency contacts on speed dial
□ Trust your instincts — leave if something feels wrong
□ Be aware of your surroundings at all times
□ Avoid wearing headphones while walking alone
□ Walk confidently with purpose

HOME SAFETY
──────────────────────────────────────────

□ Lock all doors and windows before sleeping
□ Install a peephole or video doorbell
□ Don't open the door to strangers
□ Keep a list of emergency numbers near the door
□ Have a first aid kit easily accessible
□ Ensure adequate outdoor lighting
□ Know your neighbors

TRANSPORTATION SAFETY
──────────────────────────────────────────

□ Always check the backseat before entering your vehicle
□ Keep doors locked while driving
□ Park in well-lit, busy areas
□ Share your live location when taking cabs
□ Verify cab driver details before getting in
□ Have your keys ready before approaching your car
□ Keep your tank at least quarter full

DIGITAL SAFETY
──────────────────────────────────────────

□ Use strong, unique passwords for all accounts
□ Enable two-factor authentication
□ Don't share location on social media in real-time
□ Review privacy settings on all platforms
□ Be cautious of unknown links and messages
□ Keep personal information private online

EMERGENCY PREPAREDNESS
──────────────────────────────────────────

□ Memorize important emergency numbers
□ Keep an emergency bag ready (documents, cash, charger)
□ Know the nearest police station and hospital
□ Have a code word with trusted contacts
□ Practice your safety plan regularly
□ Keep important documents in a secure location

WORKPLACE SAFETY
──────────────────────────────────────────

□ Know your company's harassment policy
□ Document any inappropriate behavior
□ Know who the Internal Complaints Committee members are
□ Keep work-related evidence safely
□ Build a support network at work

═══════════════════════════════════════════
  Review this checklist daily.
  Your safety matters.
═══════════════════════════════════════════
`,

    assertiveness_workbook: `
═══════════════════════════════════════════
  ASSERTIVENESS TRAINING WORKBOOK
  EmpowerHer Communication Exercises
═══════════════════════════════════════════

INTRODUCTION
──────────────────────────────────────────

Assertiveness is the ability to express your thoughts, feelings, and
needs clearly and confidently while respecting others. It is NOT
the same as aggression. Assertive communication is honest, direct,
and respectful.

──────────────────────────────────────────
EXERCISE 1: UNDERSTANDING YOUR COMMUNICATION STYLE
──────────────────────────────────────────

Rate yourself (1-5) on each statement:

__ I often agree with others to avoid conflict
__ I express my opinions even when they differ from the majority
__ I can say "no" without feeling guilty
__ I speak up when I feel uncomfortable
__ I can ask for what I need clearly
__ I maintain eye contact during conversations
__ I use a steady, calm voice when speaking

Scoring: 7-15 = Passive, 16-25 = Assertive, 26-35 = Aggressive
Goal: Move toward the assertive range through practice.

──────────────────────────────────────────
EXERCISE 2: ASSERTIVE LANGUAGE PATTERNS
──────────────────────────────────────────

Replace passive/aggressive language with assertive alternatives:

PASSIVE: "I guess that's okay..."
ASSERTIVE: "I'd prefer a different approach. Here's what I suggest..."

PASSIVE: "Sorry to bother you, but..."
ASSERTIVE: "I have something important to discuss."

AGGRESSIVE: "You never listen to me!"
ASSERTIVE: "I feel unheard when I'm interrupted. I'd like to finish my point."

Practice: Write 5 assertive responses to situations in your daily life.

1. _______________________________________________
2. _______________________________________________
3. _______________________________________________
4. _______________________________________________
5. _______________________________________________

──────────────────────────────────────────
EXERCISE 3: THE "I" STATEMENT FORMULA
──────────────────────────────────────────

Formula: "I feel [emotion] when [situation] because [reason].
         I would like [desired outcome]."

Example: "I feel frustrated when meetings run over time because
         I have other commitments. I would like us to stick to
         the agenda."

Practice writing your own "I" statements:

Situation 1: ____________________________________
I feel _________ when ___________________________
because ________________________________________
I would like ____________________________________

Situation 2: ____________________________________
I feel _________ when ___________________________
because ________________________________________
I would like ____________________________________

──────────────────────────────────────────
EXERCISE 4: SAYING NO WITH CONFIDENCE
──────────────────────────────────────────

The DESO Script:
D - Describe the situation objectively
E - Express your feelings about it
S - Specify what you want
O - Outcome — describe positive result

Practice saying NO in these scenarios:

1. A colleague asks you to take on their work on a Friday evening
   Your response: _______________________________

2. A friend pressures you to lend money you can't afford
   Your response: _______________________________

3. Someone makes an inappropriate comment about your appearance
   Your response: _______________________________

──────────────────────────────────────────
EXERCISE 5: BODY LANGUAGE PRACTICE
──────────────────────────────────────────

Practice in front of a mirror for 5 minutes daily:

□ Stand/sit with straight posture
□ Keep shoulders back and relaxed
□ Maintain comfortable eye contact (look at your reflection)
□ Use open hand gestures
□ Keep your voice at a moderate volume — steady and clear
□ Smile naturally
□ Avoid crossing arms or looking down

Record your daily practice:
Day 1: __ minutes | Confidence level: __/5
Day 2: __ minutes | Confidence level: __/5
Day 3: __ minutes | Confidence level: __/5
Day 4: __ minutes | Confidence level: __/5
Day 5: __ minutes | Confidence level: __/5
Day 6: __ minutes | Confidence level: __/5
Day 7: __ minutes | Confidence level: __/5

──────────────────────────────────────────
WEEKLY REFLECTION
──────────────────────────────────────────

At the end of each week, answer:

1. What assertive action am I most proud of this week?
   _______________________________________________

2. What situation was most challenging?
   _______________________________________________

3. What would I do differently next time?
   _______________________________________________

4. My confidence level this week (1-10): ___

═══════════════════════════════════════════
  Practice makes progress, not perfection.
  You deserve to be heard.
═══════════════════════════════════════════
`
  }

  return resources[resourceId] || 'Resource content not available.'
}

export const downloadResource = (resourceId, title) => {
  const content = generateResourceContent(resourceId)
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${title.replace(/\s+/g, '_')}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// ─── Relative time formatting ─────────────────────────────────────────────────
export const getRelativeTime = (date) => {
  const now = new Date()
  const diff = now - new Date(date)
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) return 'Just now'
  if (minutes < 60) return `${minutes} min ago`
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? 's' : ''} ago`
  return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? 's' : ''} ago`
}
