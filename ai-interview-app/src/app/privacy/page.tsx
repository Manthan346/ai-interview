export const metadata = {
  title: "Privacy Policy | Auxiliam AI",
  description: "How Auxiliam AI collects, uses, and protects your information.",
};

type PolicyContent = {
  paragraphs?: string[];
  bullets?: string[];
  after?: string;
};

type PolicySection = PolicyContent & {
  title: string;
  subsections?: (PolicyContent & { title: string })[];
};

const sections: PolicySection[] = [
  {
    title: "1. Information We Collect",
    paragraphs: [
      "We collect information necessary to provide and improve our interview preparation services.",
    ],
    subsections: [
      {
        title: "1.1 Personal and Account Information",
        paragraphs: ["When you register or use our platform, we may collect:"],
        bullets: [
          "Full name.",
          "Email address.",
          "Authentication and account information.",
          "Professional details.",
          "Job role and experience level.",
          "Interview preferences and preparation settings.",
        ],
      },
      {
        title: "1.2 Interview Information",
        paragraphs: [
          "When you participate in an AI-powered interview, we may collect:",
        ],
        bullets: [
          "Interview questions.",
          "Your spoken responses.",
          "Transcribed interview responses.",
          "Interview history.",
          "AI-generated feedback and performance reports.",
          "Scores, recommendations, and improvement suggestions.",
        ],
      },
      {
        title: "1.3 Voice and Audio Information",
        paragraphs: ["Auxiliam AI provides voice-based interview functionality.", "When you participate in a voice interview:"],
        bullets: [
          "Your microphone captures your spoken responses.",
          "Audio is transmitted to our voice-processing provider for speech recognition and transcription.",
          "Transcribed text is used to generate AI responses and interview feedback.",
          "Audio is not intentionally retained as a permanent interview recording by Auxiliam AI after the transcription process, subject to temporary technical processing and any provider-side retention.",
        ],
        after:
          "We do not represent that third-party providers automatically delete all audio data immediately. Their retention and processing practices are subject to their applicable policies and our agreements with them.",
      },
      {
        title: "1.4 Technical and Usage Information",
        paragraphs: ["We may collect:"],
        bullets: [
          "IP address.",
          "Browser type and version.",
          "Device and operating system information.",
          "Login and session information.",
          "Platform usage and interaction data.",
          "Error logs and diagnostic information.",
        ],
      },
    ],
  },
  {
    title: "2. How We Use Your Information",
    paragraphs: ["We use your information for the following purposes:"],
    bullets: [
      "Creating and managing user accounts.",
      "Authenticating users and securing accounts.",
      "Conducting interactive AI interviews.",
      "Processing spoken responses into text.",
      "Generating AI-powered interview questions and feedback.",
      "Creating and maintaining interview reports.",
      "Saving interview history and tracking preparation progress.",
      "Providing technical support.",
      "Maintaining platform security and preventing misuse.",
      "Improving platform functionality and reliability.",
      "Meeting applicable legal obligations.",
    ],
    after:
      "We do not use your information for purposes unrelated to the services without an appropriate legal basis or consent where required.",
  },
  {
    title: "3. AI Processing and Third-Party Providers",
    paragraphs: [
      "Auxiliam AI relies on third-party technology providers to operate its services.",
      "Depending on the features being used, these may include:",
    ],
    bullets: [
      "Deepgram: Speech recognition, transcription, and voice generation.",
      "Groq: AI model processing and response generation.",
      "Hosting and infrastructure providers: Application hosting, databases, storage, and server infrastructure.",
      "Email providers: Account verification and service-related communications.",
    ],
    after:
      "These providers may process personal information on our behalf to deliver the requested functionality. We aim to share only the information necessary for each service. Third-party providers may have their own data retention, security, and privacy practices. We encourage users to review their respective privacy policies. We do not claim that third-party providers never retain or use submitted data. Their applicable contractual and privacy terms govern such processing.",
  },
  {
    title: "4. How We Store Your Information",
    paragraphs: [
      "We may store account information, interview transcripts, interview history, and AI-generated reports to provide platform functionality.",
      "Your interview history and reports may remain associated with your account until:",
    ],
    bullets: [
      "You request deletion.",
      "You delete your account.",
      "We determine deletion is necessary for security or operational reasons.",
      "Retention is required or permitted by applicable law.",
    ],
    after:
      "We do not promise indefinite storage or guarantee that information will remain available permanently. Audio recordings are not intended to be stored as permanent interview history by Auxiliam AI.",
  },
  {
    title: "5. How We Share Your Information",
    paragraphs: ["We do not sell your personal information.", "We may share relevant information with:"],
    bullets: [
      "AI and voice-processing providers.",
      "Hosting and database infrastructure providers.",
      "Email and authentication service providers.",
      "Security and technical service providers.",
      "Legal or regulatory authorities when required by law.",
    ],
    after:
      "Information may also be disclosed when necessary to protect our rights, users, or platform security, subject to applicable law.",
  },
  {
    title: "6. International Data Processing",
    paragraphs: [
      "Some third-party technology providers may process information on servers located outside India.",
      "Where your information is processed internationally, we aim to use appropriate safeguards and comply with applicable Indian data protection requirements and other applicable laws.",
    ],
  },
  {
    title: "7. Data Security",
    paragraphs: ["We take reasonable technical and organizational measures to protect your personal information.", "These measures may include:"],
    bullets: [
      "Secure authentication mechanisms.",
      "Access restrictions.",
      "Encrypted communication where supported.",
      "Database security controls.",
      "Monitoring for suspicious activity.",
      "Appropriate handling of application credentials and secrets.",
    ],
    after: "However, no internet-based service can guarantee absolute security.",
  },
  {
    title: "8. Data Retention and Deletion",
    paragraphs: [
      "We retain personal information only for as long as reasonably necessary to provide our services, fulfil operational requirements, and meet applicable legal obligations.",
      "You may request deletion of your account and associated interview information.",
      "Upon receiving a valid deletion request, we will take appropriate steps to delete or anonymize the relevant personal information, subject to applicable legal requirements and legitimate retention obligations.",
      "Some information may remain temporarily in backups, security logs, or third-party systems until their applicable retention periods expire.",
      "For account deletion and privacy requests, contact:",
      "Email: auxiliamai.help@gmail.com",
    ],
  },
  {
    title: "9. Your Privacy Rights",
    paragraphs: [
      "Subject to applicable law, you may have rights to:",
    ],
    bullets: [
      "Access information about your personal data.",
      "Request correction of inaccurate or incomplete information.",
      "Request deletion of personal information.",
      "Withdraw consent where processing is based on consent.",
      "Raise grievances regarding the processing of personal information.",
      "Exercise other rights available under applicable data protection laws.",
    ],
    after:
      "You can contact us using the details provided in this policy to exercise your rights. We will handle requests in accordance with applicable legal requirements.",
  },
  {
    title: "10. Cookies and Similar Technologies",
    paragraphs: ["Auxiliam AI may use cookies and similar technologies to:"],
    bullets: [
      "Maintain login sessions.",
      "Remember user preferences.",
      "Improve platform functionality.",
      "Understand website usage.",
      "Maintain security.",
    ],
    after:
      "You may manage cookies through your browser settings. Disabling certain cookies may affect platform functionality. Where required, we will seek appropriate consent for non-essential cookies and tracking technologies.",
  },
  {
    title: "11. Children's Privacy",
    paragraphs: [
      "Auxiliam AI is intended for individuals aged 18 years and above.",
      "We do not knowingly allow individuals under 18 to register for or use our services.",
      "If we become aware that personal information has been collected from an individual under 18 in violation of applicable law, we will take appropriate steps to address the situation.",
    ],
  },
  {
    title: "12. Changes to This Privacy Policy",
    paragraphs: [
      "We may update this Privacy Policy when our services, data practices, or legal obligations change.",
      "Any revised version will be published on this page with an updated Last Updated date.",
      "Where required, users will be notified of significant changes.",
    ],
  },
  {
    title: "13. Contact and Grievance Redressal",
    paragraphs: [
      "For questions, privacy requests, or complaints relating to your personal information, contact:",
      "Platform: Auxiliam AI",
      "Email: auxiliamai.help@gmail.com",
      "We will review and respond to privacy-related requests in accordance with applicable law.",
    ],
  },
];

