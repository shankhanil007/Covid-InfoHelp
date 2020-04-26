// var express=require("express");
// var bodyParser  =   require("body-parser");
// const request = require('request');
// const puppeteer = require('puppeteer');
// var app=express();
// var twilio = require('twilio');
// var json = require("./public/json/helpline.json");
// var resources = require("./public/json/resources.json");



var express  					=  	require("express");
var bodyParser  				=   require("body-parser");
var request					    = 	require('request');
const puppeteer 				= require('puppeteer');
var mongoose         			=   require("mongoose");
var app 						= 	express();
var flash           			=   require("connect-flash");
var Seller      				=   require("./models/seller");
var passport         			=   require("passport");
var User             			=   require("./models/user");
var NewOrder          			=   require("./models/newOrder");
var payPending         			=   require("./models/payPending");
var completed         			=   require("./models/completed");
var Bill     					=   require("./models/bill");
var LocalStrategy   			=   require("passport-local");
var passportLocalMongoose 		= 	require("passport-local-mongoose");
var methodOverride				= 	require("method-override");
var async 						= require("async");
var json = require("./public/json/helpline.json");
var resources = require("./public/json/resources.json");


mongoose.connect('mongodb://localhost:27017/Covid_info',{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.use(require("express-session")({
    secret: "AMOC Groceries Project",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});





app.get("/helpline",function(req, res){
	res.render("helpline.ejs");
})

app.get("/riskChecker",function(req, res){
	res.render("riskChecker.ejs");
})



app.get("/world",function(req, res){
	var c=0,a=0,r=0,d=0;
	request('https://corona.lmao.ninja/v2/countries', function(error, response,body){	
		
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
			var i=0; var district=[]; var dc=[];
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
					request('https://api.covid19india.org/v2/state_district_wise.json', function(error, response,body){
						if(!error && response.statusCode == 200){
							
							var parseData= JSON.parse(body);
							console.log(parseData);
							res.render("india.ejs",{arr: parse.statewise,x1: x1, y1: y1, x2: x2, x3: x3, y2: y2, y3: y3, district: parseData});
						}
					});
				}
			
				
			});
		}		
	});
});



app.get("/",function(req, res){
	var c=0,a=0,r=0,d=0;  var ic,ia,ir,id;
	request('https://corona.lmao.ninja/v2/countries', function(error, response,body){	
		
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
	const browser = await puppeteer.launch({args: ['--no-sandbox']});
	const page = await browser.newPage();
	
	await page.goto(url);

	const desc= await page.evaluate(() =>Array.from(document.querySelectorAll("div.st")).map((text) => text.innerText.trim()))
	

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







// app.get("/info", function(req, res){
// 	var s1=[];var x=0; 
// 	request('https://api.rootnet.in/covid19-in/hospitals/medical-colleges', function(error, response,body){	
		
//   		if(!error && response.statusCode == 200){
// 			var parse= JSON.parse(body);
// 			parse.data.medicalColleges.forEach(function(place){
// 				s1[x]=place.state;
// 				x++;
// 			})
			
// 			res.render("info.ejs",{state: s1, data:null, choice: "0"});
// 		  }
// 		});	
// });


// app.post("/info", function(req, res){
// 	var state=req.body.state;
// 	var choice=req.body.choice;

// 	if(choice == 1){
// 	var data=[];
// 	request('https://api.rootnet.in/covid19-in/hospitals/medical-colleges', function(error, response,body){	
		
//   		if(!error && response.statusCode == 200){
// 			var parse= JSON.parse(body);
// 			parse.data.medicalColleges.forEach(function(place){
// 				if(place.state === state)
// 				{
// 					data.push({
// 						state: place.state,
// 						name: place.name,
// 						city: place.city,
// 						owner: place.ownership,
// 						beds: place.hospitalBeds

// 					})
// 				}
// 			})

// 			var s1=[];var x=0; 
// 			request('https://api.rootnet.in/covid19-in/hospitals/medical-colleges', function(error, response,body){	
				
// 				  if(!error && response.statusCode == 200){
// 					var parse= JSON.parse(body);
// 					parse.data.medicalColleges.forEach(function(place){
// 						s1[x]=place.state;
// 						x++;
// 					})
					
// 					res.render("info.ejs",{state: s1, data: data,choice: "1"});
// 				  }
// 				});	
// 			}
// 	});
// 	}
	

// 	else{
// 			var data=[];
// 		json.data.contacts.regional.forEach(function(info){
// 			if(info.loc === state)
// 				{
// 			data.push({
// 				state: info.loc,
// 				no: info.number
// 			})
// 		}
// 		});

// 		var s1=[];var x=0; 
// 		request('https://api.rootnet.in/covid19-in/hospitals/medical-colleges', function(error, response,body){	
			
// 			  if(!error && response.statusCode == 200){
// 				var parse= JSON.parse(body);
// 				parse.data.medicalColleges.forEach(function(place){
// 					s1[x]=place.state;
// 					x++;
// 				})
				
// 				res.render("info.ejs",{state: s1, data: data,choice: "2"});
// 			  }
// 			});			
// 	}
	
// });









app.get("/info", function(req, res){
	var s1=[];var x=0; var s2=[]; var s3=[]; var s4=[]; var s5=[]; var s6=[];
	request('https://api.covid19india.org/resources/resources.json', function(error, response,body){	
		
  		if(!error && response.statusCode == 200){
			var parse= JSON.parse(body);
			parse.resources.forEach(function(place){
				s1[x]=place.state;
				if(place.city != "PAN State")
				{
					var obj={
						city: place.city,
						state: place.state
					}

					if(s4.includes(place.city) === false)  
					{
						s2.push(obj);
						s4.push(place.city);
					}
						
				}
					
			
					var obj={
						city: place.city,
						category: place.category
					}

					var flag=0;
					s5.forEach(function(info){
						if(JSON.stringify(info) == JSON.stringify(obj))
						{
							flag=1;
						}
					})

					if(flag==0)
					{
						s5.push(obj);
					}
					
			
					

				x++;
			
			})

			res.render("info2.ejs",{state: s1, city: s2, details: resources, categories : s5});
		  }
		});	



});






// ---------------------------------------------------------------------------------------------------
//---------------------------------------------------


app.get("/login", function(req,res){
    res.render("login.ejs");
});
app.get("/signup", function(req,res){
    res.render("signup.ejs");
});

app.post("/signup", function(req, res){
    User.register(new User({username: req.body.username,name: req.body.name, phone: req.body.phone, address: req.body.address}), req.body.password, function(err, user){
        if(err){				
           console.log(err);
        }
        passport.authenticate("local")(req, res, function(){
        //    req.flash("success","Welcome to YelpCamp "+ user.username);
			res.redirect("/groceries");
        });
    });
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/groceries",
    failureRedirect: "/login"
}) ,function(req, res){
});
app.get("/logout", function(req, res){
    req.logout();
	// req.flash("success","Logged you out!");
    res.redirect("/groceries");
});



app.get("/groceries",function(req,res){
    res.render("Grocery_home.ejs",{currentUser: req.user});
})


app.get("/:id/new/seller",isLoggedIn, function(req,res){
	Seller.findOne({seller_id: req.params.id}).populate("newOrder").exec(function(err, details){	    	        
		if(err)
			console.log(err);
		else
			{
				if(details!= undefined)
				{
					console.log("Sorry you cannot create another shop");
					req.flash("error","Sorry you cannot create another shop!");
					res.redirect("/groceries");
				}
					
				else
				res.render("newseller.ejs",{user: req.user});
			}
		});
    
})

app.post("/new/seller", function(req,res){
    Seller.create(req.body.seller, function(err, details){
		if(err)
			console.log("ERROR");
		else
			{
				details.seller_id = req.user._id;
				details.save();
				console.log("Successfully added");
				req.flash("success","Successfully added your Shop! ");
				res.redirect("/"+details._id+"/seller/newOrders");
			}
	});
})


app.get("/:id/seller/dashboard", function(req,res){


	Seller.findOne({seller_id: req.params.id}).populate("newOrder").exec(function(err, details){	    	        
		if(err)
			console.log(err);
		else
			{
				if(details!= undefined)
				{
					console.log(details.seller_id);
					console.log(req.params.id);
					res.render("newOrders.ejs", {details: details});
				}
				else{
					req.flash("error","Oops! You haven't set up a shop!");
					res.redirect("/groceries");
				}
				
			}

		});
	});








app.get("/:id/seller/newOrders", function(req,res){


		Seller.findById(req.params.id).populate("newOrder").exec(function(err, details){	    	        
			if(err)
				console.log(err);
			else
				{
					// var arr=[];
					 
					// 		function doA(){
					// 			return new Promise(resolve => {
					// 				details.newOrder.forEach(function(id){
					// 					NewOrder.findById(id, function(err, info){
					// 						// console.log(info);
					// 						arr.push(info);
					// 						// console.log("hi");
					// 					});
					// 				});	
					// 				setTimeout(() => {
					// 					resolve(arr);
					// 				  }, 3000);
					// 				});
	
	
									
					// 		// console.log("hello");
					// 	}
	
					// async function main(){
					// 	const result = await doA();
					// 	// console.log(result);
					// 	var regex=null;
						res.render("newOrders.ejs", {details: details});
					
			//	}
					// main();
					
						
						// a.then(
						// 	console.log(arr);
						// 	// res.render("newOrders.ejs", {details: details});
						// );
						
						// a.then( a=> {
						// 	console.log(arr);
						// 	res.render("newOrders.ejs", {details: details});
						// });
					
				}
		});	
})










app.get("/:id/seller/payPendings", function(req,res){
	
	Seller.findById(req.params.id).populate("payPending").exec(function(err, details){	    	        
		if(err)
			console.log(err);
		else
			{
				// var arr=[];
				 
				// 		function doA(){
				// 			return new Promise(resolve => {
				// 				details.payPending.forEach(function(id){
				// 					payPending.findById(id, function(err, info){
				// 						// console.log(info);
				// 						arr.push(info);
				// 						// console.log("hi");
				// 					});
				// 				});	
				// 				setTimeout(() => {
				// 					resolve(arr);
				// 				  }, 3000);
				// 				});


								
				// 		// console.log("hello");
				// 	}

				// async function main(){
				// 	const result = await doA();
				// 	// console.log(result);
					res.render("payPendings.ejs", {details: details});
				// }
				
				// main();
				
					
				
			}
	});
})



app.get("/:id/seller/completed", function(req,res){
	
	Seller.findById(req.params.id).populate("completed").exec(function(err, details){	    	        
		if(err)
			console.log(err);
		else
			{
				// var arr=[];
				 
				// 		function doA(){
				// 			return new Promise(resolve => {
				// 				details.completed.forEach(function(id){
				// 					completed.findById(id, function(err, info){
				// 						// console.log(info);
				// 						arr.push(info);
				// 						// console.log("hi");
				// 					});
				// 				});	
				// 				setTimeout(() => {
				// 					resolve(arr);
				// 				  }, 3000);
				// 				});


								
				// 		// console.log("hello");
				// 	}

				// async function main(){
				// 	const result = await doA();
				// 	// console.log(result);
					res.render("completed.ejs", {details: details});
				// }
				
				// main();
				
					
				
			}
	});
})















app.get("/order",isLoggedIn, function(req,res){
	Seller.find({}, function(err, details){
		if(err){
			console.log(err);
		} else {
			
		   res.render("order.ejs",{details: details});
		}
	 });	
});

app.get("/:id/seller/order",function(req,res){
	Seller.findById(req.params.id, function(err, details){	        
		if(err)
			console.log(err);
		else
			{
				res.render("placeorder.ejs", {details: details, user: req.user});
			}
	});
})


app.put("/:id/seller/newOrders", function(req,res){
		Seller.findById(req.params.id,function(err, seller){	        
				if(err)
						console.log(err);
					else
						{
							
							NewOrder.create(req.body.order, function(err, details){
								if(err){
									console.log(err);
								} 
								else {
										seller.newOrder.push(details);
										seller.save();
										console.log("Successfully placed order");
										req.flash("success","Successfully placed order. You will recieve notification regarding delivery details on your phone no. ");
										res.redirect("/"+req.params.id+"/seller/order");
								}
					});
				}
			});
});



app.put("/:id/seller/:orderid/bill", function(req,res){
	function doA(){
		return new Promise(resolve => {
			var arr={};
			Seller.findById(req.params.id,function(err, seller){	        
				if(err)
						console.log(err);
					else
						{
							NewOrder.findById(req.params.orderid, function(err,details){
								if(err)
									console.log(err);
								else
								{
										 arr={
										shop: seller.shop,
										shopphone: seller.phone,
										shopaddress: seller.address,
										id: details._id,
										buyer: details.buyer,
										phone:	details.phone,
										address: details.address,
										item: details.item,
										qty: details.qty,
										created: details.created,
								
									}
								
							Bill.create(arr, function(err, info){
								if(err){
									console.log(err);
								} 
								else {
										seller.payPending.push(info);
										seller.save();
										
								}
							});
						}
					});
					}
					});

			setTimeout(() => {
				resolve(arr);
			  }, 3000);
			});


			
	// console.log("hello");
}

async function main(){
const result = await doA();
// console.log(result);
	res.render("bill.ejs",{Details: result});
	
}

main();


});




app.put("/:id/seller/:orderid/paymentPending", function(req,res){
					function doA(){
						return new Promise(resolve => {
							Seller.findById(req.params.id,function(err, seller){	        
								if(err)
										console.log(err);
									else
										{
											NewOrder.findById(req.params.orderid, function(err,details){
												if(err)
													console.log(err);
												else
												{
													console.log(details);
													var arr={
														buyer: details.buyer,
														phone:	details.phone,
														address: details.address,
														item: details.item,
														qty: details.qty,
														desc: details.desc,
														created: details.created,
												
													}
													console.log(arr);
											payPending.create(arr, function(err, info){
												if(err){
													console.log(err);
												} 
												else {
														seller.payPending.push(info);
														seller.save();
														console.log("Payment pending");
					
												}
											});
										}
									});
									}
									});
		
							setTimeout(() => {
								resolve("hello");
							  }, 3000);
							});


							
					// console.log("hello");
				}

			async function main(){
				const result = await doA();
				// console.log(result);
				

				NewOrder.findByIdAndRemove(req.params.orderid, function(err){
					if(err)
						console.log(err);
					else
					{
						console.log("Deleted Successfully");
						res.redirect("/"+req.params.id+"/seller/newOrders");
					}
				});
			}
			
			main();


});

app.put("/:id/seller/:orderid/newOrders/completed", function(req,res){
	function doA(){
		return new Promise(resolve => {
			Seller.findById(req.params.id,function(err, seller){	        
				if(err)
						console.log(err);
					else
						{
							NewOrder.findById(req.params.orderid, function(err,details){
								if(err)
									console.log(err);
								else
								{
									console.log(details);
									var arr={
										buyer: details.buyer,
										phone:	details.phone,
										address: details.address,
										item: details.item,
										qty: details.qty,
										desc: details.desc,
										created: details.created,
								
									}
									console.log(arr);
							completed.create(arr, function(err, info){
								if(err){
									console.log(err);
								} 
								else {
										seller.completed.push(info);
										seller.save();
										console.log("completed order");
	
								}
							});
						}
					});
					}
					});

			setTimeout(() => {
				resolve("hello");
			  }, 3000);
			});


			
	// console.log("hello");
}

async function main(){
const result = await doA();
// console.log(result);


NewOrder.findByIdAndRemove(req.params.orderid, function(err){
	if(err)
		console.log(err);
	else
	{
		console.log("Deleted Successfully");
		res.redirect("/"+req.params.id+"/seller/newOrders");
	}
});
}

main();


});



app.put("/:id/seller/:orderid/payPendings/completed", function(req,res){
	function doA(){
		return new Promise(resolve => {
			Seller.findById(req.params.id,function(err, seller){	        
				if(err)
						console.log(err);
					else
						{
							payPending.findById(req.params.orderid, function(err,details){
								if(err)
									console.log(err);
								else
								{
									console.log(details);
									var arr={
										buyer: details.buyer,
										phone:	details.phone,
										address: details.address,
										item: details.item,
										qty: details.qty,
										desc: details.desc,
										created: details.created,
								
									}
									console.log(arr);
							completed.create(arr, function(err, info){
								if(err){
									console.log(err);
								} 
								else {
										seller.completed.push(info);
										seller.save();
										console.log("completed order");
	
								}
							});
						}
					});
					}
					});

			setTimeout(() => {
				resolve("hello");
			  }, 3000);
			});


			
	// console.log("hello");
}

async function main(){
const result = await doA();
// console.log(result);


payPending.findByIdAndRemove(req.params.orderid, function(err){
	if(err)
		console.log(err);
	else
	{
		console.log("Deleted Successfully");
		res.redirect("/"+req.params.id+"/seller/payPendings");
	}
});
}

main();


});
















function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


























var port = process.env.PORT || 3000;
app.listen(port,function(){
	console.log("Server Has Started!!");
});