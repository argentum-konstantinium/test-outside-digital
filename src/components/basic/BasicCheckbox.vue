<template>
  <span class="basic-checkbox">
    <input @change="$emit('change', !$event.target.checked)" :disabled="disabled" class="basic-checkbox__hidden" type="checkbox" :value="value">
    <span class="basic-checkbox__visible">
      <svg class="basic-checkbox__check-icon" width="14" height="11" viewBox="0 0 14 11" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M4.45455 8.70149L1.11364 5.25373L0 6.40299L4.45455 11L14 1.14925L12.8864 0L4.45455 8.70149Z"
              fill="white"/>
      </svg>
    </span>
  </span>
</template>

<script>
export default {
  name: 'BasicCheckbox',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      default: ''
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import '@/assets/style/variables.scss';
@import "@/assets/style/mixins";
.basic-checkbox {
  &__hidden {
    @include visualyHidden();
    &:checked ~ .basic-checkbox__visible {
      background: linear-gradient(255.35deg, #DC3131 0.83%, rgba(255, 79, 79, 0) 108.93%), #FF5E56;
      .basic-checkbox__check-icon {
        opacity: 1;
      }
    }

    &:disabled ~ .basic-checkbox__visible {
      background: #BEC5CC;
    }
  }

  &__visible {
    background: $background-red;
    border-radius: 6px;
    width: 20px;
    height: 20px;
    border: 1px solid #DFE3E6;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FFFFFF;
    transition: all 0.3s ease-in;

    &:hover {
      border-color: #000000;
    }

  }
  &__check-icon {
    opacity: 0;
    transition: all 0.3s ease-in;
  }
}
</style>