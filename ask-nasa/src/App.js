import './App.css';

function App() {
  const url = 'https://api.nasa.gov/planetary/apod?api_key=C85tS7kq4xLTxW1Uwe8PAYF9c6rziAiL42cOLslb';
  let parent = document.getElementById("parent");
  let img = document.createElement("img");
  let iframe = document.createElement("iframe");
  let title = document.getElementById("title");
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
      parent.insertBefore(img, parent.children[2]);
      img.setAttribute("src", data.url);
    }
    else {
      parent.insertBefore(iframe, parent.children[2]);
      iframe.setAttribute("src", data.url);
    }
    title.innerHTML = data.title;
    date.innerHTML = data.date;
    explanation.innerHTML = data.explanation;
    copyright.innerHTML = "Credited by: " + data.copyright;
  }

  getData();
  return (
    <div className="App" id="parent">
      <h1>Image of the day by NASA</h1>
      <h2 id="title">title</h2>
      <h5 id="date">date</h5>
      <p id="copyright"></p>
      <p id="explanation"></p>
    </div>
  )
}


export default App;
