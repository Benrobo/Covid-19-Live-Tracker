const COUNTRY_API = "https://restcountries.eu/rest/v2/";
const CASE_API = "https://api.covid19api.com/summary";
const CASE_API_Country = "https://disease.sh/v3/covid-19/countries";

// get Covid19 cases
async function getcases(){
    let res = await fetch(CASE_API);
    let data = await res.json();
    return data;
}

async function getdata(){
    let response = await getcases();
    let oup = [];
    oup.push(response)
    let newdata = oup.map((data)=>{
        console.log(data);
        let {TotalConfirmed , TotalRecovered, TotalDeaths} = data.Global
        console.log(TotalConfirmed);
        let recovered = TotalRecovered;
        let death = TotalDeaths;
        let total = TotalConfirmed;
        let fmatDeath = numeral(death).format('0,0');
        let fmatCase = numeral(total).format('0,0');
        let fmatRecovered = numeral(recovered).format('0,0');

        // let objTest = {fmatCase, fmatDeath, fmatRecovered}
        showCounts(fmatCase, fmatDeath, fmatRecovered)
    })
}
getdata()



function showCounts(fmatCase, fmatDeath, fmatRecovered){
    let cases = document.querySelector(".cases")
    let recoverd = document.querySelector(".recovered")
    let death = document.querySelector(".death")

    cases.textContent = `${fmatCase}`;
    recoverd.textContent = `${fmatRecovered}`;
    death.textContent = `${fmatDeath}`;
    showcard(fmatCase)

}

function showMaps(){

}


async function getCountries(){
    let result = await fetch(COUNTRY_API);
    let data = await result.json();
    let dropdown = document.querySelector('.countries');
    dropdown.setAttribute("class", "form-control ml-1 countries")
    dropdown.style.width = "170px"
    let form = document.querySelector(".countries-form-cont");
    
    data.map((data)=>{
        let name = data['name']
        let option = document.createElement('option');
        option.value = name;
        option.innerHTML = name;
        dropdown.appendChild(option)
    })
    form.appendChild(dropdown)
}
getCountries()


async function showcard(){
    let affectedcont = document.querySelector(".affected-cont");
    let result = await fetch(CASE_API_Country);
    let data = await result.json();
    data.map((data)=>{
        let name = data['country']
        let cases = data['cases']
        let cardCont = document.createElement("div")
        cardCont.setAttribute("class", "card-cont")
        cardCont.innerHTML = `
            <div class="clear-fix">
                <div class="float-left">
                    <img alt="flag" class="flag-img">
                    <small class="ml-1">${name}</small>
                </div>

                <div class="float-right">
                    <small class="mr-1 country-case-val">${cases}</small>
                </div>
            </div>
        `;
        affectedcont.appendChild(cardCont)
    })
    
    appendCountryFlag();
}


async function appendCountryFlag(){

    let result = await fetch(COUNTRY_API);
    let data = await result.json();
    let flag = document.querySelectorAll(".flag-img")
    let flagsrc = data.map((data)=>{
        let src = data.flag;
        return src
    })
    console.log();
    flag.forEach((img)=>{
        // img.src = flagsrc;
        console.log(data.flag);
    })
}


// api
// https://api.kawalcorona.com/
// countries api : https://restcountries.eu/rest/v2/name/nigeria
/*
let date = Object.keys(data.cases);
    let total = Object.values(data.cases);
    let deaths = Object.values(data.deaths);
    let recovered = Object.values(data.recovered);
    console.log(data);
    console.log(`Death ` + total);
    **/