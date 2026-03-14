import { Text, TouchableOpacity, View } from "react-native"
import type { ComponentProps } from "react"
import { useTheme } from "../theme"
import { createVariants } from "../utils/variants"

type Props = {
  checked: boolean
  label?: string
  size?: "sm" | "md" | "lg"
} & Omit<ComponentProps<typeof TouchableOpacity>, "onPress"> & {
  onPress?: () => void
}

const checkboxVariants = createVariants(
  {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  {
    size: {
      sm: { gap: 6 },
      md: { gap: 10 },
      lg: { gap: 14 },
    },
  }
)

export function Checkbox({
  checked,
  label,
  size = "md",
  style,
  onPress,
  ...rest
}: Props) {

  const { theme } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[...checkboxVariants({ size }), style]}
      {...rest}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: theme.cardBorder,
          backgroundColor: checked ? theme.success : "transparent",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {checked && (
          <Text
            style={{
              color: "#022c22",
              fontSize: 14,
              fontWeight: "700",
            }}
          >
            ✓
          </Text>
        )}
      </View>

      {label && (
        <Text
          style={{
            fontSize: 14,
            color: theme.text,
          }}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  )
}