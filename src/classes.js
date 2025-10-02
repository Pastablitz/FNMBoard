class Fighter {
  constructor(name,position) {
    this.name = name;
    this.position = position;
    this.isWinner = false;
  }

  get iconPath() {
    return `src/assets/fighter-icons/${this.name}.png`;
  }

  get imagePath() {
    return `src/assets/fighter-imgs/${this.name}.png`;
  }

  get deckImagePath() {
    return `src/assets/deck-imgs/${this.name}.jpg`;
  }
}

class Boss {
  constructor(name) {
    this.name = name;
  }

  get iconPath() {
    return `src/assets/boss-icons/${this.name}2.png`;
  }

  get imagePath() {
    return `src/assets/boss-imgs/${this.name}.png`;
  }
}

class GameLog {
  constructor(playerName) {
    this.winners = [];
    
  }

 async loadWinners(range, searchString) {
    const result = await this.readRange(range, 'GameLog');
    console.log(result)
    if (result.success) {

      const winnersData = this.winners;
      localStorage.setItem(`winnersData`, JSON.stringify(winnersData));

      const count = result.data.filter(item => 
        String(item).toLowerCase() === searchString.toLowerCase()
      ).length;
      
      console.log(`"${searchString}" appears ${count} times in range ${range}`);
      return {
        success: true,
        searchString: searchString,
        count: count,
        totalCells: result.data.length,
        data: result.data
      };
    }
    
    return { success: false };
  }

}

class Player {
  constructor(name, colour, playerRoster) {
    this.name = name;
    this.colour = colour;
    this.playerRoster = playerRoster;
    this.faves = [];
    this.mains = [];
    this.defaults = [];
    this.loadData();
    this.lastRoll = null;
    this.preventRerolls = false;
    this.goingFirst = false;
  }

  activeFighter = null;

  loadData() {
    const favesData = JSON.parse(localStorage.getItem(`${this.name}-faves`));
    if (favesData) {
      this.faves = Roster.filter(f => favesData.includes(f.name));
    }
    const defaultsData = JSON.parse(localStorage.getItem(`${this.name}-faves`));
    if (favesData) {
      this.faves = Roster.filter(f => favesData.includes(f.name));
    }
    const mainsData = JSON.parse(localStorage.getItem(`${this.name}-mains`));
    if (mainsData) {
      this.mains = Roster.filter(f => mainsData.includes(f.name));
    }
  }

  saveData() {
    const favesData = this.faves.map(f => f.name);
    localStorage.setItem(`${this.name}-faves`, JSON.stringify(favesData));

    const defaultsData = this.defaults.map(f => f.name);
    localStorage.setItem(`${this.name}-defaults`, JSON.stringify(defaultsData));

    const mainsData = this.mains.map(f => f.name);
    localStorage.setItem(`${this.name}-mains`, JSON.stringify(mainsData));
  }

