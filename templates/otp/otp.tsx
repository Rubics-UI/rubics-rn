import React, { useEffect, useMemo, useRef, useState } from "react"
import type { ComponentProps } from "react"
import { Text, TextInput, View } from "react-native"

import { useTheme } from "../theme"
import { createVariants } from "../utils/variants"

type OtpLength = 4 | 6 | 8

type OtpSize = "sm" | "md" | "lg"

type Props = {
  /**
   * Number of OTP boxes.
   * Only 4, 6 and 8 are allowed.
   */
  length?: OtpLength
  /**
   * Label shown above the inputs.
   */
  label?: string
  /**
   * Helper text shown below the inputs.
   */
  description?: string
  /**
   * Error text shown below the inputs and
   * switches the inputs into an error state.
   */
  error?: string
  /**
   * Size of the OTP boxes.
   */
  size?: OtpSize
  /**
   * Called every time the OTP value changes.
   */
  onChangeCode?: (code: string) => void
  /**
   * Called when the user has filled all boxes.
   */
  onComplete?: (code: string) => void
} & Omit<ComponentProps<typeof TextInput>, "onChangeText" | "value">

const otpContainerVariants = createVariants(
  {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  {}
)

const otpBoxVariants = createVariants(
  {
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
  },
  {
    size: {
      sm: {
        width: 40,
        height: 44,
        fontSize: 18,
      },
      md: {
        width: 44,
        height: 50,
        fontSize: 20,
      },
      lg: {
        width: 52,
        height: 56,
        fontSize: 22,
      },
    },
  }
)

export function OtpInput({
  length = 4,
  label,
  description,
  error,
  size = "md",
  style,
  keyboardType = "number-pad",
  onChangeCode,
  onComplete,
  ...rest
}: Props) {
  const { theme } = useTheme()

  const safeLength: OtpLength = useMemo(() => {
    if (length === 6 || length === 8) return length
    return 4
  }, [length])

  const [values, setValues] = useState<string[]>(() =>
    Array.from({ length: safeLength }, () => "")
  )

  useEffect(() => {
    setValues(Array.from({ length: safeLength }, () => ""))
  }, [safeLength])

  const inputsRef = useRef<Array<TextInput | null>>([])

  const borderColor = error ? theme.danger : theme.inputBorder
  const backgroundColor = theme.inputBg

  const handleChange = (text: string, index: number) => {
    const char = text.slice(-1)
    const nextValues = [...values]
    nextValues[index] = char
    setValues(nextValues)

    const code = nextValues.join("")
    onChangeCode?.(code)

    if (char && index < safeLength - 1) {
      inputsRef.current[index + 1]?.focus()
    }

    if (code.length === safeLength && !nextValues.includes("")) {
      onComplete?.(code)
    }
  }

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  return (
    <View style={{ gap: 8 }}>
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

      <View style={[...otpContainerVariants(), style]}>
        {Array.from({ length: safeLength }).map((_, index) => (
          <TextInput
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el
            }}
            value={values[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType={keyboardType}
            maxLength={1}
            style={[
              {
                borderColor,
                backgroundColor,
                color: theme.text,
              },
              ...otpBoxVariants({ size }),
            ]}
            placeholder="-"
            placeholderTextColor={theme.textMuted}
            {...rest}
          />
        ))}
      </View>

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

