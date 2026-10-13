import type { DockItemData, Note } from './types';

export const author = {
  name: 'Luis Romero',
  monogram: 'LR',
  availability: 'Available for select work',
};

/** Opened from the menu bar name; not shown in the dock. */
export const profileItem: DockItemData = {
  id: 'profile',
  label: 'Website',
  icon: '/icons-dock/folder.png',
  kind: 'browser',
  href: 'https://romeroloconte.com/',
  embed: 'https://romeroloconte.com/',
};

export const dockItems: DockItemData[] = [
  {
    id: 'tool-spotify',
    label: 'Spotify',
    icon: '/icons-dock/spotify.png', icons: { aqua: '/icons-dock/aqua/spotify.png?v=3', classic: '/icons-dock/classic/spotify.svg' },
    kind: 'browser',
    href: 'https://open.spotify.com/playlist/5smJLAO41GMW6S7GivBlTP',
    embed: 'https://open.spotify.com/embed/playlist/5smJLAO41GMW6S7GivBlTP',
    embedBg: '#832f12',
  },
  {
    id: 'tool-figma',
    label: 'Figma',
    icon: '/icons-dock/figma.png', icons: { aqua: '/icons-dock/aqua/figma.svg?v=8', classic: '/icons-dock/classic/figma.svg' },
    kind: 'tool',
    dialog: { title: 'Figma', body: '[TODO] Short note about how you use Figma.', cta: 'OK' },
  },
  {
    id: 'tool-claude',
    label: 'Claude',
    icon: '/icons-dock/claude.png', icons: { aqua: '/icons-dock/aqua/claude.svg?v=8', classic: '/icons-dock/classic/claude.svg' },
    kind: 'tool',
    dialog: { title: 'Claude', body: '[TODO] Short note about how you use Claude.', cta: 'OK' },
  },
  {
    id: 'tool-vscode',
    label: 'Visual Studio Code',
    icon: '/icons-dock/vscode.png', icons: { aqua: '/icons-dock/aqua/vscode.svg?v=8', classic: '/icons-dock/classic/vscode.svg' },
    kind: 'tool',
    dialog: { title: 'Visual Studio Code', body: '[TODO] Short note about how you use Visual Studio Code.', cta: 'OK' },
  },
  { id: 'github', label: 'GitHub', icon: '/icons-dock/github.svg', icons: { aqua: '/icons-dock/aqua/github.svg?v=8', classic: '/icons-dock/classic/github.svg' }, kind: 'link', href: 'https://github.com/romeroloconte' },
  {
    id: 'tool-terminal',
    label: 'Terminal',
    icon: '/icons-dock/terminal.png', icons: { aqua: '/icons-dock/aqua/terminal.svg?v=8', classic: '/icons-dock/classic/terminal.svg' },
    kind: 'tool',
    dialog: { title: 'Terminal', body: '[TODO] Short note about how you use Terminal.', cta: 'OK' },
  },
  { id: 'notes', label: 'Notes', icon: '/icons-dock/notes.png', icons: { aqua: '/icons-dock/aqua/notes.png?v=4', classic: '/icons-dock/classic/notes.svg' }, kind: 'notes' },
  { id: 'linkedin', label: 'LinkedIn', icon: '/icons-dock/linkedin.svg', icons: { aqua: '/icons-dock/aqua/linkedin.svg?v=8', classic: '/icons-dock/classic/linkedin.svg' }, kind: 'browser', href: 'https://www.linkedin.com/in/romeroloconte/' },
  {
    id: 'trash',
    label: 'Trash',
    icon: '/icons-dock/trash-full.png', icons: { aqua: '/icons-dock/aqua/trash-full.png?v=3', classic: '/icons-dock/classic/trash.svg' },
    kind: 'tool',
  },
];

/** Index where each group ends; a separator is drawn after it. */
export const dockSeparatorsAfter = ['tool-terminal'];

