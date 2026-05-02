import { useState, useEffect, useRef } from "react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');`;

// ─── GAME DATA ────────────────────────────────────────────────────────────────
const SCENARIOS = [
  {
    id: 1,
    title: "Morning Routine",
    image: "/images/download.jpeg",
    bg: "from-amber-900 to-orange-950",
    text: "It's 6 AM. Your alarm goes off. How do you start your day?",
    richChoices: [
      { text: "Hit the gym in your building, then have a personal chef cook breakfast", impact: "+Energy, +Health", popup: "Your day begins with structure, care, and support. Discipline feels easier when everything is designed around you." },
      { text: "Take a relaxing morning at home, order premium delivery", impact: "+Rest, +Comfort", popup: "You don’t rush — your time is yours. Comfort replaces urgency in how your day begins." },
      { text: "Drive to your favourite café in your car", impact: "+Mood", popup: "Even small joys are accessible. Freedom of movement shapes your everyday experiences." }
    ],
    poorChoices: [
      { text: "Rush to catch the 6:30 bus to your second job", impact: "-Rest, +Income", popup: "Your morning starts with pressure. Survival dictates your routine, not preference." },
      { text: "Make instant noodles — it's all that's left till payday", impact: "-Health", popup: "When money runs low, even basic nutrition becomes a compromise." }
    ]
  },

  {
    id: 2,
    title: "Health Scare",
    image: "🏥",
    bg: "from-blue-950 to-slate-900",
    text: "You wake up with a sharp chest pain. What do you do?",
    richChoices: [
      { text: "Call your private doctor for an immediate home visit", impact: "+Health, +Speed", popup: "Care comes directly to you. Speed and access reduce fear almost instantly." },
      { text: "Drive to a premium private hospital with no wait", impact: "+Health", popup: "You act immediately. Time isn’t lost in waiting — and that can make all the difference." },
      { text: "Call your health insurance — they cover everything", impact: "+Security", popup: "Protection is already in place. You don’t worry about cost, only recovery." }
    ],
    poorChoices: [
      { text: "Google symptoms and hope it passes — can't afford a hospital", impact: "-Health, +Risk", popup: "Uncertainty grows when help feels expensive. Waiting becomes a dangerous gamble." },
      { text: "Wait for the public hospital queue (8 hours)", impact: "-Time, +Health", popup: "Care exists, but patience is the price. Relief comes slowly, if at all." }
    ]
  },

  {
    id: 3,
    title: "Education Decision",
    image: "🎓",
    bg: "from-indigo-950 to-violet-950",
    text: "Your child wants to pursue higher education. What are your options?",
    richChoices: [
      { text: "Send them to a top private university abroad", impact: "+Future, +Network", popup: "Opportunities expand globally. The world becomes a platform, not a limitation." },
      { text: "Hire private tutors to prep for scholarships", impact: "+Future", popup: "Preparation is structured and guided. Success feels planned rather than uncertain." },
      { text: "Enroll in an elite local institution, full fees paid", impact: "+Future, +Local", popup: "Access to quality education is guaranteed, not competed for." }
    ],
    poorChoices: [
      { text: "Encourage them to apply for government scholarships (very competitive)", impact: "+Hope, -Security", popup: "The future depends on hope and competition, not certainty." },
      { text: "They work part-time while studying at a local college", impact: "-Rest, +Degree", popup: "Progress comes with exhaustion. Every step forward demands sacrifice." }
    ]
  },

  {
    id: 4,
    title: "Housing Crisis",
    image: "🏠",
    bg: "from-stone-900 to-zinc-900",
    text: "Your landlord is raising rent by 40%. What's your next move?",
    richChoices: [
      { text: "Buy your own property — your savings make it easy", impact: "+Security, +Asset", popup: "You turn instability into ownership. Security becomes permanent." },
      { text: "Move to a luxury apartment in a better neighbourhood", impact: "+Comfort", popup: "Change becomes an upgrade. Your environment improves, not declines." },
      { text: "Invest in real estate — become the landlord", impact: "+Wealth", popup: "You shift from surviving the system to benefiting from it." }
    ],
    poorChoices: [
      { text: "Move to a smaller place further from work", impact: "-Comfort, -Time", popup: "Affordability pushes you further away from opportunity and comfort." },
      { text: "Take on a roommate to split costs", impact: "-Privacy, +Stability", popup: "Stability comes at the cost of personal space and independence." }
    ]
  },

  {
    id: 5,
    title: "Job Loss",
    image: "💼",
    bg: "from-red-950 to-rose-950",
    text: "Your company just announced layoffs. You're on the list.",
    richChoices: [
      { text: "Start your own business — you have savings as runway", impact: "+Freedom, +Risk", popup: "Loss becomes opportunity. You have the cushion to take risks." },
      { text: "Take a sabbatical, travel, and reskill", impact: "+Growth", popup: "You pause and grow. Time becomes an investment, not a threat." },
      { text: "Tap your elite network — a job offer arrives in days", impact: "+Income, +Network", popup: "Connections catch you before you fall too far." }
    ],
    poorChoices: [
      { text: "Apply everywhere immediately, take whatever comes first", impact: "-Choice, +Income", popup: "Urgency replaces choice. Stability matters more than preference." },
      { text: "Take two part-time gigs to stay afloat", impact: "-Rest, +Income", popup: "Survival divides your energy. Rest becomes a luxury you can’t afford." }
    ]
  },

  {
    id: 6,
    title: "Food & Nutrition",
    image: "🍽️",
    bg: "from-green-950 to-emerald-950",
    text: "A nutritionist says you need to eat healthier. What changes?",
    richChoices: [
      { text: "Hire a personal chef who prepares organic meals", impact: "+Health, +Energy", popup: "Health is carefully managed. Every meal is designed for your well-being." },
      { text: "Subscribe to a premium meal-prep service", impact: "+Health", popup: "Convenience and nutrition go hand in hand." },
      { text: "Join an exclusive wellness program", impact: "+Health, +Knowledge", popup: "Expert guidance turns health into a structured journey." }
    ],
    poorChoices: [
      { text: "Buy the cheapest vegetables and cook carefully", impact: "+Health (partial)", popup: "You try your best with what you have. Effort replaces abundance." },
      { text: "Skip the advice — healthy food is expensive", impact: "-Health", popup: "Cost outweighs long-term health. Survival comes first." }
    ]
  },

  {
    id: 7,
    title: "Legal Trouble",
    image: "⚖️",
    bg: "from-yellow-950 to-amber-950",
    text: "You receive an unfair fine or legal notice. What do you do?",
    richChoices: [
      { text: "Call your personal lawyer", impact: "+Justice, +Security", popup: "Expertise protects you. Justice becomes accessible." },
      { text: "Hire the city's best law firm", impact: "+Justice", popup: "Resources strengthen your voice against the system." },
      { text: "Use connections to resolve it quietly", impact: "+Speed", popup: "Influence bypasses process. Problems disappear quickly." }
    ],
    poorChoices: [
      { text: "Pay the fine even though it's unfair", impact: "-Money, -Justice", popup: "You accept unfairness because fighting it costs too much." },
      { text: "Handle it yourself with free legal aid", impact: "-Time, +Hope", popup: "Justice is uncertain and slow, but you try anyway." }
    ]
  },

  {
    id: 8,
    title: "Mental Health",
    image: "🧠",
    bg: "from-purple-950 to-fuchsia-950",
    text: "You've been feeling overwhelmed and burnt out for months.",
    richChoices: [
      { text: "Check into a luxury wellness retreat", impact: "+Mental Health, +Rest", popup: "You step away to heal. Recovery is prioritized." },
      { text: "See a top therapist weekly", impact: "+Mental Health", popup: "Support is consistent and professional." },
      { text: "Take a long holiday", impact: "+Rest, +Clarity", popup: "Distance creates clarity. You can afford to reset." }
    ],
    poorChoices: [
      { text: "Keep working — can't take time off", impact: "-Mental Health", popup: "You push through exhaustion. There’s no space to pause." },
      { text: "Use free resources and talk to friends", impact: "+Hope, -Effectiveness", popup: "Support exists, but it’s limited. You cope as best as you can." }
    ]
  },

  {
    id: 9,
    title: "Natural Disaster",
    image: "🌊",
    bg: "from-cyan-950 to-blue-950",
    text: "Floods are threatening your neighbourhood. Evacuate now!",
    richChoices: [
      { text: "Drive to your second home", impact: "+Safety, +Comfort", popup: "Escape is immediate. Safety comes with comfort." },
      { text: "Book a hotel in a safe city", impact: "+Safety", popup: "You relocate without panic. Stability follows you." },
      { text: "Hire private transport", impact: "+Safety, +Speed", popup: "Speed gives you control over chaos." }
    ],
    poorChoices: [
      { text: "Wait for government evacuation", impact: "-Safety, -Time", popup: "You wait for help that may not come in time." },
      { text: "Go to the public shelter", impact: "+Safety (minimal)", popup: "Safety is shared and uncertain. Comfort disappears." }
    ]
  },

  {
    id: 10,
    title: "Social Circle",
    image: "🤝",
    bg: "from-teal-950 to-slate-900",
    text: "You want to grow your career network. Where do you go?",
    richChoices: [
      { text: "Attend exclusive events", impact: "+Network", popup: "Opportunities surround you naturally." },
      { text: "Join a mastermind group", impact: "+Growth", popup: "Growth is structured through powerful networks." },
      { text: "Host a dinner party", impact: "+Influence", popup: "You create spaces where influence gathers." }
    ],
    poorChoices: [
      { text: "Attend a free workshop", impact: "+Hope", popup: "You rely on chance to create opportunity." },
      { text: "Message strangers online", impact: "-Dignity, +Chance", popup: "Effort doesn’t always guarantee access." }
    ]
  },

  {
    id: 11,
    title: "Children's Future",
    image: "👶",
    bg: "from-pink-950 to-rose-950",
    text: "You want to give your child the best start in life.",
    richChoices: [
      { text: "Best private school", impact: "+Future", popup: "Your child grows with every advantage." },
      { text: "Set up a trust fund", impact: "+Security", popup: "Their future is protected before it begins." },
      { text: "Travel the world", impact: "+Growth", popup: "Exposure shapes a broader perspective." }
    ],
    poorChoices: [
      { text: "Local government school", impact: "+Education", popup: "Education exists, but resources are limited." },
      { text: "Hope for scholarship", impact: "+Hope", popup: "The future depends on chance, not certainty." }
    ]
  },

  {
    id: 12,
    title: "Retirement Planning",
    image: "🌿",
    bg: "from-lime-950 to-green-950",
    text: "You're thinking about your life at 65.",
    richChoices: [
      { text: "Investments", impact: "+Freedom", popup: "Your future is flexible and secure." },
      { text: "Passive income", impact: "+Wealth", popup: "Money continues working for you." },
      { text: "Passion projects", impact: "+Fulfilment", popup: "Retirement becomes a new beginning." }
    ],
    poorChoices: [
      { text: "Work forever", impact: "-Health", popup: "Rest is uncertain. Work never truly ends." },
      { text: "Rely on family", impact: "-Independence", popup: "Support replaces independence." }
    ]
  },

  {
    id: 13,
    title: "Food Insecurity",
    image: "🍞",
    bg: "from-orange-950 to-red-950",
    text: "At the end of the month, food is scarce.",
    richChoices: [
      { text: "Always stocked pantry", impact: "+Security", popup: "Hunger is never a concern." },
      { text: "Order anytime", impact: "+Comfort", popup: "Food is always within reach." },
      { text: "Donate food", impact: "+Impact", popup: "You give because you have excess." }
    ],
    poorChoices: [
      { text: "Skip meals", impact: "-Health", popup: "You sacrifice your needs for others." },
      { text: "Food bank", impact: "+Survival", popup: "Support exists, but dignity is tested." }
    ]
  },

  {
    id: 14,
    title: "Political Voice",
    image: "🗳️",
    bg: "from-slate-900 to-zinc-950",
    text: "A policy affects your area.",
    richChoices: [
      { text: "Donate to campaigns", impact: "+Influence", popup: "Money amplifies your voice." },
      { text: "Hire a lobbyist", impact: "+Power", popup: "Your concerns reach decision-makers directly." },
      { text: "Host fundraiser", impact: "+Impact", popup: "You shape conversations at the top." }
    ],
    poorChoices: [
      { text: "Attend protest", impact: "+Voice", popup: "You stand up, but impact is uncertain." },
      { text: "Post online", impact: "+Chance", popup: "Your voice competes with millions." }
    ]
  },

  {
    id: 15,
    title: "Legacy",
    image: "✨",
    bg: "from-violet-950 to-indigo-950",
    text: "At the end of your journey, what do you leave behind?",
    richChoices: [
      { text: "Philanthropic foundation", impact: "+Legacy", popup: "Your name shapes lives beyond your time." },
      { text: "Generational wealth", impact: "+Family", popup: "Your family inherits security and opportunity." },
      { text: "Cultural contributions", impact: "+Culture", popup: "Your impact becomes part of history." }
    ],
    poorChoices: [
      { text: "Love and values", impact: "+Heart", popup: "Your legacy lives in people, not possessions." },
      { text: "Life of resilience", impact: "+Dignity", popup: "You leave behind strength forged through struggle." }
    ]
  }
];

