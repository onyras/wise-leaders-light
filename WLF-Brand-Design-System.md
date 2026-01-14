# Wise Leaders Fellowship — Brand & Design System

## Overview

The Wise Leaders Fellowship is a nine-month leadership transformation program for founder CEOs with 20+ employees and €2M+ ARR who have "outgrown standard advice." The Fellowship represents a counter-narrative to traditional CEO peer groups, emphasizing inner development work through contemplative practices, silent retreats, and comprehensive stress diagnostics rather than tactical problem-solving.

**Core positioning:** "Creating reflection spaces for people in responsibility."

**Target audience:** Founder CEOs feeling alone, overwhelmed, and seeking clarity, trusted partnership, and growth — not more advice.

---

## Brand Personality

### Voice
- **Wise** — grounded, experienced, not preachy
- **Playful** — light touch, human, never stiff
- **Compassionate** — warm, understanding, never clinical

### Tone Blend
- Joe Hudson (depth, directness)
- David Whyte (poetic resonance)
- Sahil Bloom (clarity, accessibility)

### What We Avoid
- AI clichés ("unleash," "unlock," "supercharge")
- Salesy/guru language
- Corporate jargon
- Em dashes (—) — use commas, colons, semicolons instead
- Hype-driven or manipulative copy
- Generic leadership platitudes

### What We Embrace
- Clear, kind, timeless language
- Harvard/MIT rigor meets philosophy and Buddhist thought
- Specific, concrete language over abstract claims
- Questions that provoke reflection
- Honesty about the difficulty of leadership

---

## Color Palette

### Primary Colors
| Name | Hex | Usage |
|------|-----|-------|
| Black | `#0a0a0a` | Dark backgrounds, primary text on light |
| White | `#FFFFFF` | Light text on dark, cards |
| Off-White/Cream | `#F7F3ED` | Light section backgrounds |
| Card Background | `#EFEBE5` | Subtle card backgrounds on light |

### Accent Colors
| Name | Hex | Usage |
|------|-----|-------|
| Blue | `#7FABC8` | Primary accent, CTAs, "measured" elements, Labs |
| Green | `#A6BEA4` | Foundation, nature, grounding, beginnings |
| Orange | `#E08F6A` | Warmth, transformation, outcomes, Biofeedback |

### Color Associations
- **Green** = Foundation Retreat, roots, starting point, nature
- **Blue** = Expert Labs, learning, measurement, science, clarity
- **Orange** = Biofeedback, outcomes, transformation, warmth

### Opacity Guidelines (Dark Mode)
- Primary text: `rgba(255, 255, 255, 1)`
- Secondary text: `rgba(255, 255, 255, 0.6)`
- Tertiary/labels: `rgba(255, 255, 255, 0.5)`
- Subtle lines/borders: `rgba(255, 255, 255, 0.06-0.15)`

### Opacity Guidelines (Light Mode)
- Primary text: `#0a0a0a` or `var(--color-black)`
- Secondary text: `#666`
- Tertiary/labels: `#888` or `#999`
- Subtle borders: `rgba(0, 0, 0, 0.06)`

---

## Typography

### Font Families
| Role | Font | Fallback |
|------|------|----------|
| Serif (Headlines) | Crimson Pro | Georgia, serif |
| Sans-serif (Body) | DM Sans | system-ui, sans-serif |

### Type Scale
| Element | Font | Size | Weight | Notes |
|---------|------|------|--------|-------|
| Hero Headline | Crimson Pro | 68px | 400 | Line-height: 1.08, Letter-spacing: -0.025em |
| Section Headline | Crimson Pro | 48-56px | 400 | Line-height: 1.15, Letter-spacing: -0.02em |
| Card Title | Crimson Pro | 22-24px | 400 | |
| Body Text | DM Sans | 17-18px | 400 | Line-height: 1.7-1.75 |
| Labels/Tags | DM Sans | 11-12px | 500 | Uppercase, Letter-spacing: 0.1-0.15em |
| Small Text | DM Sans | 14-15px | 400-500 | |

### Emphasis Pattern
- Italicized words in headlines use `<em>` tags
- Italic words are colored with brand accent (usually blue, sometimes orange)
- Creates visual rhythm: "Clarity you can *measure*. Growth you can *feel*."

---

## Visual Style

