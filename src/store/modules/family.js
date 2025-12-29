import {
    getFamilyMembers,
    createFamilyMember,
    updateFamilyMember,
    deleteFamilyMember,
} from '@/api/family.api'

const state = {
    members: [],
    loading: false,
    error: null,
}

const getters = {
    members: state => state.members,
}

const mutations = {
    SET_MEMBERS(state, members) {
        state.members = members
    },
    SET_LOADING(state, value) {
        state.loading = value
    },
    SET_ERROR(state, error) {
        state.error = error
    },
}

const actions = {
    async fetchMembers({ commit }) {
        commit('SET_LOADING', true)
        try {
            const { data } = await getFamilyMembers()
            commit('SET_MEMBERS', data)
        } catch (e) {
            commit('SET_ERROR', 'Ошибка загрузки данных')
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async addMember({ state, dispatch }, payload) {
        // проверка уникальности
        const duplicate = state.members.some(m =>
            m.lastName === payload.lastName &&
            m.firstName === payload.firstName &&
            m.middleName === payload.middleName &&
            m.birthDate === payload.birthDate
        )

        if (duplicate) {
            throw new Error('DUPLICATE')
        }

        await createFamilyMember(payload)
        await dispatch('fetchMembers')
    },

    async updateMember({ state, dispatch }, { id, data }) {
        const duplicate = state.members.some(m =>
            m.id !== id &&
            m.lastName === data.lastName &&
            m.firstName === data.firstName &&
            m.middleName === data.middleName &&
            m.birthDate === data.birthDate
        )

        if (duplicate) {
            throw new Error('DUPLICATE')
        }

        await updateFamilyMember(id, data)
        await dispatch('fetchMembers')
    },

    async deleteMember({ dispatch }, id) {
        await deleteFamilyMember(id)
        await dispatch('fetchMembers')
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
