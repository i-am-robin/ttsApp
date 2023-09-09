import React from "react";

function AudioPreview({ data }) {
  return (
    <div className="bg-grey_main border-active rounded-md  gap-3 border  border-opacity-50 p-3 flex w-full flex-col">
      <p className="truncate">{data.text}</p>
      <audio
        src={`data:audio/mpeg;base64,${data.audioUrl}`}
        controls
        className="max-w-full "
      ></audio>
    </div>
  );
}

export default AudioPreview;
