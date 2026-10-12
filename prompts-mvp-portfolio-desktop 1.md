# MVP Portfolio "Desktop" — Prompts

---

## Prompt 1 — Estructural (arquitectura, comportamiento, contenido)

```
Construye el MVP de un portfolio personal de Product Designer con metáfora de escritorio de sistema operativo (estilo macOS). Prioriza estructura, estados e interacción; el estilo visual se define en un segundo paso, así que usa estilos neutros pero con todas las clases/tokens preparados.

STACK
- Vite + React + TypeScript. CSS plano con custom properties (sin Tailwind, sin librerías de UI).
- Sin backend. Todo el contenido vive en archivos de datos tipados (/src/content).
- Imágenes en .webp con alt descriptivo obligatorio.

ARQUITECTURA DE PANTALLA (una sola ruta, sin scroll de página)
main.desktop-shell
├─ header.menu-bar (fixed, 40px): monograma a la izquierda (link Home) · a la derecha indicador de disponibilidad (punto de estado + texto oculto "Available for select work") + reloj en vivo HH:MM con <time>.
├─ section.portfolio-desktop (100vh − menu-bar)
│  ├─ div.hero-image (absolute, fondo full-bleed con foto del autor)
│  ├─ h1.hero-wordmark (nombre en mayúsculas, centrado, fixed, decorativo)
│  └─ div.project-grid (CSS grid): un <button class="project-folder"> por proyecto con icono de carpeta + label en 2 líneas (Nombre / Categoría).
└─ nav.dock (inferior, centrado): iconos de herramientas + apps propias + enlaces externos, con separador entre grupos.

MODELO DE DATOS
Project { id, title, category, windowTitle, theme: 'light' | 'dark' | custom, nav: {label, anchorId}[], sections: Section[] }
Section (union discriminada por "type"):
- hero { eyebrow, title (permite saltos de línea), lead, tags[], media? (imagen o embed de vídeo) }
- intro { index, label, heading, body, meta: {label, value}[] }        // ROLE, SCOPE, TEAM, TIMELINE
- numberedList { index, label, heading, body, items[] }                 // fondo invertido opcional
- process { index, label, heading, body, steps: {n, title, desc}[] }    // 4 cards
- evidence { index, label, heading, body, bullets[], media[] }
- decisionGrid { articles: {index,label,heading,body,media}[] }         // 2 columnas
- solution { index, label, heading, body, features: {n,title,desc,screens[]}[] } // alterna izquierda/derecha
- outcomes { index, label, heading, metrics: {value,label}[], learnings[] }
DockItem { id, label, icon, kind: 'tool' | 'notes' | 'link', dialog?: {title, body, cta}, href? }
Notes { items: {id, title, preview, content}[] }   // About, CV, Interests

INTERACCIONES — DESKTOP (≥ 721px)
1. Carpeta: click simple = selecciona (estado is-selected, solo una a la vez). Doble click o Enter = abre la ventana del caso. Hover/focus = elevación del icono.
2. Ventana de caso (div.case-window, role="dialog", aria-modal, aria-labelledby):
   - Barra de título con semáforos: rojo = cerrar, amarillo = minimizar (MVP: cerrar), verde = expandir a casi pantalla completa / restaurar.
   - Título centrado con windowTitle.
   - Sub-nav sticky con anclas (Overview, Research, Design, Impact). Click = scroll suave dentro de la ventana. Scroll-spy marca el ítem activo.
   - Contenido con scroll interno (la página nunca hace scroll).
   - Esquina inferior derecha con handle de resize (opcional en MVP).
   - Cierre con Esc, botón rojo y devolución del foco a la carpeta de origen.
3. Dock:
   - Hover = magnificación tipo macOS con tooltip del label; pressed = escala 0.96.
   - kind 'tool' → diálogo pequeño tipo alerta del sistema (icono, título de una línea, descripción corta, un botón CTA que cierra).
   - kind 'notes' → ventana Notes: sidebar con lista (título + preview truncado, contador "N Notes") + panel de contenido. Primer ítem seleccionado por defecto.
   - kind 'link' → mailto: / LinkedIn en nueva pestaña.
4. Solo una ventana abierta a la vez en el MVP (abrir otra cierra la anterior).

INTERACCIONES — MOBILE (≤ 720px)
- Grid de carpetas a 2 columnas; el dock pasa a columna vertical fija en el lateral izquierdo.
- Tap simple abre directamente el caso como vista full-screen tipo push de iOS: header con chevron "atrás" + título corto. Sin semáforos.
- Notes y diálogos a pantalla completa o bottom sheet.
- Breakpoints a respetar: 520, 720/721, 767, 1100/1101.

ACCESIBILIDAD (no negociable)
- Carpetas y dock son <button> reales con aria-label "Nombre, Categoría".
- Focus trap dentro de cada ventana/diálogo; focus-visible siempre visible.
- Wordmark y foto del hero son decorativos para lectores (aria-label solo en el h1).
- prefers-reduced-motion: sin animaciones de entrada, sin magnificación, scroll instantáneo.
- Navegación completa con teclado: Tab por carpetas, Enter abre, Esc cierra.

ENTREGABLES
- Componentes: MenuBar, Clock, Desktop, ProjectFolder, Dock, DockItem, DockTooltip, CaseWindow, WindowChrome, CaseNav, SectionRenderer (switch por type), NotesWindow, SystemDialog, MobileCaseView.
- Estado global mínimo (useReducer o Context): selectedFolderId, openWindow {type, id}, isExpanded.
- 2 proyectos de ejemplo completos con todos los tipos de sección + 4 carpetas con datos placeholder.
- No inventes contenido de marca: usa placeholders claramente marcados [TODO] donde falte copy.
```
