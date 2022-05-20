import './App.css';

let urlbase = 'https://api.nasa.gov/planetary/apod?api_key=C85tS7kq4xLTxW1Uwe8PAYF9c6rziAiL42cOLslb&date=';
let now = new Date();
let url = urlbase + now.toISOString().slice(0, 10);


function App() {
  let parent = document.getElementById("parent");
  let img = document.createElement("img");
  let iframe = document.createElement("iframe");
  let title = document.getElementById("title");
  let input = document.getElementById("input");
  let date = document.getElementById("date");
  let explanation = document.getElementById("explanation");
  let copyright = document.getElementById("copyright");
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
    if (data.media_type === "image") {
      parent.insertBefore(img, parent.children[3]);
      img.setAttribute("src", data.url);
    }
    else {
      parent.insertBefore(iframe, parent.children[3]);
      iframe.setAttribute("src", data.url);
    }
    if (parent.children[3].nodeType === img.nodeType || parent.children[3].nodeType === iframe.nodeType)
      parent.removeChild(parent.children[4]);
    title.innerHTML = data.title;
    date.innerHTML = data.date;
    explanation.innerHTML = data.explanation;
    if (data["copyright"])
      copyright.innerHTML = "Credited by: " + data.copyright;
    else
      copyright.innerHTML = "";
  }

  getData();

  function dateChange() {
    url = urlbase + input.value;
    App();
  }

  return (
    <div className="App">
      <div id="parent">
        <h1 id="header">Image of the day by NASA</h1>
        <input id="input" type="date" onChange={dateChange}></input>
        <h2 id="title">title</h2>
        <h5 id="date">date</h5>
        <p id="copyright"></p>
        <p id="explanation"></p>
      </div>
    </div>
  )
}

export default App;
