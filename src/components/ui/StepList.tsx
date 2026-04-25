type Step = {
  number: number;
  title: string;
  description: string;
};

type StepListProps = {
  steps: Step[];
};

const ROMAN: Record<number, string> = {
  1: 'i',
  2: 'ii',
  3: 'iii',
  4: 'iv',
  5: 'v',
  6: 'vi',
  7: 'vii',
  8: 'viii',
};

export function StepList({ steps }: StepListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 lg:gap-y-0 lg:divide-x lg:divide-dotted lg:divide-rule">
      {steps.map((step) => (
        <div key={step.number} className="lg:px-6 first:lg:pl-0">
          <p className="font-serif italic text-[3rem] leading-none text-crimson font-medium">
            {ROMAN[step.number] ?? step.number}
          </p>
          <h3 className="mt-4 font-serif text-[1.5rem] font-medium text-ink leading-snug">{step.title}</h3>
          <p className="mt-3 text-sm text-inkSoft leading-relaxed">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
