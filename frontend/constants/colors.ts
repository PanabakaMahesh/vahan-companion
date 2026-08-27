export const COLORS = {
  primary: "#155EEF",
  primaryDark: "#0B4ACB",
  primaryLight: "#EAF1FF",

  text: "#101828",
  textSecondary: "#475467",
  textMuted: "#667085",

  background: "#F8FAFC",
  surface: "#FFFFFF",
  border: "#E4E7EC",

  success: "#12B76A",
  successLight: "#ECFDF3",

  warning: "#F79009",
  warningLight: "#FFFAEB",

  danger: "#D92D20",
  dangerLight: "#FEF3F2",

  info: "#2E90FA",
  infoLight: "#EFF8FF",
} as const;

export type ColorName = keyof typeof COLORS;