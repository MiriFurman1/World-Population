
let countries =[]
let population=[]
let allData=[]
let allCitiesData=[]
let citiesData;
let cities=[]
let citiesPopulation=[]
let errorMessage
const chartDiv=document.querySelector(".chartDiv")
const countriesBtnDiv=document.querySelector(".countriesBtnDiv")
let myChart;
let header=document.querySelector("h4")

const fetchDataCountry = async (url) => { // func for getting data about countries in a region
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }; 
// you should add headers to you request, this header is saying what format you are receiving  the data

  const fetchDataCities = async (url,country) => { // func for getting data about cities in a country
    try {
      const response = await fetch(url,{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            // "limit": 10,
            "order": "asc",
            "orderBy": "name",
            "country": country
        })
      });
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }; 




 

  const getDataMakeChartAfterClick = async()=>{ //!make chart for region
    let regionsBtn=document.querySelector(".regions-btn")
    regionsBtn.addEventListener("click",async (x) =>{ //when clicking on the region a chart will appear
        if (x.target.classList.value!=="regions-btn"){ //if an actual button was clicked and not just the div
            setSpinner(true)
            countries=[] //empty the array for the next chart
            population=[]
            header.innerHTML=""
            let region=x.target.classList.value
            let results = allData.find(x=>x.region==region)
            
            if(results==undefined){
            results=await getDataOfRegion(region)
            results["region"]=region
            allData.push(results)
            }
            countries=results["countries"]
            population=results["population"]
            makeChart(countries,population)
            header.innerHTML=region
            makeCountryButtons(countries)
            setSpinner(false)
        }

    })
}

getDataMakeChartAfterClick()

    let getDataOfRegion= async (region)=>{ //!get data for region
    let data=await fetchDataCountry(`https://restcountries.com/v3.1/region/${region}`) //get the data for specific region
    console.log(data);
    data.forEach(country => {
    countries.push(country.name.common)
    population.push(country.population)
    });
    return{
        countries, population
    }
    
  }

  const getDataForCountryAndMakeChart =async ()=>{ //!get data for the cities in the country
    countriesBtnDiv.addEventListener("click",async(x)=>{
        if(x.target!=countriesBtnDiv){
            setSpinner(true)
            cities=[]
            citiesPopulation=[]
            header.innerHTML=""
            if(errorMessage!=undefined){
                errorMessage=undefined
                setSpinner(false)
            }
            let country=x.target.innerHTML

            console.log(allCitiesData);
            let citiesData = allCitiesData.find(x=>x.data[0].country==country)
            
            
            if(citiesData==undefined){
            citiesData=await fetchDataCities("https://countriesnow.space/api/v0.1/countries/population/cities/filter",country); 
            if(!citiesData.error)
            allCitiesData.push(citiesData)
            }

    
        if(citiesData.error){ //if no data found, print error
            setSpinner(false)
            errorMessage=document.createElement("h3")
            errorMessage.innerHTML=`oops! no data found in the API for ${country}`
            chartDiv.appendChild(errorMessage)
            
        }
        else {
            citiesData.data.forEach((e)=>{
                citiesPopulation.push(e.populationCounts[0].value)
                cities.push(e.city)
                makeChart(cities,citiesPopulation)
                header.innerHTML=country
                
            })
            
           
            console.log(allCitiesData);
            setSpinner(false)
        }
  
        
    }
    
})}

getDataForCountryAndMakeChart()





const makeCountryButtons=async (countries)=>{
    countriesBtnDiv.innerHTML=""
    setSpinner(true)
    for(let i=0; i<countries.length;i++){
        let country=await countries[i]
        let btn=document.createElement("button")
        btn.innerHTML=country
        countriesBtnDiv.appendChild(btn)
    }
    setSpinner(false)

}

const setSpinner = (bool) => {
    if (bool) {
    const spinner = document.createElement('h3');
    spinner.textContent = 'Loading';
    chartDiv.appendChild(spinner);
    } else {
    const spinner = document.querySelector('h3');
    if(spinner){
        chartDiv.removeChild(spinner);
    }
    
    }
};

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


