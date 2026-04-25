type Props = {
  children: React.ReactNode;
  as?: 'p' | 'span' | 'div';
  className?: string;
};

export function Eyebrow({ children, as: Tag = 'p', className = '' }: Props) {
  return <Tag className={`eyebrow ${className}`}>{children}</Tag>;
}
