export const metadata = {
  title: "Terms of Service | Auxiliam AI",
  description: "Terms governing your use of Auxiliam AI.",
};

type TermsSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  after?: string;
};

const sections: TermsSection[] = [
  {
    title: "1. About Auxiliam AI",
    paragraphs: [
      "Auxiliam AI is an AI-powered interview preparation platform designed to help individuals:",
    ],
    bullets: [
      "Practice job interviews through interactive AI-driven sessions.",
      "Improve communication and answer quality.",
      "Identify strengths and areas for improvement.",
      "Receive AI-generated interview feedback and performance reports.",
      "Build confidence for real-world job interviews.",
    ],
    after:
      "Auxiliam AI is a self-preparation tool and is not a recruitment agency, employer, or job placement service.",
  },
  {
    title: "2. Eligibility",
    paragraphs: [
      "You must be at least 18 years old to create an account and use Auxiliam AI.",
      "By using our platform, you confirm that:",
    ],
    bullets: [
      "You are at least 18 years old.",
      "The information you provide is accurate and up to date.",
      "You have the legal capacity to agree to these Terms.",
    ],
  },
  {
    title: "3. User Accounts",
    paragraphs: ["Some platform features require you to create an account.", "You agree to:"],
    bullets: [
      "Provide accurate registration information.",
      "Keep your login credentials confidential.",
      "Maintain the security of your account.",
      "Notify us if you suspect unauthorized access.",
      "Avoid sharing your account with unauthorized individuals.",
    ],
    after:
      "You are responsible for activities conducted through your account, subject to applicable law.",
  },
  {
    title: "4. Acceptable Use",
    paragraphs: [
      "You agree to use Auxiliam AI responsibly and only for lawful purposes.",
      "You must not:",
    ],
    bullets: [
      "Use the platform for fraudulent, harmful, or illegal activities.",
      "Attempt unauthorized access to our systems or databases.",
      "Reverse-engineer, copy, or reproduce our software.",
      "Interfere with platform operations or security.",
      "Upload malicious files, harmful code, or inappropriate content.",
      "Exploit or misuse our AI interview functionality.",
      "Use automated methods to extract or scrape platform content without permission.",
    ],
    after:
      "We reserve the right to restrict access when necessary to protect the platform and its users.",
  },
  {
    title: "5. AI-Generated Content and Interview Feedback",
    paragraphs: [
      "Auxiliam AI uses artificial intelligence to conduct practice interviews, process responses, and generate performance reports.",
      "You understand that:",
    ],
    bullets: [
      "AI-generated questions and feedback may contain inaccuracies.",
      "Scores and performance assessments are estimates, not objective guarantees.",
      "AI-generated recommendations are intended for learning and self-improvement.",
      "AI responses may vary between interview sessions.",
      "Our platform does not replace professional career counselling or human evaluation.",
    ],
    after:
      "Auxiliam AI does not guarantee that using the platform will result in employment, interview success, or job selection.",
  },
  {
    title: "6. Free Access and Future Pricing",
    paragraphs: [
      "Auxiliam AI is currently offered free of charge.",
      "We may introduce optional paid features, subscription plans, or additional services in the future.",
      "If pricing or subscription features are introduced, applicable pricing and payment terms will be communicated before users are required to make a purchase.",
      "We reserve the right to modify platform features and service availability, subject to applicable law.",
    ],
  },
  {
    title: "7. User Content and Interview Data",
    paragraphs: [
      "You retain ownership of the original content you submit to Auxiliam AI, including your interview responses and other personal content.",
      "By using the platform, you grant us a limited, non-exclusive right to process and use your submitted content only as necessary to:",
    ],
    bullets: [
      "Provide interview functionality.",
      "Generate transcripts and AI feedback.",
      "Store and display interview history.",
      "Maintain and secure the platform.",
      "Fulfil applicable legal obligations.",
    ],
    after:
      "We do not claim ownership of your personal interview responses. The collection, processing, storage, and deletion of personal information are explained in our Privacy Policy.",
  },
  {
    title: "8. Intellectual Property",
    paragraphs: [
      "All platform branding, logos, website designs, software, interface elements, original content, and related materials are owned by or licensed to Auxiliam AI.",
      "You may not copy, reproduce, distribute, modify, or commercially exploit these materials without prior written permission.",
      "Your right to use the platform does not transfer ownership of any intellectual property to you.",
    ],
  },
  {
    title: "9. Third-Party Services",
    paragraphs: [
      "Auxiliam AI may rely on third-party services for hosting, authentication, AI processing, voice recognition, text-to-speech, email delivery, and other technical functionality.",
      "These services may be governed by their own terms and privacy policies.",
      "We are not responsible for independent third-party services outside our reasonable control, subject to applicable law.",
    ],
  },
  {
    title: "10. Service Availability and Changes",
    paragraphs: [
      "We aim to provide a reliable and accessible platform. However, we do not guarantee uninterrupted or error-free service.",
      "We may temporarily suspend, modify, or discontinue certain features for maintenance, security, technical improvements, or other legitimate operational reasons.",
    ],
  },
  {
    title: "11. Account Suspension and Termination",
    paragraphs: ["We may suspend or terminate access to accounts that:"],
    bullets: [
      "Violate these Terms.",
      "Engage in fraudulent or abusive activities.",
      "Threaten platform security.",
      "Misuse our services or intellectual property.",
    ],
    after:
      "You may stop using Auxiliam AI and request account deletion at any time through our designated support channel. Account and personal data deletion will be handled according to our Privacy Policy and applicable legal requirements.",
  },
  {
    title: "12. Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by applicable law, Auxiliam AI shall not be liable for indirect, incidental, special, or consequential losses arising from the use of the platform.",
      "This includes reliance on AI-generated feedback, inaccurate assessments, temporary service interruptions, or third-party service failures.",
      "Nothing in these Terms excludes or limits liability that cannot legally be excluded or limited under applicable law.",
    ],
  },
  {
    title: "13. Indemnification",
    paragraphs: [
      "To the extent permitted by applicable law, you agree to be responsible for losses arising from your unlawful use of the platform, intentional misuse, or infringement of another person's rights.",
      "Nothing in this section removes any legal rights you may have under applicable law.",
    ],
  },
  {
    title: "14. Changes to These Terms",
    paragraphs: [
      "We may update these Terms to reflect changes in our services, technology, business operations, or legal requirements.",
      "Updated Terms will be published on this page with a revised Last Updated date.",
      "Where required, we will notify users of material changes.",
    ],
  },
  {
    title: "15. Governing Law and Jurisdiction",
    paragraphs: [
      "These Terms shall be governed by the laws of India.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground sm:px-8">
      <article className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-2 border-b pb-6">
          <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
          <p className="text-sm text-muted-foreground">
            <strong>Effective Date:</strong> November 13, 2026
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Last Updated:</strong> November 13, 2026
          </p>
        </header>

        <div className="space-y-4 leading-7 text-muted-foreground">
          <p className="text-xl font-semibold text-foreground">
            Welcome to Auxiliam AI.
          </p>
          <p>
            These Terms of Service  govern your access to and use of
            the Auxiliam AI website, application, and related services.
          </p>
          <p>
            Auxiliam AI is an AI-powered interview preparation platform operated
            by an individual founder. By creating an account or using our
            services, you agree to these Terms.
          </p>
          <p>If you do not agree with these Terms, please do not use the platform.</p>
        </div>

        {sections.map((section) => (
          <section key={section.title} className="space-y-3">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="leading-7 text-muted-foreground">
                {paragraph}
              </p>
            ))}
            {section.bullets && (
              <ul className="list-disc space-y-1 pl-6 leading-7 text-muted-foreground">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
            {section.after && (
              <p className="leading-7 text-muted-foreground">{section.after}</p>
            )}
          </section>
        ))}

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">16. Contact Information</h2>
          <p className="leading-7 text-muted-foreground">
            For questions, concerns, or requests regarding these Terms, please
            contact:
          </p>
          <p className="leading-7 text-muted-foreground">
            <strong>Platform:</strong> Auxiliam AI
            <br />
            <strong>Email:</strong>{" "}
            <a className="underline underline-offset-4" href="mailto:auxiliamai.help@gmail.com">
              auxiliamai.help@gmail.com
            </a>
          </p>
        </section>

        <footer className="space-y-3 border-t pt-6 leading-7 text-muted-foreground">
          <p>Thank you for choosing Auxiliam AI.</p>
          <p>
            Our goal is to help you become more confident and better prepared for
            your next interview.
          </p>
        </footer>
      </article>
    </main>
  );
}
