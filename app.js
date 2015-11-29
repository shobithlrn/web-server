var express=require('express');
var app=express();
var middleware=require('./middleware')

app.use(middleware.requireAuthentication);

app.get('/about',middleware.logger, function(req,res)
{
	res.send('About page')
});

app.use(express.static(__dirname+'/public'));
console.log(__dirname);

app.listen(3000,function()
{
	console.log('listening to port 3000')
});