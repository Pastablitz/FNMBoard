<template>
  <div class="v-bossroster">
    <v-boss v-for="(boss, index) in player.bossroster" :key="index" :player="player" :boss="boss" />
  </div>
</template>

<script>
export default {
  props: {
    player: { type: Player }
  },
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>
.v-bossroster {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  padding: 8px;
}
</style>