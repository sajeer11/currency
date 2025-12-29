import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  if (!lat || !lon) return NextResponse.json({ error: "Missing lat/lon" }, { status: 400 });

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      {
        headers: {
          "User-Agent": "my-next-app", // <- required by Nominatim
          "Accept-Language": "en",   
        },
      }
    );

    if (!res.ok) throw new Error(`Nominatim returned ${res.status}`);

    const data = await res.json();

    return NextResponse.json({
      name: data.display_name || "Unknown location",
       
    });
  } catch (err) {
    console.error("Server fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
