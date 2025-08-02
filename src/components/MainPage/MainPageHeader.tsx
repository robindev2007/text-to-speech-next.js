import React from "react";
import { Button } from "../ui/button";

function MainPageHeader() {
  return (
    <div className="flex items-center justify-between border-b p-2">
      <p className="font-semibold">Text to Speech</p>
      <Button disabled size={"sm"}>
        Try with api
      </Button>
    </div>
  );
}

export default MainPageHeader;
