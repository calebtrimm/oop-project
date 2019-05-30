//Create the Entity, Wall, Grass, Gold, Dungeon and Tradesman class

/*
Entity class definition
- constructor
  - parameters: src (string)
  - Creates an img element and sets the src.
  - Sets the element property to the created img element.
- element (HTMLElement): HTML element for the entity (img element)
- setImg (function)
  - parameters: src (string)
  - Updates the src of the element property
Example use: not used by itself. 
*/
class Entity {
  constructor(src) {
    this.element = document.createElement('img');
    this.element.src = src;
  }
  setImg(src) {
    this.element.src = src;
  }
}
/*
Wall class definition. A Wall is an Entity
- constructor
  - parameters: none
  - Creates a wall entity with the 'wall' img
Example use:
new Wall()
*/
class Wall extends Entity {
  constructor() {
    super('imgs/environment/wall.png');
  }
}
/*
Grass class definition. Grass is an Entity
- constructor
  - parameters: none
  - Creates a grass entity with a random grass image
Example use:
new Grass()
*/
class Grass extends Entity {
  constructor() {
    super(
      'imgs/environment/grass' + `${Math.floor(Math.random() * 3) + 1}` + '.png'
    );
  }
}
/*
Gold class definition. Gold is an Entity
- constructor
  - parameters: value (number)
  - Creates a gold entity with the 'gold' image and sets the gold value
- value (number): gold value
Example use:
new Gold()
*/
class Gold extends Entity {
  constructor(value) {
    super('imgs/gold.gif');
    this.value = value;
  }
}
/*
Dungeon class definition. Gold is an Entity
- constructor
  - parameters: isOpen (boolean), hasPrincess (boolean), gold (number), items (Item[])
  - Creates a dungeon entity with the 'open' or 'closed' image depending on isOpen.
- isOpen (boolean)
- hasPrincess (boolean)
- gold (number)
- items (Item[])
- open (function)
  - parameters: none
  - Sets isOpen to true and sets the entity image to 'open'
Example use:
new Dungeon(true, false, 30, [new Potion(2), new Bomb(2)]);
*/
class Dungeon extends Entity {
  constructor(isOpen, hasPrincess, gold, items) {
    super(isOpen ? 'imgs/dungeon/open.png' : 'imgs/dungeon/closed.png');
    this.isOpen = isOpen;
    this.hasPrincess = hasPrincess;
    this.gold = gold;
    this.items = items;
  }
  open() {
    this.isOpen = true;
    this.src = 'imgs/dungeon/open.png';
  }
}
/*
Tradesman class definition. A Tradesman is an Entity
- constructor
  - parameters: items (Item[])
  - Creates a tradesman with items and the tradesman image
- items (Item[])
Example use:
new Tradesman([new Potion(0), new Bomb(0), new Key()]);
*/
class Tradesman extends Entity {
  constructor(items) {
    super('imgs/tradesman.gif');
    this.items = items;
  }
}
