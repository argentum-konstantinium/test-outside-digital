<template>
  <button :disabled="disabled" @click="$emit('click')" :class="{'basic-button_outline' : type === 'outline', 'basic-button_text' : type === 'text' }" class="basic-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    label: '',
    type: {
      type: String,
      default: 'normal'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixins.scss";
.basic-button {
  background: $background-red;
  box-shadow: $box-shadow;
  border-radius: 6px;
  @include font-cfg(null, #ffffff, 500);
  padding: 12px;
  transition: all 0.3s ease-in;
  display: block;
  &:hover {
    background: #EA0029;
  }
  &:active {
    background: #EA0029;
  }
  &_outline {
    border: 1px solid #FFFFFF;
    &:hover {
      background: #FFFFFF;
      color: #000000;
    }
  }
  &_text {
    background: none;
    box-shadow: none;
    padding: 6px;
    border-radius: none;
    @include font-cfg(null, #EA0029, 500);
    &:hover {
      color: #F53A31;
      background: none;
    }
    &:active {
      color: #EA0029;
    }
  }
  &:disabled {
    background: #BEC5CC;
  }
}

@media(min-width: 768px) {
  .basic-button {
    font-size: 16px;
  }
}
</style>