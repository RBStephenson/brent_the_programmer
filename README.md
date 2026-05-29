# brent_the_programmer

A personal portfolio and creative platform showcasing hobby projects, self-care insights, and miniature artistry. Built with React, JSX, and custom CSS, designed using Claude Designer and hosted on Cloudflare.

## Features

- **Multi-page routing**: Home, Gallery, Studio, Blog, Post, About, Now, Awareness, and Contact pages
- **Customizable theme system**: Multiple theme modes (Workshop, Studio, Bone) and accent colors (Phthalo green, Burnt sienna, Lapis blue, Oxblood)
- **Typography options**: Three typeface pairings (Display, Editorial, Terminal)
- **Layout density control**: Compact, Regular, and Roomy spacing options
- **Interactive tweaks panel**: Live theme customization that persists across page reloads
- **Responsive design**: Mobile-friendly CSS with smooth animations and transitions
- **Creative elements**: Decorative washi tape styling on cards

## Tech Stack

- **Frontend Framework**: React 18 (via CDN)
- **Styling**: Custom CSS with CSS variables for theming
- **Build Tool**: Babel standalone for JSX transpilation
- **Deployment**: Cloudflare hosting

## Project Structure

```
├── index.html           # Main HTML entry point with React/Babel setup
├── app.jsx             # App shell, routing state, theme management
├── pages.jsx           # Page components (Home, Gallery, Blog, etc.)
├── components.jsx      # Reusable UI components
├── tweaks-panel.jsx    # Interactive customization panel
├── data.jsx            # Content and data definitions
├── awareness.jsx       # Awareness page component
├── studio.jsx          # Studio/creative page component
├── styles.css          # Main stylesheet with theming system
├── awareness.css       # Awareness page-specific styles
├── assets/             # Asset directory
├── screenshots/        # Screenshot directory
└── uploads/            # Uploads directory
```

## Getting Started

1. Clone the repository
2. Open `index.html` in a modern web browser
3. The site runs entirely in the browser with no build process required
4. Use the tweaks panel (accessible in the interface) to customize themes and layouts

## Theme System

The site uses CSS custom properties (variables) scoped to data attributes on the `<html>` element:
- `data-theme`: Controls overall color scheme
- `data-accent`: Sets accent color throughout the site
- `data-typepair`: Switches between font pairings
- `data-density`: Adjusts spacing and layout
- `data-tape`: Toggles decorative washi tape elements

Theme preferences are stored and persist across page reloads.

## Development

All components use React's hooks (useState, useEffect) for state management. The app uses client-side routing without external dependencies, keeping the bundle minimal and the site fast.

## License

This project is currently unlicensed. See repository for more information.
