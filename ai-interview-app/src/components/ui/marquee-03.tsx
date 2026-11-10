import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee-03-utils/marquee";

type Review = {
  role: string;
  body: string;
  profile: string;
};

const reviews: Review[] = [
  {
    role: "Frontend developer",
    body: "Practicing out loud with the AI interviewer made the real interview format feel much more familiar. I could focus on explaining my thinking instead of worrying about what came next.",
    profile: "/testimonialsImage/img1.jpg",
  },
  {
    role: "Product manager",
    body: "The role-specific questions helped me practice the kinds of product and behavioral conversations I actually needed. It felt much more focused than preparing from a generic list.",
    profile: "/testimonialsImage/img2.jpg",
  },
  {
    role: "Software engineer",
    body: "I liked being able to review feedback after each session. The notes on clarity and structure gave me something concrete to work on before practicing again.",
    profile: "/testimonialsImage/img3.jpg",
  },
  {
    role: "Career switcher",
    body: "The live voice practice helped me get comfortable answering without a script. I could repeat a session, try a different approach, and learn at my own pace.",
    profile: "/testimonialsImage/img4.jpg",
  },
  {
    role: "Backend developer",
    body: "Getting follow-up questions based on my answers made practice feel like a real conversation. It pushed me to explain the reasoning behind my technical decisions.",
    profile: "/testimonialsImage/img5.jpg",
  },
  {
    role: "Data analyst",
    body: "The structured evaluation made it easier to spot where my answers were vague. I left each practice session with a clear idea of what to improve next.",
    profile: "/testimonialsImage/img6.jpg",
  },
  {
    role: "UX designer",
    body: "I could practice portfolio and behavioral questions in one place. The conversational format helped me tell a clearer story about my work and decisions.",
    profile: "/testimonialsImage/img7.jpg",
  },
  {
    role: "New graduate",
    body: "Having a low-pressure place to practice made a big difference. I could take my time, build confidence, and get more comfortable speaking through my answers.",
    profile: "/testimonialsImage/img8.jpg",
  },
  {
    role: "Engineering manager",
    body: "The mix of technical prompts and communication feedback helped me prepare beyond just knowing the material. I could work on how I frame my experience, too.",
    profile: "/testimonialsImage/img9.jpg",
  },
  {
    role: "Business analyst",
    body: "The practice felt organized from start to finish, from choosing a role to reviewing my answers. It made preparation easier to fit into my schedule.",
    profile: "/testimonialsImage/img10.jpg",
  },
];

function ReviewCard({ profile, role, body }: Review) {
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
            <p className="text-sm font-medium text-foreground">{role}</p>
            <p className="text-xs font-medium text-muted-foreground">
              Interview candidate
            </p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-foreground/80">{body}</p>
      </CardContent>
    </Card>
  );
}

function VerticalMarqueeDemo() {
  return (
    <section
      className="relative isolate overflow-hidden bg-background px-4 py-20 text-foreground sm:px-6 sm:py-24"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Candidate stories
          </p>
          <h2
            id="testimonials-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Practice for the interview you want
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Build confidence with live interview practice, role-specific
            questions, and feedback you can put to work.
          </p>
        </div>

        <div className="relative flex h-[34rem] w-full items-center justify-center overflow-hidden sm:h-[36rem]">
          <div className="flex h-full w-full items-center justify-center gap-4 px-1 sm:px-4">
            <Marquee
              pauseOnHover
              vertical
              className="[--duration:32s] hidden h-full flex-1 sm:flex"
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
              className="[--duration:36s] hidden h-full flex-1 sm:flex"
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
              className="[--duration:30s] hidden h-full flex-1 lg:flex"
            >
              {reviews
                .filter((_, index) => index % 3 === 2)
                .map((review) => (
                  <ReviewCard key={review.profile} {...review} />
                ))}
            </Marquee>
            <Marquee
              pauseOnHover
              vertical
              className="[--duration:40s] flex h-full flex-1 sm:hidden"
            >
              {reviews.map((review) => (
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
