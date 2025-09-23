<template>
  <div class="v-dicelist">
    <div class="active-item">
      {{ activeItem ? activeItem : 'What shall we do today?' }}
    </div>
    <v-button v-if="!isRolling && containsWord('smash')" dark @click="goToPage('smashboard')">Take me to
      Smashboard</v-button>
    <div>
      <v-button :icon="isRolling ? 'spinner' : 'refresh'" @click="startMarquee()" class="input-zone" dark></v-button>
    </div>
    <div class="input-zone">
      <input v-model="itemToAdd" @keydown.enter="addItem" class="input-box" maxlength="20" />
    </div>
    <div class="marquee-container" :style="{ '--container-height': (itemHeight + 4) * this.diceList.length + 'px' }">
      <v-icon type="arrow-right" class="arrow" />
      <div ref="marquee" class="marquee-content" :class="{ paused: isPaused }">
        <div v-for="(item, idx) in diceList" :key="'first-' + item" class="marquee-item">
          <span>{{ item }} <v-button icon="close" @click="removeItem(idx)" negative xsmall /></span>
        </div>
        <!-- Duplicated for marquee effect -->
        <div v-for="(item, idx) in diceList" :key="'second-' + item" class="marquee-item">
          {{ item }} <v-button icon="close" @click="removeItem(idx)" negative xsmall />
        </div>
      </div>
      <v-icon type="arrow-left" class="arrow" />
    </div>
    <div>
      <v-button class="clear-all-btn" icon="close" @click="removeAll()" dark xsmall />
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      diceList: [],
      isRolling: false,
      itemToAdd: "",
      activeItem: "",
      editIndex: null,
      editValue: "",
      isRunning: false,
      isPaused: false,
      itemHeight: 50,
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    addItem() {
    if (!this.diceList.includes(this.itemToAdd)) {
        this.diceList.splice(0, 0, this.itemToAdd);
    } else {
        let modified = this.itemToAdd;
        let attempts = 0;
        const maxAttempts = 10;
        const vowels = 'aeiou';
        
        do {
            modified = this.itemToAdd.replace(/[aeiou]/gi, () => vowels[Math.floor(Math.random() * 5)]);
            attempts++;
        } while (this.diceList.includes(modified) && attempts < maxAttempts);
        
        if (!this.diceList.includes(modified)) {
            this.diceList.splice(0, 0, modified);
        }
    }
    this.itemToAdd = "";
},
    removeItem(index) {
      this.diceList.splice(index, 1);
      //this.diceList = this.diceList.filter(i => i.toLowerCase() !== item.toLowerCase())
    },
    removeAll() {
      if (confirm("Bin the whole bastard list?")) {
        this.diceList = []
      }
    },
    startEdit(idx, item) {
      this.editIndex = idx;
      this.editValue = item;
    },
    saveEdit(idx) {
      if (this.editValue.trim()) {
        this.$set(this.diceList, idx, this.editValue.trim());
      }
      this.editIndex = null;
      this.editValue = "";
    },
    cancelEdit() {
      this.editIndex = null;
      this.editValue = "";
    },
    rollTheDie() {
      this.isRolling = true;
      const randomMainIndex = Math.floor(Math.random() * this.diceList.length);
      let activeMainIndex = 0;
      const countTo = 100 + randomMainIndex
      let counter = Math.floor(Math.random() * this.diceList.length);

      const spin = () => {
        activeMainIndex = counter % this.diceList.length;
        this.activeItem = this.diceList[activeMainIndex];

        if (counter === countTo) {
          this.isRolling = false;
          return;
        }

        const progress = counter / countTo;
        const delay = 30 + Math.pow(progress, 3) * 100;

        counter++;
        setTimeout(spin, delay);
      };

      spin();
    },
    containsWord(word) {
      return (
        this.activeItem &&
        this.activeItem.toLowerCase().includes(word.toLowerCase())
      );
    },
    goToPage(path) {
      this.$router.push({ path });
    },
    saveData() {
      localStorage.setItem('dicelist', JSON.stringify(this.diceList));
    },
    loadData() {
      this.diceList = JSON.parse(localStorage.getItem('dicelist')) || [];
    },
    startMarquee() {
      if (this.isRunning) return;

      this.isRunning = true;
      this.isPaused = false;
      let position = 0;
      let speed = 14;
      let animationId;
      let calculatedHeight = this.diceList.length;

      const animate = () => {
        if (this.isPaused) return;

        position += speed;
        if (position >= (54 * calculatedHeight)) position = 0;

        const marqueeElement = this.$refs.marquee;
        marqueeElement.style.transform = `translateY(-${position}px)`;

        animationId = requestAnimationFrame(animate);
      };

      animate();

      const randomTime = 2000 + Math.random() * 3000;

      setTimeout(() => {
        const slowDown = () => {
          if (speed > 0.5) { //lower for more abrupt stop - slow 0.1 fast 0.4
            speed *= 0.94; // lower for quicker slowdown - 0.9 to 0.98 seems okay
            setTimeout(slowDown, 50);
          } else {
            this.isPaused = true;
            this.isRunning = false;
            cancelAnimationFrame(animationId);
          }
        };
        slowDown();
      }, randomTime);
    }
  },
  watch: {
    diceList() {
      this.saveData();
    }
  }

}
</script>

