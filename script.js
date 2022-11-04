
//*apis**/
let labels =[]
let yData=[]

const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }; 

  let europeData=await fetchData("https://restcountries.com/v3.1/region/europe")
  console.log(europeData)
  europeData.forEach(country => {
    labels.push(country.name.common)
    yData.push(country.population)

  });
  console.log(labels);
  console.log(yData);

  //*chart*//


  const data = {
    labels: labels,
    datasets: [{
      label: 'population',
      backgroundColor: '#407076',
      borderColor: '#97B1A6',
      data: yData,
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {}
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

