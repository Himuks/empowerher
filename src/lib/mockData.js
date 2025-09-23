// Mock data initialization for the EmpowerHer app
import { mockEntityOperations } from './utils'

// Initialize default data if not exists
export const initializeMockData = async () => {
  // Check if data already exists
  const userStats = await mockEntityOperations.list('UserStats')
  if (userStats.length === 0) {
    // Create initial user stats
    await mockEntityOperations.create('UserStats', {
      total_points: 150,
      current_streak: 3,
      longest_streak: 7,
      level: 2,
      badges_earned: ['first_lesson', 'streak_3'],
      modules_completed: 1,
      last_activity: new Date().toISOString().split('T')[0]
    })
    
    // Create some sample training progress
    await mockEntityOperations.create('TrainingProgress', {
      module_type: 'legal_rights',
      lesson_id: 'legal_basics',
      lesson_title: 'Legal Rights Fundamentals',
      completion_percentage: 100,
      time_spent: 45,
      confidence_level: 4,
      points_earned: 50
    })
    
    await mockEntityOperations.create('TrainingProgress', {
      module_type: 'voice_assertiveness',
      lesson_id: 'saying_no',
      lesson_title: 'Learning to Say No',
      completion_percentage: 60,
      time_spent: 20,
      confidence_level: 3,
      points_earned: 30
    })
    
    // Create chapter progress for legal rights
    await mockEntityOperations.create('ChapterProgress', {
      module_type: 'legal_rights',
      lesson_id: 'legal_basics',
      chapter_id: 'workplace_rights',
      chapter_title: 'Understanding Workplace Rights',
      completion_percentage: 100,
      current_scenario: 5,
      choices_made: [
        { scenario_id: 1, choice_index: 0, was_correct: true, attempts: 1 },
        { scenario_id: 2, choice_index: 1, was_correct: false, attempts: 2 },
        { scenario_id: 3, choice_index: 0, was_correct: true, attempts: 1 }
      ],
      difficulty_level: 'basic',
      points_earned: 25,
      time_spent: 20,
      confidence_rating: 4,
      last_accessed: new Date().toISOString()
    })
    
    // Create story content
    await mockEntityOperations.create('StoryContent', {
      module_type: 'legal_rights',
      lesson_id: 'legal_basics',
      chapter_id: 'workplace_rights',
      title: 'Understanding Workplace Rights',
      difficulty_level: 'basic',
      story_scenarios: [
        {
          scenario_id: 1,
          title: 'Inappropriate Comments',
          story_text: 'Your colleague has been making inappropriate comments about your appearance. This has been going on for weeks and makes you uncomfortable.',
          character_name: 'Maya',
          situation_context: 'Office workplace harassment situation',
          choices: [
            {
              text: 'Document the incidents and report to HR',
              is_correct: true,
              feedback: 'Excellent choice! Documentation is crucial for workplace harassment cases.',
              consequence: 'You create a paper trail and HR takes action.',
              points: 10
            },
            {
              text: 'Ignore it and hope it stops',
              is_correct: false,
              feedback: 'Ignoring harassment often allows it to continue and escalate.',
              consequence: 'The behavior continues and may worsen.',
              points: 0
            },
            {
              text: 'Confront the colleague aggressively',
              is_correct: false,
              feedback: 'While standing up for yourself is important, aggressive confrontation can escalate situations.',
              consequence: 'The situation becomes hostile and may hurt your case.',
              points: 2
            }
          ],
          learning_objective: 'Understanding proper procedures for reporting workplace harassment',
          difficulty_modifier: 1.0
        }
      ],
      completion_criteria: {
        min_correct_choices: 2,
        min_scenarios_completed: 3,
        required_confidence: 3
      }
    })
    
    // Create some emergency contacts
    await mockEntityOperations.create('EmergencyContact', {
      name: 'Local Police Station',
      phone_number: '100',
      category: 'police',
      description: 'Emergency police services',
      availability: '24/7',
      is_active: true
    })
    
    await mockEntityOperations.create('EmergencyContact', {
      name: 'Women\'s Helpline',
      phone_number: '181',
      category: 'helpline',
      description: 'National helpline for women in distress',
      availability: '24/7',
      is_active: true
    })
  }
}

// Sample data for components
export const mockQuotes = [
  "You are braver than you believe, stronger than you seem, and smarter than you think.",
  "A woman with a voice is, by definition, a strong woman.",
  "The most courageous act is still to think for yourself. Aloud.",
  "You have been assigned this mountain to show others it can be moved.",
  "She believed she could, so she did."
]

