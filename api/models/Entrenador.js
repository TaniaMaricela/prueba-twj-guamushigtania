/**
 * Entrenador.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    nombres: {
      type: 'string',
      required: true
    },
    imagen: {
      type: 'string'
    },
    fechaInicio: {
      type: 'date'
    },
    Region: {
      type: 'string',
      enum: ['Alola', 'Johto', 'Kanto', 'Hoenn', 'Teselia', 'Sinnoh', 'Kalos'
      ]
    },
    pokemon: {
      collection: 'Pokemon',
      via: 'idEntrenador'
    }
  }
};

