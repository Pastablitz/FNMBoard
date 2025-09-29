<template>
  <div class="v-bossboard-background" :style="bossboardStyles">
    <div class="v-bossboard">
      <v-bossplate class="boss-roster" :eldenplayer="playerOne" @name-click="rollTheDie(playerOne)"
        @set-faves="playerOne.resetMains()" />
      <div class="middle-panel">
        <v-button @click="rollTheDice" :icon="isRolling ? 'spinner' : 'refresh'" :disabled="noMains || isRolling"
          dark />
        <div class="image-row">
          <img :src="!playerOne.activeBoss ? playerOneDieImage : playerOne.activeBoss.imagePath" class="char-image" />
          <img :src="vsImage" class="vs-image" />
          <img :src="!playerTwo.activeBoss ? playerTwoDieImage : playerTwo.activeBoss.imagePath"
            :class="['char-image', { 'p2-no-active-boss': !playerTwo.activeBoss }]" />
        </div>
      </div>
      <v-bossplate class="boss-roster" :eldenplayer="playerTwo" @name-click="rollTheDie(playerTwo)"
        @set-faves="playerTwo.resetMains()" />
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      playerOne: EP1,
      playerTwo: EP2,
      isRolling: false,
      vsImage: "src/assets/vs-img.png",
      playerOneDieImage: "src/assets/misc-images/GoldenOrder.png",
      playerTwoDieImage: "src/assets/misc-images/GoldenOrder.png"
    }
  },
  methods: {
    rollTheDice() {
      this.rollTheDie(this.playerOne);
      this.rollTheDie(this.playerTwo);
    },
    rollTheDie(eldenplayer) {
      this.isRolling = true;
      const randomMainIndex = Math.floor(Math.random() * eldenplayer.mains.length);
      let activeMainIndex = 0;
      const countTo = 60 + randomMainIndex
      let counter = Math.floor(Math.random() * eldenplayer.mains.length);
      const isRollBeaten = (eldenplayer.lastRoll && eldenplayer.hasBeaten(eldenplayer.lastRoll));
      
      const spin = () => {
        activeMainIndex = counter % eldenplayer.mains.length;
        eldenplayer.activeBoss = eldenplayer.mains[activeMainIndex];
        const doesLastRollExistInBeaten = eldenplayer.beaten.some(beatenBoss => {return beatenBoss.name === eldenplayer.activeBoss.name;})

        if (counter === countTo) {
          this.isRolling = false;
          
          //if preventRerolls AND ignoreBeaten
          if (eldenplayer.lastRoll === eldenplayer.activeBoss.name && eldenplayer.preventRerolls
          && eldenplayer.beaten.some(beatenBoss => beatenBoss.name === eldenplayer.activeBoss.name) && eldenplayer.ignoreBeaten && eldenplayer.mains.length > 1) {
            this.rollTheDie(eldenplayer);
            console.log("1")
            console.log(eldenplayer.lastRoll,eldenplayer.activeBoss.name,eldenplayer.preventRerolls, eldenplayer.beaten, eldenplayer.ignoreBeaten)
            return;
          }

          //if just preventRerolls
          if (eldenplayer.lastRoll === eldenplayer.activeBoss.name && eldenplayer.preventRerolls && eldenplayer.mains.length > 1) {
            this.rollTheDie(eldenplayer);
            console.log("2")
            console.log(eldenplayer.lastRoll,eldenplayer.activeBoss.name,eldenplayer.preventRerolls, eldenplayer.beaten, eldenplayer.ignoreBeaten)
            return;
          }

          //if just ignoreBeaten
            if (eldenplayer.beaten.some(beatenBoss => beatenBoss.name === eldenplayer.activeBoss.name) && eldenplayer.ignoreBeaten && eldenplayer.mains.length > 1) {
            this.rollTheDie(eldenplayer);
            console.log("3")
            console.log(eldenplayer.lastRoll,eldenplayer.activeBoss.name,eldenplayer.preventRerolls, eldenplayer.beaten, eldenplayer.ignoreBeaten)
            return;
          }

          if (eldenplayer.lastRoll === eldenplayer.activeBoss.name && eldenplayer.preventRerolls && eldenplayer.mains.length > 1) {
            this.rollTheDie(eldenplayer);
            console.log("4")
            return;
          }

          eldenplayer.lastRoll = eldenplayer.activeBoss.name;
          return;
        }

        const progress = counter / countTo;
        const delay = 30 + Math.pow(progress, 3) * 100;

        counter++;
        setTimeout(spin, delay);
      };

      spin();
    }
  },

  computed: {
    noMains() {
      return this.playerOne.mains.length === 0 || this.playerTwo.mains.length === 0;
    },


    bossboardStyles() {

      return {
        'color': `var(--${BossboardPalette.colour1})`,
        'background-color': `var(--${BossboardPalette.colour3})`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.v-bossboard {
  display: flex;
  gap: 16px;
  justify-content: center;
  padding-block: 20px;

}

.v-bossboard-background {
  height: 100%;
  width: 100%;
  // transition: background-color 200ms ease-in-out;
}

.boss-roster {
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

  &.p2-no-active-boss {
    filter: hue-rotate(210deg);
  }
}

.vs-image {
  max-width: 30%;
  height: auto;
  align-items: center;
}
</style>