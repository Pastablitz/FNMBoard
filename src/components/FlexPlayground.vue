<template>
  <div>
    <div class="parent">
      <div class="child"></div>
      <div class="child maverick"></div>
      <div id="whatever" class="child unwanted"></div>
    </div>
    <v-toggle v-model="showIcons">Show all icons</v-toggle>
    <div v-if="showIcons" class="icon-display-container">
      <div v-for="iconName in allIconNames" :key="iconName" class="icon-item">
        <v-icon :type="iconName" :size="48" :colour="'#333'"></v-icon>
        <p>{{ iconName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import IconComponentDefinition from './Icon.vue';

export default {
  data() {
    return {
      htmlStuff: "<button>I wanna be a div</button>",
      allIconNames: [],
      showIcons: true
    };
  },
  created() {
   
    const iconDefinitions = IconComponentDefinition.data();

    if (iconDefinitions && iconDefinitions.icons) {
      this.allIconNames = Object.keys(iconDefinitions.icons);
      console.log('Successfully retrieved icon names:', this.allIconNames);
    } else {
      console.error("Failed to retrieve 'icons' data from Icon.vue component definition.");
    }
  }
};

//Google Sheets Push scrips:

//     async addToColumn(column, value) {
//   try {
//     const url = `${this.SCRIPT_URL}?action=addToColumn&column=${column}&value=${encodeURIComponent(value)}`;
    
//     const response = await fetch(url, {
//       method: 'GET',
//       redirect: 'follow'
//     });
    
//     const result = await response.json();
//     console.log('Added to column:', result);
//     return result;
//   } catch (error) {
//     console.error('Error adding to column:', error);
//     return { success: false };
//   }
// },

//     async writeToCell(cell, value) {
//       try {
//         const url = `${this.SCRIPT_URL}?action=writeToCell&cell=${encodeURIComponent(cell)}&value=${encodeURIComponent(value)}`;
        
//         const response = await fetch(url, {
//           method: 'GET',
//           redirect: 'follow'
//         });
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const result = await response.json();
//         console.log('Google Sheets response:', result);
//         return result.success;
//       } catch (error) {
//         console.error('Error writing to Google Sheets:', error);
//         return false;
//       }
//     },
    
//     async writeMultipleCells(updates) {
//       try {
//         const results = [];
        
//         // Write each cell one by one
//         for (const update of updates) {
//           const success = await this.writeToCell(update.cell, update.value);
//           results.push(success);
          
//           // Small delay to avoid overwhelming the API
//           await new Promise(resolve => setTimeout(resolve, 100));
//         }
        
//         const allSuccessful = results.every(result => result === true);
//         console.log('All writes successful:', allSuccessful);
//         return allSuccessful;
//       } catch (error) {
//         console.error('Error writing multiple cells:', error);
//         return false;
//       }
//     },
    
//     // Test method - call this from your button
//     async saveGameData() {
//       console.log('Attempting to save game data...');

//       const success = await this.writeMultipleCells([
//         { cell: 'A1', value: 'Test Player Name' },
//         { cell: 'B1', value: '150' },
//         { cell: 'C1', value: new Date().toLocaleString() }
//       ]);

//       if (success) {
//         alert('✅ Game data saved to Google Sheets!');
//       } else {
//         alert('❌ Failed to save some data. Check console for details.');
//       }
//     },

//     //read from cell scripts
//     async readCell(cell) {
//       try {
//         const url = `${this.SCRIPT_URL}?action=readCell&cell=${cell}`;

//         const response = await fetch(url, {
//           method: 'GET',
//           redirect: 'follow'
//         });

//         const result = await response.json();
//         console.log(`Cell ${cell} contains:`, result.value);
//         return result;
//       } catch (error) {
//         console.error('Error reading cell:', error);
//         return { success: false };
//       }
//     },

//     // Read multiple cells at once
//     async readCells(cellArray) {
//       try {
//         const cellString = cellArray.join(','); // ['A1', 'B1', 'C1'] becomes 'A1,B1,C1'
//         const url = `${this.SCRIPT_URL}?action=readCells&cells=${cellString}`;

//         const response = await fetch(url, {
//           method: 'GET',
//           redirect: 'follow'
//         });

//         const result = await response.json();
//         console.log('Multiple cells data:', result.data);
//         return result;
//       } catch (error) {
//         console.error('Error reading cells:', error);
//         return { success: false };
//       }
//     },

//     async loadDeckWins() {
//   const result = await this.readCell('A1');
  
//   if (result.success) {
//     // Update your data property with the value from A1
//     this.deckWins = result.value || 0; // Use 0 as fallback if cell is empty
//     console.log('Deck wins loaded:', this.deckWins);
//   } else {
//     console.error('Failed to load deck wins from A1');
//   }
// },
// async readRange(range) {
//       try {
//         const url = `${this.SCRIPT_URL}?action=readRange&range=${range}`;
        
//         const response = await fetch(url, {
//           method: 'GET',
//           redirect: 'follow',
          
//         });
        
//         const result = await response.json();
//         console.log(`Range ${range} data:`, result.data);
//         return result;
//       } catch (error) {
//         console.error('Error reading range:', error);
//         return { success: false };
//       }
//     },

//     // Count how many times a string appears in an array
//     countStringInArray(array, searchString) {
//       return array.filter(item => 
//         String(item).toLowerCase() === searchString.toLowerCase()
//       ).length;
//     },

//     // Read range and count specific string
//     async countStringInRange(range, searchString) {
//       const result = await this.readRange(range);
      
//       if (result.success) {
//         const count = this.countStringInArray(result.data, searchString);
//         console.log(`"${searchString}" appears ${count} times in range ${range}`);
//         return {
//           success: true,
//           searchString: searchString,
//           count: count,
//           totalCells: result.data.length,
//           data: result.data
//         };
//       }
      
//       return { success: false };
//     },

//     // Example usage - count wins for a specific fighter
//     async countFighterWins(fighterName) {
//       const result = await this.countStringInRange('E3:E200', fighterName);
      
//       if (result.success) {
//         alert(`${fighterName} has ${result.count} wins out of ${result.totalCells} games!`);
//         return result.count;
//       } else {
//         alert('Failed to count wins');
//         return 0;
//       }
//     }

</script>

<style lang="scss" scoped>
/* Your styles here */

div {}

div div {}

div>div {}

.child {}

div.child {}

div>div.child {}

.parent>div.child {}

div.parent>div.child {}

.unwanted {}

.child.unwanted {}

.parent div#whatever {}

.parent {
  display: flex;
  flex-direction: column;
  margin: 10px;
  border: 4px solid blue;
  justify-content: space-evenly;
}

.child {
  border: 4px solid red;
  height: 40px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &.maverick {
    flex-grow: 2;
  }
}

.icon-display-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  justify-content: center;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border-radius: 5px;
  background-color: #FFF;
  min-width: 120px;
  text-align: center;
  color: #000;
  /* White text color */
  min-width: 120px;
}

#twat {}
</style>