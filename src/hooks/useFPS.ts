import { useEffect, useState } from 'react';

export function useFPS() {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round(frameCount));
        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFPS);
    };

    const id = requestAnimationFrame(measureFPS);
    return () => cancelAnimationFrame(id);
  }, []);

  return fps;
}