type ScreenshotPlaceholderProps = {
  label: string;
  width?: number;
  height?: number;
  className?: string;
};

export function ScreenshotPlaceholder({
  label,
  width = 800,
  height = 500,
  className = '',
}: ScreenshotPlaceholderProps) {
  return (
    <div
      className={`border border-rule bg-cream flex items-center justify-center ${className}`}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      <span className="font-mono text-xs uppercase tracking-[0.16em] text-mute px-4 text-center">
        {label}
      </span>
    </div>
  );
}
