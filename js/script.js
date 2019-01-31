const oneDay =1000*60*60*24;
const enrtyData = [
    {
        data: Date.now()-oneDay*2,
        temperature: {
            night: 0,
            day: 4,
        },
        cloudiness: 'Переменная облачность',
        snow: false,
        rain: true,
    },
    {
        data:Date.now()-oneDay,
        temperature: {
            night: 0,
            day: 1,
        },
        cloudiness: 'Облачно',
        snow: true,
        rain: true,
    }
    ,{
        data: Date.now(),
        temperature: {
            night: -3,
            day: 2,
        },
        cloudiness: 'Ясно',
        snow: false,
        rain: false,
    },
    {
        data: Date.now()+oneDay,
        temperature: {
            night: 0,
            day: 4,
        },
        cloudiness: 'Переменная облачность',
        snow: false,
        rain: true,
    },
    {
        data:Date.now()+oneDay*2,
        temperature: {
            night: 0,
            day: 1,
        },
        cloudiness: 'Облачно',
        snow: true,
        rain: true,
    },

    {
        data: Date.now()+oneDay*3,
        temperature: {
            night: 0,
            day: 1,
        },
        cloudiness: 'Облачно',
        snow: true,
        rain: false,
    },
    {
        data: Date.now()+oneDay*4,
        temperature: {
            night: 0,
            day: 1,
        },
        cloudiness: 'Облачно',
        snow: true,
        rain: false,
    }

]

const transformData = (objWeather) => {

    const getDate = data => {
        const dateOptions = {
            month: 'long',
            weekday: "long",
            day: "numeric"
        }
    
        const curDateStart = new Date().setHours(0, 0, 0);
        const curDateEnd = new Date().setHours(23, 59, 59, 999);
    
        let [day, date] = new Date(data).toLocaleString("ru", dateOptions).split(', ');
    
        if (data >= curDateStart && data <= curDateEnd) {
            day = "сегодня";
        }
        return {
            day,
            date
        };
    }
    
    const getWeather = (rain, snow) => {
        let weather = '';
        switch (parseInt(weather + (+rain) + (+snow), 2)) {
            case 0:
                weather = 'без осадков';
                break;
            case 1:
                weather = 'снег';
                break;
            case 2:
                weather = 'дождь';
                break;
            case 3:
                weather = 'дождь со снегом';
                break;
        }
    
        return weather;
    
    }

    const getTemp = (timesOfDay, value) => {
        const  timeStr = timesOfDay === 'dayTemp' ? 'днём' : 'ночью';
        return `${timeStr} ${value}&deg`;
    }

    const getImgWeather = (cloudiness) => {
        let pathToImg='';
        
        switch (cloudiness) {           
            case 'Облачно':
                pathToImg = '../img/cloud.svg';
                break;
            case 'Переменная облачность':
                pathToImg = '../img/cloudy-rain.svg';
                break;
            case 'Ясно':
            pathToImg = '../img/sun.svg';
                break;
        }
    
        return pathToImg;       
    }

    const {
        data,
        temperature: {
            night: nightTemp,
            day: dayTemp
        },
        cloudiness,
        snow,
        rain
    } = objWeather;

    const {
        day,
        date
    } = getDate(data);

    const weather = getWeather(rain, snow);

    const updateItem = {
        day,
        date,
        cloudiness : getImgWeather(cloudiness),
        dayTemp : getTemp('dayTemp', dayTemp),
        nightTemp: getTemp('nightTemp',nightTemp),           
        weather
    }
    return updateItem;
}

const createBlock = (weatherItem) => {
    const div = document.createElement('div'),
        blocks = document.querySelector('.blocks');

    div.classList.add('slider-block');
    
    for (let item in weatherItem) {
        let childDiv = document.createElement('div');
        if (item === 'cloudiness'){            
            const img = document.createElement('img');
            img.src = weatherItem[item];            
            childDiv.appendChild(img);            
        } else {
            childDiv.innerHTML = weatherItem[item];
        }        
        childDiv.classList.add(`${item}`)
        div.appendChild(childDiv);
    }
    blocks.appendChild(div);
}


const newDate = enrtyData.map(transformData);
newDate.forEach(createBlock);
