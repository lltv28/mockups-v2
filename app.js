// Kodara Whitelabel — Personal Trainer AI Mockup
// Interactive demo with view switching, simulated chat, and rich response components

document.addEventListener('DOMContentLoaded', () => {
  const viewDashboard = document.getElementById('viewDashboard');
  const viewChat = document.getElementById('viewChat');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatInputBottom = document.getElementById('chatInputBottom');
  const sendBtn = document.getElementById('sendBtn');
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsTopBtn = document.getElementById('settingsTopBtn');
  const settingsModal = document.getElementById('settingsModal');
  const closeSettings = document.getElementById('closeSettings');
  const sidebarItems = document.querySelectorAll('.sidebar-item[data-view]');
  const userProfileBtn = document.getElementById('userProfileBtn');
  const demoDropdown = document.getElementById('demoDropdown');
  const demoList = document.getElementById('demoList');
  const sidebarAvatar = document.getElementById('sidebarAvatar');
  const sidebarUsername = document.getElementById('sidebarUsername');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const sidebar = document.querySelector('.sidebar');

  // --- Mobile sidebar toggle ---
  function openSidebar() {
    sidebar.classList.add('sidebar--open');
    sidebarOverlay.classList.add('sidebar-overlay--visible');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar.classList.remove('sidebar--open');
    sidebarOverlay.classList.remove('sidebar-overlay--visible');
    document.body.style.overflow = '';
  }
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      sidebar.classList.contains('sidebar--open') ? closeSidebar() : openSidebar();
    });
  }
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('sidebar--open')) closeSidebar();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && sidebar.classList.contains('sidebar--open')) closeSidebar();
  });

  // ===========================================================
  // DEMO CONFIGURATIONS
  // ===========================================================
  const DEMOS = [
    {
      id: 'marcus',
      name: 'Marcus Fitness',
      initials: 'MF',
      role: 'Personal Trainer',
      gradient: 'linear-gradient(135deg, #0a6b43, #0d8555)',
      greeting: 'Hey there, ready to train?',
      placeholder: 'Ask me about workouts, nutrition, recovery...',
      agentName: 'Marcus AI',
      agentCount: '+3',
      suggestionsLabel: 'Common questions for Marcus',
      suggestions: [
        { text: 'Scan my meal photo and break down the macros', prompt: 'Scan this food photo and tell me the macros', highlighted: true },
        { text: 'Show my workout consistency and streak', prompt: 'Show my workouts and streak this month' },
        { text: 'Analyze my squat form and give feedback', prompt: 'Can you do a form check on my squat?' },
        { text: 'Show my nutrition dashboard for today', prompt: 'Show my macros and calories today' },
      ],
    },
    {
      id: 'lucas',
      name: 'Lucas AI',
      initials: 'LA',
      role: 'Media Buyer',
      gradient: 'linear-gradient(135deg, rgba(16,104,68,0.80), rgba(16,104,68,0.60))',
      greeting: 'Hey! Ready to crush your ad performance?',
      placeholder: 'Ask me about campaigns, ad creative, competitors...',
      agentName: 'Lucas AI',
      agentCount: '+2',
      suggestionsLabel: 'Common questions for Lucas',
      suggestions: [
        { text: 'Show me how my Facebook campaigns are performing', prompt: 'Show me my Facebook ad campaign performance', highlighted: true },
        { text: 'My campaigns were working well for 2 months, but now have died out, what should I do?', prompt: 'My campaigns were working well for 2 months, but now have died out, what should I do?' },
        { text: 'Generate new ad creative concepts', prompt: 'Generate new ad creative concepts for my cold traffic campaign' },
        { text: 'Show my campaign ROAS and spend breakdown', prompt: 'Show my campaign analytics and ROAS this week' },
      ],
    },
    {
      id: 'alex',
      name: 'Alex Rivera',
      initials: 'AR',
      role: 'Mindset Coach',
      gradient: 'linear-gradient(135deg, rgba(16,104,68,0.92), rgba(16,104,68,0.70))',
      greeting: 'Welcome back. How are you feeling?',
      placeholder: 'Talk to me about mindset, emotions, breakthroughs...',
      agentName: 'Alex AI',
      agentCount: '+2',
      suggestionsLabel: 'Common questions for Alex',
      suggestions: [
        { text: 'Show my personality profile and coaching insights', prompt: 'Show my personality profile and coaching insights', highlighted: true },
        { text: 'How have I been progressing over our sessions?', prompt: 'Show my session history and emotional progress' },
        { text: 'I need to have a tough conversation with my partner', prompt: 'Help me navigate a difficult conversation with my partner' },
        { text: 'I feel completely burned out — what should I do?', prompt: 'I feel burned out and emotionally exhausted' },
      ],
    },
    {
      id: 'nathan',
      name: 'Nathan Cross',
      initials: 'NC',
      role: 'Business Operations',
      gradient: 'linear-gradient(135deg, #1e3a5f, #2563eb)',
      greeting: 'Good morning. Let\'s check in on your business.',
      placeholder: 'Ask about projects, finances, clients, team workload...',
      agentName: 'Nathan AI',
      agentCount: '+4',
      suggestionsLabel: 'Common questions for Nathan',
      suggestions: [
        { text: 'Pull my tasks from Monday, ClickUp, and Asana', prompt: 'Pull my tasks and projects from Monday, ClickUp, and Asana', highlighted: true },
        { text: 'Show my financial overview and cash position', prompt: 'Show me my financial overview and cash flow' },
        { text: 'Which clients are most profitable this quarter?', prompt: 'Which clients are most profitable this quarter and are any of them at risk of churning?' },
        { text: 'Anything that needs my attention today?', prompt: 'Is there anything that needs my attention today?' },
      ],
    },
    {
      id: 'mike',
      name: 'Mike AI',
      initials: 'MA',
      role: 'Copywriting AI',
      gradient: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
      greeting: 'Ready to write copy that converts?',
      placeholder: 'Ask me to write webinar scripts, funnels, ads, emails...',
      agentName: 'Mike AI',
      agentCount: '+3',
      suggestionsLabel: 'What Mike can build for you',
      suggestions: [
        { text: 'Build me a complete 1-hour webinar script from scratch', prompt: 'Build me a complete 1-hour webinar script from scratch', highlighted: true },
        { text: 'Create a full sales funnel with ad campaigns', prompt: 'Create a full sales funnel with ad campaigns' },
        { text: 'Write a high-converting email welcome sequence', prompt: 'Write a high-converting email welcome sequence' },
        { text: 'Generate 10 ad hooks with different angles', prompt: 'Generate 10 ad hooks with different angles' },
      ],
    },
    {
      id: 'trainer',
      name: 'Coach Flex',
      initials: 'CF',
      role: 'Personal Trainer',
      gradient: 'linear-gradient(135deg, #059669, #10b981)',
      starred: true,
      greeting: 'Ready to crush your fitness goals today?',
      placeholder: 'Ask about meal plans, workouts, macros, accountability...',
      agentName: 'Coach Flex AI',
      agentCount: '+4',
      suggestionsLabel: 'Common questions for Coach Flex',
      suggestions: [
        { text: 'Snap my meal photo and estimate the macros', prompt: 'Scan this meal photo and estimate the macros', highlighted: true },
        { text: 'Show my daily nutrition and calorie tracking', prompt: 'Show my daily nutrition dashboard with calorie tracking' },
        { text: "What's my workout plan for this week?", prompt: 'Show me my workout plan and exercise log for this week' },
        { text: 'Do a daily check-in on my meals and water', prompt: 'Run my daily accountability check-in' },
      ],
    },
    {
      id: 'fbads',
      name: 'Lucas AI v2',
      initials: 'LA',
      role: 'Facebook Ads Manager',
      gradient: 'linear-gradient(135deg, #1877f2, #0d47a1)',
      starred: true,
      greeting: 'Let\'s optimize your ad campaigns today.',
      placeholder: 'Ask about campaigns, ROAS, A/B tests, ad variations...',
      agentName: 'Lucas AI v2',
      agentCount: '+3',
      suggestionsLabel: 'Common questions for Lucas AI',
      suggestions: [
        { text: 'Show my active campaign performance dashboard', prompt: 'Show my Facebook ad campaign performance dashboard', highlighted: true },
        { text: 'Which ads should I pause right now?', prompt: 'Identify underperforming ads and recommend which to pause' },
        { text: 'Generate new variations of my top-performing ads', prompt: 'Generate new ad variations based on my top performers' },
        { text: 'What A/B tests should I run next?', prompt: 'Suggest A/B tests based on my campaign performance patterns' },
      ],
    },
    {
      id: 'bizconsult',
      name: 'Nexus AI',
      initials: 'NX',
      role: 'Business Consultant',
      gradient: 'linear-gradient(135deg, #1e3a5f, #3b82f6)',
      greeting: 'Good morning. Let\'s review your business operations.',
      placeholder: 'Ask about projects, finances, team updates, weekly summary...',
      agentName: 'Nexus AI',
      agentCount: '+5',
      suggestionsLabel: 'Common questions for Nexus',
      suggestions: [
        { text: 'Pull data from QuickBooks, ClickUp, and Slack', prompt: 'Show my multi-platform business dashboard with QuickBooks, ClickUp, and team data', highlighted: true },
        { text: 'Show project milestones and team progress', prompt: 'Show my project status tracker with milestone progress' },
        { text: 'Generate my weekly business summary', prompt: 'Generate my AI weekly business summary with action items' },
        { text: 'What needs my attention today?', prompt: 'Show me everything that needs my attention today with notifications' },
      ],
    },
    {
      id: 'mindset',
      name: 'Sage AI',
      initials: 'SA',
      role: 'Mindset & Relationship Coach',
      gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
      starred: true,
      greeting: 'Welcome back. How are you feeling today?',
      placeholder: 'Talk about goals, frustrations, relationships, mindset shifts...',
      agentName: 'Sage AI',
      agentCount: '+3',
      suggestionsLabel: 'Common questions for Sage',
      suggestions: [
        { text: 'Start my onboarding \u2014 capture my goals and values', prompt: 'Start my onboarding flow to capture my goals, desires, frustrations, fears, and values', highlighted: true },
        { text: 'Show everything you know about me', prompt: 'Show my AI memory display with everything you know about me' },
        { text: 'Create my 30/60/90 day growth plan', prompt: 'Generate my 30/60/90 day coaching plan based on my profile' },
        { text: 'Do my daily mindset check-in', prompt: 'Run my daily mindset check-in with adaptive questions' },
      ],
    },
    {
      id: 'salescoach',
      name: 'Closer AI',
      initials: 'CA',
      role: 'Sales Call Coach',
      gradient: 'linear-gradient(135deg, #dc2626, #f97316)',
      starred: true,
      greeting: 'Ready to sharpen your sales game?',
      placeholder: 'Upload a call transcript, ask about sales techniques...',
      agentName: 'Closer AI',
      agentCount: '+3',
      suggestionsLabel: 'Common questions for Closer',
      suggestions: [
        { text: 'Score my latest sales call transcript', prompt: 'Score this sales call transcript and give me a detailed breakdown', highlighted: true },
        { text: 'Show my call performance history', prompt: 'Show my call performance history and trends' },
        { text: 'What does the ideal discovery call look like?', prompt: 'Show me the sales playbook for discovery calls' },
        { text: 'How do I handle price objections better?', prompt: 'How do I handle price objections on sales calls?' },
      ],
    },
    {
      id: 'realestate',
      name: 'PropVal AI',
      initials: 'PV',
      role: 'Real Estate CMA Expert',
      gradient: 'linear-gradient(135deg, #0891b2, #06b6d4)',
      starred: true,
      greeting: "Let's build a market analysis that wins the listing.",
      placeholder: 'Enter a property address, ask about market trends...',
      agentName: 'PropVal AI',
      agentCount: '+2',
      suggestionsLabel: 'Common questions for PropVal',
      suggestions: [
        { text: 'Build a CMA for 742 Evergreen Terrace', prompt: 'Build a CMA report for 742 Evergreen Terrace, Springfield', highlighted: true },
        { text: 'Show comparable sales in this area', prompt: 'Show comparable properties and recent sales near 742 Evergreen Terrace' },
        { text: 'What are the market trends in Springfield?', prompt: 'Show me market trends and pricing data for Springfield' },
        { text: 'Generate a listing price recommendation', prompt: 'Generate a listing price recommendation with supporting data' },
      ],
    },
    {
      id: 'txcoord',
      name: 'DealFlow AI',
      initials: 'DF',
      role: 'Transaction Coordinator',
      gradient: 'linear-gradient(135deg, #0d9488, #2dd4bf)',
      greeting: "Let's keep your deals on track.",
      placeholder: 'Ask about transactions, deadlines, documents...',
      agentName: 'DealFlow AI',
      agentCount: '+3',
      suggestionsLabel: 'Common questions for DealFlow',
      suggestions: [
        { text: 'Show all my active transactions', prompt: 'Show my active transaction dashboard with all deals', highlighted: true },
        { text: 'What deadlines are coming up this week?', prompt: 'Show upcoming deadlines and milestones for this week' },
        { text: 'Pull up the checklist for the Johnson deal', prompt: 'Show the detailed checklist for the Johnson property transaction' },
        { text: 'What needs my attention today?', prompt: 'Show all tasks and alerts that need my attention today' },
      ],
    },
    {
      id: 'executive',
      name: 'LeadIQ AI',
      initials: 'LQ',
      role: 'Executive Leadership Coach',
      gradient: 'linear-gradient(135deg, #4338ca, #818cf8)',
      greeting: "Let's develop your leadership potential.",
      placeholder: 'Ask about 360 feedback, leadership development...',
      agentName: 'LeadIQ AI',
      agentCount: '+2',
      suggestionsLabel: 'Common questions for LeadIQ',
      suggestions: [
        { text: 'Show my 360 feedback results', prompt: 'Show my aggregated 360 feedback results and analysis', highlighted: true },
        { text: 'Create a new feedback survey', prompt: 'Help me build a new 360 feedback survey for my team' },
        { text: 'Generate my development plan', prompt: 'Create a leadership development plan based on my feedback' },
        { text: 'Compare my self-assessment vs others', prompt: 'Show me how my self-assessment compares to feedback from others' },
      ],
    },
    {
      id: 'finance',
      name: 'WealthIQ AI',
      initials: 'WQ',
      role: 'Financial Coach',
      gradient: 'linear-gradient(135deg, #059669, #34d399)',
      starred: true,
      greeting: "Let's take control of your finances.",
      placeholder: 'Ask about budget, spending, savings goals...',
      agentName: 'WealthIQ AI',
      agentCount: '+3',
      suggestionsLabel: 'Common questions for WealthIQ',
      suggestions: [
        { text: 'Show my budget vs actual spending', prompt: 'Show my monthly budget tracker with spending breakdown', highlighted: true },
        { text: 'Analyze my recent transactions', prompt: 'Show my recent transactions with AI spending insights' },
        { text: 'How are my savings goals doing?', prompt: 'Show my savings goals tracker with projections' },
        { text: "What's my financial health score?", prompt: 'Calculate my financial health score and recommendations' },
      ],
    },
    {
      id: 'influencer',
      name: 'ViralMind AI',
      initials: 'VM',
      role: 'Content & Reel Coach',
      gradient: 'linear-gradient(135deg, #e11d48, #fb7185)',
      starred: true,
      greeting: "Let's create content that stops the scroll.",
      placeholder: 'Ask about reel scripts, content ideas, trending topics...',
      agentName: 'ViralMind AI',
      agentCount: '+3',
      suggestionsLabel: 'Common questions for ViralMind',
      suggestions: [
        { text: 'Write me 3 reel scripts for my niche', prompt: 'Generate 3 reel script variations for my fitness coaching niche', highlighted: true },
        { text: 'What formats are trending right now?', prompt: 'Show me trending reel formats and audio suggestions' },
        { text: 'Plan my content for next week', prompt: 'Create a content calendar for next week with daily reel ideas' },
        { text: 'How did my last posts perform?', prompt: 'Show my content performance dashboard with analytics' },
      ],
    },
    {
      id: 'journal',
      name: 'Reflect AI',
      initials: 'RA',
      role: 'Guided Journaling Coach',
      gradient: 'linear-gradient(135deg, #7c3aed, #c084fc)',
      greeting: "Take a moment. Let's explore what's on your mind.",
      placeholder: 'Start writing, ask for prompts, explore patterns...',
      agentName: 'Reflect AI',
      agentCount: '+2',
      suggestionsLabel: 'Common questions for Reflect',
      suggestions: [
        { text: "Give me today's journaling prompt", prompt: 'Give me an adaptive journaling prompt for today', highlighted: true },
        { text: 'Show my journal history and themes', prompt: 'Show my journal entry history with theme analysis' },
        { text: 'What patterns do you see in my writing?', prompt: 'Analyze patterns across my journal entries and give me insights' },
        { text: "How's my journaling streak?", prompt: 'Show my journaling streak and consistency tracker' },
      ],
    },
    {
      id: 'reporter',
      name: 'Pulse AI',
      initials: 'PA',
      role: 'Progress Report Generator',
      gradient: 'linear-gradient(135deg, #1e3a5f, #60a5fa)',
      greeting: "Let's build a report that tells the full story.",
      placeholder: 'Ask about reports, metrics, client activity...',
      agentName: 'Pulse AI',
      agentCount: '+4',
      suggestionsLabel: 'Common questions for Pulse',
      suggestions: [
        { text: "Generate this month's progress report", prompt: 'Generate a comprehensive progress report for this month', highlighted: true },
        { text: 'Show my client activity summary', prompt: 'Show client activity aggregated from all data sources' },
        { text: 'Customize my report template', prompt: 'Show me my report template settings so I can customize sections' },
        { text: 'Schedule weekly auto-reports', prompt: 'Set up automated weekly report generation and delivery' },
      ],
    },
  ];

  let currentDemo = DEMOS[0];

  // --- Demo switcher ---
  function buildDemoList() {
    demoList.innerHTML = DEMOS.map(d => `
      <button class="demo-dropdown__item${d.id === currentDemo.id ? ' demo-dropdown__item--active' : ''}" data-demo="${d.id}">
        <div class="demo-dropdown__item-avatar" style="background:${d.gradient}">${d.initials}</div>
        <div class="demo-dropdown__item-info">
          <span class="demo-dropdown__item-name">${d.name}${d.starred ? ' <span class="demo-dropdown__star" title="Featured">★</span>' : ''}</span>
          <span class="demo-dropdown__item-role">${d.role}</span>
        </div>
        ${d.id === currentDemo.id ? '<svg class="demo-dropdown__item-check" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8l4 4 6-7" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ''}
      </button>
    `).join('');

    demoList.querySelectorAll('.demo-dropdown__item').forEach(item => {
      item.addEventListener('click', () => {
        const demo = DEMOS.find(d => d.id === item.dataset.demo);
        if (demo && demo.id !== currentDemo.id) {
          switchDemo(demo);
        }
        closeDemoDropdown();
        closeSidebar();
      });
    });
  }

  function switchDemo(demo) {
    currentDemo = demo;

    // Set data-demo attribute for CSS theming
    document.getElementById('app').setAttribute('data-demo', demo.id);

    // Update sidebar
    sidebarAvatar.textContent = demo.initials;
    sidebarAvatar.style.background = demo.gradient;
    sidebarUsername.textContent = demo.name;

    // Update hero
    document.querySelector('.avatar-initials--lg').textContent = demo.initials;
    document.querySelector('.avatar-initials--lg').style.background = demo.gradient;
    document.querySelector('.hero-heading').textContent = demo.greeting;

    // Update chat input placeholders
    document.querySelectorAll('.chat-textarea').forEach(el => {
      el.placeholder = demo.placeholder;
    });

    // Update agent chips
    document.querySelectorAll('.agent-chip span:not(.agent-chip-badge)').forEach(el => {
      el.textContent = demo.agentName;
    });
    document.querySelectorAll('.agent-chip-badge').forEach(el => {
      el.textContent = demo.agentCount;
    });

    // Update suggestions
    document.querySelector('.suggestions-label').textContent = demo.suggestionsLabel;
    const grid = document.querySelector('.suggestions-grid');
    grid.innerHTML = demo.suggestions.map(s => `
      <button class="suggestion-card${s.highlighted ? ' suggestion-card--highlighted' : ''}" data-prompt="${escapeAttr(s.prompt)}">
        ${escapeHtml(s.text)}
      </button>
    `).join('');

    // Re-bind suggestion card clicks
    grid.querySelectorAll('.suggestion-card').forEach(card => {
      card.addEventListener('click', () => sendMessage(card.dataset.prompt, true));
    });

    // Update chat avatar initials
    document.querySelectorAll('.avatar--chat .avatar-initials').forEach(el => {
      el.textContent = demo.initials;
      el.style.background = demo.gradient;
    });

    // Clear chat and go to dashboard
    chatMessages.innerHTML = '';
    showView('dashboard');

    // Update page title
    document.title = `${demo.name} AI — Kodara`;
  }

  function toggleDemoDropdown() {
    const isHidden = demoDropdown.classList.contains('hidden');
    if (isHidden) {
      buildDemoList();
      demoDropdown.classList.remove('hidden');
      userProfileBtn.classList.add('sidebar-user--open');
    } else {
      closeDemoDropdown();
    }
  }

  function closeDemoDropdown() {
    demoDropdown.classList.add('hidden');
    userProfileBtn.classList.remove('sidebar-user--open');
  }

  userProfileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDemoDropdown();
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!demoDropdown.contains(e.target) && !userProfileBtn.contains(e.target)) {
      closeDemoDropdown();
    }
  });

  // --- View switching ---
  function showView(view) {
    if (view === 'dashboard') {
      viewDashboard.classList.remove('hidden');
      viewChat.classList.add('hidden');
      // Trigger dashboard entrance animation
      viewDashboard.classList.add('is-view-enter');
      triggerDashboardEntrance();
    } else {
      viewDashboard.classList.add('hidden');
      viewChat.classList.remove('hidden');
      viewChat.classList.add('is-view-enter');
      // Start chat view from the top
      chatMessages.scrollTop = 0;
    }
    sidebarItems.forEach(item => {
      item.classList.toggle('sidebar-item--active', item.dataset.view === view);
    });
  }

  // Trigger staggered dashboard entrance animation
  function triggerDashboardEntrance() {
    const content = document.querySelector('.dashboard-content');
    if (!content) return;
    // Remove and re-add to re-trigger animations
    content.classList.remove('is-animated');
    // Force reflow
    void content.offsetWidth;
    content.classList.add('is-animated');
  }

  sidebarItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      if (item.dataset.view === 'dashboard') {
        chatMessages.innerHTML = '';
      }
      showView(item.dataset.view);
      closeSidebar();
    });
  });

  // --- Suggestion cards (always start fresh chat) ---
  document.querySelectorAll('.suggestion-card').forEach(card => {
    card.addEventListener('click', () => {
      sendMessage(card.dataset.prompt, true);
    });
  });

  // --- Send message ---
  let _responseTimers = [];
  function _clearResponseTimers() {
    _responseTimers.forEach(id => clearTimeout(id));
    _responseTimers = [];
  }
  function _track(id) { _responseTimers.push(id); return id; }

  function sendMessage(text, freshChat) {
    if (!text.trim()) return;
    // Cancel any in-flight response sequence from a previous message
    _clearResponseTimers();
    // Clear previous messages for a fresh conversation
    if (freshChat || chatMessages.children.length === 0) {
      chatMessages.innerHTML = '';
    }
    showView('chat');

    const response = getAIResponse(text);

    // Show user message (with image attachment for photo-based features)
    if (response.userImage) {
      addUserMessageWithImage(text, response.userImage);
    } else {
      addUserMessage(text);
    }

    chatInput.value = '';
    chatInputBottom.value = '';

    const loadingEl = addLoadingMessage();

    _track(setTimeout(() => {
      loadingEl.remove();
      if (response.scanning) {
        // Show scanning state first, then reveal results
        const scanEl = addAIComponentMessage(buildCalAIScanningState(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(scanEl, response.component);
        }, 2200));
      } else if (response.connecting) {
        // FB Ads: connecting -> syncing -> results (skip crossfade for fbads)
        const connectEl = addAIComponentMessage(buildFbAdsConnecting(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          connectEl.remove();
          const syncEl = addAIComponentMessage(buildFbAdsSyncing(), true);
          scrollToBottom();
          _track(setTimeout(() => {
            syncEl.remove();
            addAIComponentMessage(response.component);
            scrollToBottom();
          }, 2500));
        }, 1500));
      } else if (response.searching) {
        // Competitor: searching -> results
        const searchEl = addAIComponentMessage(buildCompetitorSearching(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(searchEl, response.component);
        }, 2500));
      } else if (response.generating) {
        // Ad Creative: thinking -> results
        const thinkEl = addAIComponentMessage(buildAdGenThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(thinkEl, response.component);
        }, 2500));
      } else if (response.creatingImages) {
        // Creative Preview: loading -> results
        const loadEl = addAIComponentMessage(buildCreativePreviewLoading(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(loadEl, response.component);
        }, 3000));
      } else if (response.pmHubConnecting) {
        // PM Hub: connecting -> dashboard
        const pmConnectEl = addAIComponentMessage(buildPmHubConnecting(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(pmConnectEl, response.component);
        }, 3000));
      } else if (response.finConnecting) {
        // Financial: connecting -> dashboard
        const finConnectEl = addAIComponentMessage(buildFinConnecting(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(finConnectEl, response.component);
        }, 3000));
      } else if (response.unifiedThinking) {
        // Unified Data: thinking -> result
        const unifiedThinkEl = addAIComponentMessage(buildUnifiedThinkingState(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(unifiedThinkEl, response.component);
        }, 3500));
      } else if (response.personalityLoading) {
        // Mindset: personality profile thinking -> results
        const thinkEl = addAIComponentMessage(buildPersonalityThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(thinkEl, response.component);
        }, 3000));
      } else if (response.sessionLoading) {
        // Mindset: session history thinking -> results
        const thinkEl = addAIComponentMessage(buildSessionThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(thinkEl, response.component);
        }, 3000));
      } else if (response.conversationLoading) {
        // Mindset: conversation guide thinking -> results
        const thinkEl = addAIComponentMessage(buildConversationThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(thinkEl, response.component);
        }, 3500));
      } else if (response.burnoutLoading) {
        // Mindset: burnout recovery thinking -> results
        const thinkEl = addAIComponentMessage(buildBurnoutThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(thinkEl, response.component);
        }, 3500));
      } else if (response.webinarLoading) {
        // Webinar Script: thinking -> result (longer delay for dramatic effect)
        const thinkEl = addAIComponentMessage(buildWebinarThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(thinkEl, response.component, scrollToTop);
        }, 20000));
      } else if (response.funnelLoading) {
        // Funnel Builder: thinking -> result
        const thinkEl = addAIComponentMessage(buildFunnelThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(thinkEl, response.component, scrollToTop);
        }, 20000));
      } else if (response.emailLoading) {
        // Email Sequence: thinking -> result
        const thinkEl = addAIComponentMessage(buildEmailThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(thinkEl, response.component, scrollToTop);
        }, 3000));
      } else if (response.hookLoading) {
        // Hook Generator: thinking -> result
        const thinkEl = addAIComponentMessage(buildHookThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(thinkEl, response.component, scrollToTop);
        }, 2500));
      } else if (response.videoDiagnostic) {
        // Video Diagnostic: analyzing -> video response (8 seconds)
        const diagEl = addAIComponentMessage(buildVideoDiagnosticThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(diagEl, response.component);
          // Auto-play the video after crossfade completes
          _track(setTimeout(() => {
            const vid = document.querySelector('.video-diagnostic__player');
            if (vid) vid.play().catch(() => {});
          }, 550));
        }, 8000));
      } else if (response.trainerPhotoScanning) {
        // Trainer: photo scanning -> results
        const scanEl = addAIComponentMessage(buildTrainerPhotoScanning(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(scanEl, response.component);
        }, 2500));
      } else if (response.trainerThinking) {
        // Trainer: generic thinking -> results
        const thinkEl = addAIComponentMessage(buildTrainerCheckinThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(thinkEl, response.component);
        }, 2000));
      } else if (response.trainerCheckinLoading) {
        // Trainer: check-in loading -> results
        const thinkEl = addAIComponentMessage(buildTrainerCheckinThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(thinkEl, response.component);
        }, 2500));
      } else if (response.fbadsDashboardLoading) {
        // FB Ads: connecting -> results
        const connectEl = addAIComponentMessage(buildFbAdsDashboardThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(connectEl, response.component);
        }, 3000));
      } else if (response.bizDashboardLoading) {
        // Biz: connecting -> results
        const connectEl = addAIComponentMessage(buildBizDashboardThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(connectEl, response.component);
        }, 3000));
      } else if (response.sageOnboardingLoading) {
        // Sage: onboarding loading -> results
        const thinkEl = addAIComponentMessage(buildMindsetOnboardingThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(thinkEl, response.component);
        }, 3000));
      } else if (response.sageMemoryLoading) {
        // Sage: memory loading -> results
        const thinkEl = addAIComponentMessage(buildMindsetMemoryThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(thinkEl, response.component);
        }, 3000));
      } else if (response.callScorecardThinking) {
        const thinkEl = addAIComponentMessage(buildCallScorecardThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => { crossfadeToResult(thinkEl, response.component); }, 3000));
      } else if (response.cmaThinking) {
        const thinkEl = addAIComponentMessage(buildCmaThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => { crossfadeToResult(thinkEl, response.component); }, 3000));
      } else if (response.txcoordThinking) {
        const thinkEl = addAIComponentMessage(buildTransactionThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => { crossfadeToResult(thinkEl, response.component); }, 3000));
      } else if (response.feedbackThinking) {
        const thinkEl = addAIComponentMessage(buildFeedbackThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => { crossfadeToResult(thinkEl, response.component); }, 3000));
      } else if (response.devPlanThinking) {
        const thinkEl = addAIComponentMessage(buildDevPlanThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => { crossfadeToResult(thinkEl, response.component); }, 3000));
      } else if (response.budgetThinking) {
        const thinkEl = addAIComponentMessage(buildBudgetThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => { crossfadeToResult(thinkEl, response.component); }, 2500));
      } else if (response.healthScoreThinking) {
        const thinkEl = addAIComponentMessage(buildHealthScoreThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => { crossfadeToResult(thinkEl, response.component); }, 3000));
      } else if (response.reelScriptsThinking) {
        const thinkEl = addAIComponentMessage(buildReelScriptsThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => { crossfadeToResult(thinkEl, response.component); }, 2500));
      } else if (response.calendarThinking) {
        const thinkEl = addAIComponentMessage(buildCalendarThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => { crossfadeToResult(thinkEl, response.component); }, 2500));
      } else if (response.performanceThinking) {
        const thinkEl = addAIComponentMessage(buildPerformanceThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => { crossfadeToResult(thinkEl, response.component); }, 3000));
      } else if (response.journalHistoryThinking) {
        const thinkEl = addAIComponentMessage(buildJournalHistoryThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => { crossfadeToResult(thinkEl, response.component); }, 2500));
      } else if (response.patternThinking) {
        const thinkEl = addAIComponentMessage(buildPatternThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => { crossfadeToResult(thinkEl, response.component); }, 3500));
      } else if (response.reportThinking) {
        const thinkEl = addAIComponentMessage(buildReportThinking(), true);
        scrollToBottom();
        _track(setTimeout(() => { crossfadeToResult(thinkEl, response.component); }, 4000));
      } else if (response.genericThinking) {
        // Generic thinking state for responses that previously had no thinking animation
        const thinkEl = addAIComponentMessage(
          buildGenericThinking(response.genericThinkingText), true);
        scrollToBottom();
        _track(setTimeout(() => {
          crossfadeToResult(thinkEl, response.component);
        }, 2000));
      } else if (response.component) {
        addAIComponentMessage(response.component);
      } else {
        addAIMessage(response.text, response.chips);
      }
      scrollToBottom();
    }, 1500 + Math.random() * 1000));
  }

  // Send on Enter
  [chatInput, chatInputBottom].forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(input.value);
      }
    });
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    });
  });

  sendBtn.addEventListener('click', () => sendMessage(chatInput.value));

  // --- Chat message builders ---
  function addUserMessage(text) {
    const el = document.createElement('div');
    el.className = 'message-user is-animated';
    el.innerHTML = `<div class="message-user-bubble">${escapeHtml(text)}</div>`;
    chatMessages.appendChild(el);
    scrollToBottom();
  }

  function addUserMessageWithImage(text, imgSrc) {
    const el = document.createElement('div');
    el.className = 'message-user is-animated';
    el.innerHTML = `
      <div class="message-user--with-image">
        <div class="message-user-image"><img src="${imgSrc}" alt="Attached photo"/></div>
        <div class="message-user-bubble">${escapeHtml(text)}</div>
      </div>`;
    chatMessages.appendChild(el);
    scrollToBottom();
  }

  function addAIMessage(html, chips = []) {
    const el = document.createElement('div');
    el.className = 'message-ai is-animated';

    let chipsHtml = '';
    if (chips.length) {
      chipsHtml = `
        <div class="action-chips">
          ${chips.map(c => `<button class="action-chip" data-prompt="${escapeAttr(c)}">${escapeHtml(c)}</button>`).join('')}
        </div>`;
    }

    el.innerHTML = `
      <div class="avatar avatar--chat">
        <div class="avatar-initials" style="background:${currentDemo.gradient}">${currentDemo.initials}</div>
      </div>
      <div class="message-ai-content">
        <div class="message-ai-text">${html}</div>
        ${chipsHtml}
      </div>`;
    chatMessages.appendChild(el);

    el.querySelectorAll('.action-chip').forEach(chip => {
      chip.addEventListener('click', () => sendMessage(chip.dataset.prompt));
    });
  }

  function addAIComponentMessage(componentHtml, returnEl) {
    const el = document.createElement('div');
    el.className = 'message-ai is-animated';
    el.innerHTML = `
      <div class="avatar avatar--chat">
        <div class="avatar-initials" style="background:${currentDemo.gradient}">${currentDemo.initials}</div>
      </div>
      <div class="message-ai-content">
        ${componentHtml}
      </div>`;
    chatMessages.appendChild(el);
    // Add animation class to response cards for staggered entrance
    el.querySelectorAll('.chat-response-card').forEach(c => c.classList.add('is-animated'));
    initComponentInteractions(el);
    if (returnEl) return el;
  }

  function addLoadingMessage() {
    const el = document.createElement('div');
    el.className = 'message-ai is-animated';
    el.innerHTML = `
      <div class="avatar avatar--chat">
        <div class="avatar-initials" style="background:${currentDemo.gradient}">${currentDemo.initials}</div>
      </div>
      <div class="message-loading is-animated">
        <span class="loading-text">${currentDemo.name.split(' ')[0]} is thinking</span>
        <div class="loading-dots">
          <span></span><span></span><span></span>
        </div>
      </div>`;
    chatMessages.appendChild(el);
    scrollToBottom();
    return el;
  }

  // --- Crossfade transition utility ---
  function crossfadeToResult(thinkingEl, resultHtml, scrollFn) {
    thinkingEl.classList.add('uni-fade-out');
    _track(setTimeout(() => {
      const scrollPos = chatMessages.scrollTop;
      thinkingEl.remove();
      chatMessages.scrollTop = scrollPos;
      const resultEl = addAIComponentMessage(resultHtml, true);
      resultEl.classList.add('uni-fade-in');
      // Add animation class to the response card for staggered entrance
      const card = resultEl.querySelector('.chat-response-card');
      if (card) card.classList.add('is-animated');
      if (scrollFn === scrollToTop) {
        scrollToTop(resultEl);
      } else {
        scrollToBottom();
      }
    }, 280));
  }

  // --- Generic thinking state builder ---
  function buildGenericThinking(text) {
    return `
    <div class="chat-response-card">
      <div class="uni-generic-thinking">
        <div class="uni-generic-thinking__header">
          <div class="uni-generic-thinking__icon uni-pulse-ring">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0l-4.725 2.885a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="uni-generic-thinking__text">${text}</span>
        </div>
        <div class="uni-progress">
          <div class="uni-progress__fill"></div>
        </div>
      </div>
    </div>`;
  }

  function scrollToBottom() {
    // No-op: keep viewport in place so screen-shares show response from the top
  }

  function scrollToTop(el) {
    // No-op: keep viewport in place so screen-shares show response from the top
  }

  // Preserve scroll position when appending to chat — browsers (especially mobile)
  // auto-scroll when new content is added to a scrollable container.
  // Preserve scroll position when modifying chat — browsers (especially mobile)
  // auto-scroll when content is added/removed in a scrollable container.
  const _origAppendChild = chatMessages.appendChild.bind(chatMessages);
  chatMessages.appendChild = function(node) {
    const scrollPos = chatMessages.scrollTop;
    const result = _origAppendChild(node);
    chatMessages.scrollTop = scrollPos;
    return result;
  };
  const _origRemoveChild = chatMessages.removeChild.bind(chatMessages);
  chatMessages.removeChild = function(node) {
    const scrollPos = chatMessages.scrollTop;
    const result = _origRemoveChild(node);
    chatMessages.scrollTop = scrollPos;
    return result;
  };

  // --- Settings modal ---
  function openSettings() {
    settingsModal.classList.remove('hidden');
    settingsModal.classList.remove('closing');
  }
  function closeSettingsModal() {
    settingsModal.classList.add('closing');
    settingsModal.addEventListener('animationend', function handler() {
      settingsModal.classList.add('hidden');
      settingsModal.classList.remove('closing');
      settingsModal.removeEventListener('animationend', handler);
    });
  }

  settingsBtn.addEventListener('click', (e) => { e.preventDefault(); openSettings(); });
  settingsTopBtn.addEventListener('click', openSettings);
  closeSettings.addEventListener('click', closeSettingsModal);
  document.querySelector('.modal-backdrop')?.addEventListener('click', closeSettingsModal);

  // ===========================================================
  // COMPONENT BUILDERS
  // ===========================================================

  // --- Image URLs ---
  const IMG = {
    meal: 'https://images.unsplash.com/photo-1616902666559-af398792d890?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&w=600&q=80',
    squat: 'https://images.unsplash.com/photo-1513352098199-8ccf457b35a8?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&w=600&q=80',
    squatIdeal: 'https://images.unsplash.com/photo-1642267379398-c430d619019d?ixlib=rb-4.1.0&fm=jpg&crop=entropy&cs=srgb&w=600&q=80',
  };

  // --- 1. Cal AI: Scanning State ---
  function buildCalAIScanningState() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Analyzing your meal photo...</p>
    </div>
    <div class="chat-response-card">
      <div class="cal-ai__photo">
        <img src="${IMG.meal}" alt="Meal photo" class="cal-ai__photo-img"/>
        <div class="cal-ai__photo-overlay"></div>
      </div>
      <div class="cal-ai__scanning">
        <div class="cal-ai__scan-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="cal-ai__scan-text">Identifying food items...</span>
        <div class="cal-ai__scan-bar"><div class="cal-ai__scan-bar-fill"></div></div>
      </div>
    </div>`;
  }

  // --- 1. Cal AI: Photo-to-Macros Scanner (results) ---
  function buildCalAIScanner() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>I've analyzed your meal photo. Here's the nutritional breakdown:</p>
    </div>
    <div class="chat-response-card" id="calAiCard">
      <div class="cal-ai__photo">
        <img src="${IMG.meal}" alt="Meal photo" class="cal-ai__photo-img"/>
        <div class="cal-ai__photo-overlay"></div>
      </div>
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Meal Analysis</div>
          <div class="chat-response-card__subtitle">Lunch — 3 items detected</div>
        </div>
      </div>
      <div class="cal-ai__items">
        <div class="cal-ai__item">
          <div class="cal-ai__item-left">
            <span class="cal-ai__item-emoji">🍝</span>
            <div>
              <div class="cal-ai__item-name">Chicken Pasta</div>
              <div class="cal-ai__item-portion">~280g serving</div>
            </div>
          </div>
          <div class="cal-ai__item-macros">
            <div class="cal-ai__macro"><span class="cal-ai__macro-value">42g</span><span class="cal-ai__macro-label">Prot</span></div>
            <div class="cal-ai__macro"><span class="cal-ai__macro-value">58g</span><span class="cal-ai__macro-label">Carb</span></div>
            <div class="cal-ai__macro"><span class="cal-ai__macro-value">14g</span><span class="cal-ai__macro-label">Fat</span></div>
          </div>
        </div>
        <div class="cal-ai__item">
          <div class="cal-ai__item-left">
            <span class="cal-ai__item-emoji">🥗</span>
            <div>
              <div class="cal-ai__item-name">Side Salad</div>
              <div class="cal-ai__item-portion">~120g with dressing</div>
            </div>
          </div>
          <div class="cal-ai__item-macros">
            <div class="cal-ai__macro"><span class="cal-ai__macro-value">3g</span><span class="cal-ai__macro-label">Prot</span></div>
            <div class="cal-ai__macro"><span class="cal-ai__macro-value">8g</span><span class="cal-ai__macro-label">Carb</span></div>
            <div class="cal-ai__macro"><span class="cal-ai__macro-value">7g</span><span class="cal-ai__macro-label">Fat</span></div>
          </div>
        </div>
        <div class="cal-ai__item">
          <div class="cal-ai__item-left">
            <span class="cal-ai__item-emoji">🍞</span>
            <div>
              <div class="cal-ai__item-name">Garlic Bread</div>
              <div class="cal-ai__item-portion">2 slices</div>
            </div>
          </div>
          <div class="cal-ai__item-macros">
            <div class="cal-ai__macro"><span class="cal-ai__macro-value">5g</span><span class="cal-ai__macro-label">Prot</span></div>
            <div class="cal-ai__macro"><span class="cal-ai__macro-value">28g</span><span class="cal-ai__macro-label">Carb</span></div>
            <div class="cal-ai__macro"><span class="cal-ai__macro-value">9g</span><span class="cal-ai__macro-label">Fat</span></div>
          </div>
        </div>
      </div>
      <div class="cal-ai__total">
        <span class="cal-ai__total-label">Total</span>
        <span class="cal-ai__total-cal">738 <span>kcal</span></span>
      </div>
      <div class="chat-response-card__footer" id="calAiFooter">
        <button class="cal-ai__add-btn" id="calAiAddBtn">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 3v10M3 8h10" stroke-linecap="round"/></svg>
          Add to Today's Plan
        </button>
      </div>
    </div>`;
  }

  // --- 2. Habit Tracker: Workout Calendar ---
  function buildHabitTracker() {
    const today = 19;
    // Workout data: day -> type
    const workouts = {2:'Push',3:'Pull',5:'Legs',6:'Cardio',9:'Push',10:'Pull',12:'Legs',13:'Cardio',16:'Push',17:'Pull',18:'Legs'};
    const workoutDays = new Set(Object.keys(workouts).map(Number));

    // This week strip (Mon16 - Sun22)
    const week = [
      { d:'M', num:16 }, { d:'T', num:17 }, { d:'W', num:18 },
      { d:'T', num:19 }, { d:'F', num:20 }, { d:'S', num:21 }, { d:'S', num:22 },
    ];
    const weekHtml = week.map(w => {
      const done = workoutDays.has(w.num);
      const isToday = w.num === today;
      const isFuture = w.num > today;
      let dotClass = 'habit-dot';
      if (done) dotClass += ' habit-dot--done';
      else if (isToday) dotClass += ' habit-dot--today';
      else if (isFuture) dotClass += ' habit-dot--future';
      else dotClass += ' habit-dot--rest';
      return `<div class="habit-week-col">
        <span class="habit-week-day">${w.d}</span>
        <div class="${dotClass}">${done ? '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 6l2.5 2.5 4.5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ''}</div>
      </div>`;
    }).join('');

    // Month grid (Feb 2026 starts on Sunday)
    let gridHtml = '';
    for (let day = 1; day <= 28; day++) {
      const done = workoutDays.has(day);
      const isToday = day === today;
      const isFuture = day > today;
      let cls = 'habit-cell';
      if (done) cls += ' habit-cell--done';
      else if (isFuture) cls += ' habit-cell--future';
      if (isToday) cls += ' habit-cell--today';
      gridHtml += `<div class="${cls}"></div>`;
    }

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's your workout consistency this month. Looking strong!</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Workout Tracker</div>
          <div class="chat-response-card__subtitle">February 2026</div>
        </div>
      </div>
      <!-- Streak + stats row -->
      <div class="habit-stats">
        <div class="habit-stat habit-stat--streak">
          <span class="habit-stat__number">3</span>
          <span class="habit-stat__label">week streak</span>
        </div>
        <div class="habit-stat">
          <span class="habit-stat__number">11</span>
          <span class="habit-stat__label">workouts</span>
        </div>
        <div class="habit-stat">
          <span class="habit-stat__number">58%</span>
          <span class="habit-stat__label">consistency</span>
        </div>
      </div>
      <!-- This week strip -->
      <div class="habit-week-strip">
        <span class="habit-week-title">This week</span>
        <div class="habit-week-row">${weekHtml}</div>
      </div>
      <!-- Month heatmap grid -->
      <div class="habit-month">
        <div class="habit-month-header">
          <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
        </div>
        <div class="habit-month-grid">${gridHtml}</div>
        <div class="habit-legend">
          <div class="habit-legend-item"><div class="habit-cell habit-cell--done habit-legend-swatch"></div><span>Workout</span></div>
          <div class="habit-legend-item"><div class="habit-cell habit-legend-swatch"></div><span>Rest</span></div>
          <div class="habit-legend-item"><div class="habit-cell habit-cell--today habit-legend-swatch"></div><span>Today</span></div>
        </div>
      </div>
    </div>`;
  }

  // --- 3. Exercise Form Analyzer ---
  function buildFormAnalyzer() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>I've analyzed your squat form. Overall solid foundation — here are some key areas to focus on:</p>
    </div>
    <div class="chat-response-card" id="formAnalyzerCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Form Analysis — Barbell Back Squat</div>
          <div class="chat-response-card__subtitle">3 areas analyzed</div>
        </div>
      </div>
      <div class="form-analyzer__score">
        <span class="form-analyzer__score-value">7.2</span>
        <span class="form-analyzer__score-max">/ 10</span>
        <span class="form-analyzer__score-label">— Good, with room to improve</span>
      </div>
      <div class="form-analyzer__image-wrap" id="formAnalyzerImageSingle">
        <img src="${IMG.squat}" alt="Squat form" class="form-analyzer__photo"/>
        <!-- Overlay lines drawn via SVG on top of photo -->
        <svg class="form-analyzer__overlay-svg" viewBox="0 0 520 390" fill="none">
          <!-- Upper back line — green (good) -->
          <line x1="270" y1="70" x2="255" y2="170" stroke="#16a34a" stroke-width="3" stroke-dasharray="8 4" opacity="0.85"/>
          <!-- Lower back line — red (fix needed) -->
          <line x1="255" y1="170" x2="240" y2="240" stroke="#dc2626" stroke-width="3" stroke-dasharray="8 4" opacity="0.85"/>
          <!-- Knee tracking — orange/warning -->
          <circle cx="220" cy="300" r="16" fill="none" stroke="#f59e0b" stroke-width="2.5" opacity="0.8"/>
          <circle cx="300" cy="295" r="16" fill="none" stroke="#f59e0b" stroke-width="2.5" opacity="0.8"/>
        </svg>
        <!-- Annotation callouts -->
        <div class="form-analyzer__annotation" style="top:10%;left:55%">
          <span class="form-analyzer__annotation-num form-analyzer__annotation-num--good">1</span>
          <span class="form-analyzer__annotation-text">Head neutral — good</span>
        </div>
        <div class="form-analyzer__annotation" style="top:48%;left:5%">
          <span class="form-analyzer__annotation-num form-analyzer__annotation-num--fix">2</span>
          <span class="form-analyzer__annotation-text">Lower back rounding</span>
        </div>
        <div class="form-analyzer__annotation" style="top:72%;left:55%">
          <span class="form-analyzer__annotation-num form-analyzer__annotation-num--warning">3</span>
          <span class="form-analyzer__annotation-text">Knees caving inward</span>
        </div>
      </div>
      <div class="form-analyzer__feedback">
        <div class="form-analyzer__feedback-item">
          <div class="form-analyzer__severity form-analyzer__severity--good"></div>
          <div>
            <div class="form-analyzer__feedback-text">Head and upper back position is solid</div>
            <div class="form-analyzer__feedback-detail">Neutral spine through the cervical region. Keep looking at a spot 6 feet ahead on the floor.</div>
          </div>
        </div>
        <div class="form-analyzer__feedback-item">
          <div class="form-analyzer__severity form-analyzer__severity--fix"></div>
          <div>
            <div class="form-analyzer__feedback-text">Lower back is rounding at the bottom</div>
            <div class="form-analyzer__feedback-detail">This "butt wink" puts stress on lumbar discs. Reduce depth slightly and focus on bracing your core before descending.</div>
          </div>
        </div>
        <div class="form-analyzer__feedback-item">
          <div class="form-analyzer__severity form-analyzer__severity--warning"></div>
          <div>
            <div class="form-analyzer__feedback-text">Knees are tracking slightly inward</div>
            <div class="form-analyzer__feedback-detail">Push knees out over your toes. Cue: "screw your feet into the floor" to engage glutes and prevent valgus collapse.</div>
          </div>
        </div>
      </div>
      <div class="form-analyzer__compare" id="formCompareToggle">
        <div class="form-analyzer__compare-toggle" id="formCompareSwitch"></div>
        <span class="form-analyzer__compare-label">Compare with Ideal Form</span>
      </div>
      <div class="form-analyzer__side-by-side hidden" id="formSideBySide"
        <div>
          <div class="form-analyzer__side-label form-analyzer__side-label--yours">Your Form</div>
          <div class="form-analyzer__side-image">
            <img src="${IMG.squat}" alt="Your squat form" class="form-analyzer__side-photo"/>
          </div>
        </div>
        <div>
          <div class="form-analyzer__side-label form-analyzer__side-label--ideal">Ideal Form</div>
          <div class="form-analyzer__side-image form-analyzer__side-image--ideal">
            <img src="${IMG.squatIdeal}" alt="Ideal squat form" class="form-analyzer__side-photo"/>
          </div>
        </div>
      </div>
    </div>`;
  }

  // --- 4. Nutrition Tracker: Daily/Weekly Dashboard ---
  function buildNutritionTracker() {
    const consumed = 1847;
    const target = 2650;
    const pct = Math.round((consumed / target) * 100);
    const circumference = 2 * Math.PI * 42; // radius 42
    const dashoffset = circumference - (circumference * pct / 100);

    // Realistic macro data for 180lb male
    const protein = { current: 132, target: 185 };
    const carbs = { current: 198, target: 290 };
    const fat = { current: 58, target: 82 };

    // Weekly calorie data (last 7 days ending today Thu)
    const weekData = [
      { day: 'Fri', cal: 2580 },
      { day: 'Sat', cal: 2720 },
      { day: 'Sun', cal: 2140 },
      { day: 'Mon', cal: 2690 },
      { day: 'Tue', cal: 2850 },
      { day: 'Wed', cal: 2540 },
      { day: 'Thu', cal: 1847 },
    ];
    const maxCal = 3000;

    const barsHtml = weekData.map((d, i) => {
      const h = Math.round((d.cal / maxCal) * 100);
      let barClass = d.cal >= target ? 'nutrition__chart-bar--over' : 'nutrition__chart-bar--under';
      if (i === 6) barClass = 'nutrition__chart-bar--today';
      return `<div class="nutrition__chart-bar-wrap">
        <div class="nutrition__chart-bar ${barClass}" style="height:${h}px"></div>
        <span class="nutrition__chart-day-label">${d.day}</span>
      </div>`;
    }).join('');

    const targetLineTop = 100 - Math.round((target / maxCal) * 100);

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's your nutrition dashboard for today. You're making good progress — don't forget to hit your protein target before bed!</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Nutrition Dashboard</div>
          <div class="chat-response-card__subtitle">Thursday, Feb 19</div>
        </div>
        <div class="toggle-pill" data-toggle="nutrition-view">
          <button class="toggle-pill__btn toggle-pill__btn--active" data-value="daily">Daily</button>
          <button class="toggle-pill__btn" data-value="weekly">Weekly</button>
        </div>
      </div>

      <!-- Daily view -->
      <div data-panel="daily">
        <div class="nutrition__ring-section">
          <div class="nutrition__ring-wrap">
            <svg class="nutrition__ring-svg" viewBox="0 0 100 100">
              <circle class="nutrition__ring-bg" cx="50" cy="50" r="42"/>
              <circle class="nutrition__ring-fill nutrition__ring-fill--cal"
                cx="50" cy="50" r="42"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${dashoffset}"/>
            </svg>
            <div class="nutrition__ring-center">
              <span class="nutrition__ring-number">${consumed}</span>
              <span class="nutrition__ring-label">of ${target}</span>
            </div>
          </div>
          <div class="nutrition__macro-list">
            <div class="nutrition__macro-row">
              <div class="nutrition__macro-row-top">
                <span class="nutrition__macro-name">Protein</span>
                <span class="nutrition__macro-values">${protein.current}g <span>/ ${protein.target}g</span></span>
              </div>
              <div class="nutrition__macro-bar">
                <div class="nutrition__macro-bar-fill nutrition__macro-bar-fill--protein" style="width:${Math.round(protein.current/protein.target*100)}%"></div>
              </div>
            </div>
            <div class="nutrition__macro-row">
              <div class="nutrition__macro-row-top">
                <span class="nutrition__macro-name">Carbs</span>
                <span class="nutrition__macro-values">${carbs.current}g <span>/ ${carbs.target}g</span></span>
              </div>
              <div class="nutrition__macro-bar">
                <div class="nutrition__macro-bar-fill nutrition__macro-bar-fill--carbs" style="width:${Math.round(carbs.current/carbs.target*100)}%"></div>
              </div>
            </div>
            <div class="nutrition__macro-row">
              <div class="nutrition__macro-row-top">
                <span class="nutrition__macro-name">Fat</span>
                <span class="nutrition__macro-values">${fat.current}g <span>/ ${fat.target}g</span></span>
              </div>
              <div class="nutrition__macro-bar">
                <div class="nutrition__macro-bar-fill nutrition__macro-bar-fill--fat" style="width:${Math.round(fat.current/fat.target*100)}%"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="nutrition__meals">
          <div class="nutrition__meals-title">Today's Meals</div>
          <div class="nutrition__meal">
            <div class="nutrition__meal-left">
              <span class="nutrition__meal-icon">🍳</span>
              <div class="nutrition__meal-info">
                <span class="nutrition__meal-name">Breakfast</span>
                <span class="nutrition__meal-detail">Eggs, turkey bacon, oats</span>
              </div>
            </div>
            <span class="nutrition__meal-cal">580 <span>kcal</span></span>
          </div>
          <div class="nutrition__meal">
            <div class="nutrition__meal-left">
              <span class="nutrition__meal-icon">🍝</span>
              <div class="nutrition__meal-info">
                <span class="nutrition__meal-name">Lunch</span>
                <span class="nutrition__meal-detail">Chicken pasta, salad, bread</span>
              </div>
            </div>
            <span class="nutrition__meal-cal">738 <span>kcal</span></span>
          </div>
          <div class="nutrition__meal">
            <div class="nutrition__meal-left">
              <span class="nutrition__meal-icon">🥤</span>
              <div class="nutrition__meal-info">
                <span class="nutrition__meal-name">Post-Workout Shake</span>
                <span class="nutrition__meal-detail">Whey protein, banana, oats</span>
              </div>
            </div>
            <span class="nutrition__meal-cal">529 <span>kcal</span></span>
          </div>
          <div class="nutrition__meal">
            <div class="nutrition__meal-left">
              <span class="nutrition__meal-icon">🍽️</span>
              <div class="nutrition__meal-info">
                <span class="nutrition__meal-name">Dinner</span>
                <span class="nutrition__meal-detail">Not logged yet</span>
              </div>
            </div>
            <span class="nutrition__meal-cal nutrition__meal-cal--empty">— <span>kcal</span></span>
          </div>
          <button class="nutrition__quick-add">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 2v10M2 7h10" stroke-linecap="round"/></svg>
            Quick add meal or snack
          </button>
        </div>
      </div>

      <!-- Weekly view -->
      <div data-panel="weekly" class="hidden">
        <div class="nutrition__weekly-wrapper">
          <div class="nutrition__weekly-chart">
            <div class="nutrition__chart-target-line" style="bottom:${Math.round((target/maxCal)*100)}px">
              <span class="nutrition__chart-target-label">${target} target</span>
            </div>
            ${barsHtml}
          </div>
        </div>
        <div class="nutrition__weekly-stats">
          <div class="nutrition__weekly-stats-row">
            <div>
              <div class="nutrition__weekly-stat-label">Weekly Avg</div>
              <div class="nutrition__weekly-stat-value">2,481 <span class="nutrition__weekly-stat-unit">kcal/day</span></div>
            </div>
            <div class="nutrition__weekly-stat--right">
              <div class="nutrition__weekly-stat-label">On Target</div>
              <div class="nutrition__weekly-stat-value">3 <span class="nutrition__weekly-stat-unit">of 7 days</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  // ===========================================================
  // MARKETING COMPONENT BUILDERS
  // ===========================================================

  // --- 5. FB Ads: Connecting State ---
  function buildFbAdsConnecting() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Let me pull your latest campaign data.</p>
    </div>
    <div class="chat-response-card">
      <div class="fb-ads__status">
        <div class="fb-ads__status-dot"></div>
        <span class="fb-ads__status-text">Connecting to Facebook Ads Manager...</span>
      </div>
    </div>`;
  }

  // --- 5. FB Ads: Syncing State ---
  function buildFbAdsSyncing() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Connected. Pulling your campaign data now.</p>
    </div>
    <div class="chat-response-card">
      <div class="fb-ads__status">
        <div class="fb-ads__status-dot"></div>
        <span class="fb-ads__status-text">Pulling campaign data...</span>
      </div>
      <div class="fb-ads__sync-details">
        <div class="fb-ads__sync-item">
          <svg class="fb-ads__sync-check" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 7l3 3 6-6.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Found 3 active campaigns
        </div>
        <div class="fb-ads__sync-item">
          <svg class="fb-ads__sync-check" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 7l3 3 6-6.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          12 ad sets loaded
        </div>
        <div class="fb-ads__sync-item">
          <svg class="fb-ads__sync-check" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 7l3 3 6-6.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          47 ads synced
        </div>
      </div>
      <div class="fb-ads__sync-bar"><div class="fb-ads__sync-bar-fill"></div></div>
    </div>`;
  }

  // --- 5. FB Ads: Performance Dashboard ---
  function buildFbAdsPerformance() {
    const campaigns = [
      {
        name: 'Kodara \u2014 VSL Cold Traffic',
        status: 'active', statusLabel: 'Active',
        spend: '$4,230', impressions: '892K', clicks: '12,847',
        ctr: '1.44%', cpa: '$18.20', roas: '3.2x',
        ctrClass: '', cpaClass: 'good', roasClass: 'good',
        trend: [65, 72, 68, 80, 75, 82, 90], trendDir: 'up',
      },
      {
        name: 'Retargeting \u2014 Case Study Viewers',
        status: 'active', statusLabel: 'Active',
        spend: '$1,890', impressions: '234K', clicks: '5,621',
        ctr: '2.40%', cpa: '$12.50', roas: '4.1x',
        ctrClass: 'good', cpaClass: 'good', roasClass: 'good',
        trend: [45, 50, 48, 52, 55, 58, 62], trendDir: 'up',
      },
      {
        name: 'Lookalike \u2014 High Intent',
        status: 'paused', statusLabel: 'Paused',
        spend: '$2,150', impressions: '456K', clicks: '3,892',
        ctr: '0.85%', cpa: '$34.80', roas: '1.1x',
        ctrClass: 'bad', cpaClass: 'bad', roasClass: 'bad',
        trend: [80, 75, 65, 55, 42, 38, 30], trendDir: 'down',
      },
    ];

    const campaignsHtml = campaigns.map(c => {
      const maxTrend = Math.max(...c.trend);
      const trendBarsHtml = c.trend.map(v => {
        const h = Math.round((v / maxTrend) * 24);
        return `<div class="fb-ads__trend-bar fb-ads__trend-bar--${c.trendDir}" style="height:${h}px"></div>`;
      }).join('');

      return `
      <div class="fb-ads__campaign">
        <div class="fb-ads__campaign-header">
          <span class="fb-ads__campaign-name">${c.name}</span>
          <span class="fb-ads__status-pill fb-ads__status-pill--${c.status}">${c.statusLabel}</span>
        </div>
        <div class="fb-ads__metrics">
          <div class="fb-ads__metric">
            <span class="fb-ads__metric-value">${c.spend}</span>
            <span class="fb-ads__metric-label">Spend</span>
          </div>
          <div class="fb-ads__metric">
            <span class="fb-ads__metric-value">${c.impressions}</span>
            <span class="fb-ads__metric-label">Impressions</span>
          </div>
          <div class="fb-ads__metric">
            <span class="fb-ads__metric-value">${c.clicks}</span>
            <span class="fb-ads__metric-label">Clicks</span>
          </div>
          <div class="fb-ads__metric">
            <span class="fb-ads__metric-value ${c.ctrClass ? 'fb-ads__metric-value--' + c.ctrClass : ''}">${c.ctr}</span>
            <span class="fb-ads__metric-label">CTR</span>
          </div>
          <div class="fb-ads__metric">
            <span class="fb-ads__metric-value ${c.cpaClass ? 'fb-ads__metric-value--' + c.cpaClass : ''}">${c.cpa}</span>
            <span class="fb-ads__metric-label">CPA</span>
          </div>
          <div class="fb-ads__metric">
            <span class="fb-ads__metric-value ${c.roasClass ? 'fb-ads__metric-value--' + c.roasClass : ''}">${c.roas}</span>
            <span class="fb-ads__metric-label">ROAS</span>
          </div>
        </div>
        <div class="fb-ads__trend">${trendBarsHtml}</div>
      </div>`;
    }).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's your campaign performance overview. I've analyzed all 3 active campaigns across the last 7 days.</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Campaign Performance</div>
          <div class="chat-response-card__subtitle">Last 7 days \u00B7 3 campaigns</div>
        </div>
        <div class="fb-ads__live-badge">
          <div class="fb-ads__live-dot"></div>
          Live
        </div>
      </div>
      <div class="fb-ads__campaigns">
        ${campaignsHtml}
      </div>
      <div class="fb-ads__summary">
        Your top performer is <strong>Kodara \u2014 VSL Cold Traffic</strong> with a <strong>3.2x ROAS</strong> and spend trending upward. I\u2019d recommend increasing budget by 20% on this campaign. <strong>Retargeting \u2014 Case Study Viewers</strong> is also strong at 4.1x ROAS with room to scale. I\u2019d suggest pausing <strong>Lookalike \u2014 High Intent</strong> \u2014 it\u2019s been declining for 5 days with a 1.1x ROAS and $34.80 CPA.
      </div>
    </div>`;
  }

  // --- 6. Competitor: Searching State ---
  function buildCompetitorSearching() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Searching the Facebook Ad Library now...</p>
    </div>
    <div class="chat-response-card">
      <div class="competitor__search-status">
        <div class="competitor__search-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="competitor__search-text">Searching Facebook Ad Library for Glossier...</span>
        <div class="competitor__search-bar"><div class="competitor__search-bar-fill"></div></div>
      </div>
    </div>`;
  }

  // --- 6. Competitor: Ad Library Browser ---
  function buildCompetitorBrowser() {
    const ads = [
      { copy: '\u201CIs your skincare routine actually working? Most women waste $200/month on products that don\u2019t...\u201D', format: 'Video', duration: '47 days', ratio: 'feed' },
      { copy: '\u201CI tried every moisturizer on the market. Then my dermatologist told me something that changed everything...\u201D', format: 'Video', duration: '34 days', ratio: 'feed' },
      { copy: '\u201CBefore Glossier: 12-step routine. After Glossier: 3 steps, better skin. Here\u2019s what I use...\u201D', format: 'Image', duration: '28 days', ratio: 'feed' },
      { copy: '\u201CPOV: You finally find a sunscreen that doesn\u2019t leave a white cast\u201D', format: 'Video', duration: '21 days', ratio: 'story' },
      { copy: '\u201CThe #1 mistake people make with their skincare? Using too many products. We asked 500 dermatologists...\u201D', format: 'Carousel', duration: '15 days', ratio: 'feed' },
      { copy: '\u201CReal people. Real results. No filters. See what 30 days of consistent skincare looks like...\u201D', format: 'Video', duration: '12 days', ratio: 'feed' },
    ];

    const videoCount = ads.filter(a => a.format === 'Video').length;
    const imageCount = ads.filter(a => a.format === 'Image').length;
    const carouselCount = ads.filter(a => a.format === 'Carousel').length;

    const thumbIcon = `<svg class="competitor__ad-thumb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm12.75-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    const adsHtml = ads.map(ad => `
      <div class="competitor__ad-card" data-format="${ad.format}">
        <div class="competitor__ad-thumb competitor__ad-thumb--${ad.ratio}">
          <div class="competitor__ad-thumb-inner">
            ${thumbIcon}
            <span class="competitor__ad-thumb-label">${ad.format === 'Video' ? 'Video Creative' : ad.format === 'Carousel' ? 'Carousel (3 slides)' : 'Static Image'}</span>
          </div>
        </div>
        <div class="competitor__ad-info">
          <div class="competitor__ad-copy">${ad.copy}</div>
          <div class="competitor__ad-meta">
            <span class="competitor__format-badge">${ad.format}</span>
            <span class="competitor__ad-duration">${ad.duration}</span>
          </div>
        </div>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Found <strong>23 active ads</strong> from Glossier. Here are the most relevant ones:</p>
    </div>
    <div class="chat-response-card" id="competitorCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Competitor Ads \u2014 Glossier</div>
          <div class="chat-response-card__subtitle">23 active ads found</div>
        </div>
      </div>
      <div class="competitor__filters" id="competitorFilters">
        <button class="competitor__filter-btn competitor__filter-btn--active" data-filter="all">All Ads <span class="competitor__filter-count">${ads.length}</span></button>
        <button class="competitor__filter-btn" data-filter="Video">Video <span class="competitor__filter-count">${videoCount}</span></button>
        <button class="competitor__filter-btn" data-filter="Image">Image <span class="competitor__filter-count">${imageCount}</span></button>
        <button class="competitor__filter-btn" data-filter="Carousel">Carousel <span class="competitor__filter-count">${carouselCount}</span></button>
      </div>
      <div class="competitor__gallery">
        <div class="competitor__grid" id="competitorGrid">
          ${adsHtml}
        </div>
      </div>
      <div class="competitor__analysis">
        <div class="competitor__analysis-title">Competitor Analysis</div>
        <div class="competitor__analysis-text">
          They\u2019re running <strong>8 video ads</strong> focused on pain-point messaging. Their longest-running ad (47 days) uses a <strong>UGC-style testimonial</strong> format. Most of their creatives lead with a question hook. They appear to be testing story-format ads for the first time this month.
        </div>
        <div class="competitor__patterns-title">Patterns Detected</div>
        <div class="competitor__patterns">
          <span class="competitor__pattern-chip">UGC Style (65%)</span>
          <span class="competitor__pattern-chip">Question Hooks (40%)</span>
          <span class="competitor__pattern-chip">Before/After (25%)</span>
          <span class="competitor__pattern-chip">Social Proof (20%)</span>
          <span class="competitor__pattern-chip">Pain Points (55%)</span>
        </div>
      </div>
    </div>`;
  }

  // --- 7. Ad Creative: Thinking State ---
  function buildAdGenThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Generating ad concepts based on your campaign data and competitor analysis...</p>
    </div>
    <div class="chat-response-card">
      <div class="ad-gen__thinking">
        <div class="ad-gen__thinking-icon uni-pulse-ring">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0l-4.725 2.885a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="ad-gen__thinking-text">Generating ad concepts based on your<br>campaign data and competitor analysis...</span>
      </div>
    </div>`;
  }

  // --- 7. Ad Creative Generator ---
  function buildAdCreativeGenerator() {
    const concepts = [
      {
        name: 'Concept A',
        tag: 'Pain Point Hook \u00B7 UGC Style',
        primaryText: 'I was spending $3,000/month on Facebook ads with nothing to show for it. My ROAS was 0.8x and I was about to give up on paid media entirely. Then I found a completely different approach to creative strategy...',
        headline: 'Stop Burning Money on Ads That Don\u2019t Convert',
        description: 'See how 1,200+ DTC brands transformed their ad performance in 30 days',
        cta: 'Learn More',
        previewDesc: 'AI-generated image: Person frustrated at laptop with overlay text \u201CStop wasting money on ads that don\u2019t convert\u201D',
        formats: ['Feed', 'Stories', 'Reels'],
        prediction: '2.1\u20132.8x ROAS',
        confidence: 'High',
      },
      {
        name: 'Concept B',
        tag: 'Testimonial \u00B7 Authority Style',
        primaryText: 'We helped Kodara scale from $5K to $50K/month ad spend while improving ROAS from 1.2x to 3.4x. Here\u2019s exactly what we changed in their campaign structure...',
        headline: 'How Kodara 10x\u2019d Their Ad Spend Profitably',
        description: 'Case study: The exact framework behind a 3.4x ROAS at scale',
        cta: 'Get the Case Study',
        previewDesc: 'AI-generated image: Dashboard screenshot with upward trending ROAS graph and text overlay \u201CFrom 1.2x to 3.4x ROAS\u201D',
        formats: ['Feed', 'In-Stream'],
        prediction: '1.8\u20132.4x ROAS',
        confidence: 'Medium',
      },
      {
        name: 'Concept C',
        tag: 'Question Hook \u00B7 Curiosity Gap',
        primaryText: 'What if you could predict which ad creative will perform before spending a single dollar? Most media buyers test blindly. But there\u2019s a data-driven approach that changes everything...',
        headline: 'Predict Your Best Ads Before You Spend',
        description: 'AI-powered creative testing for performance marketers',
        cta: 'Try It Free',
        previewDesc: 'AI-generated image: Split screen showing A/B test results with \u201CWhich ad wins?\u201D and a prediction confidence meter',
        formats: ['Feed', 'Stories'],
        prediction: '2.4\u20133.1x ROAS',
        confidence: 'High',
      },
    ];

    const tabsHtml = concepts.map((c, i) => `
      <button class="ad-gen__tab${i === 0 ? ' ad-gen__tab--active' : ''}" data-concept="${i}">${c.name}</button>
    `).join('');

    const conceptsHtml = concepts.map((c, i) => `
      <div class="ad-gen__concept${i > 0 ? ' hidden' : ''}" data-concept-panel="${i}">
        <div class="ad-gen__strategy-tag">${c.tag}</div>
        <div class="ad-gen__copy">
          <div class="ad-gen__copy-field">
            <span class="ad-gen__copy-label">Primary Text</span>
            <span class="ad-gen__copy-value ad-gen__copy-value--body">${c.primaryText}</span>
          </div>
          <div class="ad-gen__copy-field">
            <span class="ad-gen__copy-label">Headline</span>
            <span class="ad-gen__copy-value">${c.headline}</span>
          </div>
          <div class="ad-gen__copy-field">
            <span class="ad-gen__copy-label">Description</span>
            <span class="ad-gen__copy-value">${c.description}</span>
          </div>
          <div class="ad-gen__copy-field">
            <span class="ad-gen__copy-label">CTA</span>
            <span class="ad-gen__copy-value">${c.cta}</span>
          </div>
        </div>
        <div class="ad-gen__preview">
          <div class="ad-gen__preview-frame">
            <svg class="ad-gen__preview-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm12.75-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="ad-gen__preview-desc">${c.previewDesc}</span>
          </div>
        </div>
        <div class="ad-gen__formats">
          <span class="ad-gen__formats-label">Recommended for:</span>
          ${c.formats.map(f => `<span class="ad-gen__format-pill">${f}</span>`).join('')}
        </div>
        <div class="ad-gen__prediction">
          <svg class="ad-gen__prediction-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0l-4.725 2.885a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="ad-gen__prediction-text">Based on your historical data, this concept could achieve a <strong>${c.prediction}</strong>. Confidence: <strong>${c.confidence}</strong></span>
        </div>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>I\u2019ve generated 3 ad concepts based on your top-performing campaigns and competitor patterns. Here they are:</p>
    </div>
    <div class="chat-response-card" id="adGenCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Ad Concepts</div>
          <div class="chat-response-card__subtitle">3 concepts generated</div>
        </div>
      </div>
      <div class="ad-gen__tabs" id="adGenTabs">
        ${tabsHtml}
      </div>
      ${conceptsHtml}
      <div class="ad-gen__actions">
        <button class="ad-gen__btn ad-gen__btn--primary" id="adGenGenerateImages">Generate Images</button>
        <button class="ad-gen__btn ad-gen__btn--secondary">Generate Video Script</button>
        <button class="ad-gen__btn ad-gen__btn--ghost">Edit Copy</button>
        <button class="ad-gen__btn ad-gen__btn--ghost">Export All</button>
      </div>
    </div>`;
  }

  // --- 8. Creative Preview: Loading State ---
  function buildCreativePreviewLoading() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Generating creative variations now...</p>
    </div>
    <div class="chat-response-card">
      <div class="creative-preview__loading">
        <div class="creative-preview__loading-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm12.75-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="creative-preview__loading-text">Creating 4 ad creative variations...</span>
        <div class="creative-preview__progress"><div class="creative-preview__progress-fill"></div></div>
        <span class="creative-preview__progress-label">Generating variation 1 of 4...</span>
      </div>
    </div>`;
  }

  // --- 8. Creative Preview: Generated Grid ---
  function buildCreativePreview() {
    const variations = [
      {
        label: 'Variation A',
        format: '1080\u00D71080',
        headline: 'Stop Burning Money\non Ads That Don\u2019t\nConvert',
        gradient: 'linear-gradient(135deg, rgba(26,26,26,0.75) 0%, rgba(16,104,68,0.55) 100%)',
        selected: true,
      },
      {
        label: 'Variation B',
        format: '1080\u00D71080',
        headline: 'Your ROAS Is Broken.\nHere\u2019s How to Fix It.',
        gradient: 'linear-gradient(135deg, rgba(16,104,68,0.5) 0%, rgba(26,26,26,0.65) 100%)',
        selected: false,
      },
      {
        label: 'Variation C',
        format: '1080\u00D71080',
        headline: '3,000+ Brands\nSwitched. See Why.',
        gradient: 'linear-gradient(135deg, rgba(26,26,26,0.65) 0%, rgba(26,26,26,0.85) 100%)',
        selected: true,
      },
      {
        label: 'Variation D',
        format: '1080\u00D71920',
        headline: 'What If You Could\nPredict the Winner?',
        gradient: 'linear-gradient(135deg, rgba(16,104,68,0.65) 0%, rgba(16,104,68,0.35) 100%)',
        selected: false,
      },
    ];

    const selectedCount = variations.filter(v => v.selected).length;

    const gridHtml = variations.map((v, i) => `
      <div class="creative-preview__variation${v.selected ? ' creative-preview__variation--selected' : ''}" data-variation="${i}">
        <div class="creative-preview__check">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 6l2.5 2.5 4.5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="creative-preview__image" style="background:${v.gradient}">
          <span class="creative-preview__overlay-text">${v.headline}</span>
        </div>
        <div class="creative-preview__meta">
          <span class="creative-preview__label">${v.label}</span>
          <span class="creative-preview__format">${v.format}</span>
        </div>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here are 4 creative variations for your \u201CPain Point Hook\u201D concept. I\u2019ve pre-selected the two strongest options.</p>
    </div>
    <div class="chat-response-card" id="creativePreviewCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Generated Creatives</div>
          <div class="chat-response-card__subtitle">4 variations</div>
        </div>
      </div>
      <div class="creative-preview__grid" id="creativePreviewGrid">
        ${gridHtml}
      </div>
      <div class="creative-preview__selection" id="creativePreviewSelection">
        Selected: <strong>${selectedCount} of 4</strong> variations
      </div>
      <div class="creative-preview__ab-note">
        <strong>A/B Test Recommendation:</strong> I recommend running Variations A and C as an A/B test. They use contrasting hooks which will help identify what resonates with your audience.
      </div>
      <div class="creative-preview__actions">
        <button class="ad-gen__btn ad-gen__btn--primary">Push to Facebook Ads Manager</button>
        <button class="ad-gen__btn ad-gen__btn--secondary">Download All</button>
        <button class="ad-gen__btn ad-gen__btn--ghost">Regenerate</button>
      </div>
    </div>`;
  }

  // --- 9. Video Diagnostic: Thinking State ---
  function buildVideoDiagnosticThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Let me analyze your campaign data and pull some insights on this...</p>
    </div>
    <div class="chat-response-card">
      <div class="video-diagnostic__thinking">
        <div class="video-diagnostic__thinking-icon uni-pulse-ring">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="video-diagnostic__thinking-text">Analyzing campaign performance history...</span>
        <div class="video-diagnostic__steps">
          <div class="video-diagnostic__step">
            <div class="video-diagnostic__step-dot"></div>
            <span>Reviewing 60-day performance data</span>
          </div>
          <div class="video-diagnostic__step">
            <div class="video-diagnostic__step-dot"></div>
            <span>Identifying decline patterns</span>
          </div>
          <div class="video-diagnostic__step">
            <div class="video-diagnostic__step-dot"></div>
            <span>Preparing diagnostic guide</span>
          </div>
        </div>
        <div class="video-diagnostic__progress"><div class="video-diagnostic__progress-fill"></div></div>
      </div>
    </div>`;
  }

  // --- 9. Video Diagnostic: Video Response ---
  function buildVideoDiagnosticResponse() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>This is a really common pattern — campaigns that perform well initially and then plateau or decline. I've put together a diagnostic guide that walks you through exactly how to troubleshoot this. Watch below:</p>
    </div>
    <div class="video-diagnostic__wrap">
      <video class="video-diagnostic__player" playsinline>
        <source src="Ad%20Performance%20Diagnostic%20Guide.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div class="video-diagnostic__volume">
        <button class="video-diagnostic__volume-btn" aria-label="Mute">
          <svg class="video-diagnostic__vol-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg class="video-diagnostic__mute-icon hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <input class="video-diagnostic__volume-slider" type="range" min="0" max="1" step="0.05" value="1" aria-label="Volume"/>
      </div>
    </div>`;
  }

  // ===========================================================
  // BUSINESS COMPONENT BUILDERS
  // ===========================================================

  const CHECK_SVG = '<svg class="connect-seq__check" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 7l3 3 6-6.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  // --- Component 1: PM Hub — Connecting State ---
  function buildPmHubConnecting() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Let me pull your projects and tasks from all platforms.</p>
    </div>
    <div class="chat-response-card">
      <div class="connect-seq">
        <div class="connect-seq__item">
          <div class="connect-seq__platform" style="background:#FF3D57">M</div>
          <span>Connecting to Monday.com...</span>
          ${CHECK_SVG}
        </div>
        <div class="connect-seq__item">
          <div class="connect-seq__platform" style="background:#7B68EE">C</div>
          <span>Connecting to ClickUp...</span>
          ${CHECK_SVG}
        </div>
        <div class="connect-seq__item">
          <div class="connect-seq__platform" style="background:#F06A6A">A</div>
          <span>Connecting to Asana...</span>
          ${CHECK_SVG}
        </div>
      </div>
      <div class="connect-seq__synced">
        <div class="connect-seq__synced-logos">
          <div class="connect-seq__synced-logo" style="background:#FF3D57">M</div>
          <div class="connect-seq__synced-logo" style="background:#7B68EE">C</div>
          <div class="connect-seq__synced-logo" style="background:#F06A6A">A</div>
        </div>
        <span>3 platforms synced</span>
        <span class="connect-seq__synced-text">Last synced: just now</span>
      </div>
    </div>`;
  }

  // --- Component 1: PM Hub — Dashboard ---
  function buildPmHubDashboard() {
    const projects = [
      { name: 'Henderson Consulting Onboarding', source: 'monday', sourceName: 'Monday', assignee: 'Jamie L.', due: 'Mar 21', status: 'on-track', statusLabel: 'On Track' },
      { name: 'Q1 Website Redesign', source: 'clickup', sourceName: 'ClickUp', assignee: 'Marcus T.', due: 'Mar 15', status: 'at-risk', statusLabel: 'At Risk' },
      { name: 'Monthly Retainer \u2014 Apex Properties', source: 'asana', sourceName: 'Asana', assignee: 'Sarah K.', due: 'Mar 19', status: 'overdue', statusLabel: 'Overdue' },
      { name: 'Tax Prep Document Collection', source: 'monday', sourceName: 'Monday', assignee: 'Chris M.', due: 'Mar 28', status: 'on-track', statusLabel: 'On Track' },
      { name: 'New Client Proposal \u2014 Meridian Group', source: 'clickup', sourceName: 'ClickUp', assignee: 'Marcus T.', due: 'Mar 14', status: 'overdue', statusLabel: 'Overdue' },
    ];

    const team = [
      { name: 'Marcus T.', tasks: 12, level: 'overloaded' },
      { name: 'Jamie L.', tasks: 8, level: 'heavy' },
      { name: 'Alex R.', tasks: 7, level: 'normal' },
      { name: 'Sarah K.', tasks: 6, level: 'normal' },
      { name: 'David W.', tasks: 5, level: 'normal' },
      { name: 'Chris M.', tasks: 4, level: 'light' },
      { name: 'Lisa C.', tasks: 3, level: 'light' },
      { name: 'Tom H.', tasks: 2, level: 'light' },
    ];

    const maxTasks = Math.max(...team.map(t => t.tasks));

    const projectsHtml = projects.map(p => `
      <div class="pm-hub__project">
        <span class="pm-hub__project-name">${p.name}</span>
        <div class="pm-hub__project-meta">
          <span class="source-pill source-pill--${p.source}">${p.sourceName}</span>
          <span class="pm-hub__project-assignee">${p.assignee}</span>
          <span class="pm-hub__project-due">${p.due}</span>
          <span class="status-pill status-pill--${p.status}">${p.statusLabel}</span>
        </div>
      </div>
    `).join('');

    const workloadHtml = team.map(t => `
      <div class="pm-hub__workload-row">
        <span class="pm-hub__workload-name">${t.name}</span>
        <div class="pm-hub__workload-bar">
          <div class="pm-hub__workload-bar-fill pm-hub__workload-bar-fill--${t.level}" style="width:${Math.round((t.tasks / maxTasks) * 100)}%"></div>
        </div>
        <span class="pm-hub__workload-count">${t.tasks}</span>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>All three platforms synced. Here\u2019s your unified project overview:</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Cross-Platform Summary</div>
          <div class="chat-response-card__subtitle">Monday \u00B7 ClickUp \u00B7 Asana</div>
        </div>
        <div class="connect-seq__synced-logos">
          <div class="connect-seq__synced-logo" style="background:#FF3D57">M</div>
          <div class="connect-seq__synced-logo" style="background:#7B68EE">C</div>
          <div class="connect-seq__synced-logo" style="background:#F06A6A">A</div>
        </div>
      </div>
      <div class="pm-hub__stats">
        <div class="pm-hub__stat">
          <span class="pm-hub__stat-number">14</span>
          <span class="pm-hub__stat-label">Active Projects</span>
        </div>
        <div class="pm-hub__stat">
          <span class="pm-hub__stat-number">23</span>
          <span class="pm-hub__stat-label">Due This Week</span>
        </div>
        <div class="pm-hub__stat">
          <span class="pm-hub__stat-number pm-hub__stat-number--warning">5</span>
          <span class="pm-hub__stat-label">Overdue</span>
        </div>
        <div class="pm-hub__stat">
          <span class="pm-hub__stat-number">8</span>
          <span class="pm-hub__stat-label">Team Active</span>
        </div>
      </div>
      <div class="pm-hub__projects">
        <div class="pm-hub__projects-title">Highest Priority Items</div>
        ${projectsHtml}
      </div>
      <div class="pm-hub__workload">
        <div class="pm-hub__workload-title">Team Workload</div>
        <div class="pm-hub__workload-rows">${workloadHtml}</div>
      </div>
      <div class="ai-insight">
        You have <strong>5 overdue items</strong> across Monday and Asana, 3 of which are assigned to <strong>Marcus T.</strong> It looks like he may be overloaded this week with 12 active tasks. I would suggest reassigning the Asana tasks for the Henderson project to <strong>Lisa C.</strong>, who currently has capacity. Also, the <strong>Q1 Website Redesign</strong> in ClickUp has not had any activity in 9 days and may need attention.
      </div>
    </div>`;
  }

  // --- Component 2: Financial — Connecting State ---
  function buildFinConnecting() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Let me pull your latest financial data.</p>
    </div>
    <div class="chat-response-card">
      <div class="connect-seq">
        <div class="connect-seq__item">
          <div class="connect-seq__platform" style="background:#2CA01C">Q</div>
          <span>Connecting to QuickBooks...</span>
          ${CHECK_SVG}
        </div>
        <div class="connect-seq__item">
          <div class="connect-seq__platform" style="background:#2CA01C">Q</div>
          <span>Syncing transactions from the last 30 days...</span>
          ${CHECK_SVG}
        </div>
        <div class="connect-seq__item">
          <div class="connect-seq__platform" style="background:#2CA01C">Q</div>
          <span>Processing 247 transactions...</span>
          ${CHECK_SVG}
        </div>
      </div>
    </div>`;
  }

  // --- Component 2: Financial — Dashboard ---
  function buildFinDashboard() {
    const chartData = [
      { month: 'Oct', rev: 142, exp: 108 },
      { month: 'Nov', rev: 156, exp: 118 },
      { month: 'Dec', rev: 148, exp: 124 },
      { month: 'Jan', rev: 165, exp: 128 },
      { month: 'Feb', rev: 172, exp: 132 },
      { month: 'Mar', rev: 187, exp: 143 },
    ];
    const maxVal = 200;

    const chartBarsHtml = chartData.map(d => `
      <div class="fin__chart-col">
        <div class="fin__chart-bar-group">
          <div class="fin__chart-bar fin__chart-bar--revenue" style="height:${Math.round((d.rev / maxVal) * 70)}px"></div>
          <div class="fin__chart-bar fin__chart-bar--expense" style="height:${Math.round((d.exp / maxVal) * 70)}px"></div>
        </div>
        <span class="fin__chart-month">${d.month}</span>
      </div>
    `).join('');

    const transactions = [
      { date: 'Mar 14', desc: 'Stripe Payout \u2014 March Revenue', amount: '+$52,400', type: 'Revenue', positive: true },
      { date: 'Mar 12', desc: 'Payroll \u2014 Biweekly', amount: '-$38,200', type: 'Payroll', positive: false },
      { date: 'Mar 10', desc: 'AWS Monthly \u2014 Infrastructure', amount: '-$4,850', type: 'Operations', positive: false },
      { date: 'Mar 8', desc: 'Office Lease \u2014 Q1', amount: '-$12,600', type: 'Facilities', positive: false },
      { date: 'Mar 5', desc: 'Contractor Payment \u2014 Design Team', amount: '-$8,400', type: 'Contractors', positive: false },
    ];

    const transactionsHtml = transactions.map(t => `
      <div class="fin__transaction">
        <div class="fin__transaction-left">
          <span class="fin__transaction-desc">${t.desc}</span>
          <div class="fin__transaction-meta">
            <span>${t.date}</span>
            <span>\u00B7</span>
            <span>${t.type}</span>
          </div>
        </div>
        <span class="fin__transaction-amount ${t.positive ? 'fin__transaction-amount--positive' : 'fin__transaction-amount--negative'}">${t.amount}</span>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here\u2019s your financial overview. 247 transactions synced from QuickBooks.</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Financial Overview</div>
          <div class="chat-response-card__subtitle">Month to Date \u00B7 March 2026</div>
        </div>
        <div class="fin__live-badge">
          <div class="fin__live-dot"></div>
          Live
        </div>
      </div>
      <div class="fin__stats">
        <div class="fin__stat-card">
          <span class="fin__stat-value">$187.4K</span>
          <span class="fin__stat-label">Revenue</span>
          <span class="fin__stat-trend fin__stat-trend--up">
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 8l4-4 4 4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            12%
          </span>
        </div>
        <div class="fin__stat-card">
          <span class="fin__stat-value">$142.8K</span>
          <span class="fin__stat-label">Expenses</span>
          <span class="fin__stat-trend fin__stat-trend--down">
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 4l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            18%
          </span>
        </div>
        <div class="fin__stat-card">
          <span class="fin__stat-value">$44.6K</span>
          <span class="fin__stat-label">Net Profit</span>
          <span class="fin__stat-trend fin__stat-trend--down">
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 4l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            8%
          </span>
        </div>
        <div class="fin__stat-card">
          <span class="fin__stat-value">$284.5K</span>
          <span class="fin__stat-label">Cash on Hand</span>
        </div>
      </div>
      <div class="fin__chart">
        <div class="fin__chart-title">Revenue vs Expenses (6 months)</div>
        <div class="fin__chart-bars">${chartBarsHtml}</div>
        <div class="fin__chart-legend">
          <div class="fin__chart-legend-item"><div class="fin__chart-legend-dot fin__chart-legend-dot--revenue"></div><span class="fin__chart-legend-label">Revenue</span></div>
          <div class="fin__chart-legend-item"><div class="fin__chart-legend-dot fin__chart-legend-dot--expense"></div><span class="fin__chart-legend-label">Expenses</span></div>
        </div>
      </div>
      <div class="fin__ar">
        <div class="fin__ar-title">Accounts Receivable Aging</div>
        <div class="fin__ar-rows">
          <div class="fin__ar-row">
            <span class="fin__ar-label">Current</span>
            <span class="fin__ar-value">$42,300</span>
          </div>
          <div class="fin__ar-row">
            <span class="fin__ar-label">1\u201330 days</span>
            <span class="fin__ar-value">$28,700</span>
          </div>
          <div class="fin__ar-row">
            <span class="fin__ar-label">31\u201360 days</span>
            <span class="fin__ar-value">$18,400</span>
          </div>
          <div class="fin__ar-row">
            <span class="fin__ar-label">60+ days</span>
            <span class="fin__ar-value fin__ar-value--warning">$14,200</span>
          </div>
          <div class="fin__ar-row fin__ar-row--total">
            <span class="fin__ar-label">Total Outstanding</span>
            <span class="fin__ar-value">$103,600</span>
          </div>
        </div>
      </div>
      <div class="fin__transactions">
        <div class="fin__transactions-title">Recent Large Transactions</div>
        ${transactionsHtml}
      </div>
      <div class="ai-insight">
        Your revenue is up <strong>12% month-over-month</strong>, but expenses grew <strong>18%</strong> driven primarily by the new contractor costs. You have <strong>$14,200 in receivables over 60 days past due</strong>, mostly from Apex Properties ($8,400) and Meridian Group ($5,800). I would recommend sending follow-up invoices today. Your current cash runway at this burn rate is approximately <strong>4.2 months</strong>.
      </div>
    </div>`;
  }

  // --- Component 3: Unified Data — Thinking State ---
  function buildUnifiedThinkingState() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Great question. Let me cross-reference your data sources.</p>
    </div>
    <div class="chat-response-card">
      <div class="unified__thinking">
        <div class="unified__thinking-header">Analyzing your question...</div>
        <div class="unified__thinking-item">
          <svg class="unified__thinking-check" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 7l3 3 6-6.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Querying QuickBooks for revenue by client...
        </div>
        <div class="unified__thinking-item">
          <svg class="unified__thinking-check" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 7l3 3 6-6.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Querying Monday.com for project hours...
        </div>
        <div class="unified__thinking-item">
          <svg class="unified__thinking-check" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 7l3 3 6-6.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Querying ClickUp for deliverable status...
        </div>
        <div class="unified__thinking-item">
          <svg class="unified__thinking-check" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 7l3 3 6-6.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Cross-referencing data...
        </div>
      </div>
    </div>`;
  }

  // --- Component 3: Unified Data — Result ---
  function buildUnifiedDataResult() {
    const clients = [
      { name: 'Henderson Consulting', revenue: '$48,000', hours: '180 hrs', rate: '$267/hr', margin: '62%', status: 'on-track', statusLabel: 'Healthy' },
      { name: 'Apex Properties', revenue: '$25,200', hours: '95 hrs', rate: '$265/hr', margin: '58%', status: 'at-risk', statusLabel: 'At Risk' },
      { name: 'Meridian Group', revenue: '$32,400', hours: '140 hrs', rate: '$231/hr', margin: '48%', status: 'at-risk', statusLabel: 'At Risk' },
      { name: 'Pinnacle Tech', revenue: '$18,600', hours: '60 hrs', rate: '$310/hr', margin: '68%', status: 'on-track', statusLabel: 'Healthy' },
      { name: 'Cornerstone Legal', revenue: '$15,800', hours: '72 hrs', rate: '$219/hr', margin: '42%', status: 'on-track', statusLabel: 'Healthy' },
    ];

    const tableRowsHtml = clients.map(c => `
      <div class="unified__table-row">
        <span class="unified__table-cell unified__table-cell--client">${c.name}</span>
        <span class="unified__table-cell">${c.revenue}</span>
        <span class="unified__table-cell unified__table-cell--muted">${c.hours}</span>
        <span class="unified__table-cell ${c.name === 'Pinnacle Tech' ? 'unified__table-cell--highlight' : ''}">${c.rate}</span>
        <span class="unified__table-cell"><span class="status-pill status-pill--${c.status}">${c.statusLabel}</span></span>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>I\u2019ve combined data from QuickBooks, Monday.com, and ClickUp to answer your question. Here\u2019s what I found:</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Client Profitability \u2014 Q1 2026</div>
          <div class="chat-response-card__subtitle">Revenue + hours cross-referenced</div>
        </div>
      </div>
      <div class="unified__table">
        <div class="unified__table-title">Client Profitability Breakdown</div>
        <div class="unified__table-header">
          <span>Client</span>
          <span>Q1 Revenue</span>
          <span>Hours</span>
          <span>Eff. Rate</span>
          <span>Status</span>
        </div>
        ${tableRowsHtml}
      </div>
      <div class="unified__churn">
        <div class="unified__churn-title">Churn Risk Flags</div>
        <div class="unified__churn-flag">
          <div class="unified__churn-dot"></div>
          <div class="unified__churn-content">
            <span class="unified__churn-client">Apex Properties</span>
            <span class="unified__churn-detail">3 support tickets unresolved for 14+ days (ClickUp) and last invoice 47 days past due (QuickBooks). Combined signals indicate elevated churn risk.</span>
            <div class="unified__churn-sources">
              <span class="source-pill source-pill--clickup">ClickUp</span>
              <span class="source-pill source-pill--quickbooks">QuickBooks</span>
            </div>
          </div>
        </div>
        <div class="unified__churn-flag">
          <div class="unified__churn-dot"></div>
          <div class="unified__churn-content">
            <span class="unified__churn-client">Meridian Group</span>
            <span class="unified__churn-detail">Project scope reduced by 40% last month (Monday) and they requested a contract review (email). Revenue trending down quarter-over-quarter.</span>
            <div class="unified__churn-sources">
              <span class="source-pill source-pill--monday">Monday</span>
              <span class="source-pill source-pill--gmail">Gmail</span>
            </div>
          </div>
        </div>
      </div>
      <div class="unified__recommendation">
        <strong>Henderson Consulting</strong> is your highest-margin client at <strong>$267/hr</strong> effective rate. <strong>Apex Properties</strong> shows two churn signals and represents <strong>$8,400/mo</strong> in recurring revenue. I would prioritize a check-in call with them this week. I can draft the agenda and create the follow-up tasks if you want.
      </div>
      <div class="unified__actions">
        <button class="biz-btn biz-btn--primary">Schedule Check-in with Apex</button>
        <button class="biz-btn biz-btn--secondary">Draft Client Report</button>
        <button class="biz-btn biz-btn--ghost">Show Full Profitability Report</button>
      </div>
    </div>`;
  }

  // --- Component 4: Accountability Watchdog ---
  function buildWatchdogAlert() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>I\u2019ve been monitoring your accounts and projects. Here are some things that need your attention:</p>
    </div>
    <div class="watchdog-card">
      <div class="watchdog__header">
        <div class="watchdog__header-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="watchdog__header-text">
          <span class="watchdog__header-title">I noticed a few things</span>
          <span class="watchdog__header-time">Flagged 2 hours ago \u00B7 4 items</span>
        </div>
      </div>
      <div class="watchdog__alerts">
        <div class="watchdog__alert">
          <div class="watchdog__severity-dot watchdog__severity-dot--urgent"></div>
          <div class="watchdog__alert-content">
            <span class="watchdog__alert-text">The proposal for <strong>Meridian Group</strong> was sent 7 days ago with no response. The typical close window for proposals this size is 5 business days. This is at risk of going cold.</span>
            <div class="watchdog__alert-sources">
              <span class="source-pill source-pill--gmail">Gmail</span>
              <span class="source-pill source-pill--monday">Monday</span>
            </div>
            <button class="watchdog__alert-action">Send Follow-up Email</button>
          </div>
        </div>
        <div class="watchdog__alert">
          <div class="watchdog__severity-dot watchdog__severity-dot--urgent"></div>
          <div class="watchdog__alert-content">
            <span class="watchdog__alert-text">There is a <strong>duplicate charge of $2,340</strong> from your payment processor on March 12th and March 13th. This looks unintentional based on your transaction history.</span>
            <div class="watchdog__alert-sources">
              <span class="source-pill source-pill--quickbooks">QuickBooks</span>
            </div>
            <button class="watchdog__alert-action">Review Transaction</button>
          </div>
        </div>
        <div class="watchdog__alert">
          <div class="watchdog__severity-dot watchdog__severity-dot--warning"></div>
          <div class="watchdog__alert-content">
            <span class="watchdog__alert-text">The <strong>Henderson Consulting</strong> deliverables are due Friday, but 3 of 7 tasks are still in progress and the assigned team member has been out sick for 2 days. At the current pace, this will likely miss the deadline.</span>
            <div class="watchdog__alert-sources">
              <span class="source-pill source-pill--asana">Asana</span>
              <span class="source-pill source-pill--clickup">ClickUp</span>
            </div>
            <button class="watchdog__alert-action">Reassign Tasks</button>
          </div>
        </div>
        <div class="watchdog__alert">
          <div class="watchdog__severity-dot watchdog__severity-dot--info"></div>
          <div class="watchdog__alert-content">
            <span class="watchdog__alert-text">Your <strong>quarterly estimated tax payment</strong> is due in 12 days. Based on your current revenue, the estimated amount is <strong>$18,400</strong>. Last quarter you were late by 3 days and incurred a $220 penalty.</span>
            <div class="watchdog__alert-sources">
              <span class="source-pill source-pill--quickbooks">QuickBooks</span>
              <span class="source-pill source-pill--calendar">Calendar</span>
            </div>
            <button class="watchdog__alert-action">Schedule Payment</button>
          </div>
        </div>
      </div>
      <div class="watchdog__footer">
        <span class="watchdog__footer-text"><strong>4 items</strong> need your attention. <strong>2 are urgent.</strong></span>
        <div class="watchdog__footer-actions">
          <button class="biz-btn biz-btn--ghost biz-btn--sm">Dismiss All</button>
          <button class="biz-btn biz-btn--secondary biz-btn--sm">Add to Today\u2019s Tasks</button>
        </div>
      </div>
    </div>`;
  }

  // ===========================================================
  // MINDSET COACH COMPONENT BUILDERS
  // ===========================================================

  // --- Alex: Personality Profile Thinking State ---
  function buildPersonalityThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Let me pull up your personality profile and coaching insights.</p>
    </div>
    <div class="chat-response-card">
      <div class="mindset__thinking">
        <div class="mindset__thinking-icon uni-pulse-ring">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="mindset__thinking-text">Loading your personality profile...</span>
        <div class="mindset__thinking-steps">
          <div class="mindset__thinking-step">${CHECK_SVG} DISC assessment results</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Enneagram profile</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Attachment style analysis</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Generating coaching insights...</div>
        </div>
        <div class="mindset__progress"><div class="mindset__progress-fill"></div></div>
      </div>
    </div>`;
  }

  // --- Alex: Component 1 — Personality Insights Dashboard ---
  function buildPersonalityDashboard() {
    const traits = [
      { name: 'Openness', value: 82, color: '#106844' },
      { name: 'Conscientiousness', value: 58, color: '#106844' },
      { name: 'Extraversion', value: 45, color: '#106844' },
      { name: 'Agreeableness', value: 74, color: '#106844' },
      { name: 'Emotional Stability', value: 38, color: '#f59e0b' },
    ];

    const traitsHtml = traits.map(t => `
      <div class="personality__trait">
        <div class="personality__trait-header">
          <span class="personality__trait-name">${t.name}</span>
          <span class="personality__trait-value">${t.value}%</span>
        </div>
        <div class="personality__trait-bar">
          <div class="personality__trait-bar-fill" style="width:${t.value}%;background:${t.color}"></div>
        </div>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's your complete personality profile. I've integrated your DISC results, Enneagram type, and attachment style to build a holistic coaching picture.</p>
    </div>
    <div class="chat-response-card" id="personalityCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Personality Insights</div>
          <div class="chat-response-card__subtitle">Based on 3 assessments \u00B7 Updated Feb 18</div>
        </div>
        <div class="toggle-pill" data-toggle="personality-view">
          <button class="toggle-pill__btn toggle-pill__btn--active" data-value="overview">Overview</button>
          <button class="toggle-pill__btn" data-value="traits">Traits</button>
        </div>
      </div>

      <!-- Overview panel -->
      <div data-panel="overview">
        <div class="personality__types">
          <div class="personality__type-card">
            <span class="personality__type-label">DISC Type</span>
            <span class="personality__type-badge personality__type-badge--disc">Si</span>
            <span class="personality__type-name">Steadiness-Influence</span>
            <span class="personality__type-desc">Supportive, patient, collaborative. Prefers harmony and resists abrupt change.</span>
          </div>
          <div class="personality__type-card">
            <span class="personality__type-label">Enneagram</span>
            <span class="personality__type-badge personality__type-badge--enneagram">4w5</span>
            <span class="personality__type-name">The Individualist</span>
            <span class="personality__type-desc">Deep self-awareness, emotionally intense, drawn to authenticity and meaning.</span>
          </div>
          <div class="personality__type-card">
            <span class="personality__type-label">Attachment</span>
            <span class="personality__type-badge personality__type-badge--attachment">AP</span>
            <span class="personality__type-name">Anxious-Preoccupied</span>
            <span class="personality__type-desc">Seeks closeness and reassurance. Can overanalyze relational dynamics.</span>
          </div>
        </div>
        <div class="personality__coaching">
          <div class="personality__coaching-title">Coaching Implications</div>
          <div class="personality__coaching-items">
            <div class="personality__coaching-item">
              <div class="personality__coaching-icon personality__coaching-icon--strength">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0l-4.725 2.885a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <div>
                <span class="personality__coaching-label">Key Strength</span>
                <span class="personality__coaching-text">Your deep self-awareness and empathy allow you to form genuine connections. Use this to build your support network.</span>
              </div>
            </div>
            <div class="personality__coaching-item">
              <div class="personality__coaching-icon personality__coaching-icon--growth">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 12V4m0 0l-3 3m3-3l3 3" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <div>
                <span class="personality__coaching-label">Growth Edge</span>
                <span class="personality__coaching-text">Your emotional stability score suggests you may be carrying stress internally. We should prioritize emotional regulation techniques.</span>
              </div>
            </div>
            <div class="personality__coaching-item">
              <div class="personality__coaching-icon personality__coaching-icon--approach">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <div>
                <span class="personality__coaching-label">Coaching Approach</span>
                <span class="personality__coaching-text">Avoid surface-level advice. You respond best to deeper exploration. I\u2019ll push you to confront avoidance patterns while respecting your pace.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Traits panel -->
      <div data-panel="traits" class="hidden">
        <div class="personality__traits-section">
          <div class="personality__traits-title">Big Five Personality Traits</div>
          ${traitsHtml}
        </div>
        <div class="personality__traits-note">
          <strong>Note:</strong> Your Emotional Stability score (38%) has improved from 24% since we started working together 8 weeks ago. This is significant progress \u2014 keep building on the grounding exercises we\u2019ve been practicing.
        </div>
      </div>
    </div>`;
  }

  // --- Alex: Session History Thinking State ---
  function buildSessionThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Let me review your coaching journey.</p>
    </div>
    <div class="chat-response-card">
      <div class="mindset__thinking">
        <div class="mindset__thinking-icon uni-pulse-ring">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke-linecap="round"/>
          </svg>
        </div>
        <span class="mindset__thinking-text">Reviewing your coaching journey...</span>
        <div class="mindset__thinking-steps">
          <div class="mindset__thinking-step">${CHECK_SVG} Loading session notes</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Mapping emotional trends</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Identifying breakthroughs...</div>
        </div>
        <div class="mindset__progress"><div class="mindset__progress-fill"></div></div>
      </div>
    </div>`;
  }

  // --- Alex: Component 2 — Client Journey & Session History ---
  function buildSessionHistory() {
    // Emotional trend data (last 8 sessions)
    const emotionData = [
      { session: 'S1', score: 3, label: 'Dec 14' },
      { session: 'S2', score: 3.5, label: 'Dec 21' },
      { session: 'S3', score: 4, label: 'Jan 4' },
      { session: 'S4', score: 3, label: 'Jan 11' },
      { session: 'S5', score: 5, label: 'Jan 25' },
      { session: 'S6', score: 5.5, label: 'Feb 1' },
      { session: 'S7', score: 6, label: 'Feb 8' },
      { session: 'S8', score: 7, label: 'Feb 15' },
    ];

    const maxScore = 10;
    const chartHeight = 80;
    const points = emotionData.map((d, i) => {
      const x = Math.round((i / (emotionData.length - 1)) * 280) + 10;
      const y = Math.round(chartHeight - (d.score / maxScore) * chartHeight) + 5;
      return { x, y, ...d };
    });
    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    const dotsHtml = points.map(p => `<circle cx="${p.x}" cy="${p.y}" r="3.5" fill="#106844" stroke="white" stroke-width="1.5"/>`).join('');

    const sessions = [
      { date: 'Feb 15', title: 'Breakthrough: Boundary Setting', mood: 'Empowered', moodClass: 'positive', summary: 'Successfully set boundaries with a difficult family member for the first time. Practiced assertive communication techniques.', breakthrough: true },
      { date: 'Feb 8', title: 'Exploring Avoidance Patterns', mood: 'Reflective', moodClass: 'neutral', summary: 'Identified pattern of avoiding conflict by people-pleasing. Connected this to childhood attachment patterns.', breakthrough: false },
      { date: 'Feb 1', title: 'Stress Response Work', mood: 'Challenged', moodClass: 'neutral', summary: 'Worked through a triggering event at work. Practiced grounding techniques and reframing catastrophic thinking.', breakthrough: false },
      { date: 'Jan 25', title: 'Breakthrough: Core Belief Shift', mood: 'Hopeful', moodClass: 'positive', summary: 'Challenged the core belief "I\'m not enough." Replaced with evidence-based affirmation. Significant emotional release.', breakthrough: true },
      { date: 'Jan 11', title: 'Setback Processing', mood: 'Struggling', moodClass: 'negative', summary: 'Difficult week \u2014 old patterns resurfaced after a stressful event. Normalized regression as part of growth.', breakthrough: false },
    ];

    const sessionsHtml = sessions.map(s => `
      <div class="session__timeline-item">
        <div class="session__timeline-dot ${s.breakthrough ? 'session__timeline-dot--breakthrough' : ''}"></div>
        <div class="session__timeline-content">
          <div class="session__timeline-header">
            <span class="session__timeline-date">${s.date}</span>
            <span class="session__mood-pill session__mood-pill--${s.moodClass}">${s.mood}</span>
          </div>
          <span class="session__timeline-title">${s.title}</span>
          <span class="session__timeline-summary">${s.summary}</span>
        </div>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's your coaching journey so far. You've made some really significant progress \u2014 let me walk you through it.</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Your Coaching Journey</div>
          <div class="chat-response-card__subtitle">8 sessions \u00B7 Since Dec 14</div>
        </div>
      </div>
      <div class="session__stats">
        <div class="session__stat">
          <span class="session__stat-number">8</span>
          <span class="session__stat-label">Sessions</span>
        </div>
        <div class="session__stat">
          <span class="session__stat-number">10</span>
          <span class="session__stat-label">Weeks Active</span>
        </div>
        <div class="session__stat">
          <span class="session__stat-number session__stat-number--highlight">2</span>
          <span class="session__stat-label">Breakthroughs</span>
        </div>
        <div class="session__stat">
          <span class="session__stat-number">+14%</span>
          <span class="session__stat-label">Emotional Stability</span>
        </div>
      </div>
      <div class="session__chart">
        <div class="session__chart-title">Emotional Trend</div>
        <div class="session__chart-labels">
          <span>Thriving</span>
          <span>Surviving</span>
        </div>
        <svg class="session__chart-svg" viewBox="0 0 300 ${chartHeight + 10}">
          <path d="${linePath}" fill="none" stroke="#106844" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="${linePath} L${points[points.length-1].x},${chartHeight + 5} L${points[0].x},${chartHeight + 5} Z" fill="url(#emotionGrad)" opacity="0.15"/>
          <defs>
            <linearGradient id="emotionGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#106844"/>
              <stop offset="100%" stop-color="#106844" stop-opacity="0"/>
            </linearGradient>
          </defs>
          ${dotsHtml}
        </svg>
        <div class="session__chart-x-labels">
          ${emotionData.map(d => `<span>${d.label}</span>`).join('')}
        </div>
      </div>
      <div class="session__timeline">
        <div class="session__timeline-title">Session History</div>
        ${sessionsHtml}
      </div>
      <div class="ai-insight">
        Your emotional trend is clearly <strong>upward</strong>. The dip in Session 4 (Jan 11) was a normal regression after a stressful event, but you recovered faster than expected. Your <strong>2 breakthroughs</strong> in boundary-setting and core belief work are foundational changes that will compound over time. I recommend we focus next on <strong>conflict resolution skills</strong> to build on the boundary work.
      </div>
    </div>`;
  }

  // --- Alex: Conversation Guide Thinking State ---
  function buildConversationThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Let me help you prepare for this conversation. Give me a moment to pull your context.</p>
    </div>
    <div class="chat-response-card">
      <div class="mindset__thinking">
        <div class="mindset__thinking-icon uni-pulse-ring">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m3.75 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332c1.972-.049 3.918-.217 5.831-.497 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="mindset__thinking-text">Preparing your conversation guide...</span>
        <div class="mindset__thinking-steps">
          <div class="mindset__thinking-step">${CHECK_SVG} Reviewing your relationship context</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Analyzing communication patterns</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Building reframe strategies...</div>
        </div>
        <div class="mindset__progress"><div class="mindset__progress-fill"></div></div>
      </div>
    </div>`;
  }

  // --- Alex: Component 3 — Deep Conversation Guide ---
  function buildConversationGuide() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>I know this isn\u2019t easy. Based on your attachment style and the patterns we\u2019ve discussed, here\u2019s a framework to help you navigate this conversation with confidence.</p>
    </div>
    <div class="chat-response-card" id="conversationGuideCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Difficult Conversation Guide</div>
          <div class="chat-response-card__subtitle">Personalized for your communication style</div>
        </div>
      </div>
      <div class="convo__context">
        <div class="convo__context-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 00.708.852h.058a.75.75 0 00.354-.149l.041-.02M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="convo__context-text">
          Based on your <strong>anxious-preoccupied attachment</strong> style, you tend to over-explain and seek immediate reassurance during conflict. This guide will help you stay grounded and direct.
        </div>
      </div>
      <div class="convo__phases" id="convoPhases">
        <div class="convo__phase convo__phase--active" data-phase="0">
          <div class="convo__phase-header">
            <span class="convo__phase-num">1</span>
            <div>
              <span class="convo__phase-title">Open with Vulnerability</span>
              <span class="convo__phase-subtitle">Set the tone without blame</span>
            </div>
          </div>
          <div class="convo__phase-body">
            <div class="convo__script">
              <span class="convo__script-label">Try saying:</span>
              <span class="convo__script-text">\u201CI\u2019ve been thinking about something that\u2019s been weighing on me, and I care about us enough to bring it up rather than let it build.\u201D</span>
            </div>
            <div class="convo__reframe">
              <span class="convo__reframe-label">If you feel the urge to over-explain:</span>
              <span class="convo__reframe-text">Pause. Take a breath. You don\u2019t need to justify your feelings. State them simply and let the silence work.</span>
            </div>
          </div>
        </div>
        <div class="convo__phase" data-phase="1">
          <div class="convo__phase-header">
            <span class="convo__phase-num">2</span>
            <div>
              <span class="convo__phase-title">Name the Pattern</span>
              <span class="convo__phase-subtitle">Be specific about what you\u2019ve observed</span>
            </div>
          </div>
          <div class="convo__phase-body">
            <div class="convo__script">
              <span class="convo__script-label">Try saying:</span>
              <span class="convo__script-text">\u201CI\u2019ve noticed that when [specific situation], I feel [emotion]. I\u2019m not saying you\u2019re doing it intentionally \u2014 I\u2019m sharing how it lands for me.\u201D</span>
            </div>
            <div class="convo__reframe">
              <span class="convo__reframe-label">If they get defensive:</span>
              <span class="convo__reframe-text">Don\u2019t retreat. Say: \u201CI\u2019m not attacking you. I\u2019m trying to make this better for both of us. Can you help me understand your side?\u201D</span>
            </div>
          </div>
        </div>
        <div class="convo__phase" data-phase="2">
          <div class="convo__phase-header">
            <span class="convo__phase-num">3</span>
            <div>
              <span class="convo__phase-title">Hold Your Ground</span>
              <span class="convo__phase-subtitle">Stay present, don\u2019t abandon your needs</span>
            </div>
          </div>
          <div class="convo__phase-body">
            <div class="convo__script">
              <span class="convo__script-label">Try saying:</span>
              <span class="convo__script-text">\u201CWhat I need going forward is [specific request]. I know change takes time, and I\u2019m committed to working on this together.\u201D</span>
            </div>
            <div class="convo__reframe">
              <span class="convo__reframe-label">If you feel the pull to people-please:</span>
              <span class="convo__reframe-text">Remember: saying what you need isn\u2019t selfish. It\u2019s the foundation of a healthy relationship. Your Session 5 breakthrough proved you can do this.</span>
            </div>
          </div>
        </div>
      </div>
      <div class="convo__checkin">
        <div class="convo__checkin-title">Pre-Conversation Check-In</div>
        <div class="convo__checkin-items">
          <label class="convo__checkin-item"><input type="checkbox" class="convo__checkin-box"/><span>I\u2019ve identified the specific outcome I want</span></label>
          <label class="convo__checkin-item"><input type="checkbox" class="convo__checkin-box"/><span>I\u2019m approaching this from curiosity, not blame</span></label>
          <label class="convo__checkin-item"><input type="checkbox" class="convo__checkin-box"/><span>I\u2019m prepared for discomfort without abandoning my needs</span></label>
          <label class="convo__checkin-item"><input type="checkbox" class="convo__checkin-box"/><span>I have a grounding technique ready (box breathing)</span></label>
        </div>
      </div>
      <div class="ai-insight">
        This conversation will activate your anxious attachment patterns. That\u2019s expected. The goal isn\u2019t to feel comfortable \u2014 it\u2019s to stay <strong>present and honest</strong> even when discomfort shows up. You\u2019ve already proven you can set boundaries (Feb 15 breakthrough). This is the next level of that same muscle.
      </div>
    </div>`;
  }

  // --- Alex: Burnout Assessment Thinking State ---
  function buildBurnoutThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>I hear you. Let me assess where you are and build a recovery plan.</p>
    </div>
    <div class="chat-response-card">
      <div class="mindset__thinking">
        <div class="mindset__thinking-icon uni-pulse-ring">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="mindset__thinking-text">Assessing your burnout level...</span>
        <div class="mindset__thinking-steps">
          <div class="mindset__thinking-step">${CHECK_SVG} Reviewing recent session notes</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Analyzing emotional patterns</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Building personalized recovery plan...</div>
        </div>
        <div class="mindset__progress"><div class="mindset__progress-fill"></div></div>
      </div>
    </div>`;
  }

  // --- Alex: Component 4 — Burnout Recovery Plan ---
  function buildBurnoutRecovery() {
    const energyData = [
      { day: 'Mon', level: 3 },
      { day: 'Tue', level: 2 },
      { day: 'Wed', level: 2 },
      { day: 'Thu', level: 4 },
      { day: 'Fri', level: 1 },
      { day: 'Sat', level: 3 },
      { day: 'Sun', level: 2 },
    ];
    const maxLevel = 10;

    const energyBarsHtml = energyData.map(d => {
      const h = Math.round((d.level / maxLevel) * 48);
      const cls = d.level <= 2 ? 'burnout__energy-bar--low' : d.level <= 4 ? 'burnout__energy-bar--mid' : 'burnout__energy-bar--high';
      return `<div class="burnout__energy-col">
        <div class="burnout__energy-bar ${cls}" style="height:${h}px"></div>
        <span class="burnout__energy-day">${d.day}</span>
      </div>`;
    }).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Burnout isn\u2019t a character flaw \u2014 it\u2019s a signal that something needs to change. Based on everything I know about you, here\u2019s what I see and what I recommend.</p>
    </div>
    <div class="chat-response-card" id="burnoutCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Burnout Assessment & Recovery</div>
          <div class="chat-response-card__subtitle">Personalized recovery protocol</div>
        </div>
      </div>
      <div class="burnout__assessment">
        <div class="burnout__score-section">
          <div class="burnout__score-ring">
            <svg viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(26,26,26,0.06)" stroke-width="6"/>
              <circle cx="40" cy="40" r="34" fill="none" stroke="#f59e0b" stroke-width="6"
                stroke-dasharray="${2 * Math.PI * 34}"
                stroke-dashoffset="${2 * Math.PI * 34 * (1 - 0.72)}"
                transform="rotate(-90 40 40)"
                stroke-linecap="round"/>
            </svg>
            <div class="burnout__score-center">
              <span class="burnout__score-value">7.2</span>
              <span class="burnout__score-max">/10</span>
            </div>
          </div>
          <div class="burnout__score-detail">
            <span class="burnout__score-label">Burnout Severity</span>
            <span class="burnout__score-desc">Moderate-High. You\u2019re running on reserves, not sustainable energy.</span>
          </div>
        </div>
        <div class="burnout__dimensions">
          <div class="burnout__dimension">
            <span class="burnout__dimension-name">Emotional Exhaustion</span>
            <div class="burnout__dimension-bar"><div class="burnout__dimension-fill burnout__dimension-fill--high" style="width:85%"></div></div>
            <span class="burnout__dimension-value">High</span>
          </div>
          <div class="burnout__dimension">
            <span class="burnout__dimension-name">Depersonalization</span>
            <div class="burnout__dimension-bar"><div class="burnout__dimension-fill burnout__dimension-fill--mid" style="width:55%"></div></div>
            <span class="burnout__dimension-value">Moderate</span>
          </div>
          <div class="burnout__dimension">
            <span class="burnout__dimension-name">Sense of Accomplishment</span>
            <div class="burnout__dimension-bar"><div class="burnout__dimension-fill burnout__dimension-fill--low" style="width:30%"></div></div>
            <span class="burnout__dimension-value">Low</span>
          </div>
        </div>
      </div>
      <div class="burnout__energy">
        <div class="burnout__energy-title">Your Energy This Week</div>
        <div class="burnout__energy-chart">${energyBarsHtml}</div>
        <div class="burnout__energy-avg">Average: <strong>2.4/10</strong> \u2014 significantly below your baseline of 5.8</div>
      </div>
      <div class="burnout__recovery">
        <div class="burnout__recovery-title">Recovery Protocol</div>
        <div class="burnout__phases">
          <div class="burnout__phase">
            <div class="burnout__phase-header">
              <span class="burnout__phase-num">Phase 1</span>
              <span class="burnout__phase-label">Immediate \u2014 This Week</span>
            </div>
            <div class="burnout__phase-items">
              <div class="burnout__phase-item">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="5.5"/></svg>
                <span>Cancel or delegate 2 non-essential commitments</span>
              </div>
              <div class="burnout__phase-item">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="5.5"/></svg>
                <span>Implement a hard stop at 6pm \u2014 no work after</span>
              </div>
              <div class="burnout__phase-item">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="5.5"/></svg>
                <span>10 min morning grounding (box breathing + journaling)</span>
              </div>
            </div>
          </div>
          <div class="burnout__phase">
            <div class="burnout__phase-header">
              <span class="burnout__phase-num">Phase 2</span>
              <span class="burnout__phase-label">Short-term \u2014 Next 2 Weeks</span>
            </div>
            <div class="burnout__phase-items">
              <div class="burnout__phase-item">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="5.5"/></svg>
                <span>Audit your \u201Cyes\u201D list \u2014 identify obligations driven by guilt, not values</span>
              </div>
              <div class="burnout__phase-item">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="5.5"/></svg>
                <span>Reintroduce one activity that\u2019s purely for enjoyment</span>
              </div>
              <div class="burnout__phase-item">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="5.5"/></svg>
                <span>Practice saying \u201Cnot right now\u201D without apologizing</span>
              </div>
            </div>
          </div>
          <div class="burnout__phase">
            <div class="burnout__phase-header">
              <span class="burnout__phase-num">Phase 3</span>
              <span class="burnout__phase-label">Structural \u2014 Next 30 Days</span>
            </div>
            <div class="burnout__phase-items">
              <div class="burnout__phase-item">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="5.5"/></svg>
                <span>Redesign your weekly schedule around energy, not just tasks</span>
              </div>
              <div class="burnout__phase-item">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="5.5"/></svg>
                <span>Address the root causes: what boundaries are you not setting?</span>
              </div>
              <div class="burnout__phase-item">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="5.5"/></svg>
                <span>Rebuild your identity beyond productivity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ai-insight">
        I want to be direct with you: your burnout isn\u2019t just about being \u201Ctoo busy.\u201D Based on your personality profile (Enneagram 4w5, anxious attachment), you tend to absorb others\u2019 emotional weight while neglecting your own needs. The people-pleasing pattern we identified in Session 3 is <strong>directly fueling this burnout</strong>. Recovery starts with the boundary work we\u2019ve been building toward. You\u2019re closer than you think.
      </div>
    </div>`;
  }

  // ===========================================================
  // MIKE AI — COPYWRITING COMPONENTS
  // ===========================================================

  // --- Mike: Webinar Script Thinking State ---
  function buildWebinarThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Building your complete webinar script from scratch. Give me a moment...</p>
    </div>
    <div class="chat-response-card">
      <div class="mike__thinking mike__thinking--long">
        <div class="mike__thinking-icon uni-pulse-ring">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="mike__thinking-text">Building your 1-hour webinar script...</span>
        <div class="mike__thinking-steps">
          <div class="mike__thinking-step">${CHECK_SVG} Analyzing your offer...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Selecting proven framework...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Writing opening hook...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Building content sections...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Crafting offer stack and close...</div>
        </div>
        <div class="mike__progress"><div class="mike__progress-fill mike__progress-fill--long"></div></div>
      </div>
    </div>`;
  }

  // --- Mike: Component 1 — Webinar Script Generator ---
  function buildWebinarScript() {
    const sections = [
      {
        num: 1,
        title: 'Opening Hook & Pattern Interrupt',
        time: '0:00\u20133:00',
        direction: 'Open with a bold, counterintuitive claim that breaks the audience\u2019s existing beliefs. Start with energy \u2014 you have 30 seconds to earn the next 57 minutes.',
        keyLine: '\u201CWhat if everything you\u2019ve been told about [topic] is not just wrong \u2014 but is actually the reason you\u2019re stuck? In the next 60 minutes, I\u2019m going to show you a completely different approach that\u2019s generated over $305 million in revenue.\u201D',
        transition: 'Transition into credibility by connecting the bold claim to your personal story.',
        extra: ''
      },
      {
        num: 2,
        title: 'Origin Story & Credibility',
        time: '3:00\u201310:00',
        direction: 'Tell your \u201Cwound to wisdom\u201D story. You were once where they are. Show the struggle, the turning point, and the transformation. This builds rapport and positions you as the guide, not the guru.',
        keyLine: '\u201CI was $47,000 in debt, working 80-hour weeks, and my best marketing campaign had a 0.4x return. I was ready to quit. Then I discovered something that changed everything \u2014 and I\u2019ve never looked back.\u201D',
        transition: 'Bridge to Secret #1 by saying: \u201CThe first thing I learned was that everyone was focused on the wrong thing entirely...\u201D',
        extra: ''
      },
      {
        num: 3,
        title: 'Secret #1: The Framework',
        time: '10:00\u201322:00',
        direction: 'Introduce your core framework or methodology. Teach the \u201Cwhat\u201D and the \u201Cwhy\u201D, but not the step-by-step \u201Chow.\u201D Give enough value that they think \u201CThis is incredible\u201D but realize they need help implementing.',
        keyLine: '\u201CMost people try to scale by doing more. The Framework flips this: you do less, but you do the right things in the right order. There are 3 pillars, and if any one is missing, the whole system breaks.\u201D',
        transition: 'Transition with a false close: \u201CNow, if that was all I shared today, it would be worth the price of admission. But the second secret is what really unlocks the whole thing...\u201D',
        extra: ''
      },
      {
        num: 4,
        title: 'Secret #2: Internal Belief Shift',
        time: '22:00\u201334:00',
        direction: 'Address the internal belief holding them back (e.g., \u201CI\u2019m not techy enough,\u201D \u201CI don\u2019t have enough experience\u201D). Use a case study of someone who had the same belief and broke through.',
        keyLine: '\u201CSarah came to us convinced she was \u2018too late\u2019 to the market. She was 54, had no audience, and no technical skills. Eight weeks later, she launched to $127,000 in revenue. What changed wasn\u2019t her skills \u2014 it was her belief about what was possible.\u201D',
        transition: 'Bridge to Secret #3: \u201CBut there\u2019s one more obstacle \u2014 and this one isn\u2019t inside your head. It\u2019s the external system working against you...\u201D',
        extra: ''
      },
      {
        num: 5,
        title: 'Secret #3: External Belief Shift',
        time: '34:00\u201344:00',
        direction: 'Address the external excuse (\u201CThe market is saturated,\u201D \u201CAds are too expensive,\u201D \u201CThis won\u2019t work in my niche\u201D). Reframe with data and examples. Destroy the last objection before the offer.',
        keyLine: '\u201CThe market isn\u2019t saturated \u2014 it\u2019s unsophisticated. 94% of your competitors are running the same tired playbook from 2019. When you show up with a framework built on $305M in proven data, you\u2019re not competing. You\u2019re in a category of one.\u201D',
        transition: 'Transition to the offer: \u201CSo here\u2019s the question: do you want to keep going alone, or do you want the complete system?\u201D',
        extra: ''
      },
      {
        num: 6,
        title: 'The Offer Stack',
        time: '44:00\u201352:00',
        direction: 'Present the offer as a stack of value. Anchor each component with its standalone price, then reveal the actual price at the end. Build the value gap.',
        keyLine: '\u201CWhen you add it all up, the total value of everything you\u2019re getting today is $8,485. But you\u2019re not paying anywhere near that.\u201D',
        transition: 'Move into the close by restating the transformation, not the features.',
        extra: `<div class="webinar__offer-stack">
          <div class="webinar__offer-row"><span class="webinar__offer-item">Complete Framework Implementation System</span><span class="webinar__offer-price">$2,997</span></div>
          <div class="webinar__offer-row"><span class="webinar__offer-item">90-Day Action Plan & Templates</span><span class="webinar__offer-price">$997</span></div>
          <div class="webinar__offer-row"><span class="webinar__offer-item">Private Community Access (1 Year)</span><span class="webinar__offer-price">$1,497</span></div>
          <div class="webinar__offer-row"><span class="webinar__offer-item">Weekly Live Q&A Calls</span><span class="webinar__offer-price">$1,997</span></div>
          <div class="webinar__offer-row"><span class="webinar__offer-item">Bonus: Swipe File Library (500+ Templates)</span><span class="webinar__offer-price">$997</span></div>
          <div class="webinar__offer-total"><span>Total Value</span><span>$8,485</span></div>
          <div class="webinar__offer-actual"><span>Your Price Today</span><span>$997</span></div>
        </div>`
      },
      {
        num: 7,
        title: 'Close, Urgency & Objection Handling',
        time: '52:00\u201360:00',
        direction: 'Close with urgency (limited bonuses, price increase, scarcity). Then pre-handle the top 3 objections before they arise. End with a final emotional appeal.',
        keyLine: '\u201CYou have two choices right now. You can close this tab and go back to what you\u2019ve been doing \u2014 and you\u2019ll get the same results you\u2019ve always gotten. Or you can take action today and have the complete system in your hands within the next 5 minutes.\u201D',
        transition: 'Final CTA: \u201CClick the button below to get started now.\u201D',
        extra: `<div class="webinar__objections">
          <div class="webinar__objection">
            <div class="webinar__objection-q">\u201CI can\u2019t afford it right now.\u201D</div>
            <div class="webinar__objection-a">Can you afford another 6 months of the same results? This pays for itself with a single implementation. Plus, we offer a flexible payment plan \u2014 2 payments of $547.</div>
          </div>
          <div class="webinar__objection">
            <div class="webinar__objection-q">\u201CWhat if it doesn\u2019t work for me?\u201D</div>
            <div class="webinar__objection-a">That\u2019s exactly why we include a 90-day results guarantee. Follow the system, do the work, and if you don\u2019t see results, we\u2019ll refund every penny. Zero risk.</div>
          </div>
          <div class="webinar__objection">
            <div class="webinar__objection-q">\u201CI need to think about it.\u201D</div>
            <div class="webinar__objection-a">I respect that. But ask yourself \u2014 what new information will you have tomorrow that you don\u2019t have right now? The bonuses disappear when this webinar ends. The best time to start is today.</div>
          </div>
        </div>`
      }
    ];

    const fullScriptHtml = `<div class="webinar__full-script">
      <div class="webinar__full-note">~8,200 words \u00B7 Showing first 2 sections</div>
      <div class="webinar__full-section">
        <p class="webinar__full-para">What if everything you\u2019ve been told about growing your business online is not just wrong \u2014 but is actually the reason you\u2019re stuck?</p>
        <p class="webinar__full-para">I know that\u2019s a bold statement. But in the next 60 minutes, I\u2019m going to show you a completely different approach \u2014 one that\u2019s been responsible for generating over $305 million in revenue across 47 different niches. And by the end of this presentation, you\u2019re going to have the complete framework to implement it yourself.</p>
        <p class="webinar__full-para">Before we dive in, let me be clear about what this is NOT. This is not another \u201Cjust run Facebook ads\u201D strategy. This is not about hustling 18 hours a day. And this is definitely not about building a complicated funnel that takes 3 months to set up. What I\u2019m about to share is simpler, faster, and more proven than anything you\u2019ve tried before.</p>
        <p class="webinar__full-para">Let me take you back to 2019. I was sitting in a cramped apartment at 2 AM, staring at my Ads Manager, watching my daily spend tick past $400 with exactly zero sales to show for it.</p>
        <p class="webinar__full-para">My credit cards were maxed. I was $47,000 in debt. I had read every marketing book, taken every course, followed every guru. And nothing was working.</p>
        <p class="webinar__full-para">I was ready to quit. I told my partner that night that I was going back to a 9-to-5. That this whole \u201Conline business thing\u201D just wasn\u2019t for people like me.</p>
        <p class="webinar__full-para">But the next morning, something happened that changed the entire trajectory of my life. I got an email from a mentor I\u2019d been following. And in that email was a single question that made everything click.</p>
        <p class="webinar__full-para">\u201CWhat if the problem isn\u2019t your offer, your ads, or your funnel \u2014 what if the problem is the ORDER you\u2019re doing them in?\u201D</p>
        <p class="webinar__full-para">That one question led me to develop what I now call The Framework. And it\u2019s the same system that\u2019s now generated over $305 million \u2014 not just for me, but for 2,100+ students across 47 niches.</p>
        <p class="webinar__full-para">Now, the first thing I learned \u2014 and the thing that nobody was telling me \u2014 was that everyone was focused on the wrong thing entirely. They were obsessing over tactics. The latest ad hack. The newest funnel template. The algorithm change. But none of that matters if you don\u2019t get the foundation right.</p>
        <p class="webinar__full-para">Most people try to scale by doing more. More ads, more content, more launches. The Framework flips this completely. You do less, but you do the right things in the right order. There are 3 pillars, and if any one of them is missing, the whole system breaks.</p>
        <p class="webinar__full-para">Think of it like building a house. You wouldn\u2019t start with the roof, right? But that\u2019s exactly what most entrepreneurs do. They start with ads and funnels \u2014 the roof \u2014 without ever pouring the foundation. And then they wonder why everything keeps collapsing.</p>
      </div>
      <p class="webinar__full-continue">Script continues for remaining sections...</p>
    </div>`;

    const outlineSectionsHtml = sections.map((s, i) => `
      <div class="webinar__section${i === 0 ? ' webinar__section--active' : ''}" data-section="${i}">
        <div class="webinar__section-header">
          <span class="webinar__section-num">${s.num}</span>
          <div>
            <span class="webinar__section-title">${s.title}</span>
            <span class="webinar__section-time">${s.time}</span>
          </div>
        </div>
        <div class="webinar__section-body">
          <p class="webinar__section-direction">${s.direction}</p>
          <div class="webinar__key-line">${s.keyLine}</div>
          ${s.extra}
          <p class="webinar__section-transition"><strong>Transition:</strong> ${s.transition}</p>
        </div>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Your complete 1-hour webinar script is ready. I\u2019ve used the Perfect Webinar framework \u2014 the same structure behind hundreds of millions in webinar sales. Here\u2019s everything you need to deliver a high-converting presentation.</p>
    </div>
    <div class="chat-response-card" id="webinarCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">1-Hour Webinar Script</div>
          <div class="chat-response-card__subtitle">7 sections \u00B7 ~8,200 words \u00B7 Perfect Webinar Framework</div>
        </div>
        <div class="toggle-pill" data-toggle="webinar-view">
          <button class="toggle-pill__btn toggle-pill__btn--active" data-value="outline">Outline</button>
          <button class="toggle-pill__btn" data-value="full">Full Script</button>
        </div>
      </div>
      <div data-panel="outline">
        <div class="webinar__sections" id="webinarSections">
          ${outlineSectionsHtml}
        </div>
      </div>
      <div data-panel="full" class="hidden">
        ${fullScriptHtml}
      </div>
      <div class="webinar__framework-note">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 00.708.852h.058a.75.75 0 00.354-.149l.041-.02M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span>Built on the <strong>Perfect Webinar</strong> framework \u2014 the proven structure behind $305M+ in webinar revenue.</span>
      </div>
      <div class="ad-gen__actions">
        <button class="ad-gen__btn ad-gen__btn--primary">Copy Full Script</button>
        <button class="ad-gen__btn ad-gen__btn--secondary">Export to Google Docs</button>
        <button class="ad-gen__btn ad-gen__btn--ghost">Customize Framework</button>
        <button class="ad-gen__btn ad-gen__btn--ghost">Generate Slide Deck Outline</button>
      </div>
    </div>`;
  }

  // --- Mike: Funnel Builder Thinking State ---
  function buildFunnelThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Building your funnel in ClickFunnels and setting up your ad campaigns in Facebook Ads...</p>
    </div>
    <div class="chat-response-card">
      <div class="mike__thinking mike__thinking--long">
        <div class="mike__thinking-icon uni-pulse-ring">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="mike__thinking-text">Connecting to ClickFunnels & Facebook Ads...</span>
        <div class="mike__thinking-steps">
          <div class="mike__thinking-step">${CHECK_SVG} Connected to ClickFunnels workspace...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Writing sales page copy...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Building offer stack and guarantee...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Publishing funnel to ClickFunnels...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Creating ad campaigns in Facebook Ads...</div>
        </div>
        <div class="mike__progress"><div class="mike__progress-fill mike__progress-fill--long"></div></div>
      </div>
    </div>`;
  }

  // --- Mike: Component 2 — Funnel Copy + Ad Campaign Builder ---
  function buildFunnelBuilder() {
    const adVariations = [
      { name: 'Ad 1', angle: 'Pain Point', angleClass: 'pain', primary: 'I wasted 2 years and $43,000 trying to figure this out on my own. Every course, every guru, every "proven system" left me more confused than before. Then I found a completely different approach \u2014 and everything changed in 90 days.', headline: 'Stop Wasting Money on Strategies That Don\u2019t Work', cta: 'See the Framework', placements: ['Feed', 'Stories'], roas: '2.4\u20133.1x' },
      { name: 'Ad 2', angle: 'Curiosity', angleClass: 'curiosity', primary: 'There\u2019s a reason 94% of online businesses fail in year one. And it has nothing to do with their product, their audience, or their budget. It\u2019s something much simpler \u2014 and almost nobody talks about it.', headline: 'The One Mistake Killing 94% of Online Businesses', cta: 'Learn What It Is', placements: ['Feed', 'In-Stream'], roas: '2.1\u20132.7x' },
      { name: 'Ad 3', angle: 'Social Proof', angleClass: 'proof', primary: '2,100+ students. 47 niches. $305M in combined revenue. Here\u2019s what they all have in common \u2014 they stopped following the old playbook and started using The Framework.', headline: 'Join 2,100+ Students Who\u2019ve Transformed Their Results', cta: 'Get the Case Studies', placements: ['Feed', 'Reels'], roas: '2.6\u20133.4x' },
      { name: 'Ad 4', angle: 'FOMO', angleClass: 'fomo', primary: 'We\u2019re opening 50 spots for our next implementation cohort. The last group sold out in 36 hours. If you\u2019ve been waiting for the right time \u2014 this is it.', headline: 'Only 50 Spots Available \u2014 Last Cohort Sold Out in 36 Hours', cta: 'Claim Your Spot', placements: ['Feed', 'Stories'], roas: '1.9\u20132.5x' },
      { name: 'Ad 5', angle: 'Authority', angleClass: 'authority', primary: 'After generating $305M+ in proven results across 47 industries, I\u2019ve distilled everything into one system. This isn\u2019t theory \u2014 it\u2019s a battle-tested framework backed by real data from real campaigns.', headline: '$305M+ in Results. One Framework.', cta: 'Access the System', placements: ['Feed', 'In-Stream'], roas: '2.2\u20132.8x' },
      { name: 'Ad 6', angle: 'Direct Benefit', angleClass: 'benefit', primary: 'What would it mean for your business to have a complete sales system that works on autopilot? No more guessing. No more wasted ad spend. Just a proven framework that converts cold traffic into paying customers.', headline: 'Build a Sales System That Works While You Sleep', cta: 'Start Building', placements: ['Feed', 'Stories', 'Reels'], roas: '2.3\u20133.0x' },
    ];

    const adCardsHtml = adVariations.map(ad => `
      <div class="funnel__ad-card">
        <div class="funnel__ad-header">
          <span class="funnel__ad-name">${ad.name}</span>
          <span class="funnel__angle-pill funnel__angle-pill--${ad.angleClass}">${ad.angle}</span>
        </div>
        <div class="ad-gen__copy">
          <div class="ad-gen__copy-field">
            <span class="ad-gen__copy-label">Primary Text</span>
            <span class="ad-gen__copy-value ad-gen__copy-value--body">${ad.primary}</span>
          </div>
          <div class="ad-gen__copy-field">
            <span class="ad-gen__copy-label">Headline</span>
            <span class="ad-gen__copy-value">${ad.headline}</span>
          </div>
          <div class="ad-gen__copy-field">
            <span class="ad-gen__copy-label">CTA</span>
            <span class="ad-gen__copy-value">${ad.cta}</span>
          </div>
        </div>
        <div class="funnel__ad-meta">
          <div class="ad-gen__formats">
            ${ad.placements.map(p => `<span class="ad-gen__format-pill">${p}</span>`).join('')}
          </div>
          <span class="funnel__roas-pill">Predicted ROAS: ${ad.roas}</span>
        </div>
      </div>
    `).join('');

    const faqItems = [
      { q: 'How quickly will I see results?', a: 'Most students see their first results within 14\u201321 days of implementation. Full system optimization typically happens within 60\u201390 days. The framework is designed for speed \u2014 we\u2019ve eliminated everything that doesn\u2019t directly drive revenue.' },
      { q: 'Does this work for my niche?', a: 'The Framework has been proven across 47 different niches \u2014 from fitness to SaaS, from coaching to e-commerce. The principles are universal because they\u2019re based on human psychology, not platform tricks.' },
      { q: 'What if I\u2019m not tech-savvy?', a: 'You don\u2019t need to be. Everything comes with step-by-step video walkthroughs, done-for-you templates, and our support team is available 7 days a week. If you can send an email, you can implement this system.' },
      { q: 'Is there a guarantee?', a: 'Absolutely. You\u2019re covered by our 90-Day Results Guarantee. Follow the implementation plan, put in the work, and if you don\u2019t see measurable results, we\u2019ll refund every penny. No questions, no hassle.' },
    ];

    const faqHtml = faqItems.map((item, i) => `
      <div class="funnel__faq-item${i === 0 ? ' funnel__faq-item--active' : ''}" data-faq="${i}">
        <div class="funnel__faq-q">${item.q}</div>
        <div class="funnel__faq-a">${item.a}</div>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Done. I\u2019ve built your sales funnel in ClickFunnels and created 6 ad variations in Facebook Ads. Here\u2019s everything that\u2019s live:</p>
    </div>
    <div class="chat-response-card" id="funnelCard">
      <div class="funnel__platform-header">
        <div class="funnel__platform-icon funnel__platform-icon--cf">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 8.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div>
          <div class="funnel__platform-name">Sales Funnel <span class="funnel__platform-badge">Built in ClickFunnels</span></div>
          <div class="funnel__platform-status">${CHECK_SVG} Published \u00B7 6 page sections \u00B7 Live at yoursite.com/framework</div>
        </div>
      </div>
      <div class="funnel__page-content">
        <div class="funnel__section">
          <span class="ad-gen__copy-label">Headline</span>
          <div class="funnel__headline">The Proven Framework That\u2019s Generated $305M+ in Revenue \u2014 Now Available to You</div>
        </div>
        <div class="funnel__section">
          <span class="ad-gen__copy-label">Sub-headline</span>
          <div class="funnel__subheadline">Discover the exact system 2,100+ entrepreneurs are using to build profitable businesses in 90 days or less \u2014 without burning cash on ads that don\u2019t convert.</div>
        </div>
        <div class="funnel__section">
          <span class="ad-gen__copy-label">Lead / Opening</span>
          <p class="funnel__body-text">If you\u2019re tired of throwing money at marketing strategies that promise the world and deliver nothing, you\u2019re not alone. The average entrepreneur wastes $12,000 on courses, tools, and ads before finding something that actually works.</p>
          <p class="funnel__body-text">But what if there was a way to skip the expensive trial-and-error? A proven, data-backed framework that\u2019s already generated over $305 million in real revenue across 47 different niches?</p>
          <p class="funnel__body-text">That\u2019s exactly what you\u2019re about to discover.</p>
        </div>
        <div class="funnel__section">
          <span class="ad-gen__copy-label">The Problem</span>
          <div class="funnel__pain-points">
            <div class="funnel__pain-point"><span class="funnel__pain-x">\u2717</span> Spending hundreds per day on ads with nothing to show for it</div>
            <div class="funnel__pain-point"><span class="funnel__pain-x">\u2717</span> Buying course after course that teaches theory, not results</div>
            <div class="funnel__pain-point"><span class="funnel__pain-x">\u2717</span> Watching competitors grow while you\u2019re stuck at the same level</div>
            <div class="funnel__pain-point"><span class="funnel__pain-x">\u2717</span> Working 60+ hour weeks with no predictable revenue system</div>
            <div class="funnel__pain-point"><span class="funnel__pain-x">\u2717</span> Feeling overwhelmed by conflicting advice from every \u201Cexpert\u201D</div>
          </div>
        </div>
        <div class="funnel__section">
          <span class="ad-gen__copy-label">Offer Stack</span>
          <div class="webinar__offer-stack">
            <div class="webinar__offer-row"><span class="webinar__offer-item">Complete Framework Implementation System</span><span class="webinar__offer-price">$4,997</span></div>
            <div class="webinar__offer-row"><span class="webinar__offer-item">90-Day Action Plan & Templates</span><span class="webinar__offer-price">$1,997</span></div>
            <div class="webinar__offer-row"><span class="webinar__offer-item">Private Community (1 Year)</span><span class="webinar__offer-price">$2,497</span></div>
            <div class="webinar__offer-row"><span class="webinar__offer-item">Weekly Live Implementation Calls</span><span class="webinar__offer-price">$2,997</span></div>
            <div class="webinar__offer-row"><span class="webinar__offer-item">Bonus: 500+ Swipe File Library</span><span class="webinar__offer-price">$997</span></div>
            <div class="webinar__offer-row"><span class="webinar__offer-item">Bonus: Private 1-on-1 Strategy Call</span><span class="webinar__offer-price">$997</span></div>
            <div class="webinar__offer-total"><span>Total Value</span><span>$14,485</span></div>
            <div class="webinar__offer-actual"><span>Your Price Today</span><span>$1,997</span></div>
          </div>
        </div>
        <div class="funnel__section">
          <span class="ad-gen__copy-label">Guarantee</span>
          <div class="funnel__guarantee">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12.75l2.25 2.25L15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <div>
              <strong>90-Day Results or Full Refund</strong>
              <span>Follow the implementation plan and put in the work. If you don\u2019t see measurable results within 90 days, email us and we\u2019ll refund every penny. No questions asked.</span>
            </div>
          </div>
        </div>
        <div class="funnel__section">
          <span class="ad-gen__copy-label">FAQ</span>
          <div class="funnel__faq" id="funnelFaq">
            ${faqHtml}
          </div>
        </div>
      </div>
      <div class="funnel__platform-header funnel__platform-header--fb">
        <div class="funnel__platform-icon funnel__platform-icon--fb">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div>
          <div class="funnel__platform-name">Ad Campaign <span class="funnel__platform-badge">Created in Facebook Ads</span></div>
          <div class="funnel__platform-status">${CHECK_SVG} 6 variations \u00B7 Multi-angle \u00B7 Ready to launch</div>
        </div>
      </div>
      <div class="funnel__ads-grid">
        ${adCardsHtml}
      </div>
      <div class="ai-insight">
        This campaign uses the <strong>Problem-Agitate-Solve</strong> framework across 6 angles. The offer stack has a <strong>7.25x value-to-price ratio</strong> \u2014 well above the 5x minimum for high-converting funnels. I recommend testing <strong>Ads 1 and 3</strong> first (Pain Point and Social Proof consistently outperform other angles in cold traffic).
      </div>
      <div class="ad-gen__actions">
        <button class="ad-gen__btn ad-gen__btn--primary">Open in ClickFunnels</button>
        <button class="ad-gen__btn ad-gen__btn--secondary">Launch Ad Campaign</button>
        <button class="ad-gen__btn ad-gen__btn--ghost">Edit Copy</button>
        <button class="ad-gen__btn ad-gen__btn--ghost">Generate More Variations</button>
      </div>
    </div>`;
  }

  // --- Mike: Email Thinking State ---
  function buildEmailThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Creating your high-converting email welcome sequence...</p>
    </div>
    <div class="chat-response-card">
      <div class="mike__thinking">
        <div class="mike__thinking-icon uni-pulse-ring">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m21.75 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m21.75 0v.243a2.25 2.25 0 01-1.071 1.916l-7.5 4.615a2.25 2.25 0 01-2.358 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="mike__thinking-text">Writing your 5-email welcome sequence...</span>
        <div class="mike__thinking-steps">
          <div class="mike__thinking-step">${CHECK_SVG} Mapping subscriber journey...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Writing Email 1: Welcome & Hook...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Writing Email 2: Story & Value...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Writing Emails 3\u20135: Nurture to Offer...</div>
        </div>
        <div class="mike__progress"><div class="mike__progress-fill"></div></div>
      </div>
    </div>`;
  }

  // --- Mike: Component 3 — Email Welcome Sequence ---
  function buildEmailSequence() {
    const emails = [
      {
        num: 1,
        title: 'The Welcome Email',
        day: 'Day 0',
        subject: 'You\u2019re in \u2014 here\u2019s what happens next',
        preview: 'Plus the one thing 94% of people get wrong...',
        openRate: '65\u201375%',
        body: `<p>Subject: <strong>You\u2019re in \u2014 here\u2019s what happens next</strong></p>
<p>Hey [First Name],</p>
<p>Welcome \u2014 you just made one of the smartest decisions you\u2019ll make this year.</p>
<p>Over the next 10 days, I\u2019m going to share the exact framework that\u2019s generated over $305M in revenue. Not theory. Not fluff. The actual system.</p>
<p>But first, I need to warn you about something: <strong>94% of people who download this will never implement it.</strong> Not because it\u2019s hard. But because they\u2019ll try to do everything at once instead of following the sequence.</p>
<p>Don\u2019t be that person.</p>
<p>Tomorrow, I\u2019ll share the origin story behind this framework \u2014 including the $47,000 mistake that led to everything.</p>
<p>Talk soon,<br/>[Name]</p>
<p>P.S. Hit reply and tell me your #1 business challenge right now. I read every response.</p>`
      },
      {
        num: 2,
        title: 'The Origin Story',
        day: 'Day 1',
        subject: 'The $47,000 mistake that changed everything',
        preview: 'I was ready to quit. Then this happened...',
        openRate: '55\u201365%',
        body: `<p>Subject: <strong>The $47,000 mistake that changed everything</strong></p>
<p>Hey [First Name],</p>
<p>In 2019, I was $47,000 in debt. My ads were bleeding money. My \u201Cproven funnel\u201D had a 0.4x return.</p>
<p>I\u2019d tried everything the gurus told me to do. More ad spend. Better targeting. Longer sales pages. Nothing worked.</p>
<p>Then a mentor asked me one question that changed everything:</p>
<p><strong>\u201CWhat if the problem isn\u2019t what you\u2019re doing \u2014 but the ORDER you\u2019re doing it in?\u201D</strong></p>
<p>That single insight led to what I now call The Framework. Within 90 days, I went from losing money to generating $127,000 in a single launch.</p>
<p>The difference wasn\u2019t working harder. It was working in the right sequence.</p>
<p>Tomorrow, I\u2019m going to teach you the first pillar of that sequence \u2014 the one thing that makes everything else work.</p>
<p>[Name]</p>`
      },
      {
        num: 3,
        title: 'The Value Bomb',
        day: 'Day 3',
        subject: 'The #1 framework piece most people skip',
        preview: 'This alone is worth more than most courses...',
        openRate: '45\u201355%',
        body: `<p>Subject: <strong>The #1 framework piece most people skip</strong></p>
<p>Hey [First Name],</p>
<p>Most people start with the product. Or the ads. Or the funnel.</p>
<p>They\u2019re all wrong.</p>
<p><strong>Pillar #1 of The Framework is: Offer Architecture.</strong></p>
<p>Here\u2019s the rule: Your offer needs to be so good that people feel stupid saying no. That means:</p>
<ul>
<li>The value stack must be 7\u201310x the price</li>
<li>Each component must solve a specific objection</li>
<li>The guarantee must remove 100% of the risk</li>
</ul>
<p>When your offer is built correctly, everything downstream gets easier \u2014 your ads convert better, your sales page writes itself, and your close rate doubles.</p>
<p>Here\u2019s a quick exercise: Look at your current offer. Does it pass the 7x test? If someone calculated the real-world value of everything included, would it be 7x what you\u2019re charging?</p>
<p>If not, that\u2019s your #1 priority. Fix the offer, and the rest follows.</p>
<p>[Name]</p>
<p>P.S. On Day 5, I\u2019m sharing a case study that\u2019ll blow your mind. Stay tuned.</p>`
      },
      {
        num: 4,
        title: 'The Social Proof',
        day: 'Day 5',
        subject: 'She went from $0 to $127K in 8 weeks',
        preview: 'And she started with zero audience...',
        openRate: '50\u201360%',
        body: `<p>Subject: <strong>She went from $0 to $127K in 8 weeks</strong></p>
<p>Hey [First Name],</p>
<p>Meet Sarah.</p>
<p>54 years old. No audience. No tech skills. No previous online business experience.</p>
<p>She joined our program convinced she was \u201Ctoo late\u201D to make it work. Her exact words: \u201CEveryone in my niche is 25 and on TikTok. I don\u2019t stand a chance.\u201D</p>
<p><strong>8 weeks later, she launched to $127,000 in revenue.</strong></p>
<p>What changed? She stopped trying to copy what worked for 25-year-olds and started using a framework built on proven principles \u2014 principles that work regardless of age, niche, or platform.</p>
<p>Sarah\u2019s results aren\u2019t unusual. Our average student sees a 340% ROI within 90 days. Some see results in week one.</p>
<p>The difference isn\u2019t talent or luck. It\u2019s having the right system.</p>
<p>In 5 days, I\u2019m going to share how you can get access to the complete Framework \u2014 with everything you need to implement it yourself.</p>
<p>[Name]</p>`
      },
      {
        num: 5,
        title: 'The Offer',
        day: 'Day 10',
        subject: 'Doors are open (but not for long)',
        preview: 'Everything you need to implement The Framework...',
        openRate: '40\u201350%',
        body: `<p>Subject: <strong>Doors are open (but not for long)</strong></p>
<p>Hey [First Name],</p>
<p>For the past 10 days, I\u2019ve shared the story, the framework, and the proof.</p>
<p>Now it\u2019s decision time.</p>
<p><strong>The Framework Implementation Program is officially open for enrollment.</strong></p>
<p>Here\u2019s what you get:</p>
<ul>
<li>The complete Framework system (video + workbooks)</li>
<li>90-Day implementation roadmap</li>
<li>500+ proven swipe files and templates</li>
<li>Private community access</li>
<li>Weekly live Q&A calls</li>
</ul>
<p>Total value: $14,485. Your investment today: <strong>$1,997</strong> (or 2 payments of $1,047).</p>
<p>And you\u2019re covered by our 90-Day Results Guarantee. If you follow the system and don\u2019t see results, you get a full refund. Period.</p>
<p>But here\u2019s the thing \u2014 we\u2019re only opening 50 spots in this cohort. The last one filled in 36 hours.</p>
<p><strong>[ENROLL NOW \u2192]</strong></p>
<p>[Name]</p>
<p>P.S. Everyone who enrolls in the next 24 hours gets a bonus 1-on-1 strategy call with our team ($997 value). This bonus disappears at midnight.</p>`
      }
    ];

    const timelineHtml = emails.map((e, i) => `
      <div class="email-seq__timeline-point${i === 0 ? ' email-seq__timeline-point--active' : ''}">
        <div class="email-seq__timeline-dot"></div>
        <span class="email-seq__timeline-label">${e.day}</span>
      </div>
    `).join('');

    const emailAccordionHtml = emails.map((e, i) => `
      <div class="email-seq__email${i === 0 ? ' email-seq__email--active' : ''}" data-email="${i}">
        <div class="email-seq__email-header">
          <span class="email-seq__email-num">${e.num}</span>
          <div>
            <span class="email-seq__email-title">${e.title}</span>
            <span class="email-seq__email-meta">${e.day} \u00B7 Predicted open rate: ${e.openRate}</span>
          </div>
        </div>
        <div class="email-seq__email-body">
          <div class="email-seq__subject-line">
            <span class="ad-gen__copy-label">Subject Line</span>
            <span class="email-seq__subject-text">${e.subject}</span>
          </div>
          <div class="email-seq__preview-text">
            <span class="ad-gen__copy-label">Preview Text</span>
            <span class="email-seq__preview-value">${e.preview}</span>
          </div>
          <div class="email-seq__email-content">
            ${e.body}
          </div>
        </div>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Your 5-email welcome sequence is ready. I\u2019ve built this using the Story-Value-Proof-Offer framework \u2014 each email has a specific job that moves subscribers closer to buying.</p>
    </div>
    <div class="chat-response-card" id="emailSeqCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Email Welcome Sequence</div>
          <div class="chat-response-card__subtitle">5 emails \u00B7 10-day sequence \u00B7 Story-Value-Proof-Offer</div>
        </div>
      </div>
      <div class="email-seq__timeline">
        ${timelineHtml}
      </div>
      <div class="email-seq__emails" id="emailSeqAccordion">
        ${emailAccordionHtml}
      </div>
      <div class="email-seq__stats">
        <div class="email-seq__stat"><span class="email-seq__stat-value">5</span><span class="email-seq__stat-label">Emails</span></div>
        <div class="email-seq__stat"><span class="email-seq__stat-value">~4,200</span><span class="email-seq__stat-label">Words</span></div>
        <div class="email-seq__stat"><span class="email-seq__stat-value">10-Day</span><span class="email-seq__stat-label">Sequence</span></div>
        <div class="email-seq__stat"><span class="email-seq__stat-value">~45%</span><span class="email-seq__stat-label">Avg Open Rate</span></div>
      </div>
      <div class="ai-insight">
        This sequence follows the <strong>Story-Value-Proof-Offer</strong> framework. Each email has one job: Email 1 hooks them, Email 2 builds connection through story, Email 3 delivers value that creates reciprocity, Email 4 provides social proof that eliminates doubt, and Email 5 makes the offer. Subject line formula: <strong>Specificity + Curiosity Gap</strong> \u2014 every subject line either includes a number or opens a loop.
      </div>
      <div class="ad-gen__actions">
        <button class="ad-gen__btn ad-gen__btn--primary">Copy All Emails</button>
        <button class="ad-gen__btn ad-gen__btn--secondary">Export Sequence</button>
        <button class="ad-gen__btn ad-gen__btn--ghost">Add More Emails</button>
      </div>
    </div>`;
  }

  // --- Mike: Hook Generator Thinking State ---
  function buildHookThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Generating 10 high-performing ad hooks across multiple angles...</p>
    </div>
    <div class="chat-response-card">
      <div class="mike__thinking">
        <div class="mike__thinking-icon uni-pulse-ring">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="mike__thinking-text">Generating 10 ad hook variations...</span>
        <div class="mike__thinking-steps">
          <div class="mike__thinking-step">${CHECK_SVG} Analyzing your offer angle...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Pulling from proven hook database...</div>
          <div class="mike__thinking-step">${CHECK_SVG} Generating 10 variations...</div>
        </div>
        <div class="mike__progress"><div class="mike__progress-fill"></div></div>
      </div>
    </div>`;
  }

  // --- Mike: Component 4 — Ad Hook Generator ---
  function buildHookGenerator() {
    const hooks = [
      { num: '01', angle: 'Pain Point', angleClass: 'pain', text: 'I wasted $43,000 on marketing before I discovered the one thing nobody was telling me.', use: 'Cold traffic \u00B7 Feed ads', performance: 'High CTR \u00B7 Strong stop-scroll' },
      { num: '02', angle: 'Pain Point', angleClass: 'pain', text: 'If your ads stopped working and you don\u2019t know why, it\u2019s probably not what you think.', use: 'Retargeting \u00B7 Feed & Stories', performance: 'High relevance \u00B7 Low CPC' },
      { num: '03', angle: 'Curiosity', angleClass: 'curiosity', text: 'There\u2019s a reason 94% of online businesses fail \u2014 and it has nothing to do with their product.', use: 'Cold traffic \u00B7 Feed ads', performance: 'High CTR \u00B7 Strong curiosity gap' },
      { num: '04', angle: 'Curiosity', angleClass: 'curiosity', text: 'The biggest lie in marketing is that you need a big audience to make big money.', use: 'Cold traffic \u00B7 All placements', performance: 'Broad appeal \u00B7 High share rate' },
      { num: '05', angle: 'Social Proof', angleClass: 'proof', text: '2,100 students. 47 niches. $305M in combined results. Here\u2019s what they all did differently.', use: 'Lookalike audiences \u00B7 Feed', performance: 'Strong trust signal \u00B7 High CVR' },
      { num: '06', angle: 'Social Proof', angleClass: 'proof', text: 'She was 54 with zero audience. 8 weeks later, she launched to $127K. This is the framework she used.', use: 'Cold traffic \u00B7 Reels & Stories', performance: 'High engagement \u00B7 Story-driven' },
      { num: '07', angle: 'Challenge', angleClass: 'challenge', text: 'If you can\u2019t explain your offer in one sentence, you don\u2019t have an offer \u2014 you have a list of features.', use: 'Cold traffic \u00B7 Feed ads', performance: 'Polarizing \u00B7 High comment rate' },
      { num: '08', angle: 'Challenge', angleClass: 'challenge', text: 'You don\u2019t need another course. You need a system that actually tells you what to do on Day 1, Day 2, Day 3.', use: 'Retargeting \u00B7 Feed & In-Stream', performance: 'Objection-killer \u00B7 High CVR' },
      { num: '09', angle: 'Story', angleClass: 'story', text: 'At 2 AM, $47K in debt, I almost quit everything. Then I got an email that changed my life.', use: 'Cold traffic \u00B7 Reels', performance: 'Emotional hook \u00B7 High watch time' },
      { num: '10', angle: 'Story', angleClass: 'story', text: 'My mentor asked me one question. That question turned a failing business into a $305M framework.', use: 'Cold traffic \u00B7 All placements', performance: 'Curiosity + story \u00B7 High CTR' },
    ];

    const hookCardsHtml = hooks.map(h => `
      <div class="hook-gen__card" data-angle="${h.angleClass}">
        <div class="hook-gen__card-top">
          <span class="hook-gen__num">${h.num}</span>
          <span class="funnel__angle-pill funnel__angle-pill--${h.angleClass}">${h.angle}</span>
        </div>
        <div class="hook-gen__text">${h.text}</div>
        <div class="hook-gen__meta">
          <span class="hook-gen__use">${h.use}</span>
          <span class="hook-gen__perf">${h.performance}</span>
        </div>
      </div>
    `).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here are 10 ad hooks across 5 proven angles. Each hook is designed to stop the scroll and drive clicks \u2014 ready to plug into any ad format.</p>
    </div>
    <div class="chat-response-card" id="hookGenCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Ad Hook Library</div>
          <div class="chat-response-card__subtitle">10 hooks \u00B7 5 angles \u00B7 Multiple placements</div>
        </div>
      </div>
      <div class="hook-gen__filters" id="hookFilters">
        <button class="competitor__filter-btn competitor__filter-btn--active" data-hfilter="all">All Hooks <span class="competitor__filter-count">10</span></button>
        <button class="competitor__filter-btn" data-hfilter="pain">Pain Point <span class="competitor__filter-count">2</span></button>
        <button class="competitor__filter-btn" data-hfilter="curiosity">Curiosity <span class="competitor__filter-count">2</span></button>
        <button class="competitor__filter-btn" data-hfilter="proof">Social Proof <span class="competitor__filter-count">2</span></button>
        <button class="competitor__filter-btn" data-hfilter="challenge">Challenge <span class="competitor__filter-count">2</span></button>
        <button class="competitor__filter-btn" data-hfilter="story">Story <span class="competitor__filter-count">2</span></button>
      </div>
      <div class="hook-gen__cards" id="hookCards">
        ${hookCardsHtml}
      </div>
      <div class="hook-gen__strategy">
        <div class="hook-gen__strategy-title">Hook Strategy Analysis</div>
        <div class="hook-gen__strategy-chips">
          <span class="ad-gen__format-pill">Pattern Interrupt</span>
          <span class="ad-gen__format-pill">Specificity</span>
          <span class="ad-gen__format-pill">Curiosity Gap</span>
          <span class="ad-gen__format-pill">Social Proof</span>
          <span class="ad-gen__format-pill">Emotional Trigger</span>
        </div>
        <p class="hook-gen__strategy-text">These hooks use 5 proven psychological triggers. The most effective hooks combine <strong>specificity</strong> (exact numbers and results) with <strong>curiosity gaps</strong> (open loops that demand resolution). Test Pain Point hooks for direct response and Story hooks for brand awareness.</p>
      </div>
      <div class="ad-gen__actions">
        <button class="ad-gen__btn ad-gen__btn--primary">Copy All Hooks</button>
        <button class="ad-gen__btn ad-gen__btn--secondary">Generate 10 More</button>
        <button class="ad-gen__btn ad-gen__btn--ghost" id="hookToFunnel">Turn Hooks into Full Ads</button>
      </div>
    </div>`;
  }

  // ===========================================================
  // COACH FLEX (TRAINER) COMPONENT BUILDERS
  // ===========================================================

  // --- Trainer: Meal Plan with Macro Targets ---
  function buildTrainerMealPlan() {
    const meals = [
      { time: 'Breakfast', emoji: '\uD83C\uDF73', name: 'Egg White Omelette + Oats', cal: 420, protein: 35, carbs: 45, fat: 10 },
      { time: 'Lunch', emoji: '\uD83C\uDF57', name: 'Grilled Chicken Bowl + Brown Rice', cal: 580, protein: 48, carbs: 55, fat: 14 },
      { time: 'Dinner', emoji: '\uD83E\uDD69', name: 'Salmon Fillet + Sweet Potato + Broccoli', cal: 620, protein: 42, carbs: 48, fat: 22 },
      { time: 'Snacks', emoji: '\uD83C\uDF4C', name: 'Greek Yogurt, Almonds, Protein Shake', cal: 380, protein: 35, carbs: 28, fat: 14 },
    ];
    const totals = meals.reduce((acc, m) => ({ cal: acc.cal + m.cal, protein: acc.protein + m.protein, carbs: acc.carbs + m.carbs, fat: acc.fat + m.fat }), { cal: 0, protein: 0, carbs: 0, fat: 0 });
    const targets = { cal: 2200, protein: 180, carbs: 200, fat: 65 };

    const mealsHtml = meals.map(m => `
      <div class="trainer-meal__slot">
        <div class="trainer-meal__slot-left">
          <span class="trainer-meal__slot-emoji">${m.emoji}</span>
          <div>
            <div class="trainer-meal__slot-time">${m.time}</div>
            <div class="trainer-meal__slot-name">${m.name}</div>
          </div>
        </div>
        <div class="trainer-meal__slot-macros">
          <span class="trainer-meal__slot-cal">${m.cal} kcal</span>
          <span class="trainer-meal__slot-macro">P: ${m.protein}g</span>
          <span class="trainer-meal__slot-macro">C: ${m.carbs}g</span>
          <span class="trainer-meal__slot-macro">F: ${m.fat}g</span>
        </div>
      </div>`).join('');

    const macros = [
      { label: 'Protein', current: totals.protein, target: targets.protein, unit: 'g', color: '#059669' },
      { label: 'Carbs', current: totals.carbs, target: targets.carbs, unit: 'g', color: '#f59e0b' },
      { label: 'Fat', current: totals.fat, target: targets.fat, unit: 'g', color: '#ef4444' },
    ];

    const macroHtml = macros.map(m => `
      <div class="trainer-meal__macro-row">
        <div class="trainer-meal__macro-info">
          <span class="trainer-meal__macro-name">${m.label}</span>
          <span class="trainer-meal__macro-val">${m.current}${m.unit} / ${m.target}${m.unit}</span>
        </div>
        <div class="trainer-meal__macro-bar">
          <div class="trainer-meal__macro-bar-fill" style="width:${Math.min(100, Math.round((m.current / m.target) * 100))}%;background:${m.color}"></div>
        </div>
      </div>`).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's your personalized meal plan for today. I've set your macros for lean muscle gain.</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Daily Meal Plan</div>
          <div class="chat-response-card__subtitle">Target: ${targets.cal} kcal \u00B7 ${targets.protein}g protein</div>
        </div>
      </div>
      <div class="trainer-meal__targets">
        <div class="trainer-meal__target-ring">
          <svg viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="34" fill="none" stroke="var(--alpha-light-200)" stroke-width="6"/>
            <circle cx="40" cy="40" r="34" fill="none" stroke="#059669" stroke-width="6" stroke-dasharray="${Math.round((totals.cal / targets.cal) * 213.6)} 213.6" stroke-linecap="round" transform="rotate(-90 40 40)"/>
          </svg>
          <div class="trainer-meal__target-ring-text">
            <span class="trainer-meal__target-ring-val">${totals.cal}</span>
            <span class="trainer-meal__target-ring-label">/ ${targets.cal}</span>
          </div>
        </div>
        ${macroHtml}
      </div>
      <div class="trainer-meal__slots">${mealsHtml}</div>
      <div class="ai-insight">
        You're on track for today. You have <strong>${targets.cal - totals.cal} kcal</strong> remaining and need <strong>${targets.protein - totals.protein}g more protein</strong> to hit your target. Consider adding a casein shake before bed to close the gap.
      </div>
    </div>`;
  }

  // --- Trainer: Photo-to-Macros (Simulated) ---
  function buildTrainerPhotoMacros() {
    const items = [
      { emoji: '\uD83C\uDF5E', name: 'Avocado Toast', portion: '2 slices', cal: 320, protein: 8, carbs: 34, fat: 18 },
      { emoji: '\uD83E\uDD5A', name: 'Scrambled Eggs', portion: '3 large eggs', cal: 230, protein: 18, carbs: 2, fat: 16 },
      { emoji: '\uD83E\uDD53', name: 'Turkey Bacon', portion: '3 strips', cal: 90, protein: 10, carbs: 1, fat: 5 },
      { emoji: '\uD83C\uDF4A', name: 'Orange Juice', portion: '8 oz glass', cal: 110, protein: 2, carbs: 26, fat: 0 },
    ];
    const totals = items.reduce((acc, i) => ({ cal: acc.cal + i.cal, protein: acc.protein + i.protein, carbs: acc.carbs + i.carbs, fat: acc.fat + i.fat }), { cal: 0, protein: 0, carbs: 0, fat: 0 });

    const itemsHtml = items.map(i => `
      <div class="cal-ai__item">
        <div class="cal-ai__item-left">
          <span class="cal-ai__item-emoji">${i.emoji}</span>
          <div>
            <div class="cal-ai__item-name">${i.name}</div>
            <div class="cal-ai__item-portion">${i.portion}</div>
          </div>
        </div>
        <div class="cal-ai__item-macros">
          <div class="cal-ai__macro"><span class="cal-ai__macro-value">${i.protein}g</span><span class="cal-ai__macro-label">Prot</span></div>
          <div class="cal-ai__macro"><span class="cal-ai__macro-value">${i.carbs}g</span><span class="cal-ai__macro-label">Carb</span></div>
          <div class="cal-ai__macro"><span class="cal-ai__macro-value">${i.fat}g</span><span class="cal-ai__macro-label">Fat</span></div>
        </div>
      </div>`).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>I've scanned your meal photo and identified ${items.length} items. Here's the nutritional breakdown:</p>
    </div>
    <div class="chat-response-card" id="trainerPhotoCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Meal Photo Analysis</div>
          <div class="chat-response-card__subtitle">Breakfast \u2014 ${items.length} items detected</div>
        </div>
      </div>
      <div class="cal-ai__items">${itemsHtml}</div>
      <div class="cal-ai__total">
        <span class="cal-ai__total-label">Total</span>
        <span class="cal-ai__total-cal">${totals.cal} <span>kcal</span></span>
      </div>
      <div class="trainer-photo__macro-summary">
        <span class="trainer-photo__macro-pill" style="background:rgba(5,150,105,0.12);color:#059669">Protein: ${totals.protein}g</span>
        <span class="trainer-photo__macro-pill" style="background:rgba(245,158,11,0.12);color:#d97706">Carbs: ${totals.carbs}g</span>
        <span class="trainer-photo__macro-pill" style="background:rgba(239,68,68,0.12);color:#dc2626">Fat: ${totals.fat}g</span>
      </div>
      <div class="chat-response-card__footer" id="trainerPhotoFooter">
        <button class="cal-ai__add-btn" id="trainerPhotoAddBtn">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 3v10M3 8h10" stroke-linecap="round"/></svg>
          Add to Today's Log
        </button>
      </div>
    </div>`;
  }

  // --- Trainer: Weekly Nutrition Dashboard ---
  function buildTrainerWeeklyNutrition() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const calories = [2150, 2280, 1980, 2320, 2100, 2450, 0];
    const target = 2200;
    const maxCal = Math.max(...calories, target);
    const todayMeals = [
      { name: 'Breakfast', cal: 420, time: '7:30 AM' },
      { name: 'Lunch', cal: 580, time: '12:15 PM' },
      { name: 'Snack', cal: 180, time: '3:00 PM' },
    ];
    const todayCal = todayMeals.reduce((a, m) => a + m.cal, 0);
    const macros = { protein: { current: 98, target: 180 }, carbs: { current: 125, target: 200 }, fat: { current: 38, target: 65 } };

    const barsHtml = days.map((d, i) => {
      const h = calories[i] > 0 ? Math.round((calories[i] / maxCal) * 100) : 0;
      const isToday = i === 6;
      const overUnder = calories[i] > target ? 'over' : 'under';
      return `<div class="trainer-week__bar-col">
        <div class="trainer-week__bar-wrap">
          <div class="trainer-week__bar ${isToday ? 'trainer-week__bar--today' : ''} ${calories[i] > 0 ? 'trainer-week__bar--' + overUnder : ''}" style="height:${h}%"></div>
        </div>
        <span class="trainer-week__bar-label">${d}</span>
      </div>`;
    }).join('');

    const mealsHtml = todayMeals.map(m => `
      <div class="trainer-week__meal-row">
        <span class="trainer-week__meal-name">${m.name}</span>
        <span class="trainer-week__meal-time">${m.time}</span>
        <span class="trainer-week__meal-cal">${m.cal} kcal</span>
      </div>`).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's your weekly nutrition overview. You've been consistent this week!</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Nutrition Dashboard</div>
          <div class="chat-response-card__subtitle">This Week \u00B7 Target: ${target} kcal/day</div>
        </div>
      </div>
      <div class="trainer-week__top-row">
        <div class="trainer-meal__target-ring">
          <svg viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="34" fill="none" stroke="var(--alpha-light-200)" stroke-width="6"/>
            <circle cx="40" cy="40" r="34" fill="none" stroke="#059669" stroke-width="6" stroke-dasharray="${Math.round((todayCal / target) * 213.6)} 213.6" stroke-linecap="round" transform="rotate(-90 40 40)"/>
          </svg>
          <div class="trainer-meal__target-ring-text">
            <span class="trainer-meal__target-ring-val">${todayCal}</span>
            <span class="trainer-meal__target-ring-label">/ ${target}</span>
          </div>
        </div>
        <div class="trainer-week__macro-bars">
          <div class="trainer-meal__macro-row">
            <div class="trainer-meal__macro-info"><span class="trainer-meal__macro-name">Protein</span><span class="trainer-meal__macro-val">${macros.protein.current}g / ${macros.protein.target}g</span></div>
            <div class="trainer-meal__macro-bar"><div class="trainer-meal__macro-bar-fill" style="width:${Math.round((macros.protein.current / macros.protein.target) * 100)}%;background:#059669"></div></div>
          </div>
          <div class="trainer-meal__macro-row">
            <div class="trainer-meal__macro-info"><span class="trainer-meal__macro-name">Carbs</span><span class="trainer-meal__macro-val">${macros.carbs.current}g / ${macros.carbs.target}g</span></div>
            <div class="trainer-meal__macro-bar"><div class="trainer-meal__macro-bar-fill" style="width:${Math.round((macros.carbs.current / macros.carbs.target) * 100)}%;background:#f59e0b"></div></div>
          </div>
          <div class="trainer-meal__macro-row">
            <div class="trainer-meal__macro-info"><span class="trainer-meal__macro-name">Fat</span><span class="trainer-meal__macro-val">${macros.fat.current}g / ${macros.fat.target}g</span></div>
            <div class="trainer-meal__macro-bar"><div class="trainer-meal__macro-bar-fill" style="width:${Math.round((macros.fat.current / macros.fat.target) * 100)}%;background:#ef4444"></div></div>
          </div>
        </div>
      </div>
      <div class="trainer-week__chart">
        <div class="trainer-week__chart-title">7-Day Calorie Intake</div>
        <div class="trainer-week__chart-target" style="bottom:${Math.round((target / maxCal) * 100)}%"><span>Target: ${target}</span></div>
        <div class="trainer-week__bars">${barsHtml}</div>
      </div>
      <div class="trainer-week__today-meals">
        <div class="trainer-week__meals-title">Today's Meals</div>
        ${mealsHtml}
      </div>
    </div>`;
  }

  // --- Trainer: Workout Plan Display ---
  function buildTrainerWorkoutPlan() {
    const plan = [
      { day: 'Monday', label: 'Push', exercises: [
        { name: 'Bench Press', sets: 4, reps: '8-10', weight: '185 lbs', done: true },
        { name: 'Overhead Press', sets: 3, reps: '10-12', weight: '115 lbs', done: true },
        { name: 'Incline DB Press', sets: 3, reps: '10-12', weight: '65 lbs', done: true },
        { name: 'Lateral Raises', sets: 3, reps: '15', weight: '25 lbs', done: true },
        { name: 'Tricep Pushdowns', sets: 3, reps: '12-15', weight: '50 lbs', done: true },
      ]},
      { day: 'Tuesday', label: 'Pull', exercises: [
        { name: 'Barbell Rows', sets: 4, reps: '8-10', weight: '165 lbs', done: true },
        { name: 'Pull-Ups', sets: 3, reps: '8-10', weight: 'BW', done: true },
        { name: 'Face Pulls', sets: 3, reps: '15', weight: '35 lbs', done: true },
        { name: 'Barbell Curls', sets: 3, reps: '10-12', weight: '65 lbs', done: false },
        { name: 'Hammer Curls', sets: 3, reps: '12', weight: '30 lbs', done: false },
      ]},
      { day: 'Wednesday', label: 'Rest', exercises: [] },
      { day: 'Thursday', label: 'Legs', exercises: [
        { name: 'Barbell Squats', sets: 4, reps: '6-8', weight: '225 lbs', done: false },
        { name: 'Romanian Deadlifts', sets: 3, reps: '10-12', weight: '185 lbs', done: false },
        { name: 'Leg Press', sets: 3, reps: '12-15', weight: '360 lbs', done: false },
        { name: 'Walking Lunges', sets: 3, reps: '12 each', weight: '40 lbs', done: false },
        { name: 'Calf Raises', sets: 4, reps: '15', weight: '135 lbs', done: false },
      ]},
      { day: 'Friday', label: 'Push', exercises: [
        { name: 'DB Bench Press', sets: 4, reps: '10-12', weight: '75 lbs', done: false },
        { name: 'Arnold Press', sets: 3, reps: '10', weight: '45 lbs', done: false },
        { name: 'Cable Flyes', sets: 3, reps: '12-15', weight: '30 lbs', done: false },
        { name: 'Skull Crushers', sets: 3, reps: '12', weight: '55 lbs', done: false },
      ]},
      { day: 'Saturday', label: 'Pull', exercises: [
        { name: 'Deadlifts', sets: 4, reps: '5', weight: '275 lbs', done: false },
        { name: 'Lat Pulldowns', sets: 3, reps: '10-12', weight: '140 lbs', done: false },
        { name: 'Seated Cable Rows', sets: 3, reps: '12', weight: '120 lbs', done: false },
        { name: 'DB Curls', sets: 3, reps: '12', weight: '35 lbs', done: false },
      ]},
      { day: 'Sunday', label: 'Rest', exercises: [] },
    ];

    const checkSvg = '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 7l3 3 6-6.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    const planHtml = plan.map(d => {
      if (d.exercises.length === 0) {
        return `<div class="trainer-workout__day trainer-workout__day--rest">
          <div class="trainer-workout__day-header">
            <span class="trainer-workout__day-name">${d.day}</span>
            <span class="trainer-workout__day-label trainer-workout__day-label--rest">${d.label}</span>
          </div>
          <div class="trainer-workout__rest-text">Active recovery or rest</div>
        </div>`;
      }
      const doneCount = d.exercises.filter(e => e.done).length;
      const exercisesHtml = d.exercises.map(e => `
        <div class="trainer-workout__exercise ${e.done ? 'trainer-workout__exercise--done' : ''}">
          <div class="trainer-workout__check ${e.done ? 'trainer-workout__check--done' : ''}">${e.done ? checkSvg : ''}</div>
          <span class="trainer-workout__ex-name">${e.name}</span>
          <span class="trainer-workout__ex-detail">${e.sets}x${e.reps}</span>
          <span class="trainer-workout__ex-weight">${e.weight}</span>
        </div>`).join('');
      return `<div class="trainer-workout__day">
        <div class="trainer-workout__day-header">
          <span class="trainer-workout__day-name">${d.day}</span>
          <span class="trainer-workout__day-label">${d.label}</span>
          <span class="trainer-workout__day-progress">${doneCount}/${d.exercises.length}</span>
        </div>
        <div class="trainer-workout__exercises">${exercisesHtml}</div>
      </div>`;
    }).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's your workout plan for this week. You're running a Push/Pull/Legs split. Great progress so far!</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Weekly Workout Plan</div>
          <div class="chat-response-card__subtitle">Push / Pull / Legs Split</div>
        </div>
      </div>
      <div class="trainer-workout__plan">${planHtml}</div>
      <div class="trainer-workout__actions">
        <button class="ad-gen__btn ad-gen__btn--primary" id="trainerLogWorkout">Log Today's Workout</button>
        <button class="ad-gen__btn ad-gen__btn--secondary">Adjust Plan</button>
      </div>
    </div>`;
  }

  // --- Trainer: Accountability Check-In ---
  function buildTrainerCheckin() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Time for your daily accountability check-in. Let's see how you did today!</p>
    </div>
    <div class="chat-response-card" id="trainerCheckinCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Daily Check-In</div>
          <div class="chat-response-card__subtitle">Thursday, Feb 27</div>
        </div>
      </div>
      <div class="trainer-checkin__questions">
        <div class="trainer-checkin__q">
          <div class="trainer-checkin__q-label">Did you eat on plan today?</div>
          <div class="trainer-checkin__q-options" data-checkin="meals">
            <button class="trainer-checkin__opt" data-val="yes">Yes, all meals</button>
            <button class="trainer-checkin__opt" data-val="mostly">Mostly</button>
            <button class="trainer-checkin__opt" data-val="no">Off track</button>
          </div>
        </div>
        <div class="trainer-checkin__q">
          <div class="trainer-checkin__q-label">Water intake today</div>
          <div class="trainer-checkin__slider-wrap">
            <input type="range" class="trainer-checkin__slider" id="trainerWaterSlider" min="0" max="12" value="8" step="1"/>
            <span class="trainer-checkin__slider-val" id="trainerWaterVal">8 glasses</span>
          </div>
        </div>
        <div class="trainer-checkin__q">
          <div class="trainer-checkin__q-label">Did you complete your workout?</div>
          <div class="trainer-checkin__q-options" data-checkin="workout">
            <button class="trainer-checkin__opt" data-val="yes">Yes, full session</button>
            <button class="trainer-checkin__opt" data-val="partial">Partial</button>
            <button class="trainer-checkin__opt" data-val="no">Skipped</button>
          </div>
        </div>
        <div class="trainer-checkin__q">
          <div class="trainer-checkin__q-label">Sleep quality last night</div>
          <div class="trainer-checkin__q-options" data-checkin="sleep">
            <button class="trainer-checkin__opt" data-val="great">Great (7-9h)</button>
            <button class="trainer-checkin__opt" data-val="ok">Okay (5-7h)</button>
            <button class="trainer-checkin__opt" data-val="poor">Poor (&lt;5h)</button>
          </div>
        </div>
      </div>
      <div class="trainer-checkin__submit-wrap">
        <button class="ad-gen__btn ad-gen__btn--primary" id="trainerCheckinSubmit">Submit Check-In</button>
      </div>
      <div class="trainer-checkin__summary hidden" id="trainerCheckinSummary">
        <div class="trainer-checkin__summary-title">Today's Summary</div>
        <div class="trainer-checkin__summary-items" id="trainerCheckinItems"></div>
        <div class="ai-insight" id="trainerCheckinInsight"></div>
      </div>
    </div>`;
  }

  // --- Trainer: Check-In Loading State ---
  function buildTrainerCheckinThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Setting up your daily check-in...</p>
    </div>
    <div class="chat-response-card">
      <div class="mindset__thinking">
        <div class="mindset__thinking-icon uni-pulse-ring">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="mindset__thinking-text">Preparing your check-in...</span>
        <div class="mindset__thinking-steps">
          <div class="mindset__thinking-step">${CHECK_SVG} Loading today's meal plan</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Checking workout schedule</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Preparing accountability questions...</div>
        </div>
        <div class="mindset__progress"><div class="mindset__progress-fill"></div></div>
      </div>
    </div>`;
  }

  // --- Trainer: Photo Scanning State ---
  function buildTrainerPhotoScanning() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Analyzing your meal photo...</p>
    </div>
    <div class="chat-response-card">
      <div class="mindset__thinking">
        <div class="mindset__thinking-icon uni-pulse-ring">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="mindset__thinking-text">Scanning meal photo...</span>
        <div class="mindset__thinking-steps">
          <div class="mindset__thinking-step">${CHECK_SVG} Detecting food items</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Estimating portions</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Calculating macros...</div>
        </div>
        <div class="mindset__progress"><div class="mindset__progress-fill"></div></div>
      </div>
    </div>`;
  }

  // ===========================================================
  // ADELINE AI (FB ADS) COMPONENT BUILDERS
  // ===========================================================

  // --- FB Ads Dashboard: Campaign Performance ---
  function buildFbAdsDashboard() {
    const campaigns = [
      { name: 'Summer Sale \u2014 Broad Audience', status: 'active', statusLabel: 'Active', spend: '$3,450', cpc: '$1.82', ctr: '1.65%', roas: '3.8x', conversions: 412 },
      { name: 'Retargeting \u2014 Cart Abandoners', status: 'active', statusLabel: 'Active', spend: '$1,890', cpc: '$0.94', ctr: '2.85%', roas: '5.2x', conversions: 289 },
      { name: 'Lookalike \u2014 Top Purchasers', status: 'learning', statusLabel: 'Learning', spend: '$2,100', cpc: '$2.10', ctr: '1.22%', roas: '2.1x', conversions: 156 },
      { name: 'Video Views \u2014 Brand Awareness', status: 'active', statusLabel: 'Active', spend: '$980', cpc: '$0.45', ctr: '3.10%', roas: '1.4x', conversions: 67 },
      { name: 'Lead Gen \u2014 Free Guide Offer', status: 'paused', statusLabel: 'Paused', spend: '$1,540', cpc: '$3.20', ctr: '0.72%', roas: '0.8x', conversions: 41 },
    ];

    const totalSpend = '$9,960';
    const avgCPC = '$1.70';
    const avgCTR = '1.91%';
    const blendedROAS = '2.86x';

    const campaignsHtml = campaigns.map(c => {
      return `
      <div class="fb-ads__campaign">
        <div class="fb-ads__campaign-header">
          <span class="fb-ads__campaign-name">${c.name}</span>
          <span class="fb-ads__status-pill fb-ads__status-pill--${c.status}">${c.statusLabel}</span>
        </div>
        <div class="fb-ads__metrics">
          <div class="fb-ads__metric"><span class="fb-ads__metric-value">${c.spend}</span><span class="fb-ads__metric-label">Spend</span></div>
          <div class="fb-ads__metric"><span class="fb-ads__metric-value">${c.cpc}</span><span class="fb-ads__metric-label">CPC</span></div>
          <div class="fb-ads__metric"><span class="fb-ads__metric-value">${c.ctr}</span><span class="fb-ads__metric-label">CTR</span></div>
          <div class="fb-ads__metric"><span class="fb-ads__metric-value">${c.roas}</span><span class="fb-ads__metric-label">ROAS</span></div>
          <div class="fb-ads__metric"><span class="fb-ads__metric-value">${c.conversions}</span><span class="fb-ads__metric-label">Conv.</span></div>
        </div>
      </div>`;
    }).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's your complete campaign performance dashboard. I've analyzed all 5 campaigns over the last 7 days.</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Campaign Performance</div>
          <div class="chat-response-card__subtitle">Last 7 days \u00B7 5 campaigns</div>
        </div>
        <div class="fb-ads__live-badge"><div class="fb-ads__live-dot"></div>Live</div>
      </div>
      <div class="pm-hub__stats">
        <div class="pm-hub__stat"><span class="pm-hub__stat-number">${totalSpend}</span><span class="pm-hub__stat-label">Total Spend</span></div>
        <div class="pm-hub__stat"><span class="pm-hub__stat-number">${avgCPC}</span><span class="pm-hub__stat-label">Avg CPC</span></div>
        <div class="pm-hub__stat"><span class="pm-hub__stat-number">${avgCTR}</span><span class="pm-hub__stat-label">Avg CTR</span></div>
        <div class="pm-hub__stat"><span class="pm-hub__stat-number">${blendedROAS}</span><span class="pm-hub__stat-label">Blended ROAS</span></div>
      </div>
      <div class="fb-ads__campaigns">${campaignsHtml}</div>
      <div class="fbads-health">
        <div class="fbads-health__header">
          <span class="fbads-health__title">Campaign Health Score</span>
          <span class="fbads-health__trend fbads-health__trend--up">\u2191 +4 from last week</span>
        </div>
        <div class="fbads-health__gauge">
          <div class="fbads-health__gauge-bar">
            <div class="fbads-health__gauge-fill" style="width:78%"></div>
          </div>
          <span class="fbads-health__gauge-val">78 / 100</span>
        </div>
      </div>
      <div class="ai-insight">
        <strong>Retargeting \u2014 Cart Abandoners</strong> is your best performer at 5.2x ROAS. I recommend scaling its budget by 25%. <strong>Lead Gen \u2014 Free Guide</strong> has a 0.8x ROAS and should be paused or restructured. The Lookalike campaign is still in learning phase \u2014 give it 3 more days before making changes.
      </div>
    </div>`;
  }

  // --- FB Ads: Pause Underperformers ---
  function buildFbAdsPauseUnderperformers() {
    const underperformers = [
      { name: 'Lead Gen \u2014 Free Guide Offer', spend: '$1,540', cpc: '$3.20', ctr: '0.72%', roas: '0.8x', reason: 'ROAS below 1.0x for 5 consecutive days. CPC is 88% above account average. Only 41 conversions at $37.56 each \u2014 well above your $15 target CPA.' },
      { name: 'Video Views \u2014 Brand Awareness', spend: '$980', cpc: '$0.45', ctr: '3.10%', roas: '1.4x', reason: 'CTR is high but ROAS has declined 31% week-over-week. Engagement is not converting to purchases. Cost per purchase increased from $8.20 to $14.60.' },
      { name: 'Lookalike \u2014 Interest Stack Test', spend: '$620', cpc: '$2.85', ctr: '0.91%', roas: '1.1x', reason: 'Below breakeven ROAS threshold. Audience overlap with your main Lookalike campaign is 42%, causing internal competition and inflated CPMs.' },
    ];

    const adsHtml = underperformers.map((ad, i) => `
      <div class="fbads-pause__ad">
        <div class="fbads-pause__ad-header">
          <span class="fbads-pause__ad-name">${ad.name}</span>
          <span class="fb-ads__status-pill fb-ads__status-pill--active">Active</span>
        </div>
        <div class="fb-ads__metrics">
          <div class="fb-ads__metric"><span class="fb-ads__metric-value">${ad.spend}</span><span class="fb-ads__metric-label">Spend</span></div>
          <div class="fb-ads__metric"><span class="fb-ads__metric-value fb-ads__metric-value--bad">${ad.cpc}</span><span class="fb-ads__metric-label">CPC</span></div>
          <div class="fb-ads__metric"><span class="fb-ads__metric-value">${ad.ctr}</span><span class="fb-ads__metric-label">CTR</span></div>
          <div class="fb-ads__metric"><span class="fb-ads__metric-value fb-ads__metric-value--bad">${ad.roas}</span><span class="fb-ads__metric-label">ROAS</span></div>
        </div>
        <div class="fbads-pause__reason">
          <svg class="fbads-pause__reason-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 00.708.852h.058a.75.75 0 00.354-.149l.041-.02M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>${ad.reason}</span>
        </div>
      </div>`).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>I've identified <strong>3 underperforming ads</strong> that are burning budget. Here's my analysis and recommendation:</p>
    </div>
    <div class="chat-response-card" id="fbadsPauseCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Underperforming Ads</div>
          <div class="chat-response-card__subtitle">3 ads recommended for pause</div>
        </div>
      </div>
      <div class="fbads-pause__list">${adsHtml}</div>
      <div class="chat-response-card__footer" id="fbadsPauseFooter">
        <button class="ad-gen__btn ad-gen__btn--primary" id="fbadsPauseBtn">Pause All Underperformers</button>
      </div>
    </div>`;
  }

  // --- FB Ads: Generate Variations ---
  function buildFbAdsVariations() {
    const topAd = {
      headline: '5 Minutes Changed My Business Forever',
      text: 'I was skeptical at first. Another tool promising to "revolutionize" my workflow? But after just one week, my team saved 12 hours on reporting alone. Now I can\'t imagine running campaigns without it.',
      description: 'Join 10,000+ marketers who switched this quarter.',
    };
    const variations = [
      { angle: 'Question Hook', headline: 'Still Spending 3+ Hours on Campaign Reports?', text: 'What if your entire weekly reporting took less time than your morning coffee? Our customers cut reporting time by 87% in their first month. The best part? Setup takes 5 minutes, not 5 days.', description: 'See why 10,000+ marketers made the switch.' },
      { angle: 'Social Proof', headline: '10,247 Marketers Can\'t Be Wrong', text: 'When Sarah from Dropbox told me she cut her ad management time in half, I didn\'t believe her. Then I tried it myself. 3 months later, my ROAS is up 42% and I spend Friday afternoons with my kids instead of in spreadsheets.', description: 'Rated #1 by marketers 3 years running.' },
      { angle: 'Pain Point', headline: 'Your Competitors Are Scaling While You\'re Still in Spreadsheets', text: 'Every hour you spend manually pulling reports is an hour your competitor spends scaling. The gap widens every day. Top performers automate their reporting and focus on strategy. It\'s time you did too.', description: 'Stop managing. Start scaling.' },
    ];

    const variationsHtml = variations.map((v, i) => `
      <div class="fbads-var__card">
        <div class="fbads-var__card-angle">${v.angle}</div>
        <div class="fbads-var__card-headline">${v.headline}</div>
        <div class="fbads-var__card-text">${v.text}</div>
        <div class="fbads-var__card-desc">${v.description}</div>
      </div>`).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>I've analyzed your top-performing ad and generated 3 new variations with different psychological angles.</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Ad Variations Generator</div>
          <div class="chat-response-card__subtitle">Based on your top performer</div>
        </div>
      </div>
      <div class="fbads-var__original">
        <div class="fbads-var__original-label">Original (Top Performer)</div>
        <div class="fbads-var__card fbads-var__card--original">
          <div class="fbads-var__card-headline">${topAd.headline}</div>
          <div class="fbads-var__card-text">${topAd.text}</div>
          <div class="fbads-var__card-desc">${topAd.description}</div>
        </div>
      </div>
      <div class="fbads-var__generated">
        <div class="fbads-var__generated-label">Generated Variations</div>
        ${variationsHtml}
      </div>
      <div class="ad-gen__actions">
        <button class="ad-gen__btn ad-gen__btn--primary" id="fbadsPushToManager">Push to Ads Manager</button>
        <button class="ad-gen__btn ad-gen__btn--secondary">Regenerate</button>
      </div>
    </div>`;
  }

  // --- FB Ads: A/B Test Suggestions ---
  function buildFbAdsAbTest() {
    const tests = [
      {
        type: 'Creative',
        typeColor: '#1877f2',
        title: 'UGC vs. Professional Video on Summer Sale Campaign',
        hypothesis: 'User-generated content ads will achieve 20-30% higher CTR and lower CPC compared to professionally produced video, based on industry trends showing UGC outperforming polished content in direct-response campaigns.',
        impact: 'High',
        impactColor: '#059669',
        metric: 'Expected +25% CTR improvement',
      },
      {
        type: 'Copy',
        typeColor: '#7c3aed',
        title: 'Long-Form Story vs. Short Direct CTA on Retargeting',
        hypothesis: 'Cart abandoners who see story-driven ad copy with a personal narrative will convert at a higher rate than those seeing short, direct CTA copy. Story ads build trust that overcomes purchase hesitation.',
        impact: 'Medium',
        impactColor: '#f59e0b',
        metric: 'Expected +15% conversion rate',
      },
      {
        type: 'Audience',
        typeColor: '#ef4444',
        title: 'Value-Based Lookalike vs. Engagement Lookalike',
        hypothesis: 'A 1% lookalike based on top 25% lifetime value customers will produce higher ROAS than the current engagement-based lookalike. Optimizing for purchase value rather than volume should attract higher-quality prospects.',
        impact: 'High',
        impactColor: '#059669',
        metric: 'Expected +35% ROAS improvement',
      },
    ];

    const testsHtml = tests.map((t, i) => `
      <div class="fbads-test__card">
        <div class="fbads-test__card-header">
          <span class="fbads-test__type-badge" style="background:${t.typeColor}15;color:${t.typeColor}">${t.type}</span>
          <span class="fbads-test__impact" style="color:${t.impactColor}">${t.impact} Impact</span>
        </div>
        <div class="fbads-test__card-title">${t.title}</div>
        <div class="fbads-test__hypothesis">
          <div class="fbads-test__hypothesis-label">Hypothesis</div>
          <div class="fbads-test__hypothesis-text">${t.hypothesis}</div>
        </div>
        <div class="fbads-test__metric">${t.metric}</div>
        <button class="ad-gen__btn ad-gen__btn--secondary fbads-test__create-btn" data-test="${i}">Create Test</button>
      </div>`).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Based on your campaign performance patterns, here are 3 A/B tests I recommend running next:</p>
    </div>
    <div class="chat-response-card" id="fbadsTestCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Recommended A/B Tests</div>
          <div class="chat-response-card__subtitle">Based on performance patterns</div>
        </div>
      </div>
      <div class="fbads-test__list">${testsHtml}</div>
    </div>`;
  }

  // --- FB Ads: Dashboard Thinking/Loading State ---
  function buildFbAdsDashboardThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Let me pull your latest campaign data from Facebook Ads Manager.</p>
    </div>
    <div class="chat-response-card">
      <div class="connect-seq">
        <div class="connect-seq__item">
          <div class="connect-seq__platform" style="background:#1877f2">f</div>
          <span>Connecting to Facebook Ads Manager...</span>
          ${CHECK_SVG}
        </div>
        <div class="connect-seq__item">
          <div class="connect-seq__platform" style="background:#1877f2">f</div>
          <span>Syncing campaign data...</span>
          ${CHECK_SVG}
        </div>
        <div class="connect-seq__item">
          <div class="connect-seq__platform" style="background:#1877f2">f</div>
          <span>Analyzing performance metrics...</span>
          ${CHECK_SVG}
        </div>
      </div>
      <div class="fbads__progress"><div class="fbads__progress-fill"></div></div>
    </div>`;
  }

  // ===========================================================
  // NEXUS AI (BUSINESS CONSULTANT) COMPONENT BUILDERS
  // ===========================================================

  // --- Biz: Multi-Platform Dashboard ---
  function buildBizMultiDashboard() {
    const stats = [
      { label: 'Active Projects', value: '12', icon: '\uD83D\uDCCB' },
      { label: 'Overdue Tasks', value: '7', warn: true, icon: '\u26A0\uFE0F' },
      { label: 'Revenue MTD', value: '$84,200', icon: '\uD83D\uDCB0' },
      { label: 'Team Members', value: '14', icon: '\uD83D\uDC65' },
    ];

    const qbData = { revenue: '$84,200', expenses: '$52,100', profit: '$32,100', bars: [65, 72, 58, 80, 75, 84] };
    const clickupTasks = { todo: 15, inProgress: 8, review: 4, done: 23 };
    const totalTasks = clickupTasks.todo + clickupTasks.inProgress + clickupTasks.review + clickupTasks.done;

    const activityFeed = [
      { name: 'Sarah K.', action: 'completed "Q1 Financial Report"', time: '12 min ago', platform: 'ClickUp' },
      { name: 'Marcus T.', action: 'posted in #project-updates', time: '28 min ago', platform: 'Slack' },
      { name: 'Invoice #1047 paid by Henderson Co.', action: '', time: '1 hr ago', platform: 'QuickBooks' },
      { name: 'Jamie L.', action: 'moved "Website Redesign" to Review', time: '2 hr ago', platform: 'ClickUp' },
      { name: 'Lisa C.', action: 'shared weekly standup notes', time: '3 hr ago', platform: 'Slack' },
    ];

    const statsHtml = stats.map(s => `
      <div class="pm-hub__stat">
        <span class="pm-hub__stat-number ${s.warn ? 'pm-hub__stat-number--warning' : ''}">${s.value}</span>
        <span class="pm-hub__stat-label">${s.label}</span>
      </div>`).join('');

    const qbBarsHtml = qbData.bars.map((v, i) => {
      const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
      return `<div class="biz-qb__bar-col"><div class="biz-qb__bar" style="height:${v}%"></div><span>${months[i]}</span></div>`;
    }).join('');

    const feedHtml = activityFeed.map(a => `
      <div class="biz-feed__item">
        <div class="biz-feed__avatar">${a.name.charAt(0)}</div>
        <div class="biz-feed__content">
          <span class="biz-feed__text"><strong>${a.name}</strong>${a.action ? ' ' + a.action : ''}</span>
          <div class="biz-feed__meta">
            <span class="source-pill source-pill--${a.platform.toLowerCase()}">${a.platform}</span>
            <span class="biz-feed__time">${a.time}</span>
          </div>
        </div>
      </div>`).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's your multi-platform business dashboard. I've synced data from QuickBooks, ClickUp, and Slack.</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Business Dashboard</div>
          <div class="chat-response-card__subtitle">QuickBooks \u00B7 ClickUp \u00B7 Slack</div>
        </div>
        <div class="connect-seq__synced-logos">
          <div class="connect-seq__synced-logo" style="background:#2CA01C">Q</div>
          <div class="connect-seq__synced-logo" style="background:#7B68EE">C</div>
          <div class="connect-seq__synced-logo" style="background:#4A154B">S</div>
        </div>
      </div>
      <div class="pm-hub__stats">${statsHtml}</div>
      <div class="biz-sections">
        <div class="biz-section">
          <div class="biz-section__header">
            <div class="connect-seq__synced-logo" style="background:#2CA01C;width:24px;height:24px;font-size:11px">Q</div>
            <span class="biz-section__title">QuickBooks \u2014 Financials</span>
          </div>
          <div class="biz-qb__stats">
            <div class="biz-qb__stat"><span class="biz-qb__stat-label">Revenue</span><span class="biz-qb__stat-val biz-qb__stat-val--good">${qbData.revenue}</span></div>
            <div class="biz-qb__stat"><span class="biz-qb__stat-label">Expenses</span><span class="biz-qb__stat-val">${qbData.expenses}</span></div>
            <div class="biz-qb__stat"><span class="biz-qb__stat-label">Net Profit</span><span class="biz-qb__stat-val biz-qb__stat-val--good">${qbData.profit}</span></div>
          </div>
          <div class="biz-qb__chart">${qbBarsHtml}</div>
        </div>
        <div class="biz-section">
          <div class="biz-section__header">
            <div class="connect-seq__synced-logo" style="background:#7B68EE;width:24px;height:24px;font-size:11px">C</div>
            <span class="biz-section__title">ClickUp \u2014 Tasks</span>
          </div>
          <div class="biz-tasks__row">
            <div class="biz-tasks__col"><span class="biz-tasks__count">${clickupTasks.todo}</span><span class="biz-tasks__label">To Do</span><div class="biz-tasks__bar"><div class="biz-tasks__bar-fill" style="width:${Math.round((clickupTasks.todo / totalTasks) * 100)}%;background:#94a3b8"></div></div></div>
            <div class="biz-tasks__col"><span class="biz-tasks__count">${clickupTasks.inProgress}</span><span class="biz-tasks__label">In Progress</span><div class="biz-tasks__bar"><div class="biz-tasks__bar-fill" style="width:${Math.round((clickupTasks.inProgress / totalTasks) * 100)}%;background:#3b82f6"></div></div></div>
            <div class="biz-tasks__col"><span class="biz-tasks__count">${clickupTasks.review}</span><span class="biz-tasks__label">Review</span><div class="biz-tasks__bar"><div class="biz-tasks__bar-fill" style="width:${Math.round((clickupTasks.review / totalTasks) * 100)}%;background:#f59e0b"></div></div></div>
            <div class="biz-tasks__col"><span class="biz-tasks__count">${clickupTasks.done}</span><span class="biz-tasks__label">Done</span><div class="biz-tasks__bar"><div class="biz-tasks__bar-fill" style="width:${Math.round((clickupTasks.done / totalTasks) * 100)}%;background:#059669"></div></div></div>
          </div>
        </div>
        <div class="biz-section">
          <div class="biz-section__header">
            <div class="connect-seq__synced-logo" style="background:#4A154B;width:24px;height:24px;font-size:11px">S</div>
            <span class="biz-section__title">Team Activity Feed</span>
          </div>
          <div class="biz-feed">${feedHtml}</div>
        </div>
      </div>
    </div>`;
  }

  // --- Biz: Project Status Tracker with Milestones ---
  function buildBizProjectTracker() {
    const projects = [
      { name: 'Q1 Website Redesign', progress: 72, status: 'on-track', statusLabel: 'On Track', assignee: 'Marcus T.', deadline: 'Mar 15', milestones: [
        { label: 'Wireframes', done: true, pos: 20 },
        { label: 'Design', done: true, pos: 45 },
        { label: 'Development', done: false, pos: 70 },
        { label: 'Launch', done: false, pos: 100 },
      ]},
      { name: 'Henderson Consulting Onboarding', progress: 45, status: 'at-risk', statusLabel: 'At Risk', assignee: 'Jamie L.', deadline: 'Mar 21', milestones: [
        { label: 'Discovery', done: true, pos: 25 },
        { label: 'Setup', done: false, pos: 50 },
        { label: 'Training', done: false, pos: 75 },
        { label: 'Handoff', done: false, pos: 100 },
      ]},
      { name: 'Monthly Retainer \u2014 Apex Properties', progress: 30, status: 'overdue', statusLabel: 'Overdue', assignee: 'Sarah K.', deadline: 'Mar 10', milestones: [
        { label: 'Audit', done: true, pos: 25 },
        { label: 'Report', done: false, pos: 50 },
        { label: 'Optimize', done: false, pos: 75 },
        { label: 'Deliver', done: false, pos: 100 },
      ]},
      { name: 'Tax Prep Document Collection', progress: 88, status: 'on-track', statusLabel: 'On Track', assignee: 'Chris M.', deadline: 'Mar 28', milestones: [
        { label: 'Collect', done: true, pos: 30 },
        { label: 'Review', done: true, pos: 60 },
        { label: 'File', done: false, pos: 90 },
        { label: 'Complete', done: false, pos: 100 },
      ]},
    ];

    const projectsHtml = projects.map(p => {
      const milestonesHtml = p.milestones.map(m => `
        <div class="biz-project__milestone ${m.done ? 'biz-project__milestone--done' : ''}">
          <div class="biz-project__milestone-dot"></div>
          <span class="biz-project__milestone-label">${m.label}</span>
        </div>`).join('');
      return `
      <div class="biz-project__card">
        <div class="biz-project__card-header">
          <span class="biz-project__card-name">${p.name}</span>
          <span class="status-pill status-pill--${p.status}">${p.statusLabel}</span>
        </div>
        <div class="biz-project__card-meta">
          <span>${p.assignee}</span>
          <span>Due: ${p.deadline}</span>
        </div>
        <div class="biz-project__progress-wrap">
          <div class="biz-project__progress-bar">
            <div class="biz-project__progress-fill biz-project__progress-fill--${p.status}" style="width:${p.progress}%"></div>
          </div>
          <span class="biz-project__progress-pct">${p.progress}%</span>
        </div>
        <div class="biz-project__milestones">${milestonesHtml}</div>
      </div>`;
    }).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's your project status tracker with milestone progress for all active projects.</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Project Status Tracker</div>
          <div class="chat-response-card__subtitle">4 active projects</div>
        </div>
      </div>
      <div class="biz-project__list">${projectsHtml}</div>
    </div>`;
  }

  // --- Biz: Weekly Summary ---
  function buildBizWeeklySummary() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's your AI-generated weekly business summary with action items.</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Weekly Business Summary</div>
          <div class="chat-response-card__subtitle">Week of Feb 24 \u2013 Feb 28, 2026</div>
        </div>
      </div>
      <div class="biz-summary__section">
        <div class="biz-summary__section-title" style="color:#059669">\u2705 Key Wins</div>
        <ul class="biz-summary__list">
          <li>Closed Henderson Consulting deal worth <strong>$24,000/yr</strong></li>
          <li>Website Redesign ahead of schedule \u2014 72% complete</li>
          <li>Team utilization at <strong>87%</strong>, up from 74% last week</li>
          <li>Reduced overdue tasks from 12 to 7</li>
        </ul>
      </div>
      <div class="biz-summary__section">
        <div class="biz-summary__section-title" style="color:#ef4444">\u26A0\uFE0F Concerns</div>
        <ul class="biz-summary__list">
          <li>Apex Properties retainer is <strong>5 days overdue</strong> \u2014 client escalation risk</li>
          <li>Marcus T. is overloaded with <strong>12 active tasks</strong></li>
          <li>Cash receivables aging: 3 invoices over 30 days ($12,400 total)</li>
        </ul>
      </div>
      <div class="biz-summary__section">
        <div class="biz-summary__section-title" style="color:#3b82f6">\uD83D\uDCCB Action Items</div>
        <div class="biz-summary__checklist">
          <label class="biz-summary__check-item"><input type="checkbox" class="biz-summary__checkbox"/> Reassign 3 tasks from Marcus to Lisa (capacity available)</label>
          <label class="biz-summary__check-item"><input type="checkbox" class="biz-summary__checkbox"/> Follow up on Apex Properties deliverable with Sarah</label>
          <label class="biz-summary__check-item"><input type="checkbox" class="biz-summary__checkbox"/> Send payment reminders for 3 overdue invoices</label>
          <label class="biz-summary__check-item"><input type="checkbox" class="biz-summary__checkbox"/> Review Q1 Website Redesign milestone before Friday</label>
          <label class="biz-summary__check-item"><input type="checkbox" class="biz-summary__checkbox"/> Schedule team retrospective for Friday 3 PM</label>
        </div>
      </div>
      <div class="biz-summary__section">
        <div class="biz-summary__section-title" style="color:#7c3aed">\uD83D\uDCB0 Financial Snapshot</div>
        <div class="biz-qb__stats">
          <div class="biz-qb__stat"><span class="biz-qb__stat-label">Revenue MTD</span><span class="biz-qb__stat-val biz-qb__stat-val--good">$84,200</span></div>
          <div class="biz-qb__stat"><span class="biz-qb__stat-label">Expenses MTD</span><span class="biz-qb__stat-val">$52,100</span></div>
          <div class="biz-qb__stat"><span class="biz-qb__stat-label">Net Profit</span><span class="biz-qb__stat-val biz-qb__stat-val--good">$32,100</span></div>
          <div class="biz-qb__stat"><span class="biz-qb__stat-label">Outstanding</span><span class="biz-qb__stat-val" style="color:#ef4444">$12,400</span></div>
          <div class="biz-qb__stat"><span class="biz-qb__stat-label">Cash Flow</span><span class="biz-qb__stat-val biz-qb__stat-val--good">+$18,600</span></div>
          <div class="biz-qb__stat"><span class="biz-qb__stat-label">Profit Margin</span><span class="biz-qb__stat-val">38.1%</span></div>
        </div>
      </div>
      <div class="biz-summary__section">
        <div class="biz-summary__section-title" style="color:#f59e0b">\uD83C\uDFAF Next Week Priorities</div>
        <ul class="biz-summary__list">
          <li>Deliver Apex Properties monthly report</li>
          <li>Complete Website Redesign development milestone</li>
          <li>Prepare Q1 board presentation</li>
          <li>Interview 2 candidates for open project manager role</li>
        </ul>
      </div>
      <div class="ad-gen__actions">
        <button class="ad-gen__btn ad-gen__btn--primary" id="bizSendToTeam">Send to Team</button>
        <button class="ad-gen__btn ad-gen__btn--secondary" id="bizExportSummary">Export PDF</button>
      </div>
    </div>`;
  }

  // --- Biz: Delegated Tasks ---
  function buildBizNotifications() {
    const delegatedTasks = [
      { assignee: 'Marcus T.', avatar: 'MT', task: 'Reassign 3 tasks to Lisa — capacity rebalance', project: 'Website Redesign', dueDate: 'Today', status: 'in-progress', statusLabel: 'In Progress', lastUpdate: '2 hr ago' },
      { assignee: 'Sarah K.', avatar: 'SK', task: 'Deliver Apex Properties monthly report', project: 'Apex Properties', dueDate: 'Overdue (3 days)', status: 'overdue', statusLabel: 'Overdue', lastUpdate: '4 hr ago' },
      { assignee: 'Jamie L.', avatar: 'JL', task: 'Complete Henderson onboarding setup phase', project: 'Henderson Consulting', dueDate: 'Mar 7', status: 'in-progress', statusLabel: 'In Progress', lastUpdate: '1 day ago' },
      { assignee: 'Chris M.', avatar: 'CM', task: 'Send payment reminders for 3 overdue invoices', project: 'Finance / QuickBooks', dueDate: 'Tomorrow', status: 'pending', statusLabel: 'Pending', lastUpdate: '3 days ago' },
      { assignee: 'Lisa C.', avatar: 'LC', task: 'Prepare Q1 board presentation slides', project: 'Internal Ops', dueDate: 'Mar 12', status: 'in-progress', statusLabel: 'In Progress', lastUpdate: '5 hr ago' },
      { assignee: 'David W.', avatar: 'DW', task: 'Review and approve vendor contracts', project: 'Tax Prep', dueDate: 'Mar 10', status: 'pending', statusLabel: 'Pending', lastUpdate: '2 days ago' },
    ];

    const tasksHtml = delegatedTasks.map(t => `
      <div class="biz-delegated__item">
        <div class="biz-delegated__item-top">
          <div class="biz-delegated__assignee">
            <div class="biz-delegated__avatar">${t.avatar}</div>
            <div class="biz-delegated__assignee-info">
              <span class="biz-delegated__assignee-name">${t.assignee}</span>
              <span class="biz-delegated__project">${t.project}</span>
            </div>
          </div>
          <span class="status-pill status-pill--${t.status}">${t.statusLabel}</span>
        </div>
        <div class="biz-delegated__task-text">${t.task}</div>
        <div class="biz-delegated__item-bottom">
          <span class="biz-delegated__due ${t.status === 'overdue' ? 'biz-delegated__due--overdue' : ''}">Due: ${t.dueDate}</span>
          <span class="biz-delegated__update">Last update: ${t.lastUpdate}</span>
          <button class="biz-delegated__followup-btn">Follow Up</button>
        </div>
      </div>`).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here are all tasks currently delegated to your team members. You can follow up on any of them directly.</p>
    </div>
    <div class="chat-response-card" id="bizNotifCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Delegated Tasks</div>
          <div class="chat-response-card__subtitle">6 tasks across ${delegatedTasks.length} team members</div>
        </div>
      </div>
      <div class="biz-delegated__summary">
        <div class="biz-delegated__summary-stat"><span class="biz-delegated__summary-num" style="color:#059669">3</span><span class="biz-delegated__summary-label">In Progress</span></div>
        <div class="biz-delegated__summary-stat"><span class="biz-delegated__summary-num" style="color:#f59e0b">2</span><span class="biz-delegated__summary-label">Pending</span></div>
        <div class="biz-delegated__summary-stat"><span class="biz-delegated__summary-num" style="color:#ef4444">1</span><span class="biz-delegated__summary-label">Overdue</span></div>
      </div>
      <div class="biz-delegated__list">${tasksHtml}</div>
      <div class="ai-insight">
        <strong>Sarah K.'s</strong> Apex Properties report is 3 days overdue. I recommend following up immediately. <strong>Chris M.</strong> hasn't started on the invoice reminders yet — consider checking in today.
      </div>
    </div>`;
  }

  // --- Biz: Dashboard Thinking/Connecting State ---
  function buildBizDashboardThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Let me pull data from all your connected platforms.</p>
    </div>
    <div class="chat-response-card">
      <div class="connect-seq">
        <div class="connect-seq__item">
          <div class="connect-seq__platform" style="background:#2CA01C">Q</div>
          <span>Connecting to QuickBooks...</span>
          ${CHECK_SVG}
        </div>
        <div class="connect-seq__item">
          <div class="connect-seq__platform" style="background:#7B68EE">C</div>
          <span>Connecting to ClickUp...</span>
          ${CHECK_SVG}
        </div>
        <div class="connect-seq__item">
          <div class="connect-seq__platform" style="background:#4A154B">S</div>
          <span>Connecting to Slack...</span>
          ${CHECK_SVG}
        </div>
      </div>
      <div class="connect-seq__synced">
        <div class="connect-seq__synced-logos">
          <div class="connect-seq__synced-logo" style="background:#2CA01C">Q</div>
          <div class="connect-seq__synced-logo" style="background:#7B68EE">C</div>
          <div class="connect-seq__synced-logo" style="background:#4A154B">S</div>
        </div>
        <span>3 platforms synced</span>
        <span class="connect-seq__synced-text">Last synced: just now</span>
      </div>
    </div>`;
  }

  // ===========================================================
  // SAGE AI (MINDSET COACH) COMPONENT BUILDERS
  // ===========================================================

  // --- Mindset: Multi-Step Onboarding Flow ---
  function buildMindsetOnboarding() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Let's get to know you better. I'll walk you through a few quick steps to personalize your coaching experience.</p>
    </div>
    <div class="chat-response-card" id="mindsetOnboardingCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Coaching Onboarding</div>
          <div class="chat-response-card__subtitle">4 steps to personalize your experience</div>
        </div>
      </div>
      <div class="sage-onboard__steps">
        <div class="sage-onboard__step-indicators">
          <div class="sage-onboard__step-dot sage-onboard__step-dot--active" data-step="1">1</div>
          <div class="sage-onboard__step-line"></div>
          <div class="sage-onboard__step-dot" data-step="2">2</div>
          <div class="sage-onboard__step-line"></div>
          <div class="sage-onboard__step-dot" data-step="3">3</div>
          <div class="sage-onboard__step-line"></div>
          <div class="sage-onboard__step-dot" data-step="4">4</div>
        </div>
      </div>
      <div class="sage-onboard__panels">
        <div class="sage-onboard__panel" data-onboard-step="1">
          <div class="sage-onboard__panel-title">Goals & Desires</div>
          <div class="sage-onboard__panel-desc">What do you most want to achieve or experience in the next 90 days?</div>
          <textarea class="sage-onboard__textarea" placeholder="e.g., Build confidence in social situations, start a side business, improve my relationship..." rows="4"></textarea>
        </div>
        <div class="sage-onboard__panel hidden" data-onboard-step="2">
          <div class="sage-onboard__panel-title">Frustrations & Fears</div>
          <div class="sage-onboard__panel-desc">What's holding you back or causing you stress right now?</div>
          <textarea class="sage-onboard__textarea" placeholder="e.g., I procrastinate on important tasks, I'm afraid of failure, I struggle with boundaries..." rows="4"></textarea>
        </div>
        <div class="sage-onboard__panel hidden" data-onboard-step="3">
          <div class="sage-onboard__panel-title">Your Core Values</div>
          <div class="sage-onboard__panel-desc">Select the values that resonate most with you (choose 3-5):</div>
          <div class="sage-onboard__chips">
            <button class="sage-onboard__chip" data-value="growth">Growth</button>
            <button class="sage-onboard__chip" data-value="connection">Connection</button>
            <button class="sage-onboard__chip" data-value="freedom">Freedom</button>
            <button class="sage-onboard__chip" data-value="authenticity">Authenticity</button>
            <button class="sage-onboard__chip" data-value="security">Security</button>
            <button class="sage-onboard__chip" data-value="creativity">Creativity</button>
            <button class="sage-onboard__chip" data-value="impact">Impact</button>
            <button class="sage-onboard__chip" data-value="health">Health</button>
            <button class="sage-onboard__chip" data-value="adventure">Adventure</button>
            <button class="sage-onboard__chip" data-value="wisdom">Wisdom</button>
            <button class="sage-onboard__chip" data-value="loyalty">Loyalty</button>
            <button class="sage-onboard__chip" data-value="balance">Balance</button>
          </div>
        </div>
        <div class="sage-onboard__panel hidden" data-onboard-step="4">
          <div class="sage-onboard__panel-title">Relationship Dynamics</div>
          <div class="sage-onboard__panel-desc">Which best describes your current relationship focus?</div>
          <div class="sage-onboard__radio-group">
            <label class="sage-onboard__radio"><input type="radio" name="relationship" value="romantic"/> Improving a romantic relationship</label>
            <label class="sage-onboard__radio"><input type="radio" name="relationship" value="family"/> Navigating family dynamics</label>
            <label class="sage-onboard__radio"><input type="radio" name="relationship" value="professional"/> Building professional relationships</label>
            <label class="sage-onboard__radio"><input type="radio" name="relationship" value="self"/> Working on relationship with self</label>
            <label class="sage-onboard__radio"><input type="radio" name="relationship" value="all"/> All of the above</label>
          </div>
        </div>
      </div>
      <div class="sage-onboard__nav">
        <button class="ad-gen__btn ad-gen__btn--secondary sage-onboard__back-btn hidden" id="sageOnboardBack">Back</button>
        <button class="ad-gen__btn ad-gen__btn--primary" id="sageOnboardNext">Next Step</button>
      </div>
    </div>`;
  }

  // --- Mindset: AI Memory Display ---
  function buildMindsetMemoryDisplay() {
    const sections = [
      { title: 'Personal Info', icon: '\uD83D\uDC64', items: ['Name: Jordan M.', 'Age: 34', 'Location: Austin, TX', 'Coaching start: Jan 12, 2026'] },
      { title: 'Goals', icon: '\uD83C\uDFAF', items: ['Build confidence in public speaking', 'Start a coaching side-business by Q3', 'Improve communication with partner', 'Develop daily mindfulness habit'] },
      { title: 'Core Values', icon: '\uD83D\uDC8E', items: ['Growth', 'Authenticity', 'Freedom', 'Connection'] },
      { title: 'Fears & Blocks', icon: '\u26A0\uFE0F', items: ['Fear of being judged', 'Perfectionism causing procrastination', 'Difficulty setting boundaries', 'Imposter syndrome around business goals'] },
      { title: 'Relationship Dynamics', icon: '\uD83D\uDD17', items: ['Married \u2014 working on communication patterns', 'Tends toward anxious attachment style', 'Avoids conflict, then builds resentment', 'Strong bond with 2 close friends'] },
      { title: 'Session Notes', icon: '\uD83D\uDCDD', items: ['Week 6: Breakthrough on public speaking fear \u2014 gave first team presentation', 'Week 5: Explored childhood patterns around perfectionism', 'Week 4: Set first boundary with a friend \u2014 felt guilty but empowered', 'Week 3: Identified imposter syndrome pattern in business planning'] },
    ];

    const sectionsHtml = sections.map(s => `
      <div class="sage-memory__section">
        <div class="sage-memory__section-header">
          <span class="sage-memory__section-icon">${s.icon}</span>
          <span class="sage-memory__section-title">${s.title}</span>
        </div>
        <ul class="sage-memory__list">
          ${s.items.map(i => `<li class="sage-memory__list-item">${i}</li>`).join('')}
        </ul>
      </div>`).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's everything I know about you from our sessions together. You can review and update any section.</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">AI Memory</div>
          <div class="chat-response-card__subtitle">Last updated: Feb 25, 2026</div>
        </div>
      </div>
      <div class="sage-memory__sections">${sectionsHtml}</div>
      <div class="sage-memory__footer">
        <span class="sage-memory__footer-text">6 sessions logged \u00B7 47 data points captured</span>
      </div>
    </div>`;
  }

  // --- Mindset: 30/60/90 Day Plan Generator ---
  function buildMindsetPlanGenerator() {
    const phases = [
      { label: '30 Days', title: 'Foundation', color: '#7c3aed', items: [
        { text: 'Complete daily journaling for 21 consecutive days', done: false },
        { text: 'Practice one boundary-setting conversation per week', done: false },
        { text: 'Attend 2 public speaking meetups (observe only is fine)', done: false },
        { text: 'Start 10-minute morning meditation routine', done: false },
        { text: 'Write out business idea canvas with goals and timeline', done: false },
      ], milestone: 'Milestone: Foundation Assessment \u2014 Review progress and adjust' },
      { label: '60 Days', title: 'Growth', color: '#3b82f6', items: [
        { text: 'Deliver a 5-minute talk at public speaking group', done: false },
        { text: 'Have the conversation you\'ve been avoiding with your partner', done: false },
        { text: 'Launch business landing page and share with 10 people', done: false },
        { text: 'Increase meditation to 20 minutes daily', done: false },
        { text: 'Identify and challenge 3 limiting beliefs in writing', done: false },
      ], milestone: 'Milestone: Growth Checkpoint \u2014 Celebrate wins and recalibrate' },
      { label: '90 Days', title: 'Integration', color: '#059669', items: [
        { text: 'Lead a team meeting or workshop at work', done: false },
        { text: 'Establish regular weekly check-in with partner', done: false },
        { text: 'Enroll first 3 coaching clients or beta testers', done: false },
        { text: 'Complete a 5-day mindfulness retreat or intensive', done: false },
        { text: 'Write a personal mission statement and share it publicly', done: false },
      ], milestone: 'Milestone: Integration Review \u2014 90-day transformation assessment' },
    ];

    const phasesHtml = phases.map((p, i) => {
      const itemsHtml = p.items.map(item => `
        <label class="sage-plan__item">
          <input type="checkbox" class="sage-plan__checkbox" ${item.done ? 'checked' : ''}/>
          <span>${item.text}</span>
        </label>`).join('');
      return `
      <div class="sage-plan__phase ${i === 0 ? 'sage-plan__phase--active' : ''}">
        <div class="sage-plan__phase-header" style="border-left-color:${p.color}">
          <div class="sage-plan__phase-label" style="background:${p.color}15;color:${p.color}">${p.label}</div>
          <span class="sage-plan__phase-title">${p.title}</span>
          <svg class="sage-plan__phase-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="sage-plan__phase-body">
          <div class="sage-plan__items">${itemsHtml}</div>
          <div class="sage-plan__milestone" style="background:${p.color}10;border-left:3px solid ${p.color}">
            <span>\uD83C\uDFC6 ${p.milestone}</span>
          </div>
        </div>
      </div>`;
    }).join('');

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>I've created your personalized 30/60/90 day growth plan based on your profile. Each phase builds on the last.</p>
    </div>
    <div class="chat-response-card" id="sagePlanCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">30/60/90 Day Growth Plan</div>
          <div class="chat-response-card__subtitle">Personalized for Jordan M.</div>
        </div>
      </div>
      <div class="sage-plan__phases" id="sagePlanPhases">${phasesHtml}</div>
    </div>`;
  }

  // --- Mindset: Daily Check-In with Adaptive Questions ---
  function buildMindsetDailyCheckin() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Good morning. Let's do a quick mindset check-in. Take a moment to tune in to how you're feeling right now.</p>
    </div>
    <div class="chat-response-card" id="sageCheckinCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Daily Mindset Check-In</div>
          <div class="chat-response-card__subtitle">Thursday, Feb 27</div>
        </div>
      </div>
      <div class="sage-checkin__questions">
        <div class="sage-checkin__q" data-q="mood">
          <div class="sage-checkin__q-label">How are you feeling right now? (1 = struggling, 10 = thriving)</div>
          <div class="sage-checkin__slider-wrap">
            <input type="range" class="sage-checkin__slider" id="sageMoodSlider" min="1" max="10" value="6" step="1"/>
            <span class="sage-checkin__slider-val" id="sageMoodVal">6 / 10</span>
          </div>
        </div>
        <div class="sage-checkin__q" data-q="sleep">
          <div class="sage-checkin__q-label">How did you sleep last night?</div>
          <div class="sage-checkin__q-options" data-checkin="sleep">
            <button class="trainer-checkin__opt" data-val="great">Great</button>
            <button class="trainer-checkin__opt" data-val="okay">Okay</button>
            <button class="trainer-checkin__opt" data-val="poor">Poor</button>
          </div>
        </div>
        <div class="sage-checkin__q" data-q="energy">
          <div class="sage-checkin__q-label">Energy level right now?</div>
          <div class="sage-checkin__q-options" data-checkin="energy">
            <button class="trainer-checkin__opt" data-val="high">High</button>
            <button class="trainer-checkin__opt" data-val="moderate">Moderate</button>
            <button class="trainer-checkin__opt" data-val="low">Low</button>
          </div>
        </div>
        <div class="sage-checkin__q" data-q="mind">
          <div class="sage-checkin__q-label">What's on your mind today?</div>
          <textarea class="sage-onboard__textarea" id="sageMindText" placeholder="Whatever comes to mind \u2014 no filter needed..." rows="3"></textarea>
        </div>
        <div class="sage-checkin__followup hidden" id="sageCheckinFollowup">
          <div class="sage-checkin__q-label">It sounds like you might be having a tough day. What happened?</div>
          <textarea class="sage-onboard__textarea" id="sageFollowupText" placeholder="Tell me more about what's going on..." rows="3"></textarea>
        </div>
      </div>
      <div class="trainer-checkin__submit-wrap">
        <button class="ad-gen__btn ad-gen__btn--primary" id="sageCheckinSubmit">Complete Check-In</button>
      </div>
    </div>`;
  }

  // --- Mindset: Progress Timeline ---
  function buildMindsetTimeline() {
    const entries = [
      { week: 'Week 1', date: 'Jan 12', mood: 5, emoji: '\uD83D\uDE10', note: 'First session. Feeling uncertain but curious.', breakthrough: false, color: '#f59e0b' },
      { week: 'Week 2', date: 'Jan 19', mood: 4, emoji: '\uD83D\uDE1F', note: 'Tough week. Realized how much I avoid conflict.', breakthrough: false, color: '#ef4444' },
      { week: 'Week 3', date: 'Jan 26', mood: 6, emoji: '\uD83D\uDE42', note: 'Identified imposter syndrome pattern. Felt seen.', breakthrough: false, color: '#f59e0b' },
      { week: 'Week 4', date: 'Feb 2', mood: 7, emoji: '\uD83D\uDE0A', note: 'Set first boundary with a friend. Scary but empowering.', breakthrough: true, color: '#059669' },
      { week: 'Week 5', date: 'Feb 9', mood: 5, emoji: '\uD83D\uDE14', note: 'Explored childhood patterns. Emotionally heavy.', breakthrough: false, color: '#f59e0b' },
      { week: 'Week 6', date: 'Feb 16', mood: 8, emoji: '\uD83D\uDE04', note: 'Gave first team presentation. Huge confidence boost!', breakthrough: true, color: '#059669' },
      { week: 'Week 7', date: 'Feb 23', mood: 7, emoji: '\uD83D\uDE0A', note: 'Started daily meditation practice. Feeling more grounded.', breakthrough: false, color: '#059669' },
      { week: 'Week 8', date: 'Feb 27', mood: 8, emoji: '\uD83C\uDF1F', note: 'Shared business idea publicly. Positive response!', breakthrough: true, color: '#059669' },
    ];

    const entriesHtml = entries.map((e, i) => `
      <div class="sage-timeline__entry ${e.breakthrough ? 'sage-timeline__entry--breakthrough' : ''}">
        <div class="sage-timeline__line-segment">
          <div class="sage-timeline__dot" style="background:${e.color}"></div>
          ${i < entries.length - 1 ? '<div class="sage-timeline__connector"></div>' : ''}
        </div>
        <div class="sage-timeline__content">
          <div class="sage-timeline__header">
            <span class="sage-timeline__week">${e.week}</span>
            <span class="sage-timeline__date">${e.date}</span>
            <span class="sage-timeline__mood">${e.emoji} ${e.mood}/10</span>
            ${e.breakthrough ? '<span class="sage-timeline__badge">Breakthrough</span>' : ''}
          </div>
          <div class="sage-timeline__note">${e.note}</div>
        </div>
      </div>`).join('');

    // Trend data
    const moods = entries.map(e => e.mood);
    const avg = (moods.reduce((a, b) => a + b, 0) / moods.length).toFixed(1);
    const trend = moods[moods.length - 1] > moods[0] ? 'Upward' : 'Stable';

    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's your mindset journey over the past 8 weeks. You've made meaningful progress.</p>
    </div>
    <div class="chat-response-card">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Progress Timeline</div>
          <div class="chat-response-card__subtitle">8 weeks \u00B7 3 breakthroughs</div>
        </div>
      </div>
      <div class="sage-timeline__trend">
        <div class="sage-timeline__trend-item"><span class="sage-timeline__trend-label">Avg Mood</span><span class="sage-timeline__trend-val">${avg}/10</span></div>
        <div class="sage-timeline__trend-item"><span class="sage-timeline__trend-label">Trend</span><span class="sage-timeline__trend-val sage-timeline__trend-val--up">\u2191 ${trend}</span></div>
        <div class="sage-timeline__trend-item"><span class="sage-timeline__trend-label">Breakthroughs</span><span class="sage-timeline__trend-val">3</span></div>
      </div>
      <div class="sage-timeline__entries">${entriesHtml}</div>
      <div class="ai-insight">
        Your overall mood trend is <strong>upward</strong>, moving from 5/10 to 8/10 over 8 weeks. Your breakthroughs cluster around <strong>boundary-setting</strong> and <strong>public self-expression</strong> \u2014 both areas tied to your core value of authenticity. The dip in Week 5 was expected after deep emotional work and was followed by your biggest breakthrough yet in Week 6.
      </div>
    </div>`;
  }

  // --- Mindset: Onboarding Thinking State ---
  function buildMindsetOnboardingThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Let me set up your personalized coaching experience.</p>
    </div>
    <div class="chat-response-card">
      <div class="mindset__thinking">
        <div class="mindset__thinking-icon uni-pulse-ring">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="mindset__thinking-text">Preparing your onboarding experience...</span>
        <div class="mindset__thinking-steps">
          <div class="mindset__thinking-step">${CHECK_SVG} Loading coaching framework</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Preparing personalization questions</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Setting up your profile...</div>
        </div>
        <div class="mindset__progress"><div class="mindset__progress-fill"></div></div>
      </div>
    </div>`;
  }

  // --- Mindset: Memory Loading State ---
  function buildMindsetMemoryThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Let me pull up everything I know about you.</p>
    </div>
    <div class="chat-response-card">
      <div class="mindset__thinking">
        <div class="mindset__thinking-icon uni-pulse-ring">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="mindset__thinking-text">Loading your AI memory...</span>
        <div class="mindset__thinking-steps">
          <div class="mindset__thinking-step">${CHECK_SVG} Retrieving session history</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Loading personal profile</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Compiling coaching insights...</div>
        </div>
        <div class="mindset__progress"><div class="mindset__progress-fill"></div></div>
      </div>
    </div>`;
  }

  // DEMO 5: SALES COACH AI — CALL SCORECARD
  // ===========================================================
  
  // --- Call Scorecard: Thinking State ---
  function buildCallScorecardThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Analyzing your call transcript...</p>
    </div>
    <div class="chat-response-card">
      <div class="mindset__thinking">
        <div class="mindset__thinking-icon uni-pulse-ring" style="background:rgba(220,38,38,0.08)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:#dc2626">
            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="mindset__thinking-text">Analyzing your call transcript...</span>
        <div class="mindset__thinking-steps">
          <div class="mindset__thinking-step">${CHECK_SVG} Parsing conversation segments</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Scoring discovery quality</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Evaluating objection handling</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Generating detailed scorecard...</div>
        </div>
        <div class="mindset__progress"><div class="mindset__progress-fill"></div></div>
      </div>
    </div>`;
  }
  
  // --- Call Scorecard: Full Analysis ---
  function buildCallScorecard() {
    const categories = [
      {
        name: 'Discovery Quality', score: 82, grade: 'A-',
        color: '#106844',
        quote: '"Tell me more about the challenges your team is facing with onboarding..."',
        timestamp: '4:23',
        tip: 'Strong open-ended questioning. Try going one level deeper: ask "What does that cost you?" after they share a pain point.',
      },
      {
        name: 'Objection Handling', score: 65, grade: 'C+',
        color: '#f59e0b',
        quote: '"I understand the budget concern. Let me show you the ROI numbers..."',
        timestamp: '22:15',
        tip: 'You jumped to ROI too quickly. First acknowledge the emotion behind the objection, then use the "Feel, Felt, Found" framework.',
      },
      {
        name: 'Value Articulation', score: 78, grade: 'B+',
        color: '#106844',
        quote: '"Our clients typically see a 3x reduction in onboarding time within the first 90 days."',
        timestamp: '15:42',
        tip: 'Good use of quantified outcomes. Strengthen by tying the value specifically to THEIR situation: "Based on your 50 new hires/quarter..."',
      },
      {
        name: 'Close Attempts', score: 58, grade: 'C',
        color: '#dc2626',
        quote: '"So, um, would you want to maybe think about moving forward with this?"',
        timestamp: '28:30',
        tip: 'Weak assumptive close. Replace with: "Based on everything we discussed, the Standard plan fits your needs. Should we set up onboarding for your team next Tuesday?"',
      },
      {
        name: 'Rapport Building', score: 88, grade: 'A',
        color: '#106844',
        quote: '"I saw your team just won the Q3 innovation award \u2014 congrats! That tells me you value..."',
        timestamp: '1:12',
        tip: 'Excellent personalization. You researched the prospect and wove it naturally into the conversation. Keep doing this.',
      },
      {
        name: 'Next Steps', score: 72, grade: 'B-',
        color: '#f59e0b',
        quote: '"I\'ll send over a proposal and we can reconnect sometime next week."',
        timestamp: '30:45',
        tip: 'Too vague. Always pin down a specific date and time: "I\'ll send the proposal by EOD. Let\'s book 15 min Thursday at 2pm to review together."',
      },
    ];
  
    const categoriesHtml = categories.map((c, i) => `
      <div class="scorecard__category" data-category="${i}">
        <div class="scorecard__category-header">
          <div class="scorecard__category-info">
            <span class="scorecard__category-name">${c.name}</span>
            <span class="scorecard__category-grade" style="color:${c.color}">${c.grade}</span>
          </div>
          <div class="scorecard__category-score">
            <div class="scorecard__category-bar">
              <div class="scorecard__category-bar-fill" style="width:${c.score}%;background:${c.color}"></div>
            </div>
            <span class="scorecard__category-value">${c.score}</span>
          </div>
          <svg class="scorecard__category-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 6l3 3 3-3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="scorecard__category-detail">
          <div class="scorecard__quote">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9.5V7a3 3 0 013-3h.5M8 9.5V7a3 3 0 013-3h.5" stroke-linecap="round"/></svg>
            <div>
              <span class="scorecard__quote-text">${c.quote}</span>
              <span class="scorecard__quote-time">${c.timestamp}</span>
            </div>
          </div>
          <div class="scorecard__tip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span>${c.tip}</span>
          </div>
        </div>
      </div>
    `).join('');
  
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>I've analyzed your discovery call transcript. Here's a detailed breakdown with specific moments and coaching tips for each area.</p>
    </div>
    <div class="chat-response-card" id="scorecardCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Call Scorecard</div>
          <div class="chat-response-card__subtitle">Discovery Call &middot; Dec 15, 2024 &middot; 32 min</div>
        </div>
      </div>
      <div class="scorecard__overview">
        <div class="scorecard__overall">
          <div class="scorecard__overall-ring">
            <svg viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(26,26,26,0.06)" stroke-width="6"/>
              <circle cx="40" cy="40" r="34" fill="none" stroke="#f59e0b" stroke-width="6"
                stroke-dasharray="${2 * Math.PI * 34}"
                stroke-dashoffset="${2 * Math.PI * 34 * (1 - 0.74)}"
                transform="rotate(-90 40 40)"
                stroke-linecap="round"/>
            </svg>
            <div class="scorecard__overall-center">
              <span class="scorecard__overall-value">74</span>
              <span class="scorecard__overall-max">/100</span>
            </div>
          </div>
          <div class="scorecard__overall-detail">
            <span class="scorecard__overall-grade">Grade: B</span>
            <span class="scorecard__overall-desc">Solid discovery and rapport, but your close and objection handling need targeted work. You're leaving revenue on the table.</span>
          </div>
        </div>
      </div>
      <div class="scorecard__categories">
        ${categoriesHtml}
      </div>
      <div class="chat-response-card__footer">
        <button class="scorecard__transcript-btn" id="scorecardTranscriptBtn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          View Full Transcript
        </button>
      </div>
    </div>`;
  }
  
  // --- Call History ---
  function buildCallHistory() {
    const calls = [
      { date: 'Dec 15', client: 'Sarah Mitchell', type: 'Discovery', score: 74, trend: 'up', best: 'Rapport Building (88)', worst: 'Close Attempts (58)' },
      { date: 'Dec 12', client: 'James Chen', type: 'Demo', score: 81, trend: 'up', best: 'Value Articulation (90)', worst: 'Next Steps (68)' },
      { date: 'Dec 8', client: 'TechFlow Inc.', type: 'Closing', score: 69, trend: 'down', best: 'Discovery Quality (85)', worst: 'Objection Handling (52)' },
      { date: 'Dec 4', client: 'Maria Rodriguez', type: 'Discovery', score: 72, trend: 'same', best: 'Rapport Building (82)', worst: 'Close Attempts (55)' },
      { date: 'Nov 29', client: 'DataPeak Solutions', type: 'Demo', score: 78, trend: 'up', best: 'Value Articulation (88)', worst: 'Next Steps (64)' },
      { date: 'Nov 25', client: 'Alex Novak', type: 'Closing', score: 85, trend: 'up', best: 'Close Attempts (92)', worst: 'Discovery Quality (72)' },
    ];
  
    const trendIcons = {
      up: '<svg class="callhist__trend callhist__trend--up" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 9l4-4 4 4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      down: '<svg class="callhist__trend callhist__trend--down" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      same: '<svg class="callhist__trend callhist__trend--same" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 6h8" stroke-linecap="round"/></svg>',
    };
  
    const callsHtml = calls.map(c => `
      <div class="callhist__item">
        <div class="callhist__item-left">
          <span class="callhist__date">${c.date}</span>
          <div class="callhist__client-info">
            <span class="callhist__client">${c.client}</span>
            <span class="callhist__type callhist__type--${c.type.toLowerCase()}">${c.type}</span>
          </div>
        </div>
        <div class="callhist__item-right">
          <div class="callhist__score-wrap">
            <span class="callhist__score">${c.score}</span>
            ${trendIcons[c.trend]}
          </div>
        </div>
      </div>
    `).join('');
  
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's your recent call performance. Your average score is trending upward, especially in rapport and value articulation.</p>
    </div>
    <div class="chat-response-card" id="callHistoryCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Call Performance History</div>
          <div class="chat-response-card__subtitle">Last 6 calls &middot; Nov 25 &ndash; Dec 15</div>
        </div>
      </div>
      <div class="callhist__summary">
        <div class="callhist__summary-stat">
          <span class="callhist__summary-number">76.5</span>
          <span class="callhist__summary-label">Avg Score</span>
        </div>
        <div class="callhist__summary-stat">
          <span class="callhist__summary-number callhist__summary-number--up">+8.2%</span>
          <span class="callhist__summary-label">vs. Prior Period</span>
        </div>
        <div class="callhist__summary-stat">
          <span class="callhist__summary-number">Rapport</span>
          <span class="callhist__summary-label">Best Category</span>
        </div>
        <div class="callhist__summary-stat">
          <span class="callhist__summary-number callhist__summary-number--down">Close</span>
          <span class="callhist__summary-label">Needs Work</span>
        </div>
      </div>
      <div class="callhist__filters">
        <button class="callhist__filter callhist__filter--active">All</button>
        <button class="callhist__filter">Discovery</button>
        <button class="callhist__filter">Demo</button>
        <button class="callhist__filter">Closing</button>
      </div>
      <div class="callhist__list">
        ${callsHtml}
      </div>
    </div>`;
  }
  
  // --- Sales Playbook ---
  function buildSalesPlaybook() {
    const sections = [
      {
        title: 'Discovery Framework',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        items: [
          'Open with a pattern interrupt: "Most sales reps ask about budget first. I want to understand what\'s actually broken."',
          'Use the 3-Layer Deep technique: Surface problem, business impact, emotional cost.',
          'Mirror their language back: "You said \'drowning in manual processes.\' What does that look like day-to-day?"',
          'Close discovery with a priority stack: "Of everything we discussed, what would move the needle most?"',
        ],
        tip: 'The best discovery calls feel like a conversation, not an interrogation. Aim for a 30/70 talk ratio (you/them).',
      },
      {
        title: 'Objection Handling Scripts',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        items: [
          '"Too expensive" \u2192 "Help me understand \u2014 too expensive compared to what? The cost of the problem, or another solution?"',
          '"Need to think about it" \u2192 "Totally fair. What specific questions do you want answered before deciding? Let\'s address them now."',
          '"We\'re happy with our current vendor" \u2192 "That\'s great. What would they need to stop doing for you to start looking elsewhere?"',
          '"Send me an email" \u2192 "Happy to. So I send something relevant \u2014 what\'s the #1 thing you\'d want to see in there?"',
        ],
        tip: 'Every objection is a buying signal in disguise. They wouldn\'t object if they weren\'t considering.',
      },
      {
        title: 'Value Propositions',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0l-4.725 2.885a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        items: [
          'Lead with outcomes, not features: "Clients cut onboarding time by 67%" not "We have an onboarding module."',
          'Use their math: "At 50 hires/quarter and 20 hours each, that\'s 1,000 hours. We bring that to 330."',
          'Stack proof: customer story + data point + third-party validation.',
          'Create urgency with cost-of-inaction: "Every month you wait costs roughly $34,000 in lost productivity."',
        ],
        tip: 'The best value prop connects their specific pain to a quantified outcome. Generic ROI stats convince nobody.',
      },
      {
        title: 'Closing Techniques',
        icon: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 8l5 5L14 3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        items: [
          'Assumptive close: "Based on what you shared, the Growth plan is the right fit. Should we start onboarding your team Monday?"',
          'Alternative close: "Would you prefer to start with the pilot program, or go straight to full deployment?"',
          'Summary close: Restate their 3 biggest pain points and map each to your solution before asking.',
          'Urgency close: "We have implementation slots opening in January. To lock that in, we\'d need your go-ahead by Friday."',
        ],
        tip: 'Close early and close often. If you\'ve built enough value, asking for the business is a service, not a pressure tactic.',
      },
    ];
  
    const sectionsHtml = sections.map((s, i) => `
      <div class="playbook__section ${i === 0 ? 'playbook__section--open' : ''}" data-section="${i}">
        <div class="playbook__section-header">
          <div class="playbook__section-icon">${s.icon}</div>
          <span class="playbook__section-title">${s.title}</span>
          <svg class="playbook__section-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 6l3 3 3-3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="playbook__section-body">
          <ul class="playbook__list">
            ${s.items.map(item => `<li class="playbook__list-item">${item}</li>`).join('')}
          </ul>
          <div class="playbook__tip">
            <div class="playbook__tip-badge">Coach's Tip</div>
            <span>${s.tip}</span>
          </div>
        </div>
      </div>
    `).join('');
  
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's the complete sales playbook I coach from. These frameworks are built from analyzing 2,400+ recorded sales calls across SaaS, services, and coaching businesses.</p>
    </div>
    <div class="chat-response-card" id="playbookCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Sales Playbook</div>
          <div class="chat-response-card__subtitle">Your Coach's Framework &middot; 4 sections</div>
        </div>
      </div>
      <div class="playbook__body">
        ${sectionsHtml}
      </div>
    </div>`;
  }
  
  
  // ===========================================================
  // DEMO 6: REAL ESTATE COACH AI — CMA BUILDER
  // ===========================================================
  
  // --- CMA Report: Thinking State ---
  function buildCmaThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Pulling MLS data and analyzing comparables...</p>
    </div>
    <div class="chat-response-card">
      <div class="mindset__thinking">
        <div class="mindset__thinking-icon uni-pulse-ring" style="background:rgba(8,145,178,0.08)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:#0891b2">
            <path d="M3 21h18M3 7v1a3 3 0 006 0V7m0 0V4h4v3m0 0v1a3 3 0 006 0V7m0 0V4M9 21V10m6 11V10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="mindset__thinking-text">Pulling MLS data and analyzing comparables...</span>
        <div class="mindset__thinking-steps">
          <div class="mindset__thinking-step">${CHECK_SVG} Searching MLS records</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Identifying comparable properties</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Calculating adjustments</div>
          <div class="mindset__thinking-step">${CHECK_SVG} Building CMA report...</div>
        </div>
        <div class="mindset__progress"><div class="mindset__progress-fill"></div></div>
      </div>
    </div>`;
  }
  
  // --- CMA Report: Full Report ---
  function buildCmaReport() {
    const comps = [
      { address: '718 Maple Dr', beds: 4, baths: 2.5, sqft: '2,350', price: '$392,000', date: 'Nov 12, 2024', dist: '0.3 mi', adj: '+$8,000', adjNote: '+sqft, -garage', adjPrice: '$400,000' },
      { address: '805 Oak Ln', beds: 4, baths: 3, sqft: '2,520', price: '$415,000', date: 'Oct 28, 2024', dist: '0.5 mi', adj: '-$12,000', adjNote: '-bath, -lot size', adjPrice: '$403,000' },
      { address: '331 Birch Ave', beds: 3, baths: 2.5, sqft: '2,280', price: '$378,000', date: 'Nov 20, 2024', dist: '0.4 mi', adj: '+$18,000', adjNote: '+bed, +sqft', adjPrice: '$396,000' },
      { address: '422 Cedar Ct', beds: 4, baths: 2, sqft: '2,440', price: '$401,000', date: 'Sep 15, 2024', dist: '0.6 mi', adj: '+$5,000', adjNote: '+bath, -age', adjPrice: '$406,000' },
    ];
  
    const compsHtml = comps.map(c => `
      <tr class="cma__comp-row">
        <td class="cma__comp-cell cma__comp-cell--address">${c.address}</td>
        <td class="cma__comp-cell">${c.beds}/${c.baths} &middot; ${c.sqft}</td>
        <td class="cma__comp-cell cma__comp-cell--price">${c.price}</td>
        <td class="cma__comp-cell">${c.date}</td>
        <td class="cma__comp-cell">${c.dist}</td>
        <td class="cma__comp-cell">
          <span class="cma__adj-badge">${c.adj}</span>
          <span class="cma__adj-note">${c.adjNote}</span>
        </td>
        <td class="cma__comp-cell cma__comp-cell--adjusted">${c.adjPrice}</td>
      </tr>
    `).join('');
  
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>I've pulled the latest MLS data and built a full CMA for 742 Evergreen Terrace. Here's the complete analysis with four strong comparables.</p>
    </div>
    <div class="chat-response-card" id="cmaCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Comparative Market Analysis</div>
          <div class="chat-response-card__subtitle">742 Evergreen Terrace, Springfield</div>
        </div>
      </div>
      <div class="cma__subject">
        <div class="cma__subject-header">Subject Property</div>
        <div class="cma__subject-details">
          <div class="cma__subject-stat">
            <span class="cma__subject-stat-value">4</span>
            <span class="cma__subject-stat-label">Beds</span>
          </div>
          <div class="cma__subject-stat">
            <span class="cma__subject-stat-value">2.5</span>
            <span class="cma__subject-stat-label">Baths</span>
          </div>
          <div class="cma__subject-stat">
            <span class="cma__subject-stat-value">2,400</span>
            <span class="cma__subject-stat-label">Sq Ft</span>
          </div>
          <div class="cma__subject-stat">
            <span class="cma__subject-stat-value">1998</span>
            <span class="cma__subject-stat-label">Built</span>
          </div>
          <div class="cma__subject-stat">
            <span class="cma__subject-stat-value">0.28</span>
            <span class="cma__subject-stat-label">Acres</span>
          </div>
        </div>
      </div>
      <div class="cma__estimate">
        <div class="cma__estimate-label">Estimated Value Range</div>
        <div class="cma__estimate-range">
          <span class="cma__estimate-low">$385,000</span>
          <div class="cma__estimate-bar">
            <div class="cma__estimate-bar-fill"></div>
            <div class="cma__estimate-bar-marker">
              <span>$401,250</span>
            </div>
          </div>
          <span class="cma__estimate-high">$415,000</span>
        </div>
        <div class="cma__estimate-note">AI-recommended listing price: <strong>$399,900</strong></div>
      </div>
      <div class="cma__comps">
        <div class="cma__comps-title">Comparable Properties</div>
        <div class="cma__comps-table-wrap">
          <table class="cma__comps-table">
            <thead>
              <tr>
                <th>Address</th>
                <th>Bed/Bath/SqFt</th>
                <th>Sold Price</th>
                <th>Sold Date</th>
                <th>Distance</th>
                <th>Adjustments</th>
                <th>Adj. Price</th>
              </tr>
            </thead>
            <tbody>
              ${compsHtml}
            </tbody>
          </table>
        </div>
      </div>
      <div class="cma__notes">
        <div class="cma__notes-title">Adjustment Notes</div>
        <ul class="cma__notes-list">
          <li>Square footage adjusted at $85/sq ft based on local market premium</li>
          <li>Half-bath addition/removal adjusted at $6,000</li>
          <li>Bedroom count adjusted at $12,000 per bedroom</li>
          <li>Time adjustment: +1.2% per month for sales older than 60 days (seller's market appreciation)</li>
        </ul>
      </div>
      <div class="ai-insight">
        The adjusted comp range is tight ($396K\u2013$406K), giving us high confidence in the $399,900 listing recommendation. The property's strongest comp is <strong>718 Maple Dr</strong> (nearly identical specs, sold 6 weeks ago, 0.3 miles away). I'd recommend listing at $399,900 to attract multiple offers in the current seller's market, with room to negotiate to $395K\u2013$405K depending on buyer competition.
      </div>
      <div class="chat-response-card__footer cma__footer">
        <button class="cma__export-btn" id="cmaExportBtn">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 14h8M8 2v9M5 5l3-3 3 3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Export Report
        </button>
        <button class="cma__share-btn" id="cmaShareBtn">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 8v5a1 1 0 001 1h6a1 1 0 001-1V8M11 4l-3-3-3 3M8 1v9" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Share with Client
        </button>
      </div>
    </div>`;
  }
  
  // --- Comparable Properties ---
  function buildComparables() {
    const properties = [
      {
        address: '718 Maple Dr, Springfield',
        beds: 4, baths: 2.5, sqft: '2,350', yearBuilt: 1996,
        price: '$392,000', pricePerSqft: '$167',
        dom: 8, status: 'Sold',
        features: ['Updated kitchen (2021)', 'Hardwood floors', 'Single-car garage', '0.25 acres'],
      },
      {
        address: '805 Oak Ln, Springfield',
        beds: 4, baths: 3, sqft: '2,520', yearBuilt: 2001,
        price: '$415,000', pricePerSqft: '$165',
        dom: 12, status: 'Sold',
        features: ['Full basement finished', 'Solar panels', '2-car garage', '0.32 acres'],
      },
      {
        address: '331 Birch Ave, Springfield',
        beds: 3, baths: 2.5, sqft: '2,280', yearBuilt: 1999,
        price: '$378,000', pricePerSqft: '$166',
        dom: 15, status: 'Sold',
        features: ['New roof (2023)', 'Open floor plan', 'Fenced yard', '0.22 acres'],
      },
      {
        address: '422 Cedar Ct, Springfield',
        beds: 4, baths: 2, sqft: '2,440', yearBuilt: 1994,
        price: '$401,000', pricePerSqft: '$164',
        dom: 22, status: 'Sold',
        features: ['Pool', 'Corner lot', 'Original kitchen', '0.30 acres'],
      },
    ];
  
    const propsHtml = properties.map(p => `
      <div class="comp__card">
        <div class="comp__card-header">
          <div class="comp__card-address">${p.address}</div>
          <span class="comp__card-status comp__card-status--${p.status.toLowerCase()}">${p.status}</span>
        </div>
        <div class="comp__card-stats">
          <div class="comp__card-stat">
            <span class="comp__card-stat-value">${p.beds}bd/${p.baths}ba</span>
          </div>
          <div class="comp__card-stat">
            <span class="comp__card-stat-value">${p.sqft} sqft</span>
          </div>
          <div class="comp__card-stat">
            <span class="comp__card-stat-value">${p.yearBuilt}</span>
          </div>
        </div>
        <div class="comp__card-price-row">
          <div>
            <span class="comp__card-price">${p.price}</span>
            <span class="comp__card-ppsf">${p.pricePerSqft}/sqft</span>
          </div>
          <div class="comp__card-dom">${p.dom} DOM</div>
        </div>
        <div class="comp__card-features">
          ${p.features.map(f => `<span class="comp__card-feature">${f}</span>`).join('')}
        </div>
      </div>
    `).join('');
  
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here are the four strongest comparables I found for 742 Evergreen Terrace. All are within 0.6 miles and sold in the last 90 days.</p>
    </div>
    <div class="chat-response-card" id="comparablesCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Comparable Properties</div>
          <div class="chat-response-card__subtitle">4 properties &middot; Within 0.6 mi &middot; Last 90 days</div>
        </div>
      </div>
      <div class="comp__filters">
        <button class="comp__filter">Active</button>
        <button class="comp__filter">Pending</button>
        <button class="comp__filter comp__filter--active">Sold</button>
      </div>
      <div class="comp__grid">
        ${propsHtml}
      </div>
    </div>`;
  }
  
  // --- Market Trends ---
  function buildMarketTrends() {
    const metrics = [
      { label: 'Median Price', value: '$398K', change: '+5.2%', direction: 'up' },
      { label: 'Avg Days on Market', value: '18', change: '-3 days', direction: 'down-good' },
      { label: 'Active Inventory', value: '2.1 mo', change: '-0.4 mo', direction: 'down-good' },
      { label: 'List-to-Sale Ratio', value: '98.7%', change: '+0.8%', direction: 'up' },
    ];
  
    const metricsHtml = metrics.map(m => {
      const arrowSvg = m.direction.includes('up')
        ? '<svg class="market__metric-arrow market__metric-arrow--up" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 9l4-4 4 4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        : '<svg class="market__metric-arrow market__metric-arrow--down-good" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      return `
      <div class="market__metric">
        <span class="market__metric-label">${m.label}</span>
        <span class="market__metric-value">${m.value}</span>
        <div class="market__metric-change ${m.direction.includes('good') ? 'market__metric-change--positive' : m.direction === 'up' ? 'market__metric-change--positive' : 'market__metric-change--negative'}">
          ${arrowSvg}
          <span>${m.change}</span>
        </div>
      </div>`;
    }).join('');
  
    const months = [
      { month: 'Jul 2024', median: '$378K', dom: 22, inventory: '2.8 mo', ratio: '97.2%' },
      { month: 'Aug 2024', median: '$382K', dom: 21, inventory: '2.6 mo', ratio: '97.5%' },
      { month: 'Sep 2024', median: '$385K', dom: 20, inventory: '2.4 mo', ratio: '97.9%' },
      { month: 'Oct 2024', median: '$390K', dom: 19, inventory: '2.3 mo', ratio: '98.1%' },
      { month: 'Nov 2024', median: '$395K', dom: 18, inventory: '2.2 mo', ratio: '98.4%' },
      { month: 'Dec 2024', median: '$398K', dom: 18, inventory: '2.1 mo', ratio: '98.7%' },
    ];
  
    const tableRowsHtml = months.map(m => `
      <tr class="market__table-row">
        <td class="market__table-cell">${m.month}</td>
        <td class="market__table-cell">${m.median}</td>
        <td class="market__table-cell">${m.dom}</td>
        <td class="market__table-cell">${m.inventory}</td>
        <td class="market__table-cell">${m.ratio}</td>
      </tr>
    `).join('');
  
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's the Springfield market overview. It's a strong seller's market with rising prices and shrinking inventory. Great time to list.</p>
    </div>
    <div class="chat-response-card" id="marketTrendsCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Springfield Market Trends</div>
          <div class="chat-response-card__subtitle">Jul 2024 &ndash; Dec 2024</div>
        </div>
        <div class="market__badge">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 9l4-4 4 4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Seller's Market
        </div>
      </div>
      <div class="market__metrics">
        ${metricsHtml}
      </div>
      <div class="market__table-section">
        <div class="market__table-title">Monthly Breakdown</div>
        <div class="market__table-wrap">
          <table class="market__table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Median Price</th>
                <th>Avg DOM</th>
                <th>Inventory</th>
                <th>List/Sale</th>
              </tr>
            </thead>
            <tbody>
              ${tableRowsHtml}
            </tbody>
          </table>
        </div>
      </div>
      <div class="ai-insight">
        Springfield has been in a steady <strong>seller's market</strong> for 6+ months. Median prices are up 5.2% ($20K) since July, inventory is tightening (2.1 months vs. the balanced market threshold of 4\u20136 months), and homes are selling within 2% of list price. If your client lists now, they're entering the market with strong pricing power. I'd recommend pricing aggressively at $399,900 to drive multiple offers.
      </div>
    </div>`;
  }
  
  
  // ===========================================================
  // ============================================================
  // BATCH 3 — Demo 7: DealFlow AI (txcoord)
  //           Demo 8: LeadIQ AI (executive)
  //           Demo 9: WealthIQ AI (finance)
  // ============================================================
  
  const CHECK_SVG_B3 = '<svg class="connect-seq__check" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 7l3 3 6-6.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  
  // ===========================================================
  // DEMO 7 — DealFlow AI: Transaction Coordinator
  // ===========================================================
  
  // --- Thinking State: Transaction Pipeline ---
  function buildTransactionThinking() {
    return `
      <div class="message-ai-text message-ai-text--spaced">
        <p>Loading your transaction pipeline...</p>
      </div>
      <div class="chat-response-card">
        <div class="txcoord__thinking">
          <div class="txcoord__thinking-icon uni-pulse-ring">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke-linecap="round"/>
              <path d="M9 14l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="txcoord__thinking-text">Loading your transaction pipeline...</span>
          <div class="txcoord__thinking-steps">
            <div class="txcoord__thinking-step">${CHECK_SVG_B3} Fetching active transactions</div>
            <div class="txcoord__thinking-step">${CHECK_SVG_B3} Loading deadlines &amp; milestones</div>
            <div class="txcoord__thinking-step">${CHECK_SVG_B3} Checking document statuses</div>
            <div class="txcoord__thinking-step">${CHECK_SVG_B3} Calculating pipeline metrics...</div>
          </div>
          <div class="txcoord__progress"><div class="txcoord__progress-fill"></div></div>
        </div>
      </div>`;
  }
  
  // --- Component 1: Active Transaction Dashboard ---
  function buildTransactionDashboard() {
    const transactions = [
      { address: '1247 Oak Grove Dr, Austin TX', buyer: 'Johnson Family', seller: 'Martinez Estate', stage: 'Inspection', stageIdx: 1, progress: 45, daysToClose: 28, status: 'on-track', statusLabel: 'On Track' },
      { address: '892 Maple Creek Ln, Round Rock TX', buyer: 'Chen & Associates', seller: 'Williams Trust', stage: 'Appraisal', stageIdx: 2, progress: 65, daysToClose: 18, status: 'on-track', statusLabel: 'On Track' },
      { address: '3501 Riverside Blvd #204, Austin TX', buyer: 'Sarah Mitchell', seller: 'Cornerstone Dev.', stage: 'Closing', stageIdx: 3, progress: 88, daysToClose: 5, status: 'urgent', statusLabel: 'Urgent' },
      { address: '710 Bluebonnet Way, Cedar Park TX', buyer: 'Davis Family', seller: 'Patel Holdings', stage: 'Contract', stageIdx: 0, progress: 20, daysToClose: 42, status: 'at-risk', statusLabel: 'At Risk' },
      { address: '4420 Summit Ridge Dr, Lakeway TX', buyer: 'Thompson LLC', seller: 'Greenfield Homes', stage: 'Closing', stageIdx: 3, progress: 92, daysToClose: 3, status: 'on-track', statusLabel: 'On Track' },
    ];
  
    const stages = ['Contract', 'Inspection', 'Appraisal', 'Closing'];
  
    const transactionsHtml = transactions.map(t => {
      const stageDotsHtml = stages.map((s, i) => {
        let cls = 'txcoord__stage-dot';
        if (i < t.stageIdx) cls += ' txcoord__stage-dot--done';
        else if (i === t.stageIdx) cls += ' txcoord__stage-dot--active';
        return `<div class="${cls}"></div>`;
      }).join('');
  
      return `
        <div class="txcoord__transaction">
          <div class="txcoord__transaction-row1">
            <div class="txcoord__transaction-main">
              <div class="txcoord__transaction-address">${t.address}</div>
              <div class="txcoord__transaction-parties">${t.buyer} / ${t.seller}</div>
            </div>
            <span class="status-pill status-pill--${t.status}">${t.statusLabel}</span>
          </div>
          <div class="txcoord__transaction-row2">
            <div class="txcoord__transaction-stage">
              <div class="txcoord__stage-dots">${stageDotsHtml}</div>
              <span class="txcoord__stage-label">${t.stage}</span>
            </div>
            <div class="txcoord__transaction-progress">
              <div class="txcoord__progress-bar">
                <div class="txcoord__progress-bar-fill txcoord__progress-bar-fill--${t.status}" style="width:${t.progress}%"></div>
              </div>
              <span class="txcoord__progress-pct">${t.progress}%</span>
            </div>
            <div class="txcoord__transaction-days">${t.daysToClose} days</div>
          </div>
        </div>`;
    }).join('');
  
    return `
      <div class="message-ai-text message-ai-text--spaced">
        <p>Here's your active transaction pipeline. You have 5 deals in progress with 2 closing this month.</p>
      </div>
      <div class="chat-response-card">
        <div class="chat-response-card__header">
          <div>
            <div class="chat-response-card__title">Active Transactions</div>
            <div class="chat-response-card__subtitle">5 deals \u00B7 2 closing this month</div>
          </div>
          <div class="toggle-pill" data-toggle="txcoord-filter">
            <button class="toggle-pill__btn toggle-pill__btn--active" data-value="all">All</button>
            <button class="toggle-pill__btn" data-value="buyer">Buyer Side</button>
            <button class="toggle-pill__btn" data-value="seller">Seller Side</button>
          </div>
        </div>
        <div class="txcoord__stats">
          <div class="txcoord__stat">
            <span class="txcoord__stat-value">$2.1M</span>
            <span class="txcoord__stat-label">Total Volume</span>
          </div>
          <div class="txcoord__stat">
            <span class="txcoord__stat-value">32</span>
            <span class="txcoord__stat-label">Avg Days to Close</span>
          </div>
          <div class="txcoord__stat">
            <span class="txcoord__stat-value">94%</span>
            <span class="txcoord__stat-label">On-time Rate</span>
          </div>
        </div>
        <div class="txcoord__stage-legend">
          <span class="txcoord__stage-legend-item">Contract</span>
          <span class="txcoord__stage-legend-sep">\u2192</span>
          <span class="txcoord__stage-legend-item">Inspection</span>
          <span class="txcoord__stage-legend-sep">\u2192</span>
          <span class="txcoord__stage-legend-item">Appraisal</span>
          <span class="txcoord__stage-legend-sep">\u2192</span>
          <span class="txcoord__stage-legend-item">Closing</span>
        </div>
        <div class="txcoord__transactions">
          ${transactionsHtml}
        </div>
        <div class="ai-insight">
          The <strong>Riverside Blvd</strong> closing is in 5 days but the title search has not been completed yet. I recommend following up with the title company today. The <strong>Bluebonnet Way</strong> deal is flagged as At Risk because the seller has not responded to the inspection repair request for 4 days.
        </div>
      </div>`;
  }
  
  // --- Component 2: Deal Checklist ---
  function buildDealChecklist() {
    const stages = [
      {
        name: 'Pre-Contract',
        items: [
          { task: 'Listing agreement signed', status: 'completed', due: 'Jan 15', doc: true },
          { task: 'Pre-approval letter received', status: 'completed', due: 'Jan 16', doc: true },
          { task: 'Offer submitted and accepted', status: 'completed', due: 'Jan 22', doc: true },
          { task: 'Earnest money deposited', status: 'completed', due: 'Jan 24', doc: true },
        ]
      },
      {
        name: 'Due Diligence',
        items: [
          { task: 'Home inspection ordered', status: 'completed', due: 'Jan 28', doc: false },
          { task: 'Inspection report reviewed', status: 'completed', due: 'Feb 2', doc: true },
          { task: 'Repair request submitted', status: 'completed', due: 'Feb 4', doc: true },
          { task: 'Seller repair response', status: 'completed', due: 'Feb 8', doc: true },
          { task: 'Termite/pest inspection', status: 'completed', due: 'Feb 5', doc: true },
        ]
      },
      {
        name: 'Financing',
        items: [
          { task: 'Loan application submitted', status: 'completed', due: 'Feb 1', doc: true },
          { task: 'Appraisal ordered', status: 'completed', due: 'Feb 6', doc: false },
          { task: 'Appraisal completed', status: 'in-progress', due: 'Feb 18', doc: false },
          { task: 'Loan approval (clear to close)', status: 'pending', due: 'Feb 22', doc: false },
        ]
      },
      {
        name: 'Pre-Close',
        items: [
          { task: 'Title search completed', status: 'pending', due: 'Feb 20', doc: false },
          { task: 'Title insurance ordered', status: 'pending', due: 'Feb 22', doc: false },
          { task: 'HOA documents reviewed', status: 'overdue', due: 'Feb 14', doc: false },
          { task: 'Final walkthrough scheduled', status: 'pending', due: 'Feb 26', doc: false },
          { task: 'Closing disclosure signed', status: 'pending', due: 'Feb 25', doc: false },
        ]
      },
      {
        name: 'Closing',
        items: [
          { task: 'Wire transfer confirmed', status: 'pending', due: 'Feb 28', doc: false },
          { task: 'Closing documents signed', status: 'pending', due: 'Feb 28', doc: false },
          { task: 'Keys transferred', status: 'pending', due: 'Feb 28', doc: false },
        ]
      },
    ];
  
    const completedCount = stages.reduce((acc, s) => acc + s.items.filter(i => i.status === 'completed').length, 0);
    const totalCount = stages.reduce((acc, s) => acc + s.items.length, 0);
  
    const statusIcon = (status) => {
      switch (status) {
        case 'completed':
          return '<svg class="txcoord__check-icon txcoord__check-icon--done" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8l3.5 3.5 6.5-7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        case 'in-progress':
          return '<div class="txcoord__check-icon txcoord__check-icon--progress"><div class="txcoord__spinner"></div></div>';
        case 'overdue':
          return '<svg class="txcoord__check-icon txcoord__check-icon--overdue" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 00.708.852h.058a.75.75 0 00.354-.149l.041-.02M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        default:
          return '<div class="txcoord__check-icon txcoord__check-icon--pending"></div>';
      }
    };
  
    const stagesHtml = stages.map((stage, si) => {
      const stageCompleted = stage.items.every(i => i.status === 'completed');
      const itemsHtml = stage.items.map(item => `
        <div class="txcoord__checklist-item txcoord__checklist-item--${item.status}">
          ${statusIcon(item.status)}
          <div class="txcoord__checklist-item-content">
            <span class="txcoord__checklist-item-task">${item.task}</span>
            <span class="txcoord__checklist-item-due ${item.status === 'overdue' ? 'txcoord__checklist-item-due--overdue' : ''}">Due ${item.due}</span>
          </div>
          ${item.doc ? '<svg class="txcoord__doc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ''}
        </div>
      `).join('');
  
      return `
        <div class="txcoord__checklist-stage">
          <div class="txcoord__checklist-stage-header">
            <div class="txcoord__checklist-stage-dot ${stageCompleted ? 'txcoord__checklist-stage-dot--done' : ''}"></div>
            <span class="txcoord__checklist-stage-name">${stage.name}</span>
            <span class="txcoord__checklist-stage-count">${stage.items.filter(i => i.status === 'completed').length}/${stage.items.length}</span>
          </div>
          <div class="txcoord__checklist-items">${itemsHtml}</div>
        </div>`;
    }).join('');
  
    return `
      <div class="message-ai-text message-ai-text--spaced">
        <p>Here's the full transaction checklist for the Johnson property. You're about 72% through the process.</p>
      </div>
      <div class="chat-response-card">
        <div class="chat-response-card__header">
          <div>
            <div class="chat-response-card__title">Johnson Property \u2014 Transaction Checklist</div>
            <div class="chat-response-card__subtitle">1247 Oak Grove Dr, Austin TX</div>
          </div>
        </div>
        <div class="txcoord__checklist-summary">
          <div class="txcoord__checklist-summary-bar">
            <div class="txcoord__checklist-summary-bar-fill" style="width:${Math.round((completedCount / totalCount) * 100)}%"></div>
          </div>
          <span class="txcoord__checklist-summary-text">${completedCount} of ${totalCount} tasks complete</span>
        </div>
        <div class="txcoord__checklist">
          ${stagesHtml}
        </div>
        <div class="ai-insight">
          <strong>Heads up:</strong> The HOA documents review is <strong>overdue by 4 days</strong>. This is a common closing delay trigger. I recommend requesting them from the HOA management company today. The appraisal is in progress and expected by Feb 18.
        </div>
      </div>`;
  }
  
  // --- Component 3: Deadline Alerts ---
  function buildDeadlineAlerts() {
    const today = [
      { deal: 'Riverside Blvd #204', task: 'Final walkthrough with buyer', time: '2:00 PM', party: 'Sarah Mitchell (Buyer)', urgency: 'today' },
      { deal: 'Summit Ridge Dr', task: 'Wire transfer confirmation due', time: '5:00 PM', party: 'Thompson LLC (Buyer)', urgency: 'today' },
    ];
    const tomorrow = [
      { deal: 'Oak Grove Dr', task: 'Appraisal report expected', time: 'By EOD', party: 'First National Appraisals', urgency: 'tomorrow' },
    ];
    const thisWeek = [
      { deal: 'Riverside Blvd #204', task: 'Closing documents signing', time: 'Wed, Feb 19', party: 'All parties', urgency: 'week' },
      { deal: 'Maple Creek Ln', task: 'Loan approval deadline', time: 'Thu, Feb 20', party: 'Lakeshore Mortgage', urgency: 'week' },
      { deal: 'Oak Grove Dr', task: 'HOA documents review (overdue)', time: 'Fri, Feb 21', party: 'Johnson Family', urgency: 'week' },
    ];
  
    const renderItem = (item) => `
      <div class="txcoord__deadline-item">
        <div class="txcoord__deadline-item-content">
          <span class="txcoord__deadline-deal">${item.deal}</span>
          <span class="txcoord__deadline-task">${item.task}</span>
          <div class="txcoord__deadline-meta">
            <span class="txcoord__deadline-time">${item.time}</span>
            <span class="txcoord__deadline-sep">\u00B7</span>
            <span class="txcoord__deadline-party">${item.party}</span>
          </div>
        </div>
        <button class="txcoord__reminder-btn">Send Reminder</button>
      </div>`;
  
    return `
      <div class="message-ai-text message-ai-text--spaced">
        <p>Here are all upcoming deadlines for the next 7 days across your active transactions.</p>
      </div>
      <div class="chat-response-card">
        <div class="chat-response-card__header">
          <div>
            <div class="chat-response-card__title">Deadline Alerts</div>
            <div class="chat-response-card__subtitle">Next 7 days \u00B7 6 items</div>
          </div>
        </div>
        <div class="txcoord__deadline-section">
          <div class="txcoord__deadline-group">
            <div class="txcoord__deadline-group-header txcoord__deadline-group-header--today">
              <span class="txcoord__deadline-group-dot txcoord__deadline-group-dot--today"></span>
              Today
              <span class="txcoord__deadline-group-count">2</span>
            </div>
            ${today.map(renderItem).join('')}
          </div>
          <div class="txcoord__deadline-group">
            <div class="txcoord__deadline-group-header txcoord__deadline-group-header--tomorrow">
              <span class="txcoord__deadline-group-dot txcoord__deadline-group-dot--tomorrow"></span>
              Tomorrow
              <span class="txcoord__deadline-group-count">1</span>
            </div>
            ${tomorrow.map(renderItem).join('')}
          </div>
          <div class="txcoord__deadline-group">
            <div class="txcoord__deadline-group-header txcoord__deadline-group-header--week">
              <span class="txcoord__deadline-group-dot txcoord__deadline-group-dot--week"></span>
              This Week
              <span class="txcoord__deadline-group-count">3</span>
            </div>
            ${thisWeek.map(renderItem).join('')}
          </div>
        </div>
      </div>`;
  }
  
  
  // ===========================================================
  // DEMO 8 — LeadIQ AI: Executive Leadership Coach
  // ===========================================================
  
  // --- Thinking State: Feedback Aggregation ---
  function buildFeedbackThinking() {
    return `
      <div class="message-ai-text message-ai-text--spaced">
        <p>Aggregating feedback from 18 respondents...</p>
      </div>
      <div class="chat-response-card">
        <div class="exec__thinking">
          <div class="exec__thinking-icon uni-pulse-ring">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="exec__thinking-text">Aggregating feedback from 18 respondents...</span>
          <div class="exec__thinking-steps">
            <div class="exec__thinking-step">${CHECK_SVG_B3} Loading direct report feedback (6)</div>
            <div class="exec__thinking-step">${CHECK_SVG_B3} Loading peer feedback (4)</div>
            <div class="exec__thinking-step">${CHECK_SVG_B3} Loading manager feedback (3)</div>
            <div class="exec__thinking-step">${CHECK_SVG_B3} Analyzing patterns &amp; themes...</div>
          </div>
          <div class="exec__progress"><div class="exec__progress-fill"></div></div>
        </div>
      </div>`;
  }
  
  // --- Component 1: 360 Feedback Results ---
  function buildFeedbackResults() {
    const categories = [
      { name: 'Strategic Thinking', score: 4.5, selfScore: 4.2 },
      { name: 'Communication', score: 3.8, selfScore: 4.5 },
      { name: 'Decision Making', score: 4.3, selfScore: 4.0 },
      { name: 'Team Development', score: 4.6, selfScore: 4.1 },
      { name: 'Change Management', score: 3.5, selfScore: 4.3 },
      { name: 'Emotional Intelligence', score: 4.1, selfScore: 3.8 },
    ];
  
    const categoriesHtml = categories.map(c => {
      const pct = (c.score / 5) * 100;
      const selfPct = (c.selfScore / 5) * 100;
      const gap = c.score - c.selfScore;
      const gapStr = gap > 0 ? `+${gap.toFixed(1)}` : gap.toFixed(1);
      const gapClass = gap > 0 ? 'exec__gap--positive' : gap < 0 ? 'exec__gap--negative' : '';
      return `
        <div class="exec__category">
          <div class="exec__category-header">
            <span class="exec__category-name">${c.name}</span>
            <span class="exec__category-score">${c.score.toFixed(1)}</span>
          </div>
          <div class="exec__category-bars">
            <div class="exec__category-bar">
              <div class="exec__category-bar-fill" style="width:${pct}%"></div>
            </div>
            <div class="exec__category-bar exec__category-bar--self">
              <div class="exec__category-bar-fill exec__category-bar-fill--self" style="width:${selfPct}%"></div>
            </div>
          </div>
          <div class="exec__category-gap">
            <span class="exec__gap-label">Self: ${c.selfScore.toFixed(1)}</span>
            <span class="exec__gap-value ${gapClass}">Gap: ${gapStr}</span>
          </div>
        </div>`;
    }).join('');
  
    const strengths = [
      'Consistently empowers team members to take ownership of key initiatives',
      'Demonstrates strong vision-setting that aligns teams around shared goals',
      'Highly approachable and invests genuine time in developing direct reports',
    ];
    const growthAreas = [
      'Could improve clarity when communicating strategic changes to broader org',
      'Sometimes resistant to adjusting plans when circumstances shift',
      'Tends to avoid difficult performance conversations until they escalate',
    ];
  
    const strengthsHtml = strengths.map(s => `<li class="exec__theme-item exec__theme-item--strength">${s}</li>`).join('');
    const growthHtml = growthAreas.map(g => `<li class="exec__theme-item exec__theme-item--growth">${g}</li>`).join('');
  
    return `
      <div class="message-ai-text message-ai-text--spaced">
        <p>Your 360 feedback results are ready. Overall, your leadership is rated highly by your team, with some clear areas for development.</p>
      </div>
      <div class="chat-response-card">
        <div class="chat-response-card__header">
          <div>
            <div class="chat-response-card__title">360 Feedback Results</div>
            <div class="chat-response-card__subtitle">Q4 2024 \u00B7 18 respondents</div>
          </div>
        </div>
        <div class="exec__respondents">
          <div class="exec__respondent">
            <span class="exec__respondent-count">6</span>
            <span class="exec__respondent-label">Direct Reports</span>
          </div>
          <div class="exec__respondent">
            <span class="exec__respondent-count">4</span>
            <span class="exec__respondent-label">Peers</span>
          </div>
          <div class="exec__respondent">
            <span class="exec__respondent-count">3</span>
            <span class="exec__respondent-label">Managers</span>
          </div>
          <div class="exec__respondent">
            <span class="exec__respondent-count">5</span>
            <span class="exec__respondent-label">Cross-functional</span>
          </div>
        </div>
        <div class="exec__overall">
          <div class="exec__overall-score">
            <span class="exec__overall-number">4.2</span>
            <span class="exec__overall-max">/5.0</span>
          </div>
          <span class="exec__overall-label">Overall Leadership Score</span>
        </div>
        <div class="exec__categories">
          <div class="exec__categories-header">
            <span class="exec__categories-title">Category Scores</span>
            <div class="exec__categories-legend">
              <span class="exec__legend-item"><span class="exec__legend-dot"></span>Others</span>
              <span class="exec__legend-item"><span class="exec__legend-dot exec__legend-dot--self"></span>Self</span>
            </div>
          </div>
          ${categoriesHtml}
        </div>
        <div class="exec__themes">
          <div class="exec__themes-section">
            <span class="exec__themes-title exec__themes-title--strengths">Key Strengths</span>
            <ul class="exec__themes-list">${strengthsHtml}</ul>
          </div>
          <div class="exec__themes-section">
            <span class="exec__themes-title exec__themes-title--growth">Growth Areas</span>
            <ul class="exec__themes-list">${growthHtml}</ul>
          </div>
        </div>
      </div>`;
  }
  
  // --- Component 2: 360 Survey Builder ---
  function buildSurveyBuilder() {
    const surveyCategories = [
      {
        name: 'Strategic Thinking',
        questions: [
          'Demonstrates clear vision and direction for the team',
          'Anticipates future challenges and plans proactively',
        ]
      },
      {
        name: 'Communication',
        questions: [
          'Communicates expectations clearly and consistently',
          'Actively listens and incorporates feedback from others',
          'Keeps stakeholders informed of important developments',
        ]
      },
      {
        name: 'Decision Making',
        questions: [
          'Makes timely decisions even with incomplete information',
          'Considers multiple perspectives before deciding',
        ]
      },
      {
        name: 'Team Development',
        questions: [
          'Invests time in coaching and developing team members',
          'Creates opportunities for team members to grow',
          'Provides constructive feedback regularly',
        ]
      },
      {
        name: 'Change Management',
        questions: [
          'Adapts quickly to changing priorities and circumstances',
          'Helps others navigate through organizational changes',
        ]
      },
      {
        name: 'Emotional Intelligence',
        questions: [
          'Demonstrates empathy in interactions with others',
          'Remains composed and effective under pressure',
        ]
      },
    ];
  
    const distribution = [
      { role: 'Direct Reports', count: 8 },
      { role: 'Peers', count: 5 },
      { role: 'Managers', count: 2 },
      { role: 'Cross-functional', count: 6 },
    ];
  
    const categoriesHtml = surveyCategories.map(cat => {
      const questionsHtml = cat.questions.map(q => `
        <div class="exec__survey-question">
          <span class="exec__survey-question-text">${q}</span>
          <div class="exec__survey-scale">
            <span class="exec__survey-scale-label">1\u20135 Likert</span>
          </div>
        </div>
      `).join('');
  
      return `
        <div class="exec__survey-category">
          <div class="exec__survey-category-header">
            <span class="exec__survey-category-name">${cat.name}</span>
            <span class="exec__survey-category-count">${cat.questions.length} questions</span>
          </div>
          <div class="exec__survey-questions">${questionsHtml}</div>
          <button class="exec__survey-add-btn">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 3v8M3 7h8" stroke-linecap="round"/></svg>
            Add Question
          </button>
        </div>`;
    }).join('');
  
    const distHtml = distribution.map(d => `
      <div class="exec__survey-dist-row">
        <span class="exec__survey-dist-role">${d.role}</span>
        <span class="exec__survey-dist-count">${d.count} recipients</span>
      </div>
    `).join('');
  
    return `
      <div class="message-ai-text message-ai-text--spaced">
        <p>I've drafted a 360 feedback survey based on the standard leadership competency framework. You can customize it before sending.</p>
      </div>
      <div class="chat-response-card">
        <div class="chat-response-card__header">
          <div>
            <div class="chat-response-card__title">360 Survey Builder</div>
            <div class="chat-response-card__subtitle">15 questions across 6 categories</div>
          </div>
        </div>
        <div class="exec__survey-scale-info">
          <span class="exec__survey-scale-info-label">Rating Scale:</span>
          <div class="exec__survey-scale-dots">
            <span>1 Strongly Disagree</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5 Strongly Agree</span>
          </div>
        </div>
        <div class="exec__survey-categories">
          ${categoriesHtml}
        </div>
        <div class="exec__survey-distribution">
          <span class="exec__survey-dist-title">Distribution</span>
          ${distHtml}
          <div class="exec__survey-dist-total">
            <span>Total Recipients</span>
            <span>21</span>
          </div>
        </div>
        <div class="chat-response-card__footer">
          <button class="biz-btn biz-btn--primary" style="width:100%">Send Survey</button>
        </div>
      </div>`;
  }
  
  // --- Thinking State: Development Plan ---
  function buildDevPlanThinking() {
    return `
      <div class="message-ai-text message-ai-text--spaced">
        <p>Analyzing feedback patterns and building your plan...</p>
      </div>
      <div class="chat-response-card">
        <div class="exec__thinking">
          <div class="exec__thinking-icon uni-pulse-ring">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0l-4.725 2.885a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="exec__thinking-text">Analyzing feedback patterns and building your plan...</span>
          <div class="exec__thinking-steps">
            <div class="exec__thinking-step">${CHECK_SVG_B3} Identifying lowest-scoring areas</div>
            <div class="exec__thinking-step">${CHECK_SVG_B3} Mapping development resources</div>
            <div class="exec__thinking-step">${CHECK_SVG_B3} Setting 90-day milestones</div>
            <div class="exec__thinking-step">${CHECK_SVG_B3} Generating action items...</div>
          </div>
          <div class="exec__progress"><div class="exec__progress-fill"></div></div>
        </div>
      </div>`;
  }
  
  // --- Component 3: Leadership Development Plan ---
  function buildDevelopmentPlan() {
    const focusAreas = [
      {
        name: 'Communication',
        score: 3.8,
        actions: [
          { task: 'Practice structured message framework (Situation-Complication-Resolution) in all org-wide communications', timeline: 'Weeks 1\u20134' },
          { task: 'Schedule monthly skip-level 1:1s to improve information flow', timeline: 'Weeks 2\u201312' },
          { task: 'Record and review yourself presenting; identify filler words and unclear transitions', timeline: 'Weeks 4\u20138' },
        ]
      },
      {
        name: 'Change Management',
        score: 3.5,
        actions: [
          { task: 'Complete the Prosci ADKAR change management certification', timeline: 'Weeks 1\u20136' },
          { task: 'Develop a change communication template for your team', timeline: 'Weeks 4\u20138' },
          { task: 'Lead the upcoming Q2 process changes using the ADKAR framework', timeline: 'Weeks 8\u201312' },
        ]
      },
      {
        name: 'Emotional Intelligence',
        score: 4.1,
        actions: [
          { task: 'Practice daily 5-minute mindfulness exercises before team meetings', timeline: 'Weeks 1\u201312' },
          { task: 'Initiate one difficult conversation per week using the SBI (Situation-Behavior-Impact) model', timeline: 'Weeks 2\u20138' },
          { task: 'Complete the "Emotional Agility" workshop by Susan David', timeline: 'Weeks 4\u20138' },
        ]
      },
    ];
  
    const resources = [
      { type: 'Book', title: 'Crucial Conversations (Patterson et al.)', area: 'Communication' },
      { type: 'Workshop', title: 'Prosci ADKAR Practitioner Certification', area: 'Change Mgmt' },
      { type: 'Book', title: 'Emotional Agility (Susan David)', area: 'Emotional Intel.' },
      { type: 'Exercise', title: 'Weekly SBI Feedback Journaling', area: 'All Areas' },
    ];
  
    const milestones = [
      { day: '30 days', checkpoint: 'Complete first skip-level meetings; begin ADKAR certification; establish mindfulness routine' },
      { day: '60 days', checkpoint: 'Deliver 2 structured presentations; finish ADKAR Module 1\u20133; conduct 4 SBI conversations' },
      { day: '90 days', checkpoint: 'Lead Q2 change initiative; review 360 feedback progress with coach; reassess scores' },
    ];
  
    const focusHtml = focusAreas.map(fa => {
      const actionsHtml = fa.actions.map(a => `
        <div class="exec__plan-action">
          <div class="exec__plan-action-dot"></div>
          <div class="exec__plan-action-content">
            <span class="exec__plan-action-task">${a.task}</span>
            <span class="exec__plan-action-timeline">${a.timeline}</span>
          </div>
        </div>
      `).join('');
  
      return `
        <div class="exec__plan-focus">
          <div class="exec__plan-focus-header">
            <span class="exec__plan-focus-name">${fa.name}</span>
            <span class="exec__plan-focus-score">Score: ${fa.score.toFixed(1)}/5.0</span>
          </div>
          <div class="exec__plan-actions">${actionsHtml}</div>
        </div>`;
    }).join('');
  
    const resourcesHtml = resources.map(r => `
      <div class="exec__plan-resource">
        <span class="exec__plan-resource-type">${r.type}</span>
        <span class="exec__plan-resource-title">${r.title}</span>
        <span class="exec__plan-resource-area">${r.area}</span>
      </div>
    `).join('');
  
    const milestonesHtml = milestones.map(m => `
      <div class="exec__plan-milestone">
        <span class="exec__plan-milestone-day">${m.day}</span>
        <span class="exec__plan-milestone-text">${m.checkpoint}</span>
      </div>
    `).join('');
  
    return `
      <div class="message-ai-text message-ai-text--spaced">
        <p>Based on your Q4 2024 360 feedback, I've created a focused development plan targeting your three lowest-scoring areas.</p>
      </div>
      <div class="chat-response-card">
        <div class="chat-response-card__header">
          <div>
            <div class="chat-response-card__title">Leadership Development Plan</div>
            <div class="chat-response-card__subtitle">Based on Q4 2024 360 Feedback</div>
          </div>
        </div>
        <div class="exec__plan-focuses">
          ${focusHtml}
        </div>
        <div class="exec__plan-resources">
          <span class="exec__plan-resources-title">Recommended Resources</span>
          ${resourcesHtml}
        </div>
        <div class="exec__plan-milestones">
          <span class="exec__plan-milestones-title">90-Day Milestone Checkpoints</span>
          ${milestonesHtml}
        </div>
        <div class="chat-response-card__footer" style="display:flex;gap:8px;">
          <button class="biz-btn biz-btn--primary" style="flex:1">Share with Coach</button>
          <button class="biz-btn biz-btn--secondary" style="flex:1">Set Reminders</button>
        </div>
      </div>`;
  }
  
  
  // ===========================================================
  // DEMO 9 — WealthIQ AI: Financial Coach
  // ===========================================================
  
  // --- Thinking State: Budget Analysis ---
  function buildBudgetThinking() {
    return `
      <div class="message-ai-text message-ai-text--spaced">
        <p>Analyzing your spending patterns...</p>
      </div>
      <div class="chat-response-card">
        <div class="wealth__thinking">
          <div class="wealth__thinking-icon uni-pulse-ring">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="wealth__thinking-text">Analyzing your spending patterns...</span>
          <div class="wealth__thinking-steps">
            <div class="wealth__thinking-step">${CHECK_SVG_B3} Syncing bank transactions</div>
            <div class="wealth__thinking-step">${CHECK_SVG_B3} Categorizing expenses</div>
            <div class="wealth__thinking-step">${CHECK_SVG_B3} Comparing to budget targets</div>
            <div class="wealth__thinking-step">${CHECK_SVG_B3} Generating insights...</div>
          </div>
          <div class="wealth__progress"><div class="wealth__progress-fill"></div></div>
        </div>
      </div>`;
  }
  
  // --- Component 1: Monthly Budget Tracker ---
  function buildBudgetTracker() {
    const income = 6800;
  
    const needs = [
      { name: 'Housing', budgeted: 1800, spent: 1800, icon: 'home' },
      { name: 'Groceries', budgeted: 600, spent: 548, icon: 'cart' },
      { name: 'Transportation', budgeted: 400, spent: 385, icon: 'car' },
      { name: 'Insurance', budgeted: 350, spent: 350, icon: 'shield' },
      { name: 'Utilities', budgeted: 250, spent: 232, icon: 'bolt' },
    ];
  
    const wants = [
      { name: 'Dining Out', budgeted: 450, spent: 523, icon: 'fork' },
      { name: 'Entertainment', budgeted: 300, spent: 245, icon: 'ticket' },
      { name: 'Shopping', budgeted: 520, spent: 610, icon: 'bag' },
      { name: 'Subscriptions', budgeted: 180, spent: 180, icon: 'play' },
      { name: 'Personal Care', budgeted: 150, spent: 98, icon: 'heart' },
    ];
  
    const savings = [
      { name: 'Emergency Fund', budgeted: 680, spent: 680, icon: 'vault' },
      { name: 'Retirement (401k)', budgeted: 500, spent: 500, icon: 'chart' },
      { name: 'Vacation Fund', budgeted: 180, spent: 180, icon: 'plane' },
    ];
  
    const renderLine = (item) => {
      const pct = Math.round((item.spent / item.budgeted) * 100);
      const remaining = item.budgeted - item.spent;
      let barClass = 'wealth__budget-bar-fill--green';
      if (pct > 100) barClass = 'wealth__budget-bar-fill--red';
      else if (pct > 85) barClass = 'wealth__budget-bar-fill--yellow';
  
      return `
        <div class="wealth__budget-line">
          <div class="wealth__budget-line-header">
            <span class="wealth__budget-line-name">${item.name}</span>
            <div class="wealth__budget-line-amounts">
              <span class="wealth__budget-line-spent">$${item.spent.toLocaleString()}</span>
              <span class="wealth__budget-line-sep">/</span>
              <span class="wealth__budget-line-budgeted">$${item.budgeted.toLocaleString()}</span>
            </div>
          </div>
          <div class="wealth__budget-bar">
            <div class="wealth__budget-bar-fill ${barClass}" style="width:${Math.min(pct, 100)}%"></div>
          </div>
          <span class="wealth__budget-line-remaining ${remaining < 0 ? 'wealth__budget-line-remaining--over' : ''}">
            ${remaining >= 0 ? '$' + remaining + ' remaining' : '$' + Math.abs(remaining) + ' over'}
          </span>
        </div>`;
    };
  
    const needsTotal = needs.reduce((a, n) => a + n.spent, 0);
    const needsBudget = needs.reduce((a, n) => a + n.budgeted, 0);
    const wantsTotal = wants.reduce((a, w) => a + w.spent, 0);
    const wantsBudget = wants.reduce((a, w) => a + w.budgeted, 0);
    const savingsTotal = savings.reduce((a, s) => a + s.spent, 0);
    const savingsBudget = savings.reduce((a, s) => a + s.budgeted, 0);
    const totalSpent = needsTotal + wantsTotal + savingsTotal;
    const isOnTrack = totalSpent <= income;
  
    return `
      <div class="message-ai-text message-ai-text--spaced">
        <p>Here's your February budget tracker. Overall you're ${isOnTrack ? 'on track' : 'slightly over budget'} this month.</p>
      </div>
      <div class="chat-response-card">
        <div class="chat-response-card__header">
          <div>
            <div class="chat-response-card__title">Monthly Budget Tracker</div>
            <div class="chat-response-card__subtitle">February 2025 \u00B7 50/30/20 Framework</div>
          </div>
          <span class="status-pill ${isOnTrack ? 'status-pill--on-track' : 'status-pill--at-risk'}">${isOnTrack ? 'On Track' : 'Over Budget'}</span>
        </div>
        <div class="wealth__income-bar">
          <span class="wealth__income-label">Monthly Income</span>
          <span class="wealth__income-value">$${income.toLocaleString()}</span>
        </div>
        <div class="wealth__budget-section">
          <div class="wealth__budget-section-header">
            <span class="wealth__budget-section-title">Needs (50%)</span>
            <span class="wealth__budget-section-amount">$${needsTotal.toLocaleString()} / $${needsBudget.toLocaleString()}</span>
          </div>
          ${needs.map(renderLine).join('')}
        </div>
        <div class="wealth__budget-section">
          <div class="wealth__budget-section-header">
            <span class="wealth__budget-section-title">Wants (30%)</span>
            <span class="wealth__budget-section-amount">$${wantsTotal.toLocaleString()} / $${wantsBudget.toLocaleString()}</span>
          </div>
          ${wants.map(renderLine).join('')}
        </div>
        <div class="wealth__budget-section">
          <div class="wealth__budget-section-header">
            <span class="wealth__budget-section-title">Savings (20%)</span>
            <span class="wealth__budget-section-amount">$${savingsTotal.toLocaleString()} / $${savingsBudget.toLocaleString()}</span>
          </div>
          ${savings.map(renderLine).join('')}
        </div>
        <div class="wealth__budget-total">
          <span class="wealth__budget-total-label">Total Spent</span>
          <span class="wealth__budget-total-value">$${totalSpent.toLocaleString()} / $${income.toLocaleString()}</span>
        </div>
        <div class="ai-insight">
          You're <strong>$${Math.abs(income - totalSpent)} ${totalSpent <= income ? 'under' : 'over'} budget</strong> this month. <strong>Dining Out</strong> and <strong>Shopping</strong> are both over their limits. Consider the 48-hour rule for non-essential purchases over $50 to reduce impulse spending.
        </div>
      </div>`;
  }
  
  // --- Component 2: Transaction Feed ---
  function buildTransactionFeed() {
    const transactions = [
      { date: 'Feb 25', merchant: 'Whole Foods Market', category: 'Groceries', catType: 'needs', amount: -87.42, balance: 3241.58 },
      { date: 'Feb 24', merchant: 'Shell Gas Station', category: 'Transportation', catType: 'needs', amount: -52.30, balance: 3329.00 },
      { date: 'Feb 24', merchant: 'Netflix', category: 'Subscriptions', catType: 'wants', amount: -15.99, balance: 3381.30 },
      { date: 'Feb 23', merchant: 'Target', category: 'Shopping', catType: 'wants', amount: -124.67, balance: 3397.29 },
      { date: 'Feb 22', merchant: 'Olive Garden', category: 'Dining Out', catType: 'wants', amount: -68.50, balance: 3521.96 },
      { date: 'Feb 21', merchant: 'Employer Direct Deposit', category: 'Income', catType: 'income', amount: 3400.00, balance: 3590.46 },
      { date: 'Feb 20', merchant: 'Amazon', category: 'Shopping', catType: 'wants', amount: -45.99, balance: 190.46 },
      { date: 'Feb 19', merchant: 'Starbucks', category: 'Dining Out', catType: 'wants', amount: -12.45, balance: 236.45 },
      { date: 'Feb 18', merchant: 'Gym Membership', category: 'Personal Care', catType: 'wants', amount: -49.99, balance: 248.90 },
      { date: 'Feb 17', merchant: 'Kroger', category: 'Groceries', catType: 'needs', amount: -63.21, balance: 298.89 },
    ];
  
    const transactionsHtml = transactions.map(t => {
      const isPositive = t.amount > 0;
      return `
        <div class="wealth__tx-row">
          <div class="wealth__tx-left">
            <span class="wealth__tx-date">${t.date}</span>
            <div class="wealth__tx-details">
              <span class="wealth__tx-merchant">${t.merchant}</span>
              <span class="wealth__tx-category wealth__tx-category--${t.catType}">${t.category}</span>
            </div>
          </div>
          <div class="wealth__tx-right">
            <span class="wealth__tx-amount ${isPositive ? 'wealth__tx-amount--positive' : 'wealth__tx-amount--negative'}">${isPositive ? '+' : ''}$${Math.abs(t.amount).toFixed(2)}</span>
            <span class="wealth__tx-balance">$${t.balance.toFixed(2)}</span>
          </div>
        </div>`;
    }).join('');
  
    return `
      <div class="message-ai-text message-ai-text--spaced">
        <p>Here are your recent transactions with spending insights.</p>
      </div>
      <div class="chat-response-card">
        <div class="chat-response-card__header">
          <div>
            <div class="chat-response-card__title">Recent Transactions</div>
            <div class="chat-response-card__subtitle">Last 30 days</div>
          </div>
        </div>
        <div class="wealth__tx-filters">
          <button class="wealth__tx-filter wealth__tx-filter--active">All</button>
          <button class="wealth__tx-filter">Needs</button>
          <button class="wealth__tx-filter">Wants</button>
          <button class="wealth__tx-filter">Savings</button>
        </div>
        <div class="wealth__tx-list">
          ${transactionsHtml}
        </div>
        <div class="wealth__tx-insight">
          <div class="wealth__tx-insight-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 00.708.852h.058a.75.75 0 00.354-.149l.041-.02M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="wealth__tx-insight-text">You spent <strong>23% more on dining out</strong> this month compared to last month. That's $98 more than February's average. Consider meal prepping on Sundays to cut dining costs.</span>
        </div>
      </div>`;
  }
  
  // --- Component 3: Savings Goals ---
  function buildSavingsGoals() {
    const goals = [
      { name: 'Emergency Fund', current: 8400, target: 15000, monthly: 680, color: '#059669' },
      { name: 'Vacation', current: 2100, target: 3000, monthly: 180, color: '#0d9488' },
      { name: 'New Car', current: 4500, target: 25000, monthly: 300, color: '#4338ca' },
    ];
  
    const goalsHtml = goals.map(g => {
      const pct = Math.round((g.current / g.target) * 100);
      const remaining = g.target - g.current;
      const monthsLeft = Math.ceil(remaining / g.monthly);
      const completionDate = new Date();
      completionDate.setMonth(completionDate.getMonth() + monthsLeft);
      const dateStr = completionDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  
      return `
        <div class="wealth__goal">
          <div class="wealth__goal-header">
            <span class="wealth__goal-name">${g.name}</span>
            <span class="wealth__goal-pct">${pct}%</span>
          </div>
          <div class="wealth__goal-amounts">
            <span class="wealth__goal-current">$${g.current.toLocaleString()}</span>
            <span class="wealth__goal-target">/ $${g.target.toLocaleString()}</span>
          </div>
          <div class="wealth__goal-bar">
            <div class="wealth__goal-bar-fill" style="width:${pct}%;background:${g.color}"></div>
          </div>
          <div class="wealth__goal-meta">
            <span class="wealth__goal-contribution">$${g.monthly}/mo contribution</span>
            <span class="wealth__goal-completion">Est. ${dateStr}</span>
          </div>
        </div>`;
    }).join('');
  
    return `
      <div class="message-ai-text message-ai-text--spaced">
        <p>Here's how your savings goals are tracking. Your emergency fund is making steady progress.</p>
      </div>
      <div class="chat-response-card">
        <div class="chat-response-card__header">
          <div>
            <div class="chat-response-card__title">Savings Goals</div>
            <div class="chat-response-card__subtitle">3 active goals</div>
          </div>
        </div>
        <div class="wealth__goals">
          ${goalsHtml}
        </div>
        <div class="wealth__goal-recommendation">
          <div class="wealth__goal-recommendation-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0l-4.725 2.885a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="wealth__goal-recommendation-text">Increase your emergency fund contribution by <strong>$50/month</strong> to hit your target <strong>2 months earlier</strong> (Sep 2026 instead of Nov 2026). You can offset this by reducing dining out by one meal per week.</span>
        </div>
        <div class="chat-response-card__footer">
          <button class="biz-btn biz-btn--secondary" style="width:100%">Adjust Goals</button>
        </div>
      </div>`;
  }
  
  // --- Thinking State: Financial Health Score ---
  function buildHealthScoreThinking() {
    return `
      <div class="message-ai-text message-ai-text--spaced">
        <p>Calculating your financial health...</p>
      </div>
      <div class="chat-response-card">
        <div class="wealth__thinking">
          <div class="wealth__thinking-icon uni-pulse-ring">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="wealth__thinking-text">Calculating your financial health...</span>
          <div class="wealth__thinking-steps">
            <div class="wealth__thinking-step">${CHECK_SVG_B3} Analyzing budget adherence</div>
            <div class="wealth__thinking-step">${CHECK_SVG_B3} Computing savings rate</div>
            <div class="wealth__thinking-step">${CHECK_SVG_B3} Evaluating debt metrics</div>
            <div class="wealth__thinking-step">${CHECK_SVG_B3} Generating health score...</div>
          </div>
          <div class="wealth__progress"><div class="wealth__progress-fill"></div></div>
        </div>
      </div>`;
  }
  
  // --- Component 4: Financial Health Score ---
  function buildFinancialHealth() {
    const overallScore = 72;
    const components = [
      { name: 'Budget Adherence', score: 85, trend: 'up', trendVal: '+3' },
      { name: 'Savings Rate', score: 68, trend: 'up', trendVal: '+5' },
      { name: 'Debt Ratio', score: 74, trend: 'down', trendVal: '-2' },
      { name: 'Emergency Fund', score: 58, trend: 'up', trendVal: '+8' },
      { name: 'Investment Growth', score: 78, trend: 'up', trendVal: '+4' },
    ];
  
    const recommendations = [
      'Build your emergency fund to 6 months of expenses ($20,400). You are currently at 3.7 months.',
      'Your debt-to-income ratio is 28%, which is acceptable but trending up. Prioritize paying off the credit card balance before taking on new debt.',
      'Consider opening a Roth IRA to complement your 401k. With your income level, you could contribute up to $7,000 annually for tax-free growth.',
    ];
  
    // SVG ring calculation
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (overallScore / 100) * circumference;
    let ringColor = '#059669'; // green
    if (overallScore < 60) ringColor = '#dc2626'; // red
    else if (overallScore < 80) ringColor = '#f59e0b'; // yellow
  
    const componentsHtml = components.map(c => {
      const trendIcon = c.trend === 'up'
        ? '<svg class="wealth__health-trend-icon wealth__health-trend-icon--up" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 8l4-4 4 4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        : '<svg class="wealth__health-trend-icon wealth__health-trend-icon--down" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 4l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  
      return `
        <div class="wealth__health-component">
          <span class="wealth__health-component-name">${c.name}</span>
          <div class="wealth__health-component-bar">
            <div class="wealth__health-component-bar-fill" style="width:${c.score}%"></div>
          </div>
          <span class="wealth__health-component-score">${c.score}</span>
          <span class="wealth__health-component-trend wealth__health-component-trend--${c.trend}">
            ${trendIcon}
            ${c.trendVal}
          </span>
        </div>`;
    }).join('');
  
    const recsHtml = recommendations.map((r, i) => `
      <div class="wealth__health-rec">
        <span class="wealth__health-rec-num">${i + 1}</span>
        <span class="wealth__health-rec-text">${r}</span>
      </div>
    `).join('');
  
    return `
      <div class="message-ai-text message-ai-text--spaced">
        <p>Here's your comprehensive financial health assessment. Your score is improving but there are specific areas to focus on.</p>
      </div>
      <div class="chat-response-card">
        <div class="chat-response-card__header">
          <div>
            <div class="chat-response-card__title">Financial Health Score</div>
            <div class="chat-response-card__subtitle">Updated February 2025</div>
          </div>
        </div>
        <div class="wealth__health-ring-section">
          <div class="wealth__health-ring">
            <svg viewBox="0 0 100 100" class="wealth__health-ring-svg">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(26,26,26,0.06)" stroke-width="6"/>
              <circle cx="50" cy="50" r="45" fill="none" stroke="${ringColor}" stroke-width="6"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${strokeDashoffset}"
                stroke-linecap="round"
                transform="rotate(-90 50 50)"
                class="wealth__health-ring-progress"/>
            </svg>
            <div class="wealth__health-ring-label">
              <span class="wealth__health-ring-score">${overallScore}</span>
              <span class="wealth__health-ring-max">/100</span>
            </div>
          </div>
          <span class="wealth__health-ring-status" style="color:${ringColor}">Needs Improvement</span>
        </div>
        <div class="wealth__health-components">
          <span class="wealth__health-components-title">Component Scores</span>
          ${componentsHtml}
        </div>
        <div class="wealth__health-recs">
          <span class="wealth__health-recs-title">AI Recommendations</span>
          ${recsHtml}
        </div>
        <div class="chat-response-card__footer">
          <button class="biz-btn biz-btn--primary" style="width:100%">Schedule Review</button>
        </div>
      </div>`;
  }
  
  
  // ===========================================================
  // ===========================================================
  // BATCH 4 — DEMO 10: INFLUENCER COACH (ViralMind AI)
  //           DEMO 11: JOURNALING COACH (Reflect AI)
  //           DEMO 12: PROGRESS REPORTER (Pulse AI)
  // ===========================================================
  
  const CHECK_SVG_B4 = '<svg class="connect-seq__check" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 7l3 3 6-6.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  
  // ===========================================================
  // DEMO 10: INFLUENCER COACH — ViralMind AI
  // ===========================================================
  
  // --- Reel Scripts Thinking State ---
  function buildReelScriptsThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Crafting scroll-stopping scripts...</p>
    </div>
    <div class="chat-response-card">
      <div class="vm__thinking">
        <div class="vm__thinking-icon uni-pulse-ring">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="vm__thinking-text">Crafting scroll-stopping scripts...</span>
        <div class="vm__thinking-steps">
          <div class="vm__thinking-step">${CHECK_SVG_B4} Analyzing your niche trends...</div>
          <div class="vm__thinking-step">${CHECK_SVG_B4} Selecting hook formulas...</div>
          <div class="vm__thinking-step">${CHECK_SVG_B4} Writing 3 script variations...</div>
        </div>
        <div class="vm__progress"><div class="vm__progress-fill"></div></div>
      </div>
    </div>`;
  }
  
  // --- Reel Scripts Builder ---
  function buildReelScripts() {
    const scripts = [
      {
        id: 'storytelling',
        label: 'Storytelling',
        hook: '"I was 40 lbs overweight and couldn\'t walk up a flight of stairs without gasping. Here\'s what nobody tells you about starting your fitness journey."',
        hookTime: '0–3 sec',
        body: [
          '[Show before photo] "Two years ago, I couldn\'t play with my kids for 10 minutes without needing to sit down. I tried every diet — keto, paleo, intermittent fasting. Nothing stuck."',
          '"Then I stopped trying to fix everything at once. I made ONE change: I walked for 20 minutes every single morning. Rain or shine. No excuses."',
          '[Cut to transformation B-roll] "That one habit unlocked everything. Within 3 weeks I was sleeping better. Within 6 weeks I actually wanted to go to the gym. My body followed my consistency."',
          '"The lesson? You don\'t need motivation. You need a habit so small you can\'t say no to it. Start with the walk. The rest will follow."'
        ],
        bodyTime: '3–25 sec',
        cta: '"Follow me for more real fitness stories — link in bio for my free starter guide."',
        ctaTime: '25–30 sec',
        audio: 'Trending: "Pieces (Solo Piano)" — emotional, slow build',
        format: 'Talking head with B-roll cuts',
        engagement: 'High save rate — storytelling drives 2.4x more saves'
      },
      {
        id: 'educational',
        label: 'Educational',
        hook: '"Stop doing crunches. Here are 3 exercises that actually flatten your stomach — backed by science."',
        hookTime: '0–3 sec',
        body: [
          '"Exercise one: Dead bugs. Lie on your back, arms straight up, knees at 90 degrees. Lower your opposite arm and leg at the same time. This fires your deep core without wrecking your spine." [Text overlay: DEAD BUGS — 3x12 reps]',
          '"Exercise two: Pallof press. Grab a cable or band at chest height. Press it straight out and hold. Your core has to fight the rotation — that\'s real functional strength." [Text overlay: PALLOF PRESS — 3x10 each side]',
          '"Exercise three: Reverse crunches. Most people swing their legs. Instead, tilt your pelvis up — think about bringing your belt buckle to your chin. Slow and controlled." [Text overlay: REVERSE CRUNCH — 3x15 reps]',
          '"Crunches only hit the surface. These three target your transverse abdominis — the deep muscle that actually pulls your stomach flat."'
        ],
        bodyTime: '3–22 sec',
        cta: '"Save this for your next workout. Comment PLAN and I\'ll send you the full routine."',
        ctaTime: '22–28 sec',
        audio: 'Trending: "Beat (Instrumental)" — upbeat, gym energy',
        format: 'Screen recording with face cam + text overlays',
        engagement: 'High share rate — educational posts get 3.1x more shares'
      },
      {
        id: 'controversial',
        label: 'Controversial Take',
        hook: '"Your personal trainer is lying to you. Most of what they teach is outdated by 10 years."',
        hookTime: '0–3 sec',
        body: [
          '"Myth number one: You need to eat 6 small meals a day to boost your metabolism. A 2015 meta-analysis proved meal frequency has ZERO effect on metabolic rate. Eat when it works for your schedule."',
          '"Myth number two: Cardio is the best way to lose fat. Wrong. Strength training builds muscle, muscle burns calories 24/7. Cardio burns calories only while you\'re doing it. The math isn\'t close."',
          '"Here\'s what actually works: Progressive overload — lifting a little more weight or doing one more rep each week. Combine that with basic calorie awareness. That\'s it. No magic supplements. No special timing."',
          '"The fitness industry makes money when you\'re confused. They sell complexity. The truth is boring and simple — and that\'s exactly why it works."'
        ],
        bodyTime: '3–23 sec',
        cta: '"Agree or disagree? Drop your take in the comments. Follow for more no-BS fitness advice."',
        ctaTime: '23–30 sec',
        audio: 'Trending: "Original Sound — Debate Format" — dramatic pauses',
        format: 'Direct to camera, fast cuts, bold text overlays',
        engagement: 'High comment rate — controversial takes drive 4.2x more comments'
      }
    ];
  
    const tabsHtml = scripts.map((s, i) => `
      <button class="toggle-pill__btn${i === 0 ? ' toggle-pill__btn--active' : ''}" data-reel-tab="${s.id}">${s.label}</button>
    `).join('');
  
    const panelsHtml = scripts.map((s, i) => `
      <div class="reel__panel${i === 0 ? '' : ' hidden'}" data-reel-panel="${s.id}">
        <div class="reel__section reel__section--hook">
          <div class="reel__section-header">
            <span class="reel__section-badge reel__section-badge--hook">Hook</span>
            <span class="reel__section-time">${s.hookTime}</span>
          </div>
          <p class="reel__section-text reel__section-text--hook">${s.hook}</p>
        </div>
        <div class="reel__section">
          <div class="reel__section-header">
            <span class="reel__section-badge reel__section-badge--body">Body</span>
            <span class="reel__section-time">${s.bodyTime}</span>
          </div>
          <ul class="reel__body-points">
            ${s.body.map(b => `<li class="reel__body-point">${b}</li>`).join('')}
          </ul>
        </div>
        <div class="reel__section">
          <div class="reel__section-header">
            <span class="reel__section-badge reel__section-badge--cta">CTA</span>
            <span class="reel__section-time">${s.ctaTime}</span>
          </div>
          <p class="reel__section-text">${s.cta}</p>
        </div>
        <div class="reel__meta-row">
          <div class="reel__meta-item">
            <span class="reel__meta-label">Suggested Audio</span>
            <span class="reel__meta-value">${s.audio}</span>
          </div>
          <div class="reel__meta-item">
            <span class="reel__meta-label">Format</span>
            <span class="reel__meta-value">${s.format}</span>
          </div>
          <div class="reel__meta-item">
            <span class="reel__meta-label">Predicted Engagement</span>
            <span class="reel__meta-value reel__meta-value--highlight">${s.engagement}</span>
          </div>
        </div>
        <div class="reel__copy-btn-wrap">
          <button class="ad-gen__btn ad-gen__btn--secondary">Copy Script</button>
        </div>
      </div>
    `).join('');
  
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here are 3 reel script variations tailored for your fitness coaching niche. Each uses a different content angle to maximize reach and engagement.</p>
    </div>
    <div class="chat-response-card" id="reelScriptsCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Reel Scripts</div>
          <div class="chat-response-card__subtitle">Fitness Coaching Niche &middot; 3 Variations</div>
        </div>
        <div class="toggle-pill" data-toggle="reel-tabs">
          ${tabsHtml}
        </div>
      </div>
      <div class="reel__panels">
        ${panelsHtml}
      </div>
      <div class="ad-gen__actions">
        <button class="ad-gen__btn ad-gen__btn--primary">Generate More</button>
        <button class="ad-gen__btn ad-gen__btn--ghost">Customize Niche</button>
      </div>
    </div>`;
  }
  
  // --- Trending Suggestions Builder ---
  function buildTrendingSuggestions() {
    const categories = [
      {
        name: 'Trending Formats',
        items: [
          { format: 'POV Transition', heat: 92, description: 'First-person perspective shift revealing a transformation or before/after', audio: '"Metamorphosis" — Interworld' },
          { format: 'Green Screen Stitch', heat: 87, description: 'React to viral fitness content with your expert take overlaid on green screen', audio: 'Original Sound — duet format' },
        ]
      },
      {
        name: 'Trending Audio',
        items: [
          { format: '"That One Sound" Remix', heat: 95, description: 'Pair with quick workout tip reveals — the beat drop times perfectly with a visual transformation', audio: '"That One Sound" — Remix 2025' },
          { format: 'Voiceover Narration', heat: 78, description: 'Record personal narration over B-roll of your coaching sessions or workouts', audio: 'Original Voiceover — trending style' },
        ]
      },
      {
        name: 'Trending Topics',
        items: [
          { format: '75 Hard Challenge Updates', heat: 84, description: 'Daily check-ins showing your progress — high engagement from accountability communities', audio: 'Any motivational audio' },
          { format: 'Gym Myths Debunked', heat: 90, description: 'Quick-fire myth vs. fact format using text overlays and dramatic reactions', audio: '"Wrong Answer" Sound Effect' },
        ]
      }
    ];
  
    const categoriesHtml = categories.map(cat => `
      <div class="trend__category">
        <div class="trend__category-label">${cat.name}</div>
        ${cat.items.map(item => `
          <div class="trend__item">
            <div class="trend__item-top">
              <span class="trend__item-name">${item.format}</span>
              <div class="trend__heat">
                <div class="trend__heat-bar">
                  <div class="trend__heat-fill" style="width: ${item.heat}%"></div>
                </div>
                <span class="trend__heat-score">${item.heat}</span>
              </div>
            </div>
            <p class="trend__item-desc">${item.description}</p>
            <div class="trend__item-audio">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-1.298-3.36l2.25-.644V12.553zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-1.298-3.36l2.25-.644V15.553z" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span>${item.audio}</span>
            </div>
            <button class="trend__use-btn">Use This Format</button>
          </div>
        `).join('')}
      </div>
    `).join('');
  
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's what's trending in the fitness and coaching niche this week. These formats are getting the highest engagement rates right now.</p>
    </div>
    <div class="chat-response-card" id="trendingCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Trending This Week</div>
          <div class="chat-response-card__subtitle">Fitness &amp; Coaching Niche</div>
        </div>
      </div>
      <div class="trend__categories">
        ${categoriesHtml}
      </div>
    </div>`;
  }
  
  // --- Content Calendar Thinking State ---
  function buildCalendarThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Planning your optimal content schedule...</p>
    </div>
    <div class="chat-response-card">
      <div class="vm__thinking">
        <div class="vm__thinking-icon uni-pulse-ring">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="vm__thinking-text">Planning your optimal content schedule...</span>
        <div class="vm__thinking-steps">
          <div class="vm__thinking-step">${CHECK_SVG_B4} Analyzing best posting times...</div>
          <div class="vm__thinking-step">${CHECK_SVG_B4} Selecting content mix for engagement...</div>
          <div class="vm__thinking-step">${CHECK_SVG_B4} Building 7-day content plan...</div>
        </div>
        <div class="vm__progress"><div class="vm__progress-fill"></div></div>
      </div>
    </div>`;
  }
  
  // --- Content Calendar Builder ---
  function buildContentCalendar() {
    const days = [
      { day: 'Monday', date: 'Feb 24', type: 'Reel', topic: 'Myth-busting: "Cardio kills gains"', time: '11:00 AM', status: 'Scheduled' },
      { day: 'Tuesday', date: 'Feb 25', type: 'Carousel', topic: '5 high-protein meal prep ideas', time: '12:30 PM', status: 'Scheduled' },
      { day: 'Wednesday', date: 'Feb 26', type: 'Story', topic: 'Behind-the-scenes: Client transformation Q&A', time: '9:00 AM', status: 'Draft' },
      { day: 'Thursday', date: 'Feb 27', type: 'Reel', topic: '"What I eat in a day" — coach edition', time: '11:00 AM', status: 'Scheduled' },
      { day: 'Friday', date: 'Feb 28', type: 'Story', topic: 'Friday wins: Client shoutouts & testimonials', time: '3:00 PM', status: 'Idea' },
      { day: 'Saturday', date: 'Mar 1', type: 'Reel', topic: 'Weekend workout challenge — 15 min HIIT', time: '10:00 AM', status: 'Idea' },
      { day: 'Sunday', date: 'Mar 2', type: 'Carousel', topic: 'Weekly reflection + motivation for the week', time: '6:00 PM', status: 'Idea' },
    ];
  
    const daysHtml = days.map(d => {
      const typeClass = d.type.toLowerCase();
      const statusClass = d.status.toLowerCase();
      return `
      <div class="cal-content__day">
        <div class="cal-content__day-top">
          <div class="cal-content__day-info">
            <span class="cal-content__day-name">${d.day}</span>
            <span class="cal-content__day-date">${d.date}</span>
          </div>
          <div class="cal-content__day-badges">
            <span class="cal-content__type-pill cal-content__type-pill--${typeClass}">${d.type}</span>
            <span class="cal-content__status cal-content__status--${statusClass}">${d.status}</span>
          </div>
        </div>
        <div class="cal-content__topic">${d.topic}</div>
        <div class="cal-content__time">${d.time}</div>
      </div>`;
    }).join('');
  
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Your content calendar for next week is ready. I've optimized posting times based on when your audience is most active and mixed content types for maximum engagement.</p>
    </div>
    <div class="chat-response-card" id="contentCalCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Content Calendar</div>
          <div class="chat-response-card__subtitle">Feb 24 &ndash; Mar 2, 2025</div>
        </div>
      </div>
      <div class="cal-content__days">
        ${daysHtml}
      </div>
      <div class="ad-gen__actions">
        <button class="ad-gen__btn ad-gen__btn--primary">Auto-Schedule All</button>
        <button class="ad-gen__btn ad-gen__btn--ghost">Edit Calendar</button>
      </div>
    </div>`;
  }
  
  // --- Content Performance Thinking State ---
  function buildPerformanceThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Analyzing your content metrics...</p>
    </div>
    <div class="chat-response-card">
      <div class="vm__thinking">
        <div class="vm__thinking-icon uni-pulse-ring">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="vm__thinking-text">Analyzing your content metrics...</span>
        <div class="vm__thinking-steps">
          <div class="vm__thinking-step">${CHECK_SVG_B4} Pulling analytics data...</div>
          <div class="vm__thinking-step">${CHECK_SVG_B4} Identifying top-performing content...</div>
          <div class="vm__thinking-step">${CHECK_SVG_B4} Generating insights...</div>
        </div>
        <div class="vm__progress"><div class="vm__progress-fill"></div></div>
      </div>
    </div>`;
  }
  
  // --- Content Performance Builder ---
  function buildContentPerformance() {
    const topPosts = [
      { caption: '"Stop doing crunches" — 3 exercises that actually work...', reach: '34.2K', likes: '2,847', saves: '1,203', shares: '412' },
      { caption: 'Client transformation: Sarah lost 28 lbs in 12 weeks...', reach: '28.9K', likes: '2,156', saves: '892', shares: '367' },
      { caption: 'What I eat in a day as a fitness coach (honest edition)...', reach: '24.1K', likes: '1,934', saves: '1,067', shares: '289' },
      { caption: '5 mistakes beginners make at the gym (and how to fix)...', reach: '21.7K', likes: '1,678', saves: '945', shares: '234' },
      { caption: 'Morning routine that changed my energy levels forever...', reach: '18.3K', likes: '1,423', saves: '756', shares: '198' },
    ];
  
    const postsHtml = topPosts.map((p, i) => `
      <div class="perf__post">
        <div class="perf__post-rank">${i + 1}</div>
        <div class="perf__post-thumb">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm12.75-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="perf__post-info">
          <span class="perf__post-caption">${p.caption}</span>
          <div class="perf__post-stats">
            <span class="perf__stat-mini">${p.reach} reach</span>
            <span class="perf__stat-mini">${p.likes} likes</span>
            <span class="perf__stat-mini">${p.saves} saves</span>
            <span class="perf__stat-mini">${p.shares} shares</span>
          </div>
        </div>
      </div>
    `).join('');
  
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's your content performance dashboard for the last 30 days. Your engagement is trending upward, with educational content leading the way.</p>
    </div>
    <div class="chat-response-card" id="perfCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Content Performance</div>
          <div class="chat-response-card__subtitle">Last 30 days</div>
        </div>
      </div>
      <div class="perf__metrics">
        <div class="perf__metric">
          <span class="perf__metric-value">142K</span>
          <span class="perf__metric-label">Total Reach</span>
        </div>
        <div class="perf__metric">
          <span class="perf__metric-value">4.8%</span>
          <span class="perf__metric-label">Engagement Rate</span>
        </div>
        <div class="perf__metric">
          <span class="perf__metric-value">2,300</span>
          <span class="perf__metric-label">Profile Visits</span>
        </div>
        <div class="perf__metric">
          <span class="perf__metric-value perf__metric-value--positive">+340</span>
          <span class="perf__metric-label">Follower Growth</span>
        </div>
      </div>
      <div class="perf__section-label">Top Performing Posts</div>
      <div class="perf__posts">
        ${postsHtml}
      </div>
      <div class="ai-insight">
        Your <strong>educational content</strong> gets 3x more saves than entertainment posts. Reels posted on <strong>Tuesday &amp; Thursday at 11am</strong> consistently outperform other time slots by 40%. Focus on actionable tips with bold hooks for maximum reach.
      </div>
      <div class="perf__best-time">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span>Best posting time: <strong>Tuesday &amp; Thursday, 11am</strong></span>
      </div>
    </div>`;
  }
  
  
  // ===========================================================
  // DEMO 11: JOURNALING COACH — Reflect AI
  // ===========================================================
  
  // --- Journal Prompt Builder ---
  function buildJournalPrompt() {
    const moods = ['Calm', 'Anxious', 'Grateful', 'Frustrated', 'Hopeful', 'Reflective'];
  
    const moodTagsHtml = moods.map((m, i) => `
      <button class="journal__mood-tag${i === 5 ? ' journal__mood-tag--active' : ''}" data-mood="${m.toLowerCase()}">${m}</button>
    `).join('');
  
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's your journaling space for today. I've crafted a prompt based on what you shared in your last entry.</p>
    </div>
    <div class="chat-response-card" id="journalPromptCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Today's Journal</div>
          <div class="chat-response-card__subtitle">February 27, 2025</div>
        </div>
      </div>
      <div class="journal__prompt-area">
        <div class="journal__ai-prompt">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <p>Yesterday you mentioned feeling overwhelmed at work. Let's dig deeper &mdash; what specifically triggered that feeling? Was it a particular task, a conversation, or something building up over time?</p>
        </div>
        <div class="journal__prev-prompt">
          <span class="journal__prev-label">Previous prompt:</span>
          <span class="journal__prev-text">"Write about a moment this week where you felt truly present."</span>
        </div>
        <div class="journal__writing-area">
          <div class="journal__textarea" contenteditable="false">
            <span class="journal__placeholder">Start writing here...</span>
          </div>
          <div class="journal__word-count">0 words</div>
        </div>
      </div>
      <div class="journal__mood-section">
        <span class="journal__mood-label">How are you feeling right now?</span>
        <div class="journal__mood-tags">
          ${moodTagsHtml}
        </div>
      </div>
      <div class="ad-gen__actions">
        <button class="ad-gen__btn ad-gen__btn--primary">Submit Entry</button>
        <button class="ad-gen__btn ad-gen__btn--ghost">New Prompt</button>
      </div>
    </div>`;
  }
  
  // --- Journal History Thinking State ---
  function buildJournalHistoryThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Analyzing your journal entries...</p>
    </div>
    <div class="chat-response-card">
      <div class="reflect__thinking">
        <div class="reflect__thinking-icon uni-pulse-ring">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="reflect__thinking-text">Analyzing your journal entries...</span>
        <div class="reflect__thinking-steps">
          <div class="reflect__thinking-step">${CHECK_SVG_B4} Reading 18 entries...</div>
          <div class="reflect__thinking-step">${CHECK_SVG_B4} Detecting themes and moods...</div>
          <div class="reflect__thinking-step">${CHECK_SVG_B4} Building entry timeline...</div>
        </div>
        <div class="reflect__progress"><div class="reflect__progress-fill"></div></div>
      </div>
    </div>`;
  }
  
  // --- Journal History Builder ---
  function buildJournalHistory() {
    const entries = [
      { date: 'Feb 26', preview: 'Today felt heavier than usual. The meeting with my manager left me questioning whether I\'m on the right track...', mood: 'Frustrated', themes: ['Work Stress', 'Self-Growth'] },
      { date: 'Feb 25', preview: 'I woke up grateful this morning. The sun was streaming through the window and I just felt... at peace...', mood: 'Grateful', themes: ['Gratitude', 'Self-Growth'] },
      { date: 'Feb 24', preview: 'Had a deep conversation with Sarah about our future plans. It made me realize how much I\'ve been avoiding...', mood: 'Reflective', themes: ['Relationships', 'Self-Growth'] },
      { date: 'Feb 22', preview: 'The deadline pressure is becoming unbearable. Three projects overlapping and I can feel the anxiety building...', mood: 'Anxious', themes: ['Work Stress'] },
      { date: 'Feb 21', preview: 'Tried the new meditation app today. 10 minutes of silence and my mind kept drifting back to work...', mood: 'Calm', themes: ['Self-Growth', 'Work Stress'] },
      { date: 'Feb 19', preview: 'I\'m starting to see a pattern in how I react to criticism. When my boss gave feedback today...', mood: 'Reflective', themes: ['Work Stress', 'Self-Growth'] },
      { date: 'Feb 18', preview: 'Family dinner went better than expected. Mom and I actually had a real conversation for the first time...', mood: 'Hopeful', themes: ['Relationships', 'Gratitude'] },
      { date: 'Feb 16', preview: 'Journaling consistently this week has been eye-opening. I can see my thought patterns more clearly...', mood: 'Reflective', themes: ['Self-Growth'] },
    ];
  
    const filters = [
      { name: 'All', count: 18 },
      { name: 'Work', count: 8 },
      { name: 'Relationships', count: 5 },
      { name: 'Self-Growth', count: 6 },
      { name: 'Gratitude', count: 4 },
    ];
  
    const filtersHtml = filters.map((f, i) => `
      <button class="competitor__filter-btn${i === 0 ? ' competitor__filter-btn--active' : ''}" data-jfilter="${f.name.toLowerCase()}">${f.name} <span class="competitor__filter-count">${f.count}</span></button>
    `).join('');
  
    const entriesHtml = entries.map(e => `
      <div class="journal-hist__entry">
        <div class="journal-hist__entry-top">
          <span class="journal-hist__date">${e.date}</span>
          <span class="journal-hist__mood journal-hist__mood--${e.mood.toLowerCase()}">${e.mood}</span>
        </div>
        <p class="journal-hist__preview">${e.preview}</p>
        <div class="journal-hist__themes">
          ${e.themes.map(t => `<span class="journal-hist__theme">${t}</span>`).join('')}
        </div>
        <button class="journal-hist__view-btn">View Full Entry</button>
      </div>
    `).join('');
  
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's your journal history from the last 30 days. I've detected themes and mood patterns across your 18 entries.</p>
    </div>
    <div class="chat-response-card" id="journalHistCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Journal History</div>
          <div class="chat-response-card__subtitle">Last 30 days &middot; 18 entries</div>
        </div>
      </div>
      <div class="journal-hist__filters">
        ${filtersHtml}
      </div>
      <div class="journal-hist__entries">
        ${entriesHtml}
      </div>
    </div>`;
  }
  
  // --- Pattern Insights Thinking State ---
  function buildPatternThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Finding patterns in your reflections...</p>
    </div>
    <div class="chat-response-card">
      <div class="reflect__thinking">
        <div class="reflect__thinking-icon uni-pulse-ring">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="reflect__thinking-text">Finding patterns in your reflections...</span>
        <div class="reflect__thinking-steps">
          <div class="reflect__thinking-step">${CHECK_SVG_B4} Scanning 18 entries for patterns...</div>
          <div class="reflect__thinking-step">${CHECK_SVG_B4} Mapping mood trajectory...</div>
          <div class="reflect__thinking-step">${CHECK_SVG_B4} Generating insights...</div>
        </div>
        <div class="reflect__progress"><div class="reflect__progress-fill"></div></div>
      </div>
    </div>`;
  }
  
  // --- Pattern Insights Builder ---
  function buildPatternInsights() {
    const patterns = [
      {
        title: 'Work Stress Triggers a Negative Spiral',
        observation: 'When you write about work stress, the following 2-3 entries tend to carry a heavier emotional tone. The trigger is usually a specific interaction with your manager or a deadline, not the workload itself.',
        quote: '"The meeting with my manager left me questioning whether I\'m on the right track..."'
      },
      {
        title: 'Gratitude Entries Break the Cycle',
        observation: 'Every time you write a gratitude-focused entry, the entries that follow show significantly more positive language and forward-looking statements. This suggests intentional gratitude practice is a powerful reset for you.',
        quote: '"I woke up grateful this morning. The sun was streaming through the window and I just felt... at peace."'
      },
      {
        title: 'Relationships Bring Clarity',
        observation: 'Your most reflective and insightful entries come after meaningful conversations with people you care about. These entries tend to produce the most self-awareness and actionable realizations.',
        quote: '"Had a deep conversation with Sarah about our future plans. It made me realize how much I\'ve been avoiding..."'
      },
      {
        title: 'Evening Entries Are More Honest',
        observation: 'Entries written after 8pm contain more emotional depth and vulnerability compared to morning entries. Your evening self seems more willing to explore uncomfortable feelings.',
        quote: '"I\'m starting to see a pattern in how I react to criticism..."'
      }
    ];
  
    const themes = [
      { name: 'Work Stress', count: 8, max: 8 },
      { name: 'Self-Growth', count: 6, max: 8 },
      { name: 'Relationships', count: 5, max: 8 },
      { name: 'Gratitude', count: 4, max: 8 },
    ];
  
    const patternsHtml = patterns.map(p => `
      <div class="pattern__item">
        <div class="pattern__item-title">${p.title}</div>
        <p class="pattern__item-observation">${p.observation}</p>
        <div class="pattern__item-quote">${p.quote}</div>
      </div>
    `).join('');
  
    const themesHtml = themes.map(t => `
      <div class="pattern__theme-row">
        <span class="pattern__theme-name">${t.name}</span>
        <div class="pattern__theme-bar">
          <div class="pattern__theme-fill" style="width: ${(t.count / t.max) * 100}%"></div>
        </div>
        <span class="pattern__theme-count">${t.count}</span>
      </div>
    `).join('');
  
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>I've analyzed patterns across your 18 journal entries from the last 30 days. Here are the key insights I've found.</p>
    </div>
    <div class="chat-response-card" id="patternCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Pattern Insights</div>
          <div class="chat-response-card__subtitle">Based on 18 entries over 30 days</div>
        </div>
      </div>
      <div class="pattern__mood-trend">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 12l3-4 3 2 4-6 2 3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span>Your overall mood has shifted from <strong>'anxious'</strong> to <strong>'reflective'</strong> over the past 2 weeks</span>
      </div>
      <div class="pattern__items">
        ${patternsHtml}
      </div>
      <div class="pattern__themes-section">
        <div class="pattern__themes-label">Recurring Themes</div>
        <div class="pattern__themes">
          ${themesHtml}
        </div>
      </div>
      <div class="ai-insight">
        Your journaling practice is clearly making a difference. The shift from anxious to reflective entries suggests growing emotional awareness. I'd recommend <strong>continuing the gratitude entries</strong> &mdash; they consistently reset your emotional baseline. Also consider scheduling your most important work tasks <strong>after</strong> journaling sessions, when you tend to feel more centered and focused.
      </div>
    </div>`;
  }
  
  // --- Journal Streak Builder ---
  function buildJournalStreak() {
    // Build a 30-day heatmap (Feb 2025 has 28 days, plus a couple from Jan)
    const journaledDays = new Set([1,2,3,5,6,7,9,10,12,14,15,16,18,19,21,22,24,25,26,27]);
    let heatmapHtml = '';
    for (let day = 1; day <= 28; day++) {
      const done = journaledDays.has(day);
      const isToday = day === 27;
      let cls = 'streak__cell';
      if (done) cls += ' streak__cell--done';
      if (isToday) cls += ' streak__cell--today';
      if (day > 27) cls += ' streak__cell--future';
      heatmapHtml += `<div class="${cls}"></div>`;
    }
  
    // Weekly bars (last 4 weeks)
    const weeks = [
      { label: 'Week 1', days: 5, max: 7 },
      { label: 'Week 2', days: 4, max: 7 },
      { label: 'Week 3', days: 5, max: 7 },
      { label: 'Week 4', days: 4, max: 7 },
    ];
  
    const weekBarsHtml = weeks.map(w => `
      <div class="streak__week-bar-row">
        <span class="streak__week-label">${w.label}</span>
        <div class="streak__week-bar">
          <div class="streak__week-bar-fill" style="width: ${(w.days / w.max) * 100}%"></div>
        </div>
        <span class="streak__week-count">${w.days}/${w.max}</span>
      </div>
    `).join('');
  
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's an overview of your journaling journey. You've been remarkably consistent, and that consistency is paying off in the depth of your reflections.</p>
    </div>
    <div class="chat-response-card" id="streakCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Your Journaling Journey</div>
        </div>
      </div>
      <div class="streak__hero">
        <div class="streak__current">
          <span class="streak__current-number">12</span>
          <span class="streak__current-label">day streak</span>
        </div>
        <div class="streak__best">
          <span class="streak__best-label">Longest streak</span>
          <span class="streak__best-value">18 days</span>
        </div>
      </div>
      <div class="streak__heatmap-section">
        <div class="streak__heatmap-title">February 2025</div>
        <div class="streak__heatmap-header">
          <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
        </div>
        <div class="streak__heatmap-grid">
          ${heatmapHtml}
        </div>
        <div class="streak__heatmap-legend">
          <div class="streak__legend-item"><div class="streak__cell streak__cell--done streak__legend-swatch"></div><span>Journaled</span></div>
          <div class="streak__legend-item"><div class="streak__cell streak__legend-swatch"></div><span>Missed</span></div>
          <div class="streak__legend-item"><div class="streak__cell streak__cell--today streak__legend-swatch"></div><span>Today</span></div>
        </div>
      </div>
      <div class="streak__stats-row">
        <div class="streak__stat">
          <span class="streak__stat-value">18/28</span>
          <span class="streak__stat-label">This month (64%)</span>
        </div>
        <div class="streak__stat">
          <span class="streak__stat-value">47</span>
          <span class="streak__stat-label">Total entries</span>
        </div>
      </div>
      <div class="streak__weekly-section">
        <div class="streak__weekly-title">Weekly Consistency</div>
        ${weekBarsHtml}
      </div>
      <div class="streak__encouragement">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0l-4.725 2.885a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span>You're building a powerful habit. Consistency matters more than perfection &mdash; even a few sentences count. Keep showing up for yourself.</span>
      </div>
    </div>`;
  }
  
  
  // ===========================================================
  // DEMO 12: PROGRESS REPORTER — Pulse AI
  // ===========================================================
  
  // --- Report Thinking State ---
  function buildReportThinking() {
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Compiling data from all sources and generating your report...</p>
    </div>
    <div class="chat-response-card">
      <div class="pulse__thinking pulse__thinking--long">
        <div class="pulse__thinking-icon uni-pulse-ring">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="pulse__thinking-text">Compiling data from all sources and generating your report...</span>
        <div class="pulse__thinking-steps">
          <div class="pulse__thinking-step">${CHECK_SVG_B4} Pulling session data...</div>
          <div class="pulse__thinking-step">${CHECK_SVG_B4} Aggregating assignment completions...</div>
          <div class="pulse__thinking-step">${CHECK_SVG_B4} Analyzing goal progress...</div>
          <div class="pulse__thinking-step">${CHECK_SVG_B4} Generating executive summary...</div>
          <div class="pulse__thinking-step">${CHECK_SVG_B4} Formatting final report...</div>
        </div>
        <div class="pulse__progress"><div class="pulse__progress-fill pulse__progress-fill--long"></div></div>
      </div>
    </div>`;
  }
  
  // --- Progress Report Builder ---
  function buildProgressReport() {
    const metrics = [
      { label: 'Sessions Completed', current: '12', previous: '8', change: '+50%', positive: true },
      { label: 'Assignments Done', current: '18', previous: '14', change: '+29%', positive: true },
      { label: 'Avg. Satisfaction', current: '4.7/5', previous: '4.3/5', change: '+9%', positive: true },
      { label: 'Missed Sessions', current: '1', previous: '3', change: '-67%', positive: true },
    ];
  
    const goals = [
      { name: 'Complete 12 coaching sessions', progress: 100, status: 'Completed' },
      { name: 'Implement morning routine consistently', progress: 72, status: 'On Track' },
      { name: 'Launch personal brand website', progress: 45, status: 'In Progress' },
    ];
  
    const metricsHtml = metrics.map(m => `
      <div class="report__metric">
        <span class="report__metric-label">${m.label}</span>
        <div class="report__metric-values">
          <span class="report__metric-current">${m.current}</span>
          <span class="report__metric-comparison">vs ${m.previous} last month</span>
        </div>
        <span class="report__metric-change report__metric-change--${m.positive ? 'positive' : 'negative'}">${m.change}</span>
      </div>
    `).join('');
  
    const goalsHtml = goals.map(g => `
      <div class="report__goal">
        <div class="report__goal-top">
          <span class="report__goal-name">${g.name}</span>
          <span class="report__goal-status report__goal-status--${g.status.toLowerCase().replace(' ', '-')}">${g.status}</span>
        </div>
        <div class="report__goal-bar">
          <div class="report__goal-fill" style="width: ${g.progress}%"></div>
        </div>
        <span class="report__goal-pct">${g.progress}%</span>
      </div>
    `).join('');
  
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Your monthly progress report is ready. This report was auto-generated from your session logs, assignment tracker, and client feedback data.</p>
    </div>
    <div class="chat-response-card" id="reportCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Monthly Progress Report</div>
          <div class="chat-response-card__subtitle">February 2025 &middot; Auto-generated</div>
        </div>
      </div>
      <div class="report__section">
        <div class="report__section-title">Executive Summary</div>
        <p class="report__section-body">February showed strong progress across all key metrics. Session completion rate reached 92%, up from 73% last month. Client engagement has improved significantly, with homework assignments being completed at a higher rate and with greater depth. The primary area for continued focus is the website launch, which is tracking slightly behind schedule.</p>
      </div>
      <div class="report__section">
        <div class="report__section-title">Key Metrics</div>
        <div class="report__metrics">
          ${metricsHtml}
        </div>
      </div>
      <div class="report__section">
        <div class="report__section-title">Goals Progress</div>
        <div class="report__goals">
          ${goalsHtml}
        </div>
      </div>
      <div class="report__section">
        <div class="report__section-title">Highlights</div>
        <ul class="report__highlights">
          <li>Completed 12 out of 13 scheduled sessions &mdash; highest completion rate in 6 months</li>
          <li>Client reported breakthrough in productivity habits during Week 3</li>
          <li>Morning routine adherence improved from 40% to 72% over the month</li>
        </ul>
      </div>
      <div class="report__section">
        <div class="report__section-title">Areas for Improvement</div>
        <ul class="report__improvements">
          <li>Website launch is 2 weeks behind original timeline &mdash; consider breaking into smaller milestones</li>
          <li>Evening journaling consistency dropped in the last week &mdash; may benefit from a reminder system</li>
          <li>One missed session due to scheduling conflict &mdash; consider adding buffer slots</li>
        </ul>
      </div>
      <div class="report__section">
        <div class="report__section-title">Next Steps &amp; Recommendations</div>
        <ul class="report__next-steps">
          <li>Set specific website launch milestones for March (domain, design, content, publish)</li>
          <li>Introduce accountability partner structure for evening routine</li>
          <li>Schedule a mid-month check-in to review goal trajectory</li>
        </ul>
      </div>
      <div class="ad-gen__actions">
        <button class="ad-gen__btn ad-gen__btn--primary">Export PDF</button>
        <button class="ad-gen__btn ad-gen__btn--secondary">Send to Client</button>
        <button class="ad-gen__btn ad-gen__btn--ghost">Edit Report</button>
      </div>
    </div>`;
  }
  
  // --- Activity Aggregator Builder ---
  function buildActivityAggregator() {
    const activities = [
      { type: 'session', icon: 'calendar', desc: 'Coaching Session #12 completed', date: 'Feb 26', status: 'Completed' },
      { type: 'assignment', icon: 'task', desc: 'Morning Routine Tracker submitted', date: 'Feb 25', status: 'Reviewed' },
      { type: 'message', icon: 'chat', desc: 'Client sent follow-up questions about goal setting', date: 'Feb 25', status: 'Replied' },
      { type: 'payment', icon: 'dollar', desc: 'February coaching payment received', date: 'Feb 24', status: '$400.00' },
      { type: 'session', icon: 'calendar', desc: 'Coaching Session #11 completed', date: 'Feb 22', status: 'Completed' },
      { type: 'assignment', icon: 'task', desc: 'Weekly Reflection Journal submitted', date: 'Feb 21', status: 'Reviewed' },
      { type: 'message', icon: 'chat', desc: 'Shared resource: "Atomic Habits" summary notes', date: 'Feb 20', status: 'Read' },
      { type: 'payment', icon: 'dollar', desc: 'Workshop add-on payment received', date: 'Feb 18', status: '$200.00' },
    ];
  
    const sourceIcons = {
      calendar: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="12" height="12" rx="1.5"/><path d="M5 1.5v3M11 1.5v3M2 7h12" stroke-linecap="round"/></svg>',
      task: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 8.5l3 3 7-7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m3.75 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332c1.972-.049 3.918-.217 5.831-.497 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      dollar: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 1v14M11 4H6.5a2.5 2.5 0 000 5h3a2.5 2.5 0 010 5H5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    };
  
    const activitiesHtml = activities.map(a => `
      <div class="activity__item activity__item--${a.type}">
        <div class="activity__icon activity__icon--${a.type}">${sourceIcons[a.icon]}</div>
        <div class="activity__info">
          <span class="activity__desc">${a.desc}</span>
          <span class="activity__date">${a.date}</span>
        </div>
        <span class="activity__status activity__status--${a.type}">${a.status}</span>
      </div>
    `).join('');
  
    const filters = ['All', 'Sessions', 'Assignments', 'Messages', 'Payments'];
    const filtersHtml = filters.map((f, i) => `
      <button class="competitor__filter-btn${i === 0 ? ' competitor__filter-btn--active' : ''}" data-afilter="${f.toLowerCase()}">${f}</button>
    `).join('');
  
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here's your client activity feed aggregated from all connected sources over the last 30 days.</p>
    </div>
    <div class="chat-response-card" id="activityCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Client Activity Feed</div>
          <div class="chat-response-card__subtitle">All sources &middot; Last 30 days</div>
        </div>
      </div>
      <div class="activity__summary">
        <div class="activity__summary-stat">
          <span class="activity__summary-value">12</span>
          <span class="activity__summary-label">Sessions</span>
        </div>
        <div class="activity__summary-stat">
          <span class="activity__summary-value">8</span>
          <span class="activity__summary-label">Assignments</span>
        </div>
        <div class="activity__summary-stat">
          <span class="activity__summary-value">23</span>
          <span class="activity__summary-label">Messages</span>
        </div>
        <div class="activity__summary-stat">
          <span class="activity__summary-value">$1,200</span>
          <span class="activity__summary-label">Collected</span>
        </div>
      </div>
      <div class="activity__filters">
        ${filtersHtml}
      </div>
      <div class="activity__items">
        ${activitiesHtml}
      </div>
    </div>`;
  }
  
  // --- Report Template Builder ---
  function buildReportTemplate() {
    const sections = [
      { name: 'Executive Summary', enabled: true, order: 1 },
      { name: 'Key Metrics', enabled: true, order: 2 },
      { name: 'Goals Progress', enabled: true, order: 3 },
      { name: 'Session Notes', enabled: true, order: 4 },
      { name: 'Homework Status', enabled: true, order: 5 },
      { name: 'Financial Summary', enabled: false, order: 6 },
      { name: 'Next Steps', enabled: true, order: 7 },
    ];
  
    const sectionsHtml = sections.map(s => `
      <div class="template__section-row">
        <span class="template__section-order">${s.order}</span>
        <span class="template__section-name">${s.name}</span>
        <div class="template__toggle${s.enabled ? ' template__toggle--on' : ''}">
          <div class="template__toggle-track">
            <div class="template__toggle-thumb"></div>
          </div>
        </div>
      </div>
    `).join('');
  
    const colors = ['#1e3a5f', '#106844', '#7c3aed', '#e11d48', '#f59e0b'];
    const colorsHtml = colors.map((c, i) => `
      <div class="template__color-swatch${i === 0 ? ' template__color-swatch--active' : ''}" style="background: ${c}"></div>
    `).join('');
  
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here are your report template settings. You can toggle sections on or off, reorder them, and customize your branding.</p>
    </div>
    <div class="chat-response-card" id="templateCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Report Template Settings</div>
        </div>
      </div>
      <div class="template__sections">
        <div class="template__sections-label">Report Sections</div>
        ${sectionsHtml}
      </div>
      <div class="template__branding">
        <div class="template__branding-label">Branding</div>
        <div class="template__brand-row">
          <span class="template__brand-field-label">Coach Name</span>
          <span class="template__brand-field-value">Alex Mitchell</span>
        </div>
        <div class="template__brand-row">
          <span class="template__brand-field-label">Logo</span>
          <div class="template__logo-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm12.75-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span>Upload logo</span>
          </div>
        </div>
        <div class="template__brand-row">
          <span class="template__brand-field-label">Color Scheme</span>
          <div class="template__color-row">
            ${colorsHtml}
          </div>
        </div>
      </div>
      <div class="ad-gen__actions">
        <button class="ad-gen__btn ad-gen__btn--primary">Save Template</button>
        <button class="ad-gen__btn ad-gen__btn--secondary">Preview Report</button>
      </div>
    </div>`;
  }
  
  // --- Report Scheduler Builder ---
  function buildReportScheduler() {
    const recipients = [
      { email: 'alex@coaching.com', role: 'Coach' },
      { email: 'sarah.miller@email.com', role: 'Client' },
      { email: 'team@coaching.com', role: 'Admin' },
    ];
  
    const history = [
      { date: 'Feb 1, 2025', status: 'Opened', statusClass: 'opened' },
      { date: 'Jan 1, 2025', status: 'Clicked', statusClass: 'clicked' },
      { date: 'Dec 1, 2024', status: 'Delivered', statusClass: 'delivered' },
    ];
  
    const recipientsHtml = recipients.map(r => `
      <div class="scheduler__recipient">
        <div class="scheduler__recipient-info">
          <span class="scheduler__recipient-email">${r.email}</span>
          <span class="scheduler__recipient-role">${r.role}</span>
        </div>
        <button class="scheduler__remove-btn">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 2l8 8M10 2l-8 8" stroke-linecap="round"/></svg>
        </button>
      </div>
    `).join('');
  
    const historyHtml = history.map(h => `
      <div class="scheduler__history-item">
        <span class="scheduler__history-date">${h.date}</span>
        <span class="scheduler__history-status scheduler__history-status--${h.statusClass}">${h.status}</span>
      </div>
    `).join('');
  
    return `
    <div class="message-ai-text message-ai-text--spaced">
      <p>Here are your report scheduling settings. You can set the frequency, recipients, and delivery time for automated reports.</p>
    </div>
    <div class="chat-response-card" id="schedulerCard">
      <div class="chat-response-card__header">
        <div>
          <div class="chat-response-card__title">Report Scheduler</div>
        </div>
      </div>
      <div class="scheduler__frequency">
        <span class="scheduler__field-label">Frequency</span>
        <div class="toggle-pill" data-toggle="scheduler-freq">
          <button class="toggle-pill__btn" data-value="weekly">Weekly</button>
          <button class="toggle-pill__btn" data-value="biweekly">Bi-weekly</button>
          <button class="toggle-pill__btn toggle-pill__btn--active" data-value="monthly">Monthly</button>
        </div>
      </div>
      <div class="scheduler__timing">
        <div class="scheduler__timing-field">
          <span class="scheduler__field-label">Day</span>
          <span class="scheduler__field-value">1st of each month</span>
        </div>
        <div class="scheduler__timing-field">
          <span class="scheduler__field-label">Time</span>
          <span class="scheduler__field-value">9:00 AM EST</span>
        </div>
      </div>
      <div class="scheduler__recipients-section">
        <div class="scheduler__recipients-header">
          <span class="scheduler__field-label">Recipients</span>
          <button class="scheduler__add-btn">
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2v8M2 6h8" stroke-linecap="round"/></svg>
            Add Recipient
          </button>
        </div>
        <div class="scheduler__recipients">
          ${recipientsHtml}
        </div>
      </div>
      <div class="scheduler__next-report">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span>Next scheduled report: <strong>March 1, 2025 at 9:00 AM</strong></span>
      </div>
      <div class="scheduler__history-section">
        <span class="scheduler__field-label">Recent Reports</span>
        <div class="scheduler__history">
          ${historyHtml}
        </div>
      </div>
      <div class="ad-gen__actions">
        <button class="ad-gen__btn ad-gen__btn--primary">Schedule</button>
        <button class="ad-gen__btn ad-gen__btn--secondary">Send Now</button>
      </div>
    </div>`;
  }
  
  
  // ===========================================================
  // ===========================================================
  // COMPONENT INTERACTIONS
  // ===========================================================

  function initComponentInteractions(container) {
    // Toggle pills (shared)
    container.querySelectorAll('.toggle-pill').forEach(pill => {
      const btns = pill.querySelectorAll('.toggle-pill__btn');
      const toggleName = pill.dataset.toggle;
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          btns.forEach(b => b.classList.remove('toggle-pill__btn--active'));
          btn.classList.add('toggle-pill__btn--active');
          // Find panels in this card
          const card = pill.closest('.chat-response-card');
          if (toggleName === 'nutrition-view') {
            const daily = card.querySelector('[data-panel="daily"]');
            const weeklyPanel = card.querySelector('[data-panel="weekly"]');
            if (btn.dataset.value === 'daily') {
              daily.classList.remove('hidden');
              weeklyPanel.classList.add('hidden');
            } else {
              daily.classList.add('hidden');
              weeklyPanel.classList.remove('hidden');
            }
          }
        });
      });
    });

    // Cal AI add button
    const addBtn = container.querySelector('#calAiAddBtn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        const footer = container.querySelector('#calAiFooter');
        footer.innerHTML = `
          <div class="cal-ai__added">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8l4 4 6-7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Added to Today's Plan — 738 kcal logged
          </div>`;
      });
    }

    // Competitor filter buttons
    const competitorFilters = container.querySelector('#competitorFilters');
    if (competitorFilters) {
      const filterBtns = competitorFilters.querySelectorAll('.competitor__filter-btn');
      const adCards = container.querySelectorAll('.competitor__ad-card');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('competitor__filter-btn--active'));
          btn.classList.add('competitor__filter-btn--active');
          const filter = btn.dataset.filter;
          adCards.forEach(card => {
            if (filter === 'all' || card.dataset.format === filter) {
              card.style.display = '';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }

    // Ad Creative Generator tabs
    const adGenTabs = container.querySelector('#adGenTabs');
    if (adGenTabs) {
      const tabs = adGenTabs.querySelectorAll('.ad-gen__tab');
      const card = adGenTabs.closest('.chat-response-card');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('ad-gen__tab--active'));
          tab.classList.add('ad-gen__tab--active');
          const idx = tab.dataset.concept;
          card.querySelectorAll('[data-concept-panel]').forEach(panel => {
            panel.classList.toggle('hidden', panel.dataset.conceptPanel !== idx);
          });
        });
      });
    }

    // Ad Creative Generator "Generate Images" button
    const genImagesBtn = container.querySelector('#adGenGenerateImages');
    if (genImagesBtn) {
      genImagesBtn.addEventListener('click', () => {
        sendMessage('Generate images for these ad concepts', false);
      });
    }

    // Creative Preview variation selection
    const previewGrid = container.querySelector('#creativePreviewGrid');
    if (previewGrid) {
      const variations = previewGrid.querySelectorAll('.creative-preview__variation');
      const selectionEl = container.querySelector('#creativePreviewSelection');
      variations.forEach(v => {
        v.addEventListener('click', () => {
          v.classList.toggle('creative-preview__variation--selected');
          const selectedCount = previewGrid.querySelectorAll('.creative-preview__variation--selected').length;
          if (selectionEl) {
            selectionEl.innerHTML = `Selected: <strong>${selectedCount} of 4</strong> variations`;
          }
        });
      });
    }

    // Video diagnostic volume control
    const videoWrap = container.querySelector('.video-diagnostic__wrap');
    if (videoWrap) {
      const video = videoWrap.querySelector('.video-diagnostic__player');
      const muteBtn = videoWrap.querySelector('.video-diagnostic__volume-btn');
      const slider = videoWrap.querySelector('.video-diagnostic__volume-slider');
      const volIcon = videoWrap.querySelector('.video-diagnostic__vol-icon');
      const muteIcon = videoWrap.querySelector('.video-diagnostic__mute-icon');

      function updateVolumeUI() {
        const muted = video.muted || video.volume === 0;
        volIcon.classList.toggle('hidden', muted);
        muteIcon.classList.toggle('hidden', !muted);
        slider.value = muted ? 0 : video.volume;
      }

      video.addEventListener('click', () => {
        if (video.paused) video.play();
        else video.pause();
      });

      muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        updateVolumeUI();
      });

      slider.addEventListener('input', () => {
        video.volume = parseFloat(slider.value);
        video.muted = video.volume === 0;
        updateVolumeUI();
      });
    }

    // Personality toggle (overview/traits)
    container.querySelectorAll('.toggle-pill').forEach(pill => {
      const toggleName = pill.dataset.toggle;
      if (toggleName === 'personality-view') {
        const btns = pill.querySelectorAll('.toggle-pill__btn');
        btns.forEach(btn => {
          btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('toggle-pill__btn--active'));
            btn.classList.add('toggle-pill__btn--active');
            const card = pill.closest('.chat-response-card');
            const overview = card.querySelector('[data-panel="overview"]');
            const traits = card.querySelector('[data-panel="traits"]');
            if (btn.dataset.value === 'overview') {
              overview.classList.remove('hidden');
              traits.classList.add('hidden');
            } else {
              overview.classList.add('hidden');
              traits.classList.remove('hidden');
            }
          });
        });
      }
    });

    // Conversation guide phase accordion
    const convoPhases = container.querySelector('#convoPhases');
    if (convoPhases) {
      const phases = convoPhases.querySelectorAll('.convo__phase');
      phases.forEach(phase => {
        phase.querySelector('.convo__phase-header').addEventListener('click', () => {
          phases.forEach(p => p.classList.remove('convo__phase--active'));
          phase.classList.add('convo__phase--active');
          scrollToBottom();
        });
      });
    }

    // Form analyzer compare toggle
    const compareToggle = container.querySelector('#formCompareToggle');
    if (compareToggle) {
      compareToggle.addEventListener('click', () => {
        const switchEl = container.querySelector('#formCompareSwitch');
        const sideBySide = container.querySelector('#formSideBySide');
        const singleView = container.querySelector('#formAnalyzerImageSingle');
        const isActive = switchEl.classList.toggle('form-analyzer__compare-toggle--active');
        if (isActive) {
          if (singleView) singleView.classList.add('hidden');
          sideBySide.classList.remove('hidden');
        } else {
          if (singleView) singleView.classList.remove('hidden');
          sideBySide.classList.add('hidden');
        }
        scrollToBottom();
      });
    }

    // --- Mike AI: Webinar toggle (outline/full script) ---
    container.querySelectorAll('.toggle-pill').forEach(pill => {
      const toggleName = pill.dataset.toggle;
      if (toggleName === 'webinar-view') {
        const btns = pill.querySelectorAll('.toggle-pill__btn');
        btns.forEach(btn => {
          btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('toggle-pill__btn--active'));
            btn.classList.add('toggle-pill__btn--active');
            const card = pill.closest('.chat-response-card');
            const outline = card.querySelector('[data-panel="outline"]');
            const full = card.querySelector('[data-panel="full"]');
            if (btn.dataset.value === 'outline') {
              outline.classList.remove('hidden');
              full.classList.add('hidden');
            } else {
              outline.classList.add('hidden');
              full.classList.remove('hidden');
            }
            scrollToBottom();
          });
        });
      }
    });

    // --- Mike AI: Webinar section accordion ---
    const webinarSections = container.querySelector('#webinarSections');
    if (webinarSections) {
      const sections = webinarSections.querySelectorAll('.webinar__section');
      sections.forEach(section => {
        section.querySelector('.webinar__section-header').addEventListener('click', () => {
          sections.forEach(s => s.classList.remove('webinar__section--active'));
          section.classList.add('webinar__section--active');
          scrollToBottom();
        });
      });
    }

    // --- Mike AI: Funnel FAQ accordion ---
    const funnelFaq = container.querySelector('#funnelFaq');
    if (funnelFaq) {
      const items = funnelFaq.querySelectorAll('.funnel__faq-item');
      items.forEach(item => {
        item.querySelector('.funnel__faq-q').addEventListener('click', () => {
          const wasActive = item.classList.contains('funnel__faq-item--active');
          items.forEach(i => i.classList.remove('funnel__faq-item--active'));
          if (!wasActive) item.classList.add('funnel__faq-item--active');
          scrollToBottom();
        });
      });
    }

    // --- Mike AI: Email sequence accordion ---
    const emailAccordion = container.querySelector('#emailSeqAccordion');
    if (emailAccordion) {
      const emails = emailAccordion.querySelectorAll('.email-seq__email');
      emails.forEach(email => {
        email.querySelector('.email-seq__email-header').addEventListener('click', () => {
          emails.forEach(e => e.classList.remove('email-seq__email--active'));
          email.classList.add('email-seq__email--active');
          scrollToBottom();
        });
      });
    }

    // --- Mike AI: Hook filter buttons ---
    const hookFilters = container.querySelector('#hookFilters');
    if (hookFilters) {
      const filterBtns = hookFilters.querySelectorAll('.competitor__filter-btn');
      const hookCards = container.querySelectorAll('.hook-gen__card');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('competitor__filter-btn--active'));
          btn.classList.add('competitor__filter-btn--active');
          const filter = btn.dataset.hfilter;
          hookCards.forEach(card => {
            if (filter === 'all' || card.dataset.angle === filter) {
              card.style.display = '';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }

    // --- Mike AI: "Turn Hooks into Full Ads" cross-component trigger ---
    const hookToFunnel = container.querySelector('#hookToFunnel');
    if (hookToFunnel) {
      hookToFunnel.addEventListener('click', () => {
        sendMessage('Create a full sales funnel with ad campaigns', false);
      });
    }

    // --- Coach Flex: Photo Add to Log button ---
    const trainerPhotoAddBtn = container.querySelector('#trainerPhotoAddBtn');
    if (trainerPhotoAddBtn) {
      trainerPhotoAddBtn.addEventListener('click', () => {
        const footer = container.querySelector('#trainerPhotoFooter');
        footer.innerHTML = `
          <div class="cal-ai__added">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8l4 4 6-7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Added to Today's Log \u2014 750 kcal logged
          </div>`;
      });
    }

    // --- Coach Flex: Log Workout button ---
    const trainerLogWorkout = container.querySelector('#trainerLogWorkout');
    if (trainerLogWorkout) {
      trainerLogWorkout.addEventListener('click', () => {
        trainerLogWorkout.textContent = 'Workout Logged \u2713';
        trainerLogWorkout.disabled = true;
        trainerLogWorkout.style.opacity = '0.7';
      });
    }

    // --- Coach Flex: Check-in interactions ---
    const trainerCheckinCard = container.querySelector('#trainerCheckinCard');
    if (trainerCheckinCard) {
      // Option buttons
      trainerCheckinCard.querySelectorAll('.trainer-checkin__q-options').forEach(group => {
        group.querySelectorAll('.trainer-checkin__opt').forEach(btn => {
          btn.addEventListener('click', () => {
            group.querySelectorAll('.trainer-checkin__opt').forEach(b => b.classList.remove('trainer-checkin__opt--active'));
            btn.classList.add('trainer-checkin__opt--active');
          });
        });
      });

      // Water slider
      const waterSlider = trainerCheckinCard.querySelector('#trainerWaterSlider');
      const waterVal = trainerCheckinCard.querySelector('#trainerWaterVal');
      if (waterSlider && waterVal) {
        waterSlider.addEventListener('input', () => {
          waterVal.textContent = waterSlider.value + ' glasses';
        });
      }

      // Submit button
      const submitBtn = trainerCheckinCard.querySelector('#trainerCheckinSubmit');
      if (submitBtn) {
        submitBtn.addEventListener('click', () => {
          const meals = trainerCheckinCard.querySelector('[data-checkin="meals"] .trainer-checkin__opt--active');
          const workout = trainerCheckinCard.querySelector('[data-checkin="workout"] .trainer-checkin__opt--active');
          const sleep = trainerCheckinCard.querySelector('[data-checkin="sleep"] .trainer-checkin__opt--active');
          const water = trainerCheckinCard.querySelector('#trainerWaterSlider');
          const summaryEl = trainerCheckinCard.querySelector('#trainerCheckinSummary');
          const itemsEl = trainerCheckinCard.querySelector('#trainerCheckinItems');
          const insightEl = trainerCheckinCard.querySelector('#trainerCheckinInsight');

          const results = [
            { label: 'Meals', value: meals ? meals.dataset.val : 'not answered', icon: '\uD83C\uDF5C' },
            { label: 'Water', value: water ? water.value + ' glasses' : '0 glasses', icon: '\uD83D\uDCA7' },
            { label: 'Workout', value: workout ? workout.dataset.val : 'not answered', icon: '\uD83C\uDFCB\uFE0F' },
            { label: 'Sleep', value: sleep ? sleep.dataset.val : 'not answered', icon: '\uD83D\uDE34' },
          ];

          itemsEl.innerHTML = results.map(r => `
            <div class="trainer-checkin__summary-row">
              <span>${r.icon} ${r.label}</span>
              <span><strong>${r.value}</strong></span>
            </div>`).join('');

          insightEl.innerHTML = 'Great check-in! Based on your responses, you\'re staying <strong>consistent with your nutrition</strong>. Keep up the water intake \u2014 aim for at least 8 glasses daily. Tomorrow is a new opportunity to hit every target.';

          submitBtn.classList.add('hidden');
          summaryEl.classList.remove('hidden');
          scrollToBottom();
        });
      }
    }

    // --- Adeline AI: Pause Underperformers button ---
    const fbadsPauseBtn = container.querySelector('#fbadsPauseBtn');
    if (fbadsPauseBtn) {
      fbadsPauseBtn.addEventListener('click', () => {
        const footer = container.querySelector('#fbadsPauseFooter');
        footer.innerHTML = `
          <div class="cal-ai__added">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8l4 4 6-7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            All 3 underperforming ads paused successfully
          </div>`;
      });
    }

    // --- Adeline AI: Push to Ads Manager button ---
    const fbadsPushBtn = container.querySelector('#fbadsPushToManager');
    if (fbadsPushBtn) {
      fbadsPushBtn.addEventListener('click', () => {
        fbadsPushBtn.textContent = 'Pushed to Ads Manager \u2713';
        fbadsPushBtn.disabled = true;
        fbadsPushBtn.style.opacity = '0.7';
      });
    }

    // --- Adeline AI: A/B Test Create buttons ---
    const fbadsTestCard = container.querySelector('#fbadsTestCard');
    if (fbadsTestCard) {
      fbadsTestCard.querySelectorAll('.fbads-test__create-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          btn.textContent = 'Test Created \u2713';
          btn.disabled = true;
          btn.style.opacity = '0.7';
        });
      });
    }

    // --- Nexus AI: Send to Team / Export buttons ---
    const bizSendToTeam = container.querySelector('#bizSendToTeam');
    if (bizSendToTeam) {
      bizSendToTeam.addEventListener('click', () => {
        bizSendToTeam.textContent = 'Sent to Team \u2713';
        bizSendToTeam.disabled = true;
        bizSendToTeam.style.opacity = '0.7';
      });
    }
    const bizExportSummary = container.querySelector('#bizExportSummary');
    if (bizExportSummary) {
      bizExportSummary.addEventListener('click', () => {
        bizExportSummary.textContent = 'Exported \u2713';
        bizExportSummary.disabled = true;
        bizExportSummary.style.opacity = '0.7';
      });
    }

    // --- Nexus AI: Delegated task follow-up buttons ---
    const followupBtns = container.querySelectorAll('.biz-delegated__followup-btn');
    followupBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.biz-delegated__item');
        const name = item ? item.querySelector('.biz-delegated__assignee-name') : null;
        btn.textContent = 'Sent!';
        btn.style.color = '#059669';
        btn.style.borderColor = 'rgba(5,150,105,0.2)';
        btn.style.background = 'rgba(5,150,105,0.06)';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = 'Follow Up';
          btn.style.color = '';
          btn.style.borderColor = '';
          btn.style.background = '';
          btn.disabled = false;
        }, 2000);
      });
    });

    // --- Sage AI: Onboarding wizard navigation ---
    const onboardingCard = container.querySelector('#mindsetOnboardingCard');
    if (onboardingCard) {
      let currentStep = 1;
      const totalSteps = 4;
      const nextBtn = onboardingCard.querySelector('#sageOnboardNext');
      const backBtn = onboardingCard.querySelector('#sageOnboardBack');

      function updateOnboardStep() {
        onboardingCard.querySelectorAll('[data-onboard-step]').forEach(p => {
          p.classList.toggle('hidden', parseInt(p.dataset.onboardStep) !== currentStep);
        });
        onboardingCard.querySelectorAll('.sage-onboard__step-dot').forEach(d => {
          const stepNum = parseInt(d.dataset.step);
          d.classList.toggle('sage-onboard__step-dot--active', stepNum === currentStep);
          d.classList.toggle('sage-onboard__step-dot--done', stepNum < currentStep);
        });
        backBtn.classList.toggle('hidden', currentStep === 1);
        nextBtn.textContent = currentStep === totalSteps ? 'Complete Onboarding' : 'Next Step';
        scrollToBottom();
      }

      nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
          currentStep++;
          updateOnboardStep();
        } else {
          // Complete - show confirmation
          onboardingCard.querySelector('.sage-onboard__panels').innerHTML = `
            <div class="sage-onboard__complete">
              <div class="sage-onboard__complete-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <div class="sage-onboard__complete-title">Onboarding Complete!</div>
              <div class="sage-onboard__complete-text">I've captured your goals, values, and preferences. Your coaching experience is now personalized. Let's get started on your journey.</div>
            </div>`;
          onboardingCard.querySelector('.sage-onboard__nav').classList.add('hidden');
          scrollToBottom();
        }
      });

      backBtn.addEventListener('click', () => {
        if (currentStep > 1) {
          currentStep--;
          updateOnboardStep();
        }
      });

      // Value chips toggle
      onboardingCard.querySelectorAll('.sage-onboard__chip').forEach(chip => {
        chip.addEventListener('click', () => {
          chip.classList.toggle('sage-onboard__chip--active');
        });
      });
    }

    // --- Sage AI: 30/60/90 Plan accordion ---
    const sagePlanPhases = container.querySelector('#sagePlanPhases');
    if (sagePlanPhases) {
      const phases = sagePlanPhases.querySelectorAll('.sage-plan__phase');
      phases.forEach(phase => {
        phase.querySelector('.sage-plan__phase-header').addEventListener('click', () => {
          phases.forEach(p => p.classList.remove('sage-plan__phase--active'));
          phase.classList.add('sage-plan__phase--active');
          scrollToBottom();
        });
      });
    }

    // --- Sage AI: Daily Check-In interactions ---
    const sageCheckinCard = container.querySelector('#sageCheckinCard');
    if (sageCheckinCard) {
      // Option buttons
      sageCheckinCard.querySelectorAll('.sage-checkin__q-options').forEach(group => {
        group.querySelectorAll('.trainer-checkin__opt').forEach(btn => {
          btn.addEventListener('click', () => {
            group.querySelectorAll('.trainer-checkin__opt').forEach(b => b.classList.remove('trainer-checkin__opt--active'));
            btn.classList.add('trainer-checkin__opt--active');
          });
        });
      });

      // Mood slider with adaptive follow-up
      const moodSlider = sageCheckinCard.querySelector('#sageMoodSlider');
      const moodVal = sageCheckinCard.querySelector('#sageMoodVal');
      const followup = sageCheckinCard.querySelector('#sageCheckinFollowup');
      if (moodSlider && moodVal) {
        moodSlider.addEventListener('input', () => {
          moodVal.textContent = moodSlider.value + ' / 10';
          // Show follow-up if mood is low
          if (parseInt(moodSlider.value) <= 4 && followup) {
            followup.classList.remove('hidden');
          } else if (followup) {
            followup.classList.add('hidden');
          }
        });
      }

      // Submit
      const sageSubmit = sageCheckinCard.querySelector('#sageCheckinSubmit');
      if (sageSubmit) {
        sageSubmit.addEventListener('click', () => {
          sageSubmit.textContent = 'Check-In Complete \u2713';
          sageSubmit.disabled = true;
          sageSubmit.style.opacity = '0.7';
          scrollToBottom();
        });
      }
    }

    // --- Sales Coach: Scorecard category expand/collapse ---
    container.querySelectorAll('.scorecard__category').forEach(cat => {
      const header = cat.querySelector('.scorecard__category-header');
      if (header) {
        header.addEventListener('click', () => {
          cat.classList.toggle('scorecard__category--active');
          scrollToBottom();
        });
      }
    });

    // --- Sales Coach: Call History filter pills ---
    const callHistFilters = container.querySelector('#callHistFilters');
    if (callHistFilters) {
      const filterBtns = callHistFilters.querySelectorAll('.competitor__filter-btn');
      const callRows = container.querySelectorAll('.callhist__row');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('competitor__filter-btn--active'));
          btn.classList.add('competitor__filter-btn--active');
          const filter = btn.dataset.filter;
          callRows.forEach(row => {
            if (filter === 'all' || row.dataset.calltype === filter) {
              row.style.display = '';
            } else {
              row.style.display = 'none';
            }
          });
        });
      });
    }

    // --- Sales Coach: Playbook accordion ---
    container.querySelectorAll('.playbook__section').forEach(section => {
      const header = section.querySelector('.playbook__section-header');
      if (header) {
        header.addEventListener('click', () => {
          const wasOpen = section.classList.contains('playbook__section--open');
          container.querySelectorAll('.playbook__section').forEach(s => s.classList.remove('playbook__section--open'));
          if (!wasOpen) section.classList.add('playbook__section--open');
          scrollToBottom();
        });
      }
    });

    // --- Real Estate: Comparable filter pills ---
    const compFilters = container.querySelector('#compFilters');
    if (compFilters) {
      const filterBtns = compFilters.querySelectorAll('.competitor__filter-btn');
      const compCards = container.querySelectorAll('.comp__card');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('competitor__filter-btn--active'));
          btn.classList.add('competitor__filter-btn--active');
          const filter = btn.dataset.filter;
          compCards.forEach(card => {
            if (filter === 'all' || card.dataset.status === filter) {
              card.style.display = '';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }

    // --- Real Estate: CMA Export/Share buttons ---
    const cmaExport = container.querySelector('#cmaExportBtn');
    if (cmaExport) {
      cmaExport.addEventListener('click', () => {
        cmaExport.textContent = 'Report Exported';
        cmaExport.disabled = true;
        cmaExport.style.opacity = '0.7';
      });
    }
    const cmaShare = container.querySelector('#cmaShareBtn');
    if (cmaShare) {
      cmaShare.addEventListener('click', () => {
        cmaShare.textContent = 'Shared with Client';
        cmaShare.disabled = true;
        cmaShare.style.opacity = '0.7';
      });
    }

    // --- TX Coordinator: Send Reminder buttons ---
    container.querySelectorAll('.txcoord__reminder-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.textContent = 'Reminder Sent';
        btn.disabled = true;
        btn.style.opacity = '0.7';
      });
    });

    // --- TX Coordinator: Filter toggle pills ---
    container.querySelectorAll('.toggle-pill').forEach(pill => {
      const toggleName = pill.dataset.toggle;
      if (toggleName === 'txcoord-filter') {
        const btns = pill.querySelectorAll('.toggle-pill__btn');
        const txRows = container.querySelectorAll('.txcoord__deal');
        btns.forEach(btn => {
          btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('toggle-pill__btn--active'));
            btn.classList.add('toggle-pill__btn--active');
            const filter = btn.dataset.value;
            txRows.forEach(row => {
              if (filter === 'all' || row.dataset.side === filter) {
                row.style.display = '';
              } else {
                row.style.display = 'none';
              }
            });
          });
        });
      }
    });

    // --- Executive: Survey Send button ---
    const surveyBtn = container.querySelector('#sendSurveyBtn');
    if (surveyBtn) {
      surveyBtn.addEventListener('click', () => {
        surveyBtn.textContent = 'Survey Sent';
        surveyBtn.disabled = true;
        surveyBtn.style.opacity = '0.7';
      });
    }

    // --- Executive: Development plan Share/Reminders ---
    const devShareBtn = container.querySelector('#devShareBtn');
    if (devShareBtn) {
      devShareBtn.addEventListener('click', () => {
        devShareBtn.textContent = 'Shared with Coach';
        devShareBtn.disabled = true;
        devShareBtn.style.opacity = '0.7';
      });
    }
    const devRemindBtn = container.querySelector('#devRemindBtn');
    if (devRemindBtn) {
      devRemindBtn.addEventListener('click', () => {
        devRemindBtn.textContent = 'Reminders Set';
        devRemindBtn.disabled = true;
        devRemindBtn.style.opacity = '0.7';
      });
    }

    // --- Finance: Transaction Feed filter pills ---
    const wealthFilters = container.querySelector('#wealthTxFilters');
    if (wealthFilters) {
      const filterBtns = wealthFilters.querySelectorAll('.competitor__filter-btn');
      const txRows = container.querySelectorAll('.wealth__tx-row');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('competitor__filter-btn--active'));
          btn.classList.add('competitor__filter-btn--active');
          const filter = btn.dataset.filter;
          txRows.forEach(row => {
            if (filter === 'all' || row.dataset.category === filter) {
              row.style.display = '';
            } else {
              row.style.display = 'none';
            }
          });
        });
      });
    }

    // --- Influencer: Reel script tabs ---
    const reelTabs = container.querySelector('#reelTabs');
    if (reelTabs) {
      const tabs = reelTabs.querySelectorAll('[data-reel-tab]');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('toggle-pill__btn--active'));
          tab.classList.add('toggle-pill__btn--active');
          const target = tab.dataset.reelTab;
          container.querySelectorAll('[data-reel-panel]').forEach(p => {
            p.classList.toggle('hidden', p.dataset.reelPanel !== target);
          });
          scrollToBottom();
        });
      });
    }

    // --- Journal: Mood tag selection ---
    container.querySelectorAll('.journal__mood-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        container.querySelectorAll('.journal__mood-tag').forEach(t => t.classList.remove('journal__mood-tag--active'));
        tag.classList.add('journal__mood-tag--active');
      });
    });

    // --- Journal: Submit Entry ---
    const journalSubmit = container.querySelector('#journalSubmitBtn');
    if (journalSubmit) {
      journalSubmit.addEventListener('click', () => {
        journalSubmit.textContent = 'Entry Saved';
        journalSubmit.disabled = true;
        journalSubmit.style.opacity = '0.7';
      });
    }

    // --- Journal: History filter ---
    const journalFilters = container.querySelector('#journalHistFilters');
    if (journalFilters) {
      const filterBtns = journalFilters.querySelectorAll('.competitor__filter-btn');
      const entries = container.querySelectorAll('.journal-hist__entry');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('competitor__filter-btn--active'));
          btn.classList.add('competitor__filter-btn--active');
          const filter = btn.dataset.filter;
          entries.forEach(entry => {
            if (filter === 'all' || entry.dataset.theme === filter) {
              entry.style.display = '';
            } else {
              entry.style.display = 'none';
            }
          });
        });
      });
    }

    // --- Reporter: Template toggles ---
    container.querySelectorAll('.template__toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('template__toggle--on');
      });
    });

    // --- Reporter: Activity source filter ---
    const activityFilters = container.querySelector('#activityFilters');
    if (activityFilters) {
      const filterBtns = activityFilters.querySelectorAll('.competitor__filter-btn');
      const items = container.querySelectorAll('.activity__item');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('competitor__filter-btn--active'));
          btn.classList.add('competitor__filter-btn--active');
          const filter = btn.dataset.filter;
          items.forEach(item => {
            if (filter === 'all' || item.dataset.source === filter) {
              item.style.display = '';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    }

    // --- Reporter: Export/Send buttons ---
    const reportExport = container.querySelector('#reportExportBtn');
    if (reportExport) {
      reportExport.addEventListener('click', () => {
        reportExport.textContent = 'PDF Exported';
        reportExport.disabled = true;
        reportExport.style.opacity = '0.7';
      });
    }
    const reportSend = container.querySelector('#reportSendBtn');
    if (reportSend) {
      reportSend.addEventListener('click', () => {
        reportSend.textContent = 'Sent to Client';
        reportSend.disabled = true;
        reportSend.style.opacity = '0.7';
      });
    }

    // --- Reporter: Schedule button ---
    const scheduleBtn = container.querySelector('#scheduleBtn');
    if (scheduleBtn) {
      scheduleBtn.addEventListener('click', () => {
        scheduleBtn.textContent = 'Schedule Saved';
        scheduleBtn.disabled = true;
        scheduleBtn.style.opacity = '0.7';
      });
    }
    const sendNowBtn = container.querySelector('#sendNowBtn');
    if (sendNowBtn) {
      sendNowBtn.addEventListener('click', () => {
        sendNowBtn.textContent = 'Report Sent';
        sendNowBtn.disabled = true;
        sendNowBtn.style.opacity = '0.7';
      });
    }
  }

  // ===========================================================
  // AI RESPONSE ROUTING
  // ===========================================================

  function getAIResponse(userText) {
    const lower = userText.toLowerCase();

    // --- Coach Flex (Trainer) component triggers ---

    // Trainer: Photo-to-macros scan
    if (currentDemo.id === 'trainer' && (lower.includes('scan') || lower.includes('photo') || lower.includes('snap') ||
        lower.includes('estimate the macros') || lower.includes('meal photo'))) {
      return { component: buildTrainerPhotoMacros(), trainerPhotoScanning: true, userImage: IMG.meal };
    }

    // Trainer: Weekly nutrition dashboard
    if (currentDemo.id === 'trainer' && (lower.includes('nutrition dashboard') || lower.includes('calorie tracking') ||
        lower.includes('daily nutrition') || lower.includes('weekly nutrition'))) {
      return { component: buildTrainerWeeklyNutrition(), trainerThinking: true };
    }

    // Trainer: Workout plan
    if (currentDemo.id === 'trainer' && (lower.includes('workout plan') || lower.includes('exercise log') ||
        lower.includes('workout') && lower.includes('week') || lower.includes('training plan'))) {
      return { component: buildTrainerWorkoutPlan(), trainerThinking: true };
    }

    // Trainer: Daily check-in
    if (currentDemo.id === 'trainer' && (lower.includes('check-in') || lower.includes('checkin') || lower.includes('accountability') ||
        lower.includes('daily check') || lower.includes('check in'))) {
      return { component: buildTrainerCheckin(), trainerCheckinLoading: true };
    }

    // Trainer: Meal plan
    if (currentDemo.id === 'trainer' && (lower.includes('meal plan') || lower.includes('macros') || lower.includes('nutrition') ||
        lower.includes('calories') || lower.includes('what should i eat'))) {
      return { component: buildTrainerMealPlan(), trainerThinking: true };
    }

    // --- Adeline AI (FB Ads) component triggers ---

    // FB Ads: Dashboard
    if (currentDemo.id === 'fbads' && (lower.includes('dashboard') || lower.includes('campaign performance') ||
        lower.includes('active campaign') || lower.includes('how are my campaigns') || lower.includes('performance dashboard'))) {
      return { component: buildFbAdsDashboard(), fbadsDashboardLoading: true };
    }

    // FB Ads: Pause underperformers
    if (currentDemo.id === 'fbads' && (lower.includes('pause') || lower.includes('underperform') ||
        lower.includes('which ads should i') || lower.includes('stop') && lower.includes('ads'))) {
      return { component: buildFbAdsPauseUnderperformers(), fbadsDashboardLoading: true };
    }

    // FB Ads: Generate variations
    if (currentDemo.id === 'fbads' && (lower.includes('variation') || lower.includes('new ad') && lower.includes('top') ||
        lower.includes('generate') && lower.includes('ad') || lower.includes('ad copy'))) {
      return { component: buildFbAdsVariations(), fbadsDashboardLoading: true };
    }

    // FB Ads: A/B tests
    if (currentDemo.id === 'fbads' && (lower.includes('a/b test') || lower.includes('ab test') || lower.includes('split test') ||
        lower.includes('test') && lower.includes('suggest') || lower.includes('what') && lower.includes('test'))) {
      return { component: buildFbAdsAbTest(), fbadsDashboardLoading: true };
    }

    // --- Nexus AI (Business Consultant) component triggers ---

    // Biz: Multi-platform dashboard
    if (currentDemo.id === 'bizconsult' && (lower.includes('dashboard') || lower.includes('quickbooks') ||
        lower.includes('clickup') || lower.includes('slack') || lower.includes('multi-platform') ||
        lower.includes('pull data'))) {
      return { component: buildBizMultiDashboard(), bizDashboardLoading: true };
    }

    // Biz: Project tracker
    if (currentDemo.id === 'bizconsult' && (lower.includes('project') && (lower.includes('milestone') || lower.includes('status') || lower.includes('progress')) ||
        lower.includes('project tracker'))) {
      return { component: buildBizProjectTracker(), bizDashboardLoading: true };
    }

    // Biz: Weekly summary
    if (currentDemo.id === 'bizconsult' && (lower.includes('weekly summary') || lower.includes('weekly business') ||
        lower.includes('generate') && lower.includes('summary') || lower.includes('weekly report') ||
        lower.includes('action items'))) {
      return { component: buildBizWeeklySummary(), bizDashboardLoading: true };
    }

    // Biz: Notifications / attention
    if (currentDemo.id === 'bizconsult' && (lower.includes('attention') || lower.includes('notification') ||
        lower.includes('what needs') || lower.includes('send update') || lower.includes('alert'))) {
      return { component: buildBizNotifications(), bizDashboardLoading: true };
    }

    // --- Sage AI (Mindset Coach) component triggers ---

    // Mindset: Onboarding
    if (currentDemo.id === 'mindset' && (lower.includes('onboarding') || lower.includes('goals') && lower.includes('values') ||
        lower.includes('capture my goals') || lower.includes('get started') ||
        lower.includes('desires') && lower.includes('fears'))) {
      return { component: buildMindsetOnboarding(), sageOnboardingLoading: true };
    }

    // Mindset: 30/60/90 plan (before memory route — suggestion contains "my profile")
    if (currentDemo.id === 'mindset' && (lower.includes('30/60/90') || lower.includes('growth plan') ||
        lower.includes('coaching plan') || lower.includes('90 day') || lower.includes('60 day') ||
        lower.includes('30 day'))) {
      return { component: buildMindsetPlanGenerator(), sageOnboardingLoading: true };
    }

    // Mindset: Memory display
    if (currentDemo.id === 'mindset' && (lower.includes('memory') || lower.includes('everything you know') ||
        lower.includes('what do you know') || lower.includes('my profile') || lower.includes('about me'))) {
      return { component: buildMindsetMemoryDisplay(), sageMemoryLoading: true };
    }

    // Mindset: Daily check-in
    if (currentDemo.id === 'mindset' && (lower.includes('check-in') || lower.includes('checkin') ||
        lower.includes('mindset check') || lower.includes('how am i') || lower.includes('daily check'))) {
      return { component: buildMindsetDailyCheckin(), sageOnboardingLoading: true };
    }

    // Mindset: Timeline
    if (currentDemo.id === 'mindset' && (lower.includes('timeline') || lower.includes('progress') ||
        lower.includes('journey') || lower.includes('mood') && lower.includes('shift'))) {
      return { component: buildMindsetTimeline(), sageMemoryLoading: true };
    }

    // --- Sales Coach AI component triggers (Closer) ---

    // Sales: Call Scorecard
    if (currentDemo.id === 'salescoach' && (lower.includes('score') || lower.includes('transcript') ||
        lower.includes('call scorecard') || lower.includes('analyze my call') || lower.includes('grade my call') ||
        lower.includes('breakdown'))) {
      return { component: buildCallScorecard(), callScorecardThinking: true };
    }

    // Sales: Call History
    if (currentDemo.id === 'salescoach' && (lower.includes('history') || lower.includes('performance history') ||
        lower.includes('call scores') || lower.includes('my calls') || lower.includes('trends'))) {
      return { component: buildCallHistory(), genericThinking: true, genericThinkingText: 'Loading call history...' };
    }

    // Sales: Playbook
    if (currentDemo.id === 'salescoach' && (lower.includes('playbook') || lower.includes('framework') ||
        lower.includes('discovery call') || lower.includes('sales techniques') || lower.includes('objection handling') ||
        lower.includes('objection') || lower.includes('price concern'))) {
      return { component: buildSalesPlaybook(), genericThinking: true, genericThinkingText: 'Loading playbook...' };
    }

    // --- Real Estate CMA component triggers (PropVal) ---

    // CMA: Report
    if (currentDemo.id === 'realestate' && (lower.includes('cma') || lower.includes('market analysis') ||
        lower.includes('comparative') || lower.includes('listing price') || lower.includes('build a cma'))) {
      return { component: buildCmaReport(), cmaThinking: true };
    }

    // CMA: Comparables
    if (currentDemo.id === 'realestate' && (lower.includes('comparable') || lower.includes('comps') ||
        lower.includes('similar properties') || lower.includes('recent sales'))) {
      return { component: buildComparables(), genericThinking: true, genericThinkingText: 'Finding comparables...' };
    }

    // CMA: Market Trends
    if (currentDemo.id === 'realestate' && (lower.includes('market trend') || lower.includes('market data') ||
        lower.includes('pricing data') || lower.includes('market overview'))) {
      return { component: buildMarketTrends(), genericThinking: true, genericThinkingText: 'Pulling market data...' };
    }

    // --- Transaction Coordinator component triggers (DealFlow) ---

    // TX: Dashboard
    if (currentDemo.id === 'txcoord' && (lower.includes('active transaction') || lower.includes('transaction dashboard') ||
        lower.includes('all my deals') || lower.includes('deal pipeline') || lower.includes('show my active'))) {
      return { component: buildTransactionDashboard(), txcoordThinking: true };
    }

    // TX: Checklist
    if (currentDemo.id === 'txcoord' && (lower.includes('checklist') || lower.includes('johnson') ||
        lower.includes('deal checklist') || lower.includes('transaction checklist'))) {
      return { component: buildDealChecklist(), genericThinking: true, genericThinkingText: 'Loading checklist...' };
    }

    // TX: Deadline Alerts
    if (currentDemo.id === 'txcoord' && (lower.includes('deadline') || lower.includes('what\'s due') ||
        lower.includes('upcoming') || lower.includes('milestones this week') || lower.includes('attention today') ||
        lower.includes('what needs'))) {
      return { component: buildDeadlineAlerts(), genericThinking: true, genericThinkingText: 'Checking deadlines...' };
    }

    // --- Executive Coach component triggers (LeadIQ) ---

    // Executive: Development Plan (before feedback route — suggestion contains "my feedback")
    if (currentDemo.id === 'executive' && (lower.includes('development plan') || lower.includes('leadership development') ||
        lower.includes('growth plan') || lower.includes('coaching plan'))) {
      return { component: buildDevelopmentPlan(), devPlanThinking: true };
    }

    // Executive: 360 Feedback Results & Self-Assessment Comparison
    if (currentDemo.id === 'executive' && (lower.includes('360') || lower.includes('feedback results') ||
        lower.includes('my feedback') || lower.includes('leadership score') || lower.includes('self-assessment') ||
        lower.includes('compares to'))) {
      return { component: buildFeedbackResults(), feedbackThinking: true };
    }

    // Executive: Survey Builder
    if (currentDemo.id === 'executive' && (lower.includes('survey') || lower.includes('create feedback') ||
        lower.includes('build survey') || lower.includes('feedback survey'))) {
      return { component: buildSurveyBuilder(), genericThinking: true, genericThinkingText: 'Setting up builder...' };
    }

    // --- Financial Coach component triggers (WealthIQ) ---

    // Finance: Budget Tracker
    if (currentDemo.id === 'finance' && (lower.includes('budget') || lower.includes('spending breakdown') ||
        lower.includes('budget vs actual') || lower.includes('monthly budget') || lower.includes('50/30/20'))) {
      return { component: buildBudgetTracker(), budgetThinking: true };
    }

    // Finance: Transaction Feed
    if (currentDemo.id === 'finance' && (lower.includes('transaction') || lower.includes('recent transactions') ||
        lower.includes('bank statement') || lower.includes('spending insights'))) {
      return { component: buildTransactionFeed(), genericThinking: true, genericThinkingText: 'Fetching transactions...' };
    }

    // Finance: Savings Goals
    if (currentDemo.id === 'finance' && (lower.includes('savings goal') || lower.includes('savings tracker') ||
        lower.includes('emergency fund') || lower.includes('how are my savings'))) {
      return { component: buildSavingsGoals(), genericThinking: true, genericThinkingText: 'Loading savings goals...' };
    }

    // Finance: Health Score
    if (currentDemo.id === 'finance' && (lower.includes('financial health') || lower.includes('health score') ||
        lower.includes('financial score') || lower.includes('how healthy'))) {
      return { component: buildFinancialHealth(), healthScoreThinking: true };
    }

    // --- Influencer Coach component triggers (ViralMind) ---

    // Influencer: Reel Scripts
    if (currentDemo.id === 'influencer' && (lower.includes('reel script') || lower.includes('script variation') ||
        lower.includes('generate') && lower.includes('script') || lower.includes('write me'))) {
      return { component: buildReelScripts(), reelScriptsThinking: true };
    }

    // Influencer: Trending
    if (currentDemo.id === 'influencer' && (lower.includes('trending') || lower.includes('formats') ||
        lower.includes('audio suggestion') || lower.includes('what formats'))) {
      return { component: buildTrendingSuggestions(), genericThinking: true, genericThinkingText: 'Scanning trends...' };
    }

    // Influencer: Content Calendar
    if (currentDemo.id === 'influencer' && (lower.includes('content calendar') || lower.includes('plan my content') ||
        lower.includes('next week') || lower.includes('schedule'))) {
      return { component: buildContentCalendar(), calendarThinking: true };
    }

    // Influencer: Performance
    if (currentDemo.id === 'influencer' && (lower.includes('performance') || lower.includes('analytics') ||
        lower.includes('how did my') || lower.includes('content performance'))) {
      return { component: buildContentPerformance(), performanceThinking: true };
    }

    // --- Journaling Coach component triggers (Reflect) ---

    // Journal: Prompt
    if (currentDemo.id === 'journal' && (lower.includes('prompt') || lower.includes('journal') && lower.includes('today') ||
        lower.includes('start writing') || lower.includes('adaptive'))) {
      return { component: buildJournalPrompt(), genericThinking: true, genericThinkingText: 'Preparing today\'s prompt...' };
    }

    // Journal: History
    if (currentDemo.id === 'journal' && (lower.includes('history') || lower.includes('past entries') ||
        lower.includes('theme analysis') || lower.includes('journal entry'))) {
      return { component: buildJournalHistory(), journalHistoryThinking: true };
    }

    // Journal: Pattern Insights
    if (currentDemo.id === 'journal' && (lower.includes('pattern') || lower.includes('insights') ||
        lower.includes('what do you see') || lower.includes('analyze'))) {
      return { component: buildPatternInsights(), patternThinking: true };
    }

    // Journal: Streak
    if (currentDemo.id === 'journal' && (lower.includes('streak') || lower.includes('consistency') ||
        lower.includes('how often') || lower.includes('journaling streak'))) {
      return { component: buildJournalStreak(), genericThinking: true, genericThinkingText: 'Calculating streak...' };
    }

    // --- Progress Report component triggers (Pulse) ---

    // Reporter: Full Report
    if (currentDemo.id === 'reporter' && (lower.includes('progress report') || lower.includes('generate') && lower.includes('report') ||
        lower.includes('monthly report') || lower.includes('comprehensive'))) {
      return { component: buildProgressReport(), reportThinking: true };
    }

    // Reporter: Activity Aggregator
    if (currentDemo.id === 'reporter' && (lower.includes('activity') || lower.includes('client activity') ||
        lower.includes('data sources') || lower.includes('activity summary'))) {
      return { component: buildActivityAggregator(), genericThinking: true, genericThinkingText: 'Aggregating activity...' };
    }

    // Reporter: Template
    if (currentDemo.id === 'reporter' && (lower.includes('template') || lower.includes('customize') ||
        lower.includes('report settings') || lower.includes('configure'))) {
      return { component: buildReportTemplate(), genericThinking: true, genericThinkingText: 'Loading template...' };
    }

    // Reporter: Scheduler
    if (currentDemo.id === 'reporter' && (lower.includes('schedule') || lower.includes('auto-report') ||
        lower.includes('automated') || lower.includes('weekly report'))) {
      return { component: buildReportScheduler(), genericThinking: true, genericThinkingText: 'Loading scheduler...' };
    }

    // --- Copywriting AI component triggers (Mike) ---

    // Webinar Script Generator
    if (lower.includes('webinar script') || lower.includes('webinar') && lower.includes('script') ||
        lower.includes('presentation script') || lower.includes('1-hour webinar') ||
        lower.includes('build me a webinar') || lower.includes('webinar for my offer') ||
        lower.includes('webinar script from scratch')) {
      return { component: buildWebinarScript(), webinarLoading: true };
    }

    // Funnel Copy + Ad Campaign Builder
    if (lower.includes('sales funnel') || lower.includes('funnel') && lower.includes('ad campaign') ||
        lower.includes('funnel copy') || lower.includes('sales page') && lower.includes('ad') ||
        lower.includes('complete sales funnel') || lower.includes('funnel and ad') ||
        lower.includes('funnel with ad')) {
      return { component: buildFunnelBuilder(), funnelLoading: true };
    }

    // Email Welcome Sequence
    if (lower.includes('email') && lower.includes('sequence') || lower.includes('email welcome') ||
        lower.includes('email drip') || lower.includes('welcome sequence') ||
        lower.includes('email series') || lower.includes('nurture sequence') ||
        lower.includes('5-part email')) {
      return { component: buildEmailSequence(), emailLoading: true };
    }

    // Ad Hook Generator
    if (lower.includes('ad hook') || lower.includes('hook variations') || lower.includes('hook generator') ||
        lower.includes('10 ad hook') || lower.includes('different angles') && lower.includes('hook') ||
        lower.includes('hook library') || lower.includes('ad hooks')) {
      return { component: buildHookGenerator(), hookLoading: true };
    }

    // --- Mindset coach component triggers ---

    // Personality Profile Dashboard
    if (lower.includes('personality profile') || lower.includes('disc') || lower.includes('enneagram') ||
        lower.includes('attachment style') || lower.includes('coaching insights') ||
        lower.includes('my personality') || lower.includes('assessment results')) {
      return { component: buildPersonalityDashboard(), personalityLoading: true };
    }

    // Session History & Emotional Progress
    if (lower.includes('session history') || lower.includes('emotional progress') ||
        lower.includes('how have i been progressing') || lower.includes('my sessions') ||
        lower.includes('coaching journey') || lower.includes('my progress')) {
      return { component: buildSessionHistory(), sessionLoading: true };
    }

    // Difficult Conversation Guide
    if (lower.includes('difficult conversation') || lower.includes('tough conversation') ||
        lower.includes('navigate a conversation') || lower.includes('hard conversation') ||
        lower.includes('confront') || lower.includes('bring something up to')) {
      return { component: buildConversationGuide(), conversationLoading: true };
    }

    // Burnout Recovery
    if (lower.includes('burned out') || lower.includes('burnout') || lower.includes('emotionally exhausted') ||
        lower.includes('overwhelmed') || lower.includes('can\'t keep going') || lower.includes('running on empty')) {
      return { component: buildBurnoutRecovery(), burnoutLoading: true };
    }

    // --- Business component triggers ---

    // PM Hub: project management, tasks across platforms
    if (lower.includes('pull my tasks') || lower.includes('monday') && lower.includes('clickup') ||
        lower.includes('project management') || lower.includes('team workload') ||
        lower.includes('all platforms') || lower.includes('monday') && lower.includes('asana') ||
        lower.includes('pull my projects') || lower.includes('tasks and projects')) {
      return { component: buildPmHubDashboard(), pmHubConnecting: true };
    }

    // Financial Overview: cash flow, revenue, finances
    if (lower.includes('financial overview') || lower.includes('cash flow') || lower.includes('cash position') ||
        lower.includes('revenue') && !lower.includes('client') || lower.includes('quickbooks') ||
        lower.includes('expenses') || lower.includes('my finances') || lower.includes('p&l') ||
        lower.includes('profit and loss') || lower.includes('bank balance') || lower.includes('cash on hand')) {
      return { component: buildFinDashboard(), finConnecting: true };
    }

    // Unified Data Chat: client profitability, cross-reference
    if (lower.includes('profitable') || lower.includes('churning') || lower.includes('churn risk') ||
        lower.includes('client profitability') || lower.includes('which clients') ||
        lower.includes('cross-reference') || lower.includes('compare client')) {
      return { component: buildUnifiedDataResult(), unifiedThinking: true };
    }

    // Accountability Watchdog: attention, alerts, issues
    if (lower.includes('needs my attention') || lower.includes('anything i should know') ||
        lower.includes('what did i miss') || lower.includes('alerts') || lower.includes('watchdog') ||
        lower.includes('falling through') || lower.includes('catch up') || lower.includes('daily briefing') ||
        lower.includes('attention today')) {
      return { component: buildWatchdogAlert(), genericThinking: true, genericThinkingText: 'Scanning for alerts...' };
    }

    // --- Marketing component triggers ---

    // Ad Performance Diagnostic: campaigns died out, what should I do
    if (lower.includes('died out') || lower.includes('campaigns were working') && lower.includes('what should i do') ||
        lower.includes('campaign died') || lower.includes('ads stopped working') ||
        lower.includes('performance dropped') || lower.includes('campaigns stopped')) {
      return { component: buildVideoDiagnosticResponse(), videoDiagnostic: true };
    }

    // Generated Creative Preview (must be before Ad Creative Generator to avoid false match)
    if (lower.includes('generate images') || lower.includes('create images') ||
        lower.includes('generate visuals') || lower.includes('make the images')) {
      return { component: buildCreativePreview(), creatingImages: true };
    }

    // FB Ads Performance Analyzer
    if (lower.includes('facebook ad') || lower.includes('campaign performance') ||
        lower.includes('ad performance') || lower.includes('roas') ||
        lower.includes('campaign analytics') || lower.includes('ad spend') ||
        lower.includes('how are my campaigns') || lower.includes('show me my facebook')) {
      return { component: buildFbAdsPerformance(), connecting: true };
    }

    // Competitor Ad Library Browser
    if (lower.includes('competitor') || lower.includes('ad library') ||
        lower.includes('spy on') || lower.includes('what ads are') ||
        lower.includes('competitor ads') || lower.includes('pull competitor')) {
      return { component: buildCompetitorBrowser(), searching: true };
    }

    // Ad Creative Generator
    if (lower.includes('generate') && (lower.includes('ad') || lower.includes('creative') || lower.includes('concept')) ||
        lower.includes('create new ads') || lower.includes('ad concepts') ||
        lower.includes('new creative') || lower.includes('write ad copy')) {
      return { component: buildAdCreativeGenerator(), generating: true };
    }

    // Cal AI triggers
    if (lower.includes('scan') || lower.includes('photo') || lower.includes('what did i eat') ||
        lower.includes('analyze my meal') || lower.includes('food photo') || lower.includes('log this meal')) {
      return { component: buildCalAIScanner(), scanning: true, userImage: IMG.meal };
    }

    // Habit tracker triggers
    if (lower.includes('streak') || lower.includes('consistency') || lower.includes('calendar') ||
        lower.includes('how many days') || lower.includes('workout history') || lower.includes('habit') ||
        lower.includes('show my workouts')) {
      return { component: buildHabitTracker(), genericThinking: true, genericThinkingText: 'Loading activity data...' };
    }

    // Form analyzer triggers
    if (lower.includes('form check') || lower.includes('analyze my form') || lower.includes('check my squat') ||
        lower.includes('form analysis') || lower.includes('correct my form') || lower.includes('review my form')) {
      return { component: buildFormAnalyzer(), userImage: IMG.squat, genericThinking: true, genericThinkingText: 'Analyzing form data...' };
    }

    // Nutrition tracker triggers
    if (lower.includes('macros') || lower.includes('calories today') || lower.includes('nutrition dashboard') ||
        lower.includes('daily nutrition') || lower.includes('calorie') || lower.includes('how am i doing nutrition') ||
        lower.includes('show my macros') || lower.includes('calculate my macros')) {
      return { component: buildNutritionTracker(), genericThinking: true, genericThinkingText: 'Loading nutrition data...' };
    }

    // Existing text responses
    if (lower.includes('full-body') || lower.includes('45 minute') || lower.includes('workout')) {
      return {
        text: `<p>Great question! Here's a solid 45-minute full-body session you can do with minimal equipment:</p>
<p><strong>Warm-up (5 min)</strong></p>
<ul><li>Jumping jacks — 1 min</li><li>Leg swings — 30 sec each side</li><li>Arm circles to push-up walkouts — 2 min</li></ul>
<p><strong>Strength Circuit (30 min — 3 rounds)</strong></p>
<ul><li>Goblet squats — 12 reps</li><li>Push-ups (or dumbbell bench press) — 10 reps</li><li>Romanian deadlifts — 10 reps</li><li>Dumbbell rows — 10 each arm</li><li>Overhead press — 10 reps</li><li>Rest 60 sec between rounds</li></ul>
<p><strong>Finisher (5 min)</strong></p>
<ul><li>30 sec burpees, 30 sec rest x 5</li></ul>
<p><strong>Cool-down (5 min)</strong> — Light stretching, focus on hip flexors and shoulders.</p>
<p>Want me to adjust the intensity or swap any exercises based on your equipment?</p>`,
        chips: ['Make it harder', 'Bodyweight only version', 'Add a core focus']
      };
    }

    if (lower.includes('meal plan') || lower.includes('nutrition') || lower.includes('muscle')) {
      return {
        text: `<p>I'd love to help with your meal plan! To give you the best recommendations for building lean muscle, I need to understand a few things first:</p>
<p><strong>Quick questions:</strong></p>
<ul><li>What's your current body weight and height?</li><li>How many meals per day do you prefer?</li><li>Any dietary restrictions?</li><li>What does a typical day of eating look like right now?</li></ul>
<p>In the meantime, here are the <strong>key principles</strong> for lean muscle gain:</p>
<ul><li><strong>Protein target:</strong> 0.8–1g per pound of bodyweight daily</li><li><strong>Calorie surplus:</strong> ~200–300 kcal above maintenance</li><li><strong>Meal timing:</strong> Protein distributed across 4+ meals</li><li><strong>Pre/post workout:</strong> Prioritize carbs + protein around training</li></ul>
<p>Share your details and I'll build you something personalized.</p>`,
        chips: ['Calculate my macros', 'Show me a sample day', 'I eat vegetarian']
      };
    }

    if (lower.includes('knee') || lower.includes('pain') || lower.includes('squat')) {
      return {
        text: `<p>Knee pain during squats is something I see a lot, and the good news is — it's usually fixable.</p>
<p><strong>Common causes:</strong></p>
<ul><li><strong>Ankle mobility:</strong> Limited dorsiflexion forces your knees to compensate</li><li><strong>Knee tracking:</strong> Knees collapsing inward</li><li><strong>Depth too fast:</strong> Control the eccentric phase — 3 seconds down</li><li><strong>Quad dominance:</strong> Shifting weight forward puts more load on the knee joint</li></ul>
<p><strong>Immediate action plan:</strong></p>
<ol><li>Switch to box squats at a comfortable depth for 2 weeks</li><li>Add ankle mobility drills (wall ankle stretches, 2 min daily)</li><li>Foam roll quads and IT band before sessions</li><li>Strengthen VMO with terminal knee extensions</li></ol>
<p>If the pain is sharp or causes swelling — please see a physiotherapist. I want to keep you training safely long-term.</p>`,
        chips: ['Show me ankle mobility drills', 'What about front squats instead?']
      };
    }

    if (lower.includes('sleep') || lower.includes('5 hour') || lower.includes('tired') || lower.includes('recovery')) {
      return {
        text: `<p>Training on poor sleep is one of the biggest mistakes I see.</p>
<p><strong>What changes after a bad night:</strong></p>
<ul><li>Reaction time and coordination drop — higher injury risk</li><li>Growth hormone release is impaired</li><li>Cortisol is elevated</li><li>Perceived exertion goes up — everything feels harder</li></ul>
<p><strong>My recommendation for today:</strong></p>
<ul><li><strong>Do train</strong>, but drop intensity to 70%</li><li>Cut volume by ~30%</li><li>Skip heavy compounds</li><li>Focus on machines and isolation work</li><li>Keep session to 30–35 minutes</li><li>Prioritize a 20 min nap before training</li></ul>
<p>Sleep is your #1 recovery tool. One bad night is manageable; a pattern needs addressing.</p>`,
        chips: ['Help me fix my sleep routine', 'Give me a light session for today']
      };
    }

    // Default
    return {
      text: `<p>That's a great question! Let me think about the best way to approach this for your specific situation.</p>
<p>Could you tell me a bit more about:</p>
<ul><li>Your current fitness level?</li><li>How many days per week you can train?</li><li>Any equipment you have access to?</li></ul>
<p>The more context you give me, the more personalized my advice will be.</p>`,
      chips: ['I train 4x per week', "I'm a beginner", 'I have a home gym']
    };
  }

  // --- Helpers ---
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // --- Initial dashboard entrance animation ---
  // Delay slightly to ensure CSS is parsed and first paint has occurred
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      triggerDashboardEntrance();
    });
  });
});
