"use server";
import { EMOTION_STYLE_LIST, VOICE_LIST } from "@/lib/constants";
import { Client } from "@gradio/client";
import { ValueOf } from "next/dist/shared/lib/constants";

export const GenerateTTS = async (
  prompt: string,
  voice: ValueOf<typeof VOICE_LIST> = "nova",
  emotion: ValueOf<typeof EMOTION_STYLE_LIST> = "netural",
  use_random_seed: boolean = false,
  specific_seed: number = 12345,
) => {
  console.log(
    prompt,
    voice,
    emotion, // sad excited clam
    use_random_seed,
    specific_seed,
  );

  const client = await Client.connect("NihalGazi/Text-To-Speech-Unlimited");
  const result = await client.predict("/text_to_speech_app", {
    prompt,
    voice: voice || "nova",
    emotion: emotion || "netural", // sad excited clam
    use_random_seed: use_random_seed || false,
    specific_seed: specific_seed || 12345,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const audio = ((result.data as any)[0] as any).url;

  return { url: audio };
};
