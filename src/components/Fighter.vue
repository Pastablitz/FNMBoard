<template>
  <div :class="['v-fighter', this.player.activeFighter?.name === this.fighter.name ? 'fast-colour-cycle' : 'colour-cycle']" 
  :style="fighterStyles" @click="toggleMain(fighter)">
    <!-- <img :src="fighter.deckImagePath" class="fighter-icon" /> -->
    <div :class="['name', this.player.activeFighter?.name === this.fighter.name ? 'fast-colour-cycle' : 'colour-cycle']">
      {{ fighter.name }}
    </div>
    <button type="button" :class="['favourite', { 'active': player.hasFave(fighter) }]" :style="favouriteFighterStyles"
      @click.stop="player.toggleFave(fighter), countStringInRange()">
      <v-icon type="heart" />
    </button>
    <div  :class="['stats',{'hidden': !showData}, this.player.activeFighter?.name === this.fighter.name ? 'fast-colour-cycle' : 'colour-cycle']">
      Wins: {{ this.fighterWins }} <br/>
      Current Streak: <br/>
      Best Streak: <br/>
      Win Ratio: 
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
    showData: false
    
  },
  data() {
    return {
      //imgUrl: `url('${this.fighter.deckImagePath}')`
      wins: 0
    }
  },
  methods: {

     async countFighterWins() {
      const result = await GoogleSheetsService.countStringInRange('E3:E200', this.fighter.name);
      
      if (result.success) {
        this.wins = result.count;
        return result.count;
      } else {
        alert('Failed to count wins');
        return 0;
      }
    },

     countStringInRange() {
      console.log('called 4')
    
      const count = winsData.filter(item => 
        String(item) === this.fighter.name
      ).length;
      
      console.log(`"${this.fighter.name}" appears ${count} times in range ${range}`);
       
    
  },
    
    toggleMain(fighter) {
      if (!this.selectable) return;
      this.player.toggleMain(fighter)
      this.$emit("selected")
    }
  },
  computed: {
    fighterStyles() {
    const baseStyles = {
      backgroundImage: `url('${this.fighter.deckImagePath}')`,
      backgroundSize: '300px',
      backgroundPosition: `${this.fighter.position}`,
      boxShadow: `5px 0 10px black`
      
    };
    
    if (this.player.activeFighter?.name === this.fighter.name) {
      return {
        ...baseStyles,
        backgroundColor: `var(--${this.player.colour}-light)`,
       
        boxShadow: `0px 0px 8px 3px var(--${this.player.colour}-primary)`,
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
  }

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

  &:hover {
    background-color: var(--greyscale-90);

    .favourite {
      opacity: 1;
    align-self: right;   

    }
  }



}

.fighter-icon {
  width: 90px;
  align-items: center;
  object-fit: contain;
  border-radius: 8px;

  &.ジョシュ-no-active-fighter {
    filter: hue-rotate(210deg);
  }
}

.name,
.stats {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 4px 12px;
  border-radius: 4px;
  display: inline-block;
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
  line-height: 1.5;
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


@keyframes wobble-animation {
  0%, 100% {
    transform: scale(1.1); //rotate(-8deg);
  }
  50% {
    transform: scale(0.9); //rotate(8deg);
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1 !important; }
  50% { opacity: 0.3 !important; }
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