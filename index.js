var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');

var app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));
app.use(ejsLayouts);

// GET /songs - returns all songs
app.get('/songs', function(req, res) {
	var songs = fs.readFileSync('./data.json');
	songs = JSON.parse(songs);
	res.json(songs);
});

// POST /songs - adds a new song
app.post('/songs', function(req, res) {
	var songs = fs.readFileSync('./data.json');
	songs = JSON.parse(songs);
	songs.push({name: req.body.name, album: req.body.album});
	fs.writeFileSync('./data.json', JSON.stringify(songs));
	res.json(songs);
});

//  GET /songs/:name - get 1 song
app.get('/songs/:name', function(req, res) {
	var songs = fs.readFileSync('./data.json');
	songs = JSON.parse(songs);
	if(songs[req.params.name]) {
		res.json(songs[req.params.name]);
	}
	else {
		res.send('No Can Doosville')
	}
});
// PUT /songs/:name - update 1 song
app.put('/songs/:name', function(req, res) {
	var songs = fs.readFileSync('./data.json');
	songs = JSON.parse(songs);
	if(songs[req.params.name]) {
		songs[req.params.name] = {name: req.body.name, album: req.body.album};
		fs.writeFileSync('./data.json', JSON.stringify(songs));
		res.json(songs);
	}
	else {
		res.send('No Can Doosville')
	}
});
// DELETE /songs/:name - delete 1 song
app.delete('/songs/:name', function(req, res) {
	var songs = fs.readFileSync('./data.json');
	songs = JSON.parse(songs);
	if(songs[req.params.name]) {
		songs.splice(songs[req.params.name], 1);
		fs.writeFileSync('./data.json', JSON.stringify(songs));
		res.json(songs);
	}
	else {
		res.send('No Can Doosville')
	}
});

app.listen(3000);