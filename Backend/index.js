const express 		= require('express');
const compression 	= require('compression');
const helmet 		= require('helmet');
const bodyParser 	= require('body-parser'); 		 
const cors 			= require('cors');
const http 			= require('http');
const https			= require('https'); 
 
const config 		= require("./config/config"); 
const approute 		= require('./routes/approute');
 
const file1 		= config.CERT_FILE1;
const file2 		= config.CERT_FILE2;
const file3			= config.CERT_FILE3;

const port 			= config.API_PORT;

const app 			= express(); 

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

app.use(function (req, res, next) {  
    res.setHeader('Access-Control-Allow-Origin', '*');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');   
    res.setHeader('Access-Control-Allow-Headers', '*');   
    res.setHeader('Access-Control-Allow-Credentials', true);   
    next();
});

 
  
app.get('/', (req, resp) => {
	resp.send("<h1>Wow ! Server Running &#128525;</h1>"); 
}); 

 
app.use('/api',approute);   


/*
var options = {   
     
	key: fs.readFileSync(file1),
    cert: fs.readFileSync(file2),
    ca: fs.readFileSync(file3),
    requestCert: false 
	 
};

var server = require('https').createServer(options, app);
server.listen(port, () => console.log(`Server is running on ${port}`));
*/

var options = {};
var server = http.createServer(options, app); 
 
server.listen(port, function() {
    console.log('App listening on port : '+port); 
}); 

