const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = document.querySelector('.input__cities-from '),
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
    inputCitiesTo = document.querySelector('.input__cities-to'),
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
    inputDateDepart = document.querySelector('.input__date-depart');


const citiesApi = 'http://api.travelpayouts.com/data/ru/cities.json';
const proxy = 'https://cors-anywhere.herokuapp.com/';
const API_KEY = 'e6f866b9e7a46bbbbd9699349df5d4d0';
const calendar = ' http://min-prices.aviasales.ru/calendar_preload';



let city = [];


const getData = (url, callback) => {
    const request = new XMLHttpRequest();

    request.open('GET', url);

    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;

        if (request.status === 200) {
            callback(request.response);
        } else (
            console.error(request.status)
        )
    })

    request.send();
};



const showCity = (input, list) => {
    list.textContent = '';

    if (input.value !== '') {

        const filterCity = city.filter((item) => {

            if (item.name) {
                const fixItem = item.name.toLowerCase();
                return fixItem.includes(input.value.toLowerCase())
            }
        });

        filterCity.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = item.name;
            list.append(li)
        });
    }
};

const cityList = (event, input, list) => {
    const target = event.target;

    if (target.tagName.toLowerCase() === 'li') {
        input.value = target.textContent;
        list.textContent = ''; 
    }
};

const renderCheapDay = (cheapTicket) => {
    console.log(cheapTicket)
};

const renderCheapYear = (cheapTickets) => {
    
    console.log(cheapTickets)
};

const renderCheap = (data, date) => {
    const cheapTicketYear = JSON.parse(data).best_prices;
    const cheapTicketDay = cheapTicketYear.filter((item) => {
        return item.depart_date === date;
    })


    renderCheapYear(cheapTicketYear);
    renderCheapDay(cheapTicketDay);

};

inputCitiesFrom.addEventListener('input', () => {
    showCity(inputCitiesFrom, dropdownCitiesFrom)
});
dropdownCitiesFrom.addEventListener('click', (event) => {
    cityList(event, inputCitiesFrom, dropdownCitiesFrom)
});

inputCitiesTo.addEventListener('input', () => {
    showCity(inputCitiesTo, dropdownCitiesTo)
});
dropdownCitiesTo.addEventListener('click', (event) => {
    cityList(event, inputCitiesTo, dropdownCitiesTo)
});

getData(proxy + citiesApi, (data) => {
    city = JSON.parse(data).filter(item => item.name)
})

formSearch.addEventListener('submit', (event) => {
    event.preventDefault()

    const cityFrom = city.find((item) => {
        return inputCitiesFrom.value === item.name
    });
    const cityTo = city.find((item) => {
        return inputCitiesTo.value === item.name
    });

    const formData = {
        form: cityFrom.code,
        to: cityTo.code,
        when: inputDateDepart.value,

    }

    const requestData = '?depart_date=' + formData.when + 
      '&origin=' + formData.form +
      '&destination=' + formData.to +
      '&one_way=true&token=';

    getData(calendar + requestData, (response) => {
        renderCheap(response, formData.when);
    });
})


// getData(proxy + calendar + '?depart_date=2020.05.25&origin=SVX&destination=KGD&one_way=true&tocken=' + API_KEY, (data) => {
//     const cheapTicket = JSON.parse(data).best_prices.filter(item => item.depart_date === '2020.05.29')
//     console.log(cheapTicket);
// })



