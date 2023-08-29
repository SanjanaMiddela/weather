
    const apiKey="033a82377e0351a4ca6a7a51e0a248bb";
    const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const searchBox=document.querySelector(".search input");
    const searchBtn=document.querySelector(".search button");
    const weatherIcon=document.querySelector(".weather-icon");
    const timeEl = document.getElementById('time');
    const dateEl = document.getElementById('date');
    const btn=document.querySelector(".search button");
    const card=document.querySelector(".card");
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    setInterval(() => {
        const time = new Date();
        const month = time.getMonth();
        const date = time.getDate();
        const day = time.getDay();
        const hour = time.getHours();
        const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
        const minutes = time.getMinutes();
        const ampm = hour >=12 ? 'PM' : 'AM'
    
        timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`
    
        dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]
    
    }, 1000);
async function checkWeather(city){
        const response=await fetch(apiUrl +city+ `&appid=${apiKey}`);
        if(response.status==404){
            document.querySelector(".error").style.display="block";
            document.querySelector(".weather").style.display="none";
        }else{
        var data=await response.json();
        console.log(data);
        document.querySelector(".city").innerHTML=data.name;
        document.querySelector(".temp").innerHTML=data.main.temp+"°c";
        document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
        document.querySelector(".wind").innerHTML=data.wind.speed + "km/h";

       if(data.weather[0].main=="Clouds"){
            weatherIcon.src="images/clouds.png";
        }
        else if(data.weather[0].main=="Clear"){
            weatherIcon.src="images/clear.png";
        }
        else if(data.weather[0].main=="Rain"){
            weatherIcon.src="images/rain.png";
        }
        else if(data.weather[0].main=="Drizzle"){
            weatherIcon.src="images/drizzle.png";
        }
        else if(data.weather[0].main=="Mist"){
            weatherIcon.src="images/mist.png";
        }
        document.querySelector(".weather").style.display="block";
        document.querySelector(".error").style.display="none";
    }
}

async function fetchWeatherData(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    let timeOfDay = "day";
    const weatherCode = data.weather[0].id;

    if (!data.sys.sunrise || !data.sys.sunset) {
        timeOfDay = "night";
    } else {
        const currentTime = new Date().getTime() / 1000;
        if (currentTime >= data.sys.sunset || currentTime <= data.sys.sunrise) {
            timeOfDay = "night";
        }
    }

    // Update card background based on weather code
    if (weatherCode === 800) {
        card.style.backgroundImage = `url("https://images.unsplash.com/photo-1476673160081-cf065607f449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80")`;
        // Update other styles if needed
    } else if (weatherCode >= 801 && weatherCode <= 804) {
        card.style.backgroundImage = `url("https://images.unsplash.com/photo-1531494897613-6c4376dc3511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80")`;
        // Update other styles if needed
    } else if (weatherCode >= 500 && weatherCode <= 531) {
        card.style.backgroundImage = `url("https://images.unsplash.com/photo-1548232979-6c557ee14752?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80")`;
        // Update other styles if needed
    } else if (weatherCode >= 600 && weatherCode <= 622) {
        card.style.backgroundImage = `url("https://images.unsplash.com/photo-1483664852095-d6cc6870702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80")`;
        // Update other styles if needed
    } else if (weatherCode >= 200 && weatherCode <= 232) {
        card.style.backgroundImage = `url("https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGh1bmRlcnN0b3JtfGVufDB8fDB8fHww&auto=format&fit=crop&w=1000&q=60")`;
        // Update other styles if needed
    } else {
        card.style.backgroundImage = `url("https://images.unsplash.com/photo-1536244636800-a3f74db0f3cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=792&q=80")`;
        // Update other styles if needed
    }

    // Update button background based on time of day
    if (timeOfDay === "night") {
        btn.style.background = "#181e27";
    } else {
        btn.style.background = "#e5ba92";
    }

    card.style.opacity = "1";
}




searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
    fetchWeatherData(searchBox.value);
})
