<template>
  <div class="roll-button-container">
    <v-button @click="rollTheDice(), rollDicelist(), playRollSoundAdvanced()" :icon="isRolling ? 'spinner' : 'refresh'" :disabled="noMains || isRolling" dark />

    <div class="v-fnmboard">
      <v-nameplate :class="['roster', { firstPlayer === 1 ? 'fast-colour-cycle' : 'colour-cycle'  } ]" :player="playerOne" @name-click="rollTheDie(playerOne)"
        @set-faves="playerOne.resetMains()" @clear-mains="playerOne.clearMains()"/>
      <!-- <div class="middle-panel">
      <div class="image-row">
         <img :src="!playerOne.activeFighter ? playerOneDieImage : playerOne.activeFighter.imagePath"
          class="char-image" /> 
         <img :src="vsImage" class="vs-image" /> 
         <img :src="!playerTwo.activeFighter ? playerTwoDieImage : playerTwo.activeFighter.imagePath"
          :class="['char-image', { 'ジョシュ-no-active-fighter': !playerTwo.activeFighter }]" /> 
      </div>
    </div> -->
      <v-nameplate class="roster" :player="playerTwo" @name-click="rollTheDie(playerTwo)"
        @set-faves="playerTwo.resetMains()" @clear-mains="playerTwo.clearMains()"/>
      <v-nameplate class="roster" :player="playerThree" @name-click="rollTheDie(playerThree)"
        @set-faves="playerThree.resetMains()" @clear-mains="playerThree.clearMains()"/>
    <div><v-dicelist :key="n" :listID="'list-' + n" ref="dicelist" /></div>

    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      playerOne: エリオa,
      playerTwo: ジョシュ,
      playerThree: ロブ,
      isRolling: false,
      vsImage: "src/assets/vs-img.png",
      playerOneDieImage: "src/assets/misc-images/SmashLogoRed.png",
      playerTwoDieImage: "src/assets/misc-images/SmashLogoRed.png",
      playerThreeDieImage: "src/assets/misc-images/SmashLogoRed.png",
      firstPlayer: 1
    }
  },
  methods: {
    rollTheDice() {
      this.rollTheDie(this.playerOne);
      this.rollTheDie(this.playerTwo);
      this.rollTheDie(this.playerThree);
    },
    rollDicelist() {
      if (this.$refs.dicelist) {
        this.$refs.dicelist.rollTheDie();
      }
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
        'megamanx_stageclear.mp3'
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
       this.firstPlayer = Math.floor(Math.random() * 3) + 1;
    }
  

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


</style>