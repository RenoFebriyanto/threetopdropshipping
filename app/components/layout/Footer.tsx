'use client';

import { Link } from 'react-router';
import { Mail, Heart, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-carbon border-t border-smoke">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-24">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div>
            <Link to="/" className="mb-4 flex items-center gap-3 text-ivory hover:text-signal transition-colors" aria-label="THREETOP home">
              <img
                src="/icon-512.png"
                alt="THREETOP logo"
                className="h-10 w-10 rounded-full object-cover border border-signal/40"
              />
              <span className="text-lg font-bold font-grotesk uppercase tracking-[0.35em]">THREETOP</span>
            </Link>
            <p className="text-sm text-silver mb-6">
              AI-powered fashion drops. Curated before the trend hits.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-smoke hover:bg-fog rounded-full transition-colors"
                aria-label="Follow"
              >
                <Mail size={16} />
              </a>
              <a
                href="#"
                className="p-2 bg-smoke hover:bg-fog rounded-full transition-colors"
                aria-label="Like"
              >
                <Heart size={16} />
              </a>
              <a
                href="#"
                className="p-2 bg-smoke hover:bg-fog rounded-full transition-colors"
                aria-label="Share"
              >
                <Share2 size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-grotesk font-bold text-ivory mb-4">
              SHOP
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-sm text-silver hover:text-signal transition-colors"
                >
                  New In
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-silver hover:text-signal transition-colors"
                >
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-silver hover:text-signal transition-colors"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-silver hover:text-signal transition-colors"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Help */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-grotesk font-bold text-ivory mb-4">
              HELP
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-sm text-silver hover:text-signal transition-colors"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-silver hover:text-signal transition-colors"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-silver hover:text-signal transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-silver hover:text-signal transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: About */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-grotesk font-bold text-ivory mb-4">
              ABOUT
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-sm text-silver hover:text-signal transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-silver hover:text-signal transition-colors"
                >
                  AI Technology
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-silver hover:text-signal transition-colors"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-silver hover:text-signal transition-colors"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-smoke pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-silver text-center md:text-left">
            © 2025 THREETOP. All rights reserved. | Powered by AI · Built different
          </p>
          <div className="flex gap-4">
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 20'%3E%3Crect width='32' height='20' fill='%232C2C2C' rx='2'/%3E%3C/svg%3E"
              alt="Visa"
              className="h-5 opacity-50"
            />
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 20'%3E%3Crect width='32' height='20' fill='%232C2C2C' rx='2'/%3E%3C/svg%3E"
              alt="Mastercard"
              className="h-5 opacity-50"
            />
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 20'%3E%3Crect width='32' height='20' fill='%232C2C2C' rx='2'/%3E%3C/svg%3E"
              alt="PayPal"
              className="h-5 opacity-50"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
