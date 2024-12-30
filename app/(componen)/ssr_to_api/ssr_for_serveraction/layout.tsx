import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-white text-2xl font-bold">Search Posts</h1>
          <div className="flex gap-4 mt-2">
            <a href="/" className="text-white hover:text-blue-200">Home</a>
            <a href="/about" className="text-white hover:text-blue-200">About</a>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
      <footer className="bg-blue-600 text-white py-4 mt-auto">
        <div className="container mx-auto px-6 text-center">
          © 2024 Search Posts App
        </div>
      </footer>
    </div>
  );
}