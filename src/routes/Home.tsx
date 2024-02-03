import { useWidgets } from "../lib/context";
import Button from "../lib/components/Button";
import AnimatedRoute from "../lib/components/AnimatedRoute";
import { useEffect } from "react";

interface HomeProps {
  onSelectWidget: (id: number) => void;
}

export default function Home(props: HomeProps) {
  const widgets = useWidgets();

  useEffect(() => {
    if (widgets.widgetIds.length === 1) {
      props.onSelectWidget(widgets.widgetIds[0]);
    }
  }, []);

  return (
    <AnimatedRoute
      style={{
        gap: 16,
      }}
    >
      {widgets.widgetIds.map((widget) => (
        <Button
          key={widget}
          onPress={() => {
            props.onSelectWidget(widget);
          }}
        >
          {widgets.widgets.find((w) => w.id === widget)?.text ?? widget}
        </Button>
      ))}
    </AnimatedRoute>
  );
}
