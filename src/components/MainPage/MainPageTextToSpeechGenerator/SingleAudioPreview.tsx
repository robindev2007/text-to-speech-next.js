import React, { useCallback, useMemo, useRef, useState } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import { Button } from "@/components/ui/button";
import { FaArrowDown, FaPause, FaPlay } from "react-icons/fa";
import { downloadFile } from "@/utils/file-saver";

function SingleAudioPreview({
  audio,
  prompt,
}: {
  audio: string;
  prompt: string;
}) {
  const containerRef = useRef(null);

  const { wavesurfer, isPlaying } = useWavesurfer({
    container: containerRef,
    height: 50,
    waveColor: "#c7c7c7",
    progressColor: "#7F5FE9",
    cursorColor: "transparent",
    barWidth: 4,
    barRadius: 5,
    url: audio,
  });

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  return (
    <div className="bg-muted border-border/50 space-y-1 rounded-md border p-2">
      <div>
        <p className="line-clamp-1">{prompt}</p>
      </div>
      <div className="bg-background border-border/40 flex w-full flex-row items-center gap-2 rounded-md border pr-1">
        <Button
          onClick={onPlayPause}
          size={"icon"}
          variant={"ghost"}
          className="hover:text-foreground/50 text-foreground/60 hover:bg-transparent"
        >
          {!isPlaying ? <FaPlay /> : <FaPause />}
        </Button>
        <div className="h-full w-full" ref={containerRef} />

        <Button
          size={"sm"}
          onClick={() =>
            downloadFile({ fileName: prompt.slice(0, 50), url: audio })
          }
        >
          <FaArrowDown />
        </Button>
      </div>
    </div>
  );
}

export default SingleAudioPreview;
