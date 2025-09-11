const Roster = ALL_DECKS.map((fighter) => {
  return new Fighter(fighter.name, fighter.position);
});

const エリオ = new Player("エリオ", "yellow");
const ジョシュ = new Player("ジョシュ", "blue");
const ロブ = new Player("ロブ", "green");



const BossRoster = BOSS_DATA.map((boss) => {
  return new Boss(boss.name)
});

const EP1 = new EldenPlayer("P1", "red", 7, 2);
const EP2 = new EldenPlayer("ジョシュ", "blue", 8, 6);

const BossboardPalette = new Palette("bossboard");