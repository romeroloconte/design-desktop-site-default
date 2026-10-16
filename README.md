# Design Desktop Site

Plantilla de portfolio personal, construida con la metáfora de un escritorio de sistema operativo (estilo macOS): barra de menú, carpetas de proyecto, ventanas de case study y dock.

## Características

- Escritorio interactivo con carpetas por proyecto que abren ventanas de case study.
- Barra de menú con indicador de disponibilidad y reloj en vivo.
- Dock con herramientas, apps propias y enlaces externos.
- Spotlight, panel de widgets, notas y página de tokens de diseño.
- Vista adaptada para móvil.
- Contenido tipado en `src/content`, sin backend.

## Stack

- [Vite](https://vite.dev) + [React](https://react.dev) + TypeScript
- [Motion](https://motion.dev) para animaciones
- CSS plano con custom properties
- [Oxlint](https://oxc.rs) para linting

## Empezar

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

## Scripts

| Comando           | Descripción                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Servidor de desarrollo con HMR       |
| `npm run build`   | Type-check y build de producción     |
| `npm run preview` | Sirve localmente el build            |
| `npm run lint`    | Ejecuta Oxlint                       |

## Estructura

```
src/
├─ components/   Desktop, Dock, MenuBar, ventanas, Spotlight, widgets…
├─ content/      Proyectos, dock y tipos de datos
├─ hooks/        Hooks compartidos
├─ styles/       Estilos y tokens
├─ state.ts      Estado global
└─ main.tsx      Punto de entrada
public/          Iconos, imágenes y assets estáticos
```

## Personalizar con tu data

Todo el contenido personal vive en `src/content/`. Busca `[TODO]` para ver qué falta completar.

1. **`src/content/dock.ts` → `author`**: nombre, monograma, rol, titular, disponibilidad y links. La barra de menú, el título de la pestaña, About This Mac y la tarjeta de perfil leen de aquí.
   - `links.website` apunta a [romeroloconte.com](https://romeroloconte.com/) (autor de la plantilla) hasta que pongas el tuyo.
   - `links.github`, `links.linkedin` y `links.spotifyPlaylist` vienen vacíos: mientras lo estén, su ventana muestra una tarjeta que indica dónde agregarlos.
2. **`src/content/dock.ts` → `notes`**: About, Interests, CV y Certifications de la app Notes.
3. **`src/content/dock.ts` → `dockItems`**: textos de los diálogos de cada app del dock (agrega o quita apps).
4. **`src/content/projects.ts`**: tus case studies.
5. **`public/images/`**: fondos de escritorio y móvil.

## Créditos

Plantilla diseñada y desarrollada por [Luis Romero](https://romeroloconte.com/). El crédito aparece en About This Mac (`credit` en `src/content/dock.ts`).

## Contenido

Los proyectos se definen en `src/content/projects.ts` siguiendo los tipos de `src/content/types.ts`. Cada proyecto se compone de secciones tipadas (hero, intro, lista numerada, proceso, etc.) que renderiza `SectionRenderer`.

