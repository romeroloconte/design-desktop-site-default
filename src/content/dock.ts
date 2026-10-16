import type { DockItemData, Note } from './types';

/**
 * Who the portfolio belongs to. Edit this block (and the notes below) to make the site yours.
 * Everything else in the UI reads from here.
 */
export const author = {
  name: 'Your Name',
  monogram: 'YN',
  role: 'Product Designer',
  headline: 'Product Designer · End-to-end digital products',
  availability: 'Available for select work',
  /** Leave a link empty and its window shows a short guide on where to add it. */
  links: {
    /** Opened from your name in the menu bar. Points to the template author until you change it. */
    website: 'https://romeroloconte.com/',
    github: '',
    linkedin: '',
    /** Spotify playlist id: the part after /playlist/ in its URL. */
    spotifyPlaylist: '',
  },
};

/** Template credit, shown in About This Mac. */
export const credit = { name: 'Luis Romero', url: 'https://romeroloconte.com/' };

const playlist = author.links.spotifyPlaylist;

/** Opened from the menu bar name; not shown in the dock. */
export const profileItem: DockItemData = {
  id: 'profile',
  label: 'Website',
  icon: '/icons-dock/folder.png',
  kind: 'browser',
  href: author.links.website,
  embed: author.links.website,
};

export const dockItems: DockItemData[] = [
  {
    id: 'tool-spotify',
    label: 'Spotify',
    icon: '/icons-dock/spotify.png', icons: { aqua: '/icons-dock/aqua/spotify.png?v=3', classic: '/icons-dock/classic/spotify.svg' },
    kind: 'browser',
    href: playlist ? `https://open.spotify.com/playlist/${playlist}` : undefined,
    embed: playlist ? `https://open.spotify.com/embed/playlist/${playlist}` : undefined,
    embedBg: '#832f12',
    setup: {
      title: 'Add your favorite playlist',
      body: 'Share the music you work to. Paste a Spotify playlist id into author.links.spotifyPlaylist in src/content/dock.ts and it plays right here.',
      example: 'open.spotify.com/playlist/your-playlist-id',
    },
  },
  {
    id: 'tool-figma',
    label: 'Figma',
    icon: '/icons-dock/figma.png', icons: { aqua: '/icons-dock/aqua/figma.svg?v=11', classic: '/icons-dock/classic/figma.svg' },
    kind: 'tool',
    dialog: { title: '[TODO] One-line title.', body: '[TODO] How you use Figma in your work.', cta: 'Got it.' },
  },
  {
    id: 'tool-claude',
    label: 'Claude',
    icon: '/icons-dock/claude.png', icons: { aqua: '/icons-dock/aqua/claude.svg?v=11', classic: '/icons-dock/classic/claude.svg' },
    kind: 'tool',
    dialog: { title: '[TODO] One-line title.', body: '[TODO] How you use Claude in your work.', cta: 'Got it.' },
  },
  {
    id: 'tool-vscode',
    label: 'Visual Studio Code',
    icon: '/icons-dock/vscode.png', icons: { aqua: '/icons-dock/aqua/vscode.svg?v=11', classic: '/icons-dock/classic/vscode.svg' },
    kind: 'tool',
    dialog: { title: '[TODO] One-line title.', body: '[TODO] How you use VS Code in your work.', cta: 'Got it.' },
  },
  { id: 'github', label: 'GitHub', icon: '/icons-dock/github.svg', icons: { aqua: '/icons-dock/aqua/github.svg?v=11', classic: '/icons-dock/classic/github.svg' }, kind: 'browser', href: author.links.github || undefined,
    setup: { title: 'Add your GitHub', body: 'Show your code. Put your profile URL in author.links.github in src/content/dock.ts.', example: 'github.com/your-username' } },
  {
    id: 'tool-terminal',
    label: 'Terminal',
    icon: '/icons-dock/terminal.png', icons: { aqua: '/icons-dock/aqua/terminal.svg?v=12', classic: '/icons-dock/classic/terminal.svg' },
    kind: 'tool',
    dialog: { title: '[TODO] One-line title.', body: '[TODO] How you use Terminal in your work.', cta: 'Got it.' },
  },
  { id: 'notes', label: 'Notes', icon: '/icons-dock/notes.png', icons: { aqua: '/icons-dock/aqua/notes.svg?v=3', classic: '/icons-dock/classic/notes.svg' }, kind: 'notes' },
  { id: 'linkedin', label: 'LinkedIn', icon: '/icons-dock/linkedin.svg', icons: { aqua: '/icons-dock/aqua/linkedin.svg?v=11', classic: '/icons-dock/classic/linkedin.svg' }, kind: 'browser', href: author.links.linkedin || undefined,
    setup: { title: 'Add your LinkedIn', body: 'Let people see your experience. Put your profile URL in author.links.linkedin in src/content/dock.ts.', example: 'linkedin.com/in/your-username' } },
  {
    id: 'trash',
    label: 'Trash',
    icon: '/icons-dock/trash-full.png', icons: { aqua: '/icons-dock/aqua/trash-full.png?v=3', classic: '/icons-dock/classic/trash.svg' },
    kind: 'tool',
  },
];

