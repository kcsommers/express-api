var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');

var app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));
// app.use(ejsLayouts);

// GET /songs - returns all songs
app.get('/songs', function(req, res) {
	var songs = fs.readFileSync('./data.json');
	songs = JSON.parse(songs);
	res.render('songs/index', {songs: songs}); // creates var for ejs file to reference songs array
});

// GET /songs/new - returns the form for adding (CREATE)
app.get('/songs/new', function(req, res) {
	res.render('songs/new');
});

// POST /songs - adds a new song
app.post('/songs', function(req, res) {
	var songs = fs.readFileSync('./data.json');
	songs = JSON.parse(songs);
	songs.push({name: req.body.name, album: req.body.album});
	fs.writeFileSync('./data.json', JSON.stringify(songs));
	res.redirect('/songs');
});

//  GET /songs/:name - get 1 song
app.get('/songs/:id', function(req, res) {
	var songs = fs.readFileSync('./data.json');
	songs = JSON.parse(songs);
	if(songs[req.params.id]) {
		res.render('songs/show', {song: songs[req.params.id]});
	}
	else {
		res.send('No Can Doosville')
	}
});

// GET /songs/edit - returns the form for updating (UPDATE)
app.get('/songs/:id/edit', function(req, res) {
	var songs = fs.readFileSync('./data.json');
	songs = JSON.parse(songs);
	if(songs[req.params.id]) {
		res.render('songs/edit', {song: songs[req.params.id], id: req.params.id});
	}
	else {
		res.send('No Can Doosville')
	}
});

// PUT /songs/:name - update 1 song
app.put('/songs/:id', function(req, res) {
	var songs = fs.readFileSync('./data.json');
	songs = JSON.parse(songs);
	if(songs[req.params.id]) {
		songs[req.params.id].name = req.body.name;
		songs[req.params.id].album = req.body.album;
		fs.writeFileSync('./data.json', JSON.stringify(songs));
		res.json(songs);
	}
	else {
		res.send('No Can Doosville')
	}
});
// DELETE /songs/:name - delete 1 song
app.delete('/songs/:id', function(req, res) {
	var songs = fs.readFileSync('./data.json');
	songs = JSON.parse(songs);
	if(songs[req.params.id]) {
		songs.splice(songs[req.params.id], 1);
		fs.writeFileSync('./data.json', JSON.stringify(songs));
		res.json(songs);
	}
	else {
		res.send('No Can Doosville')
	}
});

app.listen(3000);