// Mock data initialization for the EmpowerHer app
import { mockEntityOperations } from './utils'

// Initialize default data if not exists
export const initializeMockData = async () => {
  const userStats = await mockEntityOperations.list('UserStats')
  if (userStats.length === 0) {
    await mockEntityOperations.create('UserStats', {
      total_points: 0,
      current_streak: 0,
      longest_streak: 0,
      level: 1,
      badges_earned: [],
      modules_completed: 0,
      last_activity: ''
    })
  }
}

// ─── Motivational Quotes ──────────────────────────────────────────────────────
export const mockQuotes = [
  "You are braver than you believe, stronger than you seem, and smarter than you think.",
  "A woman with a voice is, by definition, a strong woman.",
  "The most courageous act is still to think for yourself. Aloud.",
  "You have been assigned this mountain to show others it can be moved.",
  "She believed she could, so she did.",
  "A strong woman looks a challenge in the eye and gives it a wink.",
  "Life shrinks or expands in proportion to one's courage.",
  "Well-behaved women seldom make history.",
  "No one can make you feel inferior without your consent.",
  "I am not free while any woman is unfree, even when her shackles are very different from my own."
]

// ─── Achievement Badges ───────────────────────────────────────────────────────
export const mockBadges = [
  { id: 'first_lesson', name: 'First Steps', description: 'Complete your first lesson', rarity: 'common', icon: 'star' },
  { id: 'streak_3', name: 'Getting Started', description: '3-day learning streak', rarity: 'common', icon: 'zap' },
  { id: 'streak_7', name: 'Week Warrior', description: '7-day learning streak', rarity: 'uncommon', icon: 'crown' },
  { id: 'streak_30', name: 'Monthly Maven', description: '30-day learning streak', rarity: 'legendary', icon: 'crown' },
  { id: 'legal_expert', name: 'Legal Eagle', description: 'Complete all Legal Rights lessons', rarity: 'rare', icon: 'award' },
  { id: 'confident_voice', name: 'Confident Voice', description: 'Complete all Voice Training lessons', rarity: 'rare', icon: 'shield' },
  { id: 'safety_champion', name: 'Safety Champion', description: 'Complete all Self Defense lessons', rarity: 'rare', icon: 'shield' },
  { id: 'century', name: 'Century Club', description: 'Earn 100 points', rarity: 'uncommon', icon: 'zap' },
  { id: 'high_achiever', name: 'High Achiever', description: 'Earn 500 points', rarity: 'rare', icon: 'award' },
  { id: 'challenge_lover', name: 'Challenge Accepted', description: 'Complete 5 daily challenges', rarity: 'uncommon', icon: 'target' }
]

// ─── Daily Challenges ─────────────────────────────────────────────────────────
export const mockChallenges = [
  { title: "Practice Assertive Communication", description: "Say 'no' to one request today while being respectful and clear about your boundaries.", points: 15, category: "Voice Training" },
  { title: "Learn a Safety Technique", description: "Review and practice one self-defense move from the basic techniques module.", points: 20, category: "Self Defense" },
  { title: "Know Your Rights", description: "Read about workplace harassment laws and share one fact with a friend.", points: 10, category: "Legal Knowledge" },
  { title: "Emergency Preparedness", description: "Update your emergency contacts and share them with a trusted person.", points: 15, category: "Safety" },
  { title: "Confidence Building", description: "Practice speaking clearly and confidently in front of a mirror for 5 minutes.", points: 12, category: "Voice Training" },
  { title: "Safety Plan Review", description: "Review and update your personal safety plan. Share it with a trusted contact.", points: 15, category: "Safety" },
  { title: "Legal Document Awareness", description: "Make a list of 3 important legal documents every woman should keep accessible.", points: 10, category: "Legal Knowledge" },
  { title: "Body Language Practice", description: "Maintain confident body language throughout the day — straight posture, eye contact.", points: 12, category: "Voice Training" },
  { title: "Situational Awareness", description: "Practice being aware of exits and surroundings in every new place you enter today.", points: 15, category: "Self Defense" },
  { title: "Support Network", description: "Reach out to one person in your support network and have a meaningful conversation.", points: 10, category: "Community" },
  { title: "Digital Safety Audit", description: "Review your social media privacy settings and update passwords on one account.", points: 15, category: "Safety" },
  { title: "Express an Opinion", description: "Share your honest opinion in at least one conversation today without apologizing for it.", points: 12, category: "Voice Training" },
  { title: "Financial Empowerment", description: "Review your monthly budget and identify one area where you can save or invest for yourself.", points: 15, category: "Legal Knowledge" },
  { title: "Grounding Exercise", description: "Practice the 5-4-3-2-1 grounding technique: identify 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste.", points: 10, category: "Mental Health" },
  { title: "Escape Route Mapping", description: "In your home, identify all exits and plan two escape routes. Practice walking them once.", points: 20, category: "Self Defense" },
  { title: "Cyber Hygiene Check", description: "Enable two-factor authentication on at least two of your most important accounts.", points: 15, category: "Safety" },
  { title: "Negotiation Practice", description: "Practice asking for something you want today using the DESC script: Describe, Express, Specify, Consequences.", points: 15, category: "Voice Training" },
  { title: "Self-Compassion Break", description: "Write down 3 things you're proud of about yourself. Read them aloud. You deserve to hear your own kindness.", points: 10, category: "Mental Health" },
  { title: "Know a Helpline", description: "Memorize one new helpline number today. Test your memory 3 hours later.", points: 10, category: "Safety" },
  { title: "Power Pose Practice", description: "Hold a power pose (hands on hips, chest open) for 2 minutes before an important interaction today.", points: 12, category: "Voice Training" }
]

