<template>
  <div class="roll-button-container">
    <v-button @click="rollTheDice(), rollDicelist(), playRollSoundAdvanced(), calculateFirstPlayer(), changeBackground(), populateWinsData()"
      :icon="isRolling ? 'spinner' : 'refresh'" :disabled="noMains || isRolling || isSaving" dark />
    <div class="v-fnmboard">
      <v-nameplate :class="['roster']" :player="playerOne" @name-click="rollTheDie(playerOne)"
        @set-faves="playerOne.resetMains()" @clear-mains="playerOne.clearMains()" ref="np1" :wins-data="winsData" :show-data="showData"/>
      <v-nameplate class="roster" :player="playerTwo" @name-click="rollTheDie(playerTwo)"
        @set-faves="playerTwo.resetMains()" @clear-mains="playerTwo.clearMains()" ref="np2" :wins-data="winsData" :show-data="showData"/>
      <v-nameplate class="roster" :player="playerThree" @name-click="rollTheDie(playerThree)"
        @set-faves="playerThree.resetMains()" @clear-mains="playerThree.clearMains()" ref="np3" :wins-data="winsData" :show-data="showData"/>
      <div class="plus-minus-buttons">
        <v-button icon="contact-card" primary @click="toggleData()" title="View Stats"> </v-button>
        <v-button icon="sun" primary @click="changeBackground()" title="Change Background"> </v-button>
        <v-button icon="search-history" primary @click="populateWinsData()" title="Populate Win Data"> <span> {{ winsData.length }}</span></v-button>
        <v-button :icon="isSaving ? 'spinner' : 'save'" primary @click="logGame()" title="Log Game"></v-button>
        <v-button icon="plus" primary @click="addDicelist()" title="Add Dicelist" v-if="numberOfDicelists <= 0"
          :disabled="numberOfDicelists >= 1"></v-button>
        <v-button icon="minus" negative @click="removeDicelist()" title="Remove Dicelist" v-if="numberOfDicelists >= 1"
          :disabled="numberOfDicelists <= 0"></v-button>
      </div>
      <div class="dicelist-panel">
        <v-dicelist v-for="n in numberOfDicelists" :key="n" :listID="'list-' + n" ref="dicelist" />
      </div>
    </div>
  </div>
      <!-- <div class="middle-panel"> make this like the menu that drops down from off screen but make it whip on from the side or marquee or something
      <div class="image-row">
         <img :src="!playerOne.activeFighter ? playerOneDieImage : playerOne.activeFighter.imagePath"
          class="char-image" /> 
         <img :src="vsImage" class="vs-image" /> 
         <img :src="!playerTwo.activeFighter ? playerTwoDieImage : playerTwo.activeFighter.imagePath"
          :class="['char-image', { 'ジョシュ-no-active-fighter': !playerTwo.activeFighter }]" /> 
      </div>
    </div> -->
</template>

<script>
import { GoogleSheetsService, GameDataService } from '@/googleSheetsService.js'

export default {
  data() {
    return {
      playerOne: エリオ,
      playerTwo: ジョシュ,
      playerThree: ロブ,
      isRolling: false,
      isSaving: false,
      vsImage: "src/assets/vs-img.png",
      playerOneDieImage: "src/assets/misc-images/SmashLogoRed.png",
      playerTwoDieImage: "src/assets/misc-images/SmashLogoRed.png",
      playerThreeDieImage: "src/assets/misc-images/SmashLogoRed.png",
      firstPlayer: 1,
      numberOfDicelists: 0,
      SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyoELRWsn-pyumiVjLoWn9GsIXqnv9dKbHvJnakDuaNNY5XvAgb-aX9aqd1Kffh4SQf/exec',
      deckWins: 0,
      winsData: [],
      showData: false
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
      const result = await GoogleSheetsService.readRange('E3:E200');
      if (result.success) this.winsData = result.data;
    },

    async logGame() {
      this.isSaving = true;
      if (!エリオ.activeFighter || !ジョシュ.activeFighter || !ロブ.activeFighter) {
        console.warn("active fighters missing");
        this.isSaving = false; // Don't forget to reset this!
        return;
      }

      try {
        await GoogleSheetsService.addToColumn('F', エリオ.activeFighter.name);
        await GoogleSheetsService.addToColumn('G', ジョシュ.activeFighter.name);
        await GoogleSheetsService.addToColumn('H', ロブ.activeFighter.name);
        await GoogleSheetsService.addToColumn('I', new Date().toLocaleString());

        await this.populateWinsData(); 

        console.log('Game logged successfully');
      } catch (error) {
        console.error('Failed to log game:', error);
      } finally {
        this.isSaving = false; 
      }
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
        'countdown.mp3',
        'dkc_bonus_win.mp3',
        'mario_levelclear.mp3',
        'mk64_racestart.mp3',
        'sonic2_stageclear.mp3',
        'streetfighter_victory.mp3',
        'wily_fortress.mp3',
        'zelda_chest_open.mp3',
        'megamanx_stageclear.mp3',
        'dr_who.mp3'
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
    changeBackground() {
      this.$emit("change-bg")
    },
    toggleData() {
      this.showData = !this.showData
    }

  },

  mounted() {
    //this.populateWinsData();
  },

  computed: {
    noMains() {
      return (this.playerOne.mains.length === 0 || this.playerTwo.mains.length === 0) || this.playerOne.mains.length ===0;
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

  &.ジョシュ-no-active-fighter {
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
  gap: 12px;
  align-items: center;
  width: 100%;
  margin-top: 5%;
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

</style>