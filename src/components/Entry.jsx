import React from "react";

import { useEffect, useState } from "react";
import AudioPlayer from "./AudioPlayer";
function Entry(props) {
  const [songsize, setsongsize] = useState(3);
  const [fadedir, setfadedir] = useState(false);
  const [last, setlast] = useState(false);

  const stringsize = props.name + "";
  const position = props.pos;
  const occ = countSongOccurrences(props.recent, props.name);
  const total = formatMsToMinutesAndSeconds(occ * props.dur);
  useEffect(() => {
    if (stringsize.length > 9) {
      setsongsize(1.3);
    }

    if (position % 2 === 0) {
      setfadedir(true);
    }

    // if (position == 10) {
    //   setlast(true);
    // }
  }, []);

  function countSongOccurrences(songArray, songName) {
    let count = 0;
    for (let d of songArray) {
      if (d.song === songName) {
        count++;
      }
    }
    return count;
  }

  function formatMsToMinutesAndSeconds(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  }

  return (
    <div
      className="container text-center entrycontainer"
      // data-aos="zoom-in-up"
      // data-aos-duration="750"
    >
      <div className="row align-items-center">
        <div class="col-xl-4 rankcont">
          <h1 className="rank">{props.pos}</h1>
        </div>
        <div class="col-xl-3">
          <img src={props.img} className="EntryImg" alt="album"></img>
        </div>
        <div class="col-xl-5 songartistcont">
          <h1 className="SongName" style={{ fontSize: `${songsize}rem` }}>
            {props.name}
          </h1>
          <p className="Artist">{props.artist}</p>
          {occ > 0 && <p className="Artist">{total} listened recently</p>}
        </div>
      </div>
      <div className="entryText"></div>
    </div>
  );
}

export default Entry;
