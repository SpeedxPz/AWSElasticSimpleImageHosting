const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const busboy = require('connect-busboy');

const bucketName = process.env.BUCKET_NAME;

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY
  });

var s3 = new AWS.S3();

app.use(busboy());

app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/upload',(req,res) => {
	req.pipe(req.busboy);
	req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
		console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
		
		if(mimetype == "image/jpeg" || mimetype == "image/png")
		{
		
		
			var params = {
			  Bucket: bucketName,
			  Key : "images/"+Date.now()+"_"+path.basename(filename),
			  Body : file
			};
			
			s3.upload(params, function (err, data) {
			  if (err) {
				console.log("Error", err);
			  }

			  if (data) {
				console.log("Uploaded in:", data.Location);
				fs.readFile(__dirname + '/public/show.html', 'utf8', function(err, html){
					html = html.replace(new RegExp("{{imagename}}", 'g'), params.Key.replace("images/",""));
					res.send(html);
				});
			  }
			});
		}
		else
		{
			res.send("This is not image file!");
		}
	});
	
});

app.get('/i/:fileName', (req,res) => {
	
	
	
	var params = {
	  Bucket: 'billy01-bucket',
	  Key : "images/" + req.params.fileName
	};
	
	
	s3.getObject(params,(err,data) => {
		
		if(data == null)
		{
			res.header("Content-Type", "text/html");
			res.status(404).send("File not found");
		}
		else
		{
			res.header("Content-Type", "image/jpeg");
			res.send(data.Body);
		}
	});
});

app.listen(process.env.PORT || 8080,() => console.log('Service Started'));