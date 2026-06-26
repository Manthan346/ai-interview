import auraImg from "../../../public/candidate.jpg";
import candidateImg from "../../../public/candidate.jpg";

export const aura = {
  name: "Lead AI Interviewer",
  displayName: "AURA AI",
  status: "Analyzing response patterns...",
  image: auraImg,
};

export const candidate = {
  name: "Alexander Chen",
  role: "Software Engineering Candidate",
  image: candidateImg,
};

export const transcript = [
  {
    speaker: "AURA",
    text: "Given your background in distributed systems, how would you design a scalable pub/sub architecture for millions of concurrent users?",
  },
  {
    speaker: "YOU",
    text: "I would leverage a distributed log like Kafka for persistence and partition tolerance...",
  },
];
