import { forwardRef } from "react"
import type { ComponentProps } from "react"
import { Text, TextInput, View } from "react-native"

import { useTheme } from "../theme"
import { createVariants } from "../utils/variants"

export type InputVariant = "default" | "outline"
export type InputSize = "sm" | "md" | "lg"

export type InputProps = ComponentProps<typeof TextInput> & {
  label?: string
  description?: string
  error?: string
  variant?: InputVariant
  size?: InputSize
}

const inputVariants = createVariants(
  {
    borderWidth: 1,
    borderRadius: 10,
  },
  {
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
  }
)

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      description,
      error,
      variant = "default",
      size = "md",
      style,
      ...rest
    },
    ref
  ) => {
    const { theme } = useTheme()

    const borderColor = error ? theme.danger : theme.inputBorder

    const variantStyles =
      variant === "outline"
        ? {
            borderColor,
            backgroundColor: "transparent",
          }
        : {
            borderColor,
            backgroundColor: theme.inputBg,
          }

    return (
      <View style={{ gap: 4 }}>
        {label && (
          <Text
            style={{
              fontSize: 13,
              fontWeight: "500",
              color: theme.text,
            }}
          >
            {label}
          </Text>
        )}

        <TextInput
          ref={ref}
          style={[
            ...inputVariants({ size }),
            variantStyles,
            {
              color: theme.text,
              fontSize: 15,
            },
            style,
          ]}
          placeholderTextColor={theme.textMuted}
          {...rest}
        />

        {error ? (
          <Text
            style={{
              fontSize: 12,
              color: theme.danger,
            }}
          >
            {error}
          </Text>
        ) : description ? (
          <Text
            style={{
              fontSize: 12,
              color: theme.textMuted,
            }}
          >
            {description}
          </Text>
        ) : null}
      </View>
    )
  }
)