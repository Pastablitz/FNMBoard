<template>
  <div class="roll-button-container">
    <!-- Add this marquee div -->
    <div class="marquee" :class="{ 'marquee-active': isMarqueeActive }">
      {{ firstPlayerText }}
    </div>
    <div class="alert" :class="{ 'alert-active': isAlertActive }" @click="getMatchHistory()" v-html="matchAlert">
    </div>
    <v-button
      @click="rollTheDice(), rollDicelist(), !muted && playRollSoundAdvanced(), calculateFirstPlayer(), changeBackground(), populateWinsData()"
      :icon="isRolling ? 'spinner' : 'refresh'" :disabled="noMains || isRolling || isSaving" dark large />
    <div class="v-fnmboard">
      <v-nameplate :class="['roster']" :player="playerOne" @name-click="rollTheDie(playerOne)"
        @set-faves="playerOne.resetMains()" @clear-mains="playerOne.clearMains()" ref="np1" :wins-data="winsData"
        :show-data="showData" :stats-data="statsData" />
      <v-nameplate class="roster" :player="playerTwo" @name-click="rollTheDie(playerTwo)"
        @set-faves="playerTwo.resetMains()" @clear-mains="playerTwo.clearMains()" ref="np2" :wins-data="winsData"
        :show-data="showData" :stats-data="statsData" />
      <v-nameplate class="roster" :player="playerThree" @name-click="rollTheDie(playerThree)"
        @set-faves="playerThree.resetMains()" @clear-mains="playerThree.clearMains()" ref="np3" :wins-data="winsData"
        :show-data="showData" :stats-data="statsData" />
      <div class="plus-minus-buttons">
        <v-button icon="contact-card" primary @click="toggleData(), populateWinsData(), populateStatsData()"
          title="View Stats">{{ winsData.length }} </v-button>
        <v-button icon="sun" primary @click="changeBackground()" title="Change Background" />
        <!-- <v-button icon="search-history" primary @click="populateWinsData(), populateStatsData()" title="Populate Win Data">{{ winsData.length }}</v-button> -->
        <v-button :icon="isSaving ? 'spinner' : 'save'" primary @click="logGame()" title="Log Game" />
        <v-button icon="list" primary @click="addDicelist()" title="Add Dicelist" v-if="numberOfDicelists <= 0"
          :disabled="numberOfDicelists >= 1" />
        <v-button icon="list" negative @click="removeDicelist()" title="Remove Dicelist" v-if="numberOfDicelists >= 1"
          :disabled="numberOfDicelists <= 0" />
        <v-button icon="dashboard" primary v-if="!showDungeon" @click="setShowDungeonTrue" title="Show Dungeon Tracker">Show
          Dungeon </v-button>
        <v-button icon="dashboard" negative v-else @click="setShowDungeonFalse" title="Hide Dungeon Tracker">Hide
          Dungeon </v-button>
      </div>
      <div class="dungeon-panel" v-if="showDungeon" >
        <v-dungeon-tracker ref="dungeon" />
      </div>
      <div class="dicelist-panel">
        <v-dicelist v-for="n in numberOfDicelists" :key="n" :listID="'list-' + n" ref="dicelist" />
      </div>
    </div>
    <div class="options-buttons">
      <v-toggle icon="mute" v-model="muted">Mute</v-toggle>
    </div>
  </div>

</template>

<script>
import { GoogleSheetsService, GameDataService } from '@/googleSheetsService.js'

