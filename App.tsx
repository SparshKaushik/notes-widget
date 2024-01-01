import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Button,
  NativeModules,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SharedStorage = NativeModules.SharedStorage;

export default function App() {
  const [text, setText] = useState("");
  const { theme } = useMaterial3Theme();

  useEffect(() => {
    AsyncStorage.getItem("text").then((text) => {
      setText(text || "");
    })
  }, []);

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: theme.dark.background }}
    >
      <StatusBar style="auto" />
      <TextInput
        style={{ ...styles.textInput, color: theme.dark.onBackground }}
        onChangeText={(text) => {
          setText(text);
        }}
        value={text}
      />
      <TouchableNativeFeedback
        onPress={() => {
          AsyncStorage.setItem("text", text);
          SharedStorage.set(JSON.stringify({ text }));
        }}
      >
        <View
          style={{
            ...styles.button,
            backgroundColor: theme.dark.secondaryContainer,
            borderRadius: 32,
          }}
        >
          <Text
            style={{
              ...styles.buttonLabel,
              color: theme.dark.onSecondaryContainer,
            }}
          >
            Update
          </Text>
        </View>
      </TouchableNativeFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    gap: 16,
  },
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
