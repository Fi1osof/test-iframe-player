export type MessageEventData =
  | {
      type: "loaded";
      duration: number;
      volume: number;
    }
  | {
      type: "play";
    }
  | {
      type: "pause";
    }
  | {
      type: "volumechange";
      volume: number;
    }
  | {
      type: "seed";
      currentTime: number;
    }
  | {
      type: "timeupdate";
      currentTime: number;
    };

    export type IFrameMessageEventData =
  | {
      type: "play";
    }
  | {
      type: "pause";
    }
  | {
      type: "volume";
      volume: number;
    }
  | {
      type: "seed";
      currentTime: number;
    };
