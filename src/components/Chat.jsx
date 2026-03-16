import { useState, useEffect, useRef } from 'react'
import {
  onboardingMessages,
  freeTierMessages,
  freeTierSuggestions,
  postPaymentMessages,
  postPaymentSuggestions,
} from '../data/mockMessages'
import FreemiumTrigger from './FreemiumTrigger'

function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-2 animate-fade-in-up">
      <div className="w-6 h-6 rounded-full bg-gradient-to-b from-neutral-500 to-neutral-700 flex items-center justify-center flex-shrink-0"
           style={{ boxShadow: 'var(--shadow-avatar)' }}>
        <span className="text-[10px] text-white/80 font-semibold">B</span>
      </div>
      <span className="text-[rgba(26,26,26,0.8)] text-sm font-medium" style={{ fontVariationSettings: "'wdth' 100" }}>
        Bulletproof COO is thinking
      </span>
      <div className="flex gap-1">
        <div className="w-[3px] h-[3px] rounded-full bg-[rgba(26,26,26,0.6)] thinking-dot" />
        <div className="w-[3px] h-[3px] rounded-full bg-[rgba(26,26,26,0.6)] thinking-dot" />
        <div className="w-[3px] h-[3px] rounded-full bg-[rgba(26,26,26,0.6)] thinking-dot" />
      </div>
    </div>
  )
}

