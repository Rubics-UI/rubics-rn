"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeContext = void 0;
exports.ThemeProvider = ThemeProvider;
exports.useTheme = useTheme;
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_2 = __importDefault(require("react"));
const palette_1 = require("./palette");
exports.ThemeContext = (0, react_1.createContext)(null);
function ThemeProvider({ children }) {
    const scheme = (0, react_native_1.useColorScheme)() ?? "light";
    const [colorMode, setColorMode] = (0, react_1.useState)(scheme === "dark" ? "dark" : "light");
    const value = (0, react_1.useMemo)(() => ({
        colorMode,
        theme: colorMode === "dark" ? palette_1.darkPalette : palette_1.lightPalette,
        toggleColorMode: () => setColorMode((prev) => (prev === "dark" ? "light" : "dark")),
    }), [colorMode]);
    return (react_2.default.createElement(exports.ThemeContext.Provider, { value: value }, children));
}
function useTheme() {
    const ctx = (0, react_1.useContext)(exports.ThemeContext);
    if (!ctx) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return ctx;
}
