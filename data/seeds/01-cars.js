// STRETCH
const cars = [
    {
        vin:'1234567890123',
        make:'hyundai',
        model:'sonata hybrid',
        mileage:8239,
    },
    {
        vin:'2234567890123',
        make:'toyota',
        model:'prius',
        mileage:11,
        title:'champion',
        transmission:'auto'
    },
    {
        vin:'33234567890123',
        make:'tesla',
        model:'model 3',
        mileage:11343,
        transmission:'auto'
    },
]

exports.seed = function(knex, Promise) {
    return knex('cars').truncate()
    .then(() => {
        return knex('cars').insert(cars)
    })
}