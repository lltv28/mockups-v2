export const onboardingMessages = [
  {
    id: 1,
    role: 'ai',
    text: "Welcome to Bulletproof COO! I'm your AI operations coach, built from decades of hands-on COO experience. Let's start by understanding your business. What's your biggest operational bottleneck right now?",
  },
  {
    id: 2,
    role: 'user',
    text: "We're growing fast but our processes aren't scaling. Onboarding new team members takes way too long and there's no consistent playbook. I spend half my time putting out fires instead of thinking strategically.",
  },
  {
    id: 3,
    role: 'ai',
    text: "That's a classic scaling pain point — and exactly what I help with. One more question: are you currently tracking any operational KPIs, or is most of your visibility based on gut feel and team check-ins?",
  },
  {
    id: 4,
    role: 'user',
    text: "Mostly gut feel, honestly. We have some basic metrics in a spreadsheet but nothing systematic. I know we need to fix this but haven't had the bandwidth.",
  },
  {
    id: 5,
    role: 'ai',
    text: "Great — I've built a custom operations playbook for you based on what you've shared. It covers team onboarding automation, KPI framework setup, and a fire-prevention system so you can shift from reactive to strategic.\n\nTo unlock your full playbook and get access to Strategic Planning, let's get you set up on Pro.",
    triggersPaywall: true,
  },
]

export const freeTierMessages = [
  {
    id: 100,
    role: 'ai',
    text: "You're on the free tier! I can help you with Quick Wins — small operational improvements you can implement today. What area would you like to start with?",
  },
]

export const freeTierSuggestions = [
  { text: 'Give me a quick win for team meetings', isFree: true },
  { text: 'Help me build a strategic plan', isFree: false, proSkill: 'Strategic Planning' },
  { text: 'How can I improve daily standups?', isFree: true },
  { text: 'Analyze my team structure', isFree: false, proSkill: 'Team Management' },
]

export const postPaymentMessages = [
  {
    id: 200,
    role: 'ai',
    text: "Welcome to Pro! 🎉 Your full operations playbook is now unlocked. Here's what I've prepared for you:\n\n**Your Custom Playbook:**\n• Team Onboarding Automation — a 5-step system to cut onboarding time by 60%\n• KPI Framework — 12 operational metrics tailored to your growth stage\n• Fire Prevention Protocol — weekly rhythm to catch issues before they escalate\n\nAll five skills are now active. Where would you like to dive in first?",
  },
]

export const postPaymentSuggestions = [
  { text: 'Walk me through the onboarding automation', isFree: true },
  { text: 'Set up my KPI dashboard', isFree: true },
  { text: 'Build my weekly operations rhythm', isFree: true },
  { text: 'Start with the fire prevention protocol', isFree: true },
]

export const mockUser = {
  name: 'Alex Chen',
  email: 'alex@scaleops.io',
  id: 'usr_28fk39x',
}
