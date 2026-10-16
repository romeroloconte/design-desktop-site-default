import type { Project, Media } from './types';

const img = (alt: string): Media => ({ alt });

const NAV = [
  { label: 'Overview', anchorId: 'overview' },
  { label: 'Research', anchorId: 'research' },
  { label: 'Design', anchorId: 'design' },
  { label: 'Impact', anchorId: 'impact' },
];

function fullCase(
  id: string,
  title: string,
  category: string,
  theme: Project['theme'],
): Project {
  return {
    id,
    title,
    category,
    windowTitle: `${title} — ${category}`,
    theme,
    nav: NAV,
    sections: [
      {
        type: 'hero',
        anchor: 'overview',
        eyebrow: `[TODO] ${category}`,
        title: `[TODO] Headline\nfor ${title}`,
        lead: '[TODO] One-paragraph summary of the problem, the approach and the result.',
        tags: ['[TODO] Tag', '[TODO] Tag', '[TODO] Tag'],
        media: img(`[TODO] Hero visual of ${title}`),
      },
      {
        type: 'intro',
        index: '01',
        label: 'Context',
        heading: '[TODO] What was the brief?',
        body: '[TODO] Describe the company, the product and the challenge.',
        meta: [
          { label: 'ROLE', value: '[TODO]' },
          { label: 'SCOPE', value: '[TODO]' },
          { label: 'TEAM', value: '[TODO]' },
          { label: 'TIMELINE', value: '[TODO]' },
        ],
      },
      {
        type: 'numberedList',
        index: '02',
        label: 'Problem',
        heading: '[TODO] What was broken',
        body: '[TODO] Short intro to the problem list.',
        items: ['[TODO] Problem one', '[TODO] Problem two', '[TODO] Problem three'],
        inverted: true,
      },
      {
        type: 'process',
        anchor: 'research',
        index: '03',
        label: 'Process',
        heading: '[TODO] How we got there',
        body: '[TODO] Overview of the process.',
        steps: [
          { n: '1', title: '[TODO] Discover', desc: '[TODO] Description' },
          { n: '2', title: '[TODO] Define', desc: '[TODO] Description' },
          { n: '3', title: '[TODO] Design', desc: '[TODO] Description' },
          { n: '4', title: '[TODO] Deliver', desc: '[TODO] Description' },
        ],
      },
      {
        type: 'evidence',
        index: '04',
        label: 'Evidence',
        heading: '[TODO] What research told us',
        body: '[TODO] Key findings.',
        bullets: ['[TODO] Insight', '[TODO] Insight', '[TODO] Insight'],
        media: [img('[TODO] Research artefact one'), img('[TODO] Research artefact two')],
      },
      {
        type: 'decisionGrid',
        anchor: 'design',
        articles: [
          { index: '05', label: 'Decision', heading: '[TODO] Decision A', body: '[TODO] Rationale', media: img('[TODO] Decision A visual') },
          { index: '06', label: 'Decision', heading: '[TODO] Decision B', body: '[TODO] Rationale', media: img('[TODO] Decision B visual') },
        ],
      },
      {
        type: 'solution',
        index: '07',
        label: 'Solution',
        heading: '[TODO] The final design',
        body: '[TODO] Overview of the solution.',
        features: [
          { n: '1', title: '[TODO] Feature one', desc: '[TODO] Description', screens: [img('[TODO] Screen 1a'), img('[TODO] Screen 1b')] },
          { n: '2', title: '[TODO] Feature two', desc: '[TODO] Description', screens: [img('[TODO] Screen 2a')] },
          { n: '3', title: '[TODO] Feature three', desc: '[TODO] Description', screens: [img('[TODO] Screen 3a')] },
        ],
      },
      {
        type: 'outcomes',
        anchor: 'impact',
        index: '08',
        label: 'Impact',
        heading: '[TODO] Results',
        metrics: [
          { value: '[TODO]', label: 'Metric one' },
          { value: '[TODO]', label: 'Metric two' },
          { value: '[TODO]', label: 'Metric three' },
        ],
        learnings: ['[TODO] Learning one', '[TODO] Learning two'],
      },
    ],
  };
}

