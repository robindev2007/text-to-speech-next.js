"use server";
import { Client } from "@gradio/client";

type voice_list = "nova" | "ballad" | "simmer" | "alloy";

export const GenerateTTS = async (
  prompt: string,
  voice: voice_list = "alloy"
) => {
  const client = await Client.connect("NihalGazi/Text-To-Speech-Unlimited");
  const result = await client.predict("/text_to_speech_app", {
    prompt,
    voice: voice,
    emotion: "neutral", // sad excited clam
    use_random_seed: false,
    specific_seed: 12345,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const audio = ((result.data as any)[0] as any).url;

  return { audio };
};
