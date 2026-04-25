export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function gtagEvent(name: string, props: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, props);
}

export function gtagPageview(path: string) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function' || !GA_ID) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