  roster(sorting = SortBy.default, searchTerm = '') {
    const filteredRoster = this.playerRoster.filter((fighter) => {
      const cleanSearchTerm = searchTerm.toLowerCase().trim();
      return !this.hasMain(fighter) && fighter.name.toLowerCase().includes(cleanSearchTerm)
    });

    switch (sorting) {
      case SortBy.favouritesFirst:
        return filteredRoster.sort((a, b) => {
          const faveSort = this.hasFave(b) - this.hasFave(a);
          if (faveSort === 0) {
            return a.name.localeCompare(b.name);
          }
          return faveSort;
        });
      case SortBy.default:
      default:
        return filteredRoster.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  hasFave(fighter) {
    return this.faves.some(f => f.name === fighter.name);
  }

  hasDefault(fighter) {
    return this.defaults.some(f => f.name === fighter.name);
  }

  hasMain(fighter) {
    return this.mains.some(f => f.name === fighter.name);
  }

  toggleFave(fighter) {
    if (this.hasFave(fighter)) {
      this.faves = this.faves.filter(f => f.name !== fighter.name);
    } else {
      this.faves.push(fighter);
    }

    this.saveData();
  }

  toggleDefault(fighter) {
    if (this.hasDefault(fighter)) {
      this.defaults = this.defaults.filter(f => f.name !== fighter.name);
    } else {
      this.defaults.push(fighter);
    }

    this.saveData();
  }

  toggleMain(fighter) {
    if (this.hasMain(fighter)) {
      this.mains = this.mains.filter(f => f.name !== fighter.name);
    } else {
      this.mains.push(fighter);
    }

    if (this.activeFighter?.name === fighter.name) {
      this.activeFighter = null
    }

    this.saveData();
  }

  resetMains() {
    if (confirm("Add all decks?")) {
      this.mains = [...this.faves];
    }
  }

  clearMains() {
    if (confirm("Bin the whole bastard list?")) {
      this.mains = [];
    }
  }
}



class SortBy {
  static get default() {
    return 0;
  }
  static get favouritesFirst() {
    return 1;
  }
}

class EldenPlayer {
  constructor(name, colour, primaryColourNum, secondaryColourNum) {
    this.name = name;
    this.colour = colour;
    this.faves = [];
    this.mains = [];
    this.defaults = [];
    this.beaten = [];
    this.ignoreBeaten = false;
    this.loadData();
    this.lastRoll = null;
    this.preventRerolls = false;
    this.primaryColourNum = primaryColourNum;
    this.secondaryColourNum = secondaryColourNum;

  }

  activeBoss = null;

  loadData() {
    const favesData = JSON.parse(localStorage.getItem(`${this.name}-faves`));
    if (favesData) {
      this.faves = BossRoster.filter(f => favesData.includes(f.name));
    }
    const defaultsData = JSON.parse(localStorage.getItem(`${this.name}-faves`));
    if (favesData) {
      this.faves = BossRoster.filter(f => favesData.includes(f.name));
    }
    const mainsData = JSON.parse(localStorage.getItem(`${this.name}-mains`));
    if (mainsData) {
      this.mains = BossRoster.filter(f => mainsData.includes(f.name));
    }
    const beatenData = JSON.parse(localStorage.getItem(`${this.name}-beaten`));
    if (beatenData) {
      this.beaten = BossRoster.filter(f => beatenData.includes(f.name));
    }
  }

  saveData() {
    const favesData = this.faves.map(f => f.name);
    localStorage.setItem(`${this.name}-faves`, JSON.stringify(favesData));

    const defaultsData = this.defaults.map(f => f.name);
    localStorage.setItem(`${this.name}-defaults`, JSON.stringify(defaultsData));

    const mainsData = this.mains.map(f => f.name);
    localStorage.setItem(`${this.name}-mains`, JSON.stringify(mainsData));

    const beatenData = this.beaten.map(f => f.name);
    localStorage.setItem(`${this.name}-beaten`, JSON.stringify(beatenData));
  }

  bossRoster(sorting = SortBy.default, searchTerm = '') {
    const filteredBossRoster = BossRoster.filter((boss) => {
      const cleanSearchTerm = searchTerm.toLowerCase().trim();
      return !this.hasMain(boss) && boss.name.toLowerCase().includes(cleanSearchTerm)
    });

    switch (sorting) {
      case SortBy.favouritesFirst:
        return filteredBossRoster.sort((a, b) => this.hasFave(b) - this.hasFave(a));
      case SortBy.default:
      default:
        return filteredBossRoster;
    }
  }

  hasFave(boss) {
    return this.faves.some(f => f.name === boss.name);
  }

  hasDefault(boss) {
    return this.defaults.some(f => f.name === boss.name);
  }

  hasMain(boss) {
    return this.mains.some(f => f.name === boss.name);
  }

  hasBeaten(boss) {
    return this.beaten.some(f => f.name === boss.name);
  }

  toggleFave(boss) {
    if (this.hasFave(boss)) {
      this.faves = this.faves.filter(f => f.name !== boss.name);
    } else {
      this.faves.push(boss);
    }

    this.saveData();
  }

  toggleBeaten(boss) {
    if (this.hasBeaten(boss)) {
      this.beaten = this.beaten.filter(f => f.name !== boss.name);
    } else {
      this.beaten.push(boss);
    }

    this.saveData();
  }

  toggleDefault(boss) {
    if (this.hasDefault(boss)) {
      this.defaults = this.defaults.filter(f => f.name !== boss.name);
    } else {
      this.defaults.push(boss);
    }

    this.saveData();
  }

  toggleMain(boss) {
    if (this.hasMain(boss)) {
      this.mains = this.mains.filter(f => f.name !== boss.name);
    } else {
      this.mains.push(boss);
    }

    if (this.activeBoss?.name === boss.name) {
      this.activeBoss = null
    }

    this.saveData();
  }

  resetMains() {
    this.mains = [...this.faves];
  }

}

class Palette {
  constructor(screen) {
    this.screenName = screen;
    this._chosenPalette = 'liurnia';
  }
  get chosenPalette() {
    return this._chosenPalette;
  }
  set chosenPalette(newPalette) {
    this._chosenPalette = newPalette;
  }
  get colour1() {
    return this._chosenPalette + '1';
  }
  get colour2() {
    return this._chosenPalette + '2';
  }
  get colour3() {
    return this._chosenPalette + '3';
  }
  get colour4() {
    return this._chosenPalette + '4';
  }
  get colour5() {
    return this._chosenPalette + '5';
  }
  get colour6() {
    return this._chosenPalette + '6';
  }
  get colour7() {
    return this._chosenPalette + '7';
  }
  get colour8() {
    return this._chosenPalette + '8';
  }

  setPalette(palette) {
    this._chosenPalette = palette;
    console.log("New chosenPalette:", this.chosenPalette);
  }
}

class MineCell {
  constructor(row, col, bombRate = 5) {
    this.row = row;
    this.col = col;
    this.isBomb = Math.floor(Math.random() * bombRate) === 0;
    this.isRevealed = false;
    this.isFlagged = false;
    this.display = "";
  }

  reveal(grid) {
    if (this.isRevealed || this.isFlagged) return;

    if (!grid.flat().some(c => c.isRevealed)) {
      this.isBomb = false;
      const neighbours = this.getNeighbours(grid);
      neighbours.forEach((item, index, array) => array[index].isBomb = false);
    }

    this.isRevealed = true;

    if (this.isBomb) {      
      const otherBombs = grid.flat().filter(n => n.isBomb);
      otherBombs.forEach((item, index, array) => {
        array[index].isRevealed = true;
        array[index].display = "💣";
      });

      this.display = "💩";
      return;
    }

    const badNeighbourCount = this.countBadNeighbours(grid);

    if (badNeighbourCount > 0) {
      this.display = badNeighbourCount;
      return;
    }

    setTimeout(() => this.revealSafeNeighbourCells(grid), 30);
  }

  countBadNeighbours(grid) {
    const neighbours = this.getNeighbours(grid);
    return neighbours.filter(n => n.isBomb).length;
  }

  revealSafeNeighbourCells(grid) {
    if (this.isBomb) return;

    const neighbours = this.getNeighbours(grid);
    const safeNeighbours = neighbours.filter(n => !n.isBomb);

    safeNeighbours.forEach(n => n.reveal(grid));
  }

  flag() {
    if (this.isRevealed) return;

    this.isFlagged = !this.isFlagged;
    this.display = this.isFlagged ? "📍" : "";
  }

  getNeighbours(grid) {
    const neighbours = [];
    const neighbourAddresses = [
      { row: this.row - 1, col: this.col + 0 }, // 1. top
      { row: this.row - 1, col: this.col + 1 }, // 2. top-right
      { row: this.row + 0, col: this.col + 1 }, // 3. right
      { row: this.row + 1, col: this.col + 1 }, // 4. bottom-right
      { row: this.row + 1, col: this.col + 0 }, // 5. bottom
      { row: this.row + 1, col: this.col - 1 }, // 6. bottom-left
      { row: this.row + 0, col: this.col - 1 }, // 7. left
      { row: this.row - 1, col: this.col - 1 }, // 8. top-left
    ]

    const maxRowIndex = grid.length - 1;
    const maxColIndex = grid[0].length - 1;
    
    neighbourAddresses.forEach((address) => {
      const isValidColIndex = address.col >= 0 && address.col <= maxColIndex;
      const isValidRowIndex = address.row >= 0 && address.row <= maxRowIndex;

      if (isValidColIndex && isValidRowIndex) {
        neighbours.push(grid[address.row][address.col]);
      }
    });

    return neighbours;
  }
}