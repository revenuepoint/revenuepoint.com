type Props = {
  children: React.ReactNode;
  as?: 'p' | 'span' | 'div';
  className?: string;
};

export function Byline({ children, as: Tag = 'p', className = '' }: Props) {
  return <Tag className={`byline ${className}`}>{children}</Tag>;
}