export const mockBadges = [
  { id: 'first_lesson', name: 'First Steps', description: 'Complete your first lesson', rarity: 'common', unlocked: true },
  { id: 'streak_3', name: 'Getting Started', description: '3-day learning streak', rarity: 'common', unlocked: true },
  { id: 'streak_7', name: 'Week Warrior', description: '7-day learning streak', rarity: 'uncommon', unlocked: false },
  { id: 'legal_expert', name: 'Legal Eagle', description: 'Complete Legal Rights module', rarity: 'rare', unlocked: false },
  { id: 'confident_voice', name: 'Confident Voice', description: 'High confidence in voice training', rarity: 'uncommon', unlocked: false },
  { id: 'safety_champion', name: 'Safety Champion', description: 'Complete Self Defense module', rarity: 'rare', unlocked: false }
]

export const mockLessons = {
  legal_rights: [
    {
      id: 'legal_basics',
      title: 'Legal Rights Fundamentals',
      description: 'Learn about your basic legal rights and how to exercise them',
      difficulty: 'basic',
      chapters: [
        { id: 'workplace_rights', title: 'Workplace Rights', scenarios: 5, completed: true },
        { id: 'domestic_violence', title: 'Domestic Violence Laws', scenarios: 4, completed: false },
        { id: 'property_rights', title: 'Property and Financial Rights', scenarios: 6, completed: false }
      ],
      progress: 33
    },
    {
      id: 'legal_procedures',
      title: 'Legal Procedures & Documentation',
      description: 'Understand how to file complaints and navigate legal procedures',
      difficulty: 'intermediate',
      chapters: [
        { id: 'filing_fir', title: 'Filing an FIR', scenarios: 4, completed: false },
        { id: 'court_procedures', title: 'Court Procedures', scenarios: 5, completed: false }
      ],
      progress: 0,
      locked: false
    }
  ],
  voice_assertiveness: [
    {
      id: 'saying_no',
      title: 'Learning to Say No',
      description: 'Practice assertive communication and boundary setting',
      duration: '30 min',
      topics: ['Boundary Setting', 'Assertive Language', 'Confidence Building'],
      progress: 60
    },
    {
      id: 'public_speaking',
      title: 'Confident Public Speaking',
      description: 'Build confidence in speaking up in public settings',
      duration: '45 min',
      topics: ['Voice Projection', 'Body Language', 'Overcoming Anxiety'],
      progress: 0
    }
  ],
  self_defense: [
    {
      id: 'basic_techniques',
      title: 'Basic Self-Defense Techniques',
      description: 'Learn fundamental self-defense moves and when to use them',
      duration: '40 min',
      topics: ['Palm Strike', 'Knee Kick', 'Situational Awareness'],
      progress: 0
    },
    {
      id: 'escape_techniques',
      title: 'Escape and Evasion',
      description: 'Techniques for escaping dangerous situations',
      duration: '35 min',
      topics: ['Grip Breaks', 'Creating Distance', 'Safe Escape Routes'],
      progress: 0
    }
  ]
}

export const mockResources = [
  {
    id: 'legal_guide',
    title: 'Complete Legal Rights Guide',
    description: 'Comprehensive PDF guide covering all legal rights for women',
    type: 'PDF Guide',
    downloadUrl: '#'
  },
  {
    id: 'safety_checklist',
    title: 'Personal Safety Checklist',
    description: 'Daily safety practices and emergency preparedness',
    type: 'Checklist',
    downloadUrl: '#'
  },
  {
    id: 'assertiveness_workbook',
    title: 'Assertiveness Training Workbook',
    description: 'Exercises and techniques for building assertive communication',
    type: 'Workbook',
    downloadUrl: '#'
  }
]

export const mockHelplines = [
  {
    id: 'womens_helpline',
    name: 'National Women\'s Helpline',
    number: '181',
    description: 'Free counseling and support for women in distress',
    availability: '24/7'
  },
  {
    id: 'domestic_violence',
    name: 'Domestic Violence Helpline',
    number: '1091',
    description: 'Specialized support for domestic violence cases',
    availability: '24/7'
  },
  {
    id: 'legal_aid',
    name: 'Legal Aid Helpline',
    number: '15100',
    description: 'Free legal advice and assistance',
    availability: 'Mon-Fri 9AM-6PM'
  }
]
