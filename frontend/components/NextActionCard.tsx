"use client";

interface NextActionCardProps {
  eyebrow?: string;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  tone?: "blue" | "green" | "orange";
}

export default function NextActionCard({
  eyebrow = "Your next step",
  title,
  description,
  actionLabel,
  onAction,
  tone = "blue",
}: NextActionCardProps) {
  const styles = {
    blue: {
      wrapper: "border-[#C7D7FE] bg-[#F5F8FF]",
      icon: "bg-[#EAF1FF] text-[#155EEF]",
      eyebrow: "text-[#155EEF]",
    },

    green: {
      wrapper: "border-[#ABEFC6] bg-[#F6FEF9]",
      icon: "bg-[#ECFDF3] text-[#067647]",
      eyebrow: "text-[#067647]",
    },

    orange: {
      wrapper: "border-[#FEDF89] bg-[#FFFCF5]",
      icon: "bg-[#FFFAEB] text-[#B54708]",
      eyebrow: "text-[#B54708]",
    },
  };

  const style = styles[tone];

  return (
    <section
      className={`rounded-2xl border p-5 sm:p-7 ${style.wrapper}`}
      aria-label={eyebrow}
    >
      <div className="flex items-start gap-4">
        {/* Step indicator */}
        <div
          aria-hidden="true"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-extrabold ${style.icon}`}
        >
          →
        </div>

        <div className="min-w-0 flex-1">
          {/* Eyebrow */}
          <p
            className={`text-xs font-extrabold uppercase tracking-widest ${style.eyebrow}`}
          >
            {eyebrow}
          </p>

          {/* Title */}
          <h2 className="mt-2 text-lg font-extrabold tracking-tight text-[#101828] sm:text-xl">
            {title}
          </h2>

          {/* Explanation */}
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#475467]">
            {description}
          </p>

          {/* Action */}
          <button
            type="button"
            onClick={onAction}
            className="primary-button mt-5 sm:w-auto"
          >
            {actionLabel}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}