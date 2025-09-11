const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyoELRWsn-pyumiVjLoWn9GsIXqnv9dKbHvJnakDuaNNY5XvAgb-aX9aqd1Kffh4SQf/exec';

// Google Sheets API service
export const GoogleSheetsService = {
  // Write to a single cell
  async writeToCell(cell, value) {
    try {
      const url = `${SCRIPT_URL}?action=writeToCell&cell=${encodeURIComponent(cell)}&value=${encodeURIComponent(value)}`;
      
      const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow'
      });
      
      const result = await response.json();
      console.log('Google Sheets response:', result);
      return result.success;
    } catch (error) {
      console.error('Error writing to Google Sheets:', error);
      return false;
    }
  },

  // Read a single cell
  async readCell(cell) {
    try {
      const url = `${SCRIPT_URL}?action=readCell&cell=${cell}`;
      
      const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow'
      });
      
      const result = await response.json();
      console.log(`Cell ${cell} contains:`, result.value);
      return result;
    } catch (error) {
      console.error('Error reading cell:', error);
      return { success: false };
    }
  },

  // Read a range of cells
  async readRange(range) {
    try {
      const url = `${SCRIPT_URL}?action=readRange&range=${range}`;
      
      const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow'
      });
      
      const result = await response.json();
      console.log(`Range ${range} data:`, result.data);
      return result;
    } catch (error) {
      console.error('Error reading range:', error);
      return { success: false };
    }
  },

  // Add to first empty cell in column
  async addToColumn(column, value) {
    try {
      const url = `${SCRIPT_URL}?action=addToColumn&column=${column}&value=${encodeURIComponent(value)}`;
      
      const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow'
      });
      
      const result = await response.json();
      console.log('Added to column:', result);
      return result;
    } catch (error) {
      console.error('Error adding to column:', error);
      return { success: false };
    }
  },

  // Count occurrences of a string in a range
  async countStringInRange(range, searchString) {
    const result = await this.readRange(range);
    
    if (result.success) {
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
  },

  // Write multiple cells at once
  async writeMultipleCells(updates) {
    try {
      const results = [];
      
      for (const update of updates) {
        const success = await this.writeToCell(update.cell, update.value);
        results.push(success);
        
        // Small delay to avoid overwhelming the API
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      const allSuccessful = results.every(result => result === true);
      console.log('All writes successful:', allSuccessful);
      return allSuccessful;
    } catch (error) {
      console.error('Error writing multiple cells:', error);
      return false;
    }
  }
};

export const GameDataService = {
  async saveFighterWin(fighterName) {
    return await GoogleSheetsService.addToColumn('A', fighterName);
  },


  async getFighterWinCount(fighterName) {
    const result = await GoogleSheetsService.countStringInRange('F66:F166', fighterName);
    return result.success ? result.count : 0;
  },

  async loadDeckWins() {
    const result = await GoogleSheetsService.readCell('A1');
    return result.success ? (result.value || 0) : 0;
  },

  async updateDeckWins(newValue) {
    return await GoogleSheetsService.writeToCell('A1', newValue);
  }
};