/** Index where each group ends; a separator is drawn after it. */
export const dockSeparatorsAfter = ['tool-terminal'];

/**
 * Notes app content. Inside `content`: `# ` heading, `**bold**`, `• ` bullet,
 * `@ ` company, `~ ` dates/place, `+ ` context line. Blocks are separated by a blank line.
 */
export const notes: Note[] = [
  { id: 'about', title: 'About', kicker: 'Who I am', preview: '[TODO] One or two sentences introducing yourself.',
    content: [
      '[TODO] One or two sentences introducing yourself: your role, years of experience and focus.',
      '[TODO] Industries and kinds of products you have worked on.',
      '[TODO] Education or background.',
    ].join('\n\n'),
  },
  { id: 'interests', title: 'Interests', kicker: 'What I care about', preview: '[TODO] The topics you care about most in your work.',
    content: [
      "# [TODO] Your main interest.\n[TODO] A short paragraph on why it matters to you.",
      "# [TODO] Another topic.\n[TODO] Short paragraph.\n# [TODO] Another topic.\n[TODO] Short paragraph.",
      "# Skills & Expertise\n**[TODO] Area:** Skill · Skill · Skill\n**[TODO] Area:** Skill · Skill · Skill\n**[TODO] Tools:** Tool · Tool · Tool",
    ].join('\n\n'),
  },
  { id: 'cv', title: 'CV', kicker: 'My journey', preview: 'Senior Product Designer at Company Name · Product Designer, Fintech…',
    content: [
      "# Senior Product Designer\n@ Company Name\n~ Jan 2025 – Present · City, Country",
      "# Product Designer · Design Systems\n@ Company Name\n~ Mar 2022 – Dec 2024 · City, Country\n+ Fintech client\n• Maintained the **component library** and its documentation, keeping design and code in sync.\n• Reviewed implementations with engineering and resolved UI questions across teams.\n• Ran **screen audits** to spot inconsistencies and reuse components across flows.\n• Owned the **change request** process: new components, fixes and deprecations, with versioned releases.",
      "# UX Designer\n@ Agency Name\n~ Jun 2020 – Feb 2022 · City, Country\n+ Logistics · Retail · client-one.com · client-two.com\n• Defined **user journeys**, **wireframes**, flows and prototypes for client products.\n• **Client One:** redesigned the checkout flow, reducing steps and improving conversion.",
      "# UI Designer · Visual Designer\n@ Studio Name\n~ Feb 2018 – May 2020 · City, Country\n• Designed interfaces and **visual systems** for web and mobile products.\n• Worked with developers to ship **pixel-perfect** layouts.",
      "# Art Director\n@ Agency Name\n~ Apr 2016 – Jan 2018\n+ Remote",
      "# Graphic Designer\n@ Studio Name\n~ Mar 2014 – Mar 2016\n+ Clients: Brand One, Brand Two",
    ].join('\n\n'),
  },
  { id: 'certifications', title: 'Certifications', preview: 'Institution Name – Accessibility · Online Platform · Bootcamp Name…',
    content: [
      "# Institution Name – Digital Accessibility\n~ 2025\n• **Accessibility Fundamentals.** Legible typography, accessible colour and inclusive links and buttons.\n• **Standards.** Semantic HTML, ARIA basics and screen reader testing.\n• **Audits.** Accessibility handoff and full web and mobile audits.",
      "# Online Platform\n~ 2024\n• Course name\n• Course name",
      "# Mentor Name\n~ 2023\n• Design Systems",
      "# Bootcamp Name\n~ 2020 – 2022\n• UX/UI Design\n• Front End",
      "# Online Platform\n~ 2019\n• Responsive Web Design",
    ].join('\n\n'),
  },
];
