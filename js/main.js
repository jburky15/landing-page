const todayDate = document.getElementById('today'),
    time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    userName = document.getElementById('name'),
    goal = document.getElementById('goal'),
    searchBtn = document.getElementById('searchBtn'),
    searchInput = document.getElementById('searchBar');

// Time and Date functions
// Pull in the date and time
showTime = () => {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    let fullDate = new Date().toDateString();


    // Set AM or PM
    const amPm = hour >= 12 ? 'PM' : 'AM';

    // 12hr Format
    hour = hour % 12 || 12;

    // Output the time
    todayDate.innerHTML = fullDate;
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${amPm}`;

    // Set it to update every 1 second
    setTimeout(showTime, 1000);
};

addZero = (n) => {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
};

// Set the background and greeting based on the time of day
setBgGreet = () => {
    let today = new Date(),
        hour = today.getHours();

    if(hour < 12) {
        //Morning
        document.body.style.backgroundImage = "url(./images/morning.webp)";
        greeting.textContent = 'Good Morning, ';
        document.body.style.color = 'rgb(0, 183, 255)'
        searchInput.style.color = 'black';

    } else if(hour < 18) {
        //Afternoon
        document.body.style.backgroundImage = "url(./images/afternoon.webp)";
        document.body.style.color = 'white';
        greeting.textContent = 'Good afternoon,';
    } else {
        //Evening
        document.body.style.backgroundImage = "url(./images/evening.webp)";
        greeting.textContent = 'Good evening,';
    }
};

// User name and goal functions
// Get Name
getName = () => {
    if(localStorage.getItem('name') === null){
        userName.textContent = '[Enter Name]';
    } else {
        userName.textContent = localStorage.getItem('name');
    }
};

// Set Name
setName = (e) => {
    if(e.type === 'keydown') {
        if(e.keyCode === 13) {
            localStorage.setItem('name', e.target.innerText);
            userName.blur();
        }
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
};

// Get Goal
getGoal = () => {
    if(localStorage.getItem('goal') === null) {
        goal.textContent = '[Set a Goal]';
    } else {
        goal.textContent = localStorage.getItem('goal');
    }
};

// Set Goal
setGoal = (e) => {
    if(e.type === 'keydown') {
        if(e.keyCode === 13) {
            localStorage.setItem('goal', e.target.innerText);
            goal.blur();
        }
    } else {
        localStorage.setItem('goal', e.target.innerText);
    }
};

// Allow the user to set values by pressing Enter or clicking off the editable selection
userName.addEventListener('blur', setName);
userName.addEventListener('keydown', setName);
goal.addEventListener('blur', setGoal);
goal.addEventListener('keydown', setGoal);

showTime();
setBgGreet();
getName();
getGoal();

// Search bar functions
// Get the user input from the search field and go to google with it
search = () => {
    let text = document.getElementById('searchBar').value;
    let query = text.replace(" ", "+", text);
    let url = 'http://www.google.com/search?q=' + query;

    window.open(url, '_blank');
}

// Clear out the search
clearInput = () => { 
    document.getElementById('searchBar').value = ""; 
}

// Allow the user to press Enter to search
searchBar.onkeydown = keyPress = (e) => {
    if(e.keyCode === 13){
        search();
        clearInput();
    }
};

// Allow the user to Click to search
searchBtn.addEventListener('click', clickSearch = () => {
    search();
    clearInput();
});
