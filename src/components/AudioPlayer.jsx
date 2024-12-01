import React, { useState, useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlay } from "@fortawesome/free-solid-svg-icons";
// import { faPause } from "@fortawesome/free-solid-svg-icons";

const AudioPlayer = ({ url }) => {
  const [audioSrc, setAudioSrc] = useState(null);
  const audioRef = useRef(null);
  const [playing, setplaying] = useState(false);

  const getAudioFromUrl = () => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const objectURL = URL.createObjectURL(blob);
        setAudioSrc(objectURL);
      })
      .catch((error) => console.error("Error fetching audio:", error));
  };

  const playAudio = () => {
    audioRef.current = new Audio(audioSrc);
    audioRef.current.volume = 0.45;
    audioRef.current.play();
    setplaying(true);
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setplaying(false);
      audioRef.current.currentTime = 0;
    }
  };

  if (!audioSrc) {
    getAudioFromUrl();
    // return <div>Loading audio...</div>;
  }

  return (
    <div className="playbuttoncont">
      {/* <p onClick={playAudio} onMouseLeave={stopAudio} className="playbutton">
        Hover to Preview
      </p> */}
      {!playing ? (
        <div>
          {/* <FontAwesomeIcon
            // icon={faPlay}
            onClick={playAudio}
            className="playbutton"
          /> */}
        </div>
      ) : (
        <div>
          {/* <FontAwesomeIcon
            // icon={faPause}
            onClick={stopAudio}
            className="playbutton"
          /> */}
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
{
  /* <audio controls>
    //   <source src={audioSrc} type="audio/mpeg" />
    //   Your browser does not support the audio element.
    // </audio> */
}
