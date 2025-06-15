import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClientLayout } from "./explore/components/clientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Dashboard",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
        </body>
        </html>
    );
}
