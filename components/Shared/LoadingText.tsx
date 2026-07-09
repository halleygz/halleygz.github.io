"use client";

import { useEffect, useState } from "react";

type LoadingTextProps = {
  className?: string;
};

const frames = ["Loading.", "Loading..", "Loading..."];

export default function LoadingText({ className = "" }: LoadingTextProps) {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setFrameIndex((current) => (current + 1) % frames.length);
    }, 400);

    return () => window.clearInterval(intervalId);
  }, []);

  return <p className={className}>{frames[frameIndex]}</p>;
}