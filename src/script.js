/* Was trying to fetch the price dynamically using js, but blocked by CORS policy*/
// fetch('https://poe.ninja/economy/challenge/oils')
//   .then(response => response.text())
//   .then(html => {
//     // Handle the retrieved HTML content
//     console.log(html);
//   })
//   .catch(error => {
//     // Handle any errors that occur during the request
//     console.error(error);
//   });

// holds oils data
let oils = {}

document.addEventListener('DOMContentLoaded', function() {
  // fetch the JSON data
  fetch('../data/price.json')
  .then(response => response.json())
  .then(data => {
    // process it
    for (let i = 0; i < 15; i++) {
      oils[data['lines'][i]['name']] = [data['lines'][i]['chaosValue'], data['lines'][i]['icon']];
    }


    // generate the html for the oils and its corresponding value
    let itemsList = document.getElementById('items-list');

    for (let key of Object.keys(oils)) {
      
      let div = document.createElement('div');
      div.className = 'Oil';
      
      let img = document.createElement('img');
      img.src = oils[key][1]; // replace with your image URL
      div.appendChild(img);
      
      let itemName = document.createTextNode(key);
      div.appendChild(itemName);

      let inputContainer = document.createElement('div');
      inputContainer.className = 'input-container';
      
      let input = document.createElement('input');
      input.type = 'number';
      input.value = oils[key][0];
      input.id = key;
      // add event listener to input box.
      input.addEventListener('blur', function(e) {
        oils[key] = e.target.value;
      });
      inputContainer.appendChild(input);

      let chaosImage = document.createElement('img');
      chaosImage.src = 'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSZXJvbGxSYXJlIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/d119a0d734/CurrencyRerollRare.png';
      inputContainer.appendChild(chaosImage);

      div.appendChild(inputContainer);
      itemsList.appendChild(div);
    }

    fetch('../data/anointment.json')
    .then(response => response.json())
    .then(data => {

      let expected = 50;
      let good_anointment = [];
      let bad_anointment = [];

      for(item in data) {
        let cur = 0;
        for(oil in data[item]['oils']) {
          cur += oils[data[item]['oils'][oil]][0];
        }
        cur /= data[item].length; 
        if(cur > expected) {
          good_anointment.push(data[item]['name']);
        }
        else {
          bad_anointment.push(data[item]['name']);
        }
      }

      console.log(good_anointment);

    })
    .catch(error => {
      // Handle error for second fetch
      console.error('Error:', error);
    });

  })
  .catch(error => {
    // Handle error for the first fetch
    console.error('Error:', error);
  });
});

