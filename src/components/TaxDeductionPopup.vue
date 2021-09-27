<template>
  <PopupWindow @close="$emit('close')">
    <div class="tax-deduction">
      <div class="tax-deduction__text-content">
        <h2 class="tax-deduction__headline">Налоговый вычет</h2>
        <p class="tax-deduction__text">
          Используйте налоговый вычет чтобы погасить ипотеку досрочно. Размер налогового вычета составляет не более 13%
          от
          своего официального годового дохода.
        </p>
      </div>
      <div class="tax-deduction__salary">
        <TextInput @focus="setPosition" @click="setPosition" :error="error" :errorMsg="errorMsg" v-model="salary"
                   class="tax-deduction__text-input" headline="Ваша зарплата в месяц"
                   placeholder="Введите данные"/>
        <BasicButton @click="calculatePayments" class="tax-deduction__calculate-btn" type="text">
          Рассчитать
        </BasicButton>
      </div>
      <div v-if="payments.length > 0" class="tax-deduction__payments-list">
        <h3 class="tax-deduction__subheadline">Итого можете внести в качестве досрочных:</h3>
        <div class="tax-deduction__payments-container">
          <TaxDeductionPayment @select="selectTaxDeduction" class="tax-deduction__payment" v-for="(payment, index) in payments" :key="index"
                               :payment="payment"/>
        </div>
      </div>
      <div class="tax-deduction__type">
        <h3 class="tax-deduction__subheadline">Что уменьшаем?</h3>
        <div class="tax-deduction__change-type">
          <BasicTag @change="changeType" class="tax-deduction__type-tag" name="type" type="radio" v-for="(tag, index) in types" :key="index"
                    :tagData="tag"/>
        </div>
      </div>
      <span v-if="sendError" class="tax-deduction__send-error">{{sendErrorMsg}}</span>
      <BasicButton @click='addTaxDeductionuction' class="tax-deduction__add-btn" type="normal">Добавить</BasicButton>
    </div>
  </PopupWindow>
</template>

