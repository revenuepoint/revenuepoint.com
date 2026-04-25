import type { Severity } from '@/types/healthCheck';

export function sevPillClasses(s: Severity): string {
  switch (s) {
    case 'red':
      return 'bg-red/10 text-red border-red/30';
    case 'yellow':
      return 'bg-amber/10 text-amber border-amber/30';
    case 'green':
      return 'bg-green/10 text-green border-green/30';
  }
}

export function sevBar(s: Severity): string {
  switch (s) {
    case 'red':
      return 'bg-red';
    case 'yellow':
      return 'bg-amber';
    case 'green':
      return 'bg-green';
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
