<template>
  <div @click.self="closePopup" :class="{ 'popup_active': popupOpened }" class="popup">
    <transition name="show">
      <BasicButton v-if="!popupOpened" @click="openPopup" class="popup__start-btn" type="outline">
        Налоговый вычет
      </BasicButton>
      <TaxDeductionPopup v-else @close="closePopup" />
    </transition>
  </div>
</template>

<script>
import BasicButton from '@/components/basic/BasicButton'
import TaxDeductionPopup from "@/components/TaxDeductionPopup";
export default {
  name: 'Popup',
  components: {
    TaxDeductionPopup,
    BasicButton
  },
  data() {
    return {
      popupOpened: false
    }
  },
  methods: {
    openPopup() {
      this.popupOpened = true
    },
    closePopup() {
      this.popupOpened = false
    }
  }
}
</script>


<style lang="scss">
@import "@/assets/style/variables.scss";
@import "@/assets/style/animations.scss";
.popup {
  background: $background-red;
  box-shadow: $box-shadow;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in;
  &_active {
    background: #0000004C;
  }
  &__start-btn {
    flex-basis: 149px;
  }
}
@media(min-width: 768px) {
  .popup {
    &__start-btn {
      flex-basis: 200px;
      min-width: 200px;
    }
  }
}
</style>
