import { faqItems } from "@/lib/faq";

export default function FAQ() {
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="w-full max-w-2xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      {faqItems.map((item) => (
        <div
          key={item.question}
          className="border-b border-white/10 py-6 first:border-t"
        >
          <h3 className="text-lg font-bold text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.8)] sm:text-xl">
            {item.question}
          </h3>
          <p className="mt-2 text-white/60 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">{item.answer}</p>
        </div>
      ))}
    </div>
  );
}