function stubCase(id: string, title: string, category: string): Project {
  return {
    id,
    title,
    category,
    windowTitle: `${title} — ${category}`,
    theme: 'light',
    nav: [{ label: 'Overview', anchorId: 'overview' }],
    sections: [
      {
        type: 'hero',
        anchor: 'overview',
        eyebrow: `[TODO] ${category}`,
        title: `[TODO] ${title}`,
        lead: '[TODO] Case study coming soon.',
        tags: ['[TODO]'],
      },
      {
        type: 'intro',
        index: '01',
        label: 'Context',
        heading: '[TODO] Brief',
        body: '[TODO] Copy pending.',
        meta: [
          { label: 'ROLE', value: '[TODO]' },
          { label: 'TIMELINE', value: '[TODO]' },
        ],
      },
    ],
  };
}

function howIBuildThis(): Project {
  return {
    id: 'how-i-build-this',
    title: 'How I build this',
    category: 'Process',
    windowTitle: 'How I build this — Process',
    theme: 'light',
    nav: [
      { label: 'Overview', anchorId: 'overview' },
      { label: 'Foundations', anchorId: 'foundations' },
      { label: 'Modules', anchorId: 'modules' },
      { label: 'Prompts', anchorId: 'prompts' },
      { label: 'Tools', anchorId: 'tools' },
    ],
    sections: [
      {
        type: 'hero',
        anchor: 'overview',
        eyebrow: 'Process',
        title: 'How I build\nthis site',
        lead: 'A short walkthrough of the tools, decisions and prompts behind it.',
        tags: ['[TODO]'],
      },
      {
        type: 'buildSteps',
        anchor: 'foundations',
        index: '01',
        label: 'Foundations',
        heading: 'Foundations',
        steps: [
          { n: '01', title: 'Start with a wireframe', desc: '[TODO] Short description of this step.', prompt: 1 },
          { n: '02', title: 'Tokens first', desc: '[TODO] Short description of this step.' },
        ],
      },
      {
        type: 'buildSteps',
        anchor: 'modules',
        index: '02',
        label: 'Modules',
        heading: 'Modules',
        steps: [
          { n: '03', title: 'Modules step', desc: '[TODO] Short description of this step.', prompt: 2 },
          { n: '04', title: 'Another step', desc: '[TODO] Short description of this step.' },
        ],
      },
      {
        type: 'prompts',
        anchor: 'prompts',
        index: '03',
        label: 'Prompts',
        heading: 'Make your own',
        body: 'Two prompts, in the order they were used. Paste each into your AI coding tool and replace everything in [brackets].',
        items: [
          { title: 'Structure', desc: 'Architecture, behaviour and content model.', code: "Build the MVP of a personal Product Designer portfolio using an operating-system desktop metaphor (macOS style). Prioritise structure, states and interaction; the visual style is defined in a second step, so use neutral styles but have every class/token ready.\n\nSTACK\n- Vite + React + TypeScript. Plain CSS with custom properties (no Tailwind, no UI libraries).\n- No backend. All content lives in typed data files (/src/content).\n- Images in .webp with a mandatory descriptive alt.\n\nSCREEN ARCHITECTURE (a single route, no page scroll)\nmain.desktop-shell\n├─ header.menu-bar (fixed, 40px): monogram on the left (Home link) · on the right an availability indicator (status dot + hidden text \"Available for select work\") + live HH:MM clock using <time>.\n├─ section.portfolio-desktop (100vh − menu-bar)\n│  ├─ div.hero-image (absolute, full-bleed background with a photo of the author)\n│  ├─ h1.hero-wordmark (name in uppercase, centred, fixed, decorative)\n│  └─ div.project-grid (CSS grid): one <button class=\"project-folder\"> per project with a folder icon + 2-line label (Name / Category).\n└─ nav.dock (bottom, centred): tool icons + own apps + external links, with a separator between groups.\n\nDATA MODEL\nProject { id, title, category, windowTitle, theme: 'light' | 'dark' | custom, nav: {label, anchorId}[], sections: Section[] }\nSection (union discriminated by \"type\"):\n- hero { eyebrow, title (allows line breaks), lead, tags[], media? (image or video embed) }\n- intro { index, label, heading, body, meta: {label, value}[] }        // ROLE, SCOPE, TEAM, TIMELINE\n- numberedList { index, label, heading, body, items[] }                 // optional inverted background\n- process { index, label, heading, body, steps: {n, title, desc}[] }    // 4 cards\n- evidence { index, label, heading, body, bullets[], media[] }\n- decisionGrid { articles: {index,label,heading,body,media}[] }         // 2 columns\n- solution { index, label, heading, body, features: {n,title,desc,screens[]}[] } // alternates left/right\n- outcomes { index, label, heading, metrics: {value,label}[], learnings[] }\nDockItem { id, label, icon, kind: 'tool' | 'notes' | 'link', dialog?: {title, body, cta}, href? }\nNotes { items: {id, title, preview, content}[] }   // About, CV, Interests\n\nINTERACTIONS — DESKTOP (≥ 721px)\n1. Folder: single click = select (is-selected state, only one at a time). Double click or Enter = opens the case window. Hover/focus = icon lift.\n2. Case window (div.case-window, role=\"dialog\", aria-modal, aria-labelledby):\n   - Title bar with traffic lights: red = close, yellow = minimise (MVP: close), green = expand to near full screen / restore.\n   - Centred title using windowTitle.\n   - Sticky sub-nav with anchors (Overview, Research, Design, Impact). Click = smooth scroll inside the window. Scroll-spy marks the active item.\n   - Content scrolls internally (the page never scrolls).\n   - Resize handle in the bottom-right corner (optional in MVP).\n   - Close with Esc or the red button, returning focus to the source folder.\n3. Dock:\n   - Hover = macOS-style magnification with a label tooltip; pressed = scale 0.96.\n   - kind 'tool' → small system-alert-style dialog (icon, one-line title, short description, one CTA button that closes it).\n   - kind 'notes' → Notes window: sidebar list (title + truncated preview, \"N Notes\" counter) + content panel. First item selected by default.\n   - kind 'link' → mailto: / LinkedIn in a new tab.\n4. Only one window open at a time in the MVP (opening another closes the previous one).\n\nINTERACTIONS — MOBILE (≤ 720px)\n- 2-column folder grid; the dock becomes a fixed vertical column on the left edge.\n- A single tap opens the case directly as a full-screen iOS-style push view: header with a \"back\" chevron + short title. No traffic lights.\n- Notes and dialogs full screen or as a bottom sheet.\n- Breakpoints to respect: 520, 720/721, 767, 1100/1101.\n\nACCESSIBILITY (non-negotiable)\n- Folders and dock items are real <button>s with aria-label \"Name, Category\".\n- Focus trap inside every window/dialog; focus-visible always visible.\n- The wordmark and hero photo are decorative for screen readers (aria-label only on the h1).\n- prefers-reduced-motion: no entrance animations, no magnification, instant scroll.\n- Full keyboard navigation: Tab through folders, Enter opens, Esc closes.\n\nDELIVERABLES\n- Components: MenuBar, Clock, Desktop, ProjectFolder, Dock, DockItem, DockTooltip, CaseWindow, WindowChrome, CaseNav, SectionRenderer (switch on type), NotesWindow, SystemDialog, MobileCaseView.\n- Minimal global state (useReducer or Context): selectedFolderId, openWindow {type, id}, isExpanded.\n- 2 complete example projects using every section type + 4 folders with placeholder data.\n- Don't invent brand content: use clearly marked [TODO] placeholders wherever copy is missing." },
          { title: 'Design', desc: 'UI, tokens and motion.', code: "Apply the visual system to the already-built \"desktop OS\" portfolio MVP. Don't change structure or logic; work only on tokens, styles and motion. Define everything as custom properties in :root and consume them from the components; zero hardcoded values outside the tokens.\n\nDIRECTION\nContemporary macOS fidelity, restrained and editorial: the system chrome is neutral and almost invisible; the stars are the author's photo and the large typography inside each case. Each case can have its own theme without breaking the shared chrome.\n\nBASE TOKENS\n- Colour: --ink #202020 · --muted #818181 · --system-blue #0a84ff · --menu-bg rgba(249,248,246,.94) · --window-bg #f5f4ef · --surface-dark #1c1b1f · --accent (per case; e.g. violet #6b4fd8 for fintech) · --status-green.\n- Typography: system stack (-apple-system, \"SF Pro Display\", \"SF Pro Text\", Inter, Arial, sans-serif). Weights 400/500/600/700.\n  - Hero wordmark: ~78px (clamp on mobile), weight 500, uppercase, letter-spacing ~0.25em, 96% white over the photo.\n  - Case display (hero): 64–72px, weight 700, negative tracking (-0.03em), line-height ~0.95, intentional line breaks.\n  - Section heading: 40–48px, weight 700, tracking -0.02em.\n  - Eyebrow / section label: 12–13px, weight 600, uppercase, letter-spacing 0.12em, colour --accent. Format \"01 / OVERVIEW\".\n  - Body: 15–16px, line-height 1.55, colour --ink or --muted.\n- Radii: window 13px · cards 16–20px · dock 20px · chips/pills 999px.\n- Window shadows (3 layers): 0 32px 90px rgba(19,16,24,.34), 0 5px 20px rgba(19,16,24,.16), inset 0 0 0 .5px rgba(255,255,255,.72).\n- Spacing: 4px scale; case section side padding 64px desktop / 20px mobile; vertical gap between sections 96–120px.\n\nDESKTOP\n- Menu bar: translucent cream background, hairline bottom border, bold 14px monogram, 13px tabular-nums clock with a green status dot.\n- Hero: treated full-bleed photo (desaturated pink/lilac tone, double exposure or subtle horizontal ghosting) + linear overlay with an 8–9% white glow on the side edges.\n- Folders: blue macOS folder icon (~64px) with a soft shadow; white label with text-shadow; selected = label on a --system-blue pill. Hover: translateY(-3px) scale(1.04) + deeper drop-shadow.\n- Dock: glass container (blur + light border), 44px icons with squircle radius, thin vertical separator between groups, dark pill tooltip above the icon.\n\nCASE WINDOW\n- Title bar ~38px, very subtle light-grey gradient, 12px traffic lights (#ff5f57, #febc2e, #28c840), 13px weight 600 centred title.\n- Sub-nav: off-white background, 12–13px weight 500 --muted items; active = pill with a 12% --accent tint background and --accent text.\n- Section rhythm: alternate light (--window-bg) and dark (--surface-dark, white text, lightened --accent eyebrow) backgrounds to mark chapters.\n- Case hero: soft radial --accent gradient background (lilac/lavender), display on the left, glass mockup/card on the right, tags as white pills with a thin border.\n- Section layout: 2-column grid (heading left / body + lists right). Numbered lists with a small --accent number and hairline separators.\n- Process cards: 4 columns, white background with a slight gradient, 16px radius, faint number on top, 18px weight 600 title, 13px --muted description.\n- Solution: dark section, features alternating text/screens, app screens in a rounded dark container.\n- Outcomes: metrics in cards with a 48–56px weight 700 figure in dark --accent, 13px label below.\n- Dark variant (e.g. a case with video): black background, uppercase sub-nav with wide tracking, scientific-instrument-style green accents.\n\nDIALOGS AND NOTES\n- Dock dialog: dark macOS alert style (#2a2a2c background ~92%, 12px radius), 40px app icon, 14px bold white title, 12px light-grey text, --system-blue primary button aligned right.\n- Notes: light-grey sidebar with a highlighted active item, 13px bold titles + 12px --muted preview on 2 lines; white content panel with a 28px bold H1.\n\nMOTION (respect prefers-reduced-motion)\n- Open case window: opacity 0→1, translateY +14px→0, scale .985→1, ~280ms cubic-bezier(.2,.8,.2,1).\n- Expand (green): opacity .78→1, scale .985→1, ~240ms.\n- Notes / dock dialog: translateY 9–10px→0, scale .985–.988→1, ~220ms.\n- Dock: magnification with scale computed from cursor distance (var --dock-scale); pressed 45ms.\n- Folder hover: 160ms ease-out.\n- Smooth internal scroll for the sub-nav anchors.\n\nMOBILE\n- iOS-style case view: white header with a blue chevron and a centred 15px semibold title; display scales to ~44px.\n- Vertical dock on the left edge, same glass treatment.\n\nFINAL CHECK\n- AA contrast on all text (watch the white folder labels and --muted body on cream).\n- Hover, focus-visible, pressed, selected and disabled states defined for folders, dock, traffic lights and sub-nav.\n- Deliver an internal /tokens page showing the palette, type scale and radii to validate the system." },
        ],
      },
      {
        type: 'builtWith',
        anchor: 'tools',
        index: '04',
        label: 'Tools',
        heading: 'Built with',
        items: ['Figma', 'Photoshop', 'Claude', 'React 19', 'TypeScript', 'Vite', 'Tailwind', 'GitHub', 'Vercel'],
      },
    ],
  };
}

