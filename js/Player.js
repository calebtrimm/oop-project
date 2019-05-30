//Create the Player class
class Player extends Creature {
  constructor(name, position, board, level, items, gold) {
    super(name, 'imgs/player/front.png', level, items, gold);
    this.attackSpeed = 2000 / this.level;
    this.exp = 0;
    this.position = position;
    this.board = board;
  }
  render(root) {
    this.root = root;
    this.element.style.position = 'absolute';
    this.element.style.top = this.position.row * ENTITY_SIZE + 'px';
    this.element.style.left = this.position.column * ENTITY_SIZE + 'px';
    this.root.appendChild(this.element);
  }
  update() {
    this.element.style.top = this.position.row * ENTITY_SIZE + 'px';
    this.element.style.left = this.position.column * ENTITY_SIZE + 'px';
    this.root.appendChild(this.element);
  }
  moveToPosition(position) {
    if (!board.rows[position.row][position.column instanceof Wall])
      this.position = position;
    board.setEntity(this.domElement, this.position);
  }
  move(direction) {
    if (direction === 'up') {
      this.position.row--;
      this.element.src = 'imgs/player/back.png';
      this.element.style.top = this.position.row * ENTITY_SIZE + 'px';
    }
    if (direction === 'down') {
      this.position.row++;
      this.element.src = 'imgs/player/front.png';
      this.element.style.top = this.position.row * ENTITY_SIZE + 'px';
    }
    if (direction === 'left') {
      this.position.column--;
      this.element.src = 'imgs/player/left.png';
      this.element.style.left = this.position.column * ENTITY_SIZE + 'px';
    }
    if (direction === 'right') {
      this.position.column++;
      this.element.src = 'imgs/player/right.png';
      this.element.style.left = this.position.column * ENTITY_SIZE + 'px';
    }
  }
  pickup(entity) {
    if (entity instanceof Item) {
      this.items.push(entity);
      sounds.loot.play();
      board.setEntity(new Grass(), this.position);
    }
    if (entity instanceof Gold) {
      this.gold += entity.value;
      sounds.gold.play();
      board.setEntity(new Grass(), this.position);
    }
  }
  attack(entity) {
    super.attack(entity);
  }
  buy(item, tradesman) {
    sounds.trade.play();
    this.items.push(item);
    this.gold -= item.value;
    tradesman.gold += item.value;
    let idx = tradesman.items.indexOf(item);
    tradesman.items.splice(idx, 1);
  }
  sell(item, tradesman) {
    sounds.trade.play();
    this.gold += item.value;
    tradesman.gold -= item.value;
    let idx = this.items.indexOf(item);
    this.items.splice(idx, 1);
    tradesman.items.push(item);
  }
  useItem(item, target) {
    item.use(target);
  }
  loot(entity) {
    if (entity.items.length > 0) {
      sounds.loot.play();
      entity.items.forEach(item => {
        this.items.push(item);
      });
      entity.items = [];
    }
    if (entity.gold > 0) {
      sounds.gold.play();
      this.gold += entity.gold;
      entity.gold = 0;
    }
  }
  getExpToLevel() {
    let expReq = this.level * 10 - this.exp;
    return expReq;
  }
  getExp(entity) {
    let experience = entity.level * 10;
    this.exp += experience;
  }
  levelUp() {
    sounds.levelup.play();
    this.level++;
    this.hp = this.getMaxHp();
    this.exp -= this.getExpToLevel();
    this.attackSpeed = 3000 / this.level;
    this.strength = this.level * 10;
  }
}
/*
Player class definition. Player is a Creature
- constructor
  - parameters: name (string), position (Position), board (Board), level (number), items (Item[]), gold (number)
  - Sets the attackSpeed to 2000 / level
  - Sets the exp to 0
  - Sets the position and board
- attackSpeed (number)
- exp (number)
- position (Position)
- board (Board)
- render (function)
  - parameters: root (HTMLElement)
  - Appends the element to the root (the board HTML element)
  - Updates the player position
- update (function)
  - parameters: none
  - Updates the player's HTML element position based on its position property and ENTITY_SIZE
- moveToPosition (Position)
  - moves to position specified unless it is a Wall entity.
  - updates player (update method)
- move (function)
  - parameters: direction (string)
  - Sets the player image based on direction and moves to new position
- pickup (function)
  - parameters: entity (Item || Gold)
  - Adds item or gold and plays the corresponding sound ('loot' or 'gold' respectively)
- attack (function)
  - parameters: (entity)
  - calls the attack method from Creature (use super) and plays the 'pattack' sound if the attack was successful
- buy (function)
  - parameters: item (Item), tradesman (Tradesman)
  - updates gold and items for both player and tradesman.
  - Plays the trade sound
  - returns true if successful trade, false if gold is insufficient
- sell (function)
  - parameters: item (Item), tradesman (Tradesman)
  - updates gold and items for both player and tradesman.
  - Plays the trade sound
  - returns true if successful trade, false if gold is insufficient
- useItem (function)
  - parameters: item (Item), target (Creature)
  - uses the item on the target and removes it from the player
- loot (function)
  - parameters: entity (Monster || Dungeon)
  - Updates gold and items for both player and dungeon or monster.
  - plays the loot sound
- getExpToLevel (function)
  - parameters: none
  - returns exp needed to level: level * 10
- getExp (function)
  - parameters: entity (Monster)
  - adds exp based on entity level (level * 10)
  - level up if enough exp. It is possible to level up multiple times at once if enough exp is earned (e.g. beat enemy level 3)
- levelUp (function)
  - parameters: entity (Monster)
  - Increments level, sets hp to max hp
  - updates strength (level * 10) and attack speed (3000 / level)
  - plays levelup sound
Example use:
new Player('Van', new Position(5, 5), new Board(10, 10), 1, [new Potion(0)]);
*/
