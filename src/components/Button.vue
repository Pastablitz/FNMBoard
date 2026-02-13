<template>
  <div v-if="$slots.default || label || icon" class="v-button">
    <component :is="buttonType" :id="buttonId" :class="buttonClasses" type="button" :href="href" :target="linkTarget" @click="clicked($event)" @mouseover="mouseOver($event)" @mouseleave="mouseLeave($event)">
      <v-icon v-if="icon" :type="icon" :size="iconSize" />
      <span v-if="$slots.default || label"><slot>{{ label }}</slot></span>
      <v-icon v-if="iconRight" :type="iconRight" :size="iconSize" />
    </component>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: [String, Number] },
    primary: { type: Boolean },
    positive: { type: Boolean },
    negative: { type: Boolean },
    yellow: { type: Boolean },
    secondarySoft: { type: Boolean },
    tertiary: { type: Boolean },
    dark: { type: Boolean },
    disabled: { type: Boolean },
    large: { type: Boolean },
    small: { type: Boolean },
    xsmall: { type: Boolean },
    href: { type: String },
    icon: { type: String },
    iconRight: { type: String },
    buttonId: { type: String }
  },
  methods: {
    clicked(event) {
      if (this.buttonType === 'button' && !this.disabled) this.$emit('click', event);
    },
    mouseOver(event) {
      if (this.buttonType === 'button' && !this.disabled) this.$emit('mouseover', event);
      },
    mouseLeave(event) {
      if (this.buttonType === 'button' && !this.disabled) this.$emit('mouseleave', event);
      }
  },
  computed: {
    buttonType() {
      return this.href ? 'a' : 'button';
    },
    buttonClasses() {
      const classes = [
        "v-button-container",
        { "large": this.large },
        { "small": this.small },
        { "xsmall": this.xsmall },
        { "icon-only": !this.$slots.default && !this.label && (this.icon || this.iconRight) },
        { "icon-left": (this.$slots.default || this.label) && this.icon },
        { "icon-right": (this.$slots.default || this.label) && this.iconRight },
        { "disabled": this.disabled },
        { "primary": this.primary },
        { "positive": this.positive },
        { "yellow": this.yellow },
        { "negative": this.negative },
        { "tertiary": this.tertiary },
        { "dark": this.dark },
        { "secondary-soft": this.secondarySoft },
        { "secondary": !this.primary && !this.positive && !this.yellow && !this.negative && !this.tertiary && !this.secondarySoft },
      ];

      return classes;
    },
    iconSize() {
      return this.small || this.xsmall ? "16" : "24";
    },
    linkTarget() {
      return !!this.href && this.href.startsWith("/") ? "" : "_blank";
    }
  }
}
</script>

<style lang="scss" scoped>
* { box-sizing: border-box; }

.v-button {
  display: inline-block;
  margin: -1px;
  vertical-align: middle;
  flex-shrink: 0;
}

.v-button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 1px;
  padding-inline: 16px;
  height: 40px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  outline: none;

  &:hover, &:active {
    height: 42px;
    margin: 0;
    padding-inline: 17px;
  }

    &.large {
      height: 52px;
      width: 52px;
      border-radius: 6px;
      font-size: 16px;
  
      &:hover,
      &:active {
        height: 54px;
        width: 54px;
      }
  
      &.icon-only {
        height: 52px;
        width: 52px;
  
        &:hover,
        &:active {
          height: 54px;
          width: 54px;
        }
      }
  }

  &.small {
    height: 32px;
    border-radius: 6px;
    font-size: 12px;

    &:hover, &:active {
      height: 34px;
    }

    &.icon-only {
      width: 32px;

      &:hover, &:active {
        width: 34px;
      }
    }
  }

&.xsmall {
  height: 24px;
  border-radius: 6px;
  font-size: 12px;

  &:hover, &:active {
    height: 26px;
  }

  &.icon-only {
    width: 24px;

    &:hover, &:active {
      width: 26px;
    }
  }
}

  &.icon-only {
    padding: 0;
    width: 40px;

    &:hover, &:active {
      width: 42px
    }
  }

  &.icon-left {
    padding-left: 12px;

    &:hover, &:active {
      padding-left: 13px;
    }
  }

  &.icon-right {
    padding-right: 12px;

    &:hover, &:active {
      padding-right: 13px;
    }
  }
}

.v-button-container {
  &.primary {
    color: var(--greyscale-100);
    background-color: var(--blue-primary);
    box-shadow: var(--shadow-button-primary);

    &:hover {
      border-color: var(--blue-primary);
      background-color: var(--blue-hover);
    }

    &:active {
      border-color: var(--blue-primary);
      background-color: var(--blue-dark);
      box-shadow: var(--active-outline);
    }
  }

  &.positive {
    color: var(--greyscale-100);
    background-color: var(--green-primary);
    box-shadow: var(--shadow-button-positive);

    &:hover {
      border-color: var(--green-primary);
      background-color: var(--green-hover);
    }

    &:active {
      border-color: var(--green-primary);
      background-color: var(--green-dark);
      box-shadow: var(--positive-outline);
    }
  }

    &.yellow {
    //color: var(--greyscale-100);
    background-color: var(--yellow-primary);
    box-shadow: var(--shadow-button-positive);

    &:hover {
      border-color: var(--yellow-primary);
      background-color: var(--yellow-hover);
    }

    &:active {
      border-color: var(--yellow-primary);
      background-color: var(--yellow-dark);
      box-shadow: var(--yellow-dark);
    }
  }

  &.negative {
    color: var(--greyscale-100);
    background-color: var(--red-primary);
    box-shadow: var(--shadow-button-negative);

    &:hover {
      border-color: var(--red-primary);
      background-color: var(--red-hover);
    }

    &:active {
      border-color: var(--red-primary);
      background-color: var(--red-dark);
      box-shadow: var(--negative-outline);
    }
  }

  &.secondary {
    color: var(--greyscale-0);
    border-color: var(--greyscale-30);
    background-color: var(--greyscale-100);
    box-shadow: var(--shadow-button-secondary);

    &:hover {
      border-color: var(--greyscale-0);
    }

    &:active {
      border-color: var(--blue-primary);
      box-shadow: var(--active-outline);
    }
  }

  &.secondary-soft {
    color: var(--greyscale-30);
    border-color: var(--greyscale-90);
    background-color: var(--greyscale-90);

    &:hover {
      border-color: var(--greyscale-30);
      background-color: var(--greyscale-80);
    }

    &:active {
      border-color: var(--greyscale-0);
    }
  }

  &.tertiary {
    color: var(--greyscale-30);
    border-color: var(--greyscale-70);
    background-color: transparent;

    &:hover {
      border-color: var(--greyscale-30);
    }

    &:active {
      border-color: var(--greyscale-0);
    }
  }

  &.dark {
    color: var(--greyscale-100);
    border-color: var(--greyscale-70);
    background-color: var(--greyscale-10);

    &:hover {
      border-color: var(--greyscale-70);
    }

    &:active {
      color: var(--greyscale-70);
      border-color: var(--greyscale-30);
      box-shadow: none;
    }
  }

  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
}

.v-button-container > span {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>