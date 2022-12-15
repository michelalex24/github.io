const addButton = document.querySelector('.add-button');
const removeButton = document.querySelector('.remove-button');
const date = document.querySelector('#date');
const lastname = document.querySelector('#lastname');
const tbody = document.querySelector('tbody');
const holiday = document.querySelector('.holiday');
const showOne = document.querySelector('#show-1');
const showTwo = document.querySelector('#show-2');
const p = document.querySelectorAll('.p');
removeButton.addEventListener('click', () => {
  p.forEach(el=>{
    el.style.display='none';
  });
  while (tbody.lastChild) {
    tbody.removeChild(tbody.lastChild);
  }
  while (holiday.lastChild) {
    holiday.removeChild(holiday.lastChild);
  }
  tbody.innerHTML = '<tr><td class="lastname">&nbsp</td><td>&nbsp</td></tr>';
  document.querySelector('.weekend').style.display = 'none';
  localStorage.clear();
  if (document.querySelector('.month').contains(document.querySelector('.add'))) {
    document.querySelector('.month').removeChild(document.querySelector('.add'));
  }
  if (document.querySelector('.quarter').contains(document.querySelector('.add'))) {
    document.querySelector('.quarter').removeChild(document.querySelector('.add'));
  }
});
let i = 0;
addButton.addEventListener('click', () => {
  if (lastname.value != '' && date.value !== '') {
    i = +localStorage.getItem('count');
    if (+document.querySelector('.lastname').textContent === 0) {
      tbody.innerHTML = '';
    }
    document.querySelector('form').classList.remove('form_required');
    const obj = {
      toString() {
        return `<tr><td class="lastname">${lastname.value}</td><td class="date">${date.value}</td></tr>`;
      }
    };
    localStorage.setItem(`${i}`, obj);
    console.log(localStorage.getItem(`${i}`));
    tbody.innerHTML += localStorage.getItem(`${i}`);
    lastname.value = '';
    date.value = '';
    i++;
    localStorage.setItem('count', i);
  }
  else {
    document.querySelector('form').classList.add('form_required');
  }
});
if (localStorage.getItem('0') !== null) {
  console.log(localStorage.getItem('count'));
  tbody.innerHTML = '';
  for (let i = 0; i < localStorage.getItem('count'); i++) {
    tbody.innerHTML += localStorage.getItem(`${i}`);
  }
}
document.querySelector('#count').addEventListener('click', () => {
  p.forEach(el=>{
    el.style.display='inherit';
  });
  const date = document.querySelectorAll('.date');
  const lastname = document.querySelectorAll('.lastname');
  let arr = [];
  if (date.length > 0) {
    document.querySelector('.weekend').style.display = 'table';
    date.forEach(el => {
      let d = new Date(el.textContent);
      arr.push(d);
    });
  } else {
    document.querySelector('form').classList.add('form_required');
  }

  
  for (let i = 0; i < arr.length; i++) {
    //Методами объекта Date можно получать и устанавливать отдельно значения
//месяца, дня недели, часов, минут и др.
//-Метод getDate возвращает число в диапазоне от 1 до 31, представляющее
//число месяца.
//-Метод getHours возвращает час суток. Значение возвращается в 24-часовом
//формате от 0 (полночь) до 23.
//-Метод setYear устанавливает значение года для объекта Date.
//-Метод setDate устанавливает день месяца. Параметр должен быть числом в
//диапазоне от 1 до 31.
//-Метод setMonth устанавливает значение месяца. Параметр должен быть
//числом в диапазоне от 0 (январь) до 11 (декабрь).
//-Метод setHours устанавливает час для текущего времени, использует целое
//число от 0 (полночь) до 23 для установки даты по 24-часовой шкале.
//-Метод setMinuts устанавливает минуты для текущего времени, использует
//целое число от 0 до 59.
//-Метод setSeconds устанавливает секунды для текущего времени, использует
//целое число от 0 до 59.
//-Метод setTime устанавливает значение объекта Date и возвращает
//количество миллисекунд, прошедших с 1 января 1970 года. 
    let start = arr[i];
    start.setMonth(arr[i].getMonth() + 11);
    let end = new Date(arr[i]);
    end.setDate(end.getDate() + 24);
    holiday.innerHTML += `<tr>
    <td class="lastname-holiday">${lastname[i].textContent}</td>
    <td class="start-date">${start.getFullYear()}-${start.getMonth() + 1 < 10 ? '0' + (start.getMonth() + 1) : start.getMonth() + 1}-${start.getDate() < 10 ? '0' + start.getDate() : start.getDate()}</td>
    <td class="end-date">${end.getFullYear()}-${end.getMonth() + 1 < 10 ? '0' + (end.getMonth() + 1) : end.getMonth() + 1}-${end.getDate() < 10 ? '0' + end.getDate() : end.getDate()}</td></tr>`;
  }
});
const listmonth = document.querySelector('.listmonth');
document.querySelector('.show').addEventListener('click', show);
function show() {
  const p = document.createElement('p');
  p.className = 'add';
  if (document.querySelector('.month').contains(document.querySelector('.add'))) {
    document.querySelector('.month').removeChild(document.querySelector('.add'));
  }
  const lastnameHoliday = document.querySelectorAll('.lastname-holiday');
  const startDate = document.querySelectorAll('.start-date');
  const selectedIndex = listmonth.selectedIndex;
  let array = [];
  startDate.forEach((el, i) => {
    let d = new Date(el.textContent);
    if (selectedIndex === d.getMonth()) {
      array.push(lastnameHoliday[i].textContent);
    }
  });
  if (array.length === 0) {
    p.innerHTML = 'В этом месяце никому из сотрудников отпуск не предоставляется';
  } else {
    p.innerHTML = array;
  }
  document.querySelector('.month').append(p);
}