export const notes: Note[] = [
  { id: 'about', title: 'About', preview: 'I am a UX/UI Designer, with +6 years of experience, adopting a strategic approach to end-to-end digital products.',
    content: [
      'I am a UX/UI Designer, with +6 years of experience, adopting a strategic approach to end-to-end digital products.',
      'My background spans various industries with complex projects, primarily in banking, alongside experience in logistics and retail products, designing solutions that balance user experience and needs with business goals.',
      'Degree in Advertising Art Direction with over 12 years of experience in the agency and creative studio ecosystem.',
    ].join('\n\n'),
  },
  { id: 'interests', title: 'Interests', preview: 'Scale is the true challenge of product design. As a product grows, a lack of visual and technical cohesion…',
    content: [
      "# Scale is the true challenge of product design.\nAs a product grows, a lack of visual and technical cohesion can emerge, creating friction in the user experience that ultimately fragments usability.\nMy work focuses on connecting product decisions through solid flows—turning friction into efficient experiences and consistent products.",
      "# Component Anatomy & Behavior.\nAnalyzing continuous screens allows us to identify inconsistencies, reuse components, and align behaviors with real user needs.\n# Efficiency for Designers & Developers.\nWith technical documentation detailing behaviors, tokens, and spacing, we guarantee an efficient handoff. We don't just design screens—we create a clear system for development, product, and other stakeholders. This reduces friction in the codebase by aligning Figma with Storybook, ensuring both designers and developers understand the true scope and capabilities of every component.\n# Accessibility Assurance (A11Y).\nAccessibility is non-negotiable. It is documented to ensure every component complies with WCAG standards—defining contrast ratios, keyboard navigation, and specific behaviors so the product remains inclusive and compliant with current regulations.",
      "# Screen Analysis.\nAnalyzing each screen not in isolation, but within its specific use case. This allows us to spot inconsistencies, reuse components, and align behaviors with the needs of the flow.\n# Visual Consistency.\nTypography, color palettes, spacing, layouts, and grids—ensuring the interface feels cohesive, even if the user can't explicitly point out why.\n# Functional Consistency.\nIf two elements look similar, they should behave the same way. When they don't, it creates doubt. And when users hesitate, the experience breaks down.",
      "# Skills & Expertise\n**UX Product Design:** Wireframing (Lo-Fi/Hi-Fi) · UX Flows · Behavior Design · Screen Analysis\n**UI & Design Systems:** Banking · UI Engineering · Atomic Design · Component Libraries · Anatomy · Taxonomy · Pixel-Perfect · Dashboards & CRMs\n**Accessibility & Standards:** Accessibility · Analysis (WCAG) · Responsive Web Design · Material Design · Human Interface Guidelines\n**Design & Documentation:** Figma · Design Systems · Technical Project Documentation · Design Ops · Layouts · Accessibility\n**Front-End Development:** HTML5 · CSS3 · Bootstrap · Tailwind · Frameworks Frontend · Terminal · Github · Vercel\n**Collaboration & AI Tools:** Jira · Confluence · Claude",
    ].join('\n\n'),
  },
  { id: 'cv', title: 'CV', preview: 'User Experience Consultant at Amaris Consulting · Design Systems Designer, Banking…',
    content: [
      "# User Experience Consultant\n@ Amaris Consulting\n~ Jul 2026 – Present",
      "# User Experience Consultant · Design Systems Designer\n@ Amaris Consulting\n~ Oct 2023 – Jul 2026\n+ Banking client\n• Managed and maintained **component libraries** and documentation, keeping components and docs coherent and consistent.\n• Continuously reviewed component repositories so the development team implemented changes and improvements correctly; resolved UI questions from design and development teams.\n• Ran **screen analysis** to ensure consistency case by case.\n• Owned the **Component Change Request** lifecycle: fixed bugs, and onboarded or deprecated components requested by the UX/UI team. Removed dependencies between releases, handled error corrections and controlled version publishing.\n• Wrote **component documentation** detailing structure, behavior and specific use cases, with traceability and history of each component so stakeholders understand its evolution and needs.\n• Planned and ran **audits** to identify and deprecate unused components, keeping the system aligned with core releases and libraries.",
      "# UX Consultant · Design Systems Designer\n@ Stefanini LATAM\n~ Aug 2021 – Dec 2021 · Santiago, Chile\n+ Logistics · Blue Express (blue.cl)\n• Designed and architected components for the **Morpho Design System** behind Blue Express products.\n• Used **Atomic Design** and **Pixel Perfect** as the base to plan, create and audit every component needed to improve usability, accounting for accessibility, guidelines, spacing, color, shape, typography, wording and copy.",
      "# UX-UI Designer · Visual Designer\n@ OQO\n~ Oct 2019 – Aug 2021 · Santiago, Chile\n+ Logistics · Retail · turbus.cl · condor.cl · pasajes.cl · royalenfield.cl · resco.cl · Petricio\n• Proposed creative, feasible solutions for clients' business models. Defined **User Journeys**, **Wireframes**, interaction flows and prototypes.\n• **Turbus · Condor · Pasajes:** designed payment links and ticket-purchase flows without sign-in, improving usability and ease of use to raise conversion and ticket sales since launch.",
      "# Art Director · Brand Designer\n@ elestudio\n~ Mar 2018 – Aug 2018 · Santiago, Chile\n• Created **purpose-driven brands** that connect emotionally with people and share their motivations, values and interests.\n• Defined **digital marketing plans**: the elements that make up the brand, the channels and the investment in each.\n• Conveyed messages as effectively as possible, standing out for creativity and quality.",
      "# Art Director · Brand Designer\n@ Causa / Creamos Identidades\n~ Apr 2016 – Feb 2018 · Panama – Costa Rica\n+ Remote",
      "# Art Director · Brand Designer\n@ La Cápsula\n~ Feb 2015 – May 2016\n+ Clients: Pepsi, Lipton, Frito-Lay",
      "# Art Director\n@ Nölck Red America\n~ Sep 2014 – Feb 2015",
      "# Graphic Designer · Art Director\n@ ARS DDB\n~ Apr 2009 – Feb 2014",
      "# Graphic Designer\n@ Rapp Collins\n~ Feb 2006 – Feb 2009",
    ].join('\n\n'),
  },
  { id: 'certifications', title: 'Certifications', preview: 'weAAAre – Digital Accessibility · Udemy · Raul Marin · Coderhouse · FreeCodeCamp',
    content: [
      "# weAAAre – Digital Accessibility\n~ 2026\n• **UI Accessibility Fundamentals.** Legible typography, accessible color palettes and inclusive design for links and buttons.\n• **Development & Standards.** Semantic HTML for designers, an introduction to ARIA and in-depth optimization for screen readers (VoiceOver, TalkBack).\n• **Management & Audits.** Accessibility handoff integration, digital KPI definition and full web and mobile audits.",
      "# Udemy\n~ 2026\n• Artificial Intelligence (AI): The ABC of Key Fundamentals\n• Complete Claude AI Course: Cowork, Design, Projects, Excel",
      "# Raul Marin\n~ 2024\n• Design Systems",
      "# Coderhouse\n~ 2021 – 2023\n• Design Systems\n• UI/UX - Mobile App’s\n• Front End",
      "# FreeCodeCamp\n~ 2020\n• Responsive Web Design",
    ].join('\n\n'),
  },
];
