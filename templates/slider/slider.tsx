import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  AccessibilityInfo,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  startLabel?: string;
  endLabel?: string;
  trackColor?: string;
  rangeColor?: string;
  thumbColor?: string;
  disabled?: boolean;
}

const THUMB_SIZE = 22;
const TRACK_HEIGHT = 4;

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value = 0,
  onValueChange,
  startLabel,
  endLabel,
  trackColor = "#e2e8f0",
  rangeColor = "#0f172a",
  thumbColor = "#ffffff",
  disabled = false,
}: SliderProps) {
  const trackWidth = useSharedValue(0);
  const position = useSharedValue(
    ((value - min) / (max - min)) * (trackWidth.value || 1)
  );
  const lastPosition = useSharedValue(position.value);

  const clamp = (val: number, lo: number, hi: number) =>
    Math.min(Math.max(val, lo), hi);

  const positionToValue = useCallback(
    (pos: number, width: number) => {
      const ratio = clamp(pos / width, 0, 1);
      const raw = ratio * (max - min) + min;
      const stepped = Math.round(raw / step) * step;
      return clamp(parseFloat(stepped.toFixed(10)), min, max);
    },
    [min, max, step]
  );

  const gesture = Gesture.Pan()
    .enabled(!disabled)
    .onStart(() => {
      lastPosition.value = position.value;
    })
    .onUpdate((e) => {
      const next = clamp(
        lastPosition.value + e.translationX,
        0,
        trackWidth.value
      );
      position.value = next;
      const newValue = positionToValue(next, trackWidth.value);
      if (onValueChange) runOnJS(onValueChange)(newValue);
    })
    .onEnd(() => {
      // Snap to step
      const snapped =
        (positionToValue(position.value, trackWidth.value) - min) /
        (max - min) *
        trackWidth.value;
      position.value = snapped;
    });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value - THUMB_SIZE / 2 }],
  }));

  const rangeStyle = useAnimatedStyle(() => ({
    width: position.value,
  }));

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        {/* Labels */}
        {(startLabel || endLabel) && (
          <View style={styles.labelRow}>
            {startLabel ? (
              <Text style={styles.label}>{startLabel}</Text>
            ) : (
              <View />
            )}
            {endLabel && <Text style={styles.label}>{endLabel}</Text>}
          </View>
        )}

        {/* Track */}
        <View
          style={[styles.trackWrapper]}
          onLayout={(e) => {
            const w = e.nativeEvent.layout.width;
            trackWidth.value = w;
            position.value =
              ((value - min) / (max - min)) * w;
          }}
        >
          {/* Background track */}
          <View
            style={[
              styles.track,
              { backgroundColor: trackColor, height: TRACK_HEIGHT },
            ]}
          />

          {/* Filled range */}
          <Animated.View
            style={[
              styles.range,
              rangeStyle,
              { backgroundColor: rangeColor, height: TRACK_HEIGHT },
            ]}
          />

          {/* Thumb */}
          <GestureDetector gesture={gesture}>
            <Animated.View
              style={[
                styles.thumb,
                thumbStyle,
                {
                  backgroundColor: thumbColor,
                  width: THUMB_SIZE,
                  height: THUMB_SIZE,
                  borderRadius: THUMB_SIZE / 2,
                  borderColor: rangeColor,
                  opacity: disabled ? 0.4 : 1,
                },
              ]}
              accessibilityRole="adjustable"
              accessibilityValue={{ min, max, now: value }}
            />
          </GestureDetector>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 8,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
  },
  trackWrapper: {
    width: "100%",
    height: THUMB_SIZE,
    justifyContent: "center",
  },
  track: {
    position: "absolute",
    left: 0,
    right: 0,
    borderRadius: 999,
  },
  range: {
    position: "absolute",
    left: 0,
    borderRadius: 999,
  },
  thumb: {
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 2,
  },
});