### Overall Aesthetic
- **Modern and sleek** — clean lines, generous whitespace
- **Warm sophistication** — not cold corporate, not casual startup
- **Contemplative** — breathing room, unhurried feel
- **Data-meets-soul** — scientific rigor with human warmth

### Design Principles
1. **Soft, not sharp** — rounded corners (16-24px), subtle shadows
2. **Fine lines** — 0.75px to 1.5px strokes for illustrations
3. **Low contrast animations** — gentle, breathing movements
4. **Generous spacing** — sections breathe, content doesn't crowd
5. **Intentional restraint** — fewer elements, more impact

### Dark vs Light Sections
The website alternates between dark (#0a0a0a) and light (#F7F3ED) sections to create rhythm and visual interest.

**Dark sections:** Hero, Structure (with rings), Phase heroes, Diagnostics
**Light sections:** Stats, Logo cloud, Journey, Manifesto, Video, Testimonials, Pillars

---

## Illustration Style

### Animated Illustrations
We use custom SVG illustrations with subtle CSS animations rather than stock graphics or complex imagery.

**Characteristics:**
- Fine lines (0.75-1.5px stroke width)
- Brand colors with reduced opacity (0.3-0.7)
- Geometric/abstract forms
- Breathing/pulsing animations (6-8s duration)
- No harsh movements — everything is gentle

### Examples from the site:

**Radar Chart (Hero)**
- Concentric circles as grid
- Data visualization showing transformation (before/after)
- Blue points with soft glow
- Orange fill for "before" state

**Growth Rings (Structure)**
- Concentric circles expanding outward
- Green center (Foundation) → Blue middle (Labs) → Orange outer (Biofeedback)
- White dots for coaching touchpoints
- Subtle radial grid lines
- Gentle pulse animation

**Pillar Illustrations**
- Stillness: Green rippling circles
- Science: Blue pulsing bar chart
- Allies: Orange connected nodes

### Animation Guidelines
- Duration: 3-8 seconds for loops
- Easing: ease-in-out
- Movement: scale (1.01-1.05), opacity shifts, subtle translations
- Never jarring or attention-grabbing
- Should feel like the element is "breathing"

---

## Photography Direction

### General Principles
- Authentic over polished
- Atmospheric over literal
- Intimate over grand
- Warm color grading
- Natural light preferred

### By Section/Phase

**Phase 1: Foundation Retreat**
- Nature imagery: forests, mountains, mist
- Contemplative spaces
- Silence, solitude
- Dawn/dusk lighting

**Phase 2: Expert Labs**
- NOT corporate offices or modern workspaces
- Intellectual settings: libraries, historic lecture halls, intimate salons
- Warm, old-world academic feel
- Hands with notebooks, not faces
- Sophisticated without sterility

**Phase 3: Coaching**
- Intimate conversation settings
- Two people, connection
- Warm, personal

**Phase 4: Biofeedback**
- Clean, scientific (but warm)
- Data visualization contexts
- Performance/clarity imagery

### What to Avoid
- Stock photo feel (forced smiles, staged handshakes)
- Cold corporate environments
- Overly polished/artificial lighting
- Generic "success" imagery (mountaintops with arms raised, etc.)
- Tech startup aesthetics (ping pong tables, open offices)

---

## UI Components

### Buttons
```css
/* Primary CTA */
background: var(--color-blue);
color: white;
padding: 18px 36px;
border-radius: 50px;
font-size: 15px;
font-weight: 500;

/* Secondary CTA */
background: transparent;
border: 1px solid #ccc (light) or rgba(255,255,255,0.2) (dark);
color: #333 (light) or white (dark);
```

### Cards
```css
/* Light mode */
background: white;
border: 1px solid rgba(0, 0, 0, 0.06);
border-radius: 20px;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);

/* Dark mode */
background: rgba(255, 255, 255, 0.03);
border: 1px solid rgba(255, 255, 255, 0.06);
border-radius: 20px;
```

### Labels/Tags
```css
font-size: 11-12px;
font-weight: 500;
text-transform: uppercase;
letter-spacing: 0.1-0.15em;
/* Often accompanied by a colored dot (8px circle) */
```

### Navigation
- Floating pill-style nav
- Frosted glass effect (backdrop-filter: blur)
- Centered, max-width ~680px
- Rounded (border-radius: 50px)

---

## Messaging Framework

### Core Message
"You don't need more advice. You need space to think."

### Key Differentiators
1. **Measured transformation** — biometric diagnostics, not just feelings
2. **Exclusive peer matching** — hand-selected Wisdom Councils
3. **Transformative experiences** — silent retreat, not another conference

### Headline Patterns
- Contrast structure: "Not X. Y."
- Rhythm of three: "Clarity. Connection. Growth."
- Italicized emphasis on key transformation words
- Questions that provoke: "What would change if you finally had space to think?"

### Proof Points
- Specific numbers when possible (54 Body Reserve score, 9 months, 5 days)
- Named testimonials with real titles
- Partner credibility (Be-Sapiens, locations like Schloss Elmau)

---

## Section Patterns

### Standard Section Header
```html
<div class="section__label">
    <span class="section__label-dot"></span> <!-- 8px colored circle -->
    <span class="section__label-text">LABEL TEXT</span>
</div>
<h2 class="section__headline">Main headline with <em>emphasis</em></h2>
<p class="section__subheadline">Supporting text that expands on the headline.</p>
```

### Light Mode (cream background)
| Element | Font | Color |
|---------|------|-------|
| Tagline | DM Sans, uppercase, letter-spacing 0.15em | muted gray (#888) + **colored dot** |
| Headline | Crimson Pro, 48-56px | #0a0a0a, emphasis word in **#7FABC8** (blue) italic |
| Subheadline | DM Sans, 17-18px | muted gray (#666) |

- Dot appears before tagline (same as dark mode)

### Dark Mode (black background)
| Element | Font | Color |
|---------|------|-------|
| Tagline | DM Sans, uppercase, letter-spacing 0.15em | muted (rgba 255,255,255,0.5) + **colored dot** |
| Headline | Crimson Pro, 48-56px | white/cream, emphasis in accent color italic |
| Subheadline | DM Sans, 17-18px | muted (rgba 255,255,255,0.6) |

- Dot appears before tagline, color matches emphasis
- **Orange accent (#E08F6A):** transformation, performance, structure, action
- **Blue accent (#7FABC8):** expertise, learning, sessions, measurement

### Flexibility
- Emphasis can be a single word OR an entire line
- Dot color always matches the emphasis color
- Choose accent based on section meaning, not arbitrary

### Content Rhythm
1. Label (small, uppercase, with colored dot)
2. Headline (large serif, with italic accent)
3. Subheadline (body text, explains/supports)
4. Content (cards, features, imagery)
5. CTA (when appropriate)

---

## Program Structure Visual

The fellowship flows through four phases, represented visually as growth rings expanding outward:

**Center (Green):** Foundation Retreat
- 5 days
- Silent retreat
- Meet your cohort
- Late summer

**Middle (Blue):** Expert Labs
- 7 months
- Monthly deep-dives
- Strategy, culture, resilience, presence
- September–March

**Throughout (White dots):** One-on-One Coaching
- Monthly sessions
- Personal executive coach
- Integrated support

**Outer (Orange):** Biofeedback Seminar
- 2 days
- Performance retreat
- Measurement & integration
- Spring

---

## File Naming & Organization

When creating assets, use this naming convention:
- `wlf-[section]-[variant].png`
- `wlf-icon-[name].svg`
- `wlf-photo-[context].jpg`

Examples:
- `wlf-hero-radar.svg`
- `wlf-structure-rings.svg`
- `wlf-photo-retreat-forest.jpg`
- `wlf-icon-coaching.svg`

---

## Quick Reference

### Colors (copy-paste)
```
Black: #0a0a0a
White: #FFFFFF
Cream: #F7F3ED
Blue: #7FABC8
Green: #A6BEA4
Orange: #E08F6A
```

### Fonts (copy-paste)
```
Crimson Pro (serif) - headlines
DM Sans (sans-serif) - body
```

### Key Phrases
- "For founder CEOs who have outgrown standard advice"
- "Clarity you can measure. Growth you can feel. Peers who tell you the truth."
- "You don't need more advice. You need space to think."
- "Creating reflection spaces for people in responsibility"
- "The inner and outer work of leadership"

---

*Document version: December 2024*
*For: Wise Leaders Fellowship website and marketing materials*
