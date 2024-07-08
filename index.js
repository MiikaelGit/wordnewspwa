var express = require('express');
var app = express();
var path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    res.render('index');
});

app.get('/offlinePage', function(req, res) {
    res.render('offlinePage'); 
});

app.listen(3000, function() {
    console.log("Executando na porta 3000");
});

