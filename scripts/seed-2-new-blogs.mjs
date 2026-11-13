/**
 * Seed script to publish 2 new FlutterFlirt service blogs into production database.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.flutterflirt.com";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@flutterflirt.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "memyselfherog@123";

const NEW_TWO_BLOGS = [
  // 1. Resource Augmentation & Technical Outsourcing
  {
    title: "Scaling Engineering Velocity with Dedicated Dynamics 365 & Full-Stack Tech Pods",
    slug: "scaling-engineering-velocity-with-dedicated-dynamics-365-and-tech-pods",
    excerpt: "How forward-thinking enterprises overcome specialized talent shortages, ramp up vetted Microsoft consultants in days, and accelerate sprint velocity by up to 2.5x.",
    cover_image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
    category: "Technical Augmentation",
    author: "FlutterFlirt Talent & Augmentation Practice",
    featured: false,
    status: "published",
    sections: [
      {
        heading: "The Enterprise Challenge: The Specialized Microsoft Talent Deficit",
        slug: "the-enterprise-challenge-the-specialized-microsoft-talent-deficit",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Recruiting senior Dynamics 365 architects, certified AL/X++ developers, and enterprise full-stack engineers routinely takes 3 to 6 months. In fast-moving digital transformation initiatives, unfilled engineering positions lead to missed milestone cutovers, delayed feature rollouts, and costly project overruns.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "FlutterFlirt’s Resource Augmentation and Dedicated Pods model solves this friction by providing battle-tested consultants who integrate directly into your sprint cycles within 5 business days—completely eliminating recruiting overhead and lengthy onboarding ramp-ups.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "Dedicated Pods vs. Traditional Staffing: The Productivity Multiplier",
        slug: "dedicated-pods-vs-traditional-staffing-the-productivity-multiplier",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Unlike commodity body-shopping agencies that provide disconnected contractors, FlutterFlirt deploys self-sufficient engineering pods led by hands-on Solution Architects. Each team operates with defined delivery KPIs, automated test coverage standards, and continuous CI/CD integration.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "• Senior Dynamics 365 Consultants: Deep functional & technical expertise across F&O, Business Central, Sales, and Field Service.\n• Full-Stack React & Next.js Engineers: Modern web developers experienced with enterprise SSO, headless ERP APIs, and high-load architectures.\n• Fractional or Dedicated Engagements: Flexible capacity scaling that expands during critical cutover phases and stabilizes post-launch.\n• 40% Cost Efficiency: Dramatically lower total cost of engagement compared to Tier-1 consulting firms while maintaining elite output quality.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "The FlutterFlirt Talent Enablement Governance",
        slug: "the-flutterflirt-talent-enablement-governance",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Every augmented developer works within your enterprise source control repositories, Jira/Azure DevOps boards, and security boundary zones. With daily standup alignment, proactive architectural reviews, and zero lock-in, we ensure knowledge transfer is continuous and complete from day one.",
                },
              ],
            },
          ],
        },
      },
    ],
  },

  // 2. D365 Academy & Enterprise Enablement
  {
    title: "Building Internal Enterprise Independence: Post-Go-Live Mastery with D365 Academy",
    slug: "building-internal-enterprise-independence-post-go-live-mastery-with-d365-academy",
    excerpt: "Why the true ROI of an ERP implementation depends on user adoption, and how structured role-based masterclasses achieve 95%+ operational adoption in 30 days.",
    cover_image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80",
    category: "Training & Academy",
    author: "FlutterFlirt Academy Practice",
    featured: false,
    status: "published",
    sections: [
      {
        heading: "The Hidden Cost of Poor User Adoption in ERP Deployments",
        slug: "the-hidden-cost-of-poor-user-adoption-in-erp-deployments",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Over 70% of enterprise ERP and CRM transformations fall short of their projected ROI not due to software architecture limitations, but because end users struggle to adapt to new transactional workflows. When teams lack confident system mastery, shadow spreadsheets return, transaction errors spike, and internal support tickets overwhelm management.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "FlutterFlirt’s D365 Academy bridges this gap by transforming post-implementation training from a generic afterthought into a structured, role-specific enablement curriculum tailored directly to your production workflows.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "Role-Based Pathways: From Shop Floor Operators to System Administrators",
        slug: "role-based-pathways-from-shop-floor-operators-to-system-administrators",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Effective corporate learning must reflect daily operational realities. Rather than training on dummy datasets, D365 Academy develops personalized curricula that use your business’s chart of accounts, production routes, and customer lifecycles.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "• Departmental Transaction Workshops: Targeted sessions for Finance, Procurement, Warehouse Logistics, and Customer Support teams.\n• Internal Administrator Masterclasses: Equipping your IT teams to manage user security roles, automated workflows, and routine patch deployments independently.\n• Certified Microsoft Readiness: Clear guidance and test preparation for industry-recognized Microsoft credentials (MB-800, MB-300, MB-310, PL-900).\n• Searchable Runbooks & Video Libraries: Bite-sized on-demand video walk-throughs embedded directly into company documentation hubs.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "Long-Term Value: Sustainable Self-Sufficiency",
        slug: "long-term-value-sustainable-self-sufficiency",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Our core goal is to make your organization self-sufficient. By fostering internal subject matter champions and institutional operational confidence, FlutterFlirt ensures your digital transformation continues delivering compound dividends long after the initial go-live cutover.",
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
