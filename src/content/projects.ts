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
          { title: 'Structure', desc: 'Architecture, behaviour and content model.', code: "Construye el MVP de un portfolio personal de Product Designer con metáfora de escritorio de sistema operativo (estilo macOS). Prioriza estructura, estados e interacción; el estilo visual se define en un segundo paso, así que usa estilos neutros pero con todas las clases/tokens preparados.\n\nSTACK\n- Vite + React + TypeScript. CSS plano con custom properties (sin Tailwind, sin librerías de UI).\n- Sin backend. Todo el contenido vive en archivos de datos tipados (/src/content).\n- Imágenes en .webp con alt descriptivo obligatorio.\n\nARQUITECTURA DE PANTALLA (una sola ruta, sin scroll de página)\nmain.desktop-shell\n├─ header.menu-bar (fixed, 40px): monograma a la izquierda (link Home) · a la derecha indicador de disponibilidad (punto de estado + texto oculto \"Available for select work\") + reloj en vivo HH:MM con <time>.\n├─ section.portfolio-desktop (100vh − menu-bar)\n│  ├─ div.hero-image (absolute, fondo full-bleed con foto del autor)\n│  ├─ h1.hero-wordmark (nombre en mayúsculas, centrado, fixed, decorativo)\n│  └─ div.project-grid (CSS grid): un <button class=\"project-folder\"> por proyecto con icono de carpeta + label en 2 líneas (Nombre / Categoría).\n└─ nav.dock (inferior, centrado): iconos de herramientas + apps propias + enlaces externos, con separador entre grupos.\n\nMODELO DE DATOS\nProject { id, title, category, windowTitle, theme: 'light' | 'dark' | custom, nav: {label, anchorId}[], sections: Section[] }\nSection (union discriminada por \"type\"):\n- hero { eyebrow, title (permite saltos de línea), lead, tags[], media? (imagen o embed de vídeo) }\n- intro { index, label, heading, body, meta: {label, value}[] }        // ROLE, SCOPE, TEAM, TIMELINE\n- numberedList { index, label, heading, body, items[] }                 // fondo invertido opcional\n- process { index, label, heading, body, steps: {n, title, desc}[] }    // 4 cards\n- evidence { index, label, heading, body, bullets[], media[] }\n- decisionGrid { articles: {index,label,heading,body,media}[] }         // 2 columnas\n- solution { index, label, heading, body, features: {n,title,desc,screens[]}[] } // alterna izquierda/derecha\n- outcomes { index, label, heading, metrics: {value,label}[], learnings[] }\nDockItem { id, label, icon, kind: 'tool' | 'notes' | 'link', dialog?: {title, body, cta}, href? }\nNotes { items: {id, title, preview, content}[] }   // About, CV, Interests\n\nINTERACCIONES — DESKTOP (≥ 721px)\n1. Carpeta: click simple = selecciona (estado is-selected, solo una a la vez). Doble click o Enter = abre la ventana del caso. Hover/focus = elevación del icono.\n2. Ventana de caso (div.case-window, role=\"dialog\", aria-modal, aria-labelledby):\n   - Barra de título con semáforos: rojo = cerrar, amarillo = minimizar (MVP: cerrar), verde = expandir a casi pantalla completa / restaurar.\n   - Título centrado con windowTitle.\n   - Sub-nav sticky con anclas (Overview, Research, Design, Impact). Click = scroll suave dentro de la ventana. Scroll-spy marca el ítem activo.\n   - Contenido con scroll interno (la página nunca hace scroll).\n   - Esquina inferior derecha con handle de resize (opcional en MVP).\n   - Cierre con Esc, botón rojo y devolución del foco a la carpeta de origen.\n3. Dock:\n   - Hover = magnificación tipo macOS con tooltip del label; pressed = escala 0.96.\n   - kind 'tool' → diálogo pequeño tipo alerta del sistema (icono, título de una línea, descripción corta, un botón CTA que cierra).\n   - kind 'notes' → ventana Notes: sidebar con lista (título + preview truncado, contador \"N Notes\") + panel de contenido. Primer ítem seleccionado por defecto.\n   - kind 'link' → mailto: / LinkedIn en nueva pestaña.\n4. Solo una ventana abierta a la vez en el MVP (abrir otra cierra la anterior).\n\nINTERACCIONES — MOBILE (≤ 720px)\n- Grid de carpetas a 2 columnas; el dock pasa a columna vertical fija en el lateral izquierdo.\n- Tap simple abre directamente el caso como vista full-screen tipo push de iOS: header con chevron \"atrás\" + título corto. Sin semáforos.\n- Notes y diálogos a pantalla completa o bottom sheet.\n- Breakpoints a respetar: 520, 720/721, 767, 1100/1101.\n\nACCESIBILIDAD (no negociable)\n- Carpetas y dock son <button> reales con aria-label \"Nombre, Categoría\".\n- Focus trap dentro de cada ventana/diálogo; focus-visible siempre visible.\n- Wordmark y foto del hero son decorativos para lectores (aria-label solo en el h1).\n- prefers-reduced-motion: sin animaciones de entrada, sin magnificación, scroll instantáneo.\n- Navegación completa con teclado: Tab por carpetas, Enter abre, Esc cierra.\n\nENTREGABLES\n- Componentes: MenuBar, Clock, Desktop, ProjectFolder, Dock, DockItem, DockTooltip, CaseWindow, WindowChrome, CaseNav, SectionRenderer (switch por type), NotesWindow, SystemDialog, MobileCaseView.\n- Estado global mínimo (useReducer o Context): selectedFolderId, openWindow {type, id}, isExpanded.\n- 2 proyectos de ejemplo completos con todos los tipos de sección + 4 carpetas con datos placeholder.\n- No inventes contenido de marca: usa placeholders claramente marcados [TODO] donde falte copy." },
          { title: 'Design', desc: 'UI, tokens and motion.', code: "Aplica el sistema visual al MVP del portfolio \"desktop OS\" ya construido. No cambies estructura ni lógica; trabaja solo en tokens, estilos y motion. Define todo como custom properties en :root y consúmelas desde los componentes; cero valores hardcodeados fuera de los tokens.\n\nDIRECCIÓN\nFidelidad macOS contemporáneo, sobria y editorial: el chrome del sistema es neutro y casi invisible; el protagonismo lo tienen la foto del autor y la tipografía grande dentro de cada caso. Cada caso puede tener su propio tema sin romper el chrome común.\n\nTOKENS BASE\n- Color: --ink #202020 · --muted #818181 · --system-blue #0a84ff · --menu-bg rgba(249,248,246,.94) · --window-bg #f5f4ef · --surface-dark #1c1b1f · --accent (por caso; ej. violeta #6b4fd8 para fintech) · --status-green.\n- Tipografía: stack de sistema (-apple-system, \"SF Pro Display\", \"SF Pro Text\", Inter, Arial, sans-serif). Pesos 400/500/600/700.\n  - Wordmark hero: ~78px (clamp en mobile), weight 500, mayúsculas, letter-spacing ~0.25em, blanco 96% sobre la foto.\n  - Display de caso (hero): 64–72px, weight 700, tracking negativo (-0.03em), line-height ~0.95, saltos de línea intencionados.\n  - Heading de sección: 40–48px, weight 700, tracking -0.02em.\n  - Eyebrow / label de sección: 12–13px, weight 600, mayúsculas, letter-spacing 0.12em, color --accent. Formato \"01 / OVERVIEW\".\n  - Body: 15–16px, line-height 1.55, color --ink o --muted.\n- Radios: ventana 13px · cards 16–20px · dock 20px · chips/pills 999px.\n- Sombras de ventana (3 capas): 0 32px 90px rgba(19,16,24,.34), 0 5px 20px rgba(19,16,24,.16), inset 0 0 0 .5px rgba(255,255,255,.72).\n- Espaciado: escala de 4px; padding lateral de secciones de caso 64px desktop / 20px mobile; separación vertical entre secciones 96–120px.\n\nESCRITORIO\n- Menu bar: fondo crema translúcido, borde inferior hairline, monograma bold 14px, reloj 13px tabular-nums con punto verde de estado.\n- Hero: foto full-bleed tratada (tono rosado/lila desaturado, doble exposición o ghosting horizontal sutil) + overlay lineal con brillo blanco 8–9% en los bordes laterales.\n- Carpetas: icono de carpeta azul macOS (~64px) con sombra suave; label blanco con text-shadow; seleccionada = label sobre pill --system-blue. Hover: translateY(-3px) scale(1.04) + drop-shadow más profunda.\n- Dock: contenedor glass (blur + borde claro), iconos 44px con radio de squircle, separador vertical fino entre grupos, tooltip oscuro tipo pill sobre el icono.\n\nVENTANA DE CASO\n- Title bar ~38px, gradiente gris claro muy sutil, semáforos 12px (#ff5f57, #febc2e, #28c840), título 13px weight 600 centrado.\n- Sub-nav: fondo blanco roto, ítems 12–13px weight 500 --muted; activo = pill con fondo tintado del --accent al 12% y texto --accent.\n- Ritmo de secciones: alternar fondos claro (--window-bg) y oscuro (--surface-dark, texto blanco, eyebrow en --accent aclarado) para marcar capítulos.\n- Hero de caso: fondo con gradiente radial suave del --accent (lila/lavanda), display a la izquierda, mockup/card glass a la derecha, tags como pills blancas con borde fino.\n- Layout de secciones: grid 2 columnas (heading izquierda / body + listas derecha). Listas numeradas con número pequeño en --accent y separadores hairline.\n- Cards de proceso: 4 columnas, fondo blanco con gradiente leve, radio 16px, número tenue arriba, título 18px weight 600, descripción 13px --muted.\n- Solution: sección oscura, features alternando texto/pantallas, pantallas de app en contenedor oscuro redondeado.\n- Outcomes: métricas en cards con cifra 48–56px weight 700 en --accent oscuro, label 13px debajo.\n- Variante dark (ej. caso con vídeo): fondo negro, sub-nav en mayúsculas con tracking amplio, acentos verdes tipo instrumento científico.\n\nDIÁLOGOS Y NOTES\n- Diálogo del dock: estilo alerta macOS oscura (fondo #2a2a2c ~92%, radio 12px), icono de app 40px, título 14px bold blanco, texto 12px gris claro, botón primario --system-blue alineado a la derecha.\n- Notes: sidebar gris claro con ítem activo resaltado, títulos 13px bold + preview 12px --muted en 2 líneas; panel de contenido blanco con H1 28px bold.\n\nMOTION (respetar prefers-reduced-motion)\n- Abrir ventana de caso: opacity 0→1, translateY +14px→0, scale .985→1, ~280ms cubic-bezier(.2,.8,.2,1).\n- Expandir (verde): opacity .78→1, scale .985→1, ~240ms.\n- Notes / diálogo del dock: translateY 9–10px→0, scale .985–.988→1, ~220ms.\n- Dock: magnificación con escala calculada por distancia al cursor (var --dock-scale); pressed 45ms.\n- Hover de carpeta: 160ms ease-out.\n- Scroll interno suave para las anclas de la sub-nav.\n\nMOBILE\n- Vista de caso tipo iOS: header blanco con chevron azul y título centrado 15px semibold; display escala a ~44px.\n- Dock vertical en el lateral izquierdo, mismo tratamiento glass.\n\nCHECK FINAL\n- Contraste AA en todo el texto (atención al label blanco de carpetas y al body --muted sobre crema).\n- Estados hover, focus-visible, pressed, selected y disabled definidos para carpetas, dock, semáforos y sub-nav.\n- Entrega una página /tokens interna que muestre la paleta, la escala tipográfica y los radios para validar el sistema." },
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
            date: '12 Oct 2026',
            entries: [
              {
                tag: 'New',
                title: 'New feature title',
                desc: 'A short description of this new feature and what it lets people do. Replace this with the real update.',
              },
              {
                tag: 'Improved',
                title: 'Improvement title',
                desc: 'A short description of what was improved and why it makes the experience better.',
              },
              {
                tag: 'Improved',
                title: 'Interface improvements',
                desc: 'Smaller refinements for a cleaner, more consistent experience.',
              },
            ],
          },
          {
            date: '8 Oct 2026',
            entries: [
              {
                tag: 'New',
                title: 'Another new feature',
                desc: 'A short description of this update, with a screenshot below.',
                media: { alt: 'Screenshot placeholder' },
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
