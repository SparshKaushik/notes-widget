import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useEffect, useState } from "react";
import { BackHandler, StyleSheet, TextInput } from "react-native";
import Button from "../lib/components/Button";
import { useWidgets } from "../lib/context";
import AnimatedRoute from "../lib/components/AnimatedRoute";

interface WidgetProps {
  id: number;
  onBackPress: () => void;
}

export default function Widget({ id, onBackPress }: WidgetProps) {
  const widgets = useWidgets();
  const [text, setText] = useState("");
  const { theme } = useMaterial3Theme();

  useEffect(() => {
    const BackPressListener = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        onBackPress();
        return true;
      }
    );
    return () => {
      BackPressListener.remove();
    };
  }, []);

  return (
    <AnimatedRoute
      style={{
        gap: 16,
      }}
    >
      <TextInput
        multiline
        style={{ ...styles.textInput, color: theme.dark.onBackground }}
        onChangeText={(text) => {
          setText(text);
        }}
        value={text}
      />
      <Button
        onPress={() => {
          widgets.updateWidget(id, text);
        }}
      >
        Update
      </Button>
      <Button
        onPress={() => {
          onBackPress();
        }}
      >
        Back to Home
      </Button>
    </AnimatedRoute>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: "auto",
    padding: 8,
    borderColor: "gray",
    borderRadius: 4,
    borderWidth: 1,
  },
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
