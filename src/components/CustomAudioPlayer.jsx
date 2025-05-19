import React, { useRef, useState, useEffect } from 'react';
import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/20/solid";

const CustomAudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
        setProgress(audio.currentTime);
    };

    const setAudioData = () => {
        // console.log("duration set:", audio.duration);
        if (!isNaN(audio.duration)) {
        setDuration(audio.duration);
        }
    };

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', updateProgress);

    return () => {
        audio.removeEventListener('loadedmetadata', setAudioData);
        audio.removeEventListener('timeupdate', updateProgress);
    };
    }, [src]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
        audio.pause();
        } else {
        audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
        const audio = audioRef.current;
        const sliderValue = e.target.value;

        if (!audio || !isFinite(duration)) return;

        const newTime = (sliderValue / 100) * duration;

        if (isFinite(newTime)) {
            audio.currentTime = newTime;
            setProgress(newTime);
        }
        };


    const formatTime = (time) => {
        if (!isFinite(time)) return '00:00';
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
        };


  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        width: '100%',
        maxWidth: '400px',
      }}
    >
      <audio ref={audioRef} src={src} preload="metadata" />
      {isPlaying ? (
        <PauseCircleIcon
          onClick={togglePlay}
          style={{
            width: '32px',
            height: '32px',
            color: 'var(--primary-40)',
            cursor: 'pointer',
          }}
        />
      ) : (
        <PlayCircleIcon
          onClick={togglePlay}
          style={{
            width: '32px',
            height: '32px',
            color: 'var(--primary-40)',
            cursor: 'pointer',
          }}
        />
      )}
      <input
        type="range"
        value={duration ? (progress / duration) * 100 : 0}
        onChange={handleSeek}
        style={{
          flex: 1,
          appearance: 'none',
          height: '6px',
          backgroundColor: '#dde3ff',
          borderRadius: '3px',
          outline: 'none',
          cursor: 'pointer',
        }}
      />
      <style>
        {`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 10px;
            height: 10px;
            background-color: var(--primary-40);
            border-radius: 50%;
          }
          input[type="range"]::-moz-range-thumb {
            width: 10px;
            height: 10px;
            background-color: var(--primary-40);
            border-radius: 50%;
            border: none;
          }
        `}
      </style>
      <div
        style={{
          fontSize: '12px',
          color: 'var(--nuetral-80)',
          display: 'flex',
          gap: '4px',
          width: '65px',
          justifyContent: 'space-between',
        }}
      >
        <span>{formatTime(progress)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default CustomAudioPlayer;
