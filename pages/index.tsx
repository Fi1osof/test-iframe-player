import React, { useCallback, useEffect, useState } from "react";

// const iframeSrc = "http://localhost:3002/player";
const iframeSrc = "/test-iframe-player.github.io/player";

export default function Home() {

  
  const [iframe, iframeSetter] = useState<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const handler = (
      event: MessageEvent<{
        type?: string;
        // glb?: Blob;
      }>
    ) => {
      console.log("Main window message event", event);

      // const { type, glb } = event.data || {};

      // if (type === constants.avatarExported && glb) {
      //   onAvatarExported(glb);
      // }
    };

    window.addEventListener("message", handler);

    return () => {
      window.removeEventListener("message", handler);
    };
  }, []);

  const play = useCallback(() => {
    iframe?.contentWindow?.postMessage(
      {
        command: "play",
      },
      "*"
    );
  }, [iframe?.contentWindow]);

  const pause = useCallback(() => {
    iframe?.contentWindow?.postMessage(
      {
        command: "pause",
      },
      "*"
    );
  }, [iframe?.contentWindow]);

  return (
    <div>
      <iframe src={iframeSrc} ref={iframeSetter} />

      <div className="controls">
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
      </div>
    </div>
  );
}
