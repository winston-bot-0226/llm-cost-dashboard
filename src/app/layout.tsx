import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LLM Cost Dashboard",
  description: "Track and manage your LLM API costs across multiple providers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-900 min-h-screen fixed left-0 top-0">
            <div className="p-6">
              <h1 className="text-xl font-bold text-white">💰 LLM Costs</h1>
              <p className="text-gray-400 text-sm mt-1">Track your AI spending</p>
            </div>
            <nav className="mt-6">
              <a
                href="/"
                className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <span className="mr-3">📊</span>
                Dashboard
              </a>
              <a
                href="/providers"
                className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <span className="mr-3">🔌</span>
                Providers
              </a>
              <a
                href="/settings"
                className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <span className="mr-3">⚙️</span>
                Settings
              </a>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="ml-64 flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
