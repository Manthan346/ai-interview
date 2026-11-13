import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Auxiliam AI?",
    answer:
      "Auxiliam AI is an AI-powered interview preparation platform that helps you practice interviews, improve your communication skills, and build the confidence to perform better in real-world interviews.",
  },
  {
    question: "Is Auxiliam AI free to use?",
    answer:
      "Yes! Auxiliam AI is completely free to use. You can practice interviews and improve your skills without worrying about subscription fees.",
  },
  {
    question: "How does an AI interview work?",
    answer:
      "Simply choose your desired job role, experience level, and the number of interview questions you need to answer. Our AI interviewer will ask relevant questions, listen to your responses, and guide you through a realistic interview experience.",
  },
  {
    question: "Which job roles can I practice for?",
    answer:
      "You can prepare for interviews across various job roles and experience levels. Whether you're a fresher or an experienced professional, Auxiliam AI helps you practice relevant interview questions.",
  },
  {
    question: "Do I get feedback after completing an interview?",
    answer:
      "Absolutely! After each interview, you'll receive an AI-generated performance report highlighting your strengths, areas for improvement, answer quality, and overall performance.",
  },
  {
    question: "Can I practice interviews multiple times?",
    answer:
      "Yes! You can take multiple practice interviews to track your progress, work on your weak areas, and become more confident with every session.",
  },
  {
    question: "Does Auxiliam AI provide real-time interviews?",
    answer:
      "Yes! Auxiliam AI offers an interactive voice-based interview experience where you can answer questions naturally and receive follow-up questions based on your responses.",
  },
  {
    question: "Do I need any prior interview experience?",
    answer:
      "Not at all! Auxiliam AI is designed for everyone, including students, freshers, and experienced professionals. You can start practicing regardless of your experience level.",
  },
  {
    question: "Can Auxiliam AI guarantee that I'll get selected?",
    answer:
      "No platform can guarantee job selection. However, Auxiliam AI helps you identify weaknesses, improve your interview skills, and build the confidence needed to perform better.",
  },
  {
    question: "Is my personal information safe?",
    answer:
      "We take your privacy seriously. Your account information and interview data are handled with care and protected using appropriate security measures.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden bg-background px-4 py-20 text-foreground sm:px-6 sm:py-28"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-[48rem]">
        <div className="mb-10 text-center sm:mb-14">
          
          <h2
            id="faq-heading"
            className="text-[clamp(2rem,7vw,3.5rem)] font-extrabold leading-tight tracking-[-0.045em]"
          >
            Frequently asked questions
          </h2>
          <p className="mx-auto mt-4 max-w-[34rem] text-sm leading-relaxed text-foreground/55 sm:text-base">
            Find out how Auxiliam AI helps you prepare for your next interview.
          </p>
        </div>

        <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card/70 px-5 sm:px-8">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`faq-${index + 1}`}
              className="border-border/70"
            >
              <AccordionTrigger className="gap-4 py-5 text-left text-sm font-semibold leading-relaxed hover:no-underline sm:text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-7 text-foreground/60 sm:text-[0.9375rem]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
