export function getRealEstateByMemberId(id) {
    return Promise.resolve({
        data: {
            hasRealEstate: true,
            objects: [
                {
                    type: 'Квартира',
                    address: 'г. Москва, ул. Ленина, 1',
                    ownership: 'Собственность',
                },
            ],
        },
    })
}
