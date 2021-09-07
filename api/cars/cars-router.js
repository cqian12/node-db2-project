const router = require('express')
const mw = require('./cars-middleware')
const Cars = require('./cars-model')

router.get('/', async (req, res, next) => {
    try {
        const cars = Cars.getAll()
        res.json(cars)
    } catch(err) {
        next(err)
    }
}) 

router.get('/:id', mw.checkCarId, async (req, res, next) => {
    res.json(req.car)
})

router.post('/', mw.checkCarPayload, mw.checkVinNumberValid, mw.checkVinNumberUnique, async (req, res, next) => {
    try {
        const newCar = await Cars.create(req.body)
        res.status(201).json(newCar)
    } catch(err) {
        next(err)
    }
})

