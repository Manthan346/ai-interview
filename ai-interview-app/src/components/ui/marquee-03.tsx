"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee-03-utils/marquee";

type Review = {
  name: string;
  position: string;
  body: string;
  profile: string;
};

const reviews: Review[] = [
  {
    name: "Alex Morgan",
    position: "Frontend developer",
    body: "Practicing out loud with the AI interviewer made the real interview format feel much more familiar. I could focus on explaining my thinking instead of worrying about what came next.",
    profile: "/testimonialsImage/img1.jpg",
  },
  {
    name: "Jordan Lee",
    position: "Product manager",
    body: "The role-specific questions helped me practice the kinds of product and behavioral conversations I actually needed. It felt much more focused than preparing from a generic list.",
    profile: "/testimonialsImage/img2.jpg",
  },
  {
    name: "Sam Rivera",
    position: "Software engineer",
    body: "I liked being able to review feedback after each session. The notes on clarity and structure gave me something concrete to work on before practicing again.",
    profile: "/testimonialsImage/img3.jpg",
  },
  {
    name: "Taylor Brooks",
    position: "Career switcher",
    body: "The live voice practice helped me get comfortable answering without a script. I could repeat a session, try a different approach, and learn at my own pace.",
    profile: "/testimonialsImage/img4.jpg",
  },
  {
    name: "Casey Patel",
    position: "Backend developer",
    body: "Getting follow-up questions based on my answers made practice feel like a real conversation. It pushed me to explain the reasoning behind my technical decisions.",
    profile: "/testimonialsImage/img5.jpg",
  },
  {
    name: "Riley Chen",
    position: "Data analyst",
    body: "The structured evaluation made it easier to spot where my answers were vague. I left each practice session with a clear idea of what to improve next.",
    profile: "/testimonialsImage/img6.jpg",
  },
  {
    name: "Jamie Kim",
    position: "UX designer",
    body: "I could practice portfolio and behavioral questions in one place. The conversational format helped me tell a clearer story about my work and decisions.",
    profile: "/testimonialsImage/img7.jpg",
  },
  {
    name: "Avery Johnson",
    position: "New graduate",
    body: "Having a low-pressure place to practice made a big difference. I could take my time, build confidence, and get more comfortable speaking through my answers.",
    profile: "/testimonialsImage/img8.jpg",
  },
  {
    name: "Morgan Davis",
    position: "Engineering manager",
    body: "The mix of technical prompts and communication feedback helped me prepare beyond just knowing the material. I could work on how I frame my experience, too.",
    profile: "/testimonialsImage/img9.jpg",
  },
  {
    name: "Drew Wilson",
    position: "Business analyst",
    body: "The practice felt organized from start to finish, from choosing a role to reviewing my answers. It made preparation easier to fit into my schedule.",
    profile: "/testimonialsImage/img10.jpg",
  },
];

const ROTATE_INTERVAL_MS = 4500;
const FADE_DURATION_MS = 350;

function ReviewCard({ profile, name, position, body }: Review) {
  return (
    <Card className="relative w-full max-w-sm cursor-default border border-border bg-card p-4 shadow-none">
      <CardContent className="flex flex-col gap-3 p-0">
        <div className="flex items-center gap-3">
          <Image
            className="size-10 rounded-full object-cover"
            width={40}
            height={40}
            alt=""
            src={profile}
          />
          <div className="flex flex-col">
            <p className="text-sm font-medium text-foreground">{name}</p>
            <p className="text-xs font-medium text-muted-foreground">
              {position}
            </p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-foreground/80">{body}</p>
      </CardContent>
    </Card>
  );
}

/** Mobile only: shows one review at a time and rotates through them. */
function MobileRotatingReview() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const goTo = useCallback((next: number) => {
    setVisible(false);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIndex(next);
      setVisible(true);
    }, FADE_DURATION_MS);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      goTo((index + 1) % reviews.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [index, paused, goTo]);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const review = reviews[index];

  return (
    <div
      className="flex w-full flex-col items-center gap-6"
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      onTouchCancel={() => setPaused(false)}
    >
      <div
        className="flex min-h-[14rem] w-full items-center justify-center"
        aria-live="polite"
      >
        <div
          className={`flex w-full justify-center transition-all duration-[350ms] ease-out motion-reduce:transition-none ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <ReviewCard {...review} />
        </div>
      </div>

      <div className="flex items-center" role="tablist" aria-label="Reviews">
        {reviews.map((r, i) => (
          <button
            key={r.profile}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show review from ${r.name}`}
            onClick={() => goTo(i)}
            className="flex h-6 w-5 items-center justify-center"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-4 bg-primary" : "w-1.5 bg-muted-foreground/30"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function VerticalMarqueeDemo() {
  return (
    <section
      className="relative isolate overflow-hidden bg-background px-4 py-14 text-foreground sm:px-6 sm:py-24"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-14">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:mb-3 sm:text-sm">
            Candidate stories
          </p>
          <h2
            id="testimonials-heading"
            className="text-2xl font-bold tracking-tight min-[400px]:text-3xl sm:text-4xl"
          >
            Practice for the interview you want
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg">
            Build confidence with live interview practice, role-specific
            questions, and feedback you can put to work.
          </p>
        </div>

        {/* Mobile: one rotating card */}
        <div className="sm:hidden">
          <MobileRotatingReview />
        </div>

        {/* Desktop / tablet: original marquee grid */}
        <div className="relative hidden h-[36rem] w-full items-center justify-center overflow-hidden sm:flex">
          <div className="flex h-full w-full items-center justify-center gap-4 px-1 sm:px-4">
            <Marquee
              pauseOnHover
              vertical
              className="[--duration:15s] flex h-full flex-1"
            >
              {reviews
                .filter((_, index) => index % 3 === 0)
                .map((review) => (
                  <ReviewCard key={review.profile} {...review} />
                ))}
            </Marquee>
            <Marquee
              reverse
              pauseOnHover
              vertical
              className="[--duration:15s] flex h-full flex-1"
            >
              {reviews
                .filter((_, index) => index % 3 === 1)
                .map((review) => (
                  <ReviewCard key={review.profile} {...review} />
                ))}
            </Marquee>
            <Marquee
              pauseOnHover
              vertical
              className="[--duration:15s] hidden h-full flex-1 lg:flex"
            >
              {reviews
                .filter((_, index) => index % 3 === 2)
                .map((review) => (
                  <ReviewCard key={review.profile} {...review} />
                ))}
            </Marquee>
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-background to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-background to-transparent"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

export default VerticalMarqueeDemo;