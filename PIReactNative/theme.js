// src/theme.js
export const COLORS = {
    background: '#000000',
    foreground: '#ffffff',
    card: '#111111',
    primary: '#24eef7',    // Cyan
    secondary: '#48e5c2',  // Greenish
    accent: '#b59efe',     // Violet
    destructive: '#ff3b3b',
    warning: '#ffd54f',
    muted: '#1a1a1a',
    mutedForeground: '#c9c9c9',
    border: 'rgba(36, 238, 247, 0.2)',
    input: '#0c0c0c',
    success: '#3ef587',
};

// Mapeo de dificultades basado en tu CSS .badge-easy, etc.
export const DIFFICULTY_COLORS = {
    Easy: COLORS.success,
    Medium: COLORS.warning,
    Hard: COLORS.destructive,
    Expert: COLORS.accent,
};

export const FONTS = {
    regular: 'Inter-Regular', // Asumiendo que cargas la fuente, si no usa System
    bold: 'Inter-Bold',
    mono: Platform.OS === 'ios' ? 'Courier' : 'monospace',
};