"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkbox = Checkbox;
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const variants_1 = require("../utils/variants");
const react_1 = __importDefault(require("react"));
const checkboxVariants = (0, variants_1.createVariants)({
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
}, {
    size: {
        sm: { gap: 6 },
        md: { gap: 10 },
        lg: { gap: 14 },
    },
});
function Checkbox({ checked, label, size = "md", style, onPress, ...rest }) {
    const { theme } = (0, theme_1.useTheme)();
    return (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: onPress, style: [...checkboxVariants({ size }), style], ...rest },
        react_1.default.createElement(react_native_1.View, { style: {
                width: 20,
                height: 20,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: theme.cardBorder,
                backgroundColor: checked ? theme.success : "transparent",
                alignItems: "center",
                justifyContent: "center",
            } }, checked && (react_1.default.createElement(react_native_1.Text, { style: {
                color: "#022c22",
                fontSize: 14,
                fontWeight: "700",
            } }, "\u2713"))),
        label && (react_1.default.createElement(react_native_1.Text, { style: {
                fontSize: 14,
                color: theme.text,
            } }, label))));
}
