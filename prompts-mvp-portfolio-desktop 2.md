# MVP Portfolio "Desktop" — Prompts


---

## Prompt 2 — Diseño (UI, tokens, motion)

```
Aplica el sistema visual al MVP del portfolio "desktop OS" ya construido. No cambies estructura ni lógica; trabaja solo en tokens, estilos y motion. Define todo como custom properties en :root y consúmelas desde los componentes; cero valores hardcodeados fuera de los tokens.

DIRECCIÓN
Fidelidad macOS contemporáneo, sobria y editorial: el chrome del sistema es neutro y casi invisible; el protagonismo lo tienen la foto del autor y la tipografía grande dentro de cada caso. Cada caso puede tener su propio tema sin romper el chrome común.

TOKENS BASE
- Color: --ink #202020 · --muted #818181 · --system-blue #0a84ff · --menu-bg rgba(249,248,246,.94) · --window-bg #f5f4ef · --surface-dark #1c1b1f · --accent (por caso; ej. violeta #6b4fd8 para fintech) · --status-green.
- Tipografía: stack de sistema (-apple-system, "SF Pro Display", "SF Pro Text", Inter, Arial, sans-serif). Pesos 400/500/600/700.
  - Wordmark hero: ~78px (clamp en mobile), weight 500, mayúsculas, letter-spacing ~0.25em, blanco 96% sobre la foto.
  - Display de caso (hero): 64–72px, weight 700, tracking negativo (-0.03em), line-height ~0.95, saltos de línea intencionados.
  - Heading de sección: 40–48px, weight 700, tracking -0.02em.
  - Eyebrow / label de sección: 12–13px, weight 600, mayúsculas, letter-spacing 0.12em, color --accent. Formato "01 / OVERVIEW".
  - Body: 15–16px, line-height 1.55, color --ink o --muted.
- Radios: ventana 13px · cards 16–20px · dock 20px · chips/pills 999px.
- Sombras de ventana (3 capas): 0 32px 90px rgba(19,16,24,.34), 0 5px 20px rgba(19,16,24,.16), inset 0 0 0 .5px rgba(255,255,255,.72).
- Espaciado: escala de 4px; padding lateral de secciones de caso 64px desktop / 20px mobile; separación vertical entre secciones 96–120px.

ESCRITORIO
- Menu bar: fondo crema translúcido, borde inferior hairline, monograma bold 14px, reloj 13px tabular-nums con punto verde de estado.
- Hero: foto full-bleed tratada (tono rosado/lila desaturado, doble exposición o ghosting horizontal sutil) + overlay lineal con brillo blanco 8–9% en los bordes laterales.
- Carpetas: icono de carpeta azul macOS (~64px) con sombra suave; label blanco con text-shadow; seleccionada = label sobre pill --system-blue. Hover: translateY(-3px) scale(1.04) + drop-shadow más profunda.
- Dock: contenedor glass (blur + borde claro), iconos 44px con radio de squircle, separador vertical fino entre grupos, tooltip oscuro tipo pill sobre el icono.

VENTANA DE CASO
- Title bar ~38px, gradiente gris claro muy sutil, semáforos 12px (#ff5f57, #febc2e, #28c840), título 13px weight 600 centrado.
- Sub-nav: fondo blanco roto, ítems 12–13px weight 500 --muted; activo = pill con fondo tintado del --accent al 12% y texto --accent.
- Ritmo de secciones: alternar fondos claro (--window-bg) y oscuro (--surface-dark, texto blanco, eyebrow en --accent aclarado) para marcar capítulos.
- Hero de caso: fondo con gradiente radial suave del --accent (lila/lavanda), display a la izquierda, mockup/card glass a la derecha, tags como pills blancas con borde fino.
- Layout de secciones: grid 2 columnas (heading izquierda / body + listas derecha). Listas numeradas con número pequeño en --accent y separadores hairline.
- Cards de proceso: 4 columnas, fondo blanco con gradiente leve, radio 16px, número tenue arriba, título 18px weight 600, descripción 13px --muted.
- Solution: sección oscura, features alternando texto/pantallas, pantallas de app en contenedor oscuro redondeado.
- Outcomes: métricas en cards con cifra 48–56px weight 700 en --accent oscuro, label 13px debajo.
- Variante dark (ej. caso con vídeo): fondo negro, sub-nav en mayúsculas con tracking amplio, acentos verdes tipo instrumento científico.

DIÁLOGOS Y NOTES
- Diálogo del dock: estilo alerta macOS oscura (fondo #2a2a2c ~92%, radio 12px), icono de app 40px, título 14px bold blanco, texto 12px gris claro, botón primario --system-blue alineado a la derecha.
- Notes: sidebar gris claro con ítem activo resaltado, títulos 13px bold + preview 12px --muted en 2 líneas; panel de contenido blanco con H1 28px bold.

MOTION (respetar prefers-reduced-motion)
- Abrir ventana de caso: opacity 0→1, translateY +14px→0, scale .985→1, ~280ms cubic-bezier(.2,.8,.2,1).
- Expandir (verde): opacity .78→1, scale .985→1, ~240ms.
- Notes / diálogo del dock: translateY 9–10px→0, scale .985–.988→1, ~220ms.
- Dock: magnificación con escala calculada por distancia al cursor (var --dock-scale); pressed 45ms.
- Hover de carpeta: 160ms ease-out.
- Scroll interno suave para las anclas de la sub-nav.

MOBILE
- Vista de caso tipo iOS: header blanco con chevron azul y título centrado 15px semibold; display escala a ~44px.
- Dock vertical en el lateral izquierdo, mismo tratamiento glass.

CHECK FINAL
- Contraste AA en todo el texto (atención al label blanco de carpetas y al body --muted sobre crema).
- Estados hover, focus-visible, pressed, selected y disabled definidos para carpetas, dock, semáforos y sub-nav.
- Entrega una página /tokens interna que muestre la paleta, la escala tipográfica y los radios para validar el sistema.
```

---

### Notas de análisis

- La referencia está construida con Vite (CSS con hash), sin framework visible en el DOM, una sola página y sin scroll de documento: todo vive en ventanas con scroll interno.
- Cada caso de estudio es una plantilla con secciones numeradas `NN / LABEL` y temas por proyecto (YAP en lila claro, Birdwatcher en negro con vídeo).
- Riesgo de la metáfora: el doble clic para abrir no es intuitivo para todos. La referencia lo resuelve en mobile con un solo toque; plantéate admitir también un solo clic en desktop.
