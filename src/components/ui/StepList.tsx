type Step = {
  number: number;
  title: string;
  description: string;
};

type StepListProps = {
  steps: Step[];
};

export function StepList({ steps }: StepListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {steps.map((step) => (
        <div key={step.number} className="bg-white border border-border rounded-sm shadow-sm p-6">
          <div className="w-10 h-10 rounded-full bg-crimsonLight text-crimson font-bold text-lg flex items-center justify-center mb-4">
            {step.number}
          </div>
          <h3 className="text-lg font-semibold text-navy mb-2">{step.title}</h3>
          <p className="text-sm text-bodyText leading-relaxed">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
