# Overview

ShopItAll is a responsive product discovery dashboard built with Vue 3, TypeScript and Pinia. It retrieves product information from the Fake Store API and organizes products into category-based horizontal lists.

Users can search products by name, browse products sorted by rating, and open a dedicated detail page for each item.

# Features
- Category-based horizontal product lists
- Products sorted by rating in descending order
- Case-insensitive product-name search
- Individual product detail pages
- Responsive desktop and mobile layouts
- Loading, error, and empty-result states
- Keyboard-accessible navigation and labelled inputs
- Unit tests for product filtering, sorting and grouping

# Technology
- Vue 3 and Composition API
- TypeScript
- Pinia for shared state
- Vue Router for navigation
- Native Fetch API
- Vite
- Vitest and Vue Test Utils

# Prerequisites
Node.js: v24.14.1
npm: 11.11.0

# Project Initialization

Created project using: 
```bash
npm create vite@latest ShopItAll
```
*Selected the **Vue** framework and **TypeScript** language.*

### Depedencies Installed

Installed core project dependencies:
```bash
npm install
```

Installed **Vue Router** and **Pinia** for state management:
```bash
npm install pinia vue-router
```

Installed testing suites (Vitest & Utilities):
```bash
npm install -D vitest @vue/test-utils jsdom
```

# API
Base URL: https://fakestoreapi.com

GET /products — retrieves products
GET /products/categories — retrieves available categories
GET /products/:id — retrieves an individual product

# Folder Structure & Architecture

Created folder structure because clean architecture is main part of the application.

* **Services** - Handles communication and requests with external APIs.
* **Store** - Manages shared, global application state (Pinia).
* **Components** - Reusable UI building blocks that display data and emit user events.
* **Views** - Layouts that assemble multiple components into full pages.
* **Types** - Defines Type/Interface data for type safety.
* **Tests** - Contains tests to verify important application behaviors.

# Design Decisions
The interface uses horizontal product rows to make category browsing convenient on desktop and touch devices. Product cards are reusable, while the Pinia store keeps filtering and sorting logic out of the presentation components.

The application handles request failures and empty search results explicitly. Semantic links, labelled inputs and visible keyboard focus styles improve accessibility.