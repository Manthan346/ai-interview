interface SparklesIconProps {
  className?: string;
}

export function SparklesIcon({ className }: SparklesIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.94 14.34 8.5 18l-1.44-3.66L3.4 12.9l3.66-1.44L8.5 7.8l1.44 3.66 3.66 1.44-3.66 1.44ZM18 9l-.8-2.2L15 6l2.2-.8L18 3l.8 2.2L21 6l-2.2.8L18 9ZM17 21l-.6-1.6-1.6-.6 1.6-.6.6-1.6.6 1.6 1.6.6-1.6.6L17 21Z" />
    </svg>
  );
}
