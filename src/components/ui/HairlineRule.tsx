type Props = {
  variant?: 'thin' | 'soft' | 'strong';
  className?: string;
};

export function HairlineRule({ variant = 'thin', className = '' }: Props) {
  const cls =
    variant === 'soft' ? 'hairline hairline--soft' : variant === 'strong' ? 'hairline-strong' : 'hairline';
  return <hr className={`${cls} ${className}`} />;
}
