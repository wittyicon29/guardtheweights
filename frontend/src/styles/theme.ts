/**
 * Dark Fantasy Theme - Echoes of Aethermoor
 * Color palette and design tokens for the mystical interface
 */

export const theme = {
  // Cosmic Background
  void: '#06080f',

  // Panel Styling
  stone: '#0e1020',
  stoneBorder: '#6b4f2a',
  stoneLight: '#1a1a2e',

  // Primary Accent Colors
  teal: '#00f5c4',
  gold: '#c9a84c',
  purple: '#2a1f4e',
  parchment: '#e8dfc0',

  // State Colors
  cold: '#3a6b8a',
  warm: '#d4621a',

  // Additional Variants
  bronzeBorder: '#6b4f2a',
  obsidianPurple: '#2a1f4e',
  celestialGold: '#c9a84c',
  etherealTeal: '#00f5c4',
  coldState: '#3a6b8a',
  warmState: '#d4621a',

  // Text Colors
  light: '#e8dfc0',
  lightDim: 'rgba(232, 223, 192, 0.7)',
  lightFaint: 'rgba(232, 223, 192, 0.5)',
  bronze: '#6b4f2a',
  bronzeDim: 'rgba(107, 79, 42, 0.7)',

  // Glows and Effects
  glowTeal: '0 0 20px rgba(0, 245, 196, 0.5)',
  glowGold: '0 0 20px rgba(201, 168, 76, 0.5)',
  glowPurple: '0 0 15px rgba(42, 31, 78, 0.4)',
} as const;

export type Theme = typeof theme;
