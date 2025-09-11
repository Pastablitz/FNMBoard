<template>
  <div class="v-diceboard">
    <div class="roll-button-container">
      <v-button icon="refresh" @click="rollAllDice(), !muted && playRollSound()" dark></v-button>
      <v-button class="clear-all-btn" icon="close" @click="clearAllLists()" dark xsmall />
    </div>
    <div class="dicelist-panel">
      <v-dicelist v-for="n in numberOfLists" :key="n" :listID="'list-' + n" ref="dicelist" />
    </div>
    <div class="plus-minus-buttons">
      <v-button icon="plus" primary @click="addDicelist()" :disabled="numberOfLists >= 4"></v-button>
      <v-button icon="minus" negative @click="removeDicelist()" :disabled="numberOfLists <= 1"></v-button>
    </div>
    <div class="options-buttons">
    <v-toggle icon="mute" v-model="muted">Mute</v-toggle>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numberOfLists: 4,
      muted: false
    }
  },
  methods: {
    addDicelist() {
      this.numberOfLists++;
    },
    removeDicelist() {
      this.numberOfLists--;
    },
    clearAllLists() {
      if (confirm("Bin every bastard list?")) {
        (this.$refs.dicelist || []).forEach(d => d.removeAll && d.removeAll(1));
      }
    },
    rollAllDice() {
      (this.$refs.dicelist || []).forEach(d => d.rollTheDie && d.rollTheDie());
    },
    playRollSound() {
      const rollSounds = {
        1: 'src/assets/audio/wheel_spin_1.mp3',
        2: 'src/assets/audio/wheel_spin_2.mp3',
        3: 'src/assets/audio/wheel_spin_3.mp3',
        4: 'src/assets/audio/wheel_spin_4.mp3'
      };

      try {
        const random = Math.random();
        let soundChoice;

        if (random < 0.25) {
          soundChoice = 1;
        } else if (random < 0.50) {
          soundChoice = 2;
        } else if (random < 0.75) {
          soundChoice = 3;
        } 
        else {
          soundChoice = 4;
        }
        const audio = new Audio(rollSounds[soundChoice]);
        audio.play().catch(error => {
          console.error("Error playing sound:", error);
        });
      } catch (error) {
        console.error("Error creating audio object:", error);
      }
    },
    toggleMute() {
      this.muted = !this.muted;
    }
  },
  computed:
  {
    
  }
}
</script>

<style lang="scss" scoped>
.v-diceboard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 5;
}

.dicelist-panel {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 16px;

  >div {
    justify-content: center;
    top: 200px;
  }
}

// .v-dicelist {
//   flex: auto;
//   min-width: 0;
//   max-width: 100%; 
//   margin-inline: 5px;
// }

.plus-minus-buttons {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 12px
}

.options-buttons {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.roll-button-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  width: 100%;
  margin-top: 3%;
}
</style>