import React from "react";
import "./Player.css";
import { useEffect, useState } from "react";

const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?`;
const TOP_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists?`;

const Player = (props) => {
  const [longgenres, setLongGenres] = useState([]);
  const [medgenres, setMedGenres] = useState([]);
  const [shortgenres, setShortGenres] = useState([]);
  useEffect(() => {
    getGenres();
  }, []);
  let longgenrearray = [];
  // const getTopArtists = async (timerange) => {
  //   return fetch(
  //     TOP_ARTISTS_ENDPOINT + `time_range=${timerange}` + "&limit=10",
  //     {
  //       headers: {
  //         Authorization: `Bearer ${props.token}`,
  //       },
  //     }
  //   );
  // };

  const getTopTracks = async (timerange) => {
    return fetch(
      TOP_TRACKS_ENDPOINT + `time_range=${timerange}` + "&limit=50",
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    );
  };

  const getArtist = async (id) => {
    return fetch("https://api.spotify.com/v1/artists/" + id, {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    });
  };

  function sortByFrequency(arr) {
    const frequencyMap = {}; // Object to store element frequencies

    // Count occurrences of each element in the array
    for (const item of arr) {
      if (frequencyMap[item]) {
        frequencyMap[item]++;
      } else {
        frequencyMap[item] = 1;
      }
    }

    // Sort the array based on element frequency
    const sortedArray = arr.sort((a, b) => frequencyMap[b] - frequencyMap[a]);

    return sortedArray;
  }

  const getGenres = async () => {
    const response = await getTopTracks("long_term");
    const ke1 = response.json();
    const array = [];
    ke1.then(function (result) {
      const data = result;
      console.log(data);

      for (let i = 1; i <= 50; i++) {
        array.push(data.items[i - 1].album.artists[0].id);
      }
    });
    const genrearray = [];
    for (let k = 0; k < 50; k++) {
      const art = (await getArtist(array[k])).json();

      art.then(function (result) {
        const data = result;
        console.log(data);
        genrearray.push(data.genres);
      });
    }

    const AllGenreArray = sortByFrequency(genrearray);

    console.log(AllGenreArray);
  };

  // for (let i = 0; i < 50; i++) {
  //   let array = data[0].genres;
  //   for (let k = 0; i < array.length(); i++) {
  //     longgenrearray.push(array[k]);
  //   }
  // }

  console.log(longgenrearray);

  return <div className="App"></div>;
};

export default Player;
