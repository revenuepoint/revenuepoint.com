import type { Severity } from '@/types/healthCheck';

export function sevPillClasses(s: Severity): string {
  switch (s) {
    case 'red':
      return 'bg-rust/10 text-rust border-rust/30';
    case 'yellow':
      return 'bg-amber/10 text-amber border-amber/30';
    case 'green':
      return 'bg-navy/10 text-navy border-navy/30';
  }
}

export function sevBar(s: Severity): string {
  switch (s) {
    case 'red':
      return 'bg-rust';
    case 'yellow':
      return 'bg-amber';
    case 'green':
      return 'bg-navy';
  }
}

export function sevLabel(s: Severity): string {
  switch (s) {
    case 'red':
      return 'Red · Critical';
    case 'yellow':
      return 'Yellow · Material';
    case 'green':
      return 'Green · Advisory';
  }
}
