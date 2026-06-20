### **📄 UNCAVED Genesis (`johnjaylawal.org`): Functional Specification Document (FSD)**

#### **1\. The Screen Map (The UI Forge \- Next.js 15\)**

This defines the exact App Router structure (`app/` directory) your AI agents will scaffold for the public and private interfaces.

#### **2\. Core User Flows (Execution Mechanics)**

**Flow A: The High-Ticket Visitor (The SMD/Investor)** *Target: Convert a site visitor into a consulting lead by proving undeniable competence.*

1. **Entry:** Visitor lands on `/portfolio/revenue-audit`.  
2. **Data Fetch:** Next.js uses a React Server Component (RSC) to fetch the simulated leakage data from Django (`GET /api/v1/anchors/revenue/`).  
3. **Render:** The UI Forge renders the interactive Recharts dashboard instantly (cached at the Edge).  
4. **Interaction:** The visitor adjusts a "Leakage Tolerance" slider. The D3.js chart dynamically highlights orphaned transactions in red.  
5. **Conversion:** Below the SQL code block, a CTA button ("Audit My Enterprise") triggers a `mailto:` or Calendly modal for a high-ticket consultation.

**Flow B: The John J. Lawal Ingestion Pipeline (CMS to Live)** *Target: John uploads a raw project summary and the AI pushes a finished case study live.*

1. **Entry:** John authenticates at `/forge-gate` and inputs raw project notes into the S.T.A.R. fields (Situation, Task, Action, Result).  
2. **Action:** Clicks "Generate & Publish."  
3. **Backend Logic (Django):**  
   * Validates the JWT.  
   * Packages the S.T.A.R. text and sends it to the Gemini 1.5 Pro API via Google Genkit.  
   * Receives the formatted Markdown/JSON response.  
   * Saves the record to the `PortfolioAsset` table in PostgreSQL.  
4. **Edge Revalidation:** Django sends a secure webhook to the Next.js API (`/api/revalidate?tag=library`).  
5. **Resolution:** Next.js flushes the edge cache. The new case study is immediately live on `/library` with zero manual coding.

#### **3\. API Routing Schema (The Logic Fortress \- Django DRF)**

Your AI agents must build these specific endpoints. Every response MUST strictly adhere to the `EseriaJSONRenderer` format: `{ "success": true, "message": "...", "data": {}, "errors": null }`.

* **Public Endpoints (Consumed by Next.js RSCs):**  
  * `GET /api/v1/content/anchors/` (Returns the hardcoded JSON data powering the Recharts dashboards for Anchor 1 & 2).  
  * `GET /api/v1/content/library/` (Returns the list of published `PortfolioAsset` items).  
  * `GET /api/v1/content/library/{slug}/` (Returns a specific case study).  
* **Protected Endpoints (Consumed by the Admin Forge):**  
  * `POST /api/v1/auth/login/` (Issues JWT).  
  * `POST /api/v1/content/generate-star/` (The secure endpoint that triggers the Gemini AI pipeline and saves to the database).

#### **4\. Edge Cases & Frictions (To feed the AI constraints)**

* **API Latency on AI Generation:** The Gemini API call may take 5–15 seconds. The Next.js `/forge-gate` UI *must* implement a loading skeleton or progress indicator so the user (you) does not trigger duplicate POST requests.  
* **Mobile Responsiveness on Dashboards:** Recharts/D3.js canvases break easily on mobile screens. The AI must be explicitly prompted to wrap the Anchor 1 and Anchor 2 data visualizations in responsive `div` containers with `overflow-x-auto` to allow horizontal scrolling on mobile.

---

