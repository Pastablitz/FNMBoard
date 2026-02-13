<template>
  <div class="v-menu">
    <dialog ref="menuModal" class="menu-modal" v-click-outside="closeMenu">
      <div >
        <v-button dark @click="goToPage('/')">FNM</v-button>
        <!-- <v-button dark @click="goToPage('dungeontracker')">DUNGEON TRACKER</v-button> -->
        <v-button dark @click="goToPage('diceboard')">DICELIST</v-button>
        <v-button dark @click="goToPage('bossboard')">BOSS</v-button>
        <v-button dark @click="goToPage('flex')">FLEX</v-button>
        <v-button dark @click="goToPage('mineboard')">MINEBOARD</v-button>
        <v-button dark @click="goToPage('sming')">SMING</v-button>
        <v-button dark @click="goToPage('sandpit')">SANDPIT</v-button>
        <v-button class="reset" icon="heartbeat" @click="reset" negative xsmall />
        <h2>Version 1.06</h2>
      </div>
    </dialog>
    <div class="clock-container" @click="showMenu">
      <div class="clock">{{ timeDisplay }}</div>
    </div>
    <dialog ref="subMenuModal" class="sub-menu-modal" v-click-outside="closeSubMenu">
      <div>
        <v-button dark @mouseover="palette.setPalette('liurnia')"
          @click="palette.setPalette('liurnia'); closeSubMenu()">Liurnia</v-button>
        <v-button dark @mouseover="palette.setPalette('limgrave')"
          @click="palette.setPalette('limgrave'); closeSubMenu()">Limgrave</v-button>
        <v-button dark @mouseover="palette.setPalette('altusplateau')"
          @click="palette.setPalette('altusplateau'); closeSubMenu()">Altus Plateau</v-button>
        <v-button dark @mouseover="palette.setPalette('caelid')"
          @click="palette.setPalette('caelid'); closeSubMenu()">Caelid</v-button>
        <v-button dark @mouseover="palette.setPalette('mtgelmir')"
          @click="palette.setPalette('mtgelmir'); closeSubMenu()">Mt Gelmir</v-button>
        <v-button dark @mouseover="palette.setPalette('cave')"
          @click="palette.setPalette('cave'); closeSubMenu()">Cave</v-button>
        <v-button dark @mouseover="palette.setPalette('liurniaB')"
          @click="palette.setPalette('liurniaB'); closeSubMenu()">Liurnia (Alternate)</v-button>
        <v-button dark @mouseover="palette.setPalette('limgraveB')"
          @click="palette.setPalette('limgraveB'); closeSubMenu()">Limgrave (Alternate)</v-button>
      </div>
    </dialog>
    <div>
      <v-button v-if="$route.path === '/bossboard'" class="skins-button" icon="edit" @click="showSubMenu(); closeMenu()"
        dark xsmall></v-button>
    </div>
  </div>

</template>

<script>

export default {
  data() {
    return {
      timeDisplay: '',
      clockInterval: null,
      palette: BossboardPalette
    }
  },
  mounted() {
    this.startClock();
  },
  methods: {
    goToPage(path) {
      this.$router.push({ path });
      this.closeMenu();
    },
    showMenu() {
      this.$refs.menuModal.showModal();
    },
    showSubMenu() {
      this.$refs.subMenuModal.showModal();
    },
    closeMenu() {
      this.$refs.menuModal.close();
    },
    closeSubMenu() {
      this.$refs.subMenuModal.close();
    },
    reset() {
      const binIt = confirm("Bin the bastard lot?");
      if (!binIt) return;
      localStorage.clear();
      location.reload();
    },
    startClock() {
      this.setTime();
      if (this.clockInterval) return;
      this.clockInterval = setInterval(this.setTime, 5000);
    },
    setTime() {
      const date = new Date();
      const hours = date.getHours();
      const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
      const minutes = date.getMinutes();
      const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
      this.timeDisplay = `${hoursString}:${minutesString}`;
    },
  },
}
</script>

<style lang="scss" scoped>
.v-menu {
  display: flex;
  justify-content: center;
}

.clock-container {
  opacity: 0.8;
  cursor: pointer;
  --outline-colour: var(--greyscale-20);
  filter: drop-shadow(1px 0px 0px var(--outline-colour)) drop-shadow(-1px 0px 0px var(--outline-colour)) drop-shadow(0px 1px 0px var(--outline-colour)) drop-shadow(0px -1px 0px var(--outline-colour)) drop-shadow(1px 1px 0px var(--outline-colour)) drop-shadow(-1px -1px 0px var(--outline-colour)) drop-shadow(-1px 1px 0px var(--outline-colour)) drop-shadow(1px -1px 0px var(--outline-colour));

  &:hover {
    opacity: 1;
  }

  .clock {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 160px;
    padding: 4px;
    background-color: var(--greyscale-10);
    color: white;
    clip-path: polygon(0 0, 100% 0%, 85% 100%, 15% 100%);
    font-size: 24px;
    user-select: none;
    font-family: monospace;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 600;
  }
}

.menu-modal {
  transition: top 200ms ease-out;
  top: -500px;
  margin-inline: auto;
  border: none;
  background-color: transparent;
  //animation: drop-down 0.25s ease-out;
  display: block;

  &[open] {
    top: 44px;
  }

  >div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px;
    border: 1px solid var(--greyscale-20);
    border-radius: 8px;
    background-color: var(--greyscale-10);
  }
}

.menu-modal::backdrop {
  background-color: transparent;
}

.sub-menu-modal {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: none;
  background-color: transparent;
 // animation: drop-down 0.25s ease-out;

  >div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px;
    // border: 1px solid var(--greyscale-20);
    border-radius: 8px;
    //background-color: var(--greyscale-10);
  }
}

.menu-item {
  font-size: 22px;
  background-color: black;

}
.boss-button-div {
  display: flex;
  flex-direction: row;
}

.skins-button {
  display: flex;
  position: absolute;
  justify-content: center;
  transform: translate(15%, 15%);
}

h2 {
  color: var(--greyscale-50);
}
</style>