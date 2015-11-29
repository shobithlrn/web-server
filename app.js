var express=require('express');
var app=express();
var middleware=require('./middleware');
var PORT=process.env.PORT||3000;


app.use(middleware.requireAuthentication);

app.get('/about',middleware.logger, function(req,res)
{
	res.send('About page')
});

app.use(express.static(__dirname+'/public'));
console.log(__dirname);

app.listen(PORT,function()
{
	console.log('listening to port>>>>'+PORT)
});