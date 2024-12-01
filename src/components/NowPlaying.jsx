import React from "react";
import analyze from "rgbaster";
import { useState } from "react";

function NowPlaying(props) {
  const [colorarray, setcolors] = useState([]);

  const result = analyze(`${props.img}`);
  result.then(function (r) {
    const array = [r[0].color, r[1].color, r[2].color];
    setcolors(array);
  });

  return (
    <div
      className="nowplayingcont"
      // style={{ backgroundImage: `url(${props.img})` }}
    >
      <button onClick={props.goBack} className="btn btn-light nowplayingbutton">
        Back
      </button>
      <div className="row nowplayingrow">
        <div className="col-4">
          <img src={props.img} className="NowplayingImg"></img>
        </div>

        <div class="col-8 nowplayingtextcont">
          <p className="NowplayingSong">{props.song}</p>
          <p className="NowplayingArtist">{props.artist}</p>
          <p className="NowplayingArtist">{props.album}</p>
        </div>
      </div>
    </div>
  );

  // #ccf381
  // #4831D4
}
export default NowPlaying;
