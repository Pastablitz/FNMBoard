<template>
  <div class="v-nameplate">
    <div :class="['active-fighter-box']">
    <img :src="activeFighterImage" alt="Active Fighter" :class="{ 'blur-colour-cycle': player.goingFirst, 'floating': true }" :style="{ '--float-delay': floatDelay, '--float-duration': floatDuration }" />
    </div>
    <span :class="[player.goingFirst ? 'fast-colour-cycle' : 'colour-cycle', 'player-name']" @click="nameClick">
      {{ player.name }}
    </span>
    <div class="mains">
      <div v-for="fighter in player.mains" @dblclick="player.activeFighter = fighter">
        <v-fighter v-bind:fighter="fighter" :fighter="fighter" :player="player" ref="fighter" :wins-data="winsData"
          :show-data="showData" :stats-data="statsData" />
        <v-button @click="player.toggleMain(fighter)" icon="close" negative xsmall />
      </div>
    </div>
    <div class="buttons-container">
      <v-button class="set-faves-btn" icon="heart" @click="setFaves" :yellow="player.name === 'Els'"
        :primary="player.name === 'JJ'" :positive="player.name === 'Rob'" small />
      <v-roster-modal class="roster-button" :player="player" />
      <v-button class="clear-all-btn" icon="close" @click="clearMains()" negative small />
    </div>
  </div>
</template>

<script>
import { GoogleSheetsService, GameDataService } from '@/googleSheetsService.js'

export default {
  props: {
    player: { type: Player },
    wins: 0,
    winsData: {
      type: Array,
      default: () => []
    },
     statsData: {
      type: Array,
      default: () => []
    },
    showData: false
  },
  data() {
    return {
      floatDelay: `${Math.random() * 3}s`,
      floatDuration: `${(Math.random() * 3 + 5).toFixed(2)}s`
    }
  },
  methods: {
    nameClick() {
      this.$emit("name-click")
    },
    setFaves() {
      this.$emit("set-faves")
    },
    clearMains() {
      this.$emit("clear-mains")
    },
    updateAllFighterWins() {
      (this.$refs.fighter || []).forEach(d => d.countFighterWins());
    }
  },
  computed: {
  secondWinCheck() {
    return (this.winsData && this.winsData.length > 1)
      ? this.winsData[1]
      : null
  },
  mainStyles() {    
      return {
        color: `var(--${this.player.colour}-primary)`,
        boxShadow: `0px 0px 8px 10px var(--${this.player.colour}-primary)`
      };
    },
     activeFighterImage() {
    const name = this.player.activeFighter?.name;
    return name ? `src/assets/deck-imgs/${name}.jpg` : 'src/assets/deck-imgs/Mystery.jpg';
  }
}
}
</script>

<style lang="scss" scoped>
.v-nameplate {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 20px;
  justify-content: start;
  //position: relative;

  span {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
    letter-spacing: 0.5px;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    color: white;
    cursor: pointer;
    user-select: none;

    &:hover {
      opacity: 0.5;
    }
  }
}

.set-faves-btn {
  align-self: center;
  //margin-top: auto;
  //position: absolute;
  //bottom: 10px;
}

.buttons-container {
  display: flex;
  gap: 12px;
  align-self: center;
  align-items: center;
  position: absolute;
  bottom: 20px;
}

.mains {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  //height: 50%; //no longer in effect
  scrollbar-width: thin;
  scrollbar-gutter: stable both-edges;
  
  >div {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 240px;
    position: relative;

    .v-fighter {
      flex-grow: 1;
    }

    .v-button {
      position: absolute;
      right: calc(100% + 8px);
      transform: scale(0.6);
    }
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

.colour-cycle {
  animation: colour-cycle 30s infinite ease-in;
  font-weight: bold;
}

.fast-colour-cycle {
  animation: colour-cycle 0.5s infinite ease-in;
  font-weight: bold;
}

.roster-button {
 // position: absolute;
}

.player-name {
  background-color: rgba(0, 0, 0, 0.7); 
  padding: 4px 12px;
  border-radius: 4px;
  //display: inline-block; // Makes it only as wide as the text
  width: fit-content;
  align-self: center; 
}

.player-image {
  background-color: rgba(0, 0, 0, 0.7); 
  padding: 4px 12px;
  border-radius: 4px;
  //display: inline-block; // Makes it only as wide as the text
  width: fit-content;
  align-self: center; 
  
}

.active-fighter-box {
  display: flex;
  box-sizing: border-box;
  margin-inline: 20px;
  justify-content: center;
  max-height: 200px;
  
  >img {
    max-width: 80%;
    border-radius: 50px;
  }
}

.going-first {
  box-sizing: border-box;
}


@keyframes blur-colour-cycle {
  0% {    box-shadow: 0 0 50px 50px var(--yellow-primary); } // #FBAF00
  20% {   box-shadow: 0 0 50px 50px var(--blue-primary); } // #FFA3AF
  40% {   box-shadow: 0 0 50px 50px var(--green-primary); } // #ae1cc5
  60% {   box-shadow: 0 0 50px 50px var(--red-primary); } // #007CBE
  80% {   box-shadow: 0 0 50px 50px var(--purple-primary); } // #00AF54
  100% {  box-shadow: 0 0 50px 50px var(--yellow-primary); } // #FBAF00
}

@keyframes float {
	0% {
		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px);
	}
	50% {
		box-shadow: 0 25px 15px 0px rgba(0,0,0,0.2);
		transform: translatey(-20px);
	}
	100% {
		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px);
	}
}

.floating {
	animation: float var(--float-duration) ease-in-out infinite;
	animation-delay: var(--float-delay);
}

.floating.blur-colour-cycle {
	animation: float var(--float-duration) ease-in-out infinite, blur-colour-cycle 2s infinite ease-in;
	animation-delay: var(--float-delay);
}

.blur-colour-cycle {
  animation: blur-colour-cycle 2s infinite ease-in;
  font-weight: bold;
}
</style>