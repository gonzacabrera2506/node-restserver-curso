// PUERTO
process.env.PORT = process.env.PORT || 3000;


//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//VENCIMIENTO DEL TOKEN
//60 segundos
//60 minutos
//24 horas
//30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//SEED de autenticacion
 process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//BASE DE DATOS
let urlDB;

if( process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    //en el video aqui se utiliza el string de mLab el cual ya no esta disponible al redireccionar a la pagina de mongo
    urlDB = 'mongodb+srv://gonzacabrera2506:river2020@cluster0-7wqpa.mongodb.net/test?retryWrites=true&w=majority';
}
process.env.URLDB = urlDB;