<style lang="scss" scoped>
.v-dicelist {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3%;
  gap: 16px;
}

.dicelist-item {
  display: flex;
  min-height: 50px;
  flex-direction: row;
  align-items: center;
  font-size: 40px;

  >div {
    font-size: 40px;
    flex-shrink: 1;
    border: 1px solid var(--greyscale-20);
    border-radius: 8px;
    background-color: var(--greyscale-10);
    text-align: center;
    position: relative;
    padding: 16px 24px;
    flex-grow: 1;
    flex-basis: 100%;

  }

  .v-button {
    position: absolute;
    right: -12px;
    top: -12px;
    transform: scale(0.8);
  }
}

.input-zone {
  display: flex;
  flex-basis: 50%;
  min-height: 50px;
  flex-direction: row;
  align-items: center;
}

// .input-zone::before,
// .input-zone::after {
//   content: var(--sming);
//   width: 10px;
//   height: 10px;
//   background-color: var(--menu-bullshit);
// }

.input-box {
  display: flex;
  flex-basis: 30%;
  min-height: 30px;
  flex-direction: row;
  align-items: center;
  font-size: 40px;
  background-color: #16161f;
  padding: 8px;
  text-align: center;
}

.active-item {
  display: flex;
  flex-basis: 50%;
  min-height: 50px;
  flex-direction: row;
  align-items: center;
  font-size: 50px;
  padding-top: 2%;
  padding-bottom: 2%;
  margin-bottom: 20px;
  text-align: center;
}

@keyframes color-cycle {
  0% {
    color: #FBAF00;
  }

  20% {
    color: #FFD639;
  }

  40% {
    color: #FFA3AF;
  }

  60% {
    color: #007CBE;
  }

  80% {
    color: #00AF54;
  }

  100% {
    color: #FBAF00;
  }
}

* {
  animation: color-cycle 30s infinite ease-in;
  font-weight: bold;
}

.buttons-container {
  display: flex;
  gap: 20px;
  align-self: center;
  margin-top: auto;
}

.clear-all-btn {
  align-self: center;
  margin-top: auto;
}


.marquee-container {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  //align-items: center;
  min-height: calc(var(--item-height) * 4);
  max-height: calc(var(--container-height));
  justify-content: start;


  .arrow {
    display: flex;
    flex-direction: row;
    transform: scale(2);
    transform-origin: center;
    font-size: 50px;
    margin-top: 16px;
    margin-inline: 8px;
  }

}

.marquee-content {
  display: flex;
  //height: 216px;
  flex-direction: column;
}

.marquee-item {
  height: var(--item-height);
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  padding-inline: 8px;
  margin: 2px;
  background-color: #7979b5;
  min-height: 50px;
  flex-direction: row;
  font-size: 40px;
  white-space: nowrap;
  position: relative;

        

        @keyframes tickerWithPause {
            0% {
                transform: translateX(100%);
            }
            10% {
                transform: translateX(0%);
            }
            80% {
                transform: translateX(0%);
            }
            100% {
                transform: translateX(-100%);
            }
        }

        >span {
  font-size: 40px;
  //animation: tickerWithPause 5s linear infinite;
  // need to figure out how to make it stay inside the box
        }
        
  .v-button {
    position: absolute;
    right: -4px;
    top: -4px;
    transform: scale(0.7);
  }
}
</style>