function ContentList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-6 leading-7 text-muted-foreground">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function PolicyParagraph({ text }: { text: string }) {
  const emailPrefix = "Email: ";
  if (text.startsWith(emailPrefix)) {
    const email = text.slice(emailPrefix.length);
    return (
      <p className="leading-7 text-muted-foreground">
        <strong>Email:</strong>{" "}
        <a
          className="underline underline-offset-4"
          href={`mailto:${email}`}
        >
          {email}
        </a>
      </p>
    );
  }

  return <p className="leading-7 text-muted-foreground">{text}</p>;
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground sm:px-8">
      <article className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-2 border-b pb-6">
          <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">
            <strong>Effective Date:</strong> November 13, 2026
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Last Updated:</strong> November 13, 2026
          </p>
        </header>

        <div className="space-y-4 leading-7 text-muted-foreground">
          <p>At Auxiliam AI, your privacy matters to us.</p>
          <p>
            This Privacy Policy explains how we collect, use, process, store,
            and protect your personal information when you access or use our
            website, application, and services.
          </p>
          <p>
            Auxiliam AI is operated by an individual founder. This policy
            applies to all users of the platform.
          </p>
          <p>By using Auxiliam AI, you acknowledge that you have read this Privacy Policy.</p>
        </div>

        {sections.map((section) => (
          <section key={section.title} className="space-y-3">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            {section.paragraphs?.map((paragraph) => (
              <PolicyParagraph key={paragraph} text={paragraph} />
            ))}
            {section.bullets && <ContentList items={section.bullets} />}
            {section.after && (
              <p className="leading-7 text-muted-foreground">{section.after}</p>
            )}
            {section.subsections?.map((subsection) => (
              <div key={subsection.title} className="space-y-3 pt-2">
                <h3 className="text-base font-semibold">{subsection.title}</h3>
                {subsection.paragraphs?.map((paragraph) => (
                  <PolicyParagraph key={paragraph} text={paragraph} />
                ))}
                {subsection.bullets && (
                  <ContentList items={subsection.bullets} />
                )}
                {subsection.after && (
                  <p className="leading-7 text-muted-foreground">
                    {subsection.after}
                  </p>
                )}
              </div>
            ))}
          </section>
        ))}

        <footer className="space-y-3 border-t pt-6 leading-7 text-muted-foreground">
          <p>
            Your trust is important to us. We are committed to handling your
            information responsibly while helping you prepare for better
            interviews.
          </p>
          <p>
            <strong>Thank you for using Auxiliam AI.</strong>
          </p>
        </footer>
      </article>
    </main>
  );
}
