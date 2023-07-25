import React, { useCallback, useEffect, useState } from "react";

// const iframeSrc = "http://localhost:3002/player";
const iframeSrc = "/test-iframe-player.github.io/player";
// const iframeSrc = "/player";

export default function Home() {
  const [iframe, iframeSetter] = useState<HTMLIFrameElement | null>(null);

  const [currentTime, currentTimeSetter] = useState(0);
  const [state, stateSetter] = useState<"play" | "pause">("pause");

  type MessageEventData =
    | {
        message: "play";
      }
    | {
        message: "pause";
      }
    | {
        message: "timeupdate";
        currentTime: number;
      };

  useEffect(() => {
    const handler = (event: MessageEvent<MessageEventData>) => {
      console.log("Main window message event", event);

      // const { type, glb } = event.data || {};

      // if (type === constants.avatarExported && glb) {
      //   onAvatarExported(glb);
      // }

      switch (event.data.message) {
        case "timeupdate":
          currentTimeSetter(event.data.currentTime);
          break;
        case "play":
        case "pause":
          stateSetter(event.data.message);
          break;
      }
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

  const onChangeVolume = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const volume = parseFloat(event.currentTarget.value);

      console.log("onChangeVolume volume", volume);

      iframe?.contentWindow?.postMessage(
        {
          command: "volume",
          volume,
        },
        "*"
      );
    },
    [iframe?.contentWindow]
  );

  return (
    <div>
      <iframe src={iframeSrc} ref={iframeSetter} />

      <div className="controls">
        <button onClick={state === "play" ? pause : play}>
          {state === "play" ? "Pause" : "Play"}{" "}
        </button>
        <div>
          Volume:{" "}
          <input
            type="number"
            min={0}
            max={1}
            step={0.1}
            onChange={onChangeVolume}
            defaultValue={1}
          />
        </div>

        <div>CurrentTime: {currentTime}</div>
      </div>
    </div>
  );
}
