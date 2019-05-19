const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "Mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
    "Thunderstorm": "wi wi-day-thunderstorm",
}


function capitalize(str){
    return str[0].toUpperCase() + str.slice(1);
}

async function main(withIP = true){
    let ville;
    
    if(withIP){
        //Choper l'adresse IP du PC qui ouvre la page:
        const ip = await fetch('https://api.ipify.org?format=json')
        .then(resultat => resultat.json())
        .then(json => json.ip)
        //Choper la ville hrâce à l'adresse IP sur APi suivante:
         ville = await fetch('http://ip-api.com/json/' + ip)
            .then(resultat => resultat.json())
            .then(json => json.city)

    } else {

        ville = document.querySelector("#ville").textContent;
    }                      

   
            
 
    const meteo = await fetch("http://api.openweathermap.org/data/2.5/weather?q=" + ville + "&appid=xxx&lang=fr&units=metric")
     
                    .then(resultat => resultat.json())
                    .then(json => json)    
     console.log(meteo);
    //Afficher les informations sur lapage

    displayWeatherInfos(meteo); 
}

function displayWeatherInfos(data){

    const name = data.name;
    const temp = data.main.temp;
    const tempMin = data.main.temp_min;
    const tempMax = data.main.temp_max;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;

    document.querySelector('#ville').textContent = name;
    document.querySelector('#temperature').textContent = Math.round(temp);
    document.querySelector('#conditions').textContent = capitalize(description);
    document.querySelector("#tempMin").textContent = Math.round(tempMin);
    document.querySelector("#tempMax").textContent = Math.round(tempMax);
    
    document.querySelector("i.wi").className = weatherIcons[conditions];
    document.body.className = conditions.toLowerCase();
}
const ville = document.querySelector("#ville");

ville.addEventListener("click", () => {

    ville.contentEditable = true;
});

ville.addEventListener("keydown", (e) => {

    if(e.keyCode === 13){
        e.preventDefault();
        ville.contentEditable = false;
        main(withIP = false);
    }
})


main();