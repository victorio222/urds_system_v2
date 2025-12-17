// // import type { Metadata } from "next";
// // import { DM_Sans } from "next/font/google";
// // import "./globals.css";
// // import { AuthProvider } from "@/context/AuthContext";

// // // Import DM Sans from Google Fonts
// // const dmSans = DM_Sans({
// //   subsets: ["latin"],
// //   weight: ["400", "500", "700"],
// //   variable: "--font-dm-sans",
// // });

// // export const metadata: Metadata = {
// //   title: "URDS - University Research and Development Services",
// //   description: "University Research and Development Services",
// // };

// // export default function RootLayout({
// //   children,
// // }: Readonly<{
// //   children: React.ReactNode;
// // }>) {
// //   return (
// //     <html lang="en">
// //       <body className={`${dmSans.variable} antialiased`}>
// //         <AuthProvider>
// //           {children}
// //         </AuthProvider>
// //       </body>
// //     </html>
// //   );
// // }










// import type { Metadata } from "next";
// import { DM_Sans } from "next/font/google";
// import "./globals.css";
// import { AuthProvider } from "@/context/AuthContext";
// import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

// // Import DM Sans from Google Fonts
// const dmSans = DM_Sans({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
//   variable: "--font-dm-sans",
// });

// export const metadata: Metadata = {
//   title: "URDS - University Research and Development Services",
//   description: "University Research and Development Services",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${dmSans.variable} antialiased`}>
//         <GoogleReCaptchaProvider
//           reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
//           scriptProps={{
//             async: true,
//             defer: true,
//             appendTo: "head",
//           }}
//         >
//           <AuthProvider>
//             {children}
//           </AuthProvider>
//         </GoogleReCaptchaProvider>
//       </body>
//     </html>
//   );
// }










import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/context/Providers";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "URDS - University Research and Development Services",
  description: "University Research and Development Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        {/* All Client-side logic is now safely inside this component */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}