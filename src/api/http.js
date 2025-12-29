const STORAGE_KEY = 'family-members'

function load() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}

function save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export default {
    get(url) {
        if (url === '/family/members') {
            return Promise.resolve({ data: load() })
        }
    },

    post(url, data) {
        if (url === '/family/members') {
            const members = load()
            data.id = Date.now()
            members.push(data)
            save(members)
            return Promise.resolve({ data })
        }
    },

    put(url, data) {
        const id = Number(url.split('/').pop())
        const members = load().map(m =>
            m.id === id ? { ...m, ...data } : m
        )
        save(members)
        return Promise.resolve({ data })
    },

    delete(url) {
        const id = Number(url.split('/').pop())
        const members = load().filter(m => m.id !== id)
        save(members)
        return Promise.resolve()
    },
}
