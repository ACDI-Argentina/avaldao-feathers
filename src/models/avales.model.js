// aval-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function Aval(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const avalSchema = new Schema(
    {
      proyecto: { type: String, required: true },
      objetivo: { type: String, required: true },
      adquisicion: { type: String, required: true },
      beneficiarios: { type: String, required: true },
      montoFiat: { type: Number, required: true },
      cuotasCantidad: { type: Number, required: true },
      avaldaoAddress: { type: String, required: true },
      solicitanteAddress: { type: String, required: true },
      comercianteAddress: { type: String, required: true },
      avaladoAddress: { type: String, required: true },
      avaldaoSignature: { type: String },
      solicitanteSignature: { type: String },
      comercianteSignature: { type: String },
      avaladoSignature: { type: String },
      status: { type: Number, required: true }
    },
    {
      timestamps: true,
      collection: 'avales'
    },
  );

  return mongooseClient.model('aval', avalSchema);
};