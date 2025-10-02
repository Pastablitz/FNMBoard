const Roster = ALL_DECKS.map((fighter) => {
  return new Fighter(fighter.name, fighter.position);
});

const eRoster = ELL_DECKS.map((fighter) => {
  return new Fighter(fighter.name, fighter.position);
});

const jRoster = JJ_DECKS.map((fighter) => {
  return new Fighter(fighter.name, fighter.position);
});

const rRoster = ROB_DECKS.map((fighter) => {
  return new Fighter(fighter.name, fighter.position);
});



const エリオ = new Player("エリオ", "yellow", eRoster);
const ジョシュ = new Player("ジョシュ", "blue", jRoster);
const ロブ = new Player("ロブ", "green", rRoster);



const BossRoster = BOSS_DATA.map((boss) => {
  return new Boss(boss.name)
});

const EP1 = new EldenPlayer("P1", "red", 7, 2);
const EP2 = new EldenPlayer("ジョシュ", "blue", 8, 6);

const BossboardPalette = new Palette("bossboard");