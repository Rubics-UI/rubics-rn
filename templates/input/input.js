"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_2 = __importDefault(require("react"));
const theme_1 = require("../theme");
const variants_1 = require("../utils/variants");
const inputVariants = (0, variants_1.createVariants)({
    borderWidth: 1,
    borderRadius: 10,
}, {
    size: {
        sm: {
            height: 36,
            paddingHorizontal: 10,
        },
        md: {
            height: 44,
            paddingHorizontal: 12,
        },
        lg: {
            height: 50,
            paddingHorizontal: 14,
        },
    },
});
exports.Input = (0, react_1.forwardRef)(({ label, description, error, variant = "default", size = "md", style, ...rest }, ref) => {
    const { theme } = (0, theme_1.useTheme)();
    const borderColor = error ? theme.danger : theme.inputBorder;
    const variantStyles = variant === "outline"
        ? {
            borderColor,
            backgroundColor: "transparent",
        }
        : {
            borderColor,
            backgroundColor: theme.inputBg,
        };
    return (react_2.default.createElement(react_native_1.View, { style: { gap: 4 } },
        label && (react_2.default.createElement(react_native_1.Text, { style: {
                fontSize: 13,
                fontWeight: "500",
                color: theme.text,
            } }, label)),
        react_2.default.createElement(react_native_1.TextInput, { ref: ref, style: [
                ...inputVariants({ size }),
                variantStyles,
                {
                    color: theme.text,
                    fontSize: 15,
                },
                style,
            ], placeholderTextColor: theme.textMuted, ...rest }),
        error ? (react_2.default.createElement(react_native_1.Text, { style: {
                fontSize: 12,
                color: theme.danger,
            } }, error)) : description ? (react_2.default.createElement(react_native_1.Text, { style: {
                fontSize: 12,
                color: theme.textMuted,
            } }, description)) : null));
});
