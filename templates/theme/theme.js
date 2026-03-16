"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = useTheme;
const react_1 = require("react");
const provider_1 = require("./provider");
const darkPalette = {
    background: "#020617",
    backgroundMuted: "#020617",
    card: "#020617",
    cardBorder: "rgba(148, 163, 184, 0.45)",
    inputBg: "#020617",
    inputBorder: "rgba(148, 163, 184, 0.7)",
    primary: "#111827",
    primaryForeground: "#f9fafb",
    accent: "#6366f1",
    success: "#22c55e",
    danger: "#f97373",
    text: "#e5e7eb",
    textMuted: "#9ca3af",
    borderSubtle: "#111827",
};
const lightPalette = {
    background: "#f9fafb",
    backgroundMuted: "#f3f4f6",
    card: "#ffffff",
    cardBorder: "#e5e7eb",
    inputBg: "#ffffff",
    inputBorder: "#d1d5db",
    primary: "#111827",
    primaryForeground: "#f9fafb",
    accent: "#4f46e5",
    success: "#16a34a",
    danger: "#dc2626",
    text: "#020617",
    textMuted: "#6b7280",
    borderSubtle: "#e5e7eb",
};
function useTheme() {
    const ctx = (0, react_1.useContext)(provider_1.ThemeContext);
    if (!ctx) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return ctx;
}
