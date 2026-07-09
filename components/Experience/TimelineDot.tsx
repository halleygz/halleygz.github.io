"use client"
import { TimelineDotProps } from "@/types/ComponentProps";
import { useTheme } from "next-themes";
import React from "react";

const TimelineDot: React.FC<TimelineDotProps> = ({
  isCurrent,
  isLatest,
}) => {
  const {theme} = useTheme()
  if (isLatest || isCurrent) {
    return (
      <div className={`${theme === "light" ? "bg-gray-100 border-black" : "bg-black border-gray-100"}  border-7  rounded-full w-6 h-6 flex items-center justify-center align-middle ${isCurrent && "animate-bounce"}`}></div>
    );
  } else {
    return <div className={`${theme === "light" ? "bg-black" : "bg-gray-100"} rounded-full w-6 h-6`}></div>;
  }
};

export default TimelineDot;
