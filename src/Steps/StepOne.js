import React, { useEffect, useState } from "react";
import axios from "axios";

import StepOneDiv from "./style/StepOneStyle";

function StepOne() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          "https://skyit-coding-challenge.herokuapp.com/movies"
        );
        setData(data);
        console.log(data);
      } catch (err) {
        console.log("There was an error retrieving the data");
      }
    };

    getData();
  }, []);

  const displayData = (dataArg) => {
    return dataArg.map((movie) => {
      return (
        <div className="movieBox">
          <p>{movie.title}</p>
          <p>{movie.releaseDate}</p>
          <p>{movie.director}</p>
          <p>{movie.length}</p>
          <p>{movie.rating}</p>
        </div>
      );
    });
  };

  return <StepOneDiv>{displayData(data)}</StepOneDiv>;
}

export default StepOne;
