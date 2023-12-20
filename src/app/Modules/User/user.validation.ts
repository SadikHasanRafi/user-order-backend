// import Joi from "joi"

// const addressSchema = Joi.object({
//   street: Joi.string().required(),
//   city: Joi.string().required(),
//   country: Joi.string().required(),
// })

// const orderSchema = Joi.object({
//   productName: Joi.string().required(),
//   price: Joi.number().required(),
//   quantity: Joi.number().required(),
// })

// const userValidationSchema = Joi.object({
//   userId: Joi.number().required(),
//   username: Joi.string().required(),
//   password: Joi.string().required(),
//   fullName: Joi.object({
//     firstName: Joi.string().required(),
//     lastName: Joi.string().required(),
//   }),
//   age: Joi.number().required(),
//   email: Joi.string().email().required(),
//   isActive: Joi.boolean().required(),
//   hobbies: Joi.array().items(Joi.string()).required(),
//   address: addressSchema.required(),
//   orders: Joi.array().items(orderSchema),
// })
// export default userValidationSchema
import Joi from "joi";

const addressSchema = Joi.object({
  street: Joi.string().required().messages({
    'any.required': 'Street is required.',
    'string.base': 'Street must be a string.',
  }),
  city: Joi.string().required().messages({
    'any.required': 'City is required.',
    'string.base': 'City must be a string.',
  }),
  country: Joi.string().required().messages({
    'any.required': 'Country is required.',
    'string.base': 'Country must be a string.',
  }),
});

const orderSchema = Joi.object({
  productName: Joi.string().required().messages({
    'any.required': 'Product name is required.',
    'string.base': 'Product name must be a string.',
  }),
  price: Joi.number().required().messages({
    'any.required': 'Price is required.',
    'number.base': 'Price must be a number.',
  }),
  quantity: Joi.number().required().messages({
    'any.required': 'Quantity is required.',
    'number.base': 'Quantity must be a number.',
  }),
});

const userValidationSchema = Joi.object({
  userId: Joi.number().required().messages({
    'any.required': 'User ID is required.',
    'number.base': 'User ID must be a number.',
  }),
  username: Joi.string().required().messages({
    'any.required': 'Username is required.',
    'string.base': 'Username must be a string.',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required.',
    'string.base': 'Password must be a string.',
  }),
  fullName: Joi.object({
    firstName: Joi.string().required().messages({
      'any.required': 'First name is required.',
      'string.base': 'First name must be a string.',
    }),
    lastName: Joi.string().required().messages({
      'any.required': 'Last name is required.',
      'string.base': 'Last name must be a string.',
    }),
  }),
  age: Joi.number().required().messages({
    'any.required': 'Age is required.',
    'number.base': 'Age must be a number.',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required.',
    'string.email': 'Email must be a valid email address.',
  }),
  isActive: Joi.boolean().required().messages({
    'any.required': 'isActive is required.',
    'boolean.base': 'isActive must be a boolean.',
  }),
  hobbies: Joi.array().items(Joi.string()).required().messages({
    'any.required': 'Hobbies are required.',
    'array.base': 'Hobbies must be an array.',
  }),
  address: addressSchema.required(),
  orders: Joi.array().items(orderSchema).messages({
    'array.base': 'Orders must be an array.',
  }),
});

export default userValidationSchema;
