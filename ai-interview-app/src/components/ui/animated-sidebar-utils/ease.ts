export const EASE_DRAWER = [0.2, 0, 0, 1] as const;
export const EASE_OUT = [0.25, 1, 0.25, 1] as const;
export const SPRING_LAYOUT = {
  type: "spring",
  stiffness: 500,
  damping: 30,
} as const;
export const SPRING_PRESS = {
  type: "spring",
  stiffness: 600,
  damping: 20,
} as const;
