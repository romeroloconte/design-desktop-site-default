# Design Desktop Site

Portfolio personal de Product Designer de **Luis Romero**, construido con la metáfora de un escritorio de sistema operativo (estilo macOS): barra de menú, carpetas de proyecto, ventanas de case study y dock.

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

## Contenido

Los proyectos se definen en `src/content/projects.ts` siguiendo los tipos de `src/content/types.ts`. Cada proyecto se compone de secciones tipadas (hero, intro, lista numerada, proceso, etc.) que renderiza `SectionRenderer`.

## Licencia

Todos los derechos reservados © Luis Romero.
