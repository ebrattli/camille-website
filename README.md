# Camille's Digital Marketing Website

A modern, responsive landing page for Camille's digital marketing business built with Astro, TailwindCSS, and DaisyUI.

## 📋 Project Overview

This website serves as a professional landing page for a digital marketing business, featuring:

- Home page with service highlights and call-to-action sections
- About page with founder profile, mission, and values
- Services page with detailed service packages and process steps
- Contact page with form, map, and business information
- Responsive design optimized for all devices

## 🛠️ Technologies

- [Astro](https://astro.build/) - Fast, modern static site generator
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [DaisyUI](https://daisyui.com/) - Component library for TailwindCSS
- [Astro Icon](https://github.com/natemoo-re/astro-icon) - Icon integration for Astro
- [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager
- [mise](https://mise.jdx.dev/) - Runtime version manager (for Node.js and pnpm)

## 🚀 Getting Started

### Prerequisites

- [mise](https://mise.jdx.dev/) - For managing Node.js and pnpm versions

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/camille-website.git
   cd camille-website
   ```

2. Install dependencies:
   ```bash
   # mise will automatically install the correct versions of Node.js and pnpm
   # as specified in mise.toml
   mise install

   # Then install project dependencies
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open your browser and visit [http://localhost:4321](http://localhost:4321)

## 📂 Project Structure

```
/
├── public/             # Static assets (images, fonts, etc.)
│   └── favicon.svg     # Site favicon
├── src/                # Source code
│   ├── components/     # Reusable UI components
│   ├── layouts/        # Page layouts
│   ├── pages/          # Page components (routes)
│   └── styles/         # Global styles
├── astro.config.mjs    # Astro configuration
├── mise.toml           # mise configuration for Node.js and pnpm versions
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies and scripts
```

## 🧞 Commands

| Command           | Action                                           |
| :---------------- | :----------------------------------------------- |
| `mise install`    | Installs required Node.js and pnpm versions      |
| `pnpm install`    | Installs dependencies                            |
| `pnpm dev`        | Starts local dev server at `localhost:4321`      |
| `pnpm build`      | Build your production site to `./dist/`          |
| `pnpm preview`    | Preview your build locally, before deploying     |
| `pnpm astro ...`  | Run CLI commands like `astro add`, `astro check` |

## 🔧 Development

### Version Management

This project uses [mise](https://mise.jdx.dev/) to manage Node.js and pnpm versions. The configuration is in `mise.toml`:

```toml
[tools]
node = "latest"
pnpm = "latest"
```

When you run `mise install` in the project directory, mise will automatically install the specified versions of Node.js and pnpm.

### Adding New Pages

Create a new `.astro` file in the `src/pages/` directory. The file name will determine the route.

```astro
---
import Layout from '../layouts/Layout.astro';
import PageHero from '../components/PageHero.astro';
---

<Layout title="New Page">
  <PageHero title="New Page" />
  <main class="container mx-auto px-4 py-8">
    <!-- Your content here -->
  </main>
</Layout>
```

### Creating Components

Add new components in the `src/components/` directory:

```astro
---
// Define your component props
interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">{title}</h2>
    <p>{description}</p>
  </div>
</div>
```

### Styling

This project uses TailwindCSS for styling. Global styles are defined in `src/styles/global.css`.

## 🚢 Deployment

Build the site for production:

```bash
pnpm build
```

The built site will be in the `dist/` directory, ready to be deployed to your hosting provider of choice.

## 📝 License

[MIT](LICENSE)
