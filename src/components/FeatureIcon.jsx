const icons = {
  infinity: (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 8c-1.38 0-2.5-1.12-2.5-2.5S3.12 3 4.5 3 7 4.12 7 5.5C7 8 9 11 11.5 11c1.38 0 2.5-1.12 2.5-2.5S12.88 6 11.5 6C9 6 7 8 4.5 8z" />
    </svg>
  ),
  sparkle: (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1l1.5 4.5L14 7l-4.5 1.5L8 13l-1.5-4.5L2 7l4.5-1.5L8 1z" />
    </svg>
  ),
  bolt: (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 1L3 9h5l-1 6 6-8H8l1-6z" />
    </svg>
  ),
  clipboard: (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="2" width="10" height="12" rx="1.5" />
      <path d="M6 6h4M6 9h4M6 12h2" />
    </svg>
  ),
  chart: (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 14h12M4 10v4M7 7v7M10 4v10M13 2v12" />
    </svg>
  ),
}

export default function FeatureIcon({ type }) {
  return (
    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-[rgba(16,104,68,0.06)]">
      <span className="text-[rgba(16,104,68,0.92)]">
        {icons[type] || icons.sparkle}
      </span>
    </div>
  )
}
