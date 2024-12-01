import React from "react";
import { useEffect, useState } from "react";
import AudioPlayer from "./AudioPlayer";
function Recent(props) {
  const [songsize, setsongsize] = useState(3);
  const [fadedir, setfadedir] = useState(false);
  const [last, setlast] = useState(false);
  const stringsize = props.name + "";
  const position = props.pos;
  const [longago, setlongago] = useState("");
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

    // Create a Date object for the specific date
    const pastDate = new Date(props.played_at);

    // Get the current date
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDiff = currentDate.getTime() - pastDate.getTime();

    // Convert milliseconds to seconds, minutes, hours, and days
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let d = "";

    if (days != 0) {
      if (days > 1) {
        d = `${days} days ago`;
      } else {
        d = `${days} day ago`;
      }
    } else if (hours != 0) {
      if (hours % 24 > 1) {
        d = `${hours % 24} hours ago`;
      } else {
        d = `${hours % 24} hour ago`;
      }
    } else if (minutes != 0) {
      d = `${minutes % 60} mins ago`;
    } else {
      d = `${seconds % 60} seconds ago`;
    }

    setlongago(d);
  }, []);
  return (
    <div
      className="container text-center recentcontainer"
      // data-aos="zoom-in-up"
      // data-aos-duration="750"
    >
      <div className="row align-items-center">
        <div class="col-xl-3">
          <p className="recentlongago">{longago}</p>
        </div>
        <div class="col-xl-4">
          <img src={props.img} className="recentImg" alt="album"></img>
        </div>
        <div class="col-xl-5 songartistcont">
          <h1 className="SongName" style={{ fontSize: `${songsize}rem` }}>
            {props.name}
          </h1>
          <p className="Artist">{props.artist}</p>
          <AudioPlayer url={props.url} />
        </div>
      </div>
      <div className="entryText"></div>
    </div>
  );
}

export default Recent;
