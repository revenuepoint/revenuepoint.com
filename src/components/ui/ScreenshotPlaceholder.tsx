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
      className={`border-2 border-dashed border-crimson/30 bg-lightGray rounded-sm flex items-center justify-center ${className}`}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      <span className="text-sm text-mutedText px-4 text-center">{label}</span>
    </div>
  );
}
