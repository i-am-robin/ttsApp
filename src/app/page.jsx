"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TTS_Page from "./text_to_speech/page";

export default function Home() {
  // const [images, setImages] = useState([
  //   {
  //     imgUrl: "http://localhost:5000/images/a.jpeg",
  //     name: "astronath with a horce",
  //   },
  // ]);
  // const [promt, setPromt] = useState("");

  // const requestImg = async (e) => {
  //   e.preventDefault();
  //   const response = await axios.post("api/ai", { promt });

  //   const imgLink = {
  //     imgUrl: await response.data.imgUrl,
  //     name: !response.data.name,
  //   };

  //   setImages([...images, imgLink]);
  // };

  return <TTS_Page />;
  // <main>
  //   {images.map((image, i) => {
  //     return (
  //       <img
  //         key={i}
  //         src={image.imgUrl}
  //         alt="ai image"
  //         className="h-60 w-60"
  //       />
  //     );
  //   })}

  //   <form action="" onSubmit={requestImg}>
  //     <input
  //       type="text"
  //       onChange={(e) => setPromt(e.target.value)}
  //       placeholder="type here"
  //     />
  //     <button type="submit">Submit</button>
  //   </form>
  // </main>
}
