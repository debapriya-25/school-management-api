const Joi = require('joi');

// School validation schema
const schoolSchema = Joi.object({
  name: Joi.string().min(1).max(255).required().messages({
    'string.empty': 'School name is required',
    'string.min': 'School name must be at least 1 character long',
    'string.max': 'School name must not exceed 255 characters',
    'any.required': 'School name is required'
  }),
  address: Joi.string().min(1).max(500).required().messages({
    'string.empty': 'Address is required',
    'string.min': 'Address must be at least 1 character long',
    'string.max': 'Address must not exceed 500 characters',
    'any.required': 'Address is required'
  }),
  latitude: Joi.number().min(-90).max(90).required().messages({
    'number.base': 'Latitude must be a number',
    'number.min': 'Latitude must be between -90 and 90',
    'number.max': 'Latitude must be between -90 and 90',
    'any.required': 'Latitude is required'
  }),
  longitude: Joi.number().min(-180).max(180).required().messages({
    'number.base': 'Longitude must be a number',
    'number.min': 'Longitude must be between -180 and 180',
    'number.max': 'Longitude must be between -180 and 180',
    'any.required': 'Longitude is required'
  })
});

// Location validation schema for listing schools
const locationSchema = Joi.object({
  latitude: Joi.number().min(-90).max(90).required().messages({
    'number.base': 'Latitude must be a number',
    'number.min': 'Latitude must be between -90 and 90',
    'number.max': 'Latitude must be between -90 and 90',
    'any.required': 'Latitude is required'
  }),
  longitude: Joi.number().min(-180).max(180).required().messages({
    'number.base': 'Longitude must be a number',
    'number.min': 'Longitude must be between -180 and 180',
    'number.max': 'Longitude must be between -180 and 180',
    'any.required': 'Longitude is required'
  })
});

// Validation middleware
const validateSchool = (req, res, next) => {
  const { error } = schoolSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'Error',
      message: 'Validation failed',
      details: error.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
      }))
    });
  }
  next();
};

const validateLocation = (req, res, next) => {
  const { error } = locationSchema.validate(req.query);
  if (error) {
    return res.status(400).json({
      status: 'Error',
      message: 'Validation failed',
      details: error.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
      }))
    });
  }
  next();
};

module.exports = {
  validateSchool,
  validateLocation
};