// ─── Legal Rights Story Scenarios ─────────────────────────────────────────────
export const storyScenarios = {
  workplace_rights: [
    {
      id: 1,
      title: 'Inappropriate Comments',
      character: 'Maya',
      context: 'Office workplace — Your colleague has been making inappropriate comments about your appearance for weeks.',
      story: 'You arrive at work on Monday morning. Your colleague Rahul makes another comment about your outfit, saying "You should dress like that more often — it really shows off your figure." Others in the office look uncomfortable but say nothing. This has been happening for weeks.',
      choices: [
        { text: 'Document the incident and report to HR/Internal Complaints Committee', correct: true, points: 15, feedback: 'Excellent! Documentation creates a crucial paper trail. Under the POSH Act 2013, every company must have an Internal Complaints Committee. You have the right to file a written complaint within 3 months.' },
        { text: 'Ignore it and hope it stops on its own', correct: false, points: 0, feedback: 'Ignoring harassment rarely makes it stop. Research shows that workplace harassment tends to escalate when left unaddressed. You have legal rights to a safe workplace.' },
        { text: 'Confront Rahul aggressively in front of everyone', correct: false, points: 3, feedback: 'While standing up for yourself is important, aggressive public confrontation can escalate the situation and may complicate a formal complaint later. A firm, private conversation is better.' }
      ],
      learning: 'Under the Sexual Harassment of Women at Workplace Act (POSH Act 2013), verbal remarks of a sexual nature constitute harassment. Every employer must have an Internal Complaints Committee.'
    },
    {
      id: 2,
      title: 'Denied Promotion',
      character: 'Maya',
      context: 'Office — You discover a less-qualified male colleague was promoted over you.',
      story: 'After 3 years of excellent performance reviews, you learn that Vikram, who joined a year after you and has less experience, got the promotion you were promised. When you ask your manager, he says "We need someone who can handle the pressure — it\'s a demanding role." You know your performance has been consistently better.',
      choices: [
        { text: 'Document the disparity and file a formal complaint citing the Equal Remuneration Act', correct: true, points: 15, feedback: 'Great choice! The Equal Remuneration Act 1976 mandates equal pay and opportunity. Document performance records, reviews, and the discrepancy. This creates a strong foundation for your case.' },
        { text: 'Accept the decision and work harder to prove yourself', correct: false, points: 2, feedback: 'While working hard is admirable, accepting discriminatory treatment sets a precedent. The law protects you from gender-based discrimination in promotions.' },
        { text: 'Immediately resign in protest', correct: false, points: 0, feedback: 'Resigning removes your ability to pursue legal remedies as an employee. Document the discrimination first and seek legal advice before making any drastic decisions.' }
      ],
      learning: 'The Equal Remuneration Act, 1976 prohibits discrimination in recruitment, promotions, and conditions of service based on gender.'
    },
    {
      id: 3,
      title: 'Maternity Rights',
      character: 'Priya',
      context: 'Office — You\'re pregnant and your employer is pressuring you about your leave plans.',
      story: 'You\'re 4 months pregnant and have informed your employer. Your manager says "We need reliable people. You\'ll be gone for months. Maybe you should consider a less demanding role." You feel pressured and worried about your position.',
      choices: [
        { text: 'Remind your employer of your maternity leave rights and document the conversation', correct: true, points: 15, feedback: 'Perfect! Under the Maternity Benefit Act (amended 2017), you\'re entitled to 26 weeks of paid leave for first two children. Your employer cannot terminate or demote you due to pregnancy.' },
        { text: 'Agree to take a less demanding role to keep the peace', correct: false, points: 2, feedback: 'You should not have to compromise your career because of pregnancy. The law specifically protects you from being forced into a different role due to pregnancy.' },
        { text: 'Don\'t say anything and hope things work out', correct: false, points: 0, feedback: 'Silence may be taken as acceptance. It\'s important to assert your rights early and create documentation of any discriminatory behavior.' }
      ],
      learning: 'The Maternity Benefit Act (Amended 2017) provides 26 weeks paid leave for first two children, protection from termination during pregnancy, and the right to return to the same position.'
    }
  ],
  domestic_violence: [
    {
      id: 1,
      title: 'Recognizing Emotional Abuse',
      character: 'Anita',
      context: 'Home — Your partner has been controlling your finances and isolating you from family.',
      story: 'Your husband Suresh insists on controlling all finances. He monitors your phone, criticizes everything you do, and has discouraged you from meeting your family. When you protest, he says "I\'m just looking out for you. Your family fills your head with nonsense." You feel increasingly isolated and dependent.',
      choices: [
        { text: 'Recognize this as emotional abuse and reach out to a trusted person or helpline (181)', correct: true, points: 15, feedback: 'Exactly right. Under the PWDVA 2005, emotional and economic abuse are recognized forms of domestic violence. Isolation and financial control are classic abuse patterns. Reaching out is the crucial first step.' },
        { text: 'Try harder to please your husband so he stops controlling you', correct: false, points: 0, feedback: 'Abuse is never the victim\'s fault. Trying to please an abuser typically leads to escalating control. The behavior pattern will not change just because you change — the abuser must be held accountable.' },
        { text: 'Wait until things get physical before taking action', correct: false, points: 2, feedback: 'Emotional and economic abuse are equally recognized under the law. You don\'t need to wait for physical violence. The Protection of Women from Domestic Violence Act covers all forms of abuse.' }
      ],
      learning: 'The PWDVA 2005 covers physical, sexual, verbal, emotional, AND economic abuse. Financial control and isolation are recognized forms of domestic violence.'
    },
    {
      id: 2,
      title: 'Seeking a Protection Order',
      character: 'Anita',
      context: 'You\'ve decided to seek legal protection from domestic violence.',
      story: 'After the emotional abuse escalated to threats of physical violence, you\'ve decided to take legal action. A friend has suggested getting a Protection Order. You\'re unsure about the process and worried about the consequences.',
      choices: [
        { text: 'Contact a Protection Officer or approach the Magistrate court to file for a Protection Order', correct: true, points: 15, feedback: 'Correct! You can approach a Protection Officer (appointed by state government) or directly file with the Magistrate. Protection Orders can restrain the abuser, ensure your residence rights, and provide monetary relief.' },
        { text: 'File only a police complaint and hope it resolves everything', correct: false, points: 5, feedback: 'A police complaint is one path, but a Protection Order provides immediate civil remedies — residence rights, monetary relief, and custody. Both can be pursued simultaneously for maximum protection.' },
        { text: 'Give your husband one more chance before involving the law', correct: false, points: 0, feedback: 'When threats of physical violence are made, safety must come first. Research shows abuse patterns escalate over time. Legal protection is not "involving the law" — it\'s protecting yourself.' }
      ],
      learning: 'Under PWDVA, you can get: Protection Orders (restraining the abuser), Residence Orders (right to stay in shared household), Monetary Relief, and Custody Orders — all from the Magistrate court.'
    },
    {
      id: 3,
      title: 'Safety Planning',
      character: 'Anita',
      context: 'You need to create a safety plan while living in an abusive household.',
      story: 'While you pursue legal remedies, you need to stay safe. You\'re still living in the same house as Suresh, who has become more aggressive since you spoke to a counselor. You need to prepare for emergencies.',
      choices: [
        { text: 'Create a safety plan: pack an emergency bag, memorize helpline numbers, inform a trusted neighbor, keep documents safe', correct: true, points: 15, feedback: 'Excellent safety planning! Keep copies of important documents (ID, marriage certificate, bank statements) at a trusted person\'s house. Have emergency contacts memorized. Know the nearest shelter and police station.' },
        { text: 'Confront Suresh about going to a counselor', correct: false, points: 0, feedback: 'Informing an abuser that you\'ve sought help can escalate violence. Safety planning should be done discreetly. Never confront an abusive partner about your plans to leave or seek help without safety measures in place.' },
        { text: 'Wait for the legal process to take its course before doing anything', correct: false, points: 3, feedback: 'Legal processes take time. While pursuing legal remedies, immediate safety planning is essential. Your safety cannot wait for court dates.' }
      ],
      learning: 'Safety planning includes: emergency bag (documents, cash, clothes, medications), memorized helpline numbers, trusted contacts informed, exit routes planned, and children\'s safety considered.'
    }
  ],
  property_rights: [
    {
      id: 1,
      title: 'Ancestral Property Rights',
      character: 'Kavita',
      context: 'Family — Your father passed away and your brothers are claiming you have no right to ancestral property.',
      story: 'After your father\'s passing, your brothers claim that the ancestral property belongs only to the sons. They say "This is how it\'s always been. You got married and left the family — the property is ours." You know this doesn\'t seem right.',
      choices: [
        { text: 'Assert your equal coparcenary rights under the Hindu Succession Act (Amended 2005)', correct: true, points: 15, feedback: 'Absolutely correct! Since 2005, daughters have EQUAL coparcenary rights as sons in Hindu ancestral property. This right is by birth, regardless of marriage or residence. You can demand partition.' },
        { text: 'Accept their claim since you\'re married and living elsewhere', correct: false, points: 0, feedback: 'Marriage or residence does NOT affect your right to ancestral property. The 2005 amendment specifically grants daughters equal rights regardless of marital status.' },
        { text: 'Give up your claim to keep family peace', correct: false, points: 2, feedback: 'While family harmony is important, your legal rights are non-negotiable. You can pursue mediation to find a peaceful resolution while still asserting your legally protected rights.' }
      ],
      learning: 'Hindu Succession Act (Amended 2005): Daughters have equal coparcenary rights as sons. This applies to all ancestral property and is a right by birth, irrespective of marital status.'
    },
    {
      id: 2,
      title: 'Wife\'s Right to Matrimonial Home',
      character: 'Meera',
      context: 'Your in-laws are trying to evict you from the matrimonial home after separation.',
      story: 'After a separation from your husband, your in-laws are telling you to "go back to your parents\' house." They\'ve changed the locks and are threatening to throw your belongings out. You have been living in this house for 8 years.',
      choices: [
        { text: 'Assert your right to reside in the shared household and seek a Residence Order from the Magistrate', correct: true, points: 15, feedback: 'Correct! Under the PWDVA 2005, you have the right to reside in the "shared household" regardless of ownership. A Residence Order ensures you cannot be evicted. File immediately if threatened.' },
        { text: 'Move back to your parents\' house quietly', correct: false, points: 2, feedback: 'While going to a safe place is never wrong, you should not be forced to leave. The law protects your right to reside in the matrimonial home. Document any harassment and seek legal protection.' },
        { text: 'Negotiate with in-laws to be allowed to stay temporarily', correct: false, points: 3, feedback: 'Your right to stay is not a matter of negotiation — it\'s legally protected. While dialogue is good, you should simultaneously seek legal protection to strengthen your position.' }
      ],
      learning: 'Under PWDVA 2005, a woman has the right to reside in the "shared household" regardless of whether she has any ownership. The court can pass Residence Orders preventing eviction.'
    }
  ],
  filing_fir: [
    {
      id: 1,
      title: 'Police Refuse to File FIR',
      character: 'Sunita',
      context: 'Police station — The duty officer is refusing to register your complaint.',
      story: 'You\'ve gone to the police station to file an FIR about being stalked. The duty officer says "This is a personal matter, we can\'t file an FIR for this. Go home and sort it out." He is dismissive and tells you to come back with a "more serious" complaint.',
      choices: [
        { text: 'Insist on your right to have the FIR registered, and if refused, approach the Superintendent of Police or file a complaint with the Magistrate', correct: true, points: 15, feedback: 'Perfect! Under Section 154 CrPC, police MUST register an FIR for cognizable offenses. Stalking is a cognizable offense under Section 354D IPC. If refused, complain to the SP or file a private complaint with the Magistrate under Section 156(3) CrPC.' },
        { text: 'Leave the police station and try a different one', correct: false, points: 5, feedback: 'While you can try another station, it\'s important to know that police refusal to register an FIR is itself a punishable offense. You should escalate the complaint against this officer.' },
        { text: 'Give up since the police won\'t help', correct: false, points: 0, feedback: 'Never give up! You have multiple legal avenues. You can approach the SP, file with the Magistrate, use the e-FIR system, or contact the Women\'s Commission. The police officer\'s refusal is itself illegal.' }
      ],
      learning: 'Police MUST register an FIR for cognizable offenses. Refusal is punishable. Options: Zero FIR (any police station), approach SP, file with Magistrate under Section 156(3) CrPC, or use e-FIR portals.'
    },
    {
      id: 2,
      title: 'Zero FIR — Filing at Any Station',
      character: 'Sunita',
      context: 'You need to file an FIR but the local police station is far from where the incident happened.',
      story: 'You were harassed in a different city while traveling. You\'re now back home and want to file an FIR. The local police tell you "This didn\'t happen in our jurisdiction. You need to go to the city where it happened."',
      choices: [
        { text: 'Insist on filing a Zero FIR, as any police station must register it regardless of jurisdiction', correct: true, points: 15, feedback: 'Exactly! A Zero FIR can be filed at ANY police station in India, regardless of where the crime occurred. The police must register it and transfer it to the relevant jurisdiction afterward.' },
        { text: 'Travel back to the other city to file the FIR there', correct: false, points: 3, feedback: 'You don\'t need to travel. The Supreme Court has mandated that Zero FIRs must be accepted at any police station. The police must register and transfer it to the correct jurisdiction.' },
        { text: 'Drop the complaint since it\'s too complicated', correct: false, points: 0, feedback: 'Don\'t give up! The Zero FIR system was specifically designed to make filing easier. You can also file an online FIR (e-FIR) in many states.' }
      ],
      learning: 'Zero FIR: You can file a First Information Report at ANY police station in India. The police must accept it and transfer it to the appropriate jurisdiction.'
    },
    {
      id: 3,
      title: 'Documenting Evidence',
      character: 'Sunita',
      context: 'You\'re preparing to file an FIR and need to gather evidence.',
      story: 'You\'ve experienced online harassment — threatening messages and leaked personal photos. You want to file an FIR but are unsure about what evidence to collect before going to the police.',
      choices: [
        { text: 'Screenshot all messages, save URLs, note dates/times, preserve digital evidence, then file the FIR with this documentation', correct: true, points: 15, feedback: 'Perfect approach! Digital evidence is crucial. Screenshots with timestamps, URLs, sender details, and any witness information strengthen your case significantly. Under the IT Act, cyber crime against women is a serious offense.' },
        { text: 'Delete the evidence to remove the harassment and move on', correct: false, points: 0, feedback: 'Never delete evidence! Once digital evidence is deleted, it becomes much harder to prove the offense. Preserve everything and report to the Cyber Crime Portal (cybercrime.gov.in) or call 1930.' },
        { text: 'File the FIR immediately without gathering evidence', correct: false, points: 5, feedback: 'Filing quickly is important, but gathering evidence first strengthens your case significantly. Take time to screenshot everything, then file. You can always add more evidence later.' }
      ],
      learning: 'For cyber crimes: preserve all digital evidence (screenshots, URLs, timestamps), file with Cyber Crime Portal (cybercrime.gov.in), call 1930, or file a Zero FIR at any police station.'
    }
  ],
  court_procedures: [
    {
      id: 1,
      title: 'Understanding Court Proceedings',
      character: 'Deepa',
      context: 'You\'ve filed a case and received notice to appear in court for the first time.',
      story: 'Your domestic violence case is in court. You\'ve received a notice to appear before the Magistrate. You\'re anxious and unsure about what to expect and how to prepare.',
      choices: [
        { text: 'Consult with your lawyer, prepare documents, understand the process, and arrive early with all required paperwork', correct: true, points: 15, feedback: 'Great preparation! Discuss the process with your lawyer, organize all documents chronologically, bring copies of everything, and know what stage of proceedings to expect. Courts appreciate preparedness.' },
        { text: 'Skip the hearing since your lawyer will handle everything', correct: false, points: 0, feedback: 'Your presence may be required by the court. Not appearing can result in adverse orders. Always attend court dates unless your lawyer explicitly confirms your presence isn\'t needed.' },
        { text: 'Go without a lawyer since you know the facts', correct: false, points: 3, feedback: 'While self-representation is your right, legal proceedings are complex. Free legal aid is available through NALSA (15100). Having legal counsel significantly improves outcomes.' }
      ],
      learning: 'Free legal aid is available through NALSA (National Legal Services Authority). Call 15100. You\'re entitled to free legal aid if you can\'t afford a lawyer.'
    },
    {
      id: 2,
      title: 'Legal Aid Rights',
      character: 'Deepa',
      context: 'You cannot afford a lawyer but need legal representation.',
      story: 'You need to file for maintenance and a protection order, but you cannot afford a private lawyer. You\'re worried that without legal representation, your case will be weak.',
      choices: [
        { text: 'Apply for free legal aid through the District Legal Services Authority or call the NALSA helpline (15100)', correct: true, points: 15, feedback: 'Correct! Under Section 12 of the Legal Services Authorities Act, every woman is entitled to free legal services regardless of income. Contact your District Legal Services Authority or call 15100.' },
        { text: 'Read about law online and represent yourself', correct: false, points: 3, feedback: 'While self-study helps, legal proceedings require expertise. Free legal aid provides trained advocates at no cost. It\'s your right — use it!' },
        { text: 'Give up the case since you can\'t afford a lawyer', correct: false, points: 0, feedback: 'Never give up due to financial constraints! Free legal aid is a constitutional right. Every woman is entitled to free legal services — contact NALSA at 15100 or visit your District Legal Services Authority.' }
      ],
      learning: 'Under the Legal Services Authorities Act, every woman is entitled to free legal aid regardless of income. NALSA helpline: 15100. District offices provide free advocates and legal assistance.'
    }
  ],
  cyber_harassment: [
    {
      id: 1,
      title: 'Online Stalking',
      character: 'Riya',
      context: 'You discover someone has been creating fake profiles and messaging your contacts with false information about you.',
      story: 'An ex-acquaintance has created multiple fake social media profiles impersonating you. They\'ve been sending offensive messages to your colleagues and family members. Your reputation is being damaged, and you\'re receiving angry calls from people who think the messages are from you.',
      choices: [
        { text: 'Screenshot all evidence, report profiles to platforms, and file a complaint under IT Act Section 66D and Section 354D IPC', correct: true, points: 15, feedback: 'Perfect! Impersonation online is punishable under IT Act Section 66D (up to 3 years). Cyberstalking is under Section 354D IPC. Screenshot everything with timestamps before reporting.' },
        { text: 'Create counter-profiles to expose the person publicly', correct: false, points: 0, feedback: 'Public retaliation can complicate your legal case and may itself attract legal consequences. Focus on documenting evidence and using legal channels.' },
        { text: 'Deactivate all your social media accounts and wait for it to stop', correct: false, points: 3, feedback: 'While protecting yourself is important, deactivating accounts doesn\'t address the crime. The behavior typically escalates. Document everything and seek legal remedy.' }
      ],
      learning: 'Online impersonation is punishable under IT Act Section 66D (up to 3 years imprisonment). Cyberstalking falls under Section 354D IPC. Always preserve digital evidence before reporting.'
    },
    {
      id: 2,
      title: 'Intimate Image Threats',
      character: 'Riya',
      context: 'Someone is threatening to share your private photos online unless you comply with their demands.',
      story: 'You receive a threatening message from an anonymous number saying they have intimate photos of you (either real or morphed) and will share them online unless you pay money. You\'re terrified and don\'t know what to do.',
      choices: [
        { text: 'Do NOT pay — screenshot the threats, file a complaint at cybercrime.gov.in and local police under IT Act Section 66E', correct: true, points: 15, feedback: 'Correct! This is extortion and a violation of privacy. IT Act Section 66E (voyeurism), Section 67/67A (publishing obscene material), and IPC Section 384 (extortion) all apply. Never pay — it only leads to more demands.' },
        { text: 'Pay the amount to prevent the photos from being shared', correct: false, points: 0, feedback: 'Paying never stops the abuse — it typically escalates demands. This is a serious crime and you have strong legal protection. Report immediately.' },
        { text: 'Try to track down and confront the person yourself', correct: false, points: 2, feedback: 'Confronting the person could be dangerous and compromise the investigation. Let law enforcement handle the tracking. Focus on preserving evidence and filing a complaint.' }
      ],
      learning: 'Threats to share intimate images are punishable under multiple laws: IT Act Section 66E (privacy), Section 67 (obscene content), and IPC Section 384 (extortion). Report to cybercrime.gov.in or call 1930.'
    }
  ],
  privacy_rights: [
    {
      id: 1,
      title: 'Workplace Surveillance',
      character: 'Nisha',
      context: 'Your employer has installed hidden cameras in changing areas and your personal workspace.',
      story: 'You discover a small camera hidden in the changing room at your office. When you bring it up to a colleague, she says others have noticed too but were afraid to speak up. Your privacy has been clearly violated.',
      choices: [
        { text: 'Document the discovery, report to the ICC and police under IT Act Section 66E (violation of privacy)', correct: true, points: 15, feedback: 'Absolutely right! Hidden cameras in private spaces violate IT Act Section 66E (capture/publication of private images) punishable by up to 3 years. Also report to the Internal Complaints Committee as this constitutes workplace harassment.' },
        { text: 'Remove the camera and destroy it as evidence', correct: false, points: 0, feedback: 'Destroying evidence weakens your case. Document it (photograph it in place) and report it. Let authorities handle the removal as part of their investigation.' },
        { text: 'Quietly tell HR and hope they handle it', correct: false, points: 5, feedback: 'While informing HR is part of the process, this is a criminal offense requiring police involvement. Don\'t rely solely on internal processes for a crime this serious.' }
      ],
      learning: 'Hidden cameras in private spaces violate IT Act Section 66E. Photographing or recording someone in private without consent is punishable by up to 3 years imprisonment.'
    },
    {
      id: 2,
      title: 'Data Privacy Breach',
      character: 'Nisha',
      context: 'Your personal information (phone number, address, photos) has been shared on a public forum without your consent.',
      story: 'You discover your phone number, home address, and personal photos have been posted on a public forum with vulgar comments. You\'re receiving harassing calls from strangers. You feel unsafe in your own home.',
      choices: [
        { text: 'Report to the platform for immediate takedown, file police complaint under IT Act Section 72 (breach of confidentiality), and change your phone number', correct: true, points: 15, feedback: 'Correct approach! IT Act Section 72 addresses breach of confidentiality. Also applicable: Section 66E for private images. Request immediate takedown from the platform, file a police complaint, and take steps to secure your safety.' },
        { text: 'Post a public message asking whoever did this to stop', correct: false, points: 0, feedback: 'Public appeals rarely work and may draw more attention to the leaked information. Use legal channels — they\'re faster and more effective.' },
        { text: 'Only change your phone number and move on', correct: false, points: 3, feedback: 'While changing your number protects you short-term, the information remains public. You need to get it taken down and hold the perpetrator accountable through legal action.' }
      ],
      learning: 'Sharing someone\'s personal data without consent violates IT Act Section 72 (breach of confidentiality) and potentially Section 66E. Platforms are legally required to remove such content when reported.'
    }
  ],
  reporting_cybercrime: [
    {
      id: 1,
      title: 'Filing a Cyber Crime Complaint',
      character: 'Aisha',
      context: 'You need to report online harassment but don\'t know the proper process.',
      story: 'You\'ve been receiving threatening emails and messages for weeks. You\'ve screenshotted everything. Now you\'re ready to report but feel overwhelmed. Your local police station told you to "just block them."',
      choices: [
        { text: 'File a complaint at cybercrime.gov.in, call 1930, and if local police refuse, approach the Cyber Crime Cell directly or file with the Magistrate', correct: true, points: 15, feedback: 'Perfect! The National Cyber Crime Portal (cybercrime.gov.in) accepts complaints online. The helpline 1930 provides guidance. If local police refuse, approach the dedicated Cyber Crime Cell or file under Section 156(3) CrPC with the Magistrate.' },
        { text: 'Just block the harasser and hope they stop', correct: false, points: 2, feedback: 'Blocking may stop direct contact but doesn\'t address the crime. Harassers often escalate or use alternate accounts. Filing a report creates a legal record and can lead to prosecution.' },
        { text: 'Hire a private investigator to find the person', correct: false, points: 3, feedback: 'Law enforcement has better tools for cyber investigation. Filing an official complaint gives police the authority to trace IP addresses and digital footprints — something private investigators cannot legally do.' }
      ],
      learning: 'Report cyber crimes at cybercrime.gov.in or call 1930. If local police refuse, approach the Cyber Crime Cell or file with the Magistrate under Section 156(3) CrPC.'
    },
    {
      id: 2,
      title: 'Preserving Digital Evidence',
      character: 'Aisha',
      context: 'You need to properly preserve digital evidence for your cyber crime case.',
      story: 'Your lawyer says your case needs strong digital evidence. You have screenshots but they told you some evidence might not be admissible. You need to ensure everything is properly preserved.',
      choices: [
        { text: 'Take screenshots with visible timestamps and URLs, save to cloud backup, get witnesses to verify, and don\'t modify original content', correct: true, points: 15, feedback: 'Excellent! Screenshots must show URLs, timestamps, and context. Save copies in multiple locations. Having witnesses verify the screenshots adds credibility. Under the Indian Evidence Act, electronic records are admissible as evidence.' },
        { text: 'Print all the screenshots and delete the digital copies for safety', correct: false, points: 3, feedback: 'Don\'t delete digital copies! Courts often require original electronic evidence. Print copies as backup, but maintain digital originals. Electronic records under the IT Act form stronger evidence.' },
        { text: 'Edit the screenshots to highlight the important parts before submitting', correct: false, points: 0, feedback: 'Never edit evidence! Modified screenshots can be challenged and dismissed in court. Submit original, unmodified evidence and let your lawyer highlight relevant portions.' }
      ],
      learning: 'Digital evidence must be unmodified, with visible timestamps and URLs. Under the Indian Evidence Act, electronic records are admissible. Save copies in multiple secure locations and get witnesses to verify.'
    }
  ],
  maintenance_rights: [
    {
      id: 1,
      title: 'Claiming Maintenance After Separation',
      character: 'Geeta',
      context: 'After separating from your husband, you have no income and two children to support.',
      story: 'You separated from your husband 6 months ago. He earns well but has stopped providing any financial support. You have two young children and no income of your own. Your in-laws say you "chose to leave" so you deserve nothing.',
      choices: [
        { text: 'File for maintenance under Section 125 CrPC — you and your children are entitled to financial support regardless of who initiated the separation', correct: true, points: 15, feedback: 'Correct! Section 125 CrPC provides maintenance rights to wives and children regardless of religion or who initiated separation. The court considers the husband\'s income and the wife\'s needs. You can also seek interim maintenance while the case is pending.' },
        { text: 'Get a job first and then think about maintenance', correct: false, points: 3, feedback: 'While employment is empowering, your maintenance rights don\'t depend on your employment status. You can and should file for maintenance immediately — it\'s your legal right, especially with children to support.' },
        { text: 'Accept the situation since you were the one who left', correct: false, points: 0, feedback: 'Who initiated separation is irrelevant to maintenance rights. Section 125 CrPC exists specifically to prevent women and children from being left destitute. Your right to maintenance is not affected by who left whom.' }
      ],
      learning: 'Section 125 CrPC provides maintenance to wives and children regardless of religion or fault. Interim maintenance can be ordered while the case is pending. The amount considers the husband\'s income and family needs.'
    },
    {
      id: 2,
      title: 'Maintenance During Marriage',
      character: 'Geeta',
      context: 'Your husband controls all finances and gives you no money for personal or household needs.',
      story: 'Despite your husband earning a good salary, he gives you barely enough for groceries and nothing for personal needs. He monitors every rupee you spend and considers his salary "his money." You feel completely financially dependent and trapped.',
      choices: [
        { text: 'Recognize this as economic abuse under PWDVA and claim maintenance — a wife has the right to financial support during marriage', correct: true, points: 15, feedback: 'Correct! Financial control is recognized as economic abuse under PWDVA 2005. You can claim maintenance during marriage under Section 125 CrPC or Hindu Marriage Act Section 24 (for Hindus). A wife has equal right to the husband\'s income for household and personal needs.' },
        { text: 'Start secretly saving from the grocery money', correct: false, points: 5, feedback: 'While having emergency savings is wise, this doesn\'t address the fundamental problem. Financial abuse is a recognized form of domestic violence and you have legal remedies available.' },
        { text: 'Ask relatives to speak to your husband about giving you more money', correct: false, points: 3, feedback: 'While family mediation can help, economic abuse is a legal issue, not just a family matter. Under PWDVA 2005, you can get a court order for monetary relief.' }
      ],
      learning: 'Financial control during marriage is economic abuse under PWDVA 2005. Wives can claim maintenance during marriage under Section 125 CrPC. Courts can order the husband to provide for household and personal needs.'
    }
  ],
  streedhan: [
    {
      id: 1,
      title: 'Reclaiming Streedhan',
      character: 'Lata',
      context: 'Your in-laws took all your gold jewelry and gifts received at your wedding, claiming they belong to the family.',
      story: 'During the wedding, you received gold jewelry and cash gifts from your parents and relatives. Your mother-in-law took everything "for safekeeping." Now, after 5 years, when you ask for your jewelry, she says it belongs to the family and was used for household expenses.',
      choices: [
        { text: 'Assert your right to Streedhan — all gifts given to the bride are her exclusive property, and file for recovery if needed', correct: true, points: 15, feedback: 'Correct! Streedhan (gifts given to the bride before, during, or after marriage) is the woman\'s absolute property. no one — not even the husband or in-laws — has the right to use it without her permission. You can file a complaint under IPC Section 406 (criminal breach of trust) for its recovery.' },
        { text: 'Accept the loss to maintain family harmony', correct: false, points: 0, feedback: 'Your Streedhan is your legal right, not a gift to the family. Accepting this sets a precedent for further financial abuse. The law specifically protects Streedhan as the woman\'s exclusive property.' },
        { text: 'Ask your parents to speak to your in-laws', correct: false, points: 3, feedback: 'While family dialogue can help, Streedhan is a legal right with criminal penalties for violation. If your in-laws refuse to return it, you can file under IPC Section 406.' }
      ],
      learning: 'Streedhan is a woman\'s exclusive property — gifts given before, during, or after marriage. Using it without her consent is criminal breach of trust under IPC Section 406, punishable by up to 3 years.'
    },
    {
      id: 2,
      title: 'Dowry Demand After Marriage',
      character: 'Lata',
      context: 'Your in-laws are demanding additional dowry after the wedding, threatening to "send you back."',
      story: 'Six months after your wedding, your in-laws start demanding a car and cash, saying your parents "didn\'t give enough." They\'ve become verbally abusive and your husband says "just tell your father to help or there will be problems."',
      choices: [
        { text: 'Recognize this as dowry demand (Dowry Prohibition Act), document everything, and report to police — dowry demand is a criminal offense', correct: true, points: 15, feedback: 'Correct! The Dowry Prohibition Act 1961 makes demanding dowry a criminal offense punishable by up to 5 years imprisonment. Document all demands (texts, recordings, witnesses) and file a complaint. You are also protected under IPC Section 498A (cruelty) and PWDVA 2005.' },
        { text: 'Ask your parents to give what they can to keep the peace', correct: false, points: 0, feedback: 'Giving into dowry demands is illegal for both parties and typically leads to escalating demands. The Dowry Prohibition Act makes both giving and receiving dowry illegal. Your safety and rights come first.' },
        { text: 'Ignore the demands and hope they stop', correct: false, points: 2, feedback: 'Dowry demands typically escalate and can lead to physical violence. Don\'t wait for the situation to worsen. Document everything and seek help immediately.' }
      ],
      learning: 'The Dowry Prohibition Act 1961 makes dowry demands punishable by up to 5 years imprisonment. Along with IPC 498A and PWDVA, women have strong legal protection against dowry-related abuse.'
    }
  ],
  financial_independence: [
    {
      id: 1,
      title: 'Opening an Independent Bank Account',
      character: 'Farida',
      context: 'Your husband insists on a joint account and refuses to let you have financial autonomy.',
      story: 'You want to open your own bank account to start saving, but your husband says "married women don\'t need separate accounts" and "what are you hiding?" He monitors all your spending and makes you feel guilty about wanting financial independence.',
      choices: [
        { text: 'You have every right to your own bank account — open one independently and start building financial autonomy', correct: true, points: 15, feedback: 'Absolutely! Every woman has the right to open and operate her own bank account. No permission from a spouse is needed. Financial independence is crucial for safety and empowerment. Many government schemes (Jan Dhan Yojana) support women\'s financial inclusion.' },
        { text: 'Agree to keep the joint account to avoid conflict', correct: false, points: 2, feedback: 'Having only a joint account means financial dependency. While you can maintain the joint account, having your own independent account is essential for financial safety and autonomy.' },
        { text: 'Ask a relative to open an account in their name for you to use', correct: false, points: 3, feedback: 'Using someone else\'s account creates complications and dependency. You have the legal right to your own account — exercise it directly.' }
      ],
      learning: 'Every woman has the fundamental right to open independent bank accounts. Financial autonomy is a key element of personal safety. Government schemes like PM Jan Dhan Yojana specifically support women\'s financial inclusion.'
    },
    {
      id: 2,
      title: 'Understanding Property in Your Name',
      character: 'Farida',
      context: 'You contributed to buying your home but the property is only in your husband\'s name.',
      story: 'Over the years, your salary contributed significantly to the EMI payments on your home. However, the property is solely in your husband\'s name. With the marriage becoming difficult, you\'re worried about your rights to the property you helped pay for.',
      choices: [
        { text: 'Document your financial contributions — you have a legal claim to property you helped purchase, and can seek your share through court', correct: true, points: 15, feedback: 'Correct! If you contributed financially, you have a legal claim regardless of whose name is on the title. Maintain bank statements showing your EMI payments. Under PWDVA, you also have the right to reside in the shared household.' },
        { text: 'Accept that property belongs to whoever\'s name is on the papers', correct: false, points: 0, feedback: 'Legal ownership isn\'t just about the name on papers. If you contributed financially, courts recognize your claim. Document all contributions — bank transfers, EMI receipts, joint investments.' },
        { text: 'Transfer all your future savings to your parents\' account for safety', correct: false, points: 3, feedback: 'While protecting your finances is important, this doesn\'t address your rightful claim to the property. Document your contributions and consult a lawyer about your property rights.' }
      ],
      learning: 'Financial contributions to property create legal claims regardless of whose name is on the title. Under PWDVA 2005, women also have the right to reside in the shared household. Always maintain financial records.'
    }
  ]
}

