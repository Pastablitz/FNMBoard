<template>
  <div
    :class="['v-fighter', this.player.activeFighter?.name === this.fighter.name ? 'fast-colour-cycle' : 'colour-cycle']"
    :style="fighterStyles" @click="toggleMain(fighter)">
    <!-- <img :src="fighter.deckImagePath" class="fighter-icon" /> -->
    <div
     :class="['name', this.player.activeFighter?.name === this.fighter.name ? 'fast-colour-cycle' : 'colour-cycle']">
      {{ fighter.name }} <br />
      {{
        (getDeckScore(fighter.name) < 200   ? '•' : 
        getDeckScore(fighter.name) < 800    ? '✶' : 
        getDeckScore(fighter.name) < 1200   ? '✷' 
                                            : '✹') + ' ' +
        getDeckScore(fighter.name) }} </div>
        <button v-if="this.player.activeFighter?.name === this.fighter.name" type="button"
      :class="['crown', { 'active': this.fighter.name === this.winner }]" :style="favouriteFighterStyles"
      @click.stop="setWinner(fighter)">
      <v-icon type="crown" size="50" class="crownIcon" />
    </button>
    <button type="button" :class="['favourite', { 'active': player.hasFave(fighter) }]" :style="favouriteFighterStyles"
      @click.stop="player.toggleFave(fighter)">
      <v-icon type="heart" />
    </button>
    <div
      :class="['stats', { 'hidden': !showData }, this.player.activeFighter?.name === this.fighter.name ? 'fast-colour-cycle' : 'colour-cycle']">
      <div style="font-size:14px"> <!-- Wins: {{ this.fighterWins }} <br /> -->
        Power Level: {{ getDeckScore(fighter.name) }} <br />
        Wins: {{ getWins(fighter.name) }} <br />
        <!-- Best Streak: {{ getBestStreak(fighter.name) }} <br /> -->
        Games: {{ getGamesPlayed(fighter.name) }} <br />
        <!-- Last Played: {{ getLastPlayed(fighter.name) }} <br /> -->
        Streak: {{ getCurrentStreak(fighter.name) }} <br />
        Win Ratio: {{ getWinRatio(fighter.name) }}% 
      </div>
      <div>
        <!-- stats on right side of stat box go here if needed  -->

      </div>
    </div>
  </div>
</template>

<script>
import { GoogleSheetsService, GameDataService } from '@/googleSheetsService.js'

export default {
  props: {
    fighter: { Fighter },
    player: { Player },
    selectable: { type: Boolean },
    winsData: {
      type: Array,
      default: () => []
    },
    winstreakData: {
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
      //imgUrl: `url('${this.fighter.deckImagePath}')`
      wins: 0,
      winner: 'test'
    }
  },
  methods: {

    toggleMain(fighter) {
      if (!this.selectable) return;
      this.player.toggleMain(fighter)
      this.$emit("selected")
    },

    setWinner() {
      console.log('setting winner: ' + this.fighter.name)
      this.$bus.$emit("set-winner", this.fighter.name)
    },

    handleWinnerSet(winnerName) {
      this.winner = winnerName;
    },

    getWins(deckName) {
      const deck = this.statsData.find(d => d.name === deckName);
      return deck ? deck.wins : 0;
    },

    getCurrentStreak(deckName) {
      const deck = this.statsData.find(d => d.name === deckName);
      return deck ? deck.currentStreak : 0;
    },

    getBestStreak(deckName) {
      const deck = this.statsData.find(d => d.name === deckName);
      return deck ? deck.bestStreak : 0;
    },

    getGamesPlayed(deckName) {
      const deck = this.statsData.find(d => d.name === deckName);
      return deck ? deck.gamesPlayed : 0;
    },

    getLastPlayed(deckName) {
      const deck = this.statsData.find(d => d.name === deckName);
      if (!deck || !deck.lastPlayed) return "?";

      const date = new Date(deck.lastPlayed);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    },

    getDeckScore(deckName) {
      const deck = this.statsData.find(d => d.name === deckName);
      return deck ? Math.round(deck.weightedScore) : 0;
    },

    getWinRatio(deckName) {
      const deck = this.statsData.find(d => d.name === deckName);
      if (!deck || deck.gamesPlayed === 0) return 0;
      return Math.round((deck.wins / deck.gamesPlayed) * 100);
    }



  },


  computed: {

    isWinner() {
      return this.winner === this.fighter.name;
    },

    fighterStyles() {
      const baseStyles = {
        backgroundImage: `url('${this.fighter.deckImagePath}')`,
        backgroundSize: '300px',
        backgroundPosition: `${this.fighter.position}`,
        boxShadow: `5px 0 10px black`,
        '--shadow': `var(--${this.player.colour}-dark)`,
      };

      if (this.player.activeFighter?.name === this.fighter.name) {
        return {
          ...baseStyles,
          backgroundColor: `var(--${this.player.colour}-light)`,
          boxShadow: `0px 0px 12px 12px var(--${this.player.colour}-primary)`,
          animation: 'blink 2s',
          animationFillMode: 'forwards',
          animationDirection: 'alternate'
        };
      }

      return baseStyles;
    },
    favouriteFighterStyles() {
      if (!this.player.hasFave(this.fighter)) return "";

      return {
        'color': `var(--${this.player.colour}-primary)`
      };
    },

    fighterWins() {
    return (this.winsData || []).filter(
      w => String(w).toLowerCase() === this.fighter.name.toLowerCase()
    ).length
  },

      fighterCurrentStreak() {
    return (this.winstreakData || []).filter(
      w => String(w).toLowerCase() === this.fighter.name.toLowerCase()
    ).length
  }

  },


  mounted() {
    this.$bus.$on("set-winner", this.handleWinnerSet)
  },
  beforeDestroy() {
    this.$bus.$off("set-winner", this.handleWinnerSet)
  }


}
</script>

