
// Fetching the data for the oils price
// ** blocked by CORS policy **
fetch('https://poe.ninja/api/data/itemoverview?league=Crucible&type=Oil')
  .then(response => response.json())
  .then(data => {
    // process the data here
    console.log(data);
  })
  .catch(error => console.error(error));

// Get all slider inputs and slider value elements
const sliders = document.querySelectorAll('.slider');
const sliderValues = document.querySelectorAll('.slider-value');

// Add event listeners to all sliders
sliders.forEach((slider, index) => {
  sliderValues[index].textContent = slider.id;
  slider.addEventListener('input', () => {
    // Update the slider value element with the current slider value
    sliderValues[index].textContent = slider.value;
  });
});
