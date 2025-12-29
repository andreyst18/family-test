<template>
  <div class="family-view">
    <h1>Состав семьи</h1>

    <FamilyForm
      :value="editedMember"
      @submit="saveMember"
      @reset="cancelEdit"
    />

    <FamilyTable
      v-if="members.length"
      :members="members"
      @edit="editMember"
      @delete="deleteMember"
    />

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="loading">Загрузка...</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FamilyForm from '@/components/FamilyForm.vue'
import FamilyTable from '@/components/FamilyTable.vue'

export default {
  components: { FamilyForm, FamilyTable },

  data() {
    return {
      editedMember: null,
    }
  },

  computed: {
    ...mapGetters('family', ['members']),
    loading() {
      return this.$store.state.family.loading
    },
    error() {
      return this.$store.state.family.error
    },
  },

  created() {
    this.fetchMembers()
  },

  methods: {
    ...mapActions('family', [
      'fetchMembers',
      'addMember',
      'updateMember',
      'deleteMember',
    ]),

    async saveMember(formData) {
      try {
        if (this.editedMember) {
          await this.updateMember({
            id: this.editedMember.id,
            data: formData,
          })
        } else {
          await this.addMember(formData)
        }

        this.cancelEdit()
      } catch (e) {
        if (e.message === 'DUPLICATE') {
          alert('Запись с таким ФИО и датой рождения уже существует')
        } else {
          alert('Ошибка сохранения')
        }
      }
    },

    editMember(member) {
      this.editedMember = { ...member }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    async deleteMember(id) {
      if (!confirm('Удалить запись?')) return
      await this.deleteMemberAction(id)
    },

    deleteMemberAction(id) {
      return this.$store.dispatch('family/deleteMember', id)
    },

    cancelEdit() {
      this.editedMember = null
    },
  },
}
</script>

<style scoped>
.error {
  color: #e53935;
  margin-top: 12px;
}
</style>
