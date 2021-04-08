var api = fetch("https://restcountries.eu/rest/v2/all");
let row = document.querySelector("#row");

api
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        for (i = 0; i < data.length; i++) {
            let col = createTag("div", "col-lg-3 col-sm-12");
            col.setAttribute("style", "height:400px;width:200px; margin-bottom:10px");
            let card = createTag("div", "card");
            col.setAttribute("style", "background-color:black;");
            card.setAttribute("style", "margin-top:20px");
            let cn_name = createTag("h4", "card-title");
            cn_name.setAttribute(
                "style",
                "text-align:center;background-color:black;color:white; padding: 5px 5px;margin:0px"
            );
            cn_name.innerText =
                data[i].name.length > 15 ?
                data[i].name.slice(0, 15) + "..." :
                data[i].name;
            let img = createTag("img", "card-img-top");
            img.src = data[i].flag;
            img.alt = "No Image";
            img.setAttribute(
                "style",
                "object-fit:contain; width:100%;height:200px;margin:0px"
            );
            let card_body = createTag("div", "card-body");
            card_body.setAttribute(
                "style",
                "color:white;background-image:linear-gradient(to left, gray, lightgray);text-align:center"
            );
            card_body.innerHTML = `<h6 class="card-text">Capital: ${
        data[i].capital ? data[i].capital : "NA"
      }</h6>
      <h6 class="card-text">Region: ${
        data[i].region ? data[i].region : "NA"
      }</h6>
      <h6 class="card-text">Country Code: ${data[i].alpha3Code}</h6>
      <button class="btn btn-secondary" onclick="weatherDetails(${
        data[i].latlng[0]
      },${
        data[i].latlng[1]
      })" style="border:1px solid black">Click for Weather</button>`;

            let card_header = createTag("div", "card-header");
            card_header.setAttribute("style", "padding:0px");
            card_header.append(cn_name, img);
            card.append(card_header, card_body);
            col.append(card);
            row.append(col);

            //   console.log(data[i]);
        }
    })
    .catch((err) => {
        console.log(err);
    });

function createTag(ele, eleclass) {
    let element = document.createElement(ele);
    element.setAttribute("class", eleclass);
    return element;
}

function weatherDetails(lat, lon) {
    let key = "1234f59e5798e86cc9241a1ff070cd36";
    let url = fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
    );
    url
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            alert(`
          Temperature - ${data.main.temp} Cel
          Humidity - ${data.main.humidity} %
          Pressure - ${data.main.pressure} Pa
          Weather - ${data.weather[0].main}`);
            //   console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
}