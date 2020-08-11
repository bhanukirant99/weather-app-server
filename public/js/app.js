console.log('js is loaded');

const weatherForm = document.querySelector('form');
const inputLocation = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchLocation = inputLocation.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('http://localhost:3000/weather?address=' + searchLocation).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error);
                messageOne.textContent = data.error;
            } else {
                console.log(data.location);
                console.log(data.forecast);
                messageOne.textContent = 'Location: ' + data.location;
                messageTwo.textContent = 'Forecast: ' + data.forecast;
            }
        });
    });
});