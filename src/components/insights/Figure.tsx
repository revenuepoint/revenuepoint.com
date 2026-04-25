export function Figure({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}) {
  return (
    <figure className="my-8">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto rounded-md border border-border bg-offWhite"
      />
      {caption && (
        <figcaption className="mt-2 text-xs text-mutedText leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
