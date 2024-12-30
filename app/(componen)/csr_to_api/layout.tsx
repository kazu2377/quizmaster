import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-blue-50">
      <nav className="bg-blue-600 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-white text-2xl font-bold">Message App</h1>
        </div>
      </nav>
      <main className="container mx-auto px-6 py-8">{children}</main>
      <footer className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-6 text-center">© 2024 Message App</div>
      </footer>
    </div>
  );
}
