//Create the Creature and Monster class

/*
The Creature class is an Entity. It has the following properties (not including inherited properties):
- constructor
  - parameters: name (string), img (string), level (number), items (Item[]), gold (number)
- name (string)
- img (string - path to image)
- level (number)
- items (array of Item objects)
- gold (number)
- hp (number): level * 100
- strength (number): level * 10
- attackSpeed (number): 3000 / level
- getMaxHp (function)
  - parameters: none
  - returns max hp (level * 100)
- hit (function)
  - parameters: val (number)
  - decreases hp by val. Hp cannot go under 0
- attack (function)
  - parameters: entity (Creature)
  - hits the entity with strength value
  - sets an attack timeout that expires after attackSpeed. While the timeout is active, this method immediately returns false, else returns true.
Example use: not used by itself. 
*/
class Creature extends Entity {
  constructor(name, img, level, items, gold) {
    super(img);
    this.name = name;
    this.level = level || 1;
    this.items = items || [];
    this.gold = gold || 0;
    this.hp = level * 100;
    this.strength = level * 10;
    this.attackSpeed = 3000 / level;
  }
  getMaxHp() {
    this.maxHP = this.level * 100;
    return this.maxHP;
  }
  hit(val) {
    return (this.hp = Math.Max(0, this.hp - val));
  }
  attack(entity) {
    if (this.attacking === undefined || this.attacking === false) {
      this.attacking = true;
      entity.hp = Math.max(0, entity.hp - this.strength);
      if (entity.constructor.name === 'Monster') sounds.pattack.play();
      else sounds.mattack.play();
    } else {
      return;
    }
    setTimeout(() => {
      this.attacking = false;
    }, this.attackSpeed);
  }
}
/*
The Monster class is a Creature. It has the following properties (bot including inherited properties):
- constructor
  - parameters: name (string), level (number), items (Item[]), gold (number)
- name (string): name must be valid (from MONSTER_NAMES)
- level (number)
- items (array of Item objects)
- gold (number)
- attack (function)
  - parameters: entity (Creature)
  - calls the attack method from Creature (use super) and plays the 'mattack' sound if the attack was successful
Example use:
new Monster('Anti Fairy', 1, [], 0); // Creates a Monster named Anti Fairy, level 1, no items and 0 gold. Only the name is required.
*/
class Monster extends Creature {
  constructor(name, img, level, items, gold) {
    super(name, img, level, items, gold);
    img = this.name.split(' ').join('');
    this.setImg('imgs/monsters/' + img + '.gif');
  }
  attack(entity) {
    // sounds.mattack.play();
    super.attack(entity);
  }
}
