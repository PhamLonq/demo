var dragging = false;
var days = document.querySelectorAll('.day');
var offset = 0;
let monthEle = document.querySelector('.month');
let yearEle = document.querySelector('.year');
let btnNext = document.querySelector('.btn-next');
let btnPrev = document.querySelector('.btn-prev');
let datzeEle = document.querySelector('.date-container');
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function displayInfo() {
    // Hiển thị tên tháng
    let currentMonthName = new Date(
        currentYear,
        currentMonth
    ).toLocaleString('en-us', { month: 'long' })
        
    monthEle.innerText = currentMonthName;
    
    // Hiển thị năm
    yearEle.innerText = currentYear;
}

function getDaysInMonth() {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
}

let dateEle = document.querySelector('.date-container');
// Hiển thị ngày trong tháng lên trên giao diện
function renderDate() {
    let daysInMonth = getDaysInMonth();

    dateEle.innerHTML = '';

    for (let i = 0; i < daysInMonth; i++) {
        dateEle.innerHTML += `
            <div class="day">${i + 1}</div>
        `;
    }
}
// Lấy số ngày của 1 tháng
function getDaysInMonth() {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
}

// Lấy ngày bắt đầu của tháng
function getStartDayInMonth() {
    return new Date(currentYear, currentMonth, 1).getDay();
}

// Active current day
function activeCurrentDay(day) {
    let day1 = new Date().toDateString();
    let day2 = new Date(currentYear, currentMonth, day).toDateString();
    return day1 == day2 ? 'active' : '';
}

// Hiển thị ngày trong tháng lên trên giao diện
function renderDate() {
    let daysInMonth = getDaysInMonth();
    let startDay = getStartDayInMonth();

    dateEle.innerHTML = '';

    for (let i = 0; i < startDay; i++) {
        dateEle.innerHTML += `
            <div class="day"></div>
        `;
    }

    for (let i = 0; i < daysInMonth; i++) {
        dateEle.innerHTML += `
        <div class="day ${activeCurrentDay(i + 1)}">${i + 1}</div>
        `;
    }
}

// Xử lý khi ấn vào nút next month
btnNext.addEventListener('click', function () {
    if (currentMonth == 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    displayInfo();
});

// Xử lý khi ấn vào nút previous month
btnPrev.addEventListener('click', function () {
    if (currentMonth == 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    displayInfo();
});

window.onload = displayInfo;

function activateDay() {
  var activeElement = document.activeElement;
  var activeAItem = document.querySelector('.active-a');
  var activeBItem = document.querySelector('.active-b');
  
  if (activeAItem && activeBItem) {
    clearActiveDays();
    clearRange();
    activeElement.classList.add('active-a');
    return;
  }
  
  if (activeAItem) activeElement.classList.add('active-b');
  else activeElement.classList.add('active-a');
}


// Xử lý khi ấn vào nút next month
btnNext.addEventListener('click', function () {
    if (currentMonth == 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    displayInfo();
});

// Xử lý khi ấn vào nút previous month
btnPrev.addEventListener('click', function () {
    if (currentMonth == 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    displayInfo();
});

function clearActiveDays() {
  var activeAItem = document.querySelector('.active-a');
  var activeBItem = document.querySelector('.active-b');
  
  if (activeAItem) activeAItem.classList.remove('active-a');
  if (activeBItem) activeBItem.classList.remove('active-b');
}

function clearRange() {
  days.forEach(item => {
    item.classList.remove('range');
  });
}

function calculateRange() {
  var activeAIndex, activeBIndex;

  days.forEach((item, index) => {
    if (item.classList.contains('active-a')) activeAIndex = index;
    if (item.classList.contains('active-b')) activeBIndex = index;
  });

  if (activeAIndex < activeBIndex) {
    for (var i = activeAIndex; i <= activeBIndex; i++) {
      days[i].classList.add('range');
    }
  }

  if (activeAIndex > activeBIndex) {
    for (var i = activeAIndex; i >= activeBIndex; i--) {
      days[i].classList.add('range');
    }
  }
}

function startMove(item) {
  dragging = true;
  
  var activeAItem = document.querySelector('.active-a');
  var activeBItem = document.querySelector('.active-b');
  
  if (!activeBItem && activeAItem) {
    item.classList.add('active-b');
    calculateRange();
  } else {
    clearActiveDays();
    clearRange();
    item.classList.add('active-a');
  }
}

function move(item) {
  if (dragging) {
    var activeA = document.querySelector('.active-a');
    var prevActiveB = document.querySelector('.active-b');

    clearRange();

    if (prevActiveB) prevActiveB.classList.remove('active-b');
    if (!item.classList.contains('active-a')) item.classList.add('active-b');

    var activeB = document.querySelector('.active-b');

    calculateRange();
  }
}

function endMove(item) {
  dragging = false;
}

window.addEventListener('mouseup', e => {
  dragging = false;
});

days.forEach((item, index) => {
  var dayNumber = item.querySelector('.day-number').innerHTML;
  
  if (dayNumber === '1' && !item.classList.contains('next-mon')) {
    offset = index;
  }
  
  item.addEventListener('mousedown', e => {
    startMove(item);
  });
  
  item.addEventListener('mousemove', e => {
    move(item);
  });
  
  item.addEventListener('mouseup', e => {
    endMove(item);
  });
});

window.addEventListener('keyup', e => {
  var key = e.keyCode;
  
  switch (key) {
    case 13:
      activateDay();
      calculateRange();
      break;
  }
});

document.querySelector('.reset').addEventListener('click', e => {
  clearActiveDays();
  clearRange();
});



