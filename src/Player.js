import { useEffect, useState } from "react";
import "./App.css";
import ArtistEntry from "./components/ArtistEntry";

import AOS from "aos";
import "aos/dist/aos.css";
import Entry from "./components/Entry";

import NowPlaying from "./components/NowPlaying";
import Recent from "./components/Recent";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPalette } from "@fortawesome/free-solid-svg-icons";

const Player = (props) => {
  const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  const refreshtoken = process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN;
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [shorttracks, setshort] = useState([]);
  const [medtracks, setmedium] = useState([]);
  const [longtracks, setlong] = useState([]);
  const [shortartists, setshortart] = useState([]);
  const [medartists, setmediumart] = useState([]);
  const [longartists, setlongart] = useState([]);
  const [nowplaying, setnowplaying] = useState({});
  const [recplayed, setrecplayed] = useState([]);
  // const [timerange, setTimeRange] = useState("short_term");

  const [pColour, setPcolour] = useState("#ccf381");

  const [short, setshortbool] = useState(true);
  const [medium, setmediumbool] = useState(false);
  const [long, setlongbool] = useState(false);
  const [trackbool, setTrackBool] = useState(true);
  const [artistbool, setArtistBool] = useState(false);
  const [nowplayingbool, setplayingbool] = useState(false);
  const [recplayedbool, setrecplayedbool] = useState(false);

  const [visible, setvisibility] = useState("block");

  const [trackhighlight, settrackhighlight] = useState("selectedButton");
  const [artisthighlight, setartisthighlight] = useState("TimeButton");
  const [shorthighlight, setshorthighlight] = useState("selectedButton");
  const [medhighlight, setmedhighlight] = useState("TimeButton");
  const [longhighlight, setlonghighlight] = useState("TimeButton");
  const [recplayedhighlight, setrecplayedhighlight] = useState("TimeButton");

  const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
  const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
  const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?`;
  const TOP_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists?`;
  const RECENTLYPLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?`;

  const getRecentlyPlayedSongs = async () => {
    return fetch(RECENTLYPLAYED_ENDPOINT + "limit=50", {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    });
  };

  const getNowPlaying = async () => {
    return fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    });
  };

  const getTopTracks = async (timerange) => {
    return fetch(
      TOP_TRACKS_ENDPOINT + `time_range=${timerange}` + "&limit=10",
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    );
  };

  const getTopArtists = async (timerange) => {
    return fetch(
      TOP_ARTISTS_ENDPOINT + `time_range=${timerange}` + "&limit=10",
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    );
  };
  useEffect(() => {
    getTracks();
    getArtists();
    getRecentlyPlayed();
    AOS.init();
    AOS.refresh();
  }, []);

  function trackselected() {
    settrackhighlight("selectedButton");
    setartisthighlight("TimeButton");
    setrecplayedhighlight("TimeButton");
  }

  function artistselected() {
    settrackhighlight("TimeButton");
    setartisthighlight("selectedButton");
    setrecplayedhighlight("TimeButton");
  }

  function recplayedselected() {
    settrackhighlight("TimeButton");
    setartisthighlight("TimeButton");
    setrecplayedhighlight("selectedButton");
  }

  function shortselected() {
    setshorthighlight("selectedButton");
    setmedhighlight("TimeButton");
    setlonghighlight("TimeButton");
  }

  function medselected() {
    setshorthighlight("TimeButton");
    setmedhighlight("selectedButton");
    setlonghighlight("TimeButton");
  }

  function longselected() {
    setshorthighlight("TimeButton");
    setmedhighlight("TimeButton");
    setlonghighlight("selectedButton");
  }

  function shortterm() {
    setshortbool(true);
    setmediumbool(false);
    setlongbool(false);
    setplayingbool(false);
    shortselected();
  }

  function mediumterm() {
    setshortbool(false);
    setmediumbool(true);
    setlongbool(false);
    setplayingbool(false);
    medselected();
  }

  function longterm() {
    setshortbool(false);
    setmediumbool(false);
    setlongbool(true);
    setplayingbool(false);
    longselected();
  }

  function trackchange() {
    setArtistBool(false);
    setTrackBool(true);
    setplayingbool(false);
    setrecplayedbool(false);
    setvisibility("block");
    trackselected();
  }

  function artistchange() {
    setArtistBool(true);
    setTrackBool(false);
    setplayingbool(false);
    setrecplayedbool(false);
    setvisibility("block");
    artistselected();
  }

  function nowplayingchange() {
    getPlaying();
    setArtistBool(false);
    setTrackBool(false);
    setplayingbool(true);
    setrecplayedbool(false);
    setvisibility("none");
  }

  function recentlyplayedchange() {
    getRecentlyPlayed();
    setArtistBool(false);
    setTrackBool(false);
    setplayingbool(false);
    setrecplayedbool(true);
    recplayedselected();
  }

  function goBack() {
    setvisibility("block");
    trackchange();
  }

  const getRecentlyPlayed = async () => {
    const response1 = await getRecentlyPlayedSongs();
    const ke1 = response1.json();
    // console.log(ke1);

    ke1.then(function (result) {
      const data = result;
      // console.log(data);

      const array = [];

      for (let i = 1; i <= 50; i++) {
        const Entry = {
          rank: i,
          artist: data.items[i - 1].track.album.artists[0].name,
          img: data.items[i - 1].track.album.images[1].url,
          song: data.items[i - 1].track.name,
          playedat: data.items[i - 1].played_at,
          url: data.items[i - 1].track.preview_url,
        };

        array.push(Entry);
      }

      setrecplayed(array);
    });
  };

  const getPlaying = async () => {
    const response = await getNowPlaying();
    const ke = response.json();
    ke.then(function (result) {
      const nowplayingobject = {
        img: result.item.album.images[0].url,
        artist: result.item.album.artists[0].name,
        song: result.item.name,
        album: result.item.album.name,
      };

      setnowplaying(nowplayingobject);
    });
  };

  const getTracks = async () => {
    const response1 = await getTopTracks("short_term");
    const ke1 = response1.json();
    // console.log(ke1);

    ke1.then(function (result) {
      const data = result;
      // console.log(data);
      const array = [];

      for (let i = 1; i <= 10; i++) {
        const Entry = {
          rank: i,
          artist: data.items[i - 1].artists[0].name,
          img: data.items[i - 1].album.images[1].url,
          song: data.items[i - 1].name,
          url: data.items[i - 1].preview_url,
          duration: data.items[i - 1].duration_ms,
        };

        array.push(Entry);
      }
      // console.log(array);
      setshort(array);
    });
    // setTimeRange("medium_term");

    const response2 = await getTopTracks("medium_term");
    const ke2 = response2.json();
    // console.log(ke2);

    ke2.then(function (result) {
      const data = result;
      // console.log(data);
      const array = [];

      for (let i = 1; i <= 10; i++) {
        const Entry = {
          rank: i,
          artist: data.items[i - 1].artists[0].name,
          img: data.items[i - 1].album.images[1].url,
          song: data.items[i - 1].name,
          url: data.items[i - 1].preview_url,
          duration: data.items[i - 1].duration_ms,
        };

        array.push(Entry);
      }
      // console.log(array);
      setmedium(array);
    });

    // setTimeRange("long_term");
    const response3 = await getTopTracks("long_term");
    const ke3 = response3.json();
    // console.log(ke3);

    ke3.then(function (result) {
      const data = result;
      // console.log(data);

      const array = [];
      for (let i = 1; i <= 10; i++) {
        const Entry = {
          rank: i,
          artist: data.items[i - 1].artists[0].name,
          img: data.items[i - 1].album.images[1].url,
          song: data.items[i - 1].name,
          url: data.items[i - 1].preview_url,
          duration: data.items[i - 1].duration_ms,
        };

        array.push(Entry);
      }
      // console.log(array);
      setlong(array);
    });
  };

  const getArtists = async () => {
    const response1 = await getTopArtists("short_term");
    const ke1 = response1.json();
    // console.log(ke1);
    ke1.then(function (result) {
      const data = result;
      // console.log(data);

      const array = [];
      for (let i = 1; i <= 10; i++) {
        const Entry = {
          rank: i,
          artist: data.items[i - 1].name,
          img: data.items[i - 1].images[1].url,
        };

        array.push(Entry);
      }

      // console.log(array);
      setshortart(array);
    });
    // setTimeRange("medium_term");

    const response2 = await getTopArtists("medium_term");
    const ke2 = response2.json();
    // console.log(ke2);

    ke2.then(function (result) {
      const data = result;
      // console.log(data);

      const array = [];
      for (let i = 1; i <= 10; i++) {
        const Entry = {
          rank: i,
          artist: data.items[i - 1].name,
          img: data.items[i - 1].images[1].url,
        };

        array.push(Entry);
      }
      // console.log(array);
      setmediumart(array);
    });

    // setTimeRange("long_term");
    const response3 = await getTopArtists("long_term");
    const ke3 = response3.json();
    // console.log(ke3);

    ke3.then(function (result) {
      const data = result;
      // console.log(data);
      const array = [];
      for (let i = 1; i <= 10; i++) {
        const Entry = {
          rank: i,
          artist: data.items[i - 1].name,
          img: data.items[i - 1].images[1].url,
        };

        array.push(Entry);
      }
      // console.log(array);
      setlongart(array);
    });
  };

  function first5(ogarray) {
    //     shorttracks
    // medtracks
    // longtracks
    // shortartists
    // medartists
    // longartists
    return ogarray.slice(0, 5);
  }

  function last5(ogarray) {
    return ogarray.slice(5, 10);
  }

  const changecolours = () => {
    if (pColour == "#4831d4") {
      document.documentElement.style.setProperty("--primarycolour", "#ccf381");
      document.documentElement.style.setProperty(
        "--secondarycolour",
        "#4831d4"
      );
      setPcolour("#ccf381");
    } else {
      document.documentElement.style.setProperty("--primarycolour", "#4831d4");
      document.documentElement.style.setProperty(
        "--secondarycolour",
        "#ccf381"
      );
      setPcolour("#4831d4");
    }
  };

  return (
    <div className="BCont">
      <button className="colourchange" onClick={changecolours}>
        {/* <FontAwesomeIcon icon={faPalette} className="fontawepalette" /> */}
      </button>
      <div className="buttoncont1 text-center" style={{ display: visible }}>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            // className="TimeButton"
            onClick={trackchange}
            style={{ display: visible }}
            className={`btn btn-outline-light ${trackhighlight}`}
          >
            Tracks
          </button>
          <button
            type="button"
            // className="TimeButton"
            onClick={artistchange}
            style={{ display: visible }}
            className={`btn btn-outline-light ${artisthighlight}`}
          >
            Artists
          </button>
          <button
            type="button"
            // className="TimeButton"
            onClick={recentlyplayedchange}
            style={{ display: visible }}
            className={`btn btn-outline-light ${recplayedhighlight}`}
          >
            Recently Played
          </button>
          {/* <button
            type="button"
            // className="TimeButton"
            onClick={nowplayingchange}
            style={{ display: visible }}
            className="btn btn-outline-light TimeButton"
          >
            Currently Playing
          </button> */}
        </div>
      </div>
      {!recplayedbool && (
        <div className="buttoncont2">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button
              onClick={shortterm}
              style={{ display: visible }}
              className={`btn btn-outline-light ${shorthighlight}`}
            >
              This Month
            </button>
            <button
              style={{ display: visible }}
              onClick={mediumterm}
              className={`btn btn-outline-light ${medhighlight}`}
            >
              Last 6 Months
            </button>
            <button
              style={{ display: visible }}
              onClick={longterm}
              className={`btn btn-outline-light ${longhighlight}`}
            >
              All Time
            </button>
          </div>
        </div>
      )}

      {trackbool && short && (
        <div className="container-fluid">
          {shorttracks.map((hanni, index) => {
            return (
              <Entry
                key={index}
                pos={hanni.rank}
                name={hanni.song}
                artist={hanni.artist}
                img={hanni.img}
                url={hanni.url}
                recent={recplayed}
                dur={hanni.duration}
              />
            );
          })}
        </div>
      )}
      {trackbool && medium && (
        <div>
          {medtracks.map((hanni, index) => {
            return (
              <Entry
                key={index}
                pos={hanni.rank}
                name={hanni.song}
                artist={hanni.artist}
                img={hanni.img}
                url={hanni.url}
                recent={recplayed}
                dur={hanni.duration}
              />
            );
          })}
        </div>
      )}
      {trackbool && long && (
        <div>
          {longtracks.map((hanni, index) => {
            return (
              <Entry
                key={index}
                pos={hanni.rank}
                name={hanni.song}
                artist={hanni.artist}
                img={hanni.img}
                url={hanni.url}
                recent={recplayed}
                dur={hanni.duration}
              />
            );
          })}
        </div>
      )}
      {artistbool && short && (
        <div>
          {shortartists.map((hanni, index) => {
            return (
              <ArtistEntry
                key={index}
                pos={hanni.rank}
                artist={hanni.artist}
                img={hanni.img}
              />
            );
          })}
        </div>
      )}
      {artistbool && medium && (
        <div>
          {medartists.map((hanni, index) => {
            return (
              <ArtistEntry
                key={index}
                pos={hanni.rank}
                artist={hanni.artist}
                img={hanni.img}
              />
            );
          })}
        </div>
      )}
      {artistbool && long && (
        <div>
          {longartists.map((hanni, index) => {
            return (
              <ArtistEntry
                key={index}
                pos={hanni.rank}
                artist={hanni.artist}
                img={hanni.img}
              />
            );
          })}
        </div>
      )}

      {nowplayingbool && (
        <div>
          <NowPlaying
            img={nowplaying.img}
            artist={nowplaying.artist}
            song={nowplaying.song}
            goBack={goBack}
            album={nowplaying.album}
          />
        </div>
      )}

      {recplayedbool && (
        <div>
          {recplayed.map((hanni, index) => {
            return (
              <Recent
                key={index}
                artist={hanni.artist}
                img={hanni.img}
                name={hanni.song}
                played_at={hanni.playedat}
                url={hanni.url}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Player;
