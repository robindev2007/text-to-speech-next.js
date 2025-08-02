import { IoDocumentTextOutline } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VOICE_LIST } from "@/lib/constants";
import React from "react";
import { RiVoiceAiFill } from "react-icons/ri";

function Header({
  selectedModel,
  setSelectedModel,
  selectedVoice,
  setSelectedVoice,
}: {
  selectedModel: string;
  setSelectedModel: React.Dispatch<React.SetStateAction<string>>;
  selectedVoice: string;
  setSelectedVoice: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="bg-muted flex w-full items-center justify-between p-2">
      <p className="flex items-center gap-1 font-semibold">
        <IoDocumentTextOutline />
        Text to speech
      </p>
      <div className="flex gap-2">
        <Select
          value={selectedModel}
          onValueChange={(value) => setSelectedModel(value)}
        >
          <SelectTrigger
            className="bg-background hover:bg-background/70 border-none"
            size="sm"
          >
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="openai-tts">OpenAi TTS</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={selectedVoice}
          onValueChange={(value) => setSelectedVoice(value)}
        >
          <SelectTrigger
            className="bg-background hover:bg-background/70 border-none capitalize"
            size="sm"
          >
            <RiVoiceAiFill />
            <SelectValue placeholder="Select Voice" />
          </SelectTrigger>
          <SelectContent>
            {VOICE_LIST.map((voice) => (
              <SelectItem key={voice} value={voice} className="capitalize">
                {voice}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default Header;
