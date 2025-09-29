<template>
  <div class="v-bossplate">
    <span @click="nameClick">{{ eldenplayer.name }}</span>
    <!--<span class="name">{{ fighter.name }}</span>-->
    <div class="mains">
      <div v-for="(boss, index) in eldenplayer.mains" :key="index">
        <v-boss :boss="boss" :eldenplayer="eldenplayer" />
        <v-button @click="eldenplayer.toggleMain(boss)" icon="close" negative xsmall />
      </div>
      <v-bossroster-modal :eldenplayer="eldenplayer" />
    </div>
    <div class="set-faves-container">
      <v-button class="set-faves-btn" icon="mask-happy" @click="setFaves" :style="setFavesButtonStyles" small dark />
      <v-toggle v-model="eldenplayer.ignoreBeaten">Ignore Beaten</v-toggle>
      <v-toggle v-model="eldenplayer.preventRerolls">Prevent Rerolls</v-toggle>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    eldenplayer: { type: EldenPlayer }
  },
  computed: {
    setFavesButtonStyles() {
      return [
        { 'background-color': `var(--${BossboardPalette.chosenPalette}${this.eldenplayer.primaryColourNum})` },
        { 'color': `var(--${BossboardPalette.colour7})` }
        // {'box-shadow': `0px 0px 4px 3px var(--${BossboardPalette.colour7}))`}
      ];
    },
    togglePreventRerollsButtonStyles() {
      const styles = [
        { 'background-color': `var(--${BossboardPalette.chosenPalette}${this.eldenplayer.primaryColourNum})` },
        { 'color': `var(--${BossboardPalette.colour7}` },
        { 'box-shadow': `0px 0px 0px 0px var(--${BossboardPalette.colour7})` }
      ];

      if (this.eldenplayer.preventRerolls) {
        styles.push({ 'box-shadow': `0 0 4px 3px var(--${BossboardPalette.colour7})` });
      }

      return styles;
    },
    toggleIgnoreBeatenButtonStyles() {
      const styles = [
        { 'background-color': `var(--${BossboardPalette.chosenPalette}${this.eldenplayer.primaryColourNum})` },
        { 'color': `var(--${BossboardPalette.colour7}` },
        { 'box-shadow': `0px 0px 0px 0px var(--${BossboardPalette.colour7})` }
      ];

      if (this.eldenplayer.ignoreBeaten) {
        styles.push({ 'box-shadow': `0 0 4px 3px var(--${BossboardPalette.colour7})` });
      }

      return styles;
    }
  },
  methods: {
    nameClick() {
      this.$emit("name-click")
    },
    setFaves() {
      this.$emit("set-faves")
    },
    togglePreventRerolls() {
      this.eldenplayer.preventRerolls = !this.eldenplayer.preventRerolls;
    },
    toggleIgnoreBeaten() {
      this.eldenplayer.ignoreBeaten = !this.eldenplayer.ignoreBeaten;
    }
  }
}
</script>

<style lang="scss" scoped>
.v-bossplate {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  gap: 20px;
  position: relative; // Add this line

  >span {
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
  margin-top: auto;
}

.toggle-ignore-btn {
  align-self: center;
  margin-top: auto;
}

.set-faves-container {
  display: flex;
  gap: 20px;
  align-self: center;
  margin-top: auto;
}

.mains {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;

  >div {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 240px;
    position: relative;

    .v-boss {
      flex-grow: 1;
    }

    .v-button {
      position: absolute;
      right: calc(100% + 8px);
      transform: scale(0.6);
    }
  }
}
</style>