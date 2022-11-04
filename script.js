
let countries =[]
let population=[]
let countriesCode=[]
const chartDiv=document.querySelector(".chartDiv")

const countriesBtnDiv=document.querySelector(".countriesBtnDiv")
let myChart;

const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }; 

//   const getCities=async()=>{
//     let cities=await fetchData("https://countriesnow.space/api/v0.1/countries")
//     console.log(cities);
//   }
//   getCities()

  let getDataOfRegion= async (region)=>{
    let data=await fetchData(`https://restcountries.com/v3.1/region/${region}`)
    console.log(data);
    data.forEach(country => {
    countries.push(country.name.common)
    population.push(country.population)
    countriesCode.push(country.cca2)
    console.log(countriesCode);
    });
    return{
        countries, population, countriesCode
    }
    
  }

countriesBtnDiv.addEventListener("click",x=>{
    console.log(x.target.classList[0]);
})


const getDataMakeChartAfterClick = async()=>{
    let regionsBtn=document.querySelector(".regions-btn")
    regionsBtn.addEventListener("click",async (x) =>{
        countries=[]
        population=[]


       
        let region=x.target.classList.value
        console.log(x.target.classList.value);
        let results=await getDataOfRegion(region)
        console.log(results);
        makeChart(countries,population)
        makeCountryButtons(countries)
    })
}

getDataMakeChartAfterClick()

const makeCountryButtons=async (countries,countriesCode)=>{
    countriesBtnDiv.innerHTML=""

    for(let i=0; i<=countries.length;i++){
        let country=await countries[i]
        // let countryCode=await countriesCode[i]
        let btn=document.createElement("button")
        btn.innerHTML=country
        // console.log(countryCode);
        // btn.classList.add(`${countriesCode[i]}`)
        countriesBtnDiv.appendChild(btn)
    }

    // countries.forEach((country,i,countriesCode)=>{
    //     let btn=document.createElement("button")
    //     btn.innerHTML=country
    //     console.log(countriesCode);
    //     btn.classList.add(`${countriesCode[i]}`)
    //     countriesBtnDiv.appendChild(btn)

    // })
}

const makeChart=(countries, population)=>{
    if(myChart!=undefined){
        myChart.destroy()
    }
    const data = {
        labels: countries,
        datasets: [{
          label: 'population',
          backgroundColor: '#407076',
          borderColor: '#97B1A6',
          data: population,
        }]
      };
    
      const config = {
        type: 'bar',
        data: data,
        options: {}
      };
    
      myChart = new Chart(
        document.getElementById('myChart'),
        config
      );
}


