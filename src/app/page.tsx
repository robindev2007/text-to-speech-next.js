import { Client } from "@gradio/client";

export default async function Home() {
  const client = await Client.connect("NihalGazi/Text-To-Speech-Unlimited");
  const result = await client.predict("/text_to_speech_app", {
    prompt:
      "Enter text, choose a voice and emotion, and generate audio. The text will be checked for appropriateness before generation. Use it as much as you want.",
    voice: "alloy",
    emotion: "neutral", // sad excited clam
    use_random_seed: false,
    specific_seed: 12345,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const audio = ((result.data as any)[0] as any).url;

  return (
    <div>
      <audio src={audio} controls></audio>
      {audio}
    </div>
  );
}
