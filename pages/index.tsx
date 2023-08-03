import React from "react";
import { IFramePlayer } from "../src/components/iframe-player";

const iframeSrc = "/test-iframe-player.github.io/player";

export default function Home() {
  return <IFramePlayer src={iframeSrc} />;
}
