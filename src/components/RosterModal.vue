<template>
  <div class="v-roster-modal">
    <v-button @click="showSelectionModal" 
      icon="plus" 
      :yellow="player.name === 'エリオ'"
      :primary="player.name === 'ジョシュ'" 
      :positive="player.name === 'ロブ'" 
       />
    <dialog ref="selectionModal" class="selection-modal" :style="rosterPosition" v-click-outside="closeSelectionModal">
      <div class="modal-top">
        <span class="player-name">{{ player.name }}</span>
        <button class="sort-by-button" type="button" @click="sortBy++">
          <v-icon size="16" type="filter" />
          {{ sortByLabel }}
        </button>
        <input ref="searchInput" v-model="searchTerm" class="search-input">
      </div>
      <div ref="modalBody" class="modal-body">
        <span v-show="!playerRoster.length" class="no-results">🤷‍♀️</span>
        <v-fighter v-for="fighter in playerRoster" 
          :player="player" 
          :fighter="fighter" @selected="fighterSelected"
          selectable />
      </div>
    </dialog>
  </div>
</template>

<script>
export default {
  props: {
    player: { type: Player }
  },
  data() {
    return {
      sortBy: 1,
      searchTerm: ''
    }
  },
  methods: {
    showSelectionModal() {
      this.$refs.selectionModal.show();
      this.$refs.modalBody.scrollTop = 0;
      this.$refs.searchInput.focus();
    },
    closeSelectionModal() {
      this.$refs.selectionModal.close();
      this.searchTerm = '';
    },
    fighterSelected() {
      this.searchTerm = '';
      this.$refs.searchInput.focus();
    }
  },
  computed: {
    playerRoster() {
      return this.player.roster(this.sorting, this.searchTerm);
    },
    sorting() {
      return this.sortBy % 2;
    },
    sortByLabel() {
      switch(this.sorting) {
        case SortBy.favouritesFirst:
          return "faves first";
        case SortBy.default:
        default:
          return "default order";
      }
    },
    rosterPosition() {
      switch (this.player.name) {
        case 'エリオ':
          return { 'right': `60%`};
        case 'ジョシュ':
          return { 'left': `0px`};
        case 'ロブ':
          return { 'left': `60%`};
        default: return { 'left': `0px`};
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-roster-modal {
  display: flex;

  > .v-button {
    margin-inline: auto;
  }
}

.selection-modal {
  top: 50px;
  margin-inline: auto; 
  border: 1px solid black;
  border-radius: 8px;
  width: 300px;
  overflow: hidden;
  box-shadow: var(--shadow-large-overlay);
  position: fixed;
  z-index: 1;

  .modal-top {
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 4px;
    padding: 4px;
    background-color: white;
    border-bottom: 1px solid var(--greyscale-80);
  }

  .modal-body {
    overflow-y: auto;
    padding: 4px;
    max-height: 800px;
    display: flex;
    flex-direction: column;
  }
}

.sort-by-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: transparent;
  border: none;
  border-radius: 6px;
  height: 24px;
  padding-inline: 4px 8px;
  cursor: pointer;
  color: var(--greyscale-20);
  flex-grow: 1;

  &:hover {
    background-color: var(--greyscale-90);
  }
}

.search-input {
  outline: none;
  padding: 4px;
}

.player-name {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
}

.no-results {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  font-size: 36px;
  line-height: 100%;
}
</style>