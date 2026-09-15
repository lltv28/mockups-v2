import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const file = new URL('../kodara-webinar.html', import.meta.url);
const html = await readFile(file, 'utf8');
const visibleText = html
  .replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ');

const slides = html.match(/<section class="slide(?: |")/g) || [];

assert.equal(slides.length, 24, 'webinar should contain the focused 24-slide story');
assert.equal((html.match(/aria-roledescription="slide"/g) || []).length, 24);
assert.equal((html.match(/data-act="[1-5]"/g) || []).length, 24);

for (const requiredCopy of [
  'Health and wellness interest is already moving online.',
  'Meet Sandra AI.',
  'One part of Sandra’s online business. Later, we’ll connect the marketing, conversation, and program.',
  'People are looking for answers, explanations, and next steps from their phones and computers.',
  'You have probably heard this before: take what you know and put it online.',
  'High-ticket coaching',
  'But most people on this webinar have not seen massive success with those models.',
  'The offer, content, funnel, sales, technology, support, and delivery become an entire second business.',
  'How to scale your health and wellness business with AI.',
  'Find the health questions people are already searching for.',
  'See how your expertise could become a “telehealth AI clinic”.',
  'See how AI can help market, sell, and deliver it.',
  'At the end, I’ll show you what Kodara builds for your “telehealth AI clinic” and the next step if you want our help.',
  'My name is Lucas Tyson. I’m the founder and CEO of Kodara.',
  '$50M+',
  'Online marketing agency built by age 25.',
  '100,000+',
  'Leads and appointments generated, including for health and wellness businesses.',
  'My girlfriend Michelle was diagnosed with Graves’ disease.',
  'Then I saw what happened when the right expertise became easier to reach.',
  'The expertise already existed.',
  'The delivery model had to change.',
  'We have already helped experts turn what they know into something people can use online.',
  'Dr. Mike',
  'Power-Up Sports Psychology',
  'Dr. Mike AI launched its first product and moved into testing.',
  'Martyn Buffler',
  'CEO, The Cancer Battle Plan',
  'Five years of ideas and a book became a launched first prototype.',
  'Leanne Ellington',
  'Neuroscience educator',
  'Her virtual business reduced dependence on one-to-one delivery and created time for a passion project.',
  'These are individual client experiences. Results vary, and no specific outcome is guaranteed.',
  'This is one reason independent providers are in demand.',
  'Gallup measures public views of U.S. healthcare quality. It does not measure demand for independent providers directly.',
  'Build your own “telehealth AI clinic” around your expertise.',
  'AI marketing, AI sales, and online education and programs.',
  'Start with evidence of what people already want.',
  'Illustrative estimates for teaching only.',
  'One problem can lead us to a whole set of searches.',
  'Mine related searches',
  'Let’s open the keyword tool and look at real searches together.',
  'Now we have two ways to reach those people.',
  'Search activity is a demand signal. It does not prove willingness to pay or guarantee clients.',
  'Better marketing can make the calendar bottleneck worse.',
  'The calendar is the bottleneck.',
  'Grow beyond your clinic with AI.',
  'Your expertise and oversight guide both businesses.',
  'Education, guidance, and programs.',
  'Here is Sandra AI in action.',
  'Three jobs inside your “telehealth AI clinic”.',
  'AI marketer',
  'AI salesperson',
  'AI program',
  'Bring in a human when needed',
  'You bring the expertise, review, and approval. Kodara builds your online business around it.',
  'Here’s what we build for your “telehealth AI clinic”.',
  'Your approved AI knowledge system',
  'Your website and brand',
  'Launch setup and acquisition path',
  'Professional judgment and ongoing oversight stay with you.',
  '$8,000',
  '$15,000',
  'Pay once. Own it forever.',
  'A recurring yearly subscription.',
  'No revenue or client outcome is guaranteed.',
  'See if Kodara can build your “telehealth AI clinic”.',
  'KodaraHealth.com/webinar',
]) {
  assert.ok(visibleText.includes(requiredCopy), `missing required webinar copy: ${requiredCopy}`);
}

