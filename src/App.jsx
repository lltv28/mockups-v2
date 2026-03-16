import { useState, useCallback, useRef } from 'react'
import Chat from './components/Chat'
import HardPaywall from './components/HardPaywall'
import SoftPaywall from './components/SoftPaywall'
import CheckoutSim from './components/CheckoutSim'
import SuccessScreen from './components/SuccessScreen'

/*
  State machine:
  - onboarding: Chat plays through onboarding messages, then triggers paywall
  - paywall: Shows selected variant (A/B/C)
  - checkout: Simulated external checkout
  - success: Post-payment celebration
  - free: Free tier experience (soft paywall decline)
  - pro: Post-payment chat with all skills unlocked

  Variant C (freemium) skips the paywall overlay and goes straight to free tier
  with inline upgrade triggers in chat.
*/

const VARIANTS = [
  { id: 'A', label: 'Hard Paywall' },
  { id: 'B', label: 'Soft Paywall' },
  { id: 'C', label: 'Freemium Trigger' },
]

export default function App() {
  const [variant, setVariant] = useState('A')
  const [appState, setAppState] = useState('onboarding')
  const [key, setKey] = useState(0) // force re-mount on reset
  const [pendingSkill, setPendingSkill] = useState(null)
  const [declinedSkill, setDeclinedSkill] = useState(null)

  const handleReset = () => {
    setAppState('onboarding')
    setPendingSkill(null)
    setDeclinedSkill(null)
    setKey(k => k + 1)
  }

  const handlePaywallTrigger = useCallback(() => {
    if (variant === 'C') {
      // Freemium: go straight to free tier, no overlay
      setAppState('free')
    } else {
      setAppState('paywall')
    }
  }, [variant])

  const handleCTA = () => {
    setAppState('checkout')
  }

  const handleDecline = () => {
    setAppState('free')
    if (pendingSkill) {
      // Use a unique string each time so the effect re-fires even for the same skill
      setDeclinedSkill(pendingSkill + '::' + Date.now())
      setPendingSkill(null)
    }
  }

  const handlePaymentSuccess = () => {
    setAppState('success')
  }

  const handleSuccessComplete = useCallback(() => {
    setAppState('pro')
  }, [])

  const handleUpgradeFromChat = (skillName) => {
    setPendingSkill(skillName || 'This skill')
    setAppState('paywall')
  }

  // Determine chat mode — overlay states (paywall/checkout/success) preserve the previous mode
  const chatModeRef = useRef('onboarding')
  let chatMode
  if (appState === 'paywall' || appState === 'checkout' || appState === 'success') {
    chatMode = chatModeRef.current
  } else {
    chatMode = appState === 'free' ? 'free' : appState === 'pro' ? 'pro' : 'onboarding'
    chatModeRef.current = chatMode
  }

  return (
    <div className="flex flex-col bg-[#f0f0f0]" style={{ width: '80vw', height: '80vh', transform: 'scale(1.25)', transformOrigin: 'top left' }}>
      {/* Demo Controls Bar */}
      <div className="flex-shrink-0 bg-white border-b border-[rgba(26,26,26,0.09)] px-5 py-2 flex items-center justify-between z-[100]">
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[rgba(26,26,26,0.36)]"
                style={{ fontVariationSettings: "'wdth' 100" }}>
            Demo Controls
          </span>
          <div className="flex rounded-lg border border-[rgba(26,26,26,0.09)] overflow-hidden">
            {VARIANTS.map((v) => (
              <button
                key={v.id}
                onClick={() => { setVariant(v.id); handleReset() }}
                className={`px-3 py-1.5 text-xs font-medium transition-all duration-150 cursor-pointer ${
                  variant === v.id
                    ? 'bg-[rgba(26,26,26,0.06)] text-[rgba(26,26,26,0.8)]'
                    : 'text-[rgba(26,26,26,0.48)] hover:text-[rgba(26,26,26,0.6)] hover:bg-[rgba(26,26,26,0.04)]'
                }`}
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {v.id}: {v.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[rgba(26,26,26,0.36)] font-medium"
                style={{ fontVariationSettings: "'wdth' 100" }}>
            State: <span className="text-[rgba(26,26,26,0.6)]">{appState}</span>
          </span>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-[rgba(26,26,26,0.6)] border border-[rgba(26,26,26,0.09)] hover:bg-[rgba(26,26,26,0.04)] transition-colors duration-150 cursor-pointer"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Reset Demo
          </button>
        </div>
      </div>

      {/* App Frame — simulated desktop app */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-hidden">
        <div
          className="w-full max-w-[1280px] h-full max-h-[800px] bg-white rounded-3xl border border-[rgba(26,26,26,0.09)] overflow-hidden flex"
          style={{ boxShadow: 'var(--shadow-modal)' }}
        >
          {/* Sidebar */}
          <aside className="w-[316px] flex-shrink-0 bg-white flex flex-col border-r border-[rgba(26,26,26,0.06)]">
            <div className="flex-1 m-2 ml-2 rounded-2xl flex flex-col"
                 style={{ background: 'rgba(0, 180, 212, 0.05)', backdropFilter: 'blur(6px)' }}>
              {/* User info */}
              <div className="px-4 pt-6 pb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-b from-neutral-500 to-neutral-700 flex items-center justify-center border border-[rgba(26,26,26,0.06)]"
                       style={{ boxShadow: 'var(--shadow-avatar)' }}>
                    <span className="text-[8px] text-white/80 font-semibold">AC</span>
                  </div>
                  <span className="text-sm font-medium text-[rgba(26,26,26,0.6)] truncate"
                        style={{ fontVariationSettings: "'wdth' 100" }}>
                    Alex Chen
                  </span>
                </div>
              </div>

              {/* Nav items */}
              <nav className="px-2 flex flex-col gap-0.5">
                <a className="flex items-center gap-1.5 h-8 rounded-lg text-sm font-medium text-[rgba(26,26,26,0.6)] cursor-pointer"
                   style={{
                     padding: '8px 10px 8px 8px',
                     background: 'rgba(16, 104, 68, 0.08)',
                     mixBlendMode: 'multiply',
                     fontVariationSettings: "'wdth' 100",
                   }}>
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="truncate">New Chat</span>
                </a>
                <a className="flex items-center gap-1.5 h-8 rounded-lg text-sm font-medium text-[rgba(26,26,26,0.6)] hover:bg-[rgba(26,26,26,0.06)] cursor-pointer transition-colors duration-100"
                   style={{
                     padding: '8px 10px 8px 8px',
                     fontVariationSettings: "'wdth' 100",
                   }}>
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M8 12h.01M12 12h.01M16 12c0 3.314-2.686 5-6 5a8.065 8.065 0 01-2.472-.379L4 18v-3.08C2.78 13.752 2 12.428 2 11c0-3.314 2.686-6 6-6h2c3.314 0 6 2.686 6 6z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="truncate">My Sessions</span>
                </a>
              </nav>

              <div className="flex-1" />

              {/* Settings at bottom */}
              <div className="px-2 pb-4">
                <a className="flex items-center gap-1.5 h-8 rounded-lg text-sm font-medium text-[rgba(26,26,26,0.6)] hover:bg-[rgba(26,26,26,0.06)] cursor-pointer transition-colors duration-100"
                   style={{
                     padding: '8px 10px 8px 8px',
                     fontVariationSettings: "'wdth' 100",
                   }}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.248a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Settings</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 flex flex-col relative overflow-hidden">
            {/* Background decorative shapes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full opacity-30"
                   style={{ background: 'radial-gradient(circle, rgba(16,104,68,0.04) 0%, transparent 70%)' }} />
              <div className="absolute -bottom-48 -left-24 w-[500px] h-[500px] rounded-full opacity-20"
                   style={{ background: 'radial-gradient(circle, rgba(0,180,212,0.05) 0%, transparent 70%)' }} />
            </div>

            {/* Top bar */}
            <header
              className="flex-shrink-0 px-5 pt-6 pb-4 flex items-center justify-between z-10 relative"
              style={{
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <span className="text-sm font-medium text-[rgba(26,26,26,0.6)]"
                    style={{ fontVariationSettings: "'wdth' 100" }}>
                New chat
              </span>
            </header>

            {/* Chat area */}
            <div className="flex-1 overflow-hidden relative" key={key}>
              <Chat
                mode={chatMode}
                onPaywallTrigger={handlePaywallTrigger}
                onUpgradeClick={handleUpgradeFromChat}
                isPro={appState === 'pro'}
                declinedSkill={declinedSkill}
              />
            </div>
          </main>
        </div>
      </div>

      {/* Overlay states */}
      {appState === 'paywall' && variant === 'A' && (
        <HardPaywall onCTA={handleCTA} />
      )}
      {appState === 'paywall' && (variant === 'B' || variant === 'C') && (
        <SoftPaywall onCTA={handleCTA} onDecline={handleDecline} />
      )}
      {appState === 'checkout' && (
        <CheckoutSim onPaymentSuccess={handlePaymentSuccess} />
      )}
      {appState === 'success' && (
        <SuccessScreen onComplete={handleSuccessComplete} />
      )}
    </div>
  )
}
