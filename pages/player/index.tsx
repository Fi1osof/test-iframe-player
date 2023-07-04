import { useEffect, useState } from "react";

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

    const onPlay = (event: Event) => {
      console.log("onPlay event", event);

      window.parent?.postMessage(
        {
          message: "played",
        },
        "*"
      );
    };

    const onPause = (event: Event) => {
      console.log("onPause event", event);
    };

    const onSeeded = (event: Event) => {
      console.log("onSeeded event", event);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("seeked", onSeeded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("seeked", onSeeded);
    };
  }, [audio]);

  /**
   * Слушаем сообщения из родительского окна
   */
  useEffect(() => {
    const handler = (
      event: MessageEvent<{
        command?: string;
        // glb?: Blob;
      }>
    ) => {
      console.log("iFrame window message event", event);

      const { command } = event.data || {};

      console.log("iFrame window message command", command);

      switch (command) {
        case "play":
          audio?.play();

          break;
        case "pause":
          audio?.pause();

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
