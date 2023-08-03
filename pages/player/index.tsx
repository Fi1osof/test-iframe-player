import { useCallback, useEffect, useState } from "react";
import { IFrameMessageEventData, MessageEventData } from "../../src/components/iframe-player/interfaces";

type AudioEvent = Event & {
  currentTarget: HTMLAudioElement;
};

export default function PlayerPage() {
  const [events] = useState([]);

  const [audio, audioSetter] = useState<HTMLAudioElement | null>(null);

  console.log("audio", audio);

  const postMessage = useCallback((data: MessageEventData) => {
    window.parent?.postMessage(data, "*");
  }, []);

  /**
   * Навешиваем события на плейер
   */
  useEffect(() => {
    if (!audio) {
      return;
    }

    const onPlay = (event: AudioEvent) => {
      console.log("onPlay event", event);

      postMessage({
        type: "play",
      });
    };

    const onTimeUpdate = (event: AudioEvent) => {
      console.log("onTimeUpdate event", event);

      postMessage({
        type: "timeupdate",
        currentTime: event.currentTarget.currentTime,
      });
    };

    const onPause = (event: AudioEvent) => {
      console.log("onPause event", event);

      postMessage({
        type: "pause",
      });
    };

    const onVolumeChange = (event: AudioEvent) => {
      console.log("onVolumeChange event", event);

      postMessage({
        type: "volumechange",
        volume: event.currentTarget.volume,
      });
    };

    const onSeeded = (event: AudioEvent) => {
      console.log("onSeeded event", event);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("seeked", onSeeded);
    audio.addEventListener("volumechange", onVolumeChange);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("seeked", onSeeded);
      audio.removeEventListener("volumechange", onVolumeChange);
    };
  }, [audio, postMessage]);

  /**
   * Слушаем сообщения из родительского окна
   */
  useEffect(() => {
    if (!audio) {
      return;
    }
    
    setTimeout(() => {
      postMessage({
        type: "loaded",
        duration: audio.duration,
        volume: audio.volume,
      });
    }, 1000)

    const handler = (event: MessageEvent<IFrameMessageEventData>) => {
      console.log("iFrame window message event", event);

      console.log("iFrame window message type", event.data.type);

      switch (event.data.type) {
        case "play":
          audio.play();

          break;
        case "pause":
          audio.pause();

          break;
        case "volume":
          audio.volume = event.data.volume;

          break;
        case "seed":
          audio.currentTime = event.data.currentTime;

          break;
      }

      // if (type === constants.avatarExported && glb) {
      //   onAvatarExported(glb);
      // }
    };

    window.addEventListener("message", handler);

    return () => {
      window.removeEventListener("message", handler);
    };
  }, [audio, postMessage]);

  return (
    <div>
      <audio
        ref={audioSetter}
        controls
        src="https://actions.google.com/sounds/v1/ambiences/arcade_room.ogg"
      />

      <pre>{events.length ? JSON.stringify(events, undefined, 2) : null}</pre>
    </div>
  );
}
