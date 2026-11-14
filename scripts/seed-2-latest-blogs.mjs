/**
 * Seed script to publish 2 new FlutterFlirt service-related blogs into production database.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.flutterflirt.com";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@flutterflirt.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "memyselfherog@123";

const NEW_TWO_BLOGS = [
  // 1. AI & Autonomous Agents in Enterprise Software
  {
    title: "Deploying Autonomous AI Agents in Enterprise ERP: From Reactive Queries to Proactive Operations",
    slug: "deploying-autonomous-ai-agents-in-enterprise-erp-systems",
    excerpt: "How forward-thinking enterprises integrate Microsoft Copilot Studio and autonomous agentic workflows into Dynamics 365 to automate inventory forecasting, invoice approvals, and anomaly detection.",
    cover_image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    category: "AI & Automation",
    author: "FlutterFlirt AI Practice",
    featured: false,
    status: "published",
    sections: [
      {
        heading: "The Shift from Passive Dashboards to Autonomous Action",
        slug: "the-shift-from-passive-dashboards-to-autonomous-action",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Traditional ERP systems are exceptional systems of record, yet they remain largely reactive. Operations directors spend countless hours reviewing transaction reports, flagging supply chain bottlenecks, and chasing down manual approval sign-offs. In 2026, the convergence of large language models and enterprise transactional databases is rewriting this paradigm.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "FlutterFlirt’s AI Practice engineers autonomous agentic pipelines that sit natively on top of Microsoft Dynamics 365 and Dataverse. Instead of human operators manually reconciling anomalies, AI agents continuously monitor ledger variance, simulate cash-flow scenarios, and suggest corrective purchase orders in real time.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "High-Impact Use Cases for AI Agents in Dynamics 365",
        slug: "high-impact-use-cases-for-ai-agents-in-dynamics-365",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "By pairing Copilot Studio with secure Azure OpenAI endpoints and semantic search over enterprise documents, organizations unlock tangible productivity gains without compromising proprietary corporate data.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "• Autonomous Three-Way Matching: AI agents verify line items across purchase orders, receiving slips, and vendor invoices—flagging price disparities and routing exceptions instantly.\n• Predictive Stock Replenishment: Evaluating historical seasonal velocity, supplier lead-time variances, and external market signals to suggest optimal safety stock thresholds.\n• Conversational ERP Queries: Enabling executives to query complex financial ledgers in plain English via Microsoft Teams without writing SQL queries or navigating nested menus.\n• Predictive Field Maintenance: Triaging telemetry from edge IoT sensors to dispatch field technicians before hardware failures trigger costly downtime.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "Governance, Security, and Grounded Accuracy",
        slug: "governance-security-and-grounded-accuracy",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Enterprise AI adoption requires strict governance boundaries. FlutterFlirt implements multi-layered security frameworks ensuring agent actions are strictly bounded by Role-Based Access Controls (RBAC), auditable transaction logs, and mandatory human-in-the-loop approvals for high-value financial thresholds.",
                },
              ],
            },
          ],
        },
      },
    ],
  },

  // 2. Headless B2B Commerce & Next.js ERP Integration
  {
    title: "Building Modern Headless B2B Portals: Connecting Next.js with Dynamics 365 and Business Central",
    slug: "building-modern-headless-b2b-portals-with-nextjs-and-dynamics-365",
    excerpt: "Why enterprise distributors, wholesalers, and manufacturers are replacing monolithic customer portals with lightning-fast, custom Next.js storefronts connected to ERP backends.",
    cover_image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&auto=format&fit=crop&q=80",
    category: "Custom Development",
    author: "FlutterFlirt Web Architecture Practice",
    featured: false,
    status: "published",
    sections: [
      {
        heading: "The Flaws of Monolithic B2B Web Portals",
        slug: "the-flaws-of-monolithic-b2b-web-portals",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Wholesale buyers and business clients expect digital experiences as frictionless as modern consumer e-commerce. However, traditional B2B web portals bundled with legacy ERP platforms are notoriously slow, difficult to navigate on mobile devices, and resistant to UI customizations.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "FlutterFlirt decouples the user experience from the back-office transactional engine using a headless architecture: a tailored, high-performance Next.js frontend communicating with Microsoft Dynamics 365 via secure, high-throughput caching microservices.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "Key Architecture Pillars of Headless B2B Experiences",
        slug: "key-architecture-pillars-of-headless-b2b-experiences",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Developing a headless B2B portal requires balancing sub-second page performance with complex enterprise business logic like tiered pricing, credit limit validations, and custom invoice terms.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "• Sub-Second Server-Side Rendering: Pages render instantaneously using Next.js Server Components and incremental static regeneration (ISR).\n• Real-Time Tiered Pricing Engines: Custom API middleware calculates customer-specific discount contracts directly from Dynamics 365 without bogging down ERP CPUs.\n• Self-Service Document Hubs: Instant access to historical invoices, tax receipts, shipment tracking numbers, and warranty certificates.\n• Frictionless Reordering: Quick-order CSV uploads, barcode scanning via mobile cameras, and automated replenishment schedule configurations.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "The FlutterFlirt Headless Deployment Advantage",
        slug: "the-flutterflirt-headless-deployment-advantage",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Our cross-functional teams bring deep mastery of both React/Next.js frontend engineering and Microsoft Dynamics data models. By shielding your core ERP from direct web traffic while delivering bespoke digital storefronts, we help enterprises scale sales volume, delight business customers, and future-proof their digital channels.",
                },
              ],
            },
          ],
        },
      },
    ],
  },
];

async function runSeed() {
  console.log("=========================================");
  console.log("🌱 FlutterFlirt 2 New Service Blogs Seed");
  console.log("=========================================\n");

  console.log("Target API: " + API_URL);

  let token = null;

  try {
    const authRes = await fetch(API_URL + "/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
    });

    if (authRes.ok) {
      const authData = await authRes.json();
      token = authData.token || (authData.data && authData.data.token) || null;
      console.log("✅ Admin authentication successful!");
    } else {
      console.error("❌ Authentication failed:", await authRes.text());
      return;
    }
  } catch (err) {
    console.error("❌ Network error: " + err.message);
    return;
  }

  if (token) {
    console.log("\nInserting " + NEW_TWO_BLOGS.length + " blogs into database...\n");
    for (const blog of NEW_TWO_BLOGS) {
      try {
        const res = await fetch(API_URL + "/api/admin/blogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(blog),
        });
        const resJson = await res.json();
        if (res.ok && resJson.success !== false) {
          console.log("✅ Successfully seeded blog: \"" + blog.title + "\"");
        } else {
          console.error("⚠️  Failed for \"" + blog.title + "\":", resJson);
        }
      } catch (err) {
        console.error("❌ Failed to post blog \"" + blog.title + "\":", err.message);
      }
    }
  }

  console.log("\n🎉 Both blogs published successfully!");
}

runSeed();
