import './App.css';

let urlbase = 'https://api.nasa.gov/planetary/apod?api_key=C85tS7kq4xLTxW1Uwe8PAYF9c6rziAiL42cOLslb&date=';
let now = new Date();
let basedate = now.toISOString().slice(0, 10)
let url = urlbase + basedate;

function App() {
  let parent = document.getElementById("parent");
  let img = document.createElement("img");
  let iframe = document.createElement("iframe");
  let title = document.createElement("h3");
  let date = document.createElement("p");
  let explanation = document.createElement("p");
  let copyright = document.createElement("p");
  let input = document.getElementById("input");
  function getData() {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        displayItems(data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  function displayItems(data) {
    parent.innerHTML = "";
    title.innerHTML = data.title;
    date.innerHTML = data.date;
    parent.appendChild(title);
    parent.appendChild(date);
    if (data.media_type === "image") {
      img.setAttribute("src", data.url);
      parent.appendChild(img);
    }
    else if (data.media_type === "video") {
      iframe.setAttribute("src", data.url);
      parent.appendChild(iframe);
    }
    explanation.innerHTML = data.explanation;
    if (data["copyright"])
      copyright.innerHTML = "Credited by: " + data.copyright;
    else
      copyright.innerHTML = "";
    parent.appendChild(copyright);
    parent.appendChild(explanation);
  }

  getData();

  function dateChange() {
    url = urlbase + input.value;
    App();
  }

  return (
    <div className="App">
      <h1>Image of the day by NASA</h1>
      <input id="input" type="date" value={basedate} onChange={dateChange}></input>
      <div id="parent">
      </div>
    </div>
  )
}

export default App;
