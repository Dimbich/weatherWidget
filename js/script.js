const oneDay =1000*60*60*24;
const enrtyData = [
    // {
    //     data: Date.now()-oneDay*2,
    //     temperature: {
    //         night: 0,
    //         day: 4,
    //     },
    //     cloudiness: 'Переменная облачность',
    //     snow: false,
    //     rain: true,
    // },
    // {
    //     data:Date.now()-oneDay,
    //     temperature: {
    //         night: 0,
    //         day: 1,
    //     },
    //     cloudiness: 'Облачно',
    //     snow: true,
    //     rain: true,
    // }
    // 
    {
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
    }

]

//трансформируем объект в необходимый формат для верски
//start transformData
const transformData = (objWeather) => {
//start getDate     
//преобразуем дату из мс в день недели, число месяц
    const getDate = data => {
        //опции локализации даты
        const dateOptions = {
            month: 'long',
            weekday: "long",
            day: "numeric"
        }
        //устанавливаем границу текущего дня (начало и конец)
        const curDateStart = new Date().setHours(0, 0, 0);
        const curDateEnd = new Date().setHours(23, 59, 59, 999);
        let [day, date] = new Date(data).toLocaleString("ru", dateOptions).split(', ');
        //Если поолученая дата в диопазне текущей даты, то переопределяем день недели на "сегодня"
        if (data >= curDateStart && data <= curDateEnd) {
            day = "сегодня";
        }
        
        return {
            day,
            date
        };
    }
    // end getDate

    //------------------------------------------------------------------ 

    //start getTemp
    //Получаем осадки  в зависимости от дождь или снег     
    const getWeather = (rain, snow) => {
        let weather = '';
        //преобразовывеам лог. переменные в числа и складываем как сторки и преобразуем из 2 в 10 систему счислений
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
        //возвращаем опискание погоды
        return weather;
    
    }
    //---end getTemp

    //------------------------------------------------------------------

    //start getTemp
    //Получаем температуру днем или ночью  
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
        //возвращаем путь к картинке
        return pathToImg;       
    }
    //---end getTemp

    //дестуктурируем полученнный объект
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

    //получяаем день неденли и день месяц в отдельные переменные
    const {
        day,
        date
    } = getDate(data);

    const weather = getWeather(rain, snow);
    //создаем новый объект и записываем в него свойства и значения
    const updateItem = {
        day,
        date,
        cloudiness : getImgWeather(cloudiness),
        dayTemp : getTemp('dayTemp', dayTemp),
        nightTemp: getTemp('nightTemp',nightTemp),           
        weather
    }
    //возвращаем объект
    return updateItem;
}
//---end transformDate

//------------------------------------------------------------------ 

//start createBlock
//создаем блок с погодой на странице  
const createBlock = (weatherItem) => {
    const blocks = document.querySelector('.blocks'),
        sliderBlock =  document.createElement('div');
    sliderBlock.classList.add('slider-block');
    
    console.log(blocks);
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
        sliderBlock.appendChild(childDiv);
    }
    blocks.appendChild(sliderBlock);
}

  const creatMainBlock = () => {
  const section=document.createElement('section'),
    sectionHeader = document.createElement('div'),
    sectionWrapper = document.createElement('div'),
    prevArrow = document.createElement('button'),
    nextArrow = document.createElement('button'),
    blocks = document.createElement('div');

   sectionHeader.classList.add('section-header');
   sectionWrapper.classList.add('slider-wrapper');
   prevArrow.classList.add('prev', 'arrow');
   blocks.classList.add('blocks');
   nextArrow.classList.add('next', 'arrow');
   sectionHeader.innerHTML='<h2>Прогноз погоды</h2>'; 
   section.appendChild(sectionHeader);
   section.appendChild(sectionWrapper);
   sectionWrapper.appendChild(prevArrow);
   sectionWrapper.appendChild(blocks);
   sectionWrapper.appendChild(nextArrow);
   document.body.appendChild(section);

   document.querySelector('.slider-wrapper').addEventListener('click', function(e) {
    let first,
          last,
          parent;
     parent = document.querySelector('.blocks');
     first = parent.querySelector('.slider-block');
     last = parent.querySelector('.slider-block:last-child');
     if (e.target.classList.contains('prev')) {
       parent.appendChild(first);
     }
     if (e.target.classList.contains('next')) {
       parent.insertBefore(last, first);
     }
   })
 }

 creatMainBlock();
 //преобразуем каждый переданный объект и отображаем его на странице 
 const newDate = enrtyData.map(transformData).forEach(createBlock);
