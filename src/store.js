const Roster = ALL_DECKS.map((fighter) => {
  return new Fighter(fighter.name, fighter.position);
});

const eRoster = ALL_DECKS.filter((fighter) => fighter.owner === 'Ell' || !fighter.owner).map((fighter) => {
  return new Fighter(fighter.name, fighter.position);
});

const jRoster = ALL_DECKS.filter((fighter) => fighter.owner === 'JJ' || !fighter.owner).map((fighter) => {
  return new Fighter(fighter.name, fighter.position);
});

const rRoster = ALL_DECKS.filter((fighter) => fighter.owner === 'Rob' || !fighter.owner).map((fighter) => {
  return new Fighter(fighter.name, fighter.position);
});



const Els = new Player("Els", "yellow", eRoster);
const JJ = new Player("JJ", "blue", jRoster);
const Rob = new Player("Rob", "green", rRoster);



const BossRoster = BOSS_DATA.map((boss) => {
  return new Boss(boss.name)
});

const EP1 = new EldenPlayer("P1", "red", 7, 2);
const EP2 = new EldenPlayer("JJ", "blue", 8, 6);

const BossboardPalette = new Palette("bossboard");