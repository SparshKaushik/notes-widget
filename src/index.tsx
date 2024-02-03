import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { WidgetsProvider } from "./lib/context";

import Home from "./routes/Home";
import Widget from "./routes/Widget";

export default function App() {
  const [widget, setWidget] = useState<number | null>(null);
  const { theme } = useMaterial3Theme();

  return (
    <WidgetsProvider>
      <SafeAreaView
        style={{ ...styles.container, backgroundColor: theme.dark.background }}
      >
        <StatusBar style="auto" />
        {widget == null ? (
          <Home onSelectWidget={setWidget} />
        ) : (
          <Widget
            id={widget}
            onBackPress={() => {
              setWidget(null);
            }}
          />
        )}
      </SafeAreaView>
    </WidgetsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
});
