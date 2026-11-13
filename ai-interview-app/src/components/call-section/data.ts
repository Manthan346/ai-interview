export const aura = {
  name: "Lead AI Interviewer",
  displayName: "AURA AI",
  status: "Analyzing response patterns...",
};

export const candidate = {
  name: "Alexander Chen",
  role: "Software Engineering Candidate",
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
