import React, {useRef, useState} from 'react';
import Animated, {useAnimatedProps} from 'react-native-reanimated';
import {Path} from 'react-native-svg';

interface IAnimatedStrokeProps {
  d: string;
  progress: Animated.SharedValue<number>;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedStroke = ({d, progress}: IAnimatedStrokeProps) => {
  const [length, setLength] = useState(0);
  const ref = useRef<typeof AnimatedPath>(null);
  const strokeAnimation = useAnimatedProps(() => ({
    strokeDashoffset: length - length * progress.value,
  }));
  return (
    <AnimatedPath
      animatedProps={strokeAnimation}
      ref={ref as any}
      onLayout={() => setLength((ref.current as any)?.getTotalLength())}
      d={d}
      stroke="white"
      fill="#e03364"
      strokeWidth={3}
      strokeDasharray={length}
      strokeDashoffset={length * 0.1}
    />
  );
};

export default AnimatedStroke;
