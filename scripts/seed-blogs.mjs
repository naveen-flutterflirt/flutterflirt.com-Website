/**
 * Seed script to seed blog posts into FlutterFlirt database via backend API.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.flutterflirt.com";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@flutterflirt.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "memyselfherog@123";
let token = process.env.ADMIN_TOKEN || null;

const SEED_BLOGS = [
  {
    title: "Streamlining Enterprise Operations with Dynamics 365 Finance & Operations",
    slug: "streamlining-enterprise-operations-with-dynamics-365-finance-and-operations",
    excerpt:
      "How enterprise organizations eliminate data silos, optimize multi-entity supply chains, and cut monthly financial close cycles with Dynamics 365 F&O.",
    cover_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    category: "Dynamics 365",
    author: "FlutterFlirt Enterprise Practice",
    featured: false,
    status: "published",
    sections: [
      {
        heading: "Modernizing Fragmented Multi-Entity Operations",
        slug: "modernizing-fragmented-multi-entity-operations",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Global enterprises frequently grapple with disjointed ledgers, disconnected inventory systems, and friction-filled intercompany transactions. FlutterFlirt’s Dynamics 365 Finance & Operations practice enables mid-market and enterprise organizations to consolidate multi-country financial ledgers into a single, unified command center.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "By establishing standardized chart-of-accounts hierarchies and automated intercompany eliminations, finance leaders can shorten month-end reconciliation cycles by up to 38% while ensuring full statutory compliance across diverse jurisdictions.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "Intelligent Supply Chain & Discrete Manufacturing",
        slug: "intelligent-supply-chain-and-discrete-manufacturing",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Beyond core financials, modern operations require real-time visibility across warehouse logistics, procurement pipelines, and production floors. With Dynamics 365 Supply Chain Management, FlutterFlirt integrates warehouse telemetry and intelligent demand forecasting directly with master production scheduling.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "• Automated replenishment triggers based on dynamic lead times and sensor telemetry.\n• Real-time scrap tracking and shop-floor execution using handheld touch terminals.\n• Direct integration with Azure IoT hubs for preventive equipment maintenance.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "The FlutterFlirt Implementation Methodology",
        slug: "the-flutterflirt-implementation-methodology",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Our enterprise delivery framework focuses on phased cutovers with zero operational disruption. From architecture blueprints and custom AL/X++ extensions to sandbox stress-testing, our certified Microsoft solution architects ensure your ERP investment delivers immediate, measurable ROI.",
                },
              ],
            },
          ],
        },
      },
    ],
  },
  {
    title: "Unifying Customer Journeys with Dynamics 365 CRM & Field Service",
    slug: "unifying-customer-journeys-with-dynamics-365-crm-and-field-service",
    excerpt:
      "Discover how intelligent lead-to-cash pipelines, omnichannel contact centers, and predictive field dispatch drive 30%+ efficiency gains.",
    cover_image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop&q=80",
    category: "CRM & Field Service",
    author: "FlutterFlirt CRM Practice",
    featured: false,
    status: "published",
    sections: [
      {
        heading: "Breaking Down the Wall Between Sales and Service",
        slug: "breaking-down-the-wall-between-sales-and-service",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "In many growing enterprises, customer acquisition and post-sale service operate in isolation. Sales reps lack visibility into active field support tickets, while field technicians miss cross-sell and renewal signals. FlutterFlirt architects cohesive Customer Engagement ecosystems using Microsoft Dynamics 365 Sales, Customer Service, and Field Service.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "With unified 360-degree customer records, every customer touchpoint—from inbound marketing interactions to on-site maintenance calls—is synchronized in real-time.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "Intelligent Dispatch and Mobile Field Execution",
        slug: "intelligent-dispatch-and-mobile-field-execution",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Field service excellence hinges on first-time fix rates and dispatch efficiency. FlutterFlirt configures Resource Scheduling Optimization (RSO) algorithms that match work orders with technician skill sets, geographic availability, and required replacement parts.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "• First-time fix rate improvements exceeding 34% through mobile step-by-step digital inspection checklists.\n• Automated customer SMS/email ETA tracking powered by Power Automate triggers.\n• Seamless synchronization between field invoicing and back-office ERP ledgers.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "Accelerating Value with Custom Portals and Automation",
        slug: "accelerating-value-with-custom-portals-and-automation",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "By augmenting standard CRM capabilities with custom Next.js client self-service portals and automated Power Platform approval matrices, FlutterFlirt helps clients reduce administrative overhead while delighting their end customers.",
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
  console.log("🌱 FlutterFlirt Blog Seed Script");
  console.log("=========================================\n");

  console.log("Target API: " + API_URL);

  if (!token) {
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
        const errText = await authRes.text();
        console.error("❌ Authentication response:", errText);
        return;
      }
    } catch (err) {
      console.error("❌ Network error: " + err.message);
      return;
    }
  } else {
    console.log("✅ Using provided ADMIN_TOKEN");
  }

  if (token) {
    console.log("\nInserting " + SEED_BLOGS.length + " blogs into database...");
    for (const blog of SEED_BLOGS) {
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

  console.log("\n🎉 Seed process finished!");
}

runSeed();