const listquarter = document.querySelector('.listquarter');
showOne.addEventListener('click', oneShow);
function oneShow() {
  const p = document.createElement('p');
  p.className = 'add';
  if (document.querySelector('.quarter').contains(document.querySelector('.add'))) {
    document.querySelector('.quarter').removeChild(document.querySelector('.add'));
  }
  const lastnameHoliday = document.querySelectorAll('.lastname-holiday');
  const endDate = document.querySelectorAll('.end-date');
  const selectedIndex = listquarter.selectedIndex;
  let array = [];
  endDate.forEach((el, i) => {
    let d = new Date(el.textContent);
    console.log(d.getMonth());
    if (d.getMonth() < 3 && selectedIndex === 0) {
      array.push(lastnameHoliday[i].textContent);
    } else if (d.getMonth() > 2 && d.getMonth() < 6 && selectedIndex === 1) {
      array.push(lastnameHoliday[i].textContent);
    } else if (d.getMonth() > 5 && d.getMonth() < 9 && selectedIndex === 2) {
      array.push(lastnameHoliday[i].textContent);
    } else if(d.getMonth() > 8 && selectedIndex === 3){
      array.push(lastnameHoliday[i].textContent);
    }
  });
  if (array.length === 0) {
    p.innerHTML = 'В этом квартале никому из сотрудников отпуск не предоставляется';
  } else {
    p.innerHTML = array;
  }
  document.querySelector('.quarter').append(p);
}

showTwo.addEventListener('click', twoShow);
function twoShow() {
  const p = document.createElement('p');
  p.className = 'add';
  if (document.querySelector('.year').contains(document.querySelector('.add'))) {
    document.querySelector('.year').removeChild(document.querySelector('.add'));
  }
  const lastnameHoliday = document.querySelectorAll('.lastname-holiday');
  const startDate = document.querySelectorAll('.start-date');
  let array = [];
  startDate.forEach((el, i) => {
    let d = new Date(el.textContent);
    let date = new Date();
    if(d.getFullYear()===date.getFullYear()+1){
      array.push(lastnameHoliday[i].textContent);
    }
  });
  if (array.length === 0) {
    p.innerHTML = 'В следующем году никому из сотрудников отпуск не предоставляется';
  } else {
    p.innerHTML = array;
  }
  document.querySelector('.year').append(p);
}
