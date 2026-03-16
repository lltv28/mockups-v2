import { proFeatures } from '../data/features'
import FeatureIcon from './FeatureIcon'

export default function SoftPaywall({ onCTA, onDecline }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      {/* Backdrop — 80% white per design system */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-[4px]" />

      {/* Dialog */}
      <div
        className="relative w-full max-w-[480px] mx-4 rounded-2xl border border-[rgba(26,26,26,0.09)] backdrop-blur-[10px] animate-modal-in"
        style={{
          background: 'rgba(255, 255, 255, 0.60)',
          boxShadow: 'var(--shadow-modal)',
        }}
      >
        <div className="p-7">
          {/* Avatar + Title */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-4">
              <div className="absolute -inset-4 rounded-full opacity-40"
                   style={{ background: 'radial-gradient(circle, rgba(16,104,68,0.12) 0%, transparent 70%)' }} />
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-b from-neutral-500 to-neutral-700 flex items-center justify-center border border-[rgba(26,26,26,0.06)]"
                   style={{ boxShadow: 'var(--shadow-avatar)' }}>
                <span className="text-xl text-white/80 font-semibold" style={{ fontVariationSettings: "'wdth' 100" }}>B</span>
              </div>
            </div>
            <h2 className="text-xl leading-7 font-medium text-[rgba(26,26,26,0.8)] mb-2"
                style={{ fontVariationSettings: "'wdth' 100" }}>
              Your playbook is ready
            </h2>
            <p className="text-sm leading-5 text-[rgba(26,26,26,0.6)]"
               style={{ fontVariationSettings: "'wdth' 100" }}>
              Unlock your custom operations playbook and get full access to Bulletproof COO Pro.
            </p>
          </div>

          {/* Price */}
          <div className="text-center mb-5">
            <span className="text-2xl font-medium text-[rgba(26,26,26,0.8)]" style={{ fontVariationSettings: "'wdth' 100" }}>
              $97
            </span>
            <span className="text-sm text-[rgba(26,26,26,0.48)] ml-1" style={{ fontVariationSettings: "'wdth' 100" }}>
              /month
            </span>
          </div>

          {/* Feature list */}
          <div className="space-y-3 mb-6">
            {proFeatures.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <FeatureIcon type={f.iconType} />
                <div>
                  <p className="text-sm font-medium text-[rgba(26,26,26,0.8)] leading-5"
                     style={{ fontVariationSettings: "'wdth' 100" }}>
                    {f.title}
                  </p>
                  <p className="text-xs text-[rgba(26,26,26,0.48)] leading-4 mt-0.5"
                     style={{ fontVariationSettings: "'wdth' 100" }}>
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <p className="text-center text-xs text-[rgba(26,26,26,0.48)] mb-4"
             style={{ fontVariationSettings: "'wdth' 100" }}>
            1,200+ operators already using Bulletproof COO
          </p>

          {/* CTA */}
          <button
            onClick={onCTA}
            className="relative w-full py-2.5 px-5 rounded-lg overflow-hidden cursor-pointer transition-all duration-150 hover:opacity-90 active:opacity-80"
            style={{
              background: 'linear-gradient(to bottom, #737373, #404040)',
            }}
          >
            <span className="relative z-10 text-sm font-medium text-white/80"
                  style={{ fontVariationSettings: "'wdth' 100" }}>
              Start My Free Trial
            </span>
            <div className="absolute inset-0 border-[1.5px] border-white rounded-lg pointer-events-none" style={{ filter: 'blur(0.2px)' }} />
          </button>

          {/* Decline link */}
          <button
            onClick={onDecline}
            className="w-full mt-3 py-2 text-sm text-[rgba(26,26,26,0.48)] hover:text-[rgba(26,26,26,0.6)] transition-colors duration-150 cursor-pointer"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Continue with Free
          </button>
        </div>
      </div>
    </div>
  )
}
