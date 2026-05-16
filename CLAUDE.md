# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This repository is a Hexo-based static blog (`Yolo-zzy的博客`). It uses the Butterfly theme (`hexo-theme-butterfly-dev`) along with several Hexo plugins such as categories card, swiper, and live2d.

## Common Development Commands

- **Start Local Server:** 
  ```bash
  npm run server
  ```
  Starts the local development server at `http://localhost:4000`. Hot-reloading is supported for Markdown files in `source/`.

- **Build/Generate Static Files:**
  ```bash
  npm run build
  ```

- **Clean Cache and Public Folder:**
  ```bash
  npm run clean
  ```
  Run this before building if you notice layout or caching issues.

- **Deploy:**
  ```bash
  npm run deploy
  ```
  Deploys the static assets to the configured Git repositories (e.g., GitHub Pages).

## High-Level Architecture & Structure
- **`_config.yml`**: Main Hexo configuration file. Contains site metadata, deployment settings, theme selection, and plugin configurations (e.g. `swiper`, `live2d`).
- **`source/_posts/`**: Contains the actual blog posts in Markdown format. This is where most content is created and edited.
- **`themes/`**: Contains theme files. Theme-specific configuration may be in the theme's `_config.yml` or within an override `_config.[theme-name].yml` file in the root.
- **`scaffolds/`**: Contains Markdown templates used when creating a new post, page, or draft using `hexo new`.
- **`scripts/`**: Custom Hexo scripts, generators, or helpers written in JavaScript. Hexo automatically loads scripts from this directory on startup.
- **`package.json`**: Manages node dependencies, including Hexo core, the theme, and various Hexo plugins.
- **`public/`** (Generated): Output directory for static files after running `npm run build`. Ignored by git in the source branch.
- **`.deploy_git/`**: Used by `hexo-deployer-git` to build the git commit for deployment.

## Development Workflow
- To write a new post, you can use `npx hexo new "Post Title"` or simply create a `.md` file in `source/_posts/`.
- Ensure new posts include frontmatter (title, date, tags, categories) based on the template in `scaffolds/post.md`.