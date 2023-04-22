const {Schema, model} = require('mongoose');

/* Define los campos que estarán disponibles en los documentos,
 así como sus tipos de datos, restricciones y validaciones.
 (PARA MONGODB)*/

 /* Para hacer referencias a otros modelos  se hace a traves
  de Schema.Types.ObjectId + ref: 'NombreModeloReferido' */
const characterSchema = new Schema({
  _id: String, 
  name: {
    type: String,
    required: true
  },
  status: String,
  species: String,
  type: String,
  gender: String,
  origin: {
    type: String,
    ref: 'Location'
  },
  location: {
    type: String,
    ref: 'Location'
  },
  image: String,
  episode:[{
    type: String,
    ref: 'Episode'
  }],
  created: String
})

/* Para el codigo backend se debe crear un modelo basado en el characterSchema */
module.exports = model('Character', characterSchema);