// ─── STYLES ───────────────────────────────────────────────────────────────────
const css = `
  ${FONT}
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #root {
  min-height: 100vh;
  width: 100%;
}

body {
  overflow-x: hidden;
}

/* app should NOT lock height */
.app {
  min-height: 100vh;
  width: 100%;
}

  body, #root { 
    font-family: 'DM Sans', sans-serif; 
    background: #0a0a0f;
    color: #f0ede8;
    min-height: 100vh;
  }


  /* ── LANDING ── */
 .landing {
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

  .landing-bg {
    position: absolute; inset: 0;
    background: 
      radial-gradient(ellipse 60% 40% at 20% 50%, rgba(180,120,40,0.12) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 50%, rgba(40,80,180,0.12) 0%, transparent 60%);
  }

  .landing-content {
    position: relative; z-index: 2;
    text-align: center;
    padding: 2rem;
    max-width: 900px;
  }

  .landing-eyebrow {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 1.5rem;
  }

  .landing-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3rem, 7vw, 6rem);
    font-weight: 700;
    line-height: 1.05;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #d4a843 0%, #f0ede8 50%, #4a7fd4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .landing-subtitle {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    font-style: italic;
    color: rgba(240,237,232,0.5);
    margin-bottom: 3rem;
  }

  /* Characters */
  .characters-row {
    display: flex;
    gap: 3rem;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 3rem;
  }

  .character-card {
    position: relative;
    cursor: pointer;
    transition: transform 0.4s ease;
  }
  .character-card:hover { transform: translateY(-8px); }

  .character-visual {
    width: 160px;
    height: 220px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.08);
  }

  .char-rich .character-visual {
    background: linear-gradient(160deg, #1a1408 0%, #2d1f05 100%);
    box-shadow: 0 20px 60px rgba(180,120,40,0.2), inset 0 1px 0 rgba(212,168,67,0.3);
  }

  .char-poor .character-visual {
    background: linear-gradient(160deg, #080d18 0%, #0d1428 100%);
    box-shadow: 0 20px 60px rgba(40,80,160,0.15), inset 0 1px 0 rgba(74,127,212,0.2);
  }

  .character-emoji { font-size: 4rem; line-height: 1; }
  
  .character-badge {
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 0.2rem 0.6rem;
    border-radius: 20px;
  }

  .char-rich .character-badge { 
    background: rgba(212,168,67,0.15); 
    color: #d4a843; 
    border: 1px solid rgba(212,168,67,0.3);
  }
  .char-poor .character-badge { 
    background: rgba(74,127,212,0.15); 
    color: #7aacf0; 
    border: 1px solid rgba(74,127,212,0.3);
  }

  .character-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    margin-top: 0.75rem;
    text-align: center;
  }

  .character-desc {
    font-size: 0.72rem;
    color: rgba(240,237,232,0.45);
    text-align: center;
    max-width: 140px;
    line-height: 1.4;
    margin-top: 0.25rem;
  }

  .char-vs {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    color: rgba(255,255,255,0.15);
    font-style: italic;
    align-self: center;
    padding-bottom: 3rem;
  }

  /* Select prompt */
  .select-prompt {
    font-size: 0.8rem;
    color: rgba(240,237,232,0.4);
    letter-spacing: 0.05em;
    margin-bottom: 2rem;
  }

  /* ── SCENARIO PAGE ── */
  .scenario-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

  .scenario-header {
    padding: 1.5rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    position: relative; z-index: 2;
  }

  .progress-bar-wrap {
    flex: 1;
    max-width: 300px;
    height: 3px;
    background: rgba(255,255,255,0.08);
    border-radius: 2px;
    margin: 0 1.5rem;
    overflow: hidden;
  }
  .progress-bar-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.5s ease;
  }

 .scenario-body {
  flex: 1;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
}

  @media (max-width: 768px) {
    .scenario-body { grid-template-columns: 1fr; }
  }

  .scenario-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;   /* ✅ start from top */
  padding: 3rem 2rem;
  position: relative;
  overflow-y: auto;              /* ✅ allow scroll */
}
  .scenario-left,
.scenario-right {
  padding: 2rem;
  overflow-y: auto;   /* ✅ allow scroll IF needed */
}

  .scenario-bg-blur {
    position: absolute; inset: 0;
    opacity: 0.4;
    filter: blur(40px);
    z-index: 0;
  }

  .scenario-image {
  width: 100%;
  max-width: 620px;   /* controls max size */
  height: auto;       /* ✅ keeps aspect ratio */
  max-height: 600px;  /* optional safety */
  object-fit: cover;
  border-radius: 16px;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.5));
}

  // @keyframes float {
  //   0%, 100% { transform: translateY(0); }
  //   50% { transform: translateY(-12px); }
  // }

  .scenario-number {
    position: relative; z-index: 1;
    font-size: 0.65rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .scenario-title {
    position: relative; z-index: 1;
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    text-align: center;
    margin-bottom: 1rem;
  }

  .scenario-text {
    position: relative; z-index: 1;
    font-size: 1rem;
    line-height: 1.7;
    text-align: center;
    color: rgba(240,237,232,0.7);
    max-width: 340px;
    font-style: italic;
  }

  .scenario-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3rem 2.5rem;
    border-left: 1px solid rgba(255,255,255,0.05);
    overflow-y: auto;
  }

  .player-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 0.3rem 0.75rem;
    border-radius: 20px;
    margin-bottom: 1.5rem;
  }

  .tag-rich { 
    background: rgba(212,168,67,0.1); 
    color: #d4a843; 
    border: 1px solid rgba(212,168,67,0.25);
  }
  .tag-poor { 
    background: rgba(74,127,212,0.1); 
    color: #7aacf0; 
    border: 1px solid rgba(74,127,212,0.25);
  }

  .choices-label {
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 1rem;
  }

  .choice-btn {
    width: 100%;
    text-align: left;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px;
    padding: 1rem 1.25rem;
    cursor: pointer;
    margin-bottom: 0.75rem;
    transition: all 0.25s ease;
    color: #f0ede8;
    position: relative;
    overflow: hidden;
  }

  .choice-btn::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    border-radius: 10px 0 0 10px;
    opacity: 0;
    transition: opacity 0.25s;
  }

  .choice-btn:hover { 
    background: rgba(255,255,255,0.07); 
    border-color: rgba(255,255,255,0.15);
    transform: translateX(4px);
  }

  .choice-btn:hover::before { opacity: 1; }

  .choice-rich .choice-btn::before { background: #d4a843; }
  .choice-poor .choice-btn::before { background: #7aacf0; }

  .choice-btn.selected { 
    background: rgba(255,255,255,0.08);
    transform: translateX(4px);
  }
  .choice-btn.selected::before { opacity: 1 !important; }

  .choice-text { 
    font-size: 0.9rem; 
    line-height: 1.5; 
    margin-bottom: 0.35rem;
  }

  .choice-impact {
    font-size: 0.7rem;
    color: rgba(255,255,255,0.35);
    font-weight: 500;
  }

  .locked-zone {
    border: 1px dashed rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 1rem 1.25rem;
    margin-top: 0.5rem;
    margin-bottom: 0.75rem;
    opacity: 0.5;
  }

  .locked-label {
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .locked-item {
    font-size: 0.82rem;
    color: rgba(255,255,255,0.2);
    padding: 0.4rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    line-height: 1.4;
  }
  .locked-item:last-child { border-bottom: none; }

  .next-btn {
    margin-top: 1.5rem;
    width: 100%;
    padding: 0.9rem;
    border-radius: 10px;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: all 0.2s ease;
    opacity: 0;
    pointer-events: none;
    transform: translateY(8px);
  }

  .next-btn.visible { 
    opacity: 1; 
    pointer-events: all;
    transform: translateY(0);
  }

  .next-rich { background: #d4a843; color: #1a1408; }
  .next-rich:hover { background: #e0b855; }
  .next-poor { background: #4a7fd4; color: #05080f; }
  .next-poor:hover { background: #5a8fe4; }

 /* ── RESULTS ── */
.results-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  background: #05050a;
  overflow-y: auto;
}

.results-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 60% at 50% 40%,
    rgba(120, 60, 160, 0.08) 0%,
    transparent 60%
  );
}

.results-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1100px;
  height: 100%;

  display: grid;
  grid-template-rows: auto auto auto 1fr auto;
  gap: 1rem;

  text-align: center;
}

/* top text */
.results-eyebrow {
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
}

.results-title {
  font-family: "Playfair Display", serif;
  font-size: clamp(2rem, 3vw, 3rem);
  margin-bottom: 0.3rem;
}

.results-message {
  font-size: 0.9rem;
  line-height: 1.5;
  color: rgba(240, 237, 232, 0.65);
  max-width: 500px;
  margin: 0 auto;
}

/* stats */
.stats-row {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.stat-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  min-width: 130px;
}

.stat-num {
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  font-weight: 700;
}

.stat-label {
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
}

/* insights side by side */
.insight-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.insight-box {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 1.2rem;
  text-align: left;
}

.insight-title {
  font-family: "Playfair Display", serif;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.insight-text {
  font-size: 0.82rem;
  line-height: 1.5;
  color: rgba(240, 237, 232, 0.55);
}

/* button */
.restart-btn {
  margin-top: auto;
  padding: 0.9rem 2.5rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: transparent;
  color: #f0ede8;
  font-family: "DM Sans", sans-serif;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.2s;
}

.restart-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.3);
}

/* mobile fallback */
@media (max-width: 768px) {
  .insight-container {
    grid-template-columns: 1fr;
  }
}
    /* ── POPUP MODAL ── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  backdrop-filter: blur(10px);
  background: rgba(5,5,10,0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-card {
  width: 90%;
  max-width: 520px;
  background: rgba(20,20,30,0.95);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 30px 80px rgba(0,0,0,0.6);
  animation: popupIn 0.35s ease;
}

@keyframes popupIn {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.modal-eyebrow {
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 0.5rem;
}

.modal-choice {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #f0ede8;
}

.modal-divider {
  height: 1px;
  background: rgba(255,255,255,0.08);
  margin: 1rem 0;
}

.modal-story {
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(240,237,232,0.75);
  min-height: 80px;
  text-align: left;
}

/* typing cursor */
.cursor {
  display: inline-block;
  margin-left: 2px;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
}

.modal-btn {
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.9rem;
  border-radius: 10px;
  border: none;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.modal-btn-rich {
  background: #d4a843;
  color: #1a1408;
}
.modal-btn-rich:hover { background: #e0b855; }

.modal-btn-poor {
  background: #4a7fd4;
  color: #05080f;
}
.modal-btn-poor:hover { background: #5a8fe4; }
`;

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Landing({ onSelect }) {
  return (
    <div className="landing page-enter">
      <div className="landing-bg" />
      {/* <div className="divider-line" /> */}
      <div className="landing-content">
        <p className="landing-eyebrow">An Interactive Experience on Inequality</p>
        <h1 className="landing-title">Two Lives,<br />One World</h1>
        <p className="landing-subtitle">Walk a mile in different shoes.</p>

        <div className="characters-row">
          <div className="character-card char-rich" onClick={() => onSelect("rich")}>
            <div className="character-visual">
              <span className="character-emoji">🎩</span>
              <span className="character-badge">The Rich</span>
            </div>
            <p className="character-name">Arjun Mehta</p>
            <p className="character-desc">Born into wealth. Every door is open.</p>
          </div>

          <div className="char-vs">vs</div>

          <div className="character-card char-poor" onClick={() => onSelect("poor")}>
            <div className="character-visual">
              <span className="character-emoji">🧢</span>
              <span className="character-badge">The Poor</span>
            </div>
            <p className="character-name">Raju Kumar</p>
            <p className="character-desc">Fighting every day. Fewer choices</p>
          </div>
        </div>

        <p className="select-prompt">↑ Choose a character to begin your journey ↑</p>
      </div>
    </div>
  );
}
function ChoicePopup({ choice, character, isLast, onContinue }) {
  const isRich = character === "rich";

  const fullText = choice.popup;
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayText("");
    setIndex(0);
    setDone(false);
  }, [choice]);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 20); // speed (lower = faster)

      return () => clearTimeout(timeout);
    } else {
      setDone(true);
    }
  }, [index, fullText]);

  return (
    <div className="modal-backdrop">
      <div className="modal-card"
      // onClick={() => {
      //   if (!done) {
      //     setDisplayText(fullText);
      //     setDone(true);
      //   }
      // }}
      >
        <p className="modal-eyebrow">You chose</p>
        <p className="modal-choice">"{choice.text}"</p>

        <div className="modal-divider" />

        {/* ✨ Typing text */}
        <p
          className="modal-story"
        // onClick={() => {
        //   if (!done) {
        //     setDisplayText(fullText); // instantly show full text
        //     setDone(true);            // unlock button immediately
        //   }
        // }}
        >
          {displayText}
          {!done && <span className="cursor">|</span>}
        </p>

        {done && (
          <button
            className={`modal-btn ${isRich ? "modal-btn-rich" : "modal-btn-poor"}`}
            onClick={(e) => {
              e.stopPropagation();
              onContinue();
            }}
          >
            {isLast ? "See Results →" : "Continue →"}
          </button>
        )}
      </div>
    </div>
  );
}
function ScenarioPage({ scenario, character, onNext, current, total }) {
  const [selected, setSelected] = useState(null);
  const isRich = character === "rich";
  const richColor = "#d4a843";
  const poorColor = "#4a7fd4";
  const color = isRich ? richColor : poorColor;
  const progress = (current / total) * 100;

  const myChoices = isRich ? scenario.richChoices : scenario.poorChoices;
  const lockedChoices = isRich ? [] : scenario.richChoices;

  return (
    <div className="scenario-page page-enter" style={{ background: "#07070f" }}>
      <div className="scenario-header">
        <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
          {isRich ? "🎩 Arjun" : "🧢 Raju"}
        </div>
        <div className="progress-bar-wrap">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%`, background: color }}
          />
        </div>
        <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>
          {current} / {total}
        </div>
      </div>

      <div className="scenario-body">
        {/* LEFT */}
        <div className="scenario-left">
          <div
            className="scenario-bg-blur"
            style={{
              background: `radial-gradient(ellipse at center, ${color}33 0%, transparent 70%)`,
            }}
          />
          <img src={scenario.image} alt="scenario" className="scenario-image" />
          <p className="scenario-number">Scenario {String(scenario.id).padStart(2, "0")}</p>
          <h2 className="scenario-title">{scenario.title}</h2>
          <p className="scenario-text">"{scenario.text}"</p>
        </div>

        {/* RIGHT */}
        <div className="scenario-right">
          <span className={`player-tag ${isRich ? "tag-rich" : "tag-poor"}`}>
            <span>{isRich ? "🎩" : "🧢"}</span>
            {isRich ? "Arjun's Choices" : "Raju's Choices"}
          </span>

          <p className="choices-label">Your available options</p>

          <div className={isRich ? "choice-rich" : "choice-poor"}>
            {myChoices.map((c, i) => (
              <button
                key={i}
                className={`choice-btn ${selected === i ? "selected" : ""}`}
                onClick={() => setSelected(i)}
              >
                <div className="choice-text">{c.text}</div>
                <div className="choice-impact">{c.impact}</div>
              </button>
            ))}
          </div>

          {!isRich && lockedChoices.length > 0 && (
            <div className="locked-zone">
              <div className="locked-label">
                <span>🔒</span>
                <span>Locked — requires wealth</span>
              </div>
              {lockedChoices.map((c, i) => (
                <div key={i} className="locked-item">{c.text}</div>
              ))}
            </div>
          )}

          <button
            className={`next-btn ${selected !== null ? "visible" : ""} ${isRich ? "next-rich" : "next-poor"}`}
            onClick={() => selected !== null && onNext(selected)}
          >
            {current < total ? "Continue →" : "See Your Results →"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Results({ character, choices, onRestart }) {
  const isRich = character === "rich";
  const color = isRich ? "#d4a843" : "#4a7fd4";
  const totalChoices = choices.length;

  const richMessage = `You played as Arjun — a man for whom the world bends. With ${totalChoices} decisions, you chose comfort, growth, and security at every turn. Life as Arjun means more options, better outcomes, and a safety net that never breaks. But ask yourself: was it skill, or a head start?`;
  const poorMessage = `You played as Raju — a man for whom every decision costs something. With ${totalChoices} decisions, you navigated a world that offers fewer roads and harder paths. Raju's story is not unique — it is the reality for billions. The question isn't why Raju struggles. It's why the world is built this way.`;

  return (
    <div className="results-page page-enter">
      <div className="results-bg" />
      <div className="results-content">
        <p className="results-eyebrow">Journey Complete</p>
        <h2 className="results-title" style={{ color }}>
          {isRich ? "A Life of Privilege" : "A Life of Resilience"}
        </h2>
        <p className="results-message">{isRich ? richMessage : poorMessage}</p>

        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-num" style={{ color }}>{totalChoices}</div>
            <div className="stat-label">Decisions Made</div>
          </div>
          <div className="stat-card">
            <div className="stat-num" style={{ color }}>{isRich ? "3 avg" : "2 avg"}</div>
            <div className="stat-label">Options Per Question</div>
          </div>
          <div className="stat-card">
            <div className="stat-num" style={{ color }}>{isRich ? "0" : totalChoices}</div>
            <div className="stat-label">Choices Locked</div>
          </div>
        </div>

        <div className="insight-box">
          <h3 className="insight-title">💡 The Lesson</h3>
          <p className="insight-text">
            In real life, wealth doesn't just buy things — it buys <em>choices</em>.
            The rich can choose their doctor, their neighbourhood, their school, their response to crisis.
            The poor often have only one path, or none at all.
            Equality isn't about giving everyone the same outcomes —
            it's about ensuring everyone has the same <em>options to begin with</em>.
          </p>
        </div>

        <div className="insight-box">
          <h3 className="insight-title">🌍 What Can Change?</h3>
          <p className="insight-text">
            Universal healthcare, quality public education, affordable housing, and legal aid
            are not luxuries — they are the tools that unlock choices for everyone.
            When we build systems that give Raju the same options as Arjun,
            we build a fairer world. This is what equality of opportunity looks like.
          </p>
        </div>

        <button className="restart-btn" onClick={onRestart}>
          ↩ Play as the Other Character
        </button>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
// export default function App() {
//   const [page, setPage] = useState("landing"); // landing | scenario | results
//   const [character, setCharacter] = useState(null);
//   const [scenarioIndex, setScenarioIndex] = useState(0);
//   const [choices, setChoices] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedChoice, setSelectedChoice] = useState(null);
//   // const [started, setStarted] = useState(false);
//   const resultAudioRef = useRef(null);
//   const audioRef = useRef(null);

//   const handleSelect = (char) => {
//     setCharacter(char);
//     setScenarioIndex(0);
//     setChoices([]);
//     setPage("scenario");
//   };
//   useEffect(() => {
//     if (page === "results" && resultAudioRef.current) {
//       resultAudioRef.current.currentTime = 0; // restart sound
//       resultAudioRef.current.play().catch(() => { });
//     }
//   }, [page]);
//   // const handleStart = () => {
//   //   setStarted(true);

//   //   if (audioRef.current) {
//   //     audioRef.current.play().catch(() => { });
//   //   }
//   // };
//   useEffect(() => {
//     const audio = audioRef.current;

//     const playAudio = () => {
//       audio.play().catch(() => { });
//     };

//     // required for browser autoplay policy
//     document.addEventListener("click", playAudio, { once: true });

//     return () => document.removeEventListener("click", playAudio);
//   }, []);

//   const handleNext = (choiceIdx) => {
//     const scenario = SCENARIOS[scenarioIndex];
//     const choiceList =
//       character === "rich" ? scenario.richChoices : scenario.poorChoices;

//     const choice = choiceList[choiceIdx];

//     setSelectedChoice(choice);
//     setShowPopup(true); // show popup instead of moving forward
//   };
//   const handleContinue = () => {
//     setChoices([...choices, selectedChoice]);
//     setShowPopup(false);

//     if (scenarioIndex + 1 < SCENARIOS.length) {
//       setScenarioIndex(scenarioIndex + 1);
//     } else {
//       setPage("results");
//     }
//   };

//   const handleRestart = () => {
//     setPage("landing");
//     setCharacter(null);
//     setChoices([]);
//     setScenarioIndex(0);
//   };

//   return (
//     <>
//       <style>{css}</style>
//       <div className="app">
//         {page === "landing" && <Landing onSelect={handleSelect} />}

//         {page === "scenario" && (
//           <ScenarioPage
//             key={scenarioIndex}
//             scenario={SCENARIOS[scenarioIndex]}
//             character={character}
//             onNext={handleNext}
//             current={scenarioIndex + 1}
//             total={SCENARIOS.length}
//           />
//         )}
//         {/* {!started && (
//           <div className="start-overlay" onClick={handleStart}>
//             <div className="start-content">
//               <p className="start-icon">🔊</p>
//               <h2>Tap to Start Experience</h2>
//               <p className="start-sub">Sound on for best experience</p>
//             </div>
//           </div>
//         )} */}
//         {page === "results" && (
//           <Results
//             character={character}
//             choices={choices}
//             onRestart={handleRestart}
//           />
//         )}
//         <audio ref={audioRef} loop>
//           <source src="/music/bg.mp3" type="audio/mpeg" />
//         </audio>
//         <audio ref={resultAudioRef}>
//           <source src="/music/end.mp3" type="audio/mpeg" />
//         </audio>
//         {/* 🔥 ADD THIS BLOCK */}
//         {showPopup && selectedChoice && (
//           <ChoicePopup
//             choice={selectedChoice}
//             character={character}
//             isLast={scenarioIndex === SCENARIOS.length - 1}
//             onContinue={handleContinue}
//           />
//         )}
//       </div>
//     </>
//   );
// }
export default function App() {
  const [page, setPage] = useState("landing"); // landing | scenario | results
  const [character, setCharacter] = useState(null);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [choices, setChoices] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);

  const audioRef = useRef(null);        // 🎵 background
  const resultAudioRef = useRef(null);  // 🎉 results sound

  // 🎮 Start game
  const handleSelect = (char) => {
    setCharacter(char);
    setScenarioIndex(0);
    setChoices([]);
    setPage("scenario");
  };

  // 🎵 Autoplay background music after first click (browser policy)
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => { });
      }
    };

    document.addEventListener("click", playAudio, { once: true });

    return () => document.removeEventListener("click", playAudio);
  }, []);

  // 🎉 Handle results audio + stop background
  useEffect(() => {
    if (page === "results") {
      // ⛔ stop background music
      if (audioRef.current) {
        audioRef.current.pause();
      }

      // ▶️ play result sound
      if (resultAudioRef.current) {
        resultAudioRef.current.currentTime = 0;
        resultAudioRef.current.play().catch(() => { });
      }
    }
  }, [page]);

  // ➡️ Next scenario (open popup)
  const handleNext = (choiceIdx) => {
    const scenario = SCENARIOS[scenarioIndex];
    const choiceList =
      character === "rich" ? scenario.richChoices : scenario.poorChoices;

    const choice = choiceList[choiceIdx];

    setSelectedChoice(choice);
    setShowPopup(true);
  };

  // ▶️ Continue after popup
  const handleContinue = () => {
    setChoices([...choices, selectedChoice]);
    setShowPopup(false);

    if (scenarioIndex + 1 < SCENARIOS.length) {
      setScenarioIndex(scenarioIndex + 1);
    } else {
      setPage("results");
    }
  };

  // 🔁 Restart game
  const handleRestart = () => {
    setPage("landing");
    setCharacter(null);
    setChoices([]);
    setScenarioIndex(0);

    // 🔊 restart background music
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => { });
    }

    // ⛔ stop result sound if still playing
    if (resultAudioRef.current) {
      resultAudioRef.current.pause();
    }
  };

  return (
    <>
      <style>{css}</style>

      <div className="app">
        {page === "landing" && (
          <Landing onSelect={handleSelect} />
        )}

        {page === "scenario" && (
          <ScenarioPage
            key={scenarioIndex}
            scenario={SCENARIOS[scenarioIndex]}
            character={character}
            onNext={handleNext}
            current={scenarioIndex + 1}
            total={SCENARIOS.length}
          />
        )}

        {page === "results" && (
          <Results
            character={character}
            choices={choices}
            onRestart={handleRestart}
          />
        )}

        {/* 💬 POPUP */}
        {showPopup && selectedChoice && (
          <ChoicePopup
            choice={selectedChoice}
            character={character}
            isLast={scenarioIndex === SCENARIOS.length - 1}
            onContinue={handleContinue}
          />
        )}

        {/* 🎵 BACKGROUND MUSIC */}
        <audio ref={audioRef} loop>
          <source src="/music/bg.mp3" type="audio/mpeg" />
        </audio>

        {/* 🎉 RESULTS SOUND */}
        <audio ref={resultAudioRef}>
          <source src="/music/end.mp3" type="audio/mpeg" />
        </audio>
      </div>
    </>
  );
}