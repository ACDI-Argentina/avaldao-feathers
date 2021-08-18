module.exports = function initDatabaseWithDummy(app) {

  app.service('avales').create({
    id: 1,
    infoCid: 'Qmd4PvCKbFbbB8krxajCSeHdLXQamdt7yFxFxzTbedwiYM',
    proyecto: '1. Instalación de cisternas para productores del Gran Chaco',
    proposito: 'Impulsar el desarrollo de los productores de la zona.',
    causa: 'Los productores no tiene acceso al crédito y necesitan un aval.',
    adquisicion: '10 cisternas',
    beneficiarios: '20 productores',
    monto: '10.000 USD',
    avaldaoAddress: '0xee4b388fb98420811C9e04AE8378330C05A2735a',
    solicitanteAddress: '0xee4b388fb98420811C9e04AE8378330C05A2735a',
    status: 2
  });

  app.service('avales').create({
    id: 2,
    infoCid: 'Qmd4PvCKbFbbB8krxajCSeHdLXQamdt7yFxFxzTbedwiYM',
    proyecto: '2. Instalación de cisternas para productores del Gran Chaco',
    proposito: 'Impulsar el desarrollo de los productores de la zona.',
    causa: 'Los productores no tiene acceso al crédito y necesitan un aval.',
    adquisicion: '10 cisternas',
    beneficiarios: '20 productores',
    monto: '10.000 USD',
    avaldaoAddress: '0xee4b388fb98420811C9e04AE8378330C05A2735a',
    solicitanteAddress: '0xee4b388fb98420811C9e04AE8378330C05A2735a',
    status: 2
  });

  app.service('avales').create({
    id: 3,
    infoCid: 'Qmd4PvCKbFbbB8krxajCSeHdLXQamdt7yFxFxzTbedwiYM',
    proyecto: '3. Instalación de cisternas para productores del Gran Chaco',
    proposito: 'Impulsar el desarrollo de los productores de la zona.',
    causa: 'Los productores no tiene acceso al crédito y necesitan un aval.',
    adquisicion: '10 cisternas',
    beneficiarios: '20 productores',
    monto: '10.000 USD',
    avaldaoAddress: '0xee4b388fb98420811C9e04AE8378330C05A2735a',
    solicitanteAddress: '0xee4b388fb98420811C9e04AE8378330C05A2735a',
    comercianteAddress: '0xee4b388fb98420811C9e04AE8378330C05A2735a',
    avaladoAddress: '0xee4b388fb98420811C9e04AE8378330C05A2735a',
    status: 3
  });
};
