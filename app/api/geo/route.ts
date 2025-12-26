import { WebServiceClient } from '@maxmind/geoip2-node';
import fs from 'fs';
import path from 'path';
import { Reader } from '@maxmind/geoip2-node';
import { NextRequest } from 'next/server';
import { headers } from "next/headers";
export async function GET(request: NextRequest) {

    const headersList = headers();

    let ip = ((await headersList).get("x-forwarded-for") ?? "").split(",")[0].trim();

    // let ip = "202.47.38.24"

    // Detect if localhost
    const isLocalhost = !ip || ip === "::1" || ip.startsWith("127.");
    console.log(`Is localhost ${isLocalhost}`)
    if (isLocalhost) {
        // Use static IP for testing locally
        ip = "104.244.42.1"; // USA example; change to Germany/UAE etc.
    }


    // 2. Load the database
    //   const dbPath = path.resolve('./GeoLite2-Country_20251223/GeoLite2-Country.mmdb');
    //   const dbBuffer = fs.readFileSync(dbPath);
    try {
        const reader = Reader.open("./GeoLite2-Country_20251223/GeoLite2-Country.mmdb");
        const response = (await reader).country(ip);

        console.log(JSON.stringify(response))

        return Response.json(response);
    } catch (error) {
        console.log(error)
        return Response.json({ error: error, ip }, { status: 404 });
    }
}
