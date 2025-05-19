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

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    // 초기화: src가 바뀌었을 때만
    setIsPlaying(false);
    setProgress(0);
    setDuration(0);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [src]);

  const handleMetadataLoad = (e) => {
  const audio = audioRef.current;
  if (!audio) return;

  // duration이 0 또는 Infinity인 경우 강제 초기화
  if (!isFinite(audio.duration) || audio.duration === 0) {
    audio.currentTime = 1e101;
    audio.ontimeupdate = () => {
      audio.currentTime = 0;
      audio.ontimeupdate = null;
      setDuration(audio.duration); // 이 시점에 duration이 유효해짐
    };
  } else {
    setDuration(audio.duration);
  }
};

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Audio play failed:", error);
          });
      }
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const sliderValue = e.target.value;

    if (!audio || !isFinite(duration)) return;

    const newTime = (sliderValue / 100) * duration;
    if (isFinite(newTime)) {
      audio.currentTime = newTime;
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
        maxWidth: '600px',
      }}
    >
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={handleMetadataLoad}
      />
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
  min="0"
  max="100"
  value={duration > 0 ? (progress / duration) * 100 : 0}
  onChange={handleSeek}
  style={{
    flex: 1,
    appearance: 'none',
    width: "500px",
    height: '6px',
    borderRadius: '3px',
    outline: 'none',
    cursor: 'pointer',
    background: `linear-gradient(to right, var(--primary-60) 0%, var(--primary-60) ${duration > 0 ? (progress / duration) * 100 : 0}%, var(--primary-10) ${duration > 0 ? (progress / duration) * 100 : 0}%, var(--primary-10) 100%)`,
  }}
/>

      <style>
        {`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 10px;
            height: 10px;
            background-color: var(--primary-60);
            border-radius: 50%;
            cursor: pointer;
          }
          input[type="range"]::-moz-range-thumb {
            width: 10px;
            height: 10px;
            background-color: var(--primary-60);
            border-radius: 50%;
            border: none;
            cursor: pointer;
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