// ─── Voice Training Exercises ─────────────────────────────────────────────────
export const voiceExercises = {
  saying_no: [
    {
      title: "Rejecting an unreasonable request",
      scenario: "Your supervisor asks you to work the weekend — again — even though it's your turn to have off. Others have not been asked.",
      practicePhrase: "I appreciate you thinking of me, but I'm not available this weekend. Let's discuss a fair rotation schedule.",
      tips: ["Keep your voice steady and firm", "Don't over-explain or justify", "Maintain eye contact", "Use a confident posture"]
    },
    {
      title: "Setting boundaries with family",
      scenario: "A relative keeps giving unsolicited advice about your career, telling you to quit your job and focus on 'settling down.'",
      practicePhrase: "I value your concern, but I'm happy with my career choices. I'd prefer we talk about something else.",
      tips: ["Be respectful but clear", "Use 'I' statements", "Don't get defensive", "It's okay to change the subject"]
    },
    {
      title: "Declining social pressure",
      scenario: "Friends are pressuring you to lend a large sum of money that you can't afford to give. They say 'you're being selfish.'",
      practicePhrase: "I understand you need help, but I'm not in a position to lend that amount. I hope you understand.",
      tips: ["You don't owe anyone an explanation for your finances", "Keep your response short", "Don't apologize for having boundaries", "Offer alternatives if you can (emotional support)"]
    },
    {
      title: "Refusing unwanted advances",
      scenario: "Someone at a social gathering is making you uncomfortable with persistent flirting despite your clear disinterest.",
      practicePhrase: "I'm not interested. Please respect my boundary and stop.",
      tips: ["Be direct and unambiguous", "You don't owe politeness to someone who ignores your comfort", "Remove yourself from the situation if they persist", "Trust your instincts"]
    }
  ],
  public_speaking: [
    {
      title: "Speaking up in a meeting",
      scenario: "You have an important idea but the meeting is dominated by louder voices. You've been waiting for a chance to speak.",
      practicePhrase: "I'd like to share a perspective on this. I believe we should consider... [your idea].",
      tips: ["Project your voice to fill the room", "Lean forward to signal you want to speak", "Start with confidence — no 'sorry' or 'this might be stupid but...'", "Pause for emphasis on key points"]
    },
    {
      title: "Presenting your work",
      scenario: "You need to present a project update to senior leadership. You know the material well but feel nervous about the audience.",
      practicePhrase: "Thank you for this opportunity. I'm excited to share the progress we've made on this project.",
      tips: ["Practice out loud at least 3 times before", "Use pauses instead of filler words (um, uh)", "Make eye contact with different people", "Remember: you're the expert on your work"]
    },
    {
      title: "Handling interruptions",
      scenario: "You're mid-sentence in a discussion and someone cuts you off to make their own point. This happens frequently.",
      practicePhrase: "Excuse me, I wasn't finished. As I was saying... [continue your point].",
      tips: ["Keep your voice calm but firm", "Hold up a gentle hand to signal you're still speaking", "Don't let the interruption derail your thoughts", "Address the pattern if it's recurring"]
    },
    {
      title: "Disagreeing professionally",
      scenario: "A team member proposes an approach you believe is flawed. You need to voice your disagreement constructively.",
      practicePhrase: "I see your reasoning, but I have a different perspective. Here's what concerns me about that approach...",
      tips: ["Acknowledge the other person's point first", "Focus on the idea, not the person", "Offer an alternative solution", "Use data and examples to support your view"]
    }
  ],
  workplace_negotiation: [
    {
      title: "Asking for a raise",
      scenario: "You've been at your job for two years with great reviews, but your salary hasn't kept up. It's time for a conversation.",
      practicePhrase: "Based on my contributions and the market rate for this role, I'd like to discuss a salary adjustment to reflect my value.",
      tips: ["Research market rates beforehand", "Bring concrete examples of your achievements", "Practice the conversation out loud", "Have a specific number in mind", "Be prepared for negotiation"]
    },
    {
      title: "Negotiating flexible work",
      scenario: "You need a more flexible schedule but are afraid your manager will see you as less committed.",
      practicePhrase: "I'd like to propose a flexible schedule that maintains my productivity while accommodating my needs. Here's my plan...",
      tips: ["Frame it as a productivity benefit", "Come with a specific proposal", "Offer a trial period", "Show how output will remain the same or improve"]
    },
    {
      title: "Claiming credit for your work",
      scenario: "A colleague presented your idea as their own in a meeting. You need to address this without creating hostility.",
      practicePhrase: "I'm glad that idea resonated. I'd like to add some context since I developed it — here's the thinking behind it.",
      tips: ["Address it in the moment when possible", "Be factual, not emotional", "Follow up with an email documenting your contribution", "Talk privately with the colleague afterward"]
    },
    {
      title: "Pushing back on unfair workload",
      scenario: "You consistently get assigned more work than peers. When you raise it, you're told you're 'so reliable.'",
      practicePhrase: "I appreciate your confidence in me. However, my current workload isn't sustainable. Let's prioritize which tasks are most critical.",
      tips: ["Keep a log of your tasks vs peers' tasks", "Use data to show the imbalance", "Suggest a redistribution rather than just complaining", "Set clear limits on capacity"]
    }
  ],
  handling_conflict: [
    {
      title: "De-escalating an argument",
      scenario: "A heated discussion with a friend is turning personal. You want to resolve the issue without damaging the relationship.",
      practicePhrase: "I can see we both feel strongly about this. Let's take a breath and try to understand each other's perspective.",
      tips: ["Lower your voice as tension rises", "Use 'we' language instead of 'you'", "Acknowledge the other person's feelings", "Suggest a break if emotions are too high"]
    },
    {
      title: "Addressing passive-aggressive behavior",
      scenario: "A coworker keeps making sarcastic remarks about your work. You need to address it directly.",
      practicePhrase: "I've noticed some comments that seem directed at my work. I'd like to discuss any feedback openly so we can work better together.",
      tips: ["Name the behavior specifically and calmly", "Don't mirror the passive-aggression", "Give them a chance to explain", "Set a clear expectation for future communication"]
    },
    {
      title: "Setting emotional boundaries",
      scenario: "A family member uses guilt to manipulate your decisions. Every choice you make is met with 'After everything I've done for you...'",
      practicePhrase: "I love you and appreciate everything you've done. But I need to make decisions that are right for my life, and I hope you can support that.",
      tips: ["Recognize guilt-tripping as a manipulation tactic", "Stay calm and don't engage in the guilt cycle", "Reaffirm love while maintaining your position", "It's okay to end the conversation if it becomes toxic"]
    },
    {
      title: "Responding to gaslighting",
      scenario: "Someone keeps telling you 'That never happened' or 'You're overreacting' when you raise valid concerns.",
      practicePhrase: "I trust my own experience and memory. I'm not overreacting — my feelings are valid, and this is what happened.",
      tips: ["Keep a journal of events for your own validation", "Trust your own perception", "Don't argue about reality — state your truth and disengage", "Seek support from a trusted third party"]
    }
  ]
}

