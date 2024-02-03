import { MotiView } from "moti";
import { ViewStyle } from "react-native";

export default function AnimatedRoute(props: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <MotiView
      from={{
        opacity: 0,
        translateY: 100,
      }}
      animate={{
        opacity: 1,
        translateY: 0,
      }}
      transition={{
        type: "timing",
        duration: 500,
      }}
      style={props.style}
    >
      {props.children}
    </MotiView>
  );
}
