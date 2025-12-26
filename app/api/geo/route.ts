import { WebServiceClient } from '@maxmind/geoip2-node';
import fs from 'fs';
import path from 'path';
import { Reader } from '@maxmind/geoip2-node';
import { NextRequest } from 'next/server';
import { headers } from "next/headers";
import { fileURLToPath } from 'url';


export const countryToCurrency = {
    AE: 'AED',
    AF: 'AFN',
    AL: 'ALL',
    AM: 'AMD',
    AN: 'ANG',
    AO: 'AOA',
    AR: 'ARS',
    AU: 'AUD',
    AW: 'AWG',
    AZ: 'AZN',
    BA: 'BAM',
    BB: 'BBD',
    BD: 'BDT',
    BG: 'BGN',
    BH: 'BHD',
    BI: 'BIF',
    BM: 'BMD',
    BN: 'BND',
    BO: 'BOB',
    BR: 'BRL',
    BS: 'BSD',
    BT: 'BTN',
    BW: 'BWP',
    BY: 'BYN',
    BZ: 'BZD',
    CA: 'CAD',
    CD: 'CDF',
    CH: 'CHF',
    CL: 'CLP',
    CN: 'CNY',
    CO: 'COP',
    CR: 'CRC',
    CU: 'CUP',
    CV: 'CVE',
    CZ: 'CZK',
    DJ: 'DJF',
    DK: 'DKK',
    DO: 'DOP',
    DZ: 'DZD',
    EG: 'EGP',
    ER: 'ERN',
    ET: 'ETB',
    EU: 'EUR',
    FJ: 'FJD',
    FK: 'FKP',
    FO: 'FOK',
    GB: 'GBP',
    GE: 'GEL',
    GG: 'GGP',
    GH: 'GHS',
    GI: 'GIP',
    GM: 'GMD',
    GN: 'GNF',
    GT: 'GTQ',
    GY: 'GYD',
    HK: 'HKD',
    HN: 'HNL',
    HR: 'HRK',
    HT: 'HTG',
    HU: 'HUF',
    ID: 'IDR',
    IL: 'ILS',
    IM: 'IMP',
    IN: 'INR',
    IQ: 'IQD',
    IR: 'IRR',
    IS: 'ISK',
    JE: 'JEP',
    JM: 'JMD',
    JO: 'JOD',
    JP: 'JPY',
    KE: 'KES',
    KG: 'KGS',
    KH: 'KHR',
    KI: 'KID',
    KM: 'KMF',
    KR: 'KRW',
    KW: 'KWD',
    KY: 'KYD',
    KZ: 'KZT',
    LA: 'LAK',
    LB: 'LBP',
    LK: 'LKR',
    LR: 'LRD',
    LS: 'LSL',
    LY: 'LYD',
    MA: 'MAD',
    MD: 'MDL',
    MG: 'MGA',
    MK: 'MKD',
    MM: 'MMK',
    MN: 'MNT',
    MO: 'MOP',
    MR: 'MRU',
    MU: 'MUR',
    MV: 'MVR',
    MW: 'MWK',
    MX: 'MXN',
    MY: 'MYR',
    MZ: 'MZN',
    NA: 'NAD',
    NG: 'NGN',
    NI: 'NIO',
    NO: 'NOK',
    NP: 'NPR',
    NZ: 'NZD',
    OM: 'OMR',
    PA: 'PAB',
    PE: 'PEN',
    PG: 'PGK',
    PH: 'PHP',
    PK: 'PKR',
    PL: 'PLN',
    PY: 'PYG',
    QA: 'QAR',
    RO: 'RON',
    RS: 'RSD',
    RU: 'RUB',
    RW: 'RWF',
    SA: 'SAR',
    SB: 'SBD',
    SC: 'SCR',
    SD: 'SDG',
    SE: 'SEK',
    SG: 'SGD',
    SH: 'SHP',
    SL: 'SLL',
    SO: 'SOS',
    SR: 'SRD',
    SS: 'SSP',
    ST: 'STN',
    SY: 'SYP',
    SZ: 'SZL',
    TH: 'THB',
    TJ: 'TJS',
    TM: 'TMT',
    TN: 'TND',
    TO: 'TOP',
    TR: 'TRY',
    TT: 'TTD',
    TW: 'TWD',
    TZ: 'TZS',
    UA: 'UAH',
    UG: 'UGX',
    US: 'USD',
    UY: 'UYU',
    UZ: 'UZS',
    VE: 'VES',
    VN: 'VND',
    VU: 'VUV',
    WS: 'WST',
    XA: 'XAF',
    XC: 'XCD',
    XO: 'XOF',
    YE: 'YER',
    ZA: 'ZAR',
    ZM: 'ZMW',
    ZW: 'ZWL'
};


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
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    try {
        const reader = Reader.open(path.join(__dirname, "GeoLite2-Country_20251223/GeoLite2-Country.mmdb"));
        const response = (await reader).country(ip);

        console.log(JSON.stringify(response))

        return Response.json({
            country: response.country?.names.en || '',
            code: response.country?.isoCode || '',
            //@ts-ignore
            currency: countryToCurrency[response.country?.isoCode || 'PK'] || 'PK'
        });
    } catch (error) {
        console.log(error)
        return Response.json({ error: error, ip }, { status: 404 });
    }
}