// ─── Self Defense Techniques ──────────────────────────────────────────────────
export const defenseTechniques = {
  basic_techniques: [
    {
      name: "Palm Strike",
      description: "A powerful strike using the heel of your palm, targeting the attacker's nose or chin.",
      difficulty: "Beginner",
      steps: [
        "Stand with feet shoulder-width apart in a stable stance",
        "Keep your fingers bent back and palm flat — this protects your fingers",
        "Aim for the base of the attacker's nose or chin",
        "Strike upward with full force using your body weight — push from your legs",
        "Follow through and immediately create distance"
      ],
      tips: ["Use your whole body, not just your arm", "Keep your wrist straight and strong", "Practice the motion slowly first against a soft surface", "The heel of your palm is much harder than your fist"],
      whenToUse: "When someone is directly in front of you and within arm's reach",
      safetyNote: "Only use when you genuinely feel threatened and have no option to escape"
    },
    {
      name: "Knee Strike",
      description: "Drive your knee upward into an attacker's groin or midsection for maximum impact.",
      difficulty: "Beginner",
      steps: [
        "If grabbed, grab the attacker's shoulders or clothing for balance",
        "Shift your weight to one leg for stability",
        "Drive your knee up sharply and forcefully toward the groin or stomach",
        "Use the momentum to push the attacker away",
        "Create distance immediately and prepare to run"
      ],
      tips: ["Pull the attacker toward you as you drive your knee up", "Keep your balance with your hands on their shoulders", "Practice the motion for muscle memory", "This technique works well in very close quarters"],
      whenToUse: "When grabbed or when someone is in very close proximity",
      safetyNote: "Create distance immediately after the technique — the goal is to escape"
    },
    {
      name: "Elbow Strike",
      description: "Use your elbow as a powerful close-range weapon when an attacker is beside or behind you.",
      difficulty: "Beginner",
      steps: [
        "Bend your arm at a sharp angle — your elbow is the striking surface",
        "Rotate your body to generate power from your hips and core",
        "Strike backward if attacked from behind, or sideways if grabbed from the side",
        "Aim for the face, temple, or solar plexus",
        "Follow up with another technique or escape immediately"
      ],
      tips: ["The elbow is one of the hardest bones in your body", "Use hip rotation to maximize force", "Works well in confined spaces", "Practice the rotation motion daily"],
      whenToUse: "When grabbed from behind or when an attacker is very close (too close for a punch)",
      safetyNote: "Follow up with escape — never stay to fight if you can run to safety"
    }
  ],
  escape_techniques: [
    {
      name: "Wrist Escape",
      description: "Break free when someone grabs your wrist by leveraging their thumb — the weakest point of any grip.",
      difficulty: "Beginner",
      steps: [
        "Stay calm and identify where the attacker's thumb is positioned",
        "Rotate your wrist toward their thumb (the gap in their grip)",
        "Pull sharply and quickly in the direction of their thumb",
        "Step back explosively while pulling to create momentum",
        "Run toward a safe, populated area immediately"
      ],
      tips: ["The thumb is the weakest part of ANY grip — always escape toward it", "Speed matters — move quickly and decisively", "Practice with different grip positions and angles", "Make noise — shout 'FIRE' or 'HELP' while escaping"],
      whenToUse: "When someone grabs your wrist or forearm",
      safetyNote: "Be prepared to use additional techniques if the first attempt fails — try again immediately"
    },
    {
      name: "Bear Hug Escape (Arms Pinned)",
      description: "Escape when someone grabs you from behind with your arms pinned to your sides.",
      difficulty: "Intermediate",
      steps: [
        "Drop your body weight immediately — bend your knees and drop your center of gravity",
        "Stomp hard on the attacker's foot (closest to the big toe) with your heel",
        "Drive your elbow sharply backward into their ribs or solar plexus",
        "As their grip loosens, turn and strike (palm strike to face)",
        "Escape — run toward people, lights, and safety"
      ],
      tips: ["Dropping your weight makes you much harder to hold or lift", "Multiple stomps increase effectiveness", "Combine techniques rapidly — don't stop at one", "Scream loudly through the entire escape"],
      whenToUse: "When grabbed from behind with arms pinned — a common attack scenario",
      safetyNote: "Practice this with a trusted partner using gentle pressure only"
    },
    {
      name: "Creating Safe Distance",
      description: "De-escalation and distance techniques when you sense danger approaching but haven't been physically touched.",
      difficulty: "Beginner",
      steps: [
        "Trust your instincts — if something feels wrong, it IS wrong",
        "Keep your hands up in a natural 'fence' position (palms outward at chest height)",
        "Maintain eye contact while creating verbal boundaries: 'Stay back!' or 'I don't want to talk to you'",
        "Move toward populated, well-lit areas at a steady pace — don't turn your back",
        "If the person follows, call for help loudly and call emergency services (112)"
      ],
      tips: ["Trust your instincts — they evolved to keep you safe", "Don't worry about being rude — your safety comes first", "The 'fence' position looks natural but provides protection", "Pre-dial 112 without pressing call — ready to use instantly"],
      whenToUse: "When you sense potential danger but have NOT been physically touched",
      safetyNote: "Prevention and avoidance are ALWAYS the best self-defense — never feel bad about avoiding a situation"
    }
  ],
  situational_awareness: [
    {
      name: "The Color Code of Awareness",
      description: "A mental framework used by law enforcement to maintain appropriate levels of alertness.",
      difficulty: "Beginner",
      steps: [
        "White (Unaware): Avoid this state in public — headphones in, eyes on phone",
        "Yellow (Relaxed Alert): Your default state — aware of surroundings, noticing who's around",
        "Orange (Specific Alert): Something has caught your attention — a person following, a car circling",
        "Red (Action): You've confirmed a threat — execute your safety plan, call for help",
        "Practice transitioning between states consciously throughout the day"
      ],
      tips: ["Practice Yellow state in everyday life", "Notice exits in every room you enter", "Watch people's hands, not their faces", "Be especially alert in transitional spaces (parking lots, stairwells, elevators)"],
      whenToUse: "At all times when in public spaces",
      safetyNote: "Awareness is not paranoia — it's paying attention with purpose"
    },
    {
      name: "Environment Scanning",
      description: "How to quickly assess any new environment for safety and plan your exit strategy.",
      difficulty: "Beginner",
      steps: [
        "On entering any space, immediately locate all exits (doors, windows, fire escapes)",
        "Note the locations of other people — who is there and what are they doing?",
        "Identify objects that could be used as barriers (tables, chairs, doors)",
        "Check your phone signal strength",
        "Mentally rehearse: 'If something happens, I will go to [exit] and [action]'"
      ],
      tips: ["Make this a habit — it takes only 10 seconds", "Sit facing the door in restaurants", "Choose well-lit, populated routes", "Park in visible, well-lit areas near exits"],
      whenToUse: "Every time you enter a new space — restaurant, office, parking lot, event",
      safetyNote: "This becomes second nature with practice and doesn't create anxiety — it creates confidence"
    },
    {
      name: "Reading Body Language",
      description: "How to identify threatening body language and pre-attack indicators before physical contact.",
      difficulty: "Intermediate",
      steps: [
        "Watch for target glancing — someone repeatedly looking at you and then around (checking for witnesses)",
        "Notice invasion of personal space — someone gradually moving closer than comfortable",
        "Observe hands — clenched fists, hidden hands, or hands moving to weapons are red flags",
        "Look for 'interview' behavior — asking questions to gauge your vulnerability (Are you alone? Where do you live?)",
        "Trust your gut — if someone's behavior makes you uncomfortable, act on it"
      ],
      tips: ["Practice people-watching in safe public places", "Most attackers 'interview' before attacking — cut the interview short", "A firm, confident response often deters predators", "Predators look for easy targets — don't be one"],
      whenToUse: "When you notice someone paying unusual attention to you",
      safetyNote: "Acting on instinct is not overreacting — trust your inner alarm system"
    }
  ],
  advanced_defense: [
    {
      name: "Defense from Ground Position",
      description: "Techniques for defending yourself if you're knocked down or fall during a confrontation.",
      difficulty: "Intermediate",
      steps: [
        "Keep your feet toward the attacker — use your legs as a barrier and weapon",
        "Scoot on your back, keeping legs between you and the attacker",
        "If they try to get on top, use your feet to push them away (kick to knees or midsection)",
        "If they're over you, bridge and roll — lift hips explosively and turn to one side",
        "Get back to feet as quickly as possible and RUN"
      ],
      tips: ["Your legs are your strongest weapons from the ground", "Never turn your back to an attacker while on the ground", "Make as much noise as possible", "Practice getting up quickly from the ground"],
      whenToUse: "If you're knocked down or tripped during a confrontation",
      safetyNote: "The goal is always to get back on your feet and escape — never stay on the ground"
    },
    {
      name: "Multiple Attackers Strategy",
      description: "Survival strategies when facing more than one threat — focus on escape, not fighting.",
      difficulty: "Advanced",
      steps: [
        "Do NOT try to fight multiple people — escape is the ONLY goal",
        "Keep all threats in your visual field — don't let anyone get behind you",
        "Target the closest or weakest-positioned attacker with a decisive strike",
        "Use the environment — tables, chairs, cars as barriers between you and attackers",
        "Run toward people, lights, and public spaces — scream 'FIRE!' for maximum attention"
      ],
      tips: ["Compliance is a valid survival strategy if escape isn't possible", "Your phone/bag/money aren't worth your life — give them up if demanded", "Create maximum noise and chaos", "If you can run, run — don't look back"],
      whenToUse: "When confronted by more than one person in a threatening situation",
      safetyNote: "NO self-defense technique guarantees safety against multiple attackers — avoidance and awareness are critical"
    },
    {
      name: "Improvised Defense Tools",
      description: "How to use everyday objects around you as defensive tools in emergencies.",
      difficulty: "Intermediate",
      steps: [
        "Keys: Hold between fingers for a jabbing strike to sensitive areas",
        "Bag/Purse: Swing as a distraction or barrier, or throw at face to create escape time",
        "Umbrella/Water bottle: Use as a striking tool targeting face, throat, or knees",
        "Phone: Dial 112, use flashlight to blind, throw at face as last resort",
        "Pen: Hold in fist and jab at sensitive areas (hands, face) if grabbed"
      ],
      tips: ["The best defense tool is the one you have with you", "Any distraction buys you seconds to escape", "Practice awareness of what's in your hands/bag", "A thrown object gives you 1-2 seconds — use them to run"],
      whenToUse: "When you have no formal defense tools but need to create an escape opportunity",
      safetyNote: "Improvised tools create distractions and small windows — use that window to ESCAPE, not to fight"
    }
  ]
}