<script>
import PopupWindow from "@/components/basic/PopupWindow";
import TextInput from "@/components/basic/TextInput";
import BasicButton from "@/components/basic/BasicButton";
import BasicTag from '@/components/basic/BasicTag'
import TaxDeductionPayment from "@/components/TaxDeductionPayment";
import {pluralize} from "@/utils/pluralize";
import api from '@/api/api';
export default {
  name: 'TaxDeductionPopup',
  components: {
    TaxDeductionPayment,
    TextInput,
    PopupWindow,
    BasicButton,
    BasicTag
  },
  data() {
    return {
      salaryNumber: 0,
      payments: [],
      types: [
        {
          value: 'payment',
          label: 'Платеж'
        },
        {
          value: 'time',
          label: 'Срок'
        }
      ],
      type: null,
      error: false,
      errorMsg: '',
      sendError: false,
      sendErrorMsg: '',
      selectedTaxDeduction: []
    }
  },
  computed: {
    salary: {
      get() {
        return String(this.salaryNumber).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1 ") + "₽"
      },
      set(event) {
        let newValue = parseInt(event.target.value.replace(/[^\d\.]/g, ""))
        if (isNaN(newValue)) newValue = 0
        this.salaryNumber = newValue
        setTimeout(() => {
          this.setPosition(event)
        })

      }
    },
  },
  methods: {
    async addTaxDeductionuction() {
      try {
        if (this.salaryNumber < 10000) {
          this.errorMsg = 'Вы ввели слишком маленькое значение'
          this.error = true
          return
        }
        this.error = false
        this.errorMsg = ''
        if (this.selectedTaxDeduction.length === 0) {
          this.sendError = true
          this.sendErrorMsg = 'Вы не выбрали ни одного платежа!'
          return
        }
        if (!this.type) {
          this.sendError = true
          this.sendErrorMsg = 'Вы не выбрали, что у меньшать!'
          return
        }
        this.sendError = false
        this.sendErrorMsg = ''

        // ниже располагается не нерабочий код. Это просто один из примеров того, что я мог бы сделать дальше
        // в задании ничего об этом сказано не было, но я подумал, что все данные, которые здесь получаются, должны уходить на бэкенд

        // await api.addTaxDeductions({
        //   type: this.type,
        //   selectedTaxDeduction: this.selectedTaxDeduction,
        //   salary: this.salaryNumber
        // })
        alert('Данные успешно добавлены')
      } catch (e) {
        alert('Произошла ошибка. Попробуйте ещё')
        throw e
      }
    },
    changeType(event) {
      if (event.select) {
        this.type = event.tagData.value
      }
    },
    selectTaxDeduction(event) {
      if (!event.remove) {
        this.selectedTaxDeduction.push(event.payment)
      } else {
        this.selectedTaxDeduction = this.selectedTaxDeduction.filter(el => el !== event.payment)
      }
    },
    setPosition(event) {
      event.target.setSelectionRange(event.target.value.length - 1, event.target.value.length - 1)
    },
    calculatePayments() {
      if (this.salaryNumber < 10000) {
        this.error = true
        this.errorMsg = 'Вы ввели слишком маленькое значение!'
        return
      }
      this.error = false
      this.errorMsg = ''
      const maxDeduction = 260_000
      const yearSalary = this.salaryNumber * 12
      const deduction = parseInt(`${yearSalary * 0.13}`)
      const remainder = maxDeduction % deduction
      const paymentsArr = []
      const years = Math.ceil(maxDeduction / deduction)
      for (let year = 1; year <= years; year += 1) {
        const payment = {
          paymentDate: (year === 2 ? 'во ' : 'в ') + year + ' год'
        }
        if (year === years && remainder !== 0) {
          payment.payment = remainder + pluralize(remainder, [' рубль', ' рубля', ' рублей'])
          paymentsArr.push(payment)
        } else {
          payment.payment = deduction + pluralize(deduction, [' рубль', ' рубля', ' рублей'])
          paymentsArr.push(payment)
        }
      }
      this.payments = paymentsArr
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/style/mixins.scss';

.tax-deduction {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: repeat(3, min-content) auto;
  min-height: calc(100vh - 64px);
  max-height: 740px;
  &__headline {
    @include font-cfg(18px, #000000, 500);
    margin-bottom: 0.888em;
  }

  &__subheadline {
    @include font-cfg(null, #000000, 500);
  }

  &__text {
    color: #808080;
  }

  &__text-input {
    margin-top: 1.714em;
  }

  &__calculate-btn {
    margin-top: 0.574em;
    padding-left: 0;
  }

  &__payments-list {
    margin-top: 1.142em;
  }

  &__payments-container {
    overflow-y: auto;
    max-height: 212px;
    position: relative;
  }

  &__payment {
    border-bottom: 1px solid #DFE3E6;
  }

  &__type {
    margin-top: 1.714em;
  }

  &__change-type {
    display: flex;
    margin-top: 1.714em;
  }

  &__type-tag {
    margin-right: 0.571em;
  }
  &__send-error {
    color: #EA0029;
    font-size: 10px;
    display: block;
    margin-top: 0.5em;
  }
  &__add-btn {
    margin-top: 20px;
    width: 100%;
    align-self: end;
  }
}

@media (min-width: 768px) {
  .tax-deduction {
    min-height: unset;

    &__headline {
      font-size: 20px;
    }

    &__type {
      display: flex;
      align-items: center;
    }

    &__change-type {
      margin-top: 0;
      margin-left: 32px;
    }

    &__calculate-btn {
      font-size: 14px;
    }
  }
}

@media (min-width: 1440px) {
  .tax-deduction {
    &__headline {
      font-size: 28px;
    }
    &__send-error {
      font-size: 12px;
    }
  }
}
</style>