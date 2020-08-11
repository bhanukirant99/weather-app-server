console.log('js is loaded');

const weatherForm = document.querySelector('form');
const inputLocation = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchLocation = inputLocation.value;
    fetch('http://localhost:3000/weather?address=' + searchLocation).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error);
            } else {
                console.log(data.location);
                console.log(data.forecast);
            }
        });
    });
});