// ─── Lessons metadata ─────────────────────────────────────────────────────────
export const mockLessons = {
  legal_rights: [
    {
      id: 'legal_basics',
      title: 'Legal Rights Fundamentals',
      description: 'Learn about your basic legal rights and how to exercise them',
      difficulty: 'basic',
      chapters: [
        { id: 'workplace_rights', title: 'Workplace Rights', scenarios: 3 },
        { id: 'domestic_violence', title: 'Domestic Violence Laws', scenarios: 3 },
        { id: 'property_rights', title: 'Property and Financial Rights', scenarios: 2 }
      ]
    },
    {
      id: 'legal_procedures',
      title: 'Legal Procedures & Documentation',
      description: 'Understand how to file complaints and navigate legal procedures',
      difficulty: 'intermediate',
      chapters: [
        { id: 'filing_fir', title: 'Filing an FIR', scenarios: 3 },
        { id: 'court_procedures', title: 'Court Procedures', scenarios: 2 }
      ]
    },
    {
      id: 'cyber_laws',
      title: 'Cyber Laws & Digital Rights',
      description: 'Navigate the digital world safely with knowledge of cyber laws that protect you',
      difficulty: 'intermediate',
      chapters: [
        { id: 'cyber_harassment', title: 'Cyber Harassment & Stalking', scenarios: 2 },
        { id: 'privacy_rights', title: 'Privacy Rights Online', scenarios: 2 },
        { id: 'reporting_cybercrime', title: 'Reporting Cyber Crimes', scenarios: 2 }
      ]
    },
    {
      id: 'maintenance_alimony',
      title: 'Maintenance & Financial Security',
      description: 'Understand your rights to financial support and economic independence',
      difficulty: 'advanced',
      chapters: [
        { id: 'maintenance_rights', title: 'Maintenance Rights', scenarios: 2 },
        { id: 'streedhan', title: 'Streedhan & Dowry Laws', scenarios: 2 },
        { id: 'financial_independence', title: 'Financial Independence', scenarios: 2 }
      ]
    }
  ],
  voice_assertiveness: [
    {
      id: 'saying_no',
      title: 'Learning to Say No',
      description: 'Practice assertive communication and boundary setting',
      duration: '30 min',
      topics: ['Boundary Setting', 'Assertive Language', 'Confidence Building', 'Refusing Pressure']
    },
    {
      id: 'public_speaking',
      title: 'Confident Public Speaking',
      description: 'Build confidence in speaking up in public settings',
      duration: '45 min',
      topics: ['Voice Projection', 'Body Language', 'Overcoming Anxiety', 'Handling Interruptions']
    },
    {
      id: 'workplace_negotiation',
      title: 'Workplace Negotiation',
      description: 'Master the art of negotiating raises, credit, and fair treatment at work',
      duration: '40 min',
      topics: ['Salary Negotiation', 'Claiming Credit', 'Flexible Work', 'Workload Balance']
    },
    {
      id: 'handling_conflict',
      title: 'Handling Conflict & Manipulation',
      description: 'Navigate conflicts, de-escalate arguments, and respond to gaslighting',
      duration: '35 min',
      topics: ['De-escalation', 'Passive-Aggression', 'Emotional Boundaries', 'Gaslighting Response']
    }
  ],
  self_defense: [
    {
      id: 'basic_techniques',
      title: 'Basic Self-Defense Techniques',
      description: 'Learn fundamental self-defense strikes and when to use them',
      duration: '40 min',
      topics: ['Palm Strike', 'Knee Strike', 'Elbow Strike']
    },
    {
      id: 'escape_techniques',
      title: 'Escape and Evasion',
      description: 'Techniques for escaping grabs and dangerous situations',
      duration: '35 min',
      topics: ['Wrist Escape', 'Bear Hug Escape', 'Creating Safe Distance']
    },
    {
      id: 'situational_awareness',
      title: 'Situational Awareness',
      description: 'Train your mind to stay alert, read body language, and spot danger before it strikes',
      duration: '30 min',
      topics: ['Color Code of Awareness', 'Environment Scanning', 'Reading Body Language']
    },
    {
      id: 'advanced_defense',
      title: 'Advanced Defense Strategies',
      description: 'Ground defense, multiple attacker strategies, and using everyday objects',
      duration: '45 min',
      topics: ['Ground Position Defense', 'Multiple Attackers', 'Improvised Tools']
    }
  ]
}

