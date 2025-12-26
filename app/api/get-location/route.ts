import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // Get client IP from headers
  const headersList = headers();
  let ip = ((await headersList).get("x-forwarded-for") ?? "").split(",")[0].trim();

  // Detect if localhost
  const isLocalhost = !ip || ip === "::1" || ip.startsWith("127.");
  if (isLocalhost) {
    // Use static IP for testing locally
    ip = "104.244.42.1"; // USA example; change to Germany/UAE etc.
  }

  try {
    const res = await fetch(`https://ipapi.co/${ip || ""}/json/`);
    const data = await res.json();

    return NextResponse.json({
      ip: ip || "Unknown",
      country: data.country_name || "Unknown",
      currency: data.currency || "PKR",
    });
  } catch (err) {
    console.error("IP location fetch failed:", err);
    return NextResponse.json({
      ip: ip || "Unknown",
      country: "Unknown",
      currency: "PKR",
    });
  }
}
