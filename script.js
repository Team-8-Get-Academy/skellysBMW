const app = document.getElementById("app")

// items:

class Item {
  constructor(picture, points) {
    this.picture = picture;
    this.points = points;
  }

  useItem() {
    
  }
}

class RedBull extends Item {
  constructor() {
    super("Pictures/redbull.png", 10)
  }

  useItem() {

  }
}

class Diesel extends Item {
  constructor() {
    super("Pictures/disel.png", -10)
  }

  useItem() {

  }
}

const item = new Item("hi")
console.log(item)
console.log(item.changePicture("test"))

// document (class object) / HTMLDocument (class)
// getElementById (class method)
// document.getElementById

/*
const object = {a:"b"}

const objectRaw = {a:"b"} // 0x10
const object = &objectRaw // Pointer to 0x10
const x = object // Pointer to 0x10

const newObject = {a:"b"} // Pointer to 0x20
newObject === object 
0x20 === 0x10
*/

const spoiler = new Item("Pictures/spoiler.png", -10), 
helloKittySticker = new Item("Pictures/kitty.png", 10),
redbull = new RedBull(),
diesel = new Diesel()

const items = [
  spoiler,
  helloKittySticker,
  wunderBaum,
  redbull,
  diesel
]

function getCool() {
  return `<div>0%</div>`;
}

function renderView(){
  app.innerHTML = /*HTML*/`${getCool()}`
}

function getItem(){

}

class Character {
  constructor(name, comment, img, data) {
    this.name = name;
    this.comment = comment;
    this.img = img;
    this.data = data;
  }
}

const npcs = [
  new Character("Bob the Pototo Seller", {
    
  }),
  new Character("Mujaffa", "hva sjer snuppa?", "placeholder", {
    wrong: "lite kult azz",
    correct: "kult",
    verygood: "megakult maaan.."
  })
]
/* Character pops up:
notification pops up:
Title - character.name
Content - character.comment

Buttons:
character.wrong (point down 10)
character.correct (point up 5)
character.verygood (point up 10)
*/


/* const obj = {
  mujaffaMøtekommentar: {
    text: "hva sjer snuppa?"
  },
  mujaffaImg: "placeholder",
  mujaffaFeilSvar: "lite kult azz",
  mujaffaOkSvar: "kult",
  mujaffaDritbraSvar: "megakult maaan.."
}


const mujaffaMøtekommentar = "hva sjer snuppa?"
const mujaffaImg = "placeholder"
const mujaffaFeilSvar = "lite kult azz"
const mujaffaOkSvar = "kult"
const mujaffaDritbraSvar = "megakult maaan.." */


