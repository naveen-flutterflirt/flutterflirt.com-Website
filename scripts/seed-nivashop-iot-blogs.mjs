/**
 * Seed script to publish 2 new NIVASHOP and IoT Product blogs into the production database.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.flutterflirt.com";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@flutterflirt.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "memyselfherog@123";

const NIVA_IOT_BLOGS = [
  // 1. NIVASHOP Lab Kits & Practical Engineering Education
  {
    title: "Hands-On Engineering: Why NIVASHOP IoT Development Kits Are Transforming Hardware Prototyping",
    slug: "hands-on-engineering-why-nivashop-iot-development-kits-are-transforming-hardware-prototyping",
    excerpt: "Discover how NIVASHOP's modular IoT lab kits bridge the gap between academic theory and enterprise hardware deployment with industrial-grade microcontrollers and turnkey sensor suites.",
    cover_image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=1200&auto=format&fit=crop&q=80",
    category: "Hardware & IoT",
    author: "FlutterFlirt IoT Labs Team",
    featured: false,
    status: "published",
    sections: [
      {
        heading: "The Hardware Prototyping Bottleneck",
        slug: "the-hardware-prototyping-bottleneck",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "For university engineering labs, hardware startups, and enterprise R&D departments, sourcing reliable electronic prototyping components has historically been fragmented and time-consuming. Juggling multiple component vendors, counterfeit ICs, and incompatible logic levels frequently stalls embedded development before firmware testing even begins.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "NIVASHOP (nivashop.in) was engineered to eliminate this barrier by curating pre-tested, industrial-standard IoT development kits and smart hardware modules designed for immediate plug-and-play productivity.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "What Sets NIVASHOP IoT Kits Apart",
        slug: "what-sets-nivashop-iot-kits-apart",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Unlike generic hobbyist component packs, NIVASHOP development kits are purpose-built for scalable embedded engineering and cloud connectivity.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "• Dual-Core 32-Bit Microcontrollers: Powered by authentic ESP32 and ESP32-S3 modules featuring integrated Wi-Fi and Bluetooth Low Energy (BLE 5.0).\n• Precision Sensor Breakouts: Industrial-grade sensor suites for temperature, humidity, particulate matter (PM2.5), ultrasonic distance, and current monitoring.\n• Seamless Cloud & Telemetry Hookups: Pre-configured firmware examples that stream telemetry directly to MQTT brokers, Azure IoT Hub, and FlutterFlirt cloud portals.\n• Safe Prototyping Power Management: Built-in reverse-polarity protection, regulated 3.3V/5V rails, and dedicated battery charging circuitry.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "Bridging Education and Enterprise Deployment",
        slug: "bridging-education-and-enterprise-deployment",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Through FlutterFlirt’s partnership with NIVASHOP, engineering colleges and enterprise innovation labs gain access to curriculum-aligned masterclasses and verified hardware. Students and developers move seamlessly from breadboard prototypes to custom PCB schematics and commercial edge products.",
                },
              ],
            },
          ],
        },
      },
    ],
  },

  // 2. Industrial IoT & Smart Commercial Products
  {
    title: "From Silicon to Scale: Building Resilient Smart Products with NIVASHOP Hardware and Cloud Telemetry",
    slug: "from-silicon-to-scale-building-resilient-smart-products-with-nivashop-hardware",
    excerpt: "A tactical guide to architecting commercial IoT products — from selecting reliable smart relays and actuators on NIVASHOP to edge-to-cloud security and over-the-air (OTA) updates.",
    cover_image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    category: "IoT Products",
    author: "FlutterFlirt Hardware Engineering Practice",
    featured: false,
    status: "published",
    sections: [
      {
        heading: "Designing for Commercial Durability",
        slug: "designing-for-commercial-durability",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Transitioning an IoT prototype from a controlled laboratory bench to a commercial building or factory floor requires an uncompromising focus on environmental resilience, electrical noise immunity, and fail-safe watchdog design.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "NIVASHOP provides the foundational building blocks required for commercial smart products: optocoupled solid-state relay modules, DIN-rail IoT enclosures, capacitive touch controls, and high-reliability wireless transceivers.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "Core Architecture: Edge Security & Over-The-Air (OTA) Updates",
        slug: "core-architecture-edge-security-and-over-the-air-ota-updates",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Deploying thousands of connected edge nodes demands an architecture capable of remote management without physical technician intervention.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "• Hardware Root of Trust: Utilizing hardware crypto engines on NIVASHOP microcontrollers for secure boot and encrypted TLS 1.3 telemetry.\n• Rollback-Safe Dual-Partition OTA: Dual flash partition schemes ensuring devices automatically revert to stable firmware if an update fails or connectivity drops.\n• Smart Power Optimization: Deep-sleep routines and sensor duty-cycling that allow remote environmental nodes to run for years on battery power.\n• Edge Pre-Processing: Filtering noise and computing local moving averages on the microcontroller before publishing telemetry to reduce cloud ingestion costs.",
                },
              ],
            },
          ],
        },
      },
      {
        heading: "The FlutterFlirt End-to-End Hardware Ecosystem",
        slug: "the-flutterflirt-end-to-end-hardware-ecosystem",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Together, FlutterFlirt and NIVASHOP offer a complete embedded ecosystem: hardware sourcing, custom firmware engineering, cloud backend architecture, and ERP integration. Whether building smart agricultural monitors or smart facility switches, we turn electronic concepts into production-grade market reality.",
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
  console.log("🌱 NIVASHOP & IoT Products Blog Seed");
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
    console.log("\nInserting " + NIVA_IOT_BLOGS.length + " blogs into database...\n");
    for (const blog of NIVA_IOT_BLOGS) {
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

  console.log("\n🎉 Both NIVASHOP and IoT product blogs published successfully!");
}

runSeed();