// ─── Resources ────────────────────────────────────────────────────────────────
export const mockResources = [
  {
    id: 'legal_guide',
    title: 'Complete Legal Rights Guide',
    description: 'Comprehensive guide covering workplace rights, domestic violence laws, property rights, FIR filing, and court procedures.',
    type: 'PDF Guide'
  },
  {
    id: 'safety_checklist',
    title: 'Personal Safety Checklist',
    description: 'Daily safety practices, home security, transportation safety, digital safety, and emergency preparedness checklist.',
    type: 'Checklist'
  },
  {
    id: 'assertiveness_workbook',
    title: 'Assertiveness Training Workbook',
    description: 'Exercises for identifying communication styles, building I-statements, practicing confident body language, and saying no.',
    type: 'Workbook'
  }
]

// ─── Helplines ────────────────────────────────────────────────────────────────
export const mockHelplines = [
  { id: 'womens_helpline', name: "National Women's Helpline", number: '181', description: 'Free counseling and support for women in distress — 24/7 confidential service.', availability: '24/7' },
  { id: 'domestic_violence', name: 'Domestic Violence Helpline', number: '1091', description: 'Specialized support, counseling, and referrals for domestic violence cases.', availability: '24/7' },
  { id: 'legal_aid', name: 'Legal Aid Helpline (NALSA)', number: '15100', description: 'Free legal advice, assistance, and advocate assignment for women.', availability: 'Mon-Fri 9AM-6PM' },
  { id: 'cyber_crime', name: 'Cyber Crime Helpline', number: '1930', description: 'Report cyber harassment, online stalking, identity theft, and digital crimes.', availability: '24/7' },
  { id: 'child_helpline', name: 'Child Helpline', number: '1098', description: 'Support for children in distress — abuse, neglect, trafficking, and exploitation.', availability: '24/7' },
  { id: 'emergency', name: 'Emergency Services', number: '112', description: 'Unified emergency number for police, fire, and ambulance services across India.', availability: '24/7' }
]