function MessageBubble({ message, isNew }) {
  if (message.role === 'user') {
    return (
      <div className={`flex justify-end ${isNew ? 'animate-fade-in-up' : ''}`}>
        <div
          className="max-w-[480px] px-4 py-4 rounded-2xl border border-[rgba(26,26,26,0.06)] backdrop-blur-[4px]"
          style={{
            background: 'rgba(255, 255, 255, 0.28)',
          }}
        >
          <p className="text-sm leading-5 tracking-[-0.15px] text-[rgba(26,26,26,0.8)] font-medium whitespace-pre-wrap"
             style={{ fontVariationSettings: "'wdth' 100" }}>
            {message.text}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex justify-start ${isNew ? 'animate-fade-in-up' : ''}`}>
      <div className="max-w-[600px]">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-gradient-to-b from-neutral-500 to-neutral-700 flex items-center justify-center flex-shrink-0 mt-0.5"
               style={{ boxShadow: 'var(--shadow-avatar)' }}>
            <span className="text-[10px] text-white/80 font-semibold">B</span>
          </div>
          <div className="text-sm leading-7 tracking-[-0.15px] text-[rgba(26,26,26,0.8)] font-normal whitespace-pre-wrap"
               style={{ fontVariationSettings: "'wdth' 100" }}>
            {message.text.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} className="font-semibold mt-3 mb-1">{line.slice(2, -2)}</p>
              }
              if (line.startsWith('• ')) {
                return <p key={i} className="ml-1">• {line.slice(2)}</p>
              }
              if (line === '') return <br key={i} />
              return <p key={i}>{line}</p>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Chat({ mode, onPaywallTrigger, onUpgradeClick, isPro, declinedSkill }) {
  const [visibleMessages, setVisibleMessages] = useState([])
  const [isThinking, setIsThinking] = useState(false)
  const [showFreemiumTrigger, setShowFreemiumTrigger] = useState(false)
  const [freemiumSkill, setFreemiumSkill] = useState('')
  const [onboardingIndex, setOnboardingIndex] = useState(0)
  const [waitingForClick, setWaitingForClick] = useState(false)
  const [lastDeclinedSkill, setLastDeclinedSkill] = useState(null)
  const messagesEndRef = useRef(null)
  const hasAnimated = useRef(new Set())
  const declineIdCounter = useRef(300)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [visibleMessages, isThinking, showFreemiumTrigger])

  // Onboarding: show the first AI message automatically, then wait for clicks
  useEffect(() => {
    if (mode !== 'onboarding') return

    setVisibleMessages([])
    setIsThinking(false)
    setShowFreemiumTrigger(false)
    setOnboardingIndex(0)
    setWaitingForClick(false)
    hasAnimated.current = new Set()

    // Auto-play the first AI message
    const firstMsg = onboardingMessages[0]
    if (firstMsg && firstMsg.role === 'ai') {
      let cancelled = false
      const t1 = setTimeout(() => {
        if (cancelled) return
        setIsThinking(true)
      }, 300)
      const t2 = setTimeout(() => {
        if (cancelled) return
        setIsThinking(false)
        setVisibleMessages([firstMsg])
        hasAnimated.current.add(firstMsg.id)
        setOnboardingIndex(1)
        setWaitingForClick(true)
      }, 1500)
      return () => {
        cancelled = true
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }
  }, [mode])

  // Handle send button click during onboarding — advances conversation
  const handleSendClick = () => {
    if (!waitingForClick || isThinking) return
    if (mode !== 'onboarding' || onboardingIndex >= onboardingMessages.length) return

    const userMsg = onboardingMessages[onboardingIndex]
    if (!userMsg || userMsg.role !== 'user') return

    setWaitingForClick(false)

    // Show user message immediately
    setVisibleMessages(prev => [...prev, userMsg])
    hasAnimated.current.add(userMsg.id)

    const aiIndex = onboardingIndex + 1
    const aiMsg = onboardingMessages[aiIndex]

    if (aiMsg && aiMsg.role === 'ai') {
      // Show thinking, then AI response
      setTimeout(() => setIsThinking(true), 300)
      setTimeout(() => {
        setIsThinking(false)
        setVisibleMessages(prev => [...prev, aiMsg])
        hasAnimated.current.add(aiMsg.id)
        setOnboardingIndex(aiIndex + 1)

        if (aiMsg.triggersPaywall) {
          setTimeout(() => onPaywallTrigger?.(), 1200)
        } else {
          setWaitingForClick(true)
        }
      }, 1800)
    } else {
      setOnboardingIndex(onboardingIndex + 1)
      setWaitingForClick(true)
    }
  }

  // Free tier: keep onboarding messages, skip the redundant intro if onboarding already present
  useEffect(() => {
    if (mode === 'free') {
      setShowFreemiumTrigger(false)
      setWaitingForClick(false)
      setVisibleMessages(prev => {
        const onboarding = prev.filter(m => m.id < 100)
        // If we already have onboarding context, the suggestion chips are enough
        if (onboarding.length > 0) return onboarding
        return [...freeTierMessages]
      })
    }
  }, [mode])

  // Pro: show post-payment messages
  useEffect(() => {
    if (mode === 'pro') {
      setShowFreemiumTrigger(false)
      setWaitingForClick(false)
      setIsThinking(true)
      setTimeout(() => {
        setIsThinking(false)
        setVisibleMessages(prev => {
          const existing = prev.filter(m => m.id < 200)
          return [...existing, ...postPaymentMessages]
        })
      }, 1000)
    }
  }, [mode])

  // When a paywall is declined, add a message about the skill and re-show suggestions
  useEffect(() => {
    if (!declinedSkill || declinedSkill === lastDeclinedSkill) return
    setLastDeclinedSkill(declinedSkill)

    const skillName = declinedSkill.split('::')[0]
    const id = declineIdCounter.current++
    const msg = {
      id,
      role: 'ai',
      text: `${skillName} is a Pro feature — it's one of the most powerful tools in your playbook once you're ready to upgrade. In the meantime, I can still help you with Quick Wins! What would you like to work on?`,
    }
    setVisibleMessages(prev => [...prev, msg])
    hasAnimated.current.add(id)
  }, [declinedSkill, lastDeclinedSkill])

  const handleSuggestionClick = (suggestion) => {
    if (!suggestion.isFree && !isPro) {
      onUpgradeClick?.(suggestion.proSkill || suggestion.text)
    }
  }

  const suggestions = mode === 'pro' ? postPaymentSuggestions : mode === 'free' ? freeTierSuggestions : []
  const freeMessagesUsed = 2
  const freeMessagesTotal = 5

  // Preview of next user message in the input field
  const nextUserMsg = mode === 'onboarding' && waitingForClick && onboardingIndex < onboardingMessages.length
    ? onboardingMessages[onboardingIndex]
    : null
  const inputPreview = nextUserMsg?.role === 'user' ? nextUserMsg.text : ''
  const sendEnabled = waitingForClick && !isThinking && inputPreview

  return (
    <div className="flex flex-col h-full">
      {/* Free tier badge */}
      {mode === 'free' && (
        <div className="flex items-center justify-center gap-3 py-2 px-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[rgba(26,26,26,0.06)] text-[rgba(26,26,26,0.6)] border border-[rgba(26,26,26,0.06)]"
                style={{ fontVariationSettings: "'wdth' 100" }}>
            Free Tier
          </span>
          <span className="text-xs text-[rgba(26,26,26,0.48)]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {freeMessagesTotal - freeMessagesUsed} of {freeMessagesTotal} free messages remaining today
          </span>
        </div>
      )}

      {/* Pro badge */}
      {mode === 'pro' && (
        <div className="flex items-center justify-center py-2 px-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[rgba(16,104,68,0.06)] text-[rgba(16,104,68,0.92)] border border-[rgba(16,104,68,0.08)]"
                style={{ fontVariationSettings: "'wdth' 100" }}>
            ✦ Pro
          </span>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="max-w-[704px] mx-auto flex flex-col gap-6 pt-6">
          {visibleMessages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isNew={hasAnimated.current.has(msg.id)}
            />
          ))}

          {isThinking && <ThinkingIndicator />}

          {showFreemiumTrigger && (
            <FreemiumTrigger
              skill={freemiumSkill}
              onUpgrade={onUpgradeClick}
              onDismiss={() => setShowFreemiumTrigger(false)}
            />
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggestions + Input */}
      {suggestions.length > 0 && !showFreemiumTrigger && (
        <div className="max-w-[704px] mx-auto w-full px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(s)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-[rgba(26,26,26,0.8)] border border-[rgba(26,26,26,0.06)] backdrop-blur-[4px] transition-all duration-150 cursor-pointer hover:bg-[rgba(26,26,26,0.09)] hover:border-[rgba(26,26,26,0.09)]"
                style={{
                  background: 'rgba(26, 26, 26, 0.06)',
                  fontVariationSettings: "'wdth' 100",
                }}
              >
                {!s.isFree && !isPro && (
                  <span className="inline-block mr-1.5 text-[rgba(16,104,68,0.92)]">✦</span>
                )}
                {s.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat input card */}
      <div className="px-4 pb-6 pt-2">
        <div className="max-w-[704px] mx-auto">
          <div className={`bg-white rounded-3xl border transition-colors duration-200 ${sendEnabled ? 'border-[rgba(26,26,26,0.20)]' : 'border-[rgba(26,26,26,0.09)]'}`}
               style={{
                 boxShadow: 'var(--shadow-card)',
                 padding: '12px 12px 12px 16px',
               }}>
            {/* Text area */}
            <div className="mb-2">
              <textarea
                value={inputPreview}
                placeholder="Ask about operations, strategy, team management..."
                className="w-full bg-transparent outline-none text-sm placeholder-[rgba(26,26,26,0.6)] font-normal resize-none"
                style={{
                  fontVariationSettings: "'wdth' 100",
                  color: inputPreview ? 'rgba(26, 26, 26, 0.8)' : undefined,
                }}
                rows={inputPreview && inputPreview.length > 80 ? 2 : 1}
                readOnly
              />
            </div>
            {/* Bottom toolbar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Attach button */}
                <button className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-[rgba(26,26,26,0.06)] transition-colors duration-150">
                  <svg className="w-5 h-5 text-[rgba(26,26,26,0.6)]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M10 5v10M5 10h10" strokeLinecap="round"/>
                  </svg>
                </button>
                {/* Agent selector chip */}
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-3xl cursor-pointer hover:bg-[rgba(16,104,68,0.08)] transition-colors duration-150"
                     style={{
                       background: 'rgba(16, 104, 68, 0.06)',
                     }}>
                  <svg className="w-3 h-3 text-[rgba(16,104,68,0.92)]" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9l-3 1.5.5-3.5L1 4.5 4.5 4 6 1z" fill="currentColor"/>
                  </svg>
                  <span className="text-xs font-medium text-[rgba(16,104,68,0.92)]"
                        style={{ fontVariationSettings: "'wdth' 100" }}>
                    Bulletproof COO
                  </span>
                  <span className="text-[10px] font-medium text-[rgba(16,104,68,0.92)] bg-[rgba(16,104,68,0.06)] px-1 py-0.5 rounded"
                        style={{ fontVariationSettings: "'wdth' 100" }}>
                    +4
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {/* More options */}
                <div className="flex items-center bg-[#fafafa] rounded-3xl">
                  <button className="w-8 h-8 rounded-3xl flex items-center justify-center hover:bg-[rgba(26,26,26,0.06)] transition-colors duration-150">
                    <svg className="w-5 h-5 text-[rgba(26,26,26,0.6)]" viewBox="0 0 20 20" fill="currentColor">
                      <circle cx="10" cy="5" r="1.5"/><circle cx="10" cy="10" r="1.5"/><circle cx="10" cy="15" r="1.5"/>
                    </svg>
                  </button>
                  {/* Mic button */}
                  <button className="w-8 h-8 rounded-3xl flex items-center justify-center bg-white border border-[rgba(26,26,26,0.09)] hover:bg-[#fafafa] transition-colors duration-150"
                          style={{ boxShadow: 'var(--shadow-card)' }}>
                    <svg className="w-5 h-5 text-[rgba(26,26,26,0.6)]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M10 2a3 3 0 00-3 3v5a3 3 0 006 0V5a3 3 0 00-3-3z"/>
                      <path d="M5 10a5 5 0 0010 0M10 15v3m-3 0h6" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
                {/* Send button (pill) */}
                <button
                  onClick={handleSendClick}
                  className={`w-9 h-9 rounded-full flex items-center justify-center relative transition-all duration-200 ${sendEnabled ? 'cursor-pointer hover:scale-105 active:scale-95' : ''}`}
                  style={{
                    background: sendEnabled
                      ? 'linear-gradient(to bottom, #737373, #404040)'
                      : 'linear-gradient(180deg, transparent 0%, rgba(26,26,26,0.2) 100%), white',
                    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.08)',
                  }}>
                  <svg className={`w-5 h-5 ${sendEnabled ? 'text-white/80' : 'text-[rgba(26,26,26,0.36)]'}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 15V5m0 0l-4 4m4-4l4 4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: sendEnabled ? 'none' : 'inset 0px 0px 3px rgba(26,26,26,0.28)' }} />
                  {sendEnabled && <div className="absolute inset-0 border-[1.5px] border-white rounded-full pointer-events-none" style={{ filter: 'blur(0.2px)' }} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
