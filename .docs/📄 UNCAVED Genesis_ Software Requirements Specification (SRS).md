### **📄 UNCAVED Genesis (johnjaylawal.org): Software Requirements Specification (SRS)**

#### **1\. System Overview & Architecture**

The platform is a single-tenant, headless portfolio and CMS built on the **ESERIA Sovereign Architecture**.

* **The Logic Fortress (Backend):** Django 4.2 LTS \+ Django REST Framework (DRF) \+ PostgreSQL. This serves as a Headless CMS and the AI processing engine.  
* **The UI Forge (Frontend):** Next.js 15 (App Router) \+ TypeScript \+ Tailwind CSS. This acts purely as the presentation layer, consuming the DRF API.  
* **The Interface Contract:** All API responses from Django to Next.js must strictly adhere to the EseriaJSONRenderer standard: { "success": boolean, "message": string, "data": object|array, "errors": null|array }.

#### **2\. Functional Requirements (The Core Engine)**

**2.1. Sovereign CMS & Identity (Django Admin)**

* **Requirement:** John J. Lawal must have a secure, private backend to upload case studies, edit the "Anchor" dashboards, and manage the digital library without touching code.  
* **Execution:** Implement a customized Django Admin panel. Authentication relies on the SovereignUser model (email-only). The backend exposes CRUD (Create, Read, Update, Delete) endpoints via DRF for PortfolioAsset, LibraryArticle, and SkillMetric models.

**2.2. The STAR AI Ghostwriter (Genkit/Gemini Pipeline)**

* **Requirement:** The backend must automate the generation of high-ticket case studies from raw inputs to save the Principal's time.  
* **Execution:** A secured Django endpoint (POST /api/v1/generate-case-study/) accepts raw JSON containing S.T.A.R. (Situation, Task, Action, Result) text. Django routes this to Google Genkit (Gemini 1.5 Pro), prompting the AI to return a board-ready, SEO-optimized HTML/Markdown string, which is then saved to the PostgreSQL database.

**2.3. Interactive Data Anchors (Frontend Visualizations)**

* **Requirement:** The portfolio must physically demonstrate Data Science and Financial Engineering competence, not just list them as skills.  
* **Execution:** The Next.js frontend will utilize **Recharts** or **D3.js** components to render the "Revenue Leakage Audit" and "2026 Data Job Reality" dashboards. The data for these visualizations will be served dynamically from the Django API, proving full-stack data integration.

#### **3\. The DevOps & CI/CD Matrix (Zero-Touch Deployment)**

To meet the 4-day launch window, deployment must be fully automated. The "Army of One" relies on Continuous Integration and Continuous Deployment.

| Component | Platform / Tool | CI/CD Trigger Logic |
| :---- | :---- | :---- |
| **Version Control** | GitHub | Two isolated repositories: jjl-genesis-ui and jjl-genesis-api. |
| **Frontend Deployment** | Vercel | Pushes to the main branch of the Next.js repo automatically trigger Edge builds. Next.js Incremental Static Regeneration (ISR) ensures instantaneous updates when the CMS changes. |
| **Backend Deployment** | Render (or AWS App Runner) | Pushes to the main branch of the Django repo automatically trigger Docker container rebuilds and database migrations. |
| **Database** | Supabase (Managed Postgres) | Hosted PostgreSQL database connected securely via connection pooling to the Django backend. |
| **Media Storage** | AWS S3 / Cloudinary | All images, slide decks, and PDFs managed via the Django CMS are routed to scalable cloud buckets. |

#### **4\. Non-Functional Requirements & Security**

* **Generative Engine Optimization (GEO):** Next.js must dynamically generate metadata (Title, Description, OpenGraph, JSON-LD schema) for every case study and library article to ensure AI search engines (SearchGPT, Perplexity) scrape johnjaylawal.org as the primary authority.  
* **Performance:** The UI Forge must achieve a Google Lighthouse performance score of 95+. Static elements must be cached at the Edge.  
* **Security:** The Django REST API must be secured using JWT (djangorestframework-simplejwt). Read endpoints (GET) for the portfolio are public; Write endpoints (POST, PATCH, DELETE) are strictly protected and require John's admin token.

---

**The Agentic Build Prompt (For your AI Swarm):**

*"AI, we are initializing the Genesis Block for johnjaylawal.org. You are an elite Enterprise Architect. We are building a headless CMS using Django 4.2 DRF and Next.js 15\. Your first task is to initialize the Django backend. Create the SovereignUser model (email-based auth) and a PortfolioAsset model with fields for title, category, STAR\_raw\_data, and ai\_generated\_content. Implement the EseriaJSONRenderer for all API responses. Generate the code."*