for (const [earlier, later] of [
  ['id="webinar-title"', 'id="ai-preview"'],
  ['id="ai-preview"', 'id="search-signals"'],
  ['id="search-signals"', 'id="opening"'],
  ['id="opening"', 'id="online-models"'],
  ['id="online-models"', 'id="presenter"'],
  ['id="presenter"', 'id="founder-proof-1"'],
  ['id="founder-proof-1"', 'id="founder-proof-2"'],
  ['id="founder-proof-2"', 'id="michelle-story"'],
  ['id="michelle-story"', 'id="online-premise"'],
  ['id="online-premise"', 'id="leanne-proof"'],
  ['id="leanne-proof"', 'id="independent-provider-demand"'],
  ['id="independent-provider-demand"', 'id="demand-signals"'],
  ['id="demand-signals"', 'id="keyword-research"'],
  ['id="keyword-research"', 'id="demand-acquisition"'],
  ['id="demand-acquisition"', 'id="calendar-bottleneck"'],
  ['id="calendar-bottleneck"', 'id="clinic-in-person"'],
  ['id="clinic-in-person"', 'id="clinic-ai"'],
  ['id="clinic-ai"', 'id="clinic-growth"'],
  ['id="clinic-growth"', 'id="ai-business-flow"'],
  ['id="ai-business-flow"', 'id="ai-demonstration"'],
  ['id="ai-demonstration"', 'id="kodara-build"'],
  ['id="kodara-build"', 'id="license-options"'],
  ['id="license-options"', 'id="webinar-cta"'],
]) {
  assert.ok(html.indexOf(earlier) < html.indexOf(later), `${earlier} should appear before ${later}`);
}

function slideMarkup(id) {
  const section = html.match(new RegExp(`<section[^>]*id="${id}"[^>]*>[\\s\\S]*?</section>`));
  assert.ok(section, `missing slide: ${id}`);
  return section[0];
}

for (const id of ['founder-proof-1', 'founder-proof-2']) {
  assert.match(slideMarkup(id), /class="proof-image-space"[^>]*role="img"/, 'each proof slide needs its image space');
}
assert.equal((slideMarkup('michelle-story').match(/class="personal-image"/g) || []).length, 3);
const healthcareProof = slideMarkup('independent-provider-demand');
assert.ok(healthcareProof.indexOf('gallup-healthcare-quality') < healthcareProof.indexOf('class="proof-image-space"'), 'Gallup should precede the second screenshot space');
assert.match(healthcareProof, /aria-label="Space for a second healthcare proof screenshot"/);
assert.equal((slideMarkup('kodara-build').match(/<ul>/g) || []).length, 2, 'offer should use two bullet columns');
assert.match(slideMarkup('license-options'), /\$8,000<span>per year<\/span>/);
assert.match(slideMarkup('license-options'), /\$15,000<span>one time<\/span>/);

