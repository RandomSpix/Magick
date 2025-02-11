export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  AUTH: {
    CALLBACK: '/auth/callback',
    SIGN_IN: '/auth/sign-in',
    SIGN_UP: '/auth/sign-up',
  },
  REALMS: {
    INDEX: '/realms',
    ASTRAL: '/realms/astral-plane',
    CRYSTAL: '/realms/crystal-kingdom',
    GROVE: '/realms/sacred-grove',
    WATERS: '/realms/healing-waters',
    TEMPLE: '/realms/ethereal-temple',
  },
} as const;