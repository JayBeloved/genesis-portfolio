# The UI Forge (genesis-frontend)

This is the frontend component of the **ESERIA Sovereign Architecture**. It is a highly optimized, Next.js 15 application built to showcase expertise, industry relevance, and engineering mastery.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Data Fetching:** Axios (with custom JWT interceptors)

## Getting Started

First, install the dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
*(Note: The `dev` script is currently configured to use host `johnjaylawal.local` if your environment supports it.)*

## Key Architectural Features
- **Dynamic Theming:** Consumes tenant-specific JSON configurations from the backend to instantly re-theme the application via injected CSS variables.
- **The Engineering Altar:** An interactive CLI interface embedded into the UI for executing advanced directives and simulating terminal environments.
- **JWT Interception:** Secure, centralized Axios instance for seamless, authenticated API communication with the Logic Fortress.
- **Premium Aesthetics:** Utilizes a custom, visually rich design system tailored for high-end portfolio presentations.
