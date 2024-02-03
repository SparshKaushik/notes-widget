import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { ReactNode } from "react";
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  children: ReactNode;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: ViewStyle;
}

export default function Button(props: ButtonProps) {
  const { theme } = useMaterial3Theme();

  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View
        style={{
          ...styles.button,
          backgroundColor: theme.dark.secondaryContainer,
          borderRadius: 32,
          ...props.buttonStyle,
        }}
      >
        <Text
          style={{
            ...styles.buttonLabel,
            color: theme.dark.onSecondaryContainer,
            ...props.textStyle,
          }}
        >
          {props.children}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 64,
    backgroundColor: "blue",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLabel: {
    marginVertical: 9,
    marginHorizontal: 16,
  },
});