// ─── Community Posts ──────────────────────────────────────────────────────────
export const mockCommunityPosts = [
  {
    id: 'post_1',
    author: 'Priya M.',
    avatar: 'PM',
    topic: 'Workplace Rights',
    title: 'How I filed a POSH complaint and won',
    content: 'I want to share my experience filing a complaint under the POSH Act. It was scary at first, but having documentation made all the difference. My advice: start a journal from day one. Write down dates, times, witnesses, and exact words used. The ICC took my case seriously because I had solid evidence. Don\'t suffer in silence — the law is on your side.',
    likes: 47,
    replies: [
      { author: 'Sunita K.', avatar: 'SK', content: 'Thank you for sharing this! I\'m in a similar situation and this gives me courage.', time: '2 hours ago' },
      { author: 'Meera R.', avatar: 'MR', content: 'The documentation tip is gold. I started keeping records after reading this.', time: '5 hours ago' },
      { author: 'Anjali D.', avatar: 'AD', content: 'Did you face any retaliation? That\'s what I\'m most worried about.', time: '1 day ago' }
    ],
    time: '2 days ago',
    tag: 'Success Story'
  },
  {
    id: 'post_2',
    author: 'Kavita S.',
    avatar: 'KS',
    topic: 'Self Defense',
    title: 'Self-defense class changed my life',
    content: 'Six months ago I couldn\'t walk alone at night without anxiety. After completing the basic and escape techniques here, plus joining a local class, I feel so much more confident. The wrist escape technique actually helped me once in a crowded market. Situational awareness alone has been transformative. If you\'re on the fence — just start. Even one technique is better than none.',
    likes: 62,
    replies: [
      { author: 'Ritu P.', avatar: 'RP', content: 'This is so inspiring! Which local class did you join?', time: '3 hours ago' },
      { author: 'Deepa N.', avatar: 'DN', content: 'The situational awareness module here is excellent. Agree 100%.', time: '8 hours ago' }
    ],
    time: '3 days ago',
    tag: 'Inspiration'
  },
  {
    id: 'post_3',
    author: 'Anita R.',
    avatar: 'AR',
    topic: 'Legal Knowledge',
    title: 'Property rights after divorce — what I learned',
    content: 'Going through a divorce, I assumed I had no claim to the house we lived in for 12 years. But under PWDVA 2005, I have the right to reside in the shared household. My lawyer helped me get a Residence Order. Ladies, please know your rights BEFORE you need them. The legal rights modules here covered exactly what I needed to know.',
    likes: 38,
    replies: [
      { author: 'Shweta M.', avatar: 'SM', content: 'This is exactly what I needed to read today. Thank you.', time: '1 day ago' },
      { author: 'Maya T.', avatar: 'MT', content: 'The Hindu Succession Act scenarios in the legal module taught me about inheritance too.', time: '2 days ago' },
      { author: 'Priya M.', avatar: 'PM', content: 'Knowledge is power. So glad you knew your rights!', time: '2 days ago' }
    ],
    time: '5 days ago',
    tag: 'Legal'
  },
  {
    id: 'post_4',
    author: 'Neha G.',
    avatar: 'NG',
    topic: 'Voice Training',
    title: 'Learning to say "no" at work without guilt',
    content: 'I used to take on everyone\'s tasks because I was afraid of being seen as "not a team player". The assertiveness exercises here taught me that saying no is not selfish — it\'s essential. I practiced the phrases in front of a mirror for a week. Yesterday I declined an unfair overtime request for the first time. My manager actually respected it!',
    likes: 55,
    replies: [
      { author: 'Kavita S.', avatar: 'KS', content: 'The mirror practice tip works wonders! I do it every morning now.', time: '4 hours ago' },
      { author: 'Lakshmi V.', avatar: 'LV', content: 'My confidence score went from 2 to 4 after just two weeks of practice.', time: '1 day ago' }
    ],
    time: '1 week ago',
    tag: 'Growth'
  },
  {
    id: 'post_5',
    author: 'Fatima J.',
    avatar: 'FJ',
    topic: 'Safety',
    title: 'Tips for staying safe while using ride-sharing apps',
    content: 'After a scary experience, I developed a personal safety protocol for cabs: 1) Always share ride details with a trusted contact, 2) Verify driver photo and vehicle number before entering, 3) Sit behind the driver so you can exit from either side, 4) Keep 112 pre-dialed but not called, 5) Trust your gut — cancel if anything feels off. Stay safe everyone!',
    likes: 83,
    replies: [
      { author: 'Ritu P.', avatar: 'RP', content: 'Adding to this: some apps have an emergency button now. Enable it!', time: '6 hours ago' },
      { author: 'Anita R.', avatar: 'AR', content: 'I also screenshot the ride details and send it to my sister every time.', time: '1 day ago' },
      { author: 'Sunita K.', avatar: 'SK', content: 'These tips should be taught in schools honestly.', time: '2 days ago' }
    ],
    time: '1 week ago',
    tag: 'Safety Tips'
  },
  {
    id: 'post_6',
    author: 'Lakshmi V.',
    avatar: 'LV',
    topic: 'Support',
    title: 'To anyone feeling alone — you are not',
    content: 'I joined this community during the lowest point in my life. I was dealing with emotional abuse and felt completely isolated. The resources here, the helpline numbers, and reading other women\'s stories gave me the strength to seek help. I called 181 and they connected me with a counselor. Three months later, I\'m in a safe place and rebuilding my life. You CAN get through this.',
    likes: 124,
    replies: [
      { author: 'Neha G.', avatar: 'NG', content: '❤️ So proud of you. This community is here for you always.', time: '2 hours ago' },
      { author: 'Priya M.', avatar: 'PM', content: 'Your courage inspires all of us. Thank you for sharing.', time: '5 hours ago' },
      { author: 'Deepa N.', avatar: 'DN', content: 'This made me cry. Sending you all the strength and love.', time: '1 day ago' },
      { author: 'Maya T.', avatar: 'MT', content: 'You are incredibly brave. Wishing you everything beautiful ahead.', time: '1 day ago' }
    ],
    time: '2 weeks ago',
    tag: 'Support'
  }
]

