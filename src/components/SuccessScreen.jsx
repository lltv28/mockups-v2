import { useEffect, useState } from 'react'

export default function SuccessScreen({ onComplete }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    // Phase 0: initial (show immediately)
    // Phase 1: checkmark appears (after 200ms)
    // Phase 2: text appears (after 600ms)
    // Phase 3: transition out (after 2200ms)
    const t1 = setTimeout(() => setPhase(1), 200)
    const t2 = setTimeout(() => setPhase(2), 600)
    const t3 = setTimeout(() => onComplete(), 2200)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-5">
        {/* Checkmark circle */}
        {phase >= 1 && (
          <div className="w-20 h-20 rounded-full bg-[rgba(16,104,68,0.06)] flex items-center justify-center animate-scale-in">
            <div className="w-14 h-14 rounded-full bg-[rgba(16,104,68,0.08)] flex items-center justify-center">
              <svg className="w-8 h-8 text-[rgba(16,104,68,0.92)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        )}

        {/* Text */}
        {phase >= 2 && (
          <div className="text-center animate-fade-in-up">
            <h2 className="text-xl leading-7 font-medium text-[rgba(26,26,26,0.8)] mb-1"
                style={{ fontVariationSettings: "'wdth' 100" }}>
              Welcome to Pro!
            </h2>
            <p className="text-sm text-[rgba(26,26,26,0.48)]"
               style={{ fontVariationSettings: "'wdth' 100" }}>
              Your full operations playbook is now unlocked
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
