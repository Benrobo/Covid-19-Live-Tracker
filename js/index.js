
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
        console.log(data);
        let date = Object.keys(data.cases);
        let recovered = Object.values(data.recovered);
        let death = Object.values(data.deaths);
        let total = Object.values(data.cases);
        let fmatDeath = numeral(death[death.length-1]).format('0,0');
        let fmatCase = numeral(total[total.length-1]).format('0,0');
        let fmatRecovered = numeral(recovered[recovered.length-1]).format('0,0');

        let objTest = {fmatCase, fmatDeath, fmatRecovered}
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