<style lang="scss" scoped>
.v-fighter {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 100px;
  border-radius: 8px;
  padding-right: 12px;
  background-color: black;
  justify-content: space-between;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: var(--greyscale-90);

    .favourite {
      opacity: 1;
    }

    .crown {
      opacity: 1;
    }
  }



}

.fighter-icon {
  width: 90px;
  align-items: center;
  object-fit: contain;
  border-radius: 8px;

  &.JJ-no-active-fighter {
    filter: hue-rotate(210deg);
  }
}

.name,
.stats {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 4px 12px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  padding-inline: 5%;
  
}

.name {
  font-size: 16px;
  font-weight: 600;
  user-select: none;
  line-height: 100%;
  text-align: center;
  margin-left: 10px;
  margin-right: 72px;
  width: fit-content;

}

.stats {
  position: absolute;
  left: 105%;
  height: 100px;
  align-content: center;
  z-index: -1;
  line-height: 1.4;
  transform: translateZ(0);
  font-size: 14px;
  transition: transform 0.3s ease, opacity 0.3s ease;
  width: max-content;
  
  &.hidden {
    transform: translateX(-120px);
    opacity: 0;
  }
}

.favourite {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: var(--greyscale-70);
  opacity: 0;

  &.active {
    opacity: 1;

    &:hover {
      animation: none;
    }
  }

  &:hover {
    animation: wobble-animation 1s ease-in-out infinite alternate;
  }
}

.crown {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: var(--greyscale-70);
  opacity: 0;
  position: absolute;
  right: 20%;
  filter: drop-shadow(0px 0px 1.5px rgb(255, 255, 255));
  //--hammach: 1px;
  // filter: 
  //   drop-shadow(1px 1px 0px rgba(255,255,255,0.5)) 
  //   drop-shadow(1px -1px 0px rgba(255,255,255,0.5))
  //   drop-shadow(-1px 1px 0px rgba(255,255,255,0.5)) 
  //   drop-shadow(-1px -1px 0px rgba(255,255,255,0.5))
  //   drop-shadow(1px 1px var(--hammach) var(--shadow)) 
  //   drop-shadow(1px -1px var(--hammach) var(--shadow)) 
  //   drop-shadow(-1px 1px var(--hammach) var(--shadow)) 
  //   drop-shadow(-1px -1px var(--hammach) var(--shadow));
  //filter: drop-shadow(1px 1px 1px white) drop-shadow(-1px -1px 1px red) drop-shadow(1px -1px 1px blue) drop-shadow(-1px 1px 1px green);


  .button {
    height: 50px;
    width: 50px;
    
  }

  &.active {
    opacity: 1;

    &:hover {
      animation: none;
    }
  }

  &:hover {
    animation: wobble-animation 1s ease-in-out infinite alternate;
  }

  
}

.crownIcon {
  height: 50px;
  width: 50px;
}

@keyframes wobble-animation {
  0%, 100% {
    transform: scale(1.1); //rotate(-8deg);
  }
  50% {
    transform: scale(0.9); //rotate(8deg);
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
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
  animation: colour-cycle 31s infinite ease-in;
  font-weight: bold;
}

.fast-colour-cycle {
  animation: colour-cycle 0.5s infinite ease-in;
  font-weight: bold;
}
</style>