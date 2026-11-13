export const metadata = {
  title: "Contact Auxiliam AI",
  description: "Get in touch with the Auxiliam AI team.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground sm:px-8">
      <article className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-3 border-b pb-6">
          <h1 className="text-3xl font-bold tracking-tight">Get in Touch</h1>
          <p className="leading-7 text-muted-foreground">
            Have a question, feedback, or suggestion? We&apos;d love to hear
            from you.
          </p>
          <p className="leading-7 text-muted-foreground">
            Whether you&apos;re experiencing an issue, have an idea to improve
            Auxiliam AI, or simply want to connect, feel free to reach out.
          </p>
        </header>

        <section className="space-y-4">
          <p className="leading-7 text-muted-foreground">
            <strong>Email:</strong>{" "}
            <a
              className="text-foreground underline underline-offset-4"
              href="mailto:auxiliamai.help@gmail.com"
            >
              auxiliamai.help@gmail.com
            </a>
          </p>
          <p className="leading-7 text-muted-foreground">
            <strong>LinkedIn:</strong>{" "}
            <a
              className="text-foreground underline underline-offset-4"
              href="https://www.linkedin.com/in/manthan-kushwah"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/manthan-kushwah
            </a>
          </p>
          <p className="leading-7 text-muted-foreground">
            We&apos;re always happy to hear from you and continuously improve
            your interview preparation experience.
          </p>
          <p className="font-medium text-foreground">
            Let&apos;s connect and grow together.
          </p>
        </section>
      </article>
    </main>
  );
}
