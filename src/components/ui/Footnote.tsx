type RefProps = {
  children: React.ReactNode;
};

type NoteProps = {
  num: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

/** Inline footnote marker — small italic crimson superscript */
export function FootnoteRef({ children }: RefProps) {
  return <sup className="footnote-num">{children}</sup>;
}

/** Marginalia annotation — mono micro, mute color, with a serif italic numeral */
export function Footnote({ num, children, className = '' }: NoteProps) {
  return (
    <p className={`footnote ${className}`}>
      <span className="footnote-num">{num}</span>
      {children}
    </p>
  );
}
