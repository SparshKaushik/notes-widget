import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { NativeModules } from "react-native";

export type Widget = {
  id: number;
  text: string;
};

export type Widgets = Widget[];

const WidgetsContext = createContext<{
  widgets: Widgets;
  widgetIds: number[];
  updateWidget: (id: number, text: string) => void;
  getWidgets: () => void;
}>({
  widgets: [],
  widgetIds: [],
  updateWidget: () => {},
  getWidgets: () => {},
});

const SharedStorage = NativeModules.SharedStorage;

export const WidgetsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [widgets, setWidgets] = useState<Widgets>([]);
  const [widgetIds, setWidgetIds] = useState<number[]>([]);

  useEffect(() => {
    getWidgets();
  }, []);

  const getWidgets = () => {
    AsyncStorage.getItem("widgets").then((widgets) => {
      setWidgets(JSON.parse(widgets || "[]"));
    });
    SharedStorage.getAllAppWidgetIds((e: number[]) => {
      setWidgetIds(e);
    });
    setWidgets(widgets.filter((widget) => widgetIds.includes(widget.id)));
    AsyncStorage.setItem("widgets", JSON.stringify(widgets));
  };

  const updateWidget = (id: number, text: string) => {
    const newWidgets = [...widgets];
    const existingWidgetIndex = newWidgets.findIndex(
      (widget) => widget.id === id
    );
    if (existingWidgetIndex !== -1) {
      newWidgets[existingWidgetIndex].text = text;
    } else {
      newWidgets.push({ id, text });
    }
    setWidgets(newWidgets);
    AsyncStorage.setItem("widgets", JSON.stringify(newWidgets));
    SharedStorage.set(
      JSON.stringify({
        text: text,
      }),
      id
    );
  };

  return (
    <WidgetsContext.Provider
      value={{ widgets, widgetIds, updateWidget, getWidgets }}
    >
      {children}
    </WidgetsContext.Provider>
  );
};

export const useWidgets = () => {
  const context = useContext(WidgetsContext);
  if (!context) {
    throw new Error("useWidgets must be used within a WidgetsProvider");
  }
  return context;
};
