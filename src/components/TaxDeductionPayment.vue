<template>
  <label class="payment">
    <BasicCheckbox @change="$emit('select', {remove: $event, payment})" class="payment__checkbox"/>
    <p>
      <span class="payment__number">{{ payment.payment }}</span>
      <span class="payment__date">
        {{ payment.paymentDate }}
      </span>
    </p>
  </label>
</template>

<script>
import BasicCheckbox from '@/components/basic/BasicCheckbox'

export default {
  name: 'TaxDeductionPayment',
  components: {
    BasicCheckbox
  },
  props: {
    payment: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss">
.payment {
  display: flex;
  align-items: center;
  padding: 16px 0;
  cursor: pointer;

  &__date {
    color: #808080;
  }

  &__checkbox {
    margin-right: 0.714em;
  }
}
</style>