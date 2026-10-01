import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

// 지금 시각 기준 다음 자정!!까지 남은 초(오늘 지나면, 또 다음날 자정까지 남은 시간으로 바뀜)
const getSecondsToMidnight = () => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0); 
  return Math.floor((midnight.getTime() - now.getTime()) / 1000);
};

export function useCountdownToMidnight() {
  const [seconds, setSeconds] = useState(getSecondsToMidnight);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(getSecondsToMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}