assert.ok(html.includes('health/assets/kodara-ai-team.png'));
assert.ok(html.includes('health/assets/lucas-tyson-speaking.jpg'));
assert.ok((html.match(/health\/assets\/kodara-wordmark\.svg/g) || []).length >= 2);
assert.ok(html.includes('health/assets/dr-mike-poster.jpg'));
assert.ok(html.includes('health/assets/martyn-buffler.jpg'));
assert.ok(html.includes('health/assets/leanne.jpg'));
assert.ok(html.includes('health/assets/gallup-healthcare-quality-24-year-low.png'));
assert.equal((html.match(/<iframe\b/g) || []).length, 2, 'both Sandra slides should load playable video');
assert.match(html, /<iframe[^>]*src="https:\/\/customer-nguqf0yqc9xf45px\.cloudflarestream\.com\/efec3e7459738b6bdddbbb49f3f9b0b8\/iframe\?controls=true&amp;muted=true&amp;preload=true&amp;poster=[^"]+"[^>]*title="Sandra AI preview"[^>]*loading="eager"[^>]*data-thumbnail-poster=/);
assert.match(html, /<iframe[^>]*src="https:\/\/customer-nguqf0yqc9xf45px\.cloudflarestream\.com\/efec3e7459738b6bdddbbb49f3f9b0b8\/iframe\?muted=true&amp;preload=true&amp;poster=/);
assert.match(html, /<iframe[^>]*title="Sandra AI demonstration"[^>]*loading="lazy"[^>]*data-thumbnail-poster=/);
assert.match(html, /<iframe[^>]*allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"[^>]*allowfullscreen/);
assert.match(html, /\.ai-preview \{[^}]*justify-items: center;[^}]*text-align: center;/s);
assert.match(html, /\.ai-preview-frame \{[^}]*width: 680px;[^}]*aspect-ratio: 1;/s);
assert.match(html, /\.final-cta-url \{[^}]*text-decoration: none;/);
assert.match(html, /<a class="final-cta-url" href="https:\/\/kodarahealth\.com\/webinar\/"[^>]*>KodaraHealth\.com\/webinar<\/a>/);
assert.ok(html.includes('id="leanne-proof"'), 'proof slide should retain its presenter-note key');
assert.equal((html.match(/class="proof-client(?:\s[^"]*)?"/g) || []).length, 3, 'opening proof should show three clients');
assert.equal((html.match(/id="leanne-proof"/g) || []).length, 1, 'client proof should appear only once');
for (const removedSlideId of [
  'definition',
  'ai-customer-path',
  'topic-vs-search',
  'angle-example',
  'implementation-bridge',
  'mechanism-bridge',
  'responsibility-split',
  'fit-and-next',
  'online-reality',
  'reverse-funnel',
  'more-leads',
  'false-alternatives',
  'six-part-process',
  'select-problem',
  'extract-expertise',
  'knowledge-system',
  'virtual-business',
  'test-and-approve',
  'launch-and-discover',
  'live-demo',
  'safety-boundaries',
  'elevator-pitch',
  'who-fits',
  'who-does-not-fit',
  'what-we-build',
  'guarantee',
  'decision-terms',
  'accuracy-objection',
  'time-audience-objection',
  'difference-objection',
  'common-questions',
  'normalize-uncertainty',
  'fit-assessment',
  'two-problems',
  'positioning-shift',
  'search-first',
  'intent-ladder',
  'demand-not-angle',
  'angle-fit',
  'angle-filters',
  'research-process',
  'angle-scorecard',
  'positioning-output',
  'angle-controls-build',
]) {
  assert.ok(!html.includes(`id="${removedSlideId}"`), `${removedSlideId} should be removed from the condensed lesson`);
}
assert.ok(html.includes("clone.querySelectorAll('[data-thumbnail-poster]')"));
assert.ok(html.includes('media.replaceWith(poster)'));
assert.ok(html.includes('id="previousSlide"'));
assert.ok(html.includes('id="nextSlide"'));
assert.ok(html.includes('aria-controls="panel"'));
assert.ok(html.includes('aria-label="Open slide panel"'));
assert.ok(html.includes('class="panel collapsed"'));
assert.ok(html.includes('aria-hidden="true" inert'));
assert.ok(html.includes('aria-expanded="false"'));
assert.ok(html.includes('panel.inert = collapsed'));
assert.ok(
  html.indexOf('id="panelToggle"') < html.indexOf('<main class="deck"'),
  'the slide panel control should stay outside the scaled deck',
);
assert.match(html, /\.panel-toggle\s*\{[^}]*position:\s*fixed;[^}]*z-index:\s*600;[^}]*width:\s*48px;[^}]*height:\s*48px;/s);
assert.ok(html.includes("panelToggle.setAttribute('aria-label', collapsed ? 'Open slide panel' : 'Close slide panel')"));
assert.ok(html.includes('thumbs[current].focus()'));
assert.ok(html.includes("if (event.key === 'Escape' && !panel.classList.contains('collapsed'))"));
assert.ok(html.includes('function goTo(index)'));
assert.ok(html.includes("event.key === 'Home'"));
assert.ok(html.includes("event.key === 'End'"));
assert.ok(html.includes("event.key.toLowerCase() === 'p'"), 'P should open presenter view');
assert.ok(html.includes("new BroadcastChannel('kodara-webinar')"));
assert.ok(html.includes("window.open(presenterUrl, 'kodara-webinar-presenter'"));
assert.ok(html.includes('presenterWindow && !presenterWindow.closed'), 'P should refocus an existing presenter window');
assert.ok(html.includes("message.type === 'go-to'"));
assert.ok(html.includes("document.documentElement.classList.add('preview-mode')"));
assert.ok(!html.includes('id="progress"'), 'audience view should not show a progress bar');
assert.ok(!html.includes('id="counter"'), 'audience view should not show a slide counter');
assert.ok(html.includes('@media (prefers-reduced-motion: reduce)'));
assert.ok(html.includes('--deck-width: 1920px'));
assert.ok(html.includes('--deck-height: 1080px'));
assert.ok(html.includes('transform: translate(-50%, -50%) scale(var(--deck-scale))'));
assert.ok(html.includes('function updateDeckScale()'));
assert.ok(html.includes('--panel-space: 0px'), 'collapsed selector should reserve no viewport width');
assert.ok(
  html.includes('left: calc(50% + var(--panel-space) / 2)'),
  'the slide should center within the space beside the selector',
);
assert.ok(html.includes('const availableWidth = window.innerWidth - panelWidth'));
assert.ok(html.includes("style.setProperty('--panel-space', panelWidth + 'px')"));

