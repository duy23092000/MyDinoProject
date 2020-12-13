let dinoArray = [];
let myDino = [];
let humanObject = {};
let dinoFact = [];
let arrayOfFact = [];

// Create Dino Constructor
function DinoContructor(species, weight, height, diet, where, when, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = dinoFact.push(fact);
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
    return myDino;
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
  let heightFact = []
  for (dino of myDino) {
    let heightGap = parseFloat(dino.height) - parseFloat(humanObject.height);
    heightFact.push(`The height gap between this dino and the human is ${heightGap} feet`)
  }
  return heightFact;
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareWeight() {
  let weightFact = []
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
    if (dino.diet === humanObject.diet.toLowerCase()) {
      dietFact.push(`This dino and the human are in the same ${dino.diet} diet`)
    } else {
      dietFact.push(`No. They are not in the same diet!`)
    }
  }
  return dietFact;
}

function randomFact (fact) {
  let keys = Object.keys(fact);
  return fact[keys[ keys.length * Math.random() << 0]];
};

function getFact() {
  for (let i = 0; i < 8; i++) {
    let factObject = {};
    factObject.fact1 = compareHeight()[i]
    factObject.fact2 = compareWeight()[i]
    factObject.fact3 = compareDiet()[i]
    factObject.fact4 = dinoFact[i]
    arrayOfFact.push(factObject);
  }
}


// Generate Tiles for each Dino in Array
function generateTile(dino, factObject) {
  let grid = document.createElement('div')
  grid.className = 'grid-item';
  let avatar = document.createElement('img')
  avatar.src = "images/" + dino?.species.toLowerCase() + ".png";
  let name = document.createElement('h3')
  name.innerHTML = dino?.species
  let fact = document.createElement('p')
  fact.innerHTML = randomFact(factObject);
  grid.appendChild(avatar)
  grid.appendChild(name)
  grid.appendChild(fact)
  return grid;
}

// Add tiles to DOM
function renderToDOM() {
  getFact();
  const mainGrid = document.getElementById('grid')
  for (let i = j = 0; i < 8; i ++) {
    
  }
  let heightCompare = compareHeight();
  let weightCompare = compareWeight();
  let dietCompare = compareDiet();
  console.log(heightCompare);
  console.log(weightCompare);
  console.log(dietCompare);
  console.log(dinoFact);
  console.log(arrayOfFact);
}

// Remove form from screen
function removeForm() {
  const form = document.getElementById('dino-compare')
  form.remove();
}

// On button click, prepare and display infographic
function createButton() {
  const button = document.getElementById('btn');
  button.addEventListener('click', () => {
    createHumanObject(),
    removeForm(),
    renderToDOM()
  })
}
getDinoData(),
createButton();
