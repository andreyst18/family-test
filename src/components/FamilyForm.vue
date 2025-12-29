<template>
  <form class="family-form" @submit.prevent="onSubmit">
    <h2>{{ isEdit ? 'Редактирование' : 'Добавление' }} члена семьи</h2>

    <!-- ФИО -->
    <div class="form-group">
      <label>Фамилия</label>
      <input
        v-model.trim="form.lastName"
        type="text"
        :class="{ error: errors.lastName }"
      />
      <span v-if="errors.lastName" class="error-text">
        {{ errors.lastName }}
      </span>
    </div>

    <div class="form-group">
      <label>Имя</label>
      <input
        v-model.trim="form.firstName"
        type="text"
        :class="{ error: errors.firstName }"
      />
      <span v-if="errors.firstName" class="error-text">
        {{ errors.firstName }}
      </span>
    </div>

    <div class="form-group">
      <label>Отчество</label>
      <input
        v-model.trim="form.middleName"
        type="text"
        :class="{ error: errors.middleName }"
      />
      <span v-if="errors.middleName" class="error-text">
        {{ errors.middleName }}
      </span>
    </div>

    <!-- Дата рождения -->
    <div class="form-group">
      <label>Дата рождения</label>
      <input
        v-model="form.birthDate"
        type="date"
        :class="{ error: errors.birthDate }"
      />
      <span v-if="errors.birthDate" class="error-text">
        {{ errors.birthDate }}
      </span>
    </div>

    <!-- Роль -->
    <div class="form-group">
      <label>Роль в семье</label>
      <select
        v-model="form.relation"
        :class="{ error: errors.relation }"
      >
        <option value="" disabled>Выберите роль</option>
        <option value="father">Отец</option>
        <option value="mother">Мать</option>
        <option value="son">Сын</option>
        <option value="daughter">Дочь</option>
        <option value="other">Другое</option>
      </select>
      <span v-if="errors.relation" class="error-text">
        {{ errors.relation }}
      </span>
    </div>

    <!-- Заявитель -->
    <div class="form-group checkbox">
      <label>
        <input type="checkbox" v-model="form.applicant" />
        Заявитель
      </label>
      <span v-if="errors.applicant" class="error-text">
        {{ errors.applicant }}
      </span>
    </div>

    <!-- Кнопки -->
    <div class="actions">
      <button type="submit">
        {{ isEdit ? 'Сохранить' : 'Добавить' }}
      </button>
      <button type="button" @click="resetForm">
        Очистить
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'FamilyForm',

  props: {
    value: {
      type: Object,
      default: null, // для редактирования
    },
  },

  data() {
    return {
      form: this.getInitialForm(),
      errors: {},
    }
  },

  computed: {
    isEdit() {
      return !!this.value
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val) {
          this.form = { ...val }
        }
      },
    },
  },

  methods: {
    getInitialForm() {
      return {
        lastName: '',
        firstName: '',
        middleName: '',
        birthDate: '',
        relation: '',
        applicant: false,
      }
    },

    validate() {
      this.errors = {}

      if (!this.form.lastName) {
        this.errors.lastName = 'Фамилия обязательна'
      }

      if (!this.form.firstName) {
        this.errors.firstName = 'Имя обязательно'
      }

      if (!this.form.middleName) {
        this.errors.middleName = 'Отчество обязательно'
      }

      if (!this.form.birthDate) {
        this.errors.birthDate = 'Дата рождения обязательна'
      } else if (!this.isValidBirthDate(this.form.birthDate)) {
        this.errors.birthDate = 'Некорректная дата рождения'
      }

      if (!this.form.relation) {
        this.errors.relation = 'Роль обязательна'
      }

      // applicant обязателен как признак (true/false)
      if (this.form.applicant !== true && this.form.applicant !== false) {
        this.errors.applicant = 'Укажите признак заявителя'
      }

      return Object.keys(this.errors).length === 0
    },

    isValidBirthDate(date) {
      const birth = new Date(date)
      const today = new Date()

      if (isNaN(birth.getTime())) return false
      if (birth > today) return false

      // человек не старше 120 лет
      const age =
        today.getFullYear() -
        birth.getFullYear()

      return age >= 0 && age <= 120
    },

    onSubmit() {
      if (!this.validate()) return

      this.$emit('submit', { ...this.form })
      this.resetForm()
    },

    resetForm() {
      this.form = this.getInitialForm()
      this.errors = {}
      this.$emit('reset')
    },
  },
}
</script>

<style scoped>
.family-form {
  max-width: 500px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 12px;
}

.form-group.checkbox {
  margin-top: 8px;
}

label {
  display: block;
  margin-bottom: 4px;
}

input,
select {
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
}

.error {
  border-color: #e53935;
}

.error-text {
  color: #e53935;
  font-size: 12px;
}

.actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}
</style>
