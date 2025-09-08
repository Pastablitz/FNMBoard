<template>
  <div class="v-fighter" :style="activeFighterStyles" @click="toggleMain(fighter)">
    <img :src="fighter.deckImagePath" class="fighter-icon" />
    <span class="name">{{ fighter.name }}</span>
    <button type="button" 
      :class="['favourite', { 'active': player.hasFave(fighter) }]" 
      :style="favouriteFighterStyles"
      @click.stop="player.toggleFave(fighter)">
      <v-icon type="heart" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    fighter: { Fighter },
    player: { Player },
    selectable: { type: Boolean }
  },
  data() {
    return {
      
    }
  },
  methods: {
    toggleMain(fighter) {
      if (!this.selectable) return;
      this.player.toggleMain(fighter)
      this.$emit("selected")
    }
  },
  computed: {
    activeFighterStyles() {
      if (this.player.activeFighter?.name !== this.fighter.name) return "";

      return {
        'background-color': `var(--${this.player.colour}-light)`,
        'color': `var(--${this.player.colour}-dark)`,
        'box-shadow': `0px 0px 8px 3px var(--${this.player.colour}-primary)`,
        'animation': 'blink 2s',
            'animation-fill-mode': 'forwards',
    'animation-direction': 'alternate'
      };
    },
    favouriteFighterStyles() {
      if (!this.player.hasFave(this.fighter)) return "";

      return {
        'color': `var(--${this.player.colour}-primary)`
      };
    }
  }
}
</script>

<style lang="scss" scoped>
.v-fighter {
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  padding-right: 12px;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: var(--greyscale-90);

    .favourite {
      opacity: 1;
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

.name {
  flex-grow: 1;
  font-size: 16px;
  font-weight: 600;
  user-select: none;
  line-height: 100%;
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
</style>