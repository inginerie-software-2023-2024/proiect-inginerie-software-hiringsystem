import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import NavbarMain from "@/components/navbar/Navbar";
import { AuthProvider } from "@/context/AuthProvider";
import ProtectedFrame from "@/components/auth/ProtectedFrame";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HiringSystem",
  description: "HiringSystem is a web application for hiring managers to manage their hiring process.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ProtectedFrame>
            <NavbarMain />
            {children}
          </ProtectedFrame>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
