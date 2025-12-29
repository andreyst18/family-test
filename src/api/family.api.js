import http from './http'

export function getFamilyMembers() {
    return http.get('/family/members')
}

export function createFamilyMember(data) {
    return http.post('/family/members', data)
}

export function updateFamilyMember(id, data) {
    return http.put(`/family/members/${id}`, data)
}

export function deleteFamilyMember(id) {
    return http.delete(`/family/members/${id}`)
}
