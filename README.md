# Martial Arts Events and Management Platform - Client (paused, not finished) 🥋

This is the client-side application for the Martial Arts Platform. A high-performance, designed for fans, athletes, and administrators to track news, events, fights and fighter statistics in real-time.

---

## 💻 Tech Stack

* **Framework:** [Nuxt 4](https://nuxt.com/) (Vue.js)
* **Language:** TypeScript
* **State Management:** [Pinia](https://pinia.vuejs.org/)
* **Styling:** Tailwind CSS
* **UI Components:** [Shadcn UI](https://www.shadcn-vue.com/) (Used for critical alerts and admin notifications)
* **Form Handling:** [FormKit](https://formkit.com/) & **Zod** (Schema-based validation for admin and auth and admin panel forms)
---

## ✨ Key Features

* **Dynamic Dashboard:**
* **Interactive Event Calendar:** Detailed views for upcoming and past events with fight card breakdowns.
* **News Feed:** Real-time martial arts news integrated via external APIs.
* **Main Event Spotlight:** Visual emphasis on main event fights.
* **Fighter Database:** Searchable profiles featuring physical stats, weight classes, physical data and interactive fight history.
* **Statistical Visualization:** Visual breakdown of fight data (strikes landed, knockdowns, submission attempts, and more).
* **Admin Command Center:** A full suite of tools to manage the ecosystem:
    * Create, delete and edit full events.
    * Organize or modify fight cards.
    * Update rankings, fighters data and results.

---
##  Environment Variables

To run this project, you will need to add the following variables to your `.env` file. These variables allow Nuxt to communicate with your NestJS API and manage external services.

### API Configuration
* `NUXT_PUBLIC_API_BASE`: The base URL of your NestJS backend (e.g., `http://localhost:3000`).
* `NUXT_PUBLIC_NEWS_API`: (Optional) The endpoint for the third-party martial arts news service.

### Authentication & Sessions
* `NUXT_AUTH_SECRET`: A secret key for client-side session encryption (if using Nuxt Auth modules).
* `NUXT_TOKEN_NAME`: The name used for the cookie/storage where the JWT is saved (e.g., `auth_token`).

```env
# .env Example
# The "NUXT_PUBLIC_" prefix makes these available on the client-side

NUXT_PUBLIC_API_BASE=http://apibaseurlexample/
NUXT_PUBLIC_NEWS_API_KEY=exampleapikey
NUXT_PUBLIC_NEWS_API_BASE=https://newsapibaseurl/

## API backend repo
 https://github.com/pulygarcia/way-to-belt

## 🚀 Getting Started

### 1. Installation
```bash
npm install
