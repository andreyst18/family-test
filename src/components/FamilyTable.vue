<template>
  <table border="1" width="100%">
    <thead>
      <tr>
        <th>ФИО</th>
        <th>Дата рождения</th>
        <th>Роль</th>
        <th>Заявитель</th>
        <th>Недвижимость</th>
        <th>Действия</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="m in members" :key="m.id">
        <td>{{ m.lastName }} {{ m.firstName }} {{ m.middleName }}</td>
        <td>{{ m.birthDate }}</td>
        <td>{{ m.relation }}</td>
        <td>{{ m.applicant ? 'Да' : 'Нет' }}</td>

        <td>
          <div v-if="estates[m.id]">
            <div v-for="(o, i) in estates[m.id]" :key="i">
              {{ o.type }} — {{ o.address }}
            </div>
          </div>
          <span v-else>Загрузка...</span>
        </td>

        <td>
          <button @click="$emit('edit', m)">Редактировать</button>
          <button @click="$emit('delete', m.id)">Удалить</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { getRealEstateByMemberId } from '@/api/estate.api'

export default {
  props: {
    members: Array,
  },

  data() {
    return {
      estates: {},
    }
  },

  watch: {
    members: {
      immediate: true,
      handler(list) {
        list.forEach(m => {
          if (!this.estates[m.id]) {
            this.loadEstate(m.id)
          }
        })
      },
    },
  },

  methods: {
    async loadEstate(id) {
      const { data } = await getRealEstateByMemberId(id)
      this.$set(this.estates, id, data.objects)
    },
  },
}
</script>
