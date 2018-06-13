var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');

var app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: false}));
app.use(ejsLayouts);

// GET /songs - returns all songs
app.get('/songs', function(req, res) {
	var songs = fs.readFileSync('./data.json');
	songs = JSON.parse(songs);
	res.json(songs);
});

app.listen(3000);