import { showNotification, _showNotification, closeNotification } from "./notif.js";

const app = document.getElementById("app")

// items:
let currentItem = null;
let kulometer = 40;

class Item {
  constructor(picture, points, message) {
    this.picture = picture;
    this.points = points;
    this.message = message;
  }

  useItem() {
    
  }
}

class RedBull extends Item {
  constructor() {
    super("./Pictures/redbull.png", 10, "Fueling your car with Redbull gives it wings, wrom wrom +10 streetcreds!")
  }

  useItem() {

  }
}

class Diesel extends Item {
  constructor() {
    super("./Pictures/disel.png", -10, "Diesel is bad for the climate, the streets is displeased -10 streetcreds")
  }

  useItem() {

  }
}
/*
const item = new Item("hi")
console.log(item)
console.log(item.changePicture("test"))
*/

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

const spoiler = new Item("./Pictures/spoiler.png", -10, "The spoiler looks wack -10 streetcreds"), 
helloKittySticker = new Item("./Pictures/kitty.png", 10, "Sheeeesh, the hello kitty sticker looks fire, +10 streetcreds"),
redbull = new RedBull(),
diesel = new Diesel()

const items = [
  spoiler,
  helloKittySticker,
  redbull,
  diesel
]


class Character {
  constructor(name, comment, img, data) {
    this.name = name;
    this.comment = comment;
    this.img = img;
    this.data = data;
  }
}

const npcs = [

   new Character("Doktor Knokkel","Hey Scelly! Hvordan er ryggen?!","./Pictures/drskeleton.png",{
    wrong: "Aah... søren..", // -10p
    correct: "Hmm, alright, ser deg senere!", // 0p
    verygood: "Aah.. Jeg setter opp en time!" // +10p
  }),

  new Character("Bob the Pototo Seller","God Dag Scelly! Hakke sett deg på marked på en stund!","./Pictures/potetmann.jpeg",{
    wrong: "HÆ?! Dust...",
    correct: "Aha, jaja.. Du får jobbe videre",
    verygood: "Kult! Vi kan dele bod! Ser deg der!"
  }),
  
  new Character("Mujaffa", "hva sjer snuppa?", "./Pictures/mojafa.png", {
    wrong: "lite fet azz",
    correct: "fet",
    verygood: "megafet maaaaan!"
  })
]

function renderKulobar(){

  return /*HTML*/`<div style="width: 100%; height: 10%; background: black;">
    <div style="width: ${kulometer}%; height: 100%; background: green;"></div>
  </div>`
}

let roadContainer;
let roadEl;
let roadTop;
let roadBottom;

const IMGS = [
  "./Pictures/Road.png",
  "./Pictures/Road-Warning.png",
  "./Pictures/Road-Regular.png"
]

const road = {
  speed: 100,
  offset: 0,
  timeOrigin: null,
  newImg: false,
  yPosition: 0,
  _topImg: 0,
  _bottomImg: 0,
  get topImg() {
    return IMGS[this._topImg]
  },
  get bottomImg() {
    return IMGS[this._bottomImg]
  }
}

function getRoadPos(timeDiff) {
  return road.offset + Math.floor(timeDiff * road.speed / 1000);
}

function saveRoadState() {
  const time = performance.now();
  const timeDiff = road.timeOrigin ? time - road.timeOrigin : 0;
  offset = getRoadPos(timeDiff);
  road.timeOrigin = time;
}

function updateVehicleSpeed(newSpeed) {
  saveRoadState();
  road.speed = newSpeed;
}

function renderRoad(time) {
  try {
    if (!roadContainer) return;
    if (road.timeOrigin === null) road.timeOrigin = time;
    if (road.speed === 0) return;

    const { height: maxHeight } = roadContainer.getBoundingClientRect();

    const timeDiff = time - road.timeOrigin;
    let newPos = getRoadPos(timeDiff);

    if (newPos >= maxHeight) {
      road.timeOrigin = time;
      newPos = 0;
      road.offset = 0;

      if (road.newImg) {
        road._bottomImg = road._topImg;
        roadBottom.style.backgroundImage = `url(${road.bottomImg})`;
        road.newImg = false;
      } else {
        const random = Math.floor(Math.random() * 10);

        if (random < 2) {
          road.newImg = true;
          road._topImg++;

          if (road._topImg >= IMGS.length) {
            road._topImg = 0;
          }

          roadTop.style.backgroundImage = `url(${road.topImg})`;
        }
      }
    }
    
    road.yPosition = newPos - maxHeight;
    roadEl.style.transform = `translateY(${road.yPosition}px)`
  } finally {
    requestAnimationFrame(renderRoad)
  }
}

requestAnimationFrame(renderRoad)

function renderView(){
  app.innerHTML = /*HTML*/`${renderKulobar()}
  <div class="gameContainer">
    <div id="roadContainer">
      ${getItemDiv()}
      <img src="./Pictures/bmw.png" style="position: absolute; z-index: 2; top: 50%; left: 75%; transform: translateX(-50%) translateY(-50%);" />
      <div id="road" style="translateY(${road.yPosition}px)">
        <div id="roadTop" style="background-image: url(${road.topImg});"></div>
        <div id="roadBottom" style="background-image: url(${road.bottomImg});"></div>
      </div>
    </div>
  </div>
  `

  roadContainer = document.getElementById("roadContainer");
  roadEl = document.getElementById("road");
  roadTop = document.getElementById("roadTop");
  roadBottom = document.getElementById("roadBottom");
  
  let itemImg = document.querySelector(".itemPicture");

  if (itemImg) {
    itemImg.addEventListener("click", imgListener)
  }
}

function imgListener() {
  showNotification("You picked up the Item", currentItem.message);

    updateKulometer(currentItem.points);
    currentItem = null;
    renderView();
}



function getAnswer(){

}
function getItemDiv(){
  if (!currentItem) return "";
  return /*HTML*/`<img class="itemPicture"  src="${currentItem.picture}" alt="" style="position: absolute; z-index: 2; top: 50%; left: 25%; transform: translateX(-50%) translateY(-50%);">`;

}



function getCurrentItem(){
  let randomItemIndex = Math.floor(Math.random()* items.length)
  currentItem = items[randomItemIndex]
  renderView();
}

function updateKulometer(points){
  const newKulometer = Math.max(
    Math.min(
      kulometer + points,
      100
    ),
    0
  )
  
  kulometer = newKulometer;
}
getCurrentItem();
setInterval(getCurrentItem, 7000);
renderView();
/*new Character("Mujaffa", "hva sjer snuppa?", "./Pictures/mojafa.png", {
    wrong: "lite fet azz",
    correct: "fet",
    verygood: "megafet maaaaan!"
  })*/

showNotification(
  "Mujaffa",
  "hva sjer snuppa?",
  [
    {
      text: "lite fet azz",
      listener: () => {
        _showNotification("Mujaffa", "You lose 10 creds.")
        updateKulometer(-10)
        renderView()
      }
    },
    {
      text: "fet",
      listener: () => {
        _showNotification("Mujaffa", "You get 5 creds.")
        updateKulometer(5)
        renderView()
      }
    },
    {
      text: "megafet maaaaan!",
      listener: () => {
        _showNotification("Mujaffa", "You get 10 creds.")
        updateKulometer(10)
        renderView()
      }
    }
  ]
)
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


