const Cars = require('./cars-model')
const vinVal = require('vin-validator')

const checkCarId = async (req, res, next) => {
  const { id } = req.params
  try {
    const car = await Cars.getById(id)
    if (!car) {
      res.status(404).json({message:`car with id ${id} is not found`})
    } else {
      req.car = car
      next()
    }
  } catch(err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body
  const error = { status: 400}
  let missing = ''

  if (vin === undefined) {
    missing = 'vin'
  } else if (make === undefined) {
    missing = 'make'
  } else if (model === undefined) {
    missing = 'model'
  } else if( mileage === undefined ) { 
    missing = 'mileage'
  }

  if (missing) {
    error.message = `${missing} is missing`
    next(error)
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body
  const valid = vinVal(vin)

  if (!valid) {
    res.status(400).json({message:`vin ${vin} is invalid`})
  } else {
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body

  try {
    const taken = await db('cars').where('vin', vin).first()
    
    taken ? res.status(400).json({message:`vin ${vin} already exists`})
    : next()
  } catch(err) {
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}