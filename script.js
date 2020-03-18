const formSearch = document.querySelector('.form-search'),
    inputCitiesForm = document.querySelector('.input__cities-from '),
    dropdownCitiesForm = document.querySelector('.dropdown__cities-from'),
    inputCitisTo = document.querySelector('.input__cities-to')
    ;

const city = ['Харьков', 'Санкт-Петербург', 'Минск', 'Карaганда', 'Челябинск', 'Керч', 'Волгоград', 'Самара', 'Днепропетровск', 'Ектеринбург', 'Одесса', 'Ухань', 'Шишкен', 'Нижний новгород', 'Калининград', 'Ворцлав', 'Ростов-на-дону', 'Москва'];

inputCitiesForm.addEventListener('input', () => {
    dropdownCitiesForm.textContent = '';

    if (inputCitiesForm.value !== '') {



        const filterCity = city.filter((item) => {
            const fixItem = item.toLowerCase();

            return fixItem.includes(inputCitiesForm.value.toLowerCase())
        });

        filterCity.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = item;
            dropdownCitiesForm.append(li)
        });
    }

});

const get = (name) => {

}