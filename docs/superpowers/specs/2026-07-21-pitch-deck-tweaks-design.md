# Pitch Deck Tweaks Design

## Goal

Rebuild the Kodara sales deck around the approved two-stage offer, Build and Launch, while preserving the current visual system and the recently approved client-proof slide.

## Source of truth

The content requirements come from `C:\Users\lucas\Downloads\Pitch deck tweaks.docx` and the design decisions approved in this conversation on July 21, 2026.

## Scope

The finished deck will contain 20 visible slides instead of 29. It will keep the current Kodara typography, green palette, animation system, thumbnail navigation, progress indicator, and responsive scaling.

The implementation will edit the existing HTML deck in `slides/deck.html`. New credibility images will be stored locally under `slides/ai-proof/` so presentations do not depend on remote image hosts.

## Final slide sequence

1. New opening message
2. Reordered AI offer ladder
3. Why clients love Kodara
4. Big-name AI credibility
5. Build and Launch overview
6. Build cover
7. Lucas onboarding call
8. Your entry-level AI
9. AI Pocket Coach demo
10. AI product library
11. Real-client testing
12. Build validation demo
13. Launch cover
14. Authority branding overview
15. Organic launch flow
16. Paid ads launch flow
17. Build and Launch offer summary
18. Your life's work timeline and logo proof
19. Investment
20. Payment options

The hidden guarantee slide remains hidden and is not counted as a visible slide.

## Pre-pitch

### Slide 1: Opening

Replace the current bottleneck copy with:

> You can only sell one person at a time.  
> Your AI can sell a thousand, all at once.

Supporting copy:

> It's a cloned, automated version of you that works 24/7, pre-selling and qualifying leads so only ready buyers ever land on your calendar.

### Slide 2: Offer ladder

Keep the existing three-card design and reorder the cards to:

1. AI Assessment, $17 one time
2. 1-on-1 Service, high ticket
3. AI Pocket Coach, $297 per month

Update the explanation so the AI sells the assessment, identifies qualified buyers for the high-ticket service, and offers the Pocket Coach to buyers who are not ready for a call.

### Slide 3: Client proof

Keep the approved “Why our clients love the Kodara model” slide unchanged, including its moving client rows, social-proof logo strip, smaller benefit cards, and responsive logo scaling.

### Slide 4: Big-name AI credibility

Create a new slide with the headline:

> The biggest experts are already turning their knowledge into AI.

Show four equal credibility cards:

- Tony Robbins, Tony Robbins AI
- Alex Hormozi, ACQ AI
- Grant Cardone, 10X AI Revenue Coach
- Dr. Mark Hyman, AI Mark

Each card uses a locally stored image, the person’s name, and the product name. A lower proof band lists four reasons experts build these products:

- Available 24/7
- Automated nurturing
- Recurring monthly revenue
- Scale without adding calendar time

Do not claim that each person invested a specific dollar amount. Use official public product pages as the factual source:

- `https://www.tonyrobbins.com/programs/tony-ai`
- `https://ai.acquisition.com/`
- `https://10xgc.grantcardone.com/blt-offer`
- `https://drhyman.com/products/ai-mark`

## Build and Launch

### Two-stage overview

Replace “Build, launch, monetize” with “Build and launch.” The overview contains two balanced cards:

- Build, four weeks
- Launch, two weeks

Remove the Monetize card and its six-month label.

### Build

Keep the current Build sequence and content:

- Build cover
- Lucas onboarding call
- Entry-level AI and connector grid
- AI Pocket Coach demo
- AI product library
- Real-client testing
- Validation demo

The product-library order must match the reordered offer ladder: Assessment, 1-on-1 Service, Pocket Coach.

### Launch

Keep a Launch cover, then replace the existing detailed marketing slides with three new slides.

#### Authority branding overview

Use three equal cards:

- Personal branded website
- Done-for-you posting
- ManyChat comment and DM automation

#### Organic launch flow

Use the approved horizontal flowchart style with four connected cards:

1. Content created
2. Content posted consistently
3. ManyChat starts the conversation
4. Lead enters the AI assessment and funnel

#### Paid ads launch flow

Use the same horizontal flowchart style:

1. Ads created and configured
2. Traffic reaches the funnel
3. Buyer completes the $17 assessment
4. Qualified buyers book calls; remaining buyers receive the Pocket Coach offer

## Closing

### Offer summary

Replace the three-stage recap with two cards, Build and Launch. Keep the 1,000 completed AI assessments guarantee and its existing ad-spend qualifier.

### Your life’s work

Keep the existing timeline and guarantee. Replace the green quote box with a compact two-row logo stack containing:

- Mayo Clinic
- ClickFunnels
- Johns Hopkins
- HighLevel
- Fidelity Investments
- ServiceTitan
- Tony Robbins
- H&R Block
- Ramsey Solutions

Reuse the same embedded logo sources, grayscale treatment, and visual order already approved on the client-proof slide.

### Investment

Keep the $18,000 price and six-month payment framing. Replace the deliverables list with:

- Lucas onboarding call
- Done-for-you AI build
- AI avatar
- AI sales team
- Personal branded website
- Done-for-you posting
- ManyChat automation
- Done-for-you funnel
- Paid ads setup

Remove the entire internal-results box containing “April–June 2026,” 34 high-ticket clients, $612K+ contracted revenue, and the 1,000-lead statement.

### Payment options

Keep the payment-options slide unchanged.

## Slides removed

Remove these visible slides from the deck and thumbnail navigation:

- Why a $17 AI beats a free lead magnet
- The three questions everyone asks
- Niche list
- Sandra testimonial
- Done-for-you funnel detail
- Existing organic marketing detail
- Pipeline activation
- Existing paid ads detail
- Existing combined funnel summary
- Monetize cover
- Ascension diagram
- Back-end ecosystem
- Upsell engine

## Responsive behavior

- Desktop keeps the current 16:9 composition and side thumbnail panel.
- Tablet and phone retain the current vertical responsive layout.
- Four credibility cards remain readable without horizontal clipping.
- Both four-step flowcharts remain fully visible; they may stack vertically below the current tablet breakpoint.
- All local credibility images load without network access.
- The client-proof slide’s approved 900px gap and 850px fluid logo scaling remain unchanged.

## Testing and verification

Add a dedicated Node test file for the full deck revision. Tests must first fail against the current deck and then pass after implementation.

Automated checks cover:

- 20 visible slides and their approved order
- Exact opening copy
- Reordered offer ladder and product-library order
- Presence of all four credibility examples and locally stored images
- Two-stage Build and Launch overview
- Approved authority-branding deliverables
- Organic and paid flow steps
- Removal of obsolete pre-pitch, pipeline, and Monetize content
- Updated closing logo stack
- Removal of internal business numbers
- Preserved payment options and guarantee qualifier

Final verification includes:

- Existing slide 3 regression tests
- New deck revision tests
- Production Vite build
- `git diff --check`
- Visual review at 1600px, 900px, and 430px viewport widths

## Non-goals

- No redesign of the core Kodara visual identity
- No changes to payment amounts
- No changes to the 1,000-assessment guarantee or qualifier
- No unsupported claims about dollar amounts invested by public figures
- No remote image dependencies at presentation time
