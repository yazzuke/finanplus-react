const firebaseAdmin = require('firebase-admin');

// Ruta de las creedenciales

const serviceAccount = require('./Firebase.config.jsx');
const { data } = require('autoprefixer');

// Inicializar Firebase Admin SDK
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://finanplus-4cfd2.firebaseio.com"
});

module.exports = firebaseAdmin;