// ─── Expert Articles ──────────────────────────────────────────────────────────
export const mockArticles = [
  {
    id: 'art_1',
    title: 'Understanding the POSH Act: A Complete Guide for Working Women',
    author: 'Adv. Meera Sharma',
    authorRole: 'Senior Advocate, Supreme Court',
    category: 'Legal Rights',
    readTime: '8 min read',
    date: 'Jan 15, 2026',
    summary: 'Everything you need to know about the Sexual Harassment of Women at Workplace Act 2013 — your rights, the complaint process, and what to expect.',
    content: `The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 — commonly known as the POSH Act — is one of the most important pieces of legislation for working women in India.

KEY PROVISIONS:
• Every organization with 10+ employees MUST have an Internal Complaints Committee (ICC).
• The ICC must include a presiding officer (senior woman employee), at least 2 members committed to women's causes, and 1 external member from an NGO.
• A complaint must be filed within 3 months of the incident (extendable by 3 months).
• The ICC must complete its inquiry within 90 days.

WHAT CONSTITUTES HARASSMENT:
• Physical contact and advances
• Demand or request for sexual favours
• Making sexually colored remarks  
• Showing pornography
• Any unwelcome physical, verbal, or non-verbal conduct of sexual nature

YOUR RIGHTS:
1. Right to a safe working environment
2. Right to file a complaint without fear of retaliation
3. Right to interim relief during investigation
4. Right to confidentiality throughout the process
5. Right to appeal if unsatisfied with the outcome

IMPORTANT: Document everything. Keep a detailed record of incidents including dates, times, locations, witnesses, and exact words used. This documentation is crucial for a successful complaint.`
  },
  {
    id: 'art_2',
    title: 'Building Assertiveness: The Psychology Behind Confident Communication',
    author: 'Dr. Priya Desai',
    authorRole: 'Clinical Psychologist',
    category: 'Voice Training',
    readTime: '6 min read',
    date: 'Jan 28, 2026',
    summary: 'Why assertiveness is a skill that can be learned, and the psychological techniques that make it sustainable.',
    content: `Assertiveness is not a personality trait you're born with — it's a skill that can be developed through practice and understanding.

THE ASSERTIVENESS SPECTRUM:
• Passive: Avoiding conflict at the cost of your own needs
• Aggressive: Prioritizing your needs by violating others' boundaries
• Assertive: Expressing your needs clearly while respecting others

WHY WOMEN STRUGGLE WITH ASSERTIVENESS:
Research shows that women are socialized to be accommodating and conflict-averse. This creates internal conflict when their needs aren't being met. Understanding this conditioning is the first step to changing it.

PRACTICAL TECHNIQUES:
1. The Broken Record Technique — calmly repeat your position without getting drawn into arguments
2. Fogging — acknowledge the other person's point without giving in: "I understand your perspective, and I still need..."
3. Negative Assertion — own your mistakes without excessive apologizing: "You're right, I made an error. Here's how I'll fix it."
4. The DESC Script:
   D - Describe the situation objectively
   E - Express how you feel
   S - Specify what you want
   C - Consequences (positive outcomes of the change)

BUILDING THE HABIT:
Start with low-stakes situations. Practice with friends. Use a mirror. Record yourself. The more you practice, the more natural it becomes. Research shows it takes about 66 days of consistent practice to form a new habit.`
  },
  {
    id: 'art_3',
    title: 'Safety Planning: A Step-by-Step Guide for Women in Dangerous Situations',
    author: 'Inspector Sunita Rawat',
    authorRole: 'Senior Police Officer, Women\'s Cell',
    category: 'Safety',
    readTime: '10 min read',
    date: 'Feb 5, 2026',
    summary: 'How to create a comprehensive personal safety plan — essential steps for women facing domestic violence or stalking.',
    content: `A safety plan is a personalized, practical plan that includes ways to remain safe while in a dangerous situation, planning to leave, or after leaving.

IMMEDIATE SAFETY:
• Identify safe rooms in your home (with locks and phone access)
• Memorize emergency numbers: 100 (Police), 112 (Emergency), 181 (Women's Helpline)
• Create a code word with trusted friends/family that means "call for help immediately"
• Keep your phone charged at all times

DOCUMENT PREPARATION:
Keep copies of these documents at a trusted person's home:
□ Identification documents (Aadhaar, PAN, Passport)
□ Marriage certificate
□ Birth certificates (yours and children's)
□ Bank account details and statements
□ Property documents
□ FIR copies or complaint records
□ Medical records of any injuries

EMERGENCY BAG:
Keep a packed bag in a secure, accessible location containing:
□ Cash (at least ₹5,000)
□ Change of clothes
□ Essential medications
□ Phone charger
□ Copies of important documents
□ Children's essentials (if applicable)

EXIT PLANNING:
• Know the nearest police station, hospital, and shelter
• Plan multiple exit routes from your home
• Save emergency money in a separate, secret account
• Inform at least 2 trusted people about your plan
• If possible, obtain a Protection Order BEFORE leaving

AFTER LEAVING:
• Change locks at your new location
• Vary daily routines
• Inform school/workplace about the situation
• File for a Protection Order if not already done
• Seek counseling support — recovery is a journey`
  },
  {
    id: 'art_4',
    title: 'Digital Safety for Women: Protecting Yourself Online',
    author: 'Cybersec Expert Ritu Jain',
    authorRole: 'Cyber Security Consultant',
    category: 'Safety',
    readTime: '7 min read',
    date: 'Feb 10, 2026',
    summary: 'Essential digital safety practices — from social media privacy to dealing with cyber harassment.',
    content: `In today's digital world, online safety is as important as physical safety. Here's how to protect yourself.

SOCIAL MEDIA SAFETY:
• Review privacy settings on ALL platforms — set profiles to private
• Don't share real-time location on social media
• Be cautious of friend/follow requests from strangers
• Don't share personal details like address, workplace, or daily routine
• Disable geotagging on photos

PASSWORD SECURITY:
• Use unique passwords for each account (minimum 12 characters)
• Enable Two-Factor Authentication (2FA) on everything
• Use a password manager
• Never share passwords, even with close friends

DEALING WITH CYBER HARASSMENT:
1. DO NOT engage with the harasser
2. Screenshot EVERYTHING (messages, posts, profiles)
3. Block the harasser on all platforms
4. Report to the platform's safety team
5. File a complaint at cybercrime.gov.in or call 1930
6. File a Zero FIR at any police station

YOUR LEGAL RIGHTS ONLINE:
• Section 354D IPC: Cyberstalking is a criminal offense
• IT Act Section 66E: Violation of privacy (capturing images)
• IT Act Section 67: Publishing obscene material
• IT Act Section 72: Breach of confidentiality

IMPORTANT: Digital evidence is legally admissible. Always preserve it.`
  },
  {
    id: 'art_5',
    title: 'The Science of Self-Defense: Why These Techniques Work',
    author: 'Sensei Maya Patel',
    authorRole: 'Martial Arts Instructor & Women\'s Safety Trainer',
    category: 'Self Defense',
    readTime: '5 min read',
    date: 'Feb 14, 2026',
    summary: 'The biomechanics behind effective self-defense techniques and why they work regardless of size or strength.',
    content: `Self-defense is not about being stronger than your attacker. It's about understanding leverage, vulnerable points, and the element of surprise.

WHY SIZE DOESN'T MATTER:
• The palm strike targets the nose — one of the most nerve-dense areas
• The knee strike to the groin uses your largest muscle group against a vulnerable area
• The elbow is one of the hardest bones in the body
• Escaping a wrist grab uses physics (leverage against the thumb)

THE ADRENALINE ADVANTAGE:
When threatened, your body releases adrenaline which:
• Increases strength temporarily
• Heightens awareness
• Reduces pain sensation
• But also — can cause tunnel vision and fine motor skill loss

This is why simple, gross motor techniques (palm strike, knee strike) are more effective than complex moves in real situations.

THE 3-SECOND RULE:
Research shows that the first 3 seconds of a confrontation determine the outcome. This is why:
1. React immediately — don't freeze
2. Use a powerful, simple technique
3. Create distance and escape

TRAINING TIPS:
• Practice techniques until they become muscle memory
• Train at full speed against pads (not air)
• Practice verbal assertiveness alongside physical techniques
• Remember: the BEST self-defense is AWARENESS and AVOIDANCE`
  },
  {
    id: 'art_6',
    title: 'Healing After Trauma: A Counselor\'s Guide to Recovery',
    author: 'Dr. Anjali Mehta',
    authorRole: 'Trauma Therapist & PTSD Specialist',
    category: 'Mental Health',
    readTime: '9 min read',
    date: 'Feb 18, 2026',
    summary: 'Understanding trauma responses and evidence-based approaches to healing — from a therapist who specializes in women\'s recovery.',
    content: `Trauma recovery is not linear, and there is no "right" timeline. Here's what you should know.

COMMON TRAUMA RESPONSES:
• Hypervigilance (constantly scanning for danger)
• Flashbacks and intrusive memories
• Emotional numbness or detachment
• Difficulty trusting others
• Sleep disturbances and nightmares
• Guilt and self-blame

IMPORTANT: These are NORMAL responses to abnormal situations. You are not broken.

EVIDENCE-BASED TREATMENTS:
1. Cognitive Behavioral Therapy (CBT): Helps reframe negative thought patterns
2. EMDR (Eye Movement Desensitization and Reprocessing): Effective for processing traumatic memories
3. Somatic Experiencing: Addresses trauma stored in the body
4. Group Therapy: Connection with others who understand

SELF-CARE PRACTICES:
• Establish a daily routine — structure creates safety
• Practice grounding techniques (5-4-3-2-1 sensory exercise)
• Gentle physical movement (walking, yoga, swimming)
• Journaling — write without judgment
• Creative expression (art, music, dance)
• Social connection — don't isolate yourself

WHEN TO SEEK PROFESSIONAL HELP:
Seek help immediately if you experience:
• Persistent suicidal thoughts
• Inability to perform daily tasks
• Substance use to cope
• Self-harm
• Complete social withdrawal

FREE RESOURCES:
• Vandrevala Foundation Helpline: 1860-2662-345
• iCall: 9152987821
• NIMHANS: 080-46110007
• Women's Helpline: 181

Remember: Seeking help is a sign of courage, not weakness.`
  }
]

// ─── Counselor Directory ──────────────────────────────────────────────────────
export const mockCounselors = [
  {
    id: 'coun_1',
    name: 'Dr. Anjali Mehta',
    specialization: 'Trauma & PTSD Recovery',
    qualifications: 'Ph.D. Clinical Psychology, NIMHANS',
    experience: '15 years',
    languages: ['English', 'Hindi', 'Marathi'],
    availability: 'Mon-Fri, 10AM-6PM',
    mode: 'Online & In-person',
    location: 'Mumbai',
    rating: 4.9,
    reviews: 124,
    description: 'Specializes in trauma recovery, PTSD, and supporting women through domestic violence. Uses CBT and EMDR approaches.'
  },
  {
    id: 'coun_2',
    name: 'Dr. Priya Desai',
    specialization: 'Anxiety & Self-Esteem',
    qualifications: 'M.Phil Clinical Psychology, Tata Institute',
    experience: '10 years',
    languages: ['English', 'Hindi', 'Gujarati'],
    availability: 'Mon-Sat, 9AM-5PM',
    mode: 'Online',
    location: 'Ahmedabad',
    rating: 4.8,
    reviews: 89,
    description: 'Focuses on building confidence, managing anxiety, and assertiveness training for women in professional settings.'
  },
  {
    id: 'coun_3',
    name: 'Sunita Krishnan',
    specialization: 'Domestic Violence Support',
    qualifications: 'MSW, Certified Trauma Counselor',
    experience: '12 years',
    languages: ['English', 'Hindi', 'Telugu'],
    availability: 'Tue-Sat, 11AM-7PM',
    mode: 'Online & In-person',
    location: 'Hyderabad',
    rating: 4.9,
    reviews: 156,
    description: 'Specialized in supporting women escaping domestic violence, safety planning, and rebuilding lives after abuse.'
  },
  {
    id: 'coun_4',
    name: 'Dr. Rekha Iyer',
    specialization: 'Workplace Harassment & Stress',
    qualifications: 'Ph.D. Organizational Psychology',
    experience: '8 years',
    languages: ['English', 'Hindi', 'Tamil'],
    availability: 'Mon-Fri, 10AM-8PM',
    mode: 'Online',
    location: 'Chennai',
    rating: 4.7,
    reviews: 67,
    description: 'Expert in workplace dynamics, harassment recovery, and career confidence. Helps women navigate professional challenges.'
  },
  {
    id: 'coun_5',
    name: 'Kavya Nair',
    specialization: 'Youth & Campus Safety',
    qualifications: 'MA Psychology, Certified Counselor',
    experience: '6 years',
    languages: ['English', 'Hindi', 'Malayalam'],
    availability: 'Mon-Fri, 2PM-9PM',
    mode: 'Online',
    location: 'Bangalore',
    rating: 4.8,
    reviews: 45,
    description: 'Specializes in supporting young women with campus safety, dating violence, cyber harassment, and body image issues.'
  },
  {
    id: 'coun_6',
    name: 'Dr. Fatima Khan',
    specialization: 'Family & Relationship Issues',
    qualifications: 'Ph.D. Family Therapy, AIIMS',
    experience: '18 years',
    languages: ['English', 'Hindi', 'Urdu'],
    availability: 'Mon-Sat, 9AM-4PM',
    mode: 'Online & In-person',
    location: 'Delhi',
    rating: 4.9,
    reviews: 198,
    description: 'Experienced family therapist specializing in conflict resolution, divorce counseling, and supporting women through family crises.'
  }
]