export default {
  data() {
    return {
      playerOne: Els,
      playerTwo: JJ,
      playerThree: Rob,
      isRolling: false,
      isSaving: false,
      vsImage: "src/assets/vs-img.png",
      playerOneDieImage: "src/assets/misc-images/SmashLogoRed.png",
      playerTwoDieImage: "src/assets/misc-images/SmashLogoRed.png",
      playerThreeDieImage: "src/assets/misc-images/SmashLogoRed.png",
      firstPlayer: 1,
      numberOfDicelists: 0,
      showDungeon: false,
      SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyoELRWsn-pyumiVjLoWn9GsIXqnv9dKbHvJnakDuaNNY5XvAgb-aX9aqd1Kffh4SQf/exec',
      deckWins: 0,
      winsData: [],
      statsData: [],
      showData: false,
      winnerName: '',
      muted: false,
      isMarqueeActive: false,
      isAlertActive: false,
      matchAlert: "No Match History"
    }
  },
  
  methods: {
    //this calls for every fighter individually - bad
    updateAllFighterNameplateWins() {
      this.$refs.np1.updateAllFighterWins();
      this.$refs.np2.updateAllFighterWins();
      this.$refs.np3.updateAllFighterWins();
      console.log('updated all 3 players')
    },
    //calls for all wins at once - good
    async populateWinsData() {
      const result = await GoogleSheetsService.readRange('E3:E200', 'GameLog');
      if (result.success) this.winsData = result.data;
    },

    async populateStatsData() {
  const statsArray = await GoogleSheetsService.getDeckStats();
  this.statsData = statsArray; // Direct assignment
  console.log("All deck stats:", statsArray);
  console.log("Number of decks:", statsArray.length);
},

    async logGame() {
      this.isSaving = true;
      if (!Els.activeFighter || !JJ.activeFighter || !Rob.activeFighter) {
        console.warn("active fighters missing");
        this.isSaving = false; 
        return;
      }

      if (!this.winnerName || this.winnerName === '') {
        console.warn("No winner selected." );
        this.isSaving = false; 
        return;
      }

      try {
        await new Promise(resolve => setTimeout(resolve, 100)); // 100ms pause
        await GoogleSheetsService.addToColumn('B', Els.activeFighter.name, 'GameLog');
        await new Promise(resolve => setTimeout(resolve, 100)); // 100ms pause
        await GoogleSheetsService.addToColumn('C', JJ.activeFighter.name, 'GameLog');
        await new Promise(resolve => setTimeout(resolve, 100)); // 100ms pause
        await GoogleSheetsService.addToColumn('D', Rob.activeFighter.name, 'GameLog');
        await new Promise(resolve => setTimeout(resolve, 100)); // 100ms pause
        await GoogleSheetsService.addToColumn('A', new Date().toLocaleString(), 'GameLog');
        await new Promise(resolve => setTimeout(resolve, 100)); // 100ms pause
        await GoogleSheetsService.addToColumn('E', this.winnerName, 'GameLog');

        await this.populateWinsData(); 
        await this.populateStatsData();
        
        console.log('Game logged successfully. Winner: ' + this.winnerName);
        this.winnerName = '';
        this.$bus.$emit("set-winner", '')

        
      } catch (error) {
        console.error('Failed to log game:', error);
      } finally {
        this.isSaving = false; 
      }
    },

    async getMatchHistory() {
  const deck1 = Els?.activeFighter?.name;
  const deck2 = JJ?.activeFighter?.name;
  const deck3 = Rob?.activeFighter?.name;

  const result = await GoogleSheetsService.readRange('A3:E200', 'GameLog');
  if (!result.success) {
    console.error('Failed to read match data');
    this.matchAlert = "No Match History";
    return;
  }

  // Chunk the flat array into rows of 5
  const rows = [];
  for (let i = 0; i < result.data.length; i += 5) {
    rows.push([
      result.data[i],     // date
      result.data[i + 1], // p1
      result.data[i + 2], // p2
      result.data[i + 3], // p3
      result.data[i + 4], // winner
    ]);
  }

  const matches = [];

  for (const row of rows) {
    const [date, p1, p2, p3, winner] = row;
    if (p1 === deck1 && p2 === deck2 && p3 === deck3) {
      matches.push({ date, winner });
    }
  }

  // If no matches, set alert to empty string and exit
  if (matches.length === 0) {
    this.matchAlert = "No Match History";
    return;
  }

  // Helper to prettify the date
  const prettifyDate = (isoString) => {
    const d = new Date(isoString);
    const day = d.getDate();
    const daySuffix =
      day % 10 === 1 && day !== 11 ? "st" :
      day % 10 === 2 && day !== 12 ? "nd" :
      day % 10 === 3 && day !== 13 ? "rd" : "th";
    const month = d.toLocaleString('default', { month: 'long' });
    const year = d.getFullYear();
    return `${day}${daySuffix} ${month} ${year}`;
  };

  // Build the alert string (oldest → newest)
  let alertText = `<span style="font-size: 48px; text-decoration: underline;">Rematch!</span>`;

  for (const m of matches) {
    alertText += `<br><span style="font-size: 32px;">${m.winner} won this matchup on ${prettifyDate(m.date)}</span>`;
  }

  this.matchAlert = alertText;
  this.triggerAlert("Text to display")
}
,


    // Call this function to trigger the marquee
    triggerMarquee(text) {
      this.isMarqueeActive = false;
      
      // Wait 10 seconds before starting the animation
      setTimeout(() => {
        this.$nextTick(() => {
          this.isMarqueeActive = true;
          
          // Reset after animation completes (8s from your CSS)
          setTimeout(() => {
            this.isMarqueeActive = false;
          }, 22000);
        });
      }, 3000);
    },

        // Call this function to trigger the marquee
    triggerAlert (text) {
      this.isAlertActive = false;
      
      // Wait 10 seconds before starting the animation
      setTimeout(() => {
        this.$nextTick(() => {
          this.isAlertActive = true;
          
          // Reset after animation completes (8s from your CSS)
          setTimeout(() => {
            this.isAlertActive = false;
          }, 22000);
        });
      }, 100);
    },

    rollTheDice() {
      this.rollTheDie(this.playerOne);
      this.rollTheDie(this.playerTwo);
      this.rollTheDie(this.playerThree);
    },
    rollDicelist() {
      (this.$refs.dicelist || []).forEach(d => d.rollTheDie && d.rollTheDie());
    },
    rollTheDie(player) {
      this.isRolling = true;
      const randomMainIndex = Math.floor(Math.random() * player.mains.length);
      let activeMainIndex = 0;
      const countTo = 100 + randomMainIndex
      let counter = Math.floor(Math.random() * player.mains.length);

      const spin = () => {
        activeMainIndex = counter % player.mains.length;
        player.activeFighter = player.mains[activeMainIndex];

        if (counter === countTo) {
          this.isRolling = false;

          if (player.lastRoll === player.activeFighter.name && player.preventRerolls && player.mains.length > 1) {
            this.rollTheDie(player);
            return;
          }

          player.lastRoll = player.activeFighter.name;

          return;
        }

        const progress = counter / countTo;
        const delay = 30 + Math.pow(progress, 3) * 100;

        counter++;
        setTimeout(spin, delay);
        
      };

      spin();
    },
    playRollSoundAdvanced() {
      const soundFiles = [
        //'dkc_bonus_win.mp3',
        //'mario_levelclear.mp3',
       // 'mk64_racestart.mp3',
        //'sonic2_stageclear.mp3',
        //'streetfighter_victory.mp3',
       // 'wily_fortress.mp3',
        //'megamanx_stageclear.mp3',
       // 'zelda_chest_open.mp3',
       // 'countdown.mp3',
        'dr_who.mp3',
        'caramel.mp3',
        'casualty.mp3',
        'dialup.mp3',
        'eastenders1.mp3',
        'eastenders2.mp3', //this one is fire
        'roundabout.mp3',
        'shootingstars1.mp3',
        'shootingstars3.mp3',
        'thx.mp3',
       // 'wiisports.mp3',
       // 'windowsXPerror.mp3',
        'xfiles.mp3',
        'xfilesclipped.mp3'
      ];

      try {
        const randomIndex = Math.floor(Math.random() * soundFiles.length);
        const soundPath = `src/assets/audio/${soundFiles[randomIndex]}`;

        const audio = new Audio(soundPath);
        audio.play().catch(error => {
          console.error("Error playing sound:", error);
        });
      } catch (error) {
        console.error("Error creating audio object:", error);
      }
    },



    calculateFirstPlayer() {
      this.playerOne.goingFirst = false;
      this.playerTwo.goingFirst = false;
      this.playerThree.goingFirst = false;

      this.firstPlayer = Math.floor(Math.random() * 3) + 1;
      setTimeout(() => {
        switch (this.firstPlayer) {
          case 1:
            this.playerOne.goingFirst = true;
            break;
          case 2:
            this.playerTwo.goingFirst = true;
            break;
          case 3:
            this.playerThree.goingFirst = true;
            break;
          default:
            break;
        }
      }, 8000);
    },
    addDicelist() {
      this.numberOfDicelists++;
    },
    removeDicelist() {
      this.numberOfDicelists--;
    },
    setShowDungeonTrue() {
      this.showDungeon = true;
    },
    setShowDungeonFalse() {
      this.showDungeon = false;
    },
    toggleShowDungeon() {
      this.showDungeon = !this.showDungeon;
    },
    async changeBackground() {
      this.getMatchHistory()
      this.$emit("change-bg")
      this.triggerMarquee("Text to display")
    },
    toggleData() {
      this.showData = !this.showData
    },
    toggleMute() {
      this.muted = !this.muted;
    },
    setGameWinner(winnerName) {
      this.winnerName = winnerName;
    }
  },

  mounted() {
    //commented out for testing - uncomment when live to populate on load
    //this.populateWinsData();

    this.$bus.$on("set-winner", this.setGameWinner)
  },

  beforeDestroy() {
    //this.$bus.$off("set-winner", this.setGameWinner)
  },

  computed: { 
    noMains() {
      return (this.playerOne.mains.length === 0 || this.playerTwo.mains.length === 0) || this.playerOne.mains.length ===0;
    },
    firstPlayerText() {
      const names = {
        1: "Els",
        2: "JJ",
        3: "Rob"
      };
      return names[this.firstPlayer] + " on the play";
    }
  }
};
</script>

