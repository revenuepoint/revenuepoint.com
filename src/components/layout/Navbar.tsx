'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { navItems } from '@/lib/navigation';
import type { NavItem } from '@/lib/navigation';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const allLinks = (item: NavItem) => {
    if (item.groups) return item.groups.flatMap((g) => g.links);
    return item.children || [];
  };

  const isActive = (item: NavItem) =>
    pathname === item.href || allLinks(item).some((c) => pathname === c.href);

  const hasDropdown = (item: NavItem) => !!(item.children || item.groups);

  const handleEnter = (label: string) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setOpenDropdown(label);
  };

  const handleLeave = () => {
    closeTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const activeMenu = navItems.find((item) => item.label === openDropdown && hasDropdown(item));

  return (
    <>
      {/* Thin crimson accent bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-crimson" />

      <header
        className={`fixed top-[3px] left-0 right-0 z-50 bg-white transition-shadow duration-200 ${
          scrolled ? 'shadow-[0_1px_3px_rgba(0,0,0,0.08)]' : ''
        }`}
      >
        {/* Primary nav bar */}
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-[60px] lg:h-[72px]">
          {/* Logo */}
          <Link href="/" className="text-[22px] font-bold tracking-tight text-crimson leading-none">
            RevenuePoint
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasDropdown(item) ? handleEnter(item.label) : undefined}
                  onMouseLeave={hasDropdown(item) ? handleLeave : undefined}
                >
                  {hasDropdown(item) ? (
                    <button
                      className={`flex items-center gap-1 text-[13px] uppercase tracking-[0.05em] font-medium px-4 py-2 transition-colors ${
                        isActive(item) || openDropdown === item.label
                          ? 'text-crimson'
                          : 'text-navy/80 hover:text-crimson'
                      }`}
                    >
                      {item.label}
                      {item.badge && (
                        <span className="ml-1.5 text-[9px] font-bold bg-crimson text-white px-1.5 py-[2px] rounded-[2px] leading-none tracking-wider">
                          {item.badge}
                        </span>
                      )}
                      <svg
                        className={`w-3 h-3 ml-0.5 transition-transform duration-200 ${
                          openDropdown === item.label ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-[13px] uppercase tracking-[0.05em] font-medium px-4 py-2 transition-colors ${
                        isActive(item)
                          ? 'text-crimson'
                          : 'text-navy/80 hover:text-crimson'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Separator */}
            <div className="w-px h-6 bg-border/60 mx-4" />

            <a
              href={process.env.NEXT_PUBLIC_CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-crimson text-white text-[12px] uppercase tracking-[0.08em] font-semibold px-5 py-2.5 hover:bg-crimsonDark transition-colors"
            >
              Schedule a Call
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-navy"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mega menu panel — expands down from the header */}
        <div
          className={`hidden lg:block overflow-hidden transition-all duration-300 ease-in-out ${
            activeMenu ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          onMouseEnter={() => openDropdown && handleEnter(openDropdown)}
          onMouseLeave={handleLeave}
        >
          <div className="border-t border-border/40">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
              {activeMenu && activeMenu.groups ? (
                <div className="flex gap-16">
                  {activeMenu.groups.map((group) => (
                    <div key={group.heading}>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-mutedText font-semibold mb-4">
                        {group.heading}
                      </p>
                      <div className="space-y-1">
                        {group.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={`group flex items-center py-2 transition-colors ${
                              pathname === link.href
                                ? 'text-crimson'
                                : 'text-navy hover:text-crimson'
                            }`}
                          >
                            <span className="text-[15px] font-medium">{link.label}</span>
                            <svg
                              className="w-4 h-4 ml-2 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : activeMenu && activeMenu.children ? (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-mutedText font-semibold mb-5">
                    {activeMenu.label}
                  </p>
                  <div className="grid grid-cols-3 gap-x-12 gap-y-1">
                    {activeMenu.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`group flex items-center py-2.5 transition-colors ${
                          pathname === child.href
                            ? 'text-crimson'
                            : 'text-navy hover:text-crimson'
                        }`}
                      >
                        <span className="text-[15px] font-medium">{child.label}</span>
                        <svg
                          className="w-4 h-4 ml-2 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop overlay when mega menu is open */}
      <div
        className={`fixed inset-0 bg-navy/20 z-40 transition-opacity duration-300 ${
          activeMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: '75px' }}
        onMouseEnter={handleLeave}
      />

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[63px] bg-navy z-40 overflow-y-auto">
          <div className="px-6 py-8 space-y-6">
            {navItems.map((item) => (
              <div key={item.label}>
                {hasDropdown(item) ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.label ? null : item.label)
                      }
                      className={`flex items-center gap-2 text-[15px] uppercase tracking-[0.08em] font-semibold w-full ${
                        isActive(item) ? 'text-crimson' : 'text-white'
                      }`}
                    >
                      {item.label}
                      {item.badge && (
                        <span className="text-[9px] font-bold bg-crimson text-white px-1.5 py-[2px] rounded-[2px] leading-none">
                          {item.badge}
                        </span>
                      )}
                      <svg
                        className={`w-3.5 h-3.5 transition-transform ${
                          openDropdown === item.label ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openDropdown === item.label && (
                      <div className="mt-3 ml-4 space-y-4">
                        {item.groups ? (
                          item.groups.map((group) => (
                            <div key={group.heading}>
                              <p className="text-[10px] uppercase tracking-[0.12em] text-gray-500 font-semibold mb-2">
                                {group.heading}
                              </p>
                              <div className="space-y-2 ml-2">
                                {group.links.map((link) => (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`block text-sm ${
                                      pathname === link.href ? 'text-crimson' : 'text-gray-300 hover:text-white'
                                    }`}
                                  >
                                    {link.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          item.children!.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`block text-sm ${
                                pathname === child.href ? 'text-crimson' : 'text-gray-300 hover:text-white'
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`block text-[15px] uppercase tracking-[0.08em] font-semibold ${
                      isActive(item) ? 'text-crimson' : 'text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            <a
              href={process.env.NEXT_PUBLIC_CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-crimson text-white text-[12px] uppercase tracking-[0.08em] font-semibold px-6 py-3 hover:bg-crimsonDark transition-colors mt-8"
            >
              Schedule a Call
            </a>
          </div>
        </div>
      )}
    </>
  );
}
