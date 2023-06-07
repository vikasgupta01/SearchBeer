import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const SearchBar = () => {
  const [searchItems, setSearchItems] = useState([]);
  const handleKeyUp = async (event) => {
    const inputVal = event.target.value;
    const matchText = (beerName) => {
      // console.log("beerName: ", beerName);
      // console.log("inputValue: ", inputVal);
      return (
        beerName.toLowerCase().slice(0, inputVal.length) ===
        inputVal.toLowerCase()
      );
    };
    if (inputVal.length === 0) {
      setSearchItems([]);
    } else {
      const response = await fetch("https://api.sampleapis.com/beers/ale");
      const jsonData = await response.json();
      let beerNames = [];
      for (var i = 0; i < Object.keys(jsonData).length; i++) {
        beerNames.push(jsonData[i].name);
      }
      // console.log("beer names: ", beerNames);

      const filteredNames = beerNames.filter(matchText);
      setSearchItems(filteredNames);
    }
  };

  return (
    <div>
      <h1>SearchBeer</h1>
      <div>
        <TextField
          onKeyUp={(event) => handleKeyUp(event)}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        />
        <div style={{ textAlign: "center" }}>
          <ul style={{ listStyleType: "none" }}>
            {searchItems.map((item, key) => {
              return <li key={key}>{item}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

//--------------

// console.log(10);

// function print() {
//   console.log(20);
// }

// setTimeout(() => {
//   console.log(30);
// }, 0);

// const pr = new Promise((res, rej) => {
//   res(1);
// });

// pr.then((data) => {
//   console.log(data);
// });

// print();

// // 10
// // 20
// // 30
// // 1
