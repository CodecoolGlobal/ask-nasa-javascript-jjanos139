import './App.css';
import React from "react";

let urlbase = 'https://api.nasa.gov/planetary/apod?api_key=C85tS7kq4xLTxW1Uwe8PAYF9c6rziAiL42cOLslb&date=';
let now = new Date();
let basedate = now.toISOString().slice(0, 10);

export default function App() {
  let input = document.getElementById("input");
  const [url, setUrl] = React.useState(urlbase + basedate);
  const [nasaData, setNasaData] = React.useState({});

  React.useEffect(function getData() {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setNasaData(data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [url])

  function dateChange() {
    setUrl(urlbase + input.value);
  }

  return (
    <div className="App">
      <h1>Image of the day by NASA</h1>
      <input id="input" type="date" onChange={dateChange}></input>
      <div id="parent">
        <h3>{nasaData.title}</h3>
        <p>{nasaData.date}</p>
        {nasaData.media_type === "video" ? <iframe src={nasaData.url} title={nasaData.url} /> : ""}
        {nasaData.media_type === "image" ? <img src={nasaData.url} alt="" /> : ""}
        <p className='explanation'>{nasaData.explanation}</p>
        {nasaData.copyright ? <p>Credited by: {nasaData.copyright}</p> : ""}
      </div>
    </div>
  )
}