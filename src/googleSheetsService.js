const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyoELRWsn-pyumiVjLoWn9GsIXqnv9dKbHvJnakDuaNNY5XvAgb-aX9aqd1Kffh4SQf/exec';

export const GoogleSheetsService = {
  // Write to a single cell
  async writeToCell(cell, value, sheet) {
    if (!sheet) throw new Error("writeToCell requires a sheet name");
    try {
      const url = `${SCRIPT_URL}?action=writeToCell&sheet=${encodeURIComponent(sheet)}&cell=${encodeURIComponent(cell)}&value=${encodeURIComponent(value)}`;
      const response = await fetch(url, { method: 'GET', redirect: 'follow' });
      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Error writing to Google Sheets:', error);
      return false;
    }
  },

  // Read a single cell
  async readCell(cell, sheet) {
    if (!sheet) throw new Error("readCell requires a sheet name");
    try {
      const url = `${SCRIPT_URL}?action=readCell&sheet=${encodeURIComponent(sheet)}&cell=${encodeURIComponent(cell)}`;
      const response = await fetch(url, { method: 'GET', redirect: 'follow' });
      const result = await response.json();
      console.log(`Cell ${cell} (${sheet}) contains:`, result.value);
      return result;
    } catch (error) {
      console.error('Error reading cell:', error);
      return { success: false };
    }
  },

  // Read a range of cells
  async readRange(range, sheet) {
    if (!sheet) throw new Error("readRange requires a sheet name");
    try {
      const url = `${SCRIPT_URL}?action=readRange&sheet=${encodeURIComponent(sheet)}&range=${encodeURIComponent(range)}`;
      const response = await fetch(url, { method: 'GET', redirect: 'follow' });
      const result = await response.json();
      console.log(`Range ${range} (${sheet}) data:`, result.data);
      return result;
    } catch (error) {
      console.error('Error reading range:', error);
      return { success: false };
    }
  },

  // Add to first empty cell in column
  async addToColumn(column, value, sheet) {
    if (!sheet) throw new Error("addToColumn requires a sheet name");
    try {
      const url = `${SCRIPT_URL}?action=addToColumn&sheet=${encodeURIComponent(sheet)}&column=${encodeURIComponent(column)}&value=${encodeURIComponent(value)}`;
      const response = await fetch(url, { method: 'GET', redirect: 'follow' });
      const result = await response.json();
      console.log('Added to column:', result);
      return result;
    } catch (error) {
      console.error('Error adding to column:', error);
      return { success: false };
    }
  },

  // Count occurrences of a string in a range
  async countStringInRange(range, searchString, sheet) {
    const result = await this.readRange(range, sheet);
    if (result.success) {
      const count = result.data.filter(item =>
        String(item).toLowerCase() === searchString.toLowerCase()
      ).length;
      console.log(`"${searchString}" appears ${count} times in range ${range} (${sheet})`);
      return {
        success: true,
        searchString,
        count,
        totalCells: result.data.length,
        data: result.data
      };
    }
    return { success: false };
  },

  // Write multiple cells at once
  async writeMultipleCells(updates, sheet) {
    if (!sheet) throw new Error("writeMultipleCells requires a sheet name");
    try {
      const results = [];
      for (const update of updates) {
        const success = await this.writeToCell(update.cell, update.value, sheet);
        results.push(success);
        await new Promise(resolve => setTimeout(resolve, 100)); // throttle
      }
      const allSuccessful = results.every(r => r === true);
      console.log('All writes successful:', allSuccessful);
      return allSuccessful;
    } catch (error) {
      console.error('Error writing multiple cells:', error);
      return false;
    }
  },

  async getDeckStats() {
  try {
    const result = await this.readGrid("B3:N279", "Decks");
    if (!result.success) return [];

    const rows = result.data; // 2D array
    return rows
      .filter(row => row[0]) // skip blank names
      .map(row => ({
        name: row[0],                  // col B
        gamesPlayed: Number(row[2]||0),// col D (offset: 1)
        wins: Number(row[3]||0),       // col E
        currentStreak: Number(row[5]||0), // col G
        bestStreak: Number(row[6]||0),     // col H
        lastPlayed: row[7] || null,  // col I
        weightedScore: row[12] || null
      }));
  } catch (err) {
    console.error("Error loading deck stats:", err);
    return [];
  }
},

  async readGrid(range, sheet = 'Decks') {
  try {
    const url = `${SCRIPT_URL}?action=readGrid&range=${encodeURIComponent(range)}&sheet=${encodeURIComponent(sheet)}`;
    const response = await fetch(url, { method: 'GET', redirect: 'follow' });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error reading grid:', error);
    return { success: false };
  }
}

};


export const GameDataService = {
  async saveFighterWin(fighterName) {
    return await GoogleSheetsService.addToColumn('A', fighterName, 'GameLog');
  },

  async getFighterWinCount(fighterName) {
    const result = await GoogleSheetsService.countStringInRange('F66:F166', fighterName, 'GameLog');
    return result.success ? result.count : 0;
  },

  async loadDeckWins() {
    const result = await GoogleSheetsService.readCell('A1', 'GameLog');
    return result.success ? (result.value || 0) : 0;
  },

  async updateDeckWins(newValue) {
    return await GoogleSheetsService.writeToCell('A1', newValue, 'GameLog');
  },



   async getAllFighterWinStreaks() {
    try {
      const sheet = "Decks";

      // Ranges for names and streaks
      const ranges = [
        { nameRange: "B3:B92", streakRange: "G3:G92" },
        { nameRange: "B105:B197", streakRange: "G105:G197" },
        { nameRange: "B205:B279", streakRange: "G205:G279" }
      ];

      let results = [];

      for (const { nameRange, streakRange } of ranges) {
        const namesResult = await GoogleSheetsService.readRange(nameRange, sheet);
        const streaksResult = await GoogleSheetsService.readRange(streakRange, sheet);

        if (namesResult.success && streaksResult.success) {
          const names = namesResult.data;
          const streaks = streaksResult.data;

          for (let i = 0; i < names.length; i++) {
            if (names[i]) { // skip blank rows
              results.push({
                name: names[i],
                streak: Number(streaks[i] || 0)
              });
            }
          }
        }
      }

      return results;
    } catch (error) {
      console.error("Error getting fighter win streaks:", error);
      return [];
    }
  }
};
