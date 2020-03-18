const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = document.querySelector('.input__cities-from '),
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
    inputCitiesTo = document.querySelector('.input__cities-to'),
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to');

const city = ['Харьков', 'Санкт-Петербург', 'Минск', 'Карaганда', 'Челябинск', 'Керчь', 'Волгоград', 'Самара', 'Днепропетровск', 'Ектеринбург', 'Одесса', 'Ухань', 'Шишкен', 'Нижний новгород', 'Калининград', 'Ворцлав', 'Ростов-на-Дону', 'Москва'];

const showCity = (input, list) => {
    list.textContent = '';

    if (input.value !== '') {

        const filterCity = city.filter((item) => {
            const fixItem = item.toLowerCase();

            return fixItem.includes(input.value.toLowerCase())
        });

        filterCity.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = item;
            list.append(li)
        });
    }
}; 

const cityList = (input, list) => {
    const target = event.target;

    if (target.tagName.toLowerCase() === 'li') {
        input.value = target.textContent;
        list.textContent = '';
    }
}

inputCitiesFrom.addEventListener('input', () => {
    showCity(inputCitiesFrom, dropdownCitiesFrom)
});
dropdownCitiesFrom.addEventListener('click', (event) => {
    cityList(inputCitiesFrom, dropdownCitiesFrom)
});

inputCitiesTo.addEventListener('input', () => {
    showCity(inputCitiesTo, dropdownCitiesTo)
});
dropdownCitiesTo.addEventListener('click', (event) => {
    cityList(inputCitiesTo, dropdownCitiesTo)
});



