### **📄 UNCAVED Genesis (`johnjaylawal.org`): Agentic Prompts & User Stories**

#### **Epic 1: The Logic Fortress (Django Backend Foundation)**

**User Story:** As the Principal (John), I need a secure, headless CMS to manage my identity and portfolio assets without relying on third-party SaaS platforms.

**📋 Copy & Paste to Cursor (Backend Repository):**

"Act as an elite Django/Python Enterprise Architect. We are building the 'Logic Fortress' for a headless CMS.

1. Initialize a Django 4.2 project with Django REST Framework.  
2. Create a custom user model called `SovereignUser` that inherits from `AbstractUser` but strictly uses `email` as the unique identifier (remove `username`).  
3. Configure `djangorestframework-simplejwt` for authentication.  
4. Create a `PortfolioAsset` model with the following fields: `id` (UUID), `title` (Char), `slug` (Slug), `anchor_type` (Choice: Audit, Intelligence, Standard), `raw_star_data` (JSON), `published_content` (Markdown/Text), and `is_live` (Boolean).  
5. CRITICAL: Create a custom DRF Renderer called `EseriaJSONRenderer`. Every single API response must be intercepted and formatted exactly like this: `{ "success": boolean, "message": string, "data": payload, "errors": null }`."

#### **Epic 2: The STAR AI Ghostwriter (Genkit/Gemini Integration)**

**User Story:** As the Principal, I want to paste raw project notes into a secure portal and have an AI agent format it into a high-ticket, SEO-optimized case study automatically.

**📋 Copy & Paste to Cursor (Backend Repository):**

"Act as a Senior Python AI Engineer. I need to build the S.T.A.R. (Situation, Task, Action, Result) Ingestion API.

1. Create a protected POST endpoint at `/api/v1/content/generate-star/`.  
2. The endpoint will receive a JSON payload with `situation`, `task`, `action`, and `result` strings.  
3. Write a service function that passes this data to the Google Gemini 1.5 Pro API (or Google Genkit).  
4. The AI prompt must instruct the model to act as an executive copywriter and return a structured JSON response containing a `catchy_title`, `executive_summary`, and a `detailed_markdown_body`.  
5. Save the generated response to the `PortfolioAsset` model we created earlier and return the saved object using the `EseriaJSONRenderer`."

#### **Epic 3: The UI Forge (Next.js Foundation & Interceptors)**

**User Story:** As a visitor, I want a lightning-fast, visually authoritative interface that proves the Principal's mastery of modern web architecture.

**📋 Copy & Paste to Cursor (Frontend Repository):**

"Act as a Lead Next.js 15 Architect. We are building the 'UI Forge' using the App Router, TypeScript, and Tailwind CSS.

1. Set up a dark-mode, minimalist design system (think Bloomberg Terminal meets architectural digest).  
2. Create a global Axios instance (`src/lib/api.ts`).  
3. Configure an Axios request interceptor that attaches a Bearer token from cookies to all outbound requests to our Django API.  
4. Configure a response interceptor that unpacks our custom `{ success, message, data, errors }` backend payload, returning only the `data` object to the components, and globally catching 401 errors.  
5. Scaffold the following empty routes: `/` (Home), `/portfolio/revenue-audit`, `/portfolio/ai-job-scraper`, and `/forge-gate` (Admin Login)."

#### **Epic 4: Anchor 1 \- The Revenue Leakage Audit (D3/Recharts)**

**User Story:** As an enterprise client, I want to interact with a live data dashboard that proves John's ability to find hidden revenue using advanced SQL and Python.

**📋 Copy & Paste to Cursor (Frontend Repository):**

"Act as an elite Data Visualization Engineer. I need to build an interactive React component for the `/portfolio/revenue-audit` route using Recharts (or D3.js).

1. Create a simulated dataset of 4 enterprise divisions showing 'Captured Revenue', 'Unbilled Revenue', and 'Orphaned Transactions'.  
2. Build a dashboard with a 'Leakage Tolerance Threshold' slider (1% to 15%).  
3. Render a dynamic Bar Chart comparing Captured vs. Leaked revenue. If the leakage exceeds the slider's threshold, trigger a visible UI alert ('Critical Leakage Detected').  
4. Below the chart, render a styled `<CodeBlock>` component (using Prism.js or similar) that displays a complex SQL Window Function (e.g., `SUM() OVER (PARTITION BY... )`) which I allegedly used to identify the orphaned transactions. Ensure the layout is fully responsive."

