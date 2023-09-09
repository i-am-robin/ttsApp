"use client";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import AudioPreview from "./components/AudioPreview";

const modelArray = [
  { voice_id: "21m00Tcm4TlvDq8ikWAM", name: "Rachel" },
  { voice_id: "2EiwWnXFnvU5JabPnv8n", name: "Clyde" },
  { voice_id: "AZnzlk1XvdvUeBnXmlld", name: "Domi" },
  { voice_id: "CYw3kZ02Hs0563khs1Fj", name: "Dave" },
  { voice_id: "D38z5RcWu1voky8WS1ja", name: "Fin" },
  { voice_id: "EXAVITQu4vr4xnSDxMaL", name: "Bella" },
  { voice_id: "ErXwobaYiN019PkySvjV", name: "Antoni" },
  { voice_id: "GBv7mTt0atIp3Br8iCZE", name: "Thomas" },
  { voice_id: "IKne3meq5aSn9XLyUdCD", name: "Charlie" },
  { voice_id: "LcfcDJNUP1GQjkzn1xUU", name: "Emily" },
  { voice_id: "MF3mGyEYCl7XYWbV9V6O", name: "Elli" },
  { voice_id: "N2lVS1w4EtoT3dr4eOWO", name: "Callum" },
  { voice_id: "ODq5zmih8GrVes37Dizd", name: "Patrick" },
  { voice_id: "SOYHLrjzK2X1ezoPC6cr", name: "Harry" },
  { voice_id: "TX3LPaxmHKxFdv7VOQHJ", name: "Liam" },
  { voice_id: "ThT5KcBeYPX3keUQqHPh", name: "Dorothy" },
  { voice_id: "TxGEqnHWrfWFTfGW9XjX", name: "Josh" },
  { voice_id: "VR6AewLTigWG4xSOukaG", name: "Arnold" },
  { voice_id: "XB0fDUnXU5powFXDhCwa", name: "Charlotte" },
  { voice_id: "XrExE9yKIg1WjnnlVkGX", name: "Matilda" },
  { voice_id: "Yko7PKHZNXotIFUBG7I9", name: "Matthew" },
  { voice_id: "ZQe5CZNOzWyzPSCn5a3c", name: "James" },
  { voice_id: "Zlb1dXrM653N07WRdFW3", name: "Joseph" },
  { voice_id: "bVMeCyTHy58xNoL34h3p", name: "Jeremy" },
  { voice_id: "flq6f7yk4E4fJM5XTYuZ", name: "Michael" },
  { voice_id: "g5CIjZEefAph4nQFvHAz", name: "Ethan" },
  { voice_id: "jBpfuIE2acCO8z3wKNLl", name: "Gigi" },
  { voice_id: "jsCqWAovK2LkecY7zXl4", name: "Freya" },
  { voice_id: "oWAxZDx7w5VEj9dCyTzz", name: "Grace" },
  { voice_id: "onwK4e9ZLuTAKqWW03F9", name: "Daniel" },
  { voice_id: "pMsXgVXv3BLzUgSXRplE", name: "Serena" },
  { voice_id: "pNInz6obpgDQGcFmaJgB", name: "Adam" },
  { voice_id: "piTKgcLEGmPE4e6mEKli", name: "Nicole" },
  { voice_id: "t0jbNlBVZ17f02VDIeMI", name: "Jessie" },
  { voice_id: "wViXBPUzp2ZZixB1xQuM", name: "Ryan" },
  { voice_id: "yoZ06aMxZJJ28mfd3POQ", name: "Sam" },
  { voice_id: "z9fAnlkpzviPz146aGWa", name: "Glinda" },
  { voice_id: "zcAOhNBS3c14rBihAFp1", name: "Giovanni" },
  { voice_id: "zrHiDhphv9ZnVXBqCLjz", name: "Mimi" },
];

