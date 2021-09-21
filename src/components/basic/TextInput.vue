<template>
  <label class="text-input__label">
    <span v-if="headline" class="text-input__headline">{{ headline }}</span>
    <input :class="{'text-input__input_error' : error}" :disabled="disabled" :placeholder="placeholder"
           @change="$emit('change', $event)" @input="$emit('input', $event)" :value="value"
           @focus="$emit('focus', $event)"
           @click="$emit('click', $event)"
           class="text-input__input" type="text">
    <span v-if="error" class="text-input__error-msg">{{ errorMsg }}</span>
  </label>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    value: '',
    placeholder: {
      default: 'Введите текст'
    },
    headline: '',
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    errorMsg: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/style/mixins";

.text-input {
  &__label {
    cursor: pointer;
    display: block;
  }

  &__headline {
    @include font-cfg(null, #000000, 500);
    margin-bottom: 0.571em;
    display: block;
  }

  &__input {
    display: block;
    border: 1px solid #DFE3E6;
    border-radius: 3px;
    padding: 8px 10px;
    width: 100%;
    transition: all 0.3s ease-in;
    @include font-cfg(null, #000000, 400);

    &::placeholder {
      color: #BEC5CC;
      font-family: 'Lab Grotesque';
    }

    &:hover {
      border-color: #000000;
    }

    &:disabled {
      border-color: #808080;

      &::placeholder {
        color: #808080;
      }
    }

    &_error {
      border-color: #EA0029;
    }
  }

  &__error-msg {
    margin-top: 0.285em;
    @include font-cfg(0.714em, #EA0029, null);
  }
}

@media(min-width: 1440px) {
  .text-input {
    &__error-msg {
      font-size: 12px;
    }
  }
}
</style>