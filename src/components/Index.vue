<template>
<div class="v-index">
    <div
      v-for="(bg, i) in backgrounds"
      :key="i"
      class="background-layer"
      :style="{ backgroundImage: `url(${bg.url})`, opacity: bg.active ? 1 : 0 }"
          >
        </div>
    <v-menu class="clock"/>
    <router-view @change-bg="updateBackground"/>
  </div>
</template>

<script>
const bgUrls = [
'src/assets/background-images/Mountain-2-Foundations-MtG-Art-scaled.jpg',
        'src/assets/background-images/Tempest-Hart-Wilds-of-Eldraine-MtG-Art.jpg',
        'src/assets/background-images/Beanstalk-Wurm-Wilds-of-Eldraine-MtG-Art.jpg',
        'src/assets/background-images/Hedge-Maze-Murders-at-Karlov-Manor-MtG-Art.jpg',
        'src/assets/background-images/Topiary-Panther-Murders-at-Karlov-Manor-MtG-Art.jpg',
        'src/assets/background-images/Xolatoyac-the-Smiling-Flood-The-Lost-Caverns-of-Ixalan-MtG-Art-scaled.jpg',
        'src/assets/background-images/The-Myriad-Pools.jpg',
        'src/assets/background-images/Treasure-Cove.jpg',
        'src/assets/background-images/The-Core.jpg',
        'src/assets/background-images/Temple-of-Cyclical-Time.jpg',
        'src/assets/background-images/Mountain-2.jpg',
        'src/assets/background-images/Maha-Its-Feathers-Night-Bloomburrow-MtG-Art.jpg',
        'src/assets/background-images/Swamp-Bloomburrow-MtG-Art.jpg',
        'src/assets/background-images/Harvestrite-Host-Bloomburrow-MtG-Art.jpg',
        'src/assets/background-images/Lupinflower-Village-Bloomburrow-MtG-Art.jpg',
        'src/assets/background-images/Genesis-Wave-Foundations-MtG-Art.jpg',
        'src/assets/background-images/Preposterous-Proportions-Foundations-MtG-Art.jpg',
        'src/assets/background-images/Fountainport-Bloomburrow-MtG-Art-scaled.jpg',
        'src/assets/background-images/Preposterous-Proportions-2-Foundations-MtG-Art.jpg',
        'src/assets/background-images/Beza-the-Bounding-Spring-Bloomburrow-MtG-Art.jpg',
        'src/assets/background-images/Mountain-Foundations-MtG-Art.jpg',
        'src/assets/background-images/Stomping-Ground-Unfinity-MtG-Art.jpg',
        'src/assets/background-images/Plains-Unfinity-MtG-Art.jpg',
        'src/assets/background-images/Forest-2-Unfinity-MtG-Art.jpg',
        'src/assets/background-images/Godless-Shrine-Unfinity-MtG-Art.jpg',
        'src/assets/background-images/Watery-Grave-Unfinity-MtG-Art.jpg',
        'src/assets/background-images/Mountain-Unfinity-MtG-Art.jpg',
        'src/assets/background-images/Swamp-Unfinity-MtG-Art.jpg',
        'src/assets/background-images/Island-Unfinity-MtG-Art.jpg',
        'src/assets/background-images/Forest-Unfinity-MtG-Art.jpg',
        'src/assets/background-images/Breeding-Pool-Unfinity-MtG-Art.jpg',
        'src/assets/background-images/Blood-Crypt-Unfinity-MtG-Art.jpg',
        'src/assets/background-images/Trapeze-Artist-Unfinity-MtG-Art.jpg',
        'src/assets/background-images/Astroquarium-Unfinity-MtG-Art.jpg',
        'src/assets/background-images/How-Is-This-a-Par-Three-Unfinity-MtG-Art.jpg',
        'src/assets/background-images/Hallowed-Fountain-Unfinity-MtG-Art.jpg',
        'src/assets/background-images/Island-2-Unfinity-MtG-Art.jpg',
        'src/assets/background-images/Swamp-2-Unfinity-MtG-Art.jpg',
        'src/assets/background-images/Mountain-2-Unfinity-MtG-Art.jpg',
        'src/assets/background-images/Plains-2-Unfinity-MtG-Art.jpg',
        'src/assets/background-images/Tangled-Islet-Dominaria-United-MtG-Art.jpg',
        'src/assets/background-images/Gibbering-Barricade-Dominaria-United-MtG-Art.jpg',
        'src/assets/background-images/Adarkar-Wastes-Dominaria-United-MtG-Art.jpg',
        'src/assets/background-images/Karplusan-Forest-Dominaria-United-MtG-Art.jpg',
        'src/assets/background-images/Hexbane-Tortoise-Dominaria-United-MtG-Art.jpg',
        'src/assets/background-images/Radiant-Grove-Dominaria-United-MtG-Art-scaled.jpg',
        'src/assets/background-images/Leyline-Binding-Dominaria-United-MtG-Art-scaled.jpg',
        'src/assets/background-images/Haunted-Mire-Dominaria-United-MtG-Art.jpg',
        'src/assets/background-images/Crystal-Grotto-Dominaria-United-MtG-Art.jpg',
        'src/assets/background-images/Jodahs-Codex-Dominaria-United-MtG-Art.jpg', 
        'src/assets/background-images/Swamp-2-Dominaria-United-MtG-Art.jpg',
        'src/assets/background-images/Yavimaya-Coast-Dominaria-United-MtG-Art.jpg',
        'src/assets/background-images/Yavimaya-Coast-Variant-Dominaria-United-MtG-Art.jpg',
        'src/assets/background-images/Caves-of-Koilos-Variant-Dominaria-United-MtG-Art.jpg',
        'src/assets/background-images/Sulfurous-Springs-Variant-Dominaria-United-MtG-Art.jpg',
        'src/assets/background-images/Shivan-Reef-Dominaria-United-MtG-Art.jpg',
        'src/assets/background-images/Caves-of-Koilos-Dominaria-United-MtG-Art.jpg',
        'src/assets/background-images/Plains-2-Dominaria-United-MtG-Art.jpg',
        'src/assets/background-images/Argoth-Sanctum-of-Nature-The-Brothers-War-MtG-Art.jpg',
        'src/assets/background-images/Underground-River-The-Brothers-War-MtG-Art.jpg',
        'src/assets/background-images/Titania-Gaea-Incarnate-The-Brothers-War-MtG-Art.jpg',
        'src/assets/background-images/Brushland-The-Brothers-War-MtG-Art.jpg',
        'src/assets/background-images/Take-Flight-The-Brothers-War-MtG-Art.jpg',
        'src/assets/background-images/Battlefield-Forge-The-Brothers-War-MtG-Art.jpg',
        'src/assets/background-images/Phyrexian-Fleshgorger-The-Brothers-War-MtG-Art.jpg',
        'src/assets/background-images/Swamp-The-Brothers-War-MtG-Art.jpg',
        'src/assets/background-images/Mountain-The-Brothers-War-MtG-Art.jpg',
        'src/assets/background-images/Swarm-of-Bloodflies-Jumpstart-2022-MtG-Art.jpg',
        'src/assets/background-images/Isu-the-Abominable-Jumpstart-2022-MtG-Art.jpg',
        'src/assets/background-images/Collision-of-Realms-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Mech-Hangar-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Island-Variant-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/March-of-Swirling-Mist-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Mountain-Variant-2-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Mountain-Variant-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Explosive-Singularity-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Kyodai-Soul-of-Kamigawa-Variant-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Takenuma-Abandoned-Mire-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Swamp-1-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Island-1-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Mountain-1-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Otawara-Soaring-City-Variant-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Plains-1-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Forest-1-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Release-to-Memory-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Go-Shintai-of-Ancient-Wars-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Neon-Dynasty-Marketing-Art.jpg',
        'src/assets/background-images/Swiftwater-Cliffs-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Mountain-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Swamp-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Scoured-Barrens-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Plains-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Uncharted-Haven-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Eiganjo-Seat-of-the-Empire-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Bloodfell-Caves-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Rugged-Highlands-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Otawara-Soaring-City-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Mechtitan-Token-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Discover-the-Impossible-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Discover-the-Impossible-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Invoke-Despair-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Boseiju-Who-Endures-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/The-Modern-Age-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        'src/assets/background-images/Xanders-Lounge-Streets-of-New-Capenna-MtG-Art.jpg',
        'src/assets/background-images/Forest-Streets-of-New-Capenna-MtG-Art.jpg',
        'src/assets/background-images/Plains-Streets-of-New-Capenna-MtG-Art.jpg',
        'src/assets/background-images/Island-Streets-of-New-Capenna-MtG-Art.jpg',
        'src/assets/background-images/Plains-2-Streets-of-New-Capenna-MtG-Art.jpg',
        'src/assets/background-images/Jetmirs-Garden-Streets-of-New-Capenna-MtG-Art.jpg',
        'src/assets/background-images/Raffines-Tower-Variant-2-Streets-of-New-Capenna-MtG-Art.jpg',
        'src/assets/background-images/Mountain-Streets-of-New-Capenna-MtG-Art.jpg',
        'src/assets/background-images/Botanical-Plaza-Variant-Streets-of-New-Capenna-MtG-Art.jpg',
        'src/assets/background-images/All-Seeing-Arbiter-Variant-Streets-of-New-Capenna-MtG-Art.jpg',
        'src/assets/background-images/Shadow-of-Mortality-Variant-Streets-of-New-Capenna-MtG-Art.jpg',
        'src/assets/background-images/Mountain-2-Streets-of-New-Capenna-MtG-Art.jpg',
        'src/assets/background-images/Pull-from-Tomorrow-MtG-Art.jpg',
        'src/assets/background-images/Capenna-Express-Streets-of-New-Capenna-MtG-Art.jpg',
        'src/assets/background-images/Dragonlord-Dromoka-Variant-Double-Masters-2022-MtG-Art.jpg',
        'src/assets/background-images/Emrakul-the-Aeons-Torn-Variant-Double-Masters-2022-MtG-Art.jpg',
        'src/assets/background-images/Rampant-Growth-Double-Masters-2022-MtG-Art.jpg',
        'src/assets/background-images/Orzhov-Basilica-Double-Masters-2022-MtG-Art.jpg',
        'src/assets/background-images/Cryptic-Spires-Double-Masters-2022-MtG-Art.jpg',
        'src/assets/background-images/Golgari-Rot-Farm-Double-Masters-2022-MtG-Art.jpg',
        'src/assets/background-images/Kozilek-Butcher-of-Truth-Double-Masters-2022-MtG-Art.jpg',
        'src/assets/background-images/Azorius-Chancery-Double-Masters-2022-MtG-Art.jpg',
        'src/assets/background-images/Forest-Battle-for-Baldurs-Gate-Battle-for-Baldurs-Gate-MtG-Art.jpg',
        'src/assets/background-images/Baldurs-Gate-Battle-for-Baldurs-Gate-MtG-Art.jpg',
        'src/assets/background-images/Morphic-Pool-Battle-for-Baldurs-Gate-MtG-Art.jpg',
        'src/assets/background-images/Mountain-Battle-for-Baldurs-Gate-MtG-Art.jpg',
        'src/assets/background-images/Reflecting-Pool-Battle-for-Baldurs-Gate-MtG-Art.jpg',
        'src/assets/background-images/Elder-Brain-Variant-Battle-for-Baldurs-Gate-MtG-Art.jpg',
        'src/assets/background-images/You-Look-Upon-the-Tarrasque-Battle-for-Baldurs-Gate-MtG-Art.jpg'
]

export default {
  data() {
    return {
            backgrounds: [{ url: bgUrls[0], active: true }], 
            bgUrls: bgUrls
    }
  },
  methods: {
    updateBackground() {
      const randomIndex = Math.floor(Math.random() * this.bgUrls.length)
      const newImage = this.bgUrls[randomIndex]

      // deactivate old ones
      this.backgrounds.forEach(bg => (bg.active = false))

      // add new one, but inactive (opacity 0)
      const newBg = { url: newImage, active: false }
      this.backgrounds.push(newBg)

      // wait for DOM update, then wait a bit more to ensure opacity 0 is applied
      this.$nextTick(() => {
        setTimeout(() => {
          newBg.active = true
        }, 10) // small delay to ensure the opacity 0 state is rendered
      })

    }
  }
}
</script>

<style lang="scss" scoped>
.v-index {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  //transition: opacity 8s ease-in-out;

}

.clock {
  position: fixed; 
  top: 0;
  left: 50%;
  transform: translate(-50%);
}

.background-layer {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: opacity 8s ease-in-out;
  z-index: -1;
}

</style>