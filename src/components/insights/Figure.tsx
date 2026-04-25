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
    <figure className="my-10">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto border border-rule bg-cream"
      />
      {caption && (
        <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-mute leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
