import React from "react";
import { IFramePlayer } from "../../src/components/iframe-player";

export default function LocalPlayerPage() {
  return <IFramePlayer src={"/player"} />;
}
