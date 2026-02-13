<template>
  <div class="dungeon-tracker" ref="container">

    <!-- Token Layer (positioned relative to the image) -->
    <div class="token-layer" ref="dragArea" :style="tokenLayerStyles">
      <div v-for="t in tokens" :key="t.id" class="token"
        :class="{ 'is-active': lastActiveTokenId === t.id }"
        :style="{
          left: t.x + 'px',
          top: t.y + 'px',
          backgroundImage: 'url(' + t.background + ')',
          boxShadow: (lastActiveTokenId === t.id ? '0 0 40px ' : '0 0 15px ') + t.color
        }"
        @mousedown="startDrag(t, $event)"
        @touchstart="startDrag(t, $event)"
        @click="setActiveToken(t)"></div>
    </div>

    <!-- dungeon image -->
    <img ref="dungeonImage" src="/undercity.png" class="dungeon-image" @load="positionTokensAboveImage" />
  </div>
</template>

<script>
export default {
  name: "DungeonTracker",

  data() {
    return {
      tokens: [
        { id: 1, color: "var(--yellow-primary)", label: "Els", x: 0, y: 0, background: "/elsicon.png" },
        { id: 2, color: "var(--blue-primary)", label: "JJ", x: 0, y: 0, background: "/joshicon.png" },
        { id: 3, color: "var(--green-primary)", label: "Rob", x: 0, y: 0, background: "/robicon.png" }
      ],
      draggingToken: null,
      offsetX: 0,
      offsetY: 0,
      tokenLayerStyles: {},
      lastActiveTokenId: null
    };
  },

  mounted() {
    // ensure tokens are positioned when image is ready; if already cached, call immediately
    this.$nextTick(() => {
      const img = this.$refs.dungeonImage;
      if (img && img.complete) {
        this.positionTokensAboveImage();
      }
      //window.addEventListener('resize', this.positionTokensAboveImage);
    });
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.positionTokensAboveImage);
    const img = this.$refs.dungeonImage;
    if (img) img.removeEventListener('load', this.positionTokensAboveImage);
  },

  methods: {
    // ...existing drag methods...
    startDrag(token, event) {
      // mark this token as the last active immediately
      this.lastActiveTokenId = token.id;

      this.draggingToken = token;

      const e = event.type.startsWith("touch")
        ? event.touches[0]
        : event;

      // Mouse/touch position relative to token-layer top-left
      const rect = this.$refs.dragArea.getBoundingClientRect();
      this.offsetX = e.clientX - rect.left - token.x;
      this.offsetY = e.clientY - rect.top - token.y;

      window.addEventListener("mousemove", this.onDrag);
      window.addEventListener("mouseup", this.stopDrag);
      window.addEventListener("touchmove", this.onDrag, { passive: false });
      window.addEventListener("touchend", this.stopDrag);
    },

    setActiveToken(token) {
      this.lastActiveTokenId = token.id;
    },

    onDrag(event) {
      if (!this.draggingToken) return;

      const e = event.type.startsWith("touch")
        ? event.touches[0]
        : event;

      if (event.cancelable) event.preventDefault();

      const rect = this.$refs.dragArea.getBoundingClientRect();

      this.draggingToken.x = e.clientX - rect.left - this.offsetX;
      this.draggingToken.y = e.clientY - rect.top - this.offsetY;
    },

    stopDrag() {
      this.draggingToken = null;

      window.removeEventListener("mousemove", this.onDrag);
      window.removeEventListener("mouseup", this.stopDrag);
      window.removeEventListener("touchmove", this.onDrag);
      window.removeEventListener("touchend", this.stopDrag);
    },

    // New: compute token-layer position & initial token coords so tokens sit centered above the image
    positionTokensAboveImage() {
      const img = this.$refs.dungeonImage;
      const container = this.$refs.container;
      const layer = this.$refs.dragArea;

      if (!img || !container || !layer) return;

      const imgRect = img.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // token size used in CSS
      const tokenWidth = 80;
      const tokenHeight = 80;
      const gap = 16;

      // compute token-layer styles so it aligns with the image width and is placed just above it
      const left = imgRect.left - containerRect.left;
      const width = imgRect.width;
      const top = imgRect.top - containerRect.top - tokenHeight - 8; // 8px margin above image

      this.tokenLayerStyles = {
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${tokenHeight}px`,
        pointerEvents: 'none'
      };

      const totalTokensWidth = this.tokens.length * tokenWidth + (this.tokens.length - 1) * gap;
      let startX = Math.max(0, (width - totalTokensWidth) / 2);

      this.tokens = this.tokens.map((t, i) => {
        return Object.assign({}, t, {
          x: Math.round(startX + i * (tokenWidth + gap)),
          y: 0
        });
      });
    }
  }
};
</script>

<style scoped>
.dungeon-tracker {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: relative; /* important: container for absolute token-layer */
  padding-top: 0;
}

.token-layer {
  pointer-events: none;
}

.token {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: grab;
  user-select: none;
  background-size: cover;
  background-position: center;
  transition: transform 0.12s, box-shadow 0.12s, filter 0.18s;
  pointer-events: auto;
}

/* make non-active tokens muted */
.token:not(.is-active) {
  filter: saturate(0.4) grayscale(0.25) brightness(0.95);
  opacity: 0.9;
}

/* ensure active token looks vivid */
.token.is-active {
  filter: saturate(1) grayscale(0) brightness(1.03);
  transform: scale(1.05);
}

/* base glow */
.token::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  filter: blur(12px);
  background-color: var(--token-glow);
  z-index: -1;
  transition: filter 0.18s, transform 0.18s, opacity 0.18s;
  opacity: 0.9;
}

/* bigger glow for the last-clicked / last-dragged token */
.token.is-active::before {
  box-shadow: 0 0 20px;
  opacity: 1;
  z-index: 1;
}

/* small lift for active token (optional subtle effect) */
.token.is-active {
  transform: scale(1.05);
}

.dungeon-image {
  display: block;
  width: 100%;
  max-width: 1100px;
  box-shadow: black 0px 0px 20px;
  border-radius: 3%;
  margin-top: -150px;
}
</style>
