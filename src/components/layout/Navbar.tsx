'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { navItems } from '@/lib/navigation';
import type { NavItem } from '@/lib/navigation';
import { SCHEDULE_URL } from '@/lib/links';
import { track, events } from '@/lib/analytics';
import { Wordmark } from '@/components/brand/Wordmark';

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
      {/* Crimson signature bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-crimson" />

      <header
        className={`fixed top-[3px] left-0 right-0 z-50 bg-paper transition-shadow duration-200 border-b border-ruleSoft ${
          scrolled ? 'shadow-hairline' : ''
        }`}
      >
        {/* Primary nav */}
        <nav className="max-w-editorial mx-auto px-6 lg:px-8 flex items-center justify-between h-[60px] lg:h-[72px]">
          <span className="inline-block">
            <Wordmark size="md" tone="crimson" className="!text-[26px]" />
          </span>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => (hasDropdown(item) ? handleEnter(item.label) : undefined)}
                  onMouseLeave={hasDropdown(item) ? handleLeave : undefined}
                >
                  {hasDropdown(item) ? (
                    <button
                      className={`flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.16em] px-4 py-2 transition-colors ${
                        isActive(item) || openDropdown === item.label
                          ? 'text-navySoft'
                          : 'text-mute hover:text-navySoft'
                      }`}
                    >
                      {item.label}
                      {item.badge && (
                        <span className="ml-2 font-mono text-[8px] font-semibold bg-crimson text-paper px-1.5 py-[2px] tracking-[0.12em] leading-none">
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
                        strokeWidth={1.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() =>
                        track(events.nav_link_clicked, {
                          label: item.label,
                          href: item.href,
                          position: 'desktop',
                        })
                      }
                      className={`font-mono text-[11px] uppercase tracking-[0.16em] px-4 py-2 transition-colors ${
                        isActive(item) ? 'text-navySoft' : 'text-mute hover:text-navySoft'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Hairline separator */}
            <div className="w-px h-5 bg-rule mx-4" />

            <a
              href={SCHEDULE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track(events.schedule_clicked, {
                  cta_label: 'Schedule a call',
                  target_url: SCHEDULE_URL,
                  position: 'navbar-desktop',
                  page: typeof window !== 'undefined' ? window.location.pathname : undefined,
                })
              }
              className="border border-crimson text-crimson font-serif italic text-[14px] px-5 py-1.5 hover:bg-crimson hover:text-paper transition-colors"
            >
              Schedule a call
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-ink"
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

        {/* Mega menu panel */}
        <div
          className={`hidden lg:block overflow-hidden transition-all duration-300 ease-editorialOut ${
            activeMenu ? 'max-h-[440px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          onMouseEnter={() => openDropdown && handleEnter(openDropdown)}
          onMouseLeave={handleLeave}
        >
          <div className="border-t border-rule bg-paper">
            <div className="max-w-editorial mx-auto px-6 lg:px-8 py-10">
              {activeMenu && activeMenu.groups ? (
                <div className="grid grid-cols-3 gap-12">
                  {activeMenu.groups.map((group) => (
                    <div key={group.heading}>
                      <p className="eyebrow mb-5">{group.heading}</p>
                      <div className="space-y-1">
                        {group.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() =>
                              track(events.nav_link_clicked, {
                                label: link.label,
                                href: link.href,
                                position: 'desktop-megamenu',
                                parent: activeMenu?.label,
                                group: group.heading,
                              })
                            }
                            className={`group flex items-center py-2 transition-colors ${
                              pathname === link.href ? 'text-navySoft' : 'text-ink hover:text-navySoft'
                            }`}
                          >
                            <span className="text-[15px]">{link.label}</span>
                            {link.badge && (
                              <span className="ml-2 font-mono text-[8px] font-semibold bg-crimson text-paper px-1.5 py-[2px] tracking-[0.12em] leading-none">
                                {link.badge}
                              </span>
                            )}
                            <svg
                              className="w-4 h-4 ml-2 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.5}
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
                  <p className="eyebrow mb-5">{activeMenu.menuHeading ?? activeMenu.label}</p>
                  <div className="grid grid-cols-3 gap-x-12 gap-y-1">
                    {activeMenu.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() =>
                          track(events.nav_link_clicked, {
                            label: child.label,
                            href: child.href,
                            position: 'desktop-megamenu',
                            parent: activeMenu?.label,
                          })
                        }
                        className={`group flex items-center py-2 transition-colors ${
                          pathname === child.href ? 'text-navySoft' : 'text-ink hover:text-navySoft'
                        }`}
                      >
                        <span className="text-[15px]">{child.label}</span>
                        <svg
                          className="w-4 h-4 ml-2 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
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
        className={`fixed inset-0 bg-ink/15 z-40 transition-opacity duration-300 ${
          activeMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: '75px' }}
        onMouseEnter={handleLeave}
      />

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[63px] bg-paper z-40 overflow-y-auto">
          <div className="px-6 py-8 space-y-6">
            {navItems.map((item) => (
              <div key={item.label}>
                {hasDropdown(item) ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      className={`flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] w-full ${
                        isActive(item) ? 'text-navySoft' : 'text-ink'
                      }`}
                    >
                      {item.label}
                      {item.badge && (
                        <span className="font-mono text-[9px] font-semibold bg-crimson text-paper px-1.5 py-[2px] tracking-wider leading-none">
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
                      <div className="mt-3 ml-4 space-y-5 border-l border-ruleSoft pl-4">
                        {item.groups ? (
                          item.groups.map((group) => (
                            <div key={group.heading}>
                              <p className="eyebrow mb-3">{group.heading}</p>
                              <div className="space-y-2 ml-1">
                                {group.links.map((link) => (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() =>
                                      track(events.nav_link_clicked, {
                                        label: link.label,
                                        href: link.href,
                                        position: 'mobile-megamenu',
                                        parent: item.label,
                                        group: group.heading,
                                      })
                                    }
                                    className={`flex items-center gap-2 text-sm ${
                                      pathname === link.href ? 'text-navySoft' : 'text-ink hover:text-navySoft'
                                    }`}
                                  >
                                    <span>{link.label}</span>
                                    {link.badge && (
                                      <span className="font-mono text-[8px] font-semibold bg-crimson text-paper px-1.5 py-[2px] tracking-[0.12em] leading-none">
                                        {link.badge}
                                      </span>
                                    )}
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
                              onClick={() =>
                                track(events.nav_link_clicked, {
                                  label: child.label,
                                  href: child.href,
                                  position: 'mobile-megamenu',
                                  parent: item.label,
                                })
                              }
                              className={`block text-sm ${
                                pathname === child.href ? 'text-navySoft' : 'text-ink hover:text-navySoft'
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
                    onClick={() =>
                      track(events.nav_link_clicked, {
                        label: item.label,
                        href: item.href,
                        position: 'mobile',
                      })
                    }
                    className={`block font-mono text-[12px] uppercase tracking-[0.16em] ${
                      isActive(item) ? 'text-navySoft' : 'text-ink'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            <a
              href={SCHEDULE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track(events.schedule_clicked, {
                  cta_label: 'Schedule a call',
                  target_url: SCHEDULE_URL,
                  position: 'navbar-mobile',
                  page: typeof window !== 'undefined' ? window.location.pathname : undefined,
                })
              }
              className="block text-center border border-crimson text-crimson font-serif italic text-[15px] px-6 py-3 hover:bg-crimson hover:text-paper transition-colors mt-8"
            >
              Schedule a call
            </a>

            <div className="pt-6 border-t border-ruleSoft mt-8">
              <Link
                href="/brand/"
                className="block font-mono text-[11px] uppercase tracking-[0.16em] text-mute hover:text-navySoft transition-colors"
              >
                Brand guide
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
