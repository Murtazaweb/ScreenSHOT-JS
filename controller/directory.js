const express = require('express'),
userRouter = express.Router();
const AdmZip = require('adm-zip');
let directoryModel = require("../models/directoryModel");
let {PythonShell} = require('python-shell'),
config = require('dotenv'),
jwt = require('jsonwebtoken'),
bcrypt = require('bcryptjs');
config.config();
let layoutPath = './layouts/layout';

/*let directoryCtrl ={
create: async(req,res)=>{
    let newDirectory =new directoryModel(req.body);
    let savedDirectory = await newDirectory.save();
    res.json(savedDirectory);
}
}*/

const addUrl = async (req, res, next) => {
   /* let newDirectory =new directoryModel(req.body);
    let savedDirectory = await newDirectory.save()
        .then(savedDirectory => {
            // console.log(`This is the cookie from front ${req.cookies.jwtToken}`);
            res.status(200).json({ data: savedDirectory })
        })
        .catch(err => next(err));*/
        console.log('inside URL func');
        console.log(req.user);
        const decoded = jwt.verify(req.cookies.jwtToken, process.env.JWT_SECRET);  
        console.log(decoded.sub);

        const myUrl1 =Object.keys(req.body);
        console.log('req',myUrl1[0]);
        const myUrl = myUrl1[0];


        let newDirectory =new directoryModel({
            endpoint: myUrl,
            _username: decoded.sub
        });
    let savedDirectory = await newDirectory.save();

    

const urlObject = new URL(myUrl);
const hostName = urlObject.hostname;
// The regular expression below works with .com, .net, .org and other top level domain names 
let domainName = hostName.replace(/^[^.]+\./g, '');
//const protocol = urlObject.protocol;;
console.log('Domain:', domainName);

const sUrl = myUrl.replace(/^https?:\/\//, '');

 fs = require('fs');
 dir = `./directoryFiles/${sUrl}`;    //name of the directory/folder

if (!fs.existsSync(dir)){    //check if folder already exists
    fs.mkdirSync(dir);
    console.log('done')    //creating folder
}



/*let pyshell = new PythonShell('main.py',hostName); // 1 v
 
pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  console.log(message); // here there will be logged your pyoutput
}); // 2
 
// end the input stream and allow the process to exit
pyshell.end(function (err,code,signal) {
  if (err) throw err;
  console.log('The exit code was: ' + code);
  console.log('The exit signal was: ' + signal);
  console.log('finished');
  console.log('finished');
});*/




/*let options = {
    //mode: 'text',
    //pythonPath: '/path/to/python/bin/python3.7',
    pythonOptions: ['-u'], // get print results in real-time
    //scriptPath: '/my_script.pv',
    args: [hostName]
};

PythonShell.run('./directoryFiles/main.py', options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during executions
    console.log('results: %j', results);
});*/

/*
var exec = require('child_process').exec;
//var path = require('path');

var file_path = './directoryFiles/main.py';
exec('python ' + file_path, function (error, stdout, stderr) 
{ 
    if(error){
        console.log(stderr);
    }else {
        console.log(stdout);
      }
});
*/




//zipp funcitnality 
/*if(fs.existsSync(dir)){
    setTimeout(function () {
        ZippFunc(hostName, req, res);
    }, 2000);
console.log('executing Nodejs ZIP Func')
}
else{
    console.log('nothing here')
}*/

/*(function(next) {
	pythonFunc(myUrl);
    console.log('work done')
  next()
}(function() {
	if(fs.existsSync(dir)){
       ZippFunc(hostName,req,res);
    console.log('executing Nodejs ZIP Func');
    }
    else{
        console.log('nothing here');
    }
}))*/
 



const spawn = require('child_process').spawn;
const ls = spawn('python3', ['/home/devm/.local/lib/python3.8/site-packages/main.py',myUrl]);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
  if(fs.existsSync(dir)){
    ZippFunc(hostName,req,res);
 console.log('executing Nodejs ZIP Func');
 }
 else{
     console.log('nothing here')
 }
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code, signal) => {
  console.log(`child process exited with code ${signal}`);
});                                       

/*//const spawn = require('child_process').spawn; 
const { spawn } = require('child_process');
function runFfmpeg(myUrl) {
    var proc = spawn('python', ['./directoryFiles/main.py' , myUrl]);
    proc.stdout.on('data', function(data) { console.log("stdout: " + data); });
    proc.stderr.on('data', function(data) { console.log("stderr: " + data); });
    proc.on('exit', function(code) { console.log("exit: " + code); });
  }
  
  var myUrlLists = [myUrl];
  myUrlLists.forEach(function(myUrl) { runFfmpeg(myUrl); });*/


   // res.redirect('/dashboard');;
}


//pythonFunc = myUrl =>{

    
//ls.kill('SIGTERM');

//}


ZippFunc =(hostName,req,res) =>{
    var uploadDir = fs.readdirSync(`./directoryFiles/${hostName}`);
console.log('path', uploadDir);
const zip = new AdmZip();

for(var i = 0; i < uploadDir.length;i++){
    zip.addLocalFile(`./directoryFiles/${hostName}/${uploadDir[i]}`);
}

// Define zip file namess 
const downloadName = `${hostName}.zip`;
console.log('zipfile path here', downloadName);

const data = zip.toBuffer();

// save file zip in root directory
zip.writeZip(`./downloads/${downloadName}`);

// code to download zip file

res.set('Content-Type','application/octet-stream');
res.set('Content-Disposition',`attachment; filename=${downloadName}`);
res.set('Content-Length',data.length);
res.send(data);
}






const showUrl = async(req,res) =>{
    const decoded = jwt.verify(req.cookies.jwtToken, process.env.JWT_SECRET);  
        console.log(decoded.sub);
    const urlList = await directoryModel
        .find({_username:decoded.sub})
        .populate('_username','username')
        .select('endpoint');  
    console.log(urlList); 
    res.render('showurl', { title: 'URLS LIST', layout: layoutPath,dataList: urlList })
}

module.exports ={addUrl, showUrl};


/*let pyshell = new PythonShell('my_script.py',hostName); // 1 v
 
pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  console.log(message); // here there will be logged your pyoutput
}); // 2
 
// end the input stream and allow the process to exit
pyshell.end(function (err,code,signal) {
  if (err) throw err;
  console.log('The exit code was: ' + code);
  console.log('The exit signal was: ' + signal);
  console.log('finished');
  console.log('finished');
}); // 3 */
