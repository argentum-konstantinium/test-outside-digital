<template>
  <label class="tag">
    <input @change="$emit('change', {select: $event.target.checked, tagData})" :name="name" class="tag__checkbox" :type="type" :value="tagData.value">
    <span class="tag__label">{{ tagData.label }}</span>
  </label>
</template>

<script>
export default {
  name: 'BasicTag',
  props: {
    type: {
      type: String,
      default: 'checkbox'
    },
    tagData: {
      type: Object,
      default() {
        return {}
      }
    },
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/style/mixins";
@import "@/assets/style/variables";
.tag {
  display: block;
  cursor: pointer;
  &__checkbox {
    @include visualyHidden()
    &:checked ~ .tag__label {
      background: $background-red;
      color: #FFFFFF;
    }
  }
  &__label {
    background: #EEF0F2;
    display: block;
    width: 100%;
    height: 100%;
    color: #000000;
    border-radius: 50px;
    transition: all 0.3s ease-in;
    padding: 6px 12px;
    &:hover {
      background: #DFE3E6;
    }
  }
}
</style>