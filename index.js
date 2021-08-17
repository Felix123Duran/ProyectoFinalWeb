const express = require('express');
const morgan = require('morgan');
const ehbs =require('express-handlebars');
const exphbs = require('express-handlebars');
const path = require('path')


const app = express();

//settings 
app.set('port', process.env.PORT || 4000);
app.set('viewn',path.join(__dirname,'views'));
app.engine('.hbss', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layout'),
    partialDir: path.joim(app.get('views'), 'partials'),
    extname:'.hbs',
    helpers: require('./src/lib/handlebars')
}));
app.set('view engine', '.hbs');
//funciones ejecutables 

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//variables globales
app.use((req, res, next) =>{
    next();
})

//routes
app.use(require('./src/routes/index'));
app.use(require('./src/routes/autentication'));
app.use(require('./src/routes/links'));

//public 
app.use(express.static(path.join(__dirname, 'public')));
//starrt de server 
app.listen(app.get('port'),()=> {
    console.log('server on port', app.get('port'));
})