const thumbnailActivation = html.match(/const activate = \(\) => \{([\s\S]*?)\n\s*\};/);
assert.ok(thumbnailActivation, 'thumbnail activation should exist');
assert.ok(
  !thumbnailActivation[1].includes('setPanelCollapsed(true)'),
  'selecting a slide should keep the selector open',
);
assert.match(
  html,
  /if \(event\.key === 'Enter' \|\| event\.key === ' '\) \{[\s\S]*?event\.stopPropagation\(\);[\s\S]*?activate\(\);/,
  'keyboard thumbnail activation should not bubble into deck navigation',
);

const panelState = html.match(/function setPanelCollapsed\(collapsed\) \{([\s\S]*?)\n\s*\}/);
assert.ok(panelState, 'panel state handler should exist');
assert.ok(panelState[1].includes('updateDeckScale()'), 'panel changes should immediately resize the stage');

assert.doesNotMatch(html, /\[INSERT|PLACEHOLDER|TODO/i);
assert.doesNotMatch(html, /[—–]/);
assert.doesNotMatch(html, /(?:28%|260 million|350 health)/i);
assert.doesNotMatch(visibleText, /(?:350\+|105,000\+|30\+ health|\$500\s*-\s*\$2,000|Mayo Clinic|Johns Hopkins)/i);
assert.doesNotMatch(visibleText, /(?:make double what I made last year|three and six ROAS|Replace with sourced)/i);
assert.doesNotMatch(visibleText, /(?:story proves|better-fit calls|advertising work led by Lucas)/i);
assert.doesNotMatch(visibleText, /Sandra Parker|Just The Tonic|client-acquisition story/i);
assert.ok(!html.includes('health/assets/sandra-client-story.mp4'), 'late Sandra proof should not load');
assert.doesNotMatch(html, /fast\.wistia\./i, 'the deck should use the reviewed local testimonial excerpt');
assert.doesNotMatch(html, /(?:toxic poop|overnight weight loss|government pays|buyer pyramid)/i);
assert.doesNotMatch(
  visibleText,
  /(?:before this slide goes live|presenter checklist|add Leanne's approved words|HOLD until|current VSL says|the live demo should show|start with a question a real prospective|define the original delivery model|show the change with approved records|keep the boundary visible)/i,
  'audience slides should not expose internal production notes',
);

console.log('kodara webinar: 16:9 stage, teaching sequence, controls, and claim guardrails verified');
