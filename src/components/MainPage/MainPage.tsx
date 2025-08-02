import React from "react";
import MainPageHeader from "./MainPageHeader";
import MainPageHero from "./MainPageHero";
import MainPageTextToSpeechGenerator from "./MainPageTextToSpeechGenerator/MainPageTextToSpeechGenerator";

function MainPage() {
  return (
    <div className="flex h-full flex-1 flex-col">
      <MainPageHeader />
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-3 p-2">
        <MainPageHero />
        <MainPageTextToSpeechGenerator />
      </div>
    </div>
  );
}

export default MainPage;