function TTS_Page() {
  const [text, setText] = useState(
    "Hi iam robin how can i help You? I think Have seen you before!",
  );

  // tts api state
  const [uId, setUId] = useState("uidtext02");
  const [ttsId, setTtsId] = useState("ttstest01");
  const [audios, setAudios] = useState([
    {
      audioUrl:
        "https://robin-ai.netlify.app/audios/1694179787573_response_audio.mp3",
      text: "Hey! Play this",
    },
  ]);
  const [ttsVoiceName, setTTsVoiceName] = useState("Rachel");
  const [modelId, setModelId] = useState("21m00Tcm4TlvDq8ikWAM");

  // state for buttons and components
  const [modelDropDown, setModelDropDown] = useState(false);
  const [lodingAudio, setLodingAudio] = useState(false);

  // refaresnce
  const menuRef = useRef();
  const menuBtnRef = useRef();

  useEffect(() => {
    function hadleOutliseClick(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !menuBtnRef.current.contains(e.target)
      ) {
        setModelDropDown(false);
      }
    }

    document.addEventListener("click", hadleOutliseClick, true);

    return () => {
      document.removeEventListener("click", hadleOutliseClick, true);
    };
  }, []);

  // get audio
  const handleSubmit = async () => {
    if (!lodingAudio && text.trim() !== "") {
      setLodingAudio(true);

      try {
        const responce = await axios.put("api/ai/text_to_speech", {
          text,
          uId,
          ttsId: Date.now(),
          model_id: modelId,
          setTimeout: 50000,
        });

        console.log(responce.data);

        const newAudio = {
          audioUrl: await responce.data.ttsAudioUrl,
          text,
        };

        const updatedAudios = [...audios, newAudio];
        setAudios(updatedAudios.reverse());
        console.log(audios);
        console.log("done");
        setLodingAudio(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setLodingAudio(false);
      alert("Please fill the Text box");
    }
  };

  const textSubmit = async () => {
    const res = await axios.put("api/test", { text });

    console.log(await res.data);
  };

  return (
    <div className="bg-black h-screen  w-screen flex flex-col items-center justify-center">
      <button onClick={textSubmit}>Testest</button>
      <div className="flex md:max-w-[50vw] lg:w-[40vw] flex-col gap-2 p-3">
        <div className="bg-grey_main w-full border border-active rounded-md  gap-3 border_prymary p-3 md:mx-0 flex flex-col">
          <textarea
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="Enter the text here"
            rows={5}
            className="rounded-md outline-none bg-[#0000] w-full border-2 px-2 p-1 border-prymary"
          />

          <div className="relative mt-2">
            <p>Select voice:</p>
            <button
              ref={menuBtnRef}
              onClick={() => setModelDropDown((prev) => !prev)}
              className="bg-grey_dark flex gap-5 py-1 border_prymary bg-active rounded-md px-2 shadow-md"
            >
              <p>{ttsVoiceName}</p>
              <p>-</p>
            </button>
            <div
              ref={menuRef}
              className={`absolute top-full z-10 left-0 bg-active rounded-md border border-prymary border-opacity-50 flex flex-col items-start px-1 py-2 mt-2 max-h-40 overflow-y-scroll ${
                !modelDropDown ? "hidden" : "flex"
              }`}
            >
              {modelArray.map((voice, i) => {
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setModelId(voice.voice_id);
                      setTTsVoiceName(voice.name);
                      setModelDropDown(false);
                    }}
                    className="hover:bg-in_active px-3 pr-10 w-full rounded-sm text-left"
                  >
                    {voice.name}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className={`rounded-md py-2 w-fit mx-auto px-5 hover:bg-opacity-70 transition-all shadow-md ${
              lodingAudio ? "bg-in_active" : "bg-prymary"
            }`}
          >
            Generate
          </button>
        </div>
        <div className="overflow-y-scroll gap-2 rounded-md flex flex-col max-h-[20rem] ">
          {audios.map((data, i) => {
            return <AudioPreview key={i} data={data} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default TTS_Page;
