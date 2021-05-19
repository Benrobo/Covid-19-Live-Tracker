const COUNTRY_API = "https://corona.lmao.ninja/v2/countries/";
const CASE_API = "https://api.covid19api.com/summary";
const CASE_API_Country = "https://disease.sh/v3/covid-19/countries";

let cases = document.querySelector(".cases");
let recoverd = document.querySelector(".recovered");
let death = document.querySelector(".death");
let countryselect = document.querySelector(".countries");
let filterbtn = document.querySelector(".filterbtn");
// chart
let chartcont = document.querySelector(".chart-container")
var ctx = document.getElementById("myChart");

window.addEventListener("DOMContentLoaded", (e) => {});

// get Covid19 cases
async function getcases() {
  let res = await fetch(CASE_API);
  let data = await res.json();
  return data;
}

async function getdata() {
  let response = await getcases();
  let oup = [];
  oup.push(response);
  let newdata = oup.map((data) => {
    let { TotalConfirmed, TotalRecovered, TotalDeaths } = data.Global;
    let recovered = TotalRecovered;
    let death = TotalDeaths;
    let total = TotalConfirmed;
    let fmatDeath = numeral(death).format("0,0");
    let fmatCase = numeral(total).format("0,0");
    let fmatRecovered = numeral(recovered).format("0,0");

    showCounts(fmatCase, fmatDeath, fmatRecovered);
  });
}
getdata();

function showCounts(fmatCase, fmatDeath, fmatRecovered) {
  // if the select tag is changed
  cases.textContent = `${fmatCase}`;
  recoverd.textContent = `${fmatRecovered}`;
  death.textContent = `${fmatDeath}`;
  showcard(fmatCase);
}

function handleFilter() {
  filterbtn.onclick = async (e) => {
    e.preventDefault();
    let res = await fetch(
      `https://corona.lmao.ninja/v2/countries/${countryselect.value}`
    );

    let data = await res.json();
    let name = data.country;
    // country info
    let { lat, long } = data.countryInfo;
    let recovered = numeral(Math.round(data.recovered)).format("0,0");
    let deaths =
      numeral(Math.round(data.deathsPerOneMillion)).format("0,0") + "M";
    let total =
      numeral(Math.round(data.recoveredPerOneMillion)).format("0,0") + "M";

    cases.textContent = `${total}`;
    recoverd.textContent = `${recovered}`;
    death.textContent = `${deaths}`;

    // showMaps(lat, long, name);
    showChartOfCountry(countryselect.value)
  };
}
handleFilter();

async function getCountries() {
  let result = await fetch(COUNTRY_API);
  let data = await result.json();
  let dropdown = document.querySelector(".countries");
  dropdown.setAttribute("class", "form-control ml-1 countries");
  dropdown.style.width = "170px";
  let form = document.querySelector(".countries-form-cont");

  data.map((data) => {
    // return;
    let name = data["country"];
    let option = document.createElement("option");
    option.value = name;
    option.innerHTML = name;
    dropdown.appendChild(option);
    let { lat, long } = data.countryInfo;
    //   showMaps(lat, long, name);
  });
  form.appendChild(dropdown);
  // console.log(lat);
}
getCountries();

// async function showMap() {
//   let req = await fetch(COUNTRY_API);
//   let res = await req.json();

//   // var mymap = L.map('coro-map').setView([lat,long], 13);

//   // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(mymap);
// }
// showMap();

async function showcard() {
  let affectedcont = document.querySelector(".affected-cont");
  let result = await fetch(CASE_API_Country);
  let data = await result.json();
  data.map((data) => {
    let name = data.country;
    let flag = data.countryInfo.flag;
    let cases = data.cases;
    let cardCont = document.createElement("div");
    cardCont.setAttribute("class", "card-cont");
    cardCont.innerHTML = `
            <div class="clear-fix">
                <div class="float-left">
                    <img src="${flag}" alt="flag" class="flag-img">
                    <small class="ml-1">${name}</small>
                </div>

                <div class="float-right">
                    <small class="mr-1 country-case-val">${cases}</small>
                </div>
            </div>
        `;
    affectedcont.appendChild(cardCont);
  });
}

// api
// https://api.kawalcorona.com/
// countries api : https://restcountries.eu/rest/v2/name/nigeria

async function covidChart() {
  let result = await fetch(
    "https://disease.sh/v3/covid-19/historical/all"
  );
  let data = await result.json();
  let dates = Object.keys(data.cases);
  let total = Object.values(data.cases);
  let deaths = Object.values(data.deaths);
  let recovered = Object.values(data.recovered);

    // console.log(recovered);
    // // console.log(data);
    // return;
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
            label: 'Total Cases',
            data: total,
            backgroundColor:'rgba(255, 99, 132, 0.2)',
            borderColor:'black',
            borderWidth: 1
          },
          {
            label: 'Recovered Cases',
            data: recovered,
            borderColor: 'green',
            fill: false,
          },
          {
            label: 'Deaths',
            data: deaths,
            borderColor: 'red',
            fill: false,
          },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
covidChart();


// if dropdown value is changed and filterbutton is clicked
async function showChartOfCountry(countryName){
    if(chartcont.innerHTML !== ""){
        chartcont.innerHTML == "";
    }else{
        
        let result = await fetch(
            `https://disease.sh/v3/covid-19/historical/${countryName}`
        );
        let data = await result.json();

        let dates = Object.keys(data.timeline.cases);
        let total = Object.values(data.timeline.cases);
        let deaths = Object.values(data.timeline.deaths);
        let recovered = Object.values(data.timeline.recovered);
            
        //   console.log(recovered[recovered.length-1]);
        //   return;
        var myChart = new Chart(ctx, {
            type: "line",
            data: {
            labels: dates,
            datasets: [
                {
                    label: 'Total Cases: ' + total[total.length-1],
                    data: total,
                    backgroundColor:'rgba(255, 99, 132, 0.2)',
                    borderColor:'black',
                    borderWidth: 1
                },
                {
                    label: 'Recovered Cases: ' + recovered[recovered.length-1],
                    data: recovered,
                    borderColor: 'green',
                    fill: false,
                },
                {
                    label: 'Deaths: ' + deaths[deaths.length-1],
                    data: deaths,
                    borderColor: 'red',
                    fill: false,
                },
            ],
            },
            options: {
            responsive: true,
            scales: {
                y: {
                beginAtZero: true,
                },
            },
            },
        });
    }
      
}