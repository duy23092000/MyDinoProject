let dinoArray = [];
let myDino = [];
let humanObject = {};

// Create Dino Constructor
function DinoContructor(species, weight, height, diet, where, when, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
}

// Create Dino Objects
function getDinoData() {
  fetch("./dino.json")
    .then((response) => {
      return response.json();
    })
    .then((data) =>
      data.Dinos.map((dino) => {
        dinoArray.push(dino);
      })
    )
    .finally(() => {
      dinoArray.map((dino) => {
        myDino.push(
          new DinoContructor(
            dino.species,
            dino.weight,
            dino.height,
            dino.diet,
            dino.where,
            dino.when,
            dino.fact
          )
        );
      });
    });
}


// 
// Create Human Object
function Human(name, feet, inches, weight, diet) {
  this.name = name;
  this.feet = feet;
  this.inches = inches;
  this.height = inches / 12 + feet;
  this.weight = weight;
  this.diet = diet;
}

function createHumanObject() {
  humanObject = new Human(
    document.getElementById('name').value,
    document.getElementById('feet').value,
    document.getElementById('inches').value,
    document.getElementById('weight').value,
    document.getElementById('diet').value,
  )
  return humanObject;
}


// Use IIFE to get human data from form


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareHeight() {
  let heightFact = [];
  for (dino of myDino) {
    let heightGap = parseFloat(dino.height) - parseFloat(humanObject.height);
    heightFact.push(`The height gap between this dino and the human is ${heightGap} feet`)
  }
  return heightFact;
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareWeight() {
  let weightFact = [];
  for (dino of myDino) {
    let weightGap = parseFloat(dino.weight) - parseFloat(humanObject.weight);
    weightFact.push(`Comparing by weight, the weight gap is ${weightGap} lbs`)
  }
  return weightFact;
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareDiet() {
  let dietFact = [];
  for (dino of myDino) {
    console.log(humanObject.diet);
    if (dino.diet === humanObject.diet.toLowerCase()) {
      dietFact.push(`This dino and the human are in the same ${dino.diet} diet`)
    } else {
      dietFact.push(`No. They are not in the same diet!`)
    }
  }
  // console.log(dietFact);
  return dietFact;
}

// Generate Tiles for each Dino in Array
function generateTile() {
  let grid = document.createElement('grid')
  grid.className = 'grid-item';
  let avatar = document.createElement('img')
  let name = document.createElement('h3')
  let fact = document.createElement('p')
}

// Add tiles to DOM
function renderToDOM() {
  let dietCompare = compareDiet();
  let heightCompare = compareHeight();
  let weightCompare = compareWeight();
  console.log(dietCompare);
  console.log(heightCompare);
  console.log(weightCompare);
  console.log(myDino);
}

// Remove form from screen

// On button click, prepare and display infographic
function createButton() {
  const button = document.getElementById('btn');
  button.addEventListener('click', () => {
    getDinoData(),
    createHumanObject(),
    renderToDOM()
  })
}
createButton();
