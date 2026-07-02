'use client';

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import './styles/global.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CursorFollower from './components/ui/CursorFollower';
import { useLenis } from './hooks/useLenis';

export const links: Route.LinksFunction = () => [];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>THREETOP - Wear the Algorithm</title>
        <meta name="description" content="THREETOP: AI-powered fashion drops. Curated before the trend hits." />
        <Meta />
        <Links />
      </head>
      <body className="bg-void text-ivory">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function AppContent() {
  useLenis();

  return (
    <div className="relative w-full min-h-screen bg-void">
      <CursorFollower />
      <Navbar />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto text-ivory">
      <h1 className="text-4xl font-bold mb-4">{message}</h1>
      <p className="text-lg mb-4">{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto bg-ash rounded text-silver text-sm">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
