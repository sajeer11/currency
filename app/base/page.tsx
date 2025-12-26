// // app/page.tsx or app/api/your-route/route.ts
// import { headers } from "next/headers";
// export default function Page() {
//   const headersList = headers();
//   // 'x-forwarded-for' can contain multiple IPs, the first one is the client's IP
//   const ip = (headersList.get("x-forwarded-for") ?? "127.0.0.1")
//     .split(",")[0]
//     .trim();
//   return (
//     <main>
//       <h1>Your IP Address: {ip}</h1>
//     </main>
//   );
// }
// // 12:09
// //npm run dev -- -H <Your-IP-Address>

//myip adress
//192.168.18.155