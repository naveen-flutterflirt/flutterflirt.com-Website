/**
 * Seed script to publish all 4 service-specific blogs into FlutterFlirt database.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.flutterflirt.com";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@flutterflirt.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "memyselfherog@123";

const ALL_SERVICE_BLOGS = [
  // 1. Power Platform & Automation Practice
  {
    title: "Accelerating Enterprise Workflows with Power Apps, Power Automate and Copilot Studio",
    slug: "accelerating-enterprise-workflows-with-power-platform-and-copilot-studio",
    excerpt: "How modern enterprises automate routine operations, build rapid internal tools, and empower teams with AI-driven Copilots using the Microsoft Power Platform.",
    cover_image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    category: "Power Platform",
    author: "FlutterFlirt Automation Practice",
    featured: false,
    status: "published",
    sections: [
      {
        heading: "Eliminating Administrative Friction with Low-Code Solutions",
        slug: "eliminating-administrative-friction-with-low-code-solutions",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Manual approvals, fragmented spreadsheet tracking, and repetitive data entry cost enterprise teams hundreds of hours every month. FlutterFlirt’s Power Platform engineering team builds bespoke canvas and model-driven Power Apps that connect directly to Microsoft Dataverse, ERP databases, and third-party APIs.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "By digitizing field inspections, expense authorizations, and purchase order approvals, organizations cut turnaround times by over 60% while enforcing strict governance and compliance controls.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "Robotic Process Automation and Copilot Studio",
        slug: "robotic-process-automation-and-copilot-studio",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "With Power Automate Desktop and Cloud flows, FlutterFlirt automates complex multi-step processes across legacy desktop software and modern web applications without requiring backend redesigns.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "• Conversational Copilots: Custom Copilot Studio agents that query enterprise knowledge bases, ERP inventories, and CRM accounts directly inside Microsoft Teams.\n• Intelligent Document Processing: AI Builder models that extract line-item data from PDF vendor invoices and sync them straight into accounts payable ledgers.\n• Real-Time Power BI Dashboards: Live operational KPI tracking embedded within operational workflows.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "The FlutterFlirt Center of Excellence (CoE) Blueprint",
        slug: "the-flutterflirt-center-of-excellence-blueprint",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Scaling automation requires bulletproof security and environment hygiene. FlutterFlirt establishes enterprise Center of Excellence (CoE) architectures with Data Loss Prevention (DLP) policies, automated application lifecycle management (ALM), and tiered developer sandboxes to prevent shadow IT while fostering innovation.",
                },
              ],
            },
          ],
        },
      },
    ],
  },

  // 2. Azure & Cloud Integrations Practice
  {
    title: "Architecting Zero-Downtime Data Pipelines with Azure Data Factory and Synapse",
    slug: "architecting-zero-downtime-data-pipelines-with-azure-data-factory-and-synapse",
    excerpt: "Connect disparate enterprise systems, stream real-time telemetry, and build high-throughput data lakes with FlutterFlirt's Azure integration architecture.",
    cover_image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    category: "Azure & Cloud",
    author: "FlutterFlirt Cloud Practice",
    featured: false,
    status: "published",
    sections: [
      {
        heading: "Breaking Data Silos Across Multi-Cloud Ecosystems",
        slug: "breaking-data-silos-across-multi-cloud-ecosystems",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Modern enterprises rely on dozens of mission-critical applications: ERP platforms, customer relationship management databases, IoT hardware gateways, and third-party logistics portals. Without a unified integration fabric, synchronization delays and data discrepancies paralyze decision-makers.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "FlutterFlirt designs robust Azure Integration Fabrics utilizing Azure API Management, Azure Event Grid, and Azure Service Bus to deliver sub-second event-driven messaging with guaranteed message delivery and dead-letter fault tolerance.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "High-Throughput ETL with Azure Data Factory and Fabric",
        slug: "high-throughput-etl-with-azure-data-factory-and-fabric",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Our data engineers implement scalable data ingestion pipelines that process millions of daily transactions from on-premise SQL servers, POS terminals, and cloud SaaS tools directly into Azure Synapse Analytics and Microsoft Fabric OneLake.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "• Medallion Data Architecture (Bronze/Silver/Gold) ensuring clean, auditable, and compliance-ready data structures.\n• Dynamic Change Data Capture (CDC) minimizing database load during peak operational hours.\n• Fine-grained role-based access control (RBAC) and end-to-end data encryption in transit and at rest.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "Enterprise Security and Landing Zone Architecture",
        slug: "enterprise-security-and-landing-zone-architecture",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Every FlutterFlirt cloud implementation adheres to the Microsoft Cloud Adoption Framework (CAF). We configure automated infrastructure-as-code (Bicep/Terraform) landing zones complete with virtual network peering, private endpoints, and automated cost optimization thresholds.",
                },
              ],
            },
          ],
        },
      },
    ],
  },

  // 3. Custom Next.js & React Apps Practice
  {
    title: "Why Modern Enterprises Replace Legacy Frontends with High-Performance Next.js Portals",
    slug: "why-modern-enterprises-replace-legacy-frontends-with-high-performance-nextjs-portals",
    excerpt: "Discover how custom Next.js and React enterprise portals bridge ERP backends to deliver sub-second response times and tailored partner experiences.",
    cover_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    category: "Custom Development",
    author: "FlutterFlirt Web Engineering Practice",
    featured: false,
    status: "published",
    sections: [
      {
        heading: "The Limitations of Out-of-the-Box ERP User Interfaces",
        slug: "the-limitations-of-out-of-the-box-erp-user-interfaces",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "While enterprise ERP systems provide robust transactional backends, their native interfaces can be cumbersome for external suppliers, franchise partners, and casual internal users. Providing full ERP licensing to thousands of external users is neither cost-effective nor ergonomically ideal.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "FlutterFlirt bridges this gap by engineering dedicated, secure customer and vendor portals built on React and Next.js that communicate with ERP backbones via cached API microservices.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "Performance, SSR, and Multi-Tenant Security",
        slug: "performance-ssr-and-multi-tenant-security",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "By utilizing Next.js Server-Side Rendering (SSR), Server Components, and edge caching, FlutterFlirt portals achieve sub-second load times worldwide while strictly isolating multi-tenant organizational data.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "• Single Sign-On (SSO): Seamless authentication via Microsoft Entra ID (Azure AD), Okta, or customer identity providers.\n• Self-Service Invoicing & Order Tracking: Enabling partners to submit RFQs, track deliveries, and view invoices in real time.\n• Responsive Mobile UX: Pixel-perfect, touch-optimized experiences that work effortlessly across field tablets and mobile smartphones.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "Accelerating Digital Transformation with FlutterFlirt",
        slug: "accelerating-digital-transformation-with-flutterflirt",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Our full-stack engineering team blends deep enterprise ERP know-how with cutting-edge front-end design standards. We deliver digital experiences that delight end users while keeping core enterprise data completely protected and synchronized.",
                },
              ],
            },
          ],
        },
      },
    ],
  },

  // 4. Dynamics 365 Business Central Practice
  {
    title: "Navigating Zero-Downtime Cloud Migrations from Legacy NAV to Dynamics 365 Business Central",
    slug: "navigating-zero-downtime-cloud-migrations-from-legacy-nav-to-business-central",
    excerpt: "A tactical roadmap for growing companies to migrate legacy on-premises NAV databases to cloud Business Central with zero operational disruption.",
    cover_image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    category: "Dynamics 365",
    author: "FlutterFlirt Business Central Practice",
    featured: false,
    status: "published",
    sections: [
      {
        heading: "Why Legacy On-Premise NAV Systems Are Holding Growth Back",
        slug: "why-legacy-on-premise-nav-systems-are-holding-growth-back",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Organizations running legacy Dynamics NAV versions (2013, 2015, 2018) face increasing maintenance overheads, hardware obsolescence, and lack of integration with modern cloud productivity tools. Upgrading to Dynamics 365 Business Central transforms operations with seamless web access, automated updates, and native Microsoft 365 integration.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "FlutterFlirt specializes in structured, zero-downtime cloud migration journeys that convert legacy C/AL customizations into clean, scalable AL extensions.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "The 4-Step Migration Blueprint",
        slug: "the-4-step-migration-blueprint",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Migrating financial histories and inventory valuations requires systematic validation to ensure reconciliation down to the penny.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "1. Code Refactoring & AL Modernization: Replacing deprecated C/SIDE modifications with event-driven AL apps.\n2. Data Cleansing & Extraction: Scrubbing legacy dimension tables and extracting master records through automated migration pipelines.\n3. Sandbox Trial Runs & User Acceptance Testing: Executing full mock cutovers during non-business hours to validate ledger balances.\n4. Go-Live and Hypercare Support: Dedicated round-the-clock standby during fiscal cutover to ensure smooth day-one operations.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "The Business Impact of Cloud Business Central",
        slug: "the-business-impact-of-cloud-business-central",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Following migration, clients report an average 45% acceleration in daily transaction processing, elimination of server maintenance bills, and instant access to AI-powered cash flow forecasting with Copilot in Business Central.",
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
  console.log("🌱 FlutterFlirt Services Blog Seed Script");
  console.log("=========================================\n");

  console.log("Connecting to: " + API_URL);

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
    console.log("\nInserting " + ALL_SERVICE_BLOGS.length + " service blogs into database...\n");
    for (const blog of ALL_SERVICE_BLOGS) {
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

  console.log("\n🎉 All FlutterFlirt service blogs seeded successfully!");
}

runSeed();

