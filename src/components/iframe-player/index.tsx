import React, { useCallback, useEffect, useState } from "react";
import { IFrameMessageEventData, MessageEventData } from "./interfaces";

type IFramePlayerProps = {
  src: string;
};

export const IFramePlayer: React.FC<IFramePlayerProps> = ({
  src,
  ...other
}) => {
  const [iframe, iframeSetter] = useState<HTMLIFrameElement | null>(null);

  const [currentTime, currentTimeSetter] = useState(0);
  const [duration, durationSetter] = useState(0);
  const [volume, volumeSetter] = useState(0);
  const [state, stateSetter] = useState<"play" | "pause">("pause");

  console.log("currentTime", currentTime);

  useEffect(() => {
    const handler = (event: MessageEvent<MessageEventData>) => {
      console.log("Main window message event", event);
      console.log("Main window message event.data", event.data);

      switch (event.data.type) {
        case "loaded":
          durationSetter(event.data.duration);
          volumeSetter(event.data.volume);
          break;
        case "timeupdate":
          console.log(event.data.currentTime);
          currentTimeSetter(event.data.currentTime);
          break;
        case "volumechange":
          console.log(event.data.volume);
          volumeSetter(event.data.volume);
          break;
        case "play":
        case "pause":
          stateSetter(event.data.type);
          break;
      }
    };

    window.addEventListener("message", handler);

    return () => {
      window.removeEventListener("message", handler);
    };
  }, []);

  const postMessage = useCallback(
    (data: IFrameMessageEventData) => {
      iframe?.contentWindow?.postMessage(data, "*");
    },
    [iframe?.contentWindow]
  );

  const play = useCallback(() => {
    postMessage({
      type: "play",
    });
  }, [postMessage]);

  const pause = useCallback(() => {
    postMessage({
      type: "pause",
    });
  }, [postMessage]);

  const onChangeVolume = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const volume = parseFloat(event.currentTarget.value);

      console.log("onChangeVolume volume", volume);

      postMessage({
        type: "volume",
        volume,
      });
    },
    [postMessage]
  );

  const onChangeCurrentTime = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const currentTime = parseFloat(event.currentTarget.value);

      console.log("onChangeCurrentTime currentTime", currentTime);

      postMessage({
        type: "seed",
        currentTime,
      });
    },
    [postMessage]
  );

  return (
    <div>
      <iframe src={src} ref={iframeSetter} {...other} />

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
            value={volume}
          />
        </div>
        <div>
          Duration:{" "}
          <input
            type="number"
            min={0}
            max={1}
            step={0.1}
            value={duration}
            readOnly
          />
        </div>

        <div>CurrentTime: 
          <input
            type="number"
            min={0}
            max={duration}
            step={0.1}
            onChange={onChangeCurrentTime}
            value={currentTime}
          /></div>
      </div>
    </div>
  );
};
