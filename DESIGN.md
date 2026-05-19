# Design System: devBelts

## 1. Visual Theme & Atmosphere

DevBelts embodies a **cyberpunk-inspired terminal aesthetic** that marries the raw, utilitarian beauty of hacker culture with modern web design sensibilities. The interface evokes the feeling of sitting at a glowing CRT monitor in a dimly lit room, surrounded by cascading green text on dark screens.

The overall mood is **technical yet approachable**, creating an immersive developer experience that feels authentic to programming culture while remaining highly readable and functional. The design philosophy is "code-first clarity" — every element serves the content, with decorative effects used sparingly to reinforce the terminal theme without sacrificing usability.

**Key Characteristics:**
- Terminal-inspired color palette with phosphor green as the primary accent
- Subtle glitch effects on headings that evoke digital signal interference
- Monospace typography for code elements, highly legible sans-serif for body text
- Dark mode as the default experience, with light mode as an alternative
- Minimal UI chrome — content takes center stage
- Retro-futuristic aesthetic without compromising modern accessibility

## 2. Color Palette & Roles

### Dark Mode (Default)

#### Primary Foundation
- **Void Black** (#0A0A0A) – Primary background color. Deep, near-pure black that creates maximum contrast and evokes the darkness of a terminal window.
- **Terminal Dark Gray** (#1A1A1A) – Secondary surface color for cards, code blocks, and elevated content areas. Provides subtle layering without breaking the dark immersion.
- **Phosphor Green** (#00FF41) – The signature accent color. Used for primary CTAs, active states, belt level indicators, and interactive highlights. This is the iconic terminal green that defines the aesthetic.
- **Dim Green** (#00CC33) – Secondary green for hover states, subtle borders, and secondary interactive elements. Less intense than the primary phosphor, used where full brightness would be overwhelming.

#### Typography & Text Hierarchy
- **Terminal White** (#E0E0E0) – Primary text color for body copy and headings. Soft enough to prevent eye strain during long reading sessions, bright enough for excellent contrast.
- **Ghost Gray** (#888888) – Secondary text for metadata, timestamps, and supporting information. Recedes visually while remaining readable.
- **Faint Green** (#00FF41 with 60% opacity) – Tertiary text for decorative elements, terminal prompts, and system-like labels.

#### Functional States
- **Error Red** (#FF3333) – Error states, broken links, validation failures. Bright enough to demand attention in the dark theme.
- **Warning Amber** (#FFB800) – Warnings, deprecated content, belt level prerequisites.
- **Info Cyan** (#00FFFF) – Informational callouts, tips, and helpful hints.
- **Success Green** (#00FF41) – Completion states, achievements, belt progression indicators.

### Light Mode

#### Primary Foundation
- **Paper White** (#FAFAFA) – Primary background. Clean, bright canvas that maintains readability.
- **Soft Gray** (#F0F0F0) – Secondary surface color for cards and content areas.
- **Forest Green** (#00802B) – Primary accent for light mode. Darker, more saturated green that maintains the terminal identity while being appropriate for bright backgrounds.
- **Moss Green** (#006622) – Secondary green for hover states and borders in light mode.

#### Typography & Text Hierarchy
- **Ink Black** (#1A1A1A) – Primary text color. High contrast for readability.
- **Slate Gray** (#555555) – Secondary text for metadata and supporting content.
- **Terminal Green** (#00802B with 70% opacity) – Decorative elements and terminal-style labels.

#### Functional States
- **Error Red** (#CC0000) – Error states adapted for light backgrounds.
- **Warning Amber** (#CC9900) – Warnings visible on light backgrounds.
- **Info Blue** (#0066CC) – Informational elements in light mode.
- **Success Green** (#00802B) – Completion and achievement indicators.

## 3. Typography Rules

### Font Families

**Primary Font (Body & UI):** Source Sans 3  
**Character:** Clean, highly legible sans-serif with excellent readability. Open counters and generous x-height make it ideal for extended reading sessions in both dark and light modes.

**Monospace Font (Code & Terminal Elements):** JetBrains Mono  
**Character:** Programming-optimized monospace with ligatures, excellent character distinction, and a technical aesthetic that reinforces the terminal theme.

### Hierarchy & Weights (Dark Mode)

- **H1 (Page Titles):** JetBrains Mono, bold (700), 2.5-3rem, with subtle glitch effect. Letter-spacing: -0.02em. Used for page headers and major section titles.
- **H2 (Section Headers):** JetBrains Mono, semi-bold (600), 1.75-2rem, with minimal glitch effect. Letter-spacing: -0.01em. Belt level headers and major content divisions.
- **H3 (Subsection Headers):** Source Sans 3, semi-bold (600), 1.25-1.5rem, no glitch effect. Guide titles and subsection breaks.
- **H4 (Minor Headers):** Source Sans 3, medium (500), 1.125rem, no glitch effect. Sub-subsections and component headers.
- **Body Text:** Source Sans 3, regular (400), 1rem, line-height: 1.7. Optimized for extended reading comfort.
- **Code Inline:** JetBrains Mono, regular (400), 0.9em, with subtle background highlight.
- **Code Blocks:** JetBrains Mono, regular (400), 0.875rem, line-height: 1.6, with syntax highlighting.
- **Meta/Labels:** JetBrains Mono, regular (400), 0.75rem, uppercase, letter-spacing: 0.1em. Belt badges, tags, timestamps.

### Glitch Effect Specifications

- **Application:** Only on H1 and H2 elements using JetBrains Mono
- **Intensity:** Subtle — should be noticeable but not distracting
- **Implementation:** CSS text-shadow with multiple layers, slight horizontal offset, color split (red/cyan channels)
- **Animation:** Optional slow pulse (3-5 second cycle) for H1, static for H2
- **Respect Preferences:** Disabled when `prefers-reduced-motion` is active

### Light Mode Adjustments

- All font families remain the same
- Weights and sizes unchanged
- Glitch effects use darker color splits for visibility on light backgrounds
- Code blocks use light theme syntax highlighting

## 4. Component Stylings

### Buttons

- **Shape:** Sharp, squared-off edges (0px border-radius) — terminal-authentic, no softness
- **Primary CTA:** Phosphor Green (#00FF41) background with Void Black (#0A0A0A) text, bold weight. Padding: 0.75rem vertical, 1.5rem horizontal.
- **Hover State:** Background shifts to Dim Green (#00CC33), subtle glow effect (`box-shadow: 0 0 8px rgba(0, 255, 65, 0.4)`).
- **Focus State:** Outer glow in Phosphor Green with 2px offset for keyboard navigation.
- **Secondary CTA:** Transparent background with Phosphor Green border (1px), Phosphor Green text. Hover fills with 10% Phosphor Green background.
- **Disabled State:** Ghost Gray (#888888) text and border, no interaction.

### Cards & Containers (Guide Cards, Belt Cards)

- **Corner Style:** Sharp edges (0px border-radius) or minimally rounded (2px) — terminal-authentic
- **Background:** Terminal Dark Gray (#1A1A1A) in dark mode, Soft Gray (#F0F0F0) in light mode
- **Border:** 1px solid Dim Green (#00CC33) in dark mode, Moss Green (#006622) in light mode
- **Shadow:** None by default. On hover, subtle green glow (`box-shadow: 0 0 12px rgba(0, 255, 65, 0.15)`)
- **Padding:** 1.5rem internal spacing
- **Hover Behavior:** Border brightens to Phosphor Green, subtle lift effect (translateY -2px)

### Navigation

- **Style:** Horizontal layout with terminal-style breadcrumbs or minimal links
- **Typography:** JetBrains Mono, regular weight (400), 0.875rem
- **Default State:** Terminal White (#E0E0E0) text
- **Active State:** Phosphor Green (#00FF41) text with subtle underline
- **Hover State:** Dim Green (#00CC33) with smooth 200ms transition
- **Active Indicator:** Left border (2px) in Phosphor Green for sidebar nav, underline for horizontal
- **Mobile:** Collapses to hamburger menu with slide-in drawer, terminal-style prompt prefix (`>`)

### Code Blocks

- **Background:** Slightly darker than card background (#111111 in dark mode, #E8E8E8 in light mode)
- **Border:** 1px solid Dim Green (#00CC33)
- **Corner Style:** Sharp edges (0px border-radius)
- **Padding:** 1rem internal spacing
- **Header:** Terminal-style title bar with filename, copy button, and window controls (decorative dots)
- **Syntax Highlighting:** Custom theme using palette colors — keywords in Phosphor Green, strings in Warning Amber, comments in Ghost Gray, functions in Info Cyan

### Belt Badges & Progress Indicators

- **Shape:** Rectangular with sharp corners, terminal-authentic
- **Background:** Belt color with 20% opacity
- **Border:** 1px solid belt color at full opacity
- **Text:** Belt color, JetBrains Mono, uppercase, letter-spacing: 0.1em
- **Progress Bar:** Sharp rectangle, filled portion in belt color, unfilled in Ghost Gray

### Inputs & Forms

- **Background:** Void Black (#0A0A0A) with 1px Dim Green border
- **Corner Style:** Sharp edges (0px border-radius)
- **Focus State:** Border shifts to Phosphor Green with subtle glow
- **Padding:** 0.75rem vertical, 1rem horizontal
- **Placeholder:** Ghost Gray (#888888), JetBrains Mono
- **Label:** Terminal White (#E0E0E0), JetBrains Mono, 0.875rem, with terminal prompt prefix (`> `)

### Markdown Content Area

- **Background:** Terminal Dark Gray (#1A1A1A) — slightly elevated from page background
- **Border:** None — clean, distraction-free reading
- **Padding:** 2rem internal spacing for comfortable reading
- **Max Width:** 75ch (characters) for optimal reading line length
- **Line Height:** 1.7 for body text, 1.5 for code
- **Paragraph Spacing:** 1.5rem between paragraphs
- **List Spacing:** 0.5rem between items, 1rem before/after lists
- **Blockquote:** Left border (3px) in Phosphor Green, italic text, Ghost Gray color
- **Links:** Phosphor Green text, underline on hover, smooth transition
- **Images:** Full width within content area, subtle border in Dim Green, caption in Ghost Gray below

## 5. Layout Principles

### Grid & Structure

- **Max Content Width:** 1200px for optimal readability and visual balance
- **Grid System:** CSS Grid with 12 columns, fluid gutters (16px mobile, 24px desktop)
- **Content Area:** Centered with generous side margins on large screens
- **Sidebar (if used):** 280px fixed width for navigation, collapsible on mobile
- **Breakpoints:**
  - Mobile: <640px
  - Tablet: 640-1024px
  - Desktop: 1024-1200px
  - Large Desktop: >1200px

### Whitespace Strategy

- **Base Unit:** 8px for micro-spacing, 16px for component spacing
- **Vertical Rhythm:** 1.5rem (24px) base unit between related elements
- **Section Margins:** 3-4rem between major sections
- **Edge Padding:** 1rem mobile, 2rem tablet, 3rem desktop
- **Content Padding:** Generous internal spacing within markdown content (2rem+)

### Alignment & Visual Balance

- **Text Alignment:** Left-aligned for all body content and navigation (optimal readability)
- **Centered Elements:** Hero sections, page titles, and major CTAs
- **Code Alignment:** Left-aligned with consistent indentation
- **Visual Weight:** Heavy use of negative space to create focus on content
- **Reading Flow:** Clear top-to-bottom progression with intentional focal points

### Responsive Behavior

- **Mobile-First Foundation:** Core experience designed for smallest screens first
- **Progressive Enhancement:** Additional layout features added at larger breakpoints
- **Touch Targets:** Minimum 44x44px for all interactive elements
- **Collapsing Strategy:** Navigation collapses to hamburger, grid reduces columns, padding scales proportionally
- **Code Blocks:** Horizontal scroll on mobile, full width on desktop

### Dark/Light Mode Toggle

- **Location:** Top-right corner of navigation, terminal-style toggle switch
- **Default:** Dark mode (respects `prefers-color-scheme`)
- **Transition:** Smooth 300ms color transition when switching modes
- **Persistence:** User preference stored in localStorage
- **Indicator:** Sun/moon icons rendered in terminal style (ASCII or minimal SVG)

## 6. Special Effects & Animations

### Glitch Effect (H1, H2)

```css
.glitch {
  position: relative;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.glitch::before {
  left: 2px;
  text-shadow: -2px 0 var(--glitch-before-shadow);
  clip: rect(24px, 550px, 90px, 0);
  animation: glitch-anim 3s infinite linear alternate-reverse;
}

.glitch::after {
  left: -2px;
  text-shadow: 2px 0 var(--glitch-after-shadow);
  clip: rect(85px, 550px, 140px, 0);
  animation: glitch-anim2 2.5s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
  0% { clip: rect(42px, 9999px, 44px, 0); }
  5% { clip: rect(12px, 9999px, 59px, 0); }
  10% { clip: rect(48px, 9999px, 29px, 0); }
  15% { clip: rect(42px, 9999px, 73px, 0); }
  20% { clip: rect(63px, 9999px, 27px, 0); }
  25% { clip: rect(34px, 9999px, 55px, 0); }
  30% { clip: rect(85px, 9999px, 54px, 0); }
  35% { clip: rect(20px, 9999px, 27px, 0); }
  40% { clip: rect(63px, 9999px, 47px, 0); }
  45% { clip: rect(25px, 9999px, 75px, 0); }
  50% { clip: rect(60px, 9999px, 29px, 0); }
  55% { clip: rect(15px, 9999px, 77px, 0); }
  60% { clip: rect(55px, 9999px, 44px, 0); }
  65% { clip: rect(82px, 9999px, 30px, 0); }
  70% { clip: rect(34px, 9999px, 61px, 0); }
  75% { clip: rect(66px, 9999px, 19px, 0); }
  80% { clip: rect(75px, 9999px, 59px, 0); }
  85% { clip: rect(40px, 9999px, 25px, 0); }
  90% { clip: rect(62px, 9999px, 48px, 0); }
  95% { clip: rect(10px, 9999px, 85px, 0); }
  100% { clip: rect(54px, 9999px, 24px, 0); }
}

@keyframes glitch-anim2 {
  0% { clip: rect(65px, 9999px, 99px, 0); }
  5% { clip: rect(52px, 9999px, 20px, 0); }
  10% { clip: rect(79px, 9999px, 15px, 0); }
  15% { clip: rect(75px, 9999px, 89px, 0); }
  20% { clip: rect(28px, 9999px, 39px, 0); }
  25% { clip: rect(100px, 9999px, 51px, 0); }
  30% { clip: rect(39px, 9999px, 99px, 0); }
  35% { clip: rect(49px, 9999px, 59px, 0); }
  40% { clip: rect(99px, 9999px, 39px, 0); }
  45% { clip: rect(79px, 9999px, 20px, 0); }
  50% { clip: rect(69px, 9999px, 12px, 0); }
  55% { clip: rect(79px, 9999px, 39px, 0); }
  60% { clip: rect(20px, 9999px, 79px, 0); }
  65% { clip: rect(49px, 9999px, 99px, 0); }
  70% { clip: rect(19px, 9999px, 59px, 0); }
  75% { clip: rect(79px, 9999px, 39px, 0); }
  80% { clip: rect(49px, 9999px, 29px, 0); }
  85% { clip: rect(20px, 9999px, 59px, 0); }
  90% { clip: rect(79px, 9999px, 99px, 0); }
  95% { clip: rect(10px, 9999px, 39px, 0); }
  100% { clip: rect(39px, 9999px, 79px, 0); }
}
```

### Scanline Effect (Optional Background)

```css
.scanlines::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0) 50%,
    rgba(0, 0, 0, 0.03) 50%,
    rgba(0, 0, 0, 0.03)
  );
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 50;
}
```

### Terminal Cursor Blink

```css
.cursor-blink::after {
  content: '█';
  animation: blink 1s step-end infinite;
  color: var(--cursor-color);
  margin-left: 2px;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
```

### Accessibility Considerations

- All animations respect `prefers-reduced-motion`
- Glitch effects disabled when reduced motion is preferred
- Color contrast meets WCAG AA standards in both modes
- Focus indicators visible and clear
- Semantic HTML structure throughout

## 7. Tailwind CSS Configuration Notes

### Custom Colors (tailwind.config.ts)

The theme uses CSS custom properties for seamless dark/light mode switching. Tailwind classes reference these variables:

```typescript
colors: {
  terminal: {
    black: 'var(--bg-primary)',
    dark: 'var(--bg-secondary)',
    darker: 'var(--bg-tertiary)',
    green: 'var(--accent-primary)',
    dim: 'var(--accent-secondary)',
    white: 'var(--text-primary)',
    gray: 'var(--text-secondary)',
    error: 'var(--color-error)',
    warning: 'var(--color-warning)',
    info: 'var(--color-info)',
  },
}
```

CSS variables are defined in `:root` (dark mode default) and `html:not(.dark)` (light mode):

```css
:root, .dark {
  --bg-primary: #0A0A0A;
  --bg-secondary: #1A1A1A;
  --bg-tertiary: #111111;
  --accent-primary: #00FF41;
  --accent-secondary: #00CC33;
  --text-primary: #E0E0E0;
  --text-secondary: #888888;
  --color-error: #FF3333;
  --color-warning: #FFB800;
  --color-info: #00FFFF;
}

html:not(.dark) {
  --bg-primary: #FAFAFA;
  --bg-secondary: #F0F0F0;
  --bg-tertiary: #E8E8E8;
  --accent-primary: #00802B;
  --accent-secondary: #006622;
  --text-primary: #1A1A1A;
  --text-secondary: #555555;
  --color-error: #CC0000;
  --color-warning: #CC9900;
  --color-info: #0066CC;
}
```

### Custom Font Families

```typescript
fontFamily: {
  sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
  mono: ['"JetBrains Mono"', 'monospace'],
}
```

### Custom Utilities

```typescript
utilities: {
  '.glitch': { /* glitch effect styles */ },
  '.scanlines': { /* scanline effect styles */ },
  '.cursor-blink': { /* cursor blink styles */ },
  '.terminal-border': { /* green border effect */ },
  '.terminal-glow': { /* green glow effect */ },
}
```

## 8. Design System Notes for Implementation

### Language to Use

- **Atmosphere:** "Terminal-inspired hacker aesthetic with modern readability"
- **Branding:** "devBelts" (lowercase d, capital B) — project name only
- **Button Shapes:** "Sharp, squared-off edges" (not "rounded" or "rounded-md")
- **Effects:** "Subtle glitch animation on headings" (not "text animation")
- **Spacing:** "Generous content padding" and "terminal-authentic margins"

### Color References

Always use the descriptive names with hex codes:
- Primary accent: "Phosphor Green (#00FF41)"
- Dark backgrounds: "Void Black (#0A0A0A)" or "Terminal Dark Gray (#1A1A1A)"
- Text: "Terminal White (#E0E0E0)" or "Ghost Gray (#888888)"

### Component Prompts

- "Create a guide card with sharp corners, terminal dark gray background, and dim green border"
- "Design a primary CTA button in Phosphor Green (#00FF41) with sharp edges and void black text"
- "Add a navigation link using JetBrains Mono with phosphor green active state"
- "Style a code block with terminal-style title bar and custom syntax highlighting"
- "Use Source Sans 3 for body text and headings, JetBrains Mono for code and terminal elements"

### Markdown Readability Priority

The markdown content area must prioritize readability above all aesthetic effects:
- No glitch effects within content
- Clean, distraction-free layout
- Optimal line length (75ch max)
- Generous line height and paragraph spacing
- Clear typographic hierarchy
- High contrast text
