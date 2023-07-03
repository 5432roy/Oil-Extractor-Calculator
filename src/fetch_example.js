fetch('https://poe.ninja/api/data/itemoverview?league=Sanctum&type=Oil')
  .then(response => response.json())
  .then(data => {
    // process the data here
    console.log(data);
  })
  .catch(error => console.error(error));
