
// get Covid19 cases
async function getcases(){
    let CASE_API = "https://disease.sh/v3/covid-19/historical/all?lastdays=90";
    let res = await fetch(CASE_API);
    let data = await res.json();

    return data;
}

async function getdata(){
    let response = await getcases();
    let oup = [];
    oup.push(response)
    let newdata = oup.map((data)=>{
        // console.log(data);
        let date = Object.keys(data.cases);
        let recovered = Object.values(data.recovered);
        let death = Object.values(data.deaths);
        let total = Object.values(data.cases);
        let fmatDeath = numeral(death[death.length-1]).format('0,0');
        let fmatCase = numeral(total[total.length-1]).format('0,0');
        let fmatRecovered = numeral(recovered[recovered.length-1]).format('0,0');

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
    
}

function showMaps(){

}


async function getCountries(){
    let COUNTRY_API = "https://restcountries.eu/rest/v2/";
    let result = await fetch(COUNTRY_API);
    let data = await result.json();
    let dropdown = document.querySelector('.countries');
    dropdown.setAttribute("class", "form-control ml-1 countries")
    dropdown.style.width = "170px"
    let form = document.querySelector(".countries-form-cont");
    
    data.map((data)=>{
        let name = data['name']
        let flag = data['flag']
        let option = document.createElement('option');
        option.value = name;
        option.innerHTML = name;
        dropdown.appendChild(option)
    })
    form.appendChild(dropdown)
}
getCountries()


async function showcard(){
    let COUNTRY_API = "https://restcountries.eu/rest/v2/";
    let affectedcont = document.querySelector(".affected-cont");
    let result = await fetch(COUNTRY_API);
    let data = await result.json();
    let oup;
    data.map((data)=>{
        let name = data['name']
        let flag = data['flag']
        let cardCont = document.createElement("div")
        cardCont.setAttribute("class", "card-cont")
        cardCont.innerHTML = `
            <div class="clear-fix">
                <div class="float-left">
                    <img src="${flag}" alt="flag">
                    <small class="ml-1">${name}</small>
                </div>

                <div class="float-right">
                    <small class="mr-1">1123.5</small>
                </div>
            </div>
        `;
        affectedcont.appendChild(cardCont)
    })
}
showcard()
// function populateDropdwn(name){
//     let dropdown = document.querySelector('.countries');
//     let form = document.mquerySelector(".countries-form-cont");
//     dropdown.innerHTML = `
//         <select class="form-control countries">
//         <option value="">Select Country</option>
//         <option value="">Global</option>
//         <option value="${name}">${name}</option>
//         </select>
//     `;
// }
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