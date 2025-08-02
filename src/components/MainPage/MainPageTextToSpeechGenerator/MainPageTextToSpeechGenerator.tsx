"use client";
import React, { useState } from "react";
import Header from "./Header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { GenerateTTS } from "@/action/generateTTS";
import SingleAudioPreview from "./SingleAudioPreview";

type GeneratedAudio = {
  audio: string;
  prompt: string;
};

function MainPageTextToSpeechGenerator() {
  const [prompt, setPrompt] = useState(
    "Hello there! This is a test of the text-to-speech system.",
  );
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [useRandomSeed, setUseRandomSeed] = useState(false);
  const [generatingSpeech, setGeneratingSpeech] = useState(false);
  const [generatedSpeechList, setGeneratedSpeechList] = useState<
    GeneratedAudio[]
  >([]);

  const generateSpeech = async () => {
    if (generatingSpeech) return;
    setGeneratingSpeech(true);

    try {
      const data = await GenerateTTS(
        prompt,
        selectedVoice,
        "neutral",
        useRandomSeed,
        12345,
      );
      console.log({ data });
      setGeneratedSpeechList((prev) => [
        {
          audio: data.url,
          prompt,
        },
        ...prev,
      ]);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setGeneratingSpeech(false);
    }
  };

  return (
    <div className="w-full max-w-[35rem] space-y-4">
      <div className="bg-muted mx-auto rounded-md p-[2px]">
        <Header
          selectedModel={selectedModel}
          selectedVoice={selectedVoice}
          setSelectedModel={setSelectedModel}
          setSelectedVoice={setSelectedVoice}
        />

        <div>
          <Textarea
            value={prompt}
            placeholder="Enter text you want to generate voice of"
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-background h-full max-h-52 min-h-36 resize-none rounded-none shadow-none outline-none"
          />
        </div>

        <div className="bg-background mt-0.5 flex items-center justify-between rounded-b-md px-2 py-1">
          <div className="flex items-center justify-center gap-1 text-sm">
            Random seed{" "}
            <Checkbox
              checked={useRandomSeed}
              onCheckedChange={(e) => setUseRandomSeed(e as boolean)}
            />
          </div>
          <Button
            loading={generatingSpeech}
            onClick={generateSpeech}
            size={"sm"}
          >
            Generate speech
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        {generatedSpeechList.map((speech) => (
          <SingleAudioPreview
            key={speech.audio}
            prompt={speech.prompt}
            audio={speech.audio}
          />
        ))}
      </div>
    </div>
  );
}

export default MainPageTextToSpeechGenerator;
