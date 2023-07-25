import { useEffect, useState } from "react";

type AudioEvent = Event & {
  target: HTMLAudioElement;
};

export default function PlayerPage() {
  const [events] = useState([]);

  const [audio, audioSetter] = useState<HTMLAudioElement | null>(null);

  console.log("audio", audio);

  /**
   * Навешиваем события на плейер
   */
  useEffect(() => {
    if (!audio) {
      return;
    }

    const onPlay = (event: AudioEvent) => {
      console.log("onPlay event", event);

      window.parent?.postMessage(
        {
          message: "play",
        },
        "*"
      );
    };

    const onTimeUpdate = (event: AudioEvent) => {
      console.log("onTimeUpdate event", event);

      window.parent?.postMessage(
        {
          message: "timeupdate",
          currentTime: event.target.currentTime,
        },
        "*"
      );
    };

    const onPause = (event: AudioEvent) => {
      console.log("onPause event", event);

      window.parent?.postMessage(
        {
          message: "pause",
        },
        "*"
      );
    };

    const onSeeded = (event: AudioEvent) => {
      console.log("onSeeded event", event);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("seeked", onSeeded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("seeked", onSeeded);
    };
  }, [audio]);

  /**
   * Слушаем сообщения из родительского окна
   */
  useEffect(() => {
    if (!audio) {
      return;
    }

    type EventData =
      | {
          command: "play";
        }
      | {
          command: "pause";
        }
      | {
          command: "volume";
          volume: number;
        };

    const handler = (event: MessageEvent<EventData>) => {
      console.log("iFrame window message event", event);

      console.log("iFrame window message command", event.data.command);

      switch (event.data.command) {
        case "play":
          audio.play();

          break;
        case "pause":
          audio.pause();

          break;
        case "volume":
          audio.volume = event.data.volume;

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
  }, [audio]);

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
