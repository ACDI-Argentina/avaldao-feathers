// aval-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function Aval(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const avalSchema = new Schema(
    {
      id: { type: Number, required: true, index: true, unique: true },
      infoCid: { type: String },
      proyecto: { type: String, required: true },
      proposito: { type: String, required: true },
      causa: { type: String, required: true },
      adquisicion: { type: String, required: true },
      beneficiarios: { type: String, required: true },
      monto: { type: String, required: true },
      avaldaoAddress: { type: String, required: true },
      solicitanteAddress: { type: String, required: true },
      comercianteAddress: { type: String },
      avaladoAddress: { type: String },
      status: { type: String, required: true }
    },
    {
      timestamps: true,
    },
  );

  return mongooseClient.model('aval', avalSchema);
};