// =======================
// PUERTO
// =======================
process.env.PORT = process.env.PORT || 3000;

// =======================
// ENTORNO
// =======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =======================
// FECHA DE EXPIRACION
// =======================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// =======================
// SEED DE AUTENTICACION
// =======================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// =======================
// BASE DE DATOS
// =======================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://127.0.0.1:27017/cafe';
} else {
    urlDB = 'mongodb+srv://juesnaca99:juanesteban99@cluster0.t2n0f7s.mongodb.net/cafe';
}

process.env.URLDB = urlDB;


