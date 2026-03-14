import type { ReactNode, ComponentProps } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../theme";
import { createVariants } from "../utils/variants";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type Props = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
} & ComponentProps<typeof TouchableOpacity>;

const buttonVariants = createVariants(
  {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    gap: 8,
  },
  {
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
  }
);

export function Button({
  children,
  variant = "default",
  size = "md",
  loading,
  style,
  disabled,
  ...rest
}: Props) {
  const { theme } = useTheme();

  const variantStyles =
    variant === "outline"
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

  const textColor =
    variant === "outline" || variant === "ghost"
      ? theme.text
      : theme.primaryForeground;

  const opacity = disabled || loading ? 0.6 : 1;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      style={[...buttonVariants({ size }), variantStyles, { opacity }, style]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : typeof children === "string" ? (
        <Text
          style={{
            color: textColor,
            fontSize: 15,
            fontWeight: "600",
          }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}