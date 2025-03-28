"use client";

import { useState, useEffect } from "react";

const MediaCanvas = () => {
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(10);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prevTime) => {
          const newTime = prevTime + 1;
          if (newTime >= endTime) {
            clearInterval(timer);
            setIsPlaying(false);
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isPlaying, endTime]);

  useEffect(() => {
    if (currentTime >= startTime && currentTime <= endTime) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [currentTime, startTime, endTime]);

  const handlePlay = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(Number(e.target.value));
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(Number(e.target.value));
  };

  return (
    <div className="flex">
      {/* Left Sidebar */}
      <div className="w-48 p-4 border-r">
        <h3 className="text-lg font-bold mb-2">Controls</h3>
        <label className="block mb-2">
          Start Time (s):
          <input
            type="number"
            value={startTime}
            onChange={handleStartTimeChange}
            className="border px-2 py-1 w-full"
          />
        </label>
        <label className="block mb-2">
          End Time (s):
          <input
            type="number"
            value={endTime}
            onChange={handleEndTimeChange}
            className="border px-2 py-1 w-full"
          />
        </label>
        <button
          onClick={handlePlay}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Play
        </button>
        <div className="mt-2">
          Timer: {currentTime}s
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex justify-center items-center border">
        {isVisible ? (
        //   <img
        //     src="/image.png"
        //     alt="Media"
        //     className="max-w-full max-h-full"
        //   />
        //   For video, use the following:
          <video
            src="/video.mp4"
            className="max-w-full max-h-full"
            autoPlay
            muted
          />
        ) : (
          <div>Media will appear between {startTime}s and {endTime}s.</div>
        )}
      </div>
    </div>
  );
};

export default MediaCanvas;
