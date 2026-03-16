export default function FreemiumTrigger({ skill, onUpgrade, onDismiss }) {
  return (
    <div className="flex justify-start animate-fade-in-up">
      <div className="max-w-[480px] w-full">
        <div
          className="rounded-2xl border border-[rgba(26,26,26,0.09)] p-5 backdrop-blur-[4px]"
          style={{
            background: 'rgba(255, 255, 255, 0.60)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          {/* Lock icon + title */}
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[rgba(16,104,68,0.06)]">
              <svg className="w-4 h-4 text-[rgba(16,104,68,0.92)]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="5" y="9" width="10" height="8" rx="2"/>
                <path d="M7 9V6a3 3 0 016 0v3"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-[rgba(26,26,26,0.8)] leading-5"
                 style={{ fontVariationSettings: "'wdth' 100" }}>
                {skill} requires Pro
              </p>
              <p className="text-xs text-[rgba(26,26,26,0.48)] leading-4"
                 style={{ fontVariationSettings: "'wdth' 100" }}>
                Upgrade to unlock all specialist skills
              </p>
            </div>
          </div>

          {/* Brief benefit list */}
          <div className="space-y-2 mb-4 pl-1">
            {[
              'Unlimited AI coaching messages',
              'All 5 specialist skills unlocked',
              'Custom action plans & playbooks',
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[rgba(16,104,68,0.92)] flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3.5 8.5l3 3 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-sm text-[rgba(26,26,26,0.6)]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {b}
                </span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onUpgrade}
              className="relative flex-1 py-2 px-5 rounded-lg overflow-hidden cursor-pointer transition-all duration-150 hover:opacity-90 active:opacity-80"
              style={{
                background: 'linear-gradient(to bottom, #737373, #404040)',
              }}
            >
              <span className="relative z-10 text-sm font-medium text-white/80"
                    style={{ fontVariationSettings: "'wdth' 100" }}>
                Upgrade to Pro
              </span>
              <div className="absolute inset-0 border-[1.5px] border-white rounded-lg pointer-events-none" style={{ filter: 'blur(0.2px)' }} />
            </button>
            <button
              onClick={onDismiss}
              className="py-2 px-4 text-sm text-[rgba(26,26,26,0.48)] hover:text-[rgba(26,26,26,0.6)] transition-colors duration-150 cursor-pointer"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
