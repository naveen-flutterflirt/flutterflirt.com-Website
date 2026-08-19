const faqs = [
  {
    question: "What is the typical implementation timeline?",
    answer:
      "Implementation timelines depend on the project scope, integrations, and customization required. We typically define a clear roadmap during the initial assessment.",
  },
  {
    question: "How does your pricing model work?",
    answer:
      "Our pricing is based on the scope, complexity, integrations, and ongoing support requirements of each project.",
  },
  {
    question: "Which industries do you typically serve?",
    answer:
      "We work with organizations across multiple industries and tailor our solutions to their operational and technology requirements.",
  },
  {
    question: "What support and monitoring is included?",
    answer:
      "Our support includes system monitoring, issue resolution, optimization, and ongoing assistance to keep your digital ecosystem running smoothly.",
  },
  {
    question: "Do you offer managed services after go-live?",
    answer:
      "Yes. We provide managed services and continuous optimization after launch to help businesses maintain and improve their systems.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-[#edf5ff] px-8 py-8 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1600px]">
        <h2 className="mb-6 text-[30px] font-bold text-[#1d2b42]">
          FAQ
        </h2>

        <div>
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="group border-b border-dashed border-[#c3d8f7]"
            >
              <summary
                className="
                  flex
                  cursor-pointer
                  list-none
                  items-center
                  justify-between
                  py-5
                  text-[15px]
                  font-bold
                  text-[#1d2b42]
                  outline-none
                  sm:text-[17px]
                  md:text-[18px]
                  [&::-webkit-details-marker]:hidden
                "
              >
                <span>{faq.question}</span>

                {/* Chevron */}
                <svg
                  className="
                    h-5
                    w-5
                    shrink-0
                    text-[#8da3c0]
                    transition-transform
                    duration-300
                    group-open:rotate-180
                  "
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>

              <div className="pb-6 pr-10 text-[16px] leading-relaxed text-[#7185a2]">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}