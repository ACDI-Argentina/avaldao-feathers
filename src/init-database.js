module.exports = function initDatabaseWithDummy(app) {

  app.service('avales').create({
    id: 1,
    proyecto: '1. Instalación de cisternas para productores del Gran Chaco',
    proposito: 'Impulsar el desarrollo de los productores de la zona.',
    causa: 'Los productores no tiene acceso al crédito y necesitan un aval.',
    adquisicion: '10 cisternas',
    beneficiarios: '20 productores',
    monto: '10.000 USD',
    avaldaoAddress: '0xee4b388fb98420811C9e04AE8378330C05A2735a',
    solicitanteAddress: '0x0bfA3B6b0E799F2eD34444582187B2cDf2fB11a7',
    status: 2
  });

  app.service('avales').create({
    id: 2,
    proyecto: '2. Instalación de cisternas para productores del Gran Chaco',
    proposito: 'Impulsar el desarrollo de los productores de la zona.',
    causa: 'Los productores no tiene acceso al crédito y necesitan un aval.',
    adquisicion: '10 cisternas',
    beneficiarios: '20 productores',
    monto: '10.000 USD',
    avaldaoAddress: '0xee4b388fb98420811C9e04AE8378330C05A2735a',
    solicitanteAddress: '0x0bfA3B6b0E799F2eD34444582187B2cDf2fB11a7',
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
    solicitanteAddress: '0x0bfA3B6b0E799F2eD34444582187B2cDf2fB11a7',
    comercianteAddress: '0x36d1d3c43422EF3B1d7d23F20a25977c29BC3f0e',
    avaladoAddress: '0x9063541acBD959baeB6Bf64158944b7e5844534a',
    status: 3
  });
};
