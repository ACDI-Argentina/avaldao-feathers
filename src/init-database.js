module.exports = function initDatabaseWithDummy(app) {

  app.service('avales').create({
    proyecto: 'Instalación de cisternas para productores del Gran Chaco (' + Date.now() + ')',
    proposito: 'Impulsar el desarrollo de los productores de la zona.',
    causa: 'Los productores no tiene acceso al crédito y necesitan un aval.',
    adquisicion: '10 cisternas',
    beneficiarios: '20 productores',
    montoFiat: 60000,
    cuotasCantidad: 6, 
    avaldaoAddress: '0xee4b388fb98420811C9e04AE8378330C05A2735a',
    solicitanteAddress: '0x0bfA3B6b0E799F2eD34444582187B2cDf2fB11a7',
    status: 2
  });
};