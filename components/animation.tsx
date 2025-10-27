"use client";

import UseAnimations from "react-useanimations";
import help from "react-useanimations/lib/help";
import info from "react-useanimations/lib/info";
import mail from "react-useanimations/lib/mail";
import scrollDown from "react-useanimations/lib/scrollDown";
import zoomIn from "react-useanimations/lib/zoomIn";

const animations = { zoomIn, scrollDown, help, info, mail };

export function Animations({ variant, className }: { variant: keyof typeof animations; className?: string }) {
  return <UseAnimations animation={animations[variant]} strokeColor="currentColor" className={className} />;
}
