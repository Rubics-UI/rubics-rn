"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = Button;
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const variants_1 = require("../utils/variants");
const react_1 = __importDefault(require("react"));
const buttonVariants = (0, variants_1.createVariants)({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    gap: 8,
}, {
    size: {
        sm: {
            height: 36,
            paddingHorizontal: 14,
        },
        md: {
            height: 42,
            paddingHorizontal: 16,
        },
        lg: {
            height: 48,
            paddingHorizontal: 20,
        },
    },
});
function Button({ children, variant = "default", size = "md", loading, style, disabled, ...rest }) {
    const { theme } = (0, theme_1.useTheme)();
    const variantStyles = variant === "outline"
        ? {
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: theme.cardBorder,
        }
        : variant === "ghost"
            ? {
                backgroundColor: "transparent",
            }
            : {
                backgroundColor: theme.primary,
            };
    const textColor = variant === "outline" || variant === "ghost"
        ? theme.text
        : theme.primaryForeground;
    const opacity = disabled || loading ? 0.6 : 1;
    return (react_1.default.createElement(react_native_1.TouchableOpacity, { activeOpacity: 0.8, disabled: disabled || loading, style: [...buttonVariants({ size }), variantStyles, { opacity }, style], ...rest }, loading ? (react_1.default.createElement(react_native_1.ActivityIndicator, { size: "small", color: textColor })) : typeof children === "string" ? (react_1.default.createElement(react_native_1.Text, { style: {
            color: textColor,
            fontSize: 15,
            fontWeight: "600",
        } }, children)) : (children)));
}
