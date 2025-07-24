import type { ReactNode } from "react";
import Header from "./header";
import { Toaster } from "../ui/sonner";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto min-h-[calc(100vh-9rem-2px)] w-full max-w-6xl grow px-8 py-4 sm:px-12 md:px-20">
        {children}
      </main>
      <footer className="grid h-16 place-content-center border-t shadow">
        @2025 Keepcoding
      </footer>
      <Toaster position="bottom-center" richColors />
    </div>
  );
}