function whatsNew(): Project {
  return {
    id: 'whats-new',
    title: "What's new",
    category: 'Updates',
    windowTitle: "What's new — Updates",
    theme: 'light',
    nav: [{ label: 'Changelog', anchorId: 'changelog' }],
    sections: [
      {
        type: 'changelog',
        anchor: 'changelog',
        index: '01',
        label: 'Changelog',
        heading: "What's new",
        groups: [
          {
            date: '13 Oct 2026',
            entries: [
              {
                tag: 'New',
                title: 'Three interfaces, three eras',
                desc: 'The portfolio now ships with three complete looks, each true to its time. Switch between them from the Apple menu, under About This Mac. Your choice is remembered.',
              },
              {
                tag: 'New',
                title: 'Classic · Mac OS 9',
                desc: 'Platinum: flat grey chrome, crisp one-pixel bevels, striped title bars and a pixel-perfect menu bar and dock.',
                media: { src: '/images/whatsnew-classic.webp', alt: 'Portfolio in the Classic (Mac OS 9) appearance' },
              },
              {
                tag: 'New',
                title: 'Aqua · Mac OS X 10.4',
                desc: 'Glossy gel buttons, brushed pinstripes, glass traffic lights and the reflective Tiger-era dock.',
                media: { src: '/images/whatsnew-aqua.webp', alt: 'Portfolio in the Aqua (Mac OS X 10.4) appearance' },
              },
              {
                tag: 'New',
                title: 'Tahoe · macOS 26',
                desc: 'Liquid Glass: translucent layers, generous rounding and soft light. Still the default.',
                media: { src: '/images/whatsnew-tahoe.webp', alt: 'Portfolio in the Tahoe (macOS 26) appearance' },
              },
            ],
          },
          {
            date: '[Date]',
            entries: [
              {
                tag: 'Improved',
                title: 'Notes, reshaped',
                desc: '[Placeholder] We shaped the Notes section to feel like the real app. Describe what changed and why.',
                media: { src: '/images/whatsnew-notes.webp', alt: 'The Notes section open on the Interests note' },
              },
              {
                tag: 'New',
                title: 'My favorite everyday apps',
                desc: '[Placeholder] The apps I use day to day, now listed in Notes. Add the list and a line on why each one stays.',
                media: { src: '/images/whatsnew-apps.webp', alt: 'The dock with my everyday apps: Spotify, Figma, Claude, VS Code, GitHub, Terminal' },
              },
            ],
          },
          {
            date: '[Date]',
            entries: [
              {
                tag: 'New',
                title: 'Building the site',
                desc: '[Placeholder] How we developed the site: the idea, the stack and the decisions along the way.',
                media: { src: '/images/whatsnew-build.webp', alt: 'The How I build this site window' },
              },
            ],
          },
        ],
      },
    ],
  };
}

export const projects: Project[] = [
  fullCase('project-one', '[TODO] Project One', 'Product Design', 'light'),
  fullCase('project-two', '[TODO] Project Two', 'Design System', 'dark'),
  stubCase('project-three', '[TODO] Project Three', 'Mobile App'),
  stubCase('project-four', '[TODO] Project Four', 'Brand & Web'),
  howIBuildThis(),
  whatsNew(),
];
