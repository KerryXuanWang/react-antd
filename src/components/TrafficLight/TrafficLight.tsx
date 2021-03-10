import React, { useState } from 'react';

import './TrafficLight.scss';

export interface ILight {
  color: string;
  duration: number;
  twinkleDuration?: number;
  active?: boolean;
}

const LIGHTS: ILight[] = [
  {
    color: 'red',
    duration: 20 * 1000,
    twinkleDuration: 5 * 1000,
    active: true,
  },
  {
    color: 'green',
    duration: 20 * 1000,
    twinkleDuration: 5 * 1000,
  },
  {
    color: 'yellow',
    duration: 10 * 1000,
  },
];
const TrafficLightItem: React.FC<ILight> = (props) => {
  const { active, color, duration, twinkleDuration } = props;
  const styles: any = {
    '--color': color,
    '--twinkle-delay': duration - (twinkleDuration || 0) + 'ms',
  };

  return <div key={color} className={`light ${active ? 'active' : ''}`} style={styles} />;
};

const TrafficLight: React.FC = () => {
  const [lightStatus, setLightStatus] = useState([...LIGHTS]);

  const stateChange = {
    red: 'green',
    green: 'yellow',
    yellow: 'red',
  };

  function getCurrentTime(): number {
    return window.performance.now() || Date.now();
  }

  let startTime = getCurrentTime();

  function onStateChange(): void {
    const current = lightStatus.filter((l) => l.active)[0];
    if (!current) {
      return;
    }

    const { duration, color } = current;

    const nowTime = getCurrentTime();
    if (nowTime - startTime < duration) {
      window.requestAnimationFrame(onStateChange);
      return;
    }

    lightStatus.filter((l) => l.active)[0].active = false;
    const nextColor = stateChange[color];
    lightStatus.filter((l) => l.color === nextColor)[0].active = true;

    startTime = getCurrentTime();
    setLightStatus([...lightStatus]);
  }

  requestAnimationFrame(onStateChange);

  return (
    <div className="container">
      {lightStatus.map((l, index) => {
        return <TrafficLightItem key={index} {...l} />;
      })}
    </div>
  );
};

export default TrafficLight;
