"use client";
import { GenerateTTS } from "@/action/tts";
import React, { useState } from "react";

function Page() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedAudios, setGeneratedAudios] = useState<string[]>([]);

  const genAudio = async () => {
    try {
      if (loading) return;
      setLoading(true);

      const { audio } = await GenerateTTS(prompt);

      setGeneratedAudios((prev) => [...prev, audio]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        placeholder="Enter prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button disabled={loading} onClick={genAudio}>
        Generate {loading && "loading"}
      </button>

      <div>
        {generatedAudios.map((audio) => (
          <div key={audio}>
            <audio src={audio} controls />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
