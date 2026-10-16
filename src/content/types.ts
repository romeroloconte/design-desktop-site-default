export interface Media {
  src?: string; // .webp; if missing a labelled placeholder is rendered
  alt: string;
  embed?: string; // video embed URL
}

interface Base {
  anchor?: string; // matches Project.nav[].anchorId
}

export interface HeroSection extends Base {
  type: 'hero';
  eyebrow: string;
  title: string; // "\n" = line break
  lead: string;
  tags: string[];
  media?: Media;
}
export interface IntroSection extends Base {
  type: 'intro';
  index: string;
  label: string;
  heading: string;
  body: string;
  meta: { label: string; value: string }[]; // ROLE, SCOPE, TEAM, TIMELINE
}
export interface NumberedListSection extends Base {
  type: 'numberedList';
  index: string;
  label: string;
  heading: string;
  body: string;
  items: string[];
  inverted?: boolean;
}
export interface ProcessSection extends Base {
  type: 'process';
  index: string;
  label: string;
  heading: string;
  body: string;
  steps: { n: string; title: string; desc: string }[];
}
export interface EvidenceSection extends Base {
  type: 'evidence';
  index: string;
  label: string;
  heading: string;
  body: string;
  bullets: string[];
  media: Media[];
}
export interface DecisionGridSection extends Base {
  type: 'decisionGrid';
  articles: { index: string; label: string; heading: string; body: string; media: Media }[];
}
export interface SolutionSection extends Base {
  type: 'solution';
  index: string;
  label: string;
  heading: string;
  body: string;
  features: { n: string; title: string; desc: string; screens: Media[] }[];
}
export interface OutcomesSection extends Base {
  type: 'outcomes';
  index: string;
  label: string;
  heading: string;
  metrics: { value: string; label: string }[];
  learnings: string[];
}

export interface ChangelogSection extends Base {
  type: 'changelog';
  index: string;
  label: string;
  heading: string;
  groups: {
    date: string;
    entries: { tag: 'New' | 'Improved' | 'Fixed'; title: string; desc: string; media?: Media }[];
  }[];
}

export interface BuiltWithSection extends Base {
  type: 'builtWith';
  index: string;
  label: string;
  heading: string;
  items: string[];
}
export interface BuildStepsSection extends Base {
  type: 'buildSteps';
  index: string;
  label: string;
  heading: string;
  steps: { n: string; title: string; desc: string; prompt?: number }[]; // prompt = 1-based prompt it links to
}
export interface PromptsSection extends Base {
  type: 'prompts';
  index: string;
  label: string;
  heading: string;
  body: string;
  items: { title: string; desc: string; code: string }[];
}

export type Section =
  | BuiltWithSection
  | BuildStepsSection
  | PromptsSection
  | ChangelogSection
  | HeroSection
  | IntroSection
  | NumberedListSection
  | ProcessSection
  | EvidenceSection
  | DecisionGridSection
  | SolutionSection
  | OutcomesSection;

export interface Project {
  id: string;
  title: string;
  category: string;
  windowTitle: string;
  theme: 'light' | 'dark' | (string & {});
  nav: { label: string; anchorId: string }[];
  sections: Section[];
}

export interface DockItemData {
  id: string;
  label: string;
  icon: string;
  icons?: Partial<Record<'aqua' | 'classic', string>>; // per-theme override; falls back to icon
  kind: 'tool' | 'notes' | 'link' | 'browser';
  dialog?: { title: string; body: string; cta: string };
  href?: string;
  embed?: string; // iframe-able URL shown inside the browser window
  embedBg?: string; // backdrop behind the iframe, matched to the embed colour
  /** Shown in the browser window while `href` is still empty, telling the owner what to fill in. */
  setup?: { title: string; body: string; example: string };
}

export interface Note {
  id: string;
  title: string;
  preview: string;
  kicker?: string; // short phrase shown above the title in the content pane
  content: string;
}
