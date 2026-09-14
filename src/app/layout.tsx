import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Pipedrive Integration Hub | Native AI SMS, Attribution & Power BI",
  description: "Enterprise Pipedrive Integration Engine: Native Sinch AI SMS Gateway with Salesperson Handover, TNZ Opt-Out Compliance, Attribution Identity Matching, and Power BI Reporting Pipeline."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {/* Global Demo Traffic Pixel */}
        <img
          src="https://demo-traffic.vercel.app/api/px?p=pipedrive-integrations-hub"
          alt=""
          width={1}
          height={1}
          style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
        />
      </body>
    </html>
  );
}
