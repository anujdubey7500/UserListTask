const express=require('express');
const bodyParser=require('body-parser');
const request=require('request');
const https=require('https');
const { json } = require('body-parser');
const rp = require("request-promise");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

var final=[];
app.get('/', function (req, res) {

    var url = "https://reqres.in/api/users?page=1";
    var url_test = "https://reqres.in/api/users?page=2";
  
    Promise.all([rp({uri: url, json:true}), rp({uri: url_test, json:true})]).then(([apiData, test]) => {
        let List1=apiData.data;
        let List2=test.data;
        final=List1.concat(List2);
        res.render('List1', {UserList:final});
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
  });



app.listen(3000, function(){

    console.log("Server is running on port 3000");
});
