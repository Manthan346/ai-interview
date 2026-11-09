"use client"
import { SparklesIcon } from "../shared/icons";
import { useInView } from "@/app/hooks/useInView";
import { useTypewriter } from "@/app/hooks/useTypewriter";
import { FeatureCard } from "./FeatureCard";
import { styles } from "./features.styles";
import type { ChatMessage, LiveRoleplayContent } from "./features.types";

function AiBubble({ message, text, typing }: { message: ChatMessage; text: string; typing: boolean }) {
  return (
    <div className={styles.chatRowAi}>
      <span className={styles.chatAvatar}>
        <SparklesIcon className={styles.chatAvatarIcon} />
      </span>
      <p className={styles.bubbleAi}>
        {text}
        {typing && <span className={styles.caret} aria-hidden="true" />}
        <span className="sr-only">{message.text}</span>
      </p>
    </div>
  );
}

export function LiveRoleplayCard({ title, subtitle, badge, listeningLabel, messages }: LiveRoleplayContent) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.3 });
  const typingMessage = messages.find((m) => m.typing);
  const typed = useTypewriter(typingMessage?.text ?? "", { enabled: inView });

  return (
    <FeatureCard title={title} subtitle={subtitle} badge={badge} cardRef={ref} className={styles.cardTall} animationDelay={0.05}>
      <div className={styles.chat}>
        {messages.map((message) =>
          message.from === "user" ? (
            <div key={message.id} className={styles.chatRowUser}>
              <p className={styles.bubbleUser}>{message.text}</p>
            </div>
          ) : (
            <AiBubble
              key={message.id}
              message={message}
              text={message.typing ? typed : message.text}
              typing={Boolean(message.typing)}
            />
          ),
        )}
      </div>

      <div className={styles.listening}>
        <span className={styles.waveform} aria-hidden="true">
          {styles.waveDelays.map((delay) => (
            <span key={delay} className={`${styles.waveBar} ${delay}`} />
          ))}
        </span>
        {listeningLabel}
      </div>
    </FeatureCard>
  );
}
