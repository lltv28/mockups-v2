import { useState, useEffect } from 'react'
import { mockUser } from '../data/mockMessages'

export default function CheckoutSim({ onPaymentSuccess }) {
  const [isRedirecting, setIsRedirecting] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsRedirecting(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handlePayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      onPaymentSuccess()
    }, 1200)
  }

  if (isRedirecting) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="w-8 h-8 border-2 border-[rgba(26,26,26,0.2)] border-t-[rgba(26,26,26,0.6)] rounded-full animate-spin" />
          <p className="text-sm font-medium text-[rgba(26,26,26,0.6)]"
             style={{ fontVariationSettings: "'wdth' 100" }}>
            Redirecting to checkout...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f5f5f5]">
      <div className="w-full max-w-[520px] mx-4 animate-modal-in">
        {/* Simulated browser chrome */}
        <div className="bg-white rounded-t-xl border border-b-0 border-[rgba(26,26,26,0.09)] px-4 py-2.5 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[rgba(26,26,26,0.09)]" />
            <div className="w-3 h-3 rounded-full bg-[rgba(26,26,26,0.09)]" />
            <div className="w-3 h-3 rounded-full bg-[rgba(26,26,26,0.09)]" />
          </div>
          <div className="flex-1 bg-[rgba(26,26,26,0.04)] rounded-md px-3 py-1.5">
            <p className="text-xs text-[rgba(26,26,26,0.48)] font-medium truncate"
               style={{ fontVariationSettings: "'wdth' 100" }}>
              checkout.stripe.com/pay/cs_live_bulletproof-coo-pro
            </p>
          </div>
        </div>

        {/* Checkout content */}
        <div
          className="bg-white rounded-b-xl border border-[rgba(26,26,26,0.09)] p-7"
          style={{ boxShadow: 'var(--shadow-modal)' }}
        >
          <div className="text-center mb-6">
            <p className="text-xs font-medium uppercase tracking-wider text-[rgba(26,26,26,0.36)] mb-2"
               style={{ fontVariationSettings: "'wdth' 100" }}>
              External Checkout Page
            </p>
            <h2 className="text-xl leading-7 font-medium text-[rgba(26,26,26,0.8)] mb-1"
                style={{ fontVariationSettings: "'wdth' 100" }}>
              Bulletproof COO Pro
            </h2>
            <p className="text-sm text-[rgba(26,26,26,0.48)]" style={{ fontVariationSettings: "'wdth' 100" }}>
              $97.00 / month
            </p>
          </div>

          {/* Passed parameters */}
          <div className="rounded-2xl bg-[rgba(26,26,26,0.04)] p-4 mb-6">
            <p className="text-xs font-semibold text-[rgba(26,26,26,0.8)] mb-3 uppercase tracking-wider"
               style={{ fontVariationSettings: "'wdth' 100" }}>
              Passed Parameters
            </p>
            <div className="space-y-2.5">
              {[
                { label: 'Email', value: mockUser.email },
                { label: 'User ID', value: mockUser.id },
                { label: 'Name', value: mockUser.name },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between pb-2.5 border-b border-[rgba(26,26,26,0.06)] last:border-0 last:pb-0">
                  <span className="text-sm text-[rgba(26,26,26,0.6)] font-medium"
                        style={{ fontVariationSettings: "'wdth' 100" }}>
                    {p.label}
                  </span>
                  <span className="text-sm text-[rgba(26,26,26,0.8)] font-medium"
                        style={{ fontVariationSettings: "'wdth' 100" }}>
                    {p.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* URL info */}
          <div className="rounded-2xl bg-[rgba(26,26,26,0.04)] p-4 mb-6">
            <p className="text-xs font-semibold text-[rgba(26,26,26,0.8)] mb-2 uppercase tracking-wider"
               style={{ fontVariationSettings: "'wdth' 100" }}>
              Checkout URL
            </p>
            <p className="text-xs text-[rgba(26,26,26,0.48)] font-mono break-all leading-5">
              https://expert-configured-checkout.com/pay?email={mockUser.email}&uid={mockUser.id}&plan=pro
            </p>
          </div>

          {/* Simulate payment button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="relative w-full py-2.5 px-5 rounded-lg overflow-hidden cursor-pointer transition-all duration-150 hover:opacity-90 active:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(to bottom, #737373, #404040)',
            }}
          >
            <span className="relative z-10 text-sm font-medium text-white/80 flex items-center justify-center gap-2"
                  style={{ fontVariationSettings: "'wdth' 100" }}>
              {isProcessing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white/80 rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                'Simulate Successful Payment'
              )}
            </span>
            <div className="absolute inset-0 border-[1.5px] border-white rounded-lg pointer-events-none" style={{ filter: 'blur(0.2px)' }} />
          </button>

          <p className="text-center text-xs text-[rgba(26,26,26,0.36)] mt-3"
             style={{ fontVariationSettings: "'wdth' 100" }}>
            This simulates the webhook callback to Kodara
          </p>
        </div>
      </div>
    </div>
  )
}
