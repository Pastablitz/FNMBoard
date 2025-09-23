<template>
  <div class="v-nameplate">
    <span :class="[player.goingFirst ? 'fast-colour-cycle' : 'colour-cycle', 'player-name']" @click="nameClick">
      {{ player.name }}
    </span>
    <div class="mains" >
      <div v-for="fighter in player.mains" @dblclick="player.activeFighter = fighter" >
        <v-fighter v-bind:fighter="fighter" :fighter="fighter"  :player="player" ref="fighter" :wins-data="winsData" 
        :show-data="showData" :stats-data="statsData" />
        <v-button @click="player.toggleMain(fighter)" icon="close" negative xsmall />
      </div>
    </div>
    <div class="buttons-container">
      <v-button class="set-faves-btn" icon="heart" @click="setFaves" :yellow="player.name === 'エリオ'"
        :primary="player.name === 'ジョシュ'" :positive="player.name === 'ロブ'" small />
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

</style>