  import Link from "next/link";

export const metadata = {
  title: "About Auxiliam AI",
  description:
    "Learn about Auxiliam AI's mission to make interview preparation accessible and effective.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground sm:px-8">
      <article className="mx-auto max-w-3xl space-y-10">
        <header className="space-y-3 border-b pb-6">
          <h1 className="text-3xl font-bold tracking-tight">About Auxiliam AI</h1>
          <h2 className="text-xl font-semibold">Helping You Become Interview-Ready</h2>
          <p className="leading-7 text-muted-foreground">
            Interviews can be challenging, especially when you don&apos;t know
            what to expect or how to prepare. At <strong>Auxiliam AI</strong>,
            we believe that everyone deserves the opportunity to practice,
            improve, and approach interviews with confidence.
          </p>
          <p className="leading-7 text-muted-foreground">
            That&apos;s why we&apos;re building an AI-powered interview
            preparation platform designed to make interview practice more
            accessible, interactive, and effective.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Our Mission</h2>
          <p className="leading-7 text-muted-foreground">
            Our mission is simple: to help people become more confident and
            prepared for their next interview.
          </p>
          <p className="leading-7 text-muted-foreground">
            We want to make quality interview practice available whenever you
            need it, without the pressure of a real interview. With AI-powered
            conversations and personalized feedback, you can identify your
            strengths, understand where you need to improve, and keep getting
            better with every practice session.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">What We Do</h2>
          <p className="leading-7 text-muted-foreground">
            Auxiliam AI gives you an opportunity to experience realistic,
            voice-based interview practice in a comfortable environment.
          </p>
          <p className="leading-7 text-muted-foreground">
            With Auxiliam AI, you can:
          </p>
          <ul className="list-disc space-y-2 pl-6 leading-7 text-muted-foreground">
            <li>
              <strong>Practice Realistic Interviews:</strong> Experience
              interactive AI-powered interviews based on your selected job role
              and experience level.
            </li>
            <li>
              <strong>Get Personalized Feedback:</strong> Understand your
              performance through AI-generated insights and reports.
            </li>
            <li>
              <strong>Identify Areas for Improvement:</strong> Discover your
              strengths and areas where you can improve your answers.
            </li>
            <li>
              <strong>Practice at Your Own Pace:</strong> Prepare whenever you
              want and repeat interviews as you continue learning.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Why Auxiliam AI?</h2>
          <p className="leading-7 text-muted-foreground">
            We understand that interview preparation isn&apos;t just about
            knowing the right answers. It&apos;s also about communicating
            clearly, organizing your thoughts, and building confidence.
          </p>
          <p className="leading-7 text-muted-foreground">
            Auxiliam AI aims to bring these elements together through an
            interactive preparation experience that helps you learn from every
            attempt.
          </p>
          <p className="font-medium text-foreground">
            No pressure. No judgment. Just an opportunity to improve.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Our Vision</h2>
          <p className="leading-7 text-muted-foreground">
            We envision a future where interview preparation is not limited by
            access to mentors, practice partners, or expensive resources.
          </p>
          <p className="leading-7 text-muted-foreground">
            We want Auxiliam AI to become a reliable companion throughout your
            interview preparation journey, helping you turn uncertainty into
            confidence and preparation into progress.
          </p>
        </section>

        <section className="space-y-3 border-t pt-8">
          <h2 className="text-xl font-semibold">
            Your Next Interview Starts Here.
          </h2>
          <p className="leading-7 text-muted-foreground">
            Every great interview begins with preparation. Take the first step,
            practice with Auxiliam AI, and keep moving forward.
          </p>
          <p className="font-semibold text-primary">Practice. Improve. Succeed.</p>
          <p className="italic text-muted-foreground">
            Auxiliam AI — Your preparation partner for better interviews.
          </p>
        </section>

        <p className="border-t pt-6 text-sm leading-6 text-muted-foreground">
          Note: Auxiliam AI is an interview preparation platform. AI-generated
          feedback is intended to support learning and does not guarantee job
          selection or employment.
        </p>
        <p className="text-sm text-muted-foreground">
          Have a question or suggestion?{" "}
          <Link
            href="/contact"
            className="font-medium text-primary underline underline-offset-4"
          >
            Get in touch
          </Link>
          .
        </p>
      </article>
    </main>
  );
}
