import React from "react";
import { useEffect, useState } from "react";
function ArtistEntry(props) {
  const position = props.pos;
  const [fadedir, setfadedir] = useState(false);
  useEffect(() => {
    if (position % 2 === 0) {
      setfadedir(true);
    }
  }, []);

  return (
    <div
      className="container text-center entrycontainer"
      data-aos="zoom-in-up"
      data-aos-duration="700"
    >
      <div className="row align-items-center">
        <div class="col-xl-4">
          <h1 className="rank rankcont">#{props.pos}</h1>
        </div>
        <div class="col-xl-3">
          <img src={props.img} className="EntryImg"></img>
        </div>
        <div class="col-xl-5 songartistcont">
          <p className="Artisttext">{props.artist}</p>
        </div>
      </div>

      <div className="entryText"></div>
    </div>
  );
}
export default ArtistEntry;
