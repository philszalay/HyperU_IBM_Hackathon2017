/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------
// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
	// print a message when the server starts listening
	console.log("server starting on " + appEnv.url);
});

const
fileUpload = require('express-fileupload');

// default options
app.use(fileUpload());

app.post('/upload', function(req, res) {
	if (!req.files)
		return res.status(400).send('No files were uploaded.');

	// The name of the input field (i.e. "sampleFile") is used to retrieve the
	// uploaded file
	let
	sampleFile = req.files.sampleFile;

	// res.param, res.params.id,/name

	// Use the mv() method to place the file somewhere on your server
	sampleFile.mv('filename.jpg', function(err) {
		if (err)
			return res.status(500).send(err);

		res.send(req.query.sampleText);
	});
});

function API_Request_Image(path) {

	var VisualRecognitionV3 = require('/Users/philszalay/Downloads/Example1/watson-developer-cloud/visual-recognition/v3.js');
	var fs = require('fs');

	var visual_recognition = new VisualRecognitionV3({
		api_key : 'cf62d1374d490fe864ea4ecf92d928440ce344e4',
		version_date : VisualRecognitionV3.VERSION_DATE_2016_05_20
	});

	var params = {
		images_file : fs.createReadStream(path)
	};

	visual_recognition.classify(params, function(err, res) {
		if (err)
			console.log(err);
		else
			console.log(JSON.stringify(res, null, 2));
	});
}
