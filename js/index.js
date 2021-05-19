const COUNTRY_API = "https://corona.lmao.ninja/v2/countries/";
const CASE_API = "https://api.covid19api.com/summary";
const CASE_API_Country = "https://disease.sh/v3/covid-19/countries";

let cases = document.querySelector(".cases");
let recoverd = document.querySelector(".recovered");
let death = document.querySelector(".death");
let countryselect = document.querySelector(".countries");
let filterbtn = document.querySelector(".filterbtn");

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

async function showMap() {
  let req = await fetch(COUNTRY_API);
  let res = await req.json()


 
  // var mymap = L.map('coro-map').setView([lat,long], 13);

  // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(mymap);
}
showMap();

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

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});