<style lang="scss" scoped>
.v-fnmboard {
  display: flex;
  width: 100%;
  justify-content: center;
  padding-block: 20px;

}

.roster {
  flex-basis: 25%;
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: center;
}

.middle-panel {
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5%;
}

.reset {
  position: absolute;
  bottom: 8px;
  margin-inline: auto;
}

.image-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 10px;
}

.char-image {
  width: 220px;
  height: 240px;
  align-items: center;
  object-fit: contain;

  &.JJ-no-active-fighter {
    filter: hue-rotate(210deg);
  }
}

.vs-image {
  max-width: 30%;
  height: auto;
  align-items: center;
}

.roll-button-container {
  display: flex;
  flex-direction: column;
  gap: 36px;
  align-items: center;
  width: 100%;
  margin-top: 4%;
}

.plus-minus-buttons {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 12px
}

.dicelist-panel {
  display: flex;
  flex-basis: 0%;
  max-width: 25%;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 1;
  //width: 100%;
  gap: 16px;

  >div {
    justify-content: center;
    top: 200px;
  }
}

.dungeon-panel {
  display: flex;
  flex-basis: 0%;
  min-width: 35%;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 1;
  gap: 16px;

  >div {
    justify-content: center;
    top: 200px;
  }
}

@keyframes colour-cycle {
  0% { color: #FBAF00; }
  20% { color: #FFD639; }
  40% { color: #FFA3AF; }
  60% { color: #007CBE; }
  80% { color: #00AF54; }
  100% { color: #FBAF00; }
}

.texty {
  animation: colour-cycle 30s infinite ease-in;
  font-weight: bold;
  //background-color: var(--greyscale-10);
}

.options-buttons {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.marquee {
  position: fixed;
  top: 5%;
  right: -100%; 
  transform: translateX(-100%); /* truly center */
  background-color: rgba(0, 0, 0, 0.8);
  font-size: 72px;
  font-weight: bold;
  white-space: pre-line; /* respect \n for line breaks */
  text-align: center; /* center text */
  z-index: 100;
  animation: colour-cycle 30s infinite ease-in; /* keep your colour cycle */
  padding: 8px 32px;
  border-radius: 32px;


}

.marquee-active {
  position: fixed;
  top: 5%;
  right: -80%; /* start off-screen */
  transform: translateX(-100%); /* truly center */
  display: inline-block;
  background-color: rgba(0,0,0,0.8);
  font-size: 72px;
  font-weight: bold;
  white-space: pre-line; /* respect \n */
  text-align: center;
  border-radius: 32px;
  z-index: 100;
  animation: slideInOut 20s ease-in-out forwards, colour-cycle 5s infinite ease-in;
}


@keyframes slideInOut {
  0% {
    right: -100%;
  }
  100% {
    right: 100%; /* Teleport back to start */
  }
}



.alert {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  font-weight: bold;
  white-space: pre-line; /* respect \n for line breaks */
  text-align: center; /* center text */
  animation: colour-cycle 30s infinite ease-in; /* keep your colour cycle */
  border-radius: 32px;
  padding: 8px 32px;
    left: 1%;
    top:1%;
    font-size: 32px;
    opacity: 0.3;
    scale: 1;
    line-height: 200%;

    :hover {
    opacity: 1;
    }

}

.alert:hover {
    opacity: 1;

}

.alert-active {
  position: fixed;
  display: inline-block;
  background-color: rgba(0,0,0,0.8);
  animation: minMaximise 18s, colour-cycle 5s infinite ease-in;
}


@keyframes fadeInOut {
  0% {
    opacity: 0;
    z-index: 100;
    scale: 1;
  }

  20% {
    opacity: 1;
    scale: 1.5;
  }

  80% {
    opacity: 1;
    scale: 1.5;
  }

  99% {
    opacity: 0;
    z-index: 100;
    scale: 1;
  }

  100% {
    opacity: 0;
    z-index: -100;
    scale: 1;
  }
}

@keyframes minMaximise {
  0% {
    left: 1%;
    top:1%;
    z-index: 100;
    scale: 1;
  }

  20% {
    left: 35%;
    top:  40%;
    opacity: 1;
    z-index: 100;
    scale: 2;
    
  }

  80% {
    left: 35%;
    top:  40%;
    opacity: 1;
    z-index: 100;
    scale: 2;

  }

  100% {
    left: 1%;
    top:1%;
    opacity: 0.3;
    z-index: 100;
    scale: 1;

  }
}
</style>