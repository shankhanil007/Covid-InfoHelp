var express=require("express");
var bodyParser  =   require("body-parser");
const request = require('request');
const puppeteer = require('puppeteer');
var app=express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));




app.get("/world",function(req, res){
	var c=0,a=0,r=0,d=0;
	request('https://corona.lmao.ninja/countries', function(error, response,body){	
		
  		if(!error && response.statusCode == 200){
			var parse= JSON.parse(body);
			for(var i=0;i<parse.length;i++){
				c+=parse[i].cases;
				a+=parse[i].active;
				r+=parse[i].recovered;
				d+=parse[i].deaths

			}
		res.render("world.ejs",{arr: parse,c:c,a:a,r:r,d:d});
	}
});	
});



app.get("/india",function(req, res){
	
 	request('https://api.covid19india.org/data.json', function(error, response,body){
		if(!error && response.statusCode == 200){
			var parse= JSON.parse(body); 
			var x1=[]; var x2=[]; var x3=[];
			var y1=[]; var y2=[]; var y3=[];
			var i=0;
			request('https://api.covid19india.org/data.json', function(error, response,body){

				if(!error && response.statusCode == 200){
					var parseData= JSON.parse(body);
					parseData.cases_time_series.forEach(function(info){
						x1[i]=info.date.substring(0,6);
						x2[i]=info.date.substring(0,6);
						x3[i]=info.date.substring(0,6);
						y1[i]=info.totalconfirmed;
						y2[i]=info.totalrecovered;
						y3[i]=info.totaldeceased;
						i++;
					});
				}
				res.render("india.ejs",{arr: parse.statewise,x1: x1, y1: y1, x2: x2, x3: x3, y2: y2, y3: y3});
			});
		}		
	});
});



app.get("/",function(req, res){
	var c=0,a=0,r=0,d=0;  var ic,ia,ir,id;
	request('https://corona.lmao.ninja/countries', function(error, response,body){	
		
  		if(!error && response.statusCode == 200){
			var parse= JSON.parse(body);
			for(var i=0;i<parse.length;i++){
				c+=parse[i].cases;
				a+=parse[i].active;
				r+=parse[i].recovered;
				d+=parse[i].deaths
				
				if(parse[i].country == "India")
					{
						ic=parse[i].cases;
						ia=parse[i].active;
						ir=parse[i].recovered;
						id=parse[i].deaths;		
					}

			}
		res.render("home.ejs",{arr: parse,c:c,a:a,r:r,d:d,ic:ic,ia:ia,ir:ir,id:id});
	}
});	
});


app.get("/news",function(req, res){
	res.render('news.ejs',{data: null});
});



app.post("/news",function(req,res){
var pla= req.body.place;
var url='https://www.google.com/search?q=covid+19+'+pla+'&sxsrf=ALeKk02SupK-SO625SAtNAmqA5CHUj5xjg:1586447007701&source=lnms&tbm=nws&sa=X&ved=2ahUKEwikieXS19voAhXAxzgGHV5bCcQQ_AUoAXoECBwQAw&biw=1536&bih=535';

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);
	//   await page.screenshot({path: 'example.png'});

	var data = await page.evaluate(() =>
		Array.from(document.querySelectorAll('div.g'))
			.map(compact => ({
				headline: compact.querySelector('h3').innerText.trim(),
				img: compact.querySelector("img") === null ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1280px-No_image_3x4.svg.png' : compact.querySelector("img.th.BbeB2d").src,
				url: compact.querySelector("h3.r.dO0Ag>a").href,
				source: compact.querySelector("div.gG0TJc>div.dhIWPd>span.xQ82C.e8fRJf").innerText.trim(),
				time:  compact.querySelector("div.gG0TJc>div.dhIWPd>span.f.nsa.fwzPFf").innerText.trim(),
				desc : compact.querySelector("div.st").innerText.trim()
				
			}))
	)
	
	res.render('news.ejs',{data: data});
	await browser.close();
})();

});














app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});