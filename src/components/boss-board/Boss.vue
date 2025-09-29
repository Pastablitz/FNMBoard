<template>
  <div :class="this.eldenplayer.hasBeaten(boss.name) ? 'v-beaten-boss' : 'v-boss'" :style="activeBossStyles" @click="toggleMain(boss)">
    <img class="bossImg" :src="boss.iconPath" />
    <span class="name">{{ boss.name }}</span>
    <button type="button" :class="['favourite', { 'active': eldenplayer.hasFave(boss) }]" :style="favouriteBossStyles"
      @click.stop="eldenplayer.toggleFave(boss)">
      <v-icon type="heart" />
    </button>
    <button type="button" :class="['favourite', { 'active': eldenplayer.hasBeaten(boss) }]" :style="beatenBossStyles"
      @click.stop="eldenplayer.toggleBeaten(boss)">
      <v-icon type="ghost" />
    </button>
  </div>
</template>

<script>

export default {
  props: {
    boss: { Boss },
    eldenplayer: { EldenPlayer },
    selectable: { type: Boolean },
    palette: { Palette }
  },
  data() {
    return {

    }
  },
  methods: {
    toggleMain(boss) {
      if (!this.selectable) return;
      this.eldenplayer.toggleMain(boss)
      this.$emit("selected")

    }
  },
  computed: {

    bossboardStyles() {
      return {
        backgroundColor: `var(--${BossboardPalette.colour7})`
      };
    },
    activeBossStyles() {
      if (this.eldenplayer.activeBoss?.name !== this.boss.name) return {
        'background-color': `var(--${BossboardPalette.chosenPalette}${this.eldenplayer.secondaryColourNum})`,
        'color': `var(--${BossboardPalette.chosenPalette}${this.eldenplayer.primaryColourNum})`
      };

      return {
        'background-color': `var(--${BossboardPalette.chosenPalette}${this.eldenplayer.primaryColourNum})`,
        'color': `var(--${BossboardPalette.colour1})`,
        'box-shadow': `var(--${BossboardPalette.colour1})`
      };
    },
    favouriteBossStyles() {
      if (!this.eldenplayer.hasFave(this.boss)) return "";
      if (this.eldenplayer.hasBeaten(this.boss)) return {
      //'color': `var(--${this.eldenplayer.colour}-primary)`
      'color': `var(--${this.palette}6)`
    };
      return {
      //'color': `var(--${this.eldenplayer.colour}-primary)`
      'color': `var(--${this.palette}6)`

    };
  },
  beatenBossStyles() {
    if (!this.eldenplayer.hasBeaten(this.boss)) return "";

    return {
      // 'color': `var(--${this.eldenplayer.colour}-primary)`
      'color': `var(--${this.palette}1)`

    };
  }
}
}
</script>

<style lang="scss" scoped>
.v-boss {
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  padding: 8px;
  padding-right: 12px;
  max-height: 400px;
  max-width: 400px;
  cursor: pointer;

  &:hover {
    background-color: var(--greyscale-90);

    .favourite {
      opacity: 1;
    }
  }
}

.v-beaten-boss {
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  padding: 8px;
  padding-right: 112px;
  max-height: 400px;
  max-width: 400px;
  cursor: pointer;

  &:hover {
    background-color: var(--greyscale-70);

    .favourite {
      opacity: 1;
    }
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

.bossImg {
  max-height: 45px;
  max-width: 45px;
}

@keyframes wobble-animation {

  0%,
  100% {
    transform: scale(1.1); //rotate(-8deg);
  }

  50% {
    transform: scale(0.9); //rotate(8deg);
  }
}
</style>