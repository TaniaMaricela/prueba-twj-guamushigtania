/**
 * Pokemon.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    nombre:{
      type:'string',
      required:true
    },imagen:{
      type:'string'
    },
    tipo1:{
      type:'string',
      enum:[ 'Acero', 'Agua', 'Bicho', 'Dragón', 'Eléctrico', 'Fantasma', 'Fuego', 'Hada', 'Hielo', 'Lucha', 'Normal', 'Planta', 'Psíquico', 'Roca', 'Siniestro', 'Tierra', 'Veneno', 'Volador']
    },tipo2:{
      type:'string',
      enum:[ 'Acero', 'Agua', 'Bicho', 'Dragón', 'Eléctrico', 'Fantasma', 'Fuego', 'Hada', 'Hielo', 'Lucha', 'Normal', 'Planta', 'Psíquico', 'Roca', 'Siniestro', 'Tierra', 'Veneno', 'Volador']
    },
    idEntrenador:{
        model: 'Entrenador',
      required:true
    }

  }
};

