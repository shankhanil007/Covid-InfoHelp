# Covid-Info/Help

Covid-Info/Help is a website that serves two main purposes. Firstly it's an information site on Covid-19. It displays real time statistics of the world(country-wise) and India(state-wise and district-wise) regarding Covid-19 situation. Users can also get information about Covid-19 testing centers, helpline-nos, NGO's, Hospitals, etc. available in various cities of India. The website also has a unique news feature that renders 10 latest news related to Covid-19 of the place entered by the user. A mini Covid-19 risk checker facility is also provided.


Secondly, through Covid-help website small business shops can accept orders online. This facility serves two purposes :
   1. Buyers : Since customers are unable to move out of their houses during
         lockdown, they can place an e-order through the website without having to
         visit the store physically.
   2. Sellers : Due to lockdown, the small businesses are experiencing lesser
         customer visits and thus less revenue. The option of accepting e-orders
         ensures that stores do not have to suffer losses just because customers
         cannot step out of their houses.

Maps feature has been added for easy navigation to shops.



## Motivation
 The very world we know and love is changing by the second due to the spread of COVID-19. People are stuck in their houses and are badly impacted by this crisis. People are very curious about questions like -
 * How many cases has my City registered?
 * What is the totals number of active cases in India or Worldwide?
 * What are the latest news regarding Covid-19 of my city?
 * Are there any Covid testing labs, hospitals, free food shelters, NGOs, etc. nearby me?
 * Which phone number to dial in case of emergency?
 
 All these questions were the basis of our Covid-info project and we tried to create a one-stop solution for all questions.
 
Another problem faced by people now is crowding of people in front of grocery stores while collecting orders. This leads to total disruption of the concept of social distancing. So our team thought of designing a website where these small grocery stores can take their orders online. People can place online orders from home and come to the shop to directly collect their orders. This will reduce the waiting time in long queues and also enforce social distancing. Therefore we have launched Covid-help website. 


## Code style
  1. Proper folder structure has been maintained
  
       ![alt text](https://github.com/shankhanil007/hello-world/blob/master/Capture.PNG "Folder Structure")

  2. Proper indenting and sequential inclusion of files
      ![alt text](https://github.com/shankhanil007/hello-world/blob/master/Capture2.PNG "File inclusion")
  
  3. Basic HTML5 syntax with bootstrap included
      ![alt text](https://github.com/shankhanil007/hello-world/blob/master/Capture3.PNG "HTML syntax")
      
   4. Plain JavaScript used
       ![alt text](https://github.com/shankhanil007/hello-world/blob/master/Capture4.PNG "Javascript code")
   



## Tech/framework used
The following tools were used in building this site
* Front-end development
  * HTML
  * CSS
  * BootStrap 
  * Semantic UI
  
* Back-end development
  * Javascript
  * Node.js
  * Express.js
  * jQuery
  
* Database used
  * mongodb
  
* Authorisation/Authentication
  * passport.js
  
* Web- Scrapping
  * puppeteer.js

* Graphical tools
  * d3.js
  * Scalable Vector Graphics (SVG)
  
* Maps
   * mapmyindia API



## Features
* **Covid-info website**
  * Recent statistics of Covid-19 confirmed, active, recovered, deaths cases of world(country-wise) and India(state-wise and district-wise) rendered in tabular format.
  * Graphical Representation ( line-charts ) of data for better understanding.
  * Choropleth map of world and India for better data visualisation.
  * Accurate and Effective news scrapper that renders 10 latest news of a place.
  * Additional important information like - Covid-19 testing centers, Hospitals, Govt. Helpline nos., Free food services, Shelter homes and much more.
  * Additional risk checker of Covid-19 for users.
 
 
* **Covid-help website**
  * Small shops and businesses can currently take their business online by signing up on our website.
  * Maps feature added for easy location and identification of shops by users.
  * Extremely simple to place orders.
  * Easy maintenance of order data as 'New Orders', 'Payment Pending Orders', 'Completed Orders' category.
  * Search orders by buyer name, phone no., order date.
  * Each order has a unique id to prevent order mismatch. Also date and time of order are also recorded.
  * Easy bill generation and downloadable in PDF format.
 

* Authentication
  * Secure Authentication features implemented with passport.js
  * No two usernames can be same.
  * No two shops can have same ids
  * User cannot use the features of our site without being logged in.
 
* Additional features
  * Well sanitized code base and easy to maintain
  * All RESTful routes followed and proper routes maintained.
  * Responsive website, suitable for desktop and mobile use. 
 
 





## Installation
It is very easy to use our project if anyone wants. Just follow the steps :

1. Firstly if you are working locally then you need to install the following :
    * Node.js
    * MongoDB
    * VS Code ( recommended , Any other suitable code editor will work )
  
2. Next you need to clone our project's GitHub repository to your desktop 

3. Open command line navigate to the project folder. Then type the following commands to install required dependencies :
     ```javascript
      npm install async, body-parser, connect-flash, ejs, express, express-session, locus, method-override, mongoose, passport, passport-     local, passport-local-mongoose, puppeteer, request --save
     ```
4. Your package.json should look like this with the following dependencies
     ```javascript
     "dependencies": {
       "async": "^3.2.0",
       "body-parser": "^1.19.0",
       "connect-flash": "^0.1.1",
       "ejs": "^3.0.2",
       "express": "^4.17.1",
       "express-session": "^1.17.1",
       "locus": "^2.0.4",
       "method-override": "^3.0.0",
       "mongoose": "^5.9.6",
       "passport": "^0.4.1",
       "passport-local": "^1.0.0",
       "passport-local-mongoose": "^6.0.1",
       "puppeteer": "^2.1.1",
       "request": "^2.88.2",
       "twilio": "^3.42.1"
     }
   }
   ```    
5. Initializing mapmyindia API :
      * Go to [MapMyIndia](https://www.mapmyindia.com/api/) website and Sign Up for free
      * After signing up in your dashboard you will find 3 API keys
      * Place the 3 API keys accordingly in *newSeller.ejs* and *order.ejs* files as follows :
        ```javascript
           <script src="https://apis.mapmyindia.com/advancedmaps/v1/<API_KEY>/map_load?v=1.3"></script>
         
          function Auth_token_generate(){
            $.ajax({
                data: {
                "grant_type": "client_credentials",
                "client_id": "<CLIET_ID_KEY",
                "client_secret": "CLIENT_SECRET_KEY"
                },  
              
          function distance_matrix({
         jsonp('https://apis.mapmyindia.com/advancedmaps/v1/<REST_KEY>/distance_matrix/driving/90.33687,23.470314;90.379249,23.497178;90.497009,23.546286?rtype=1&region=bgd', function(data) {
                console.log(data);
                alert(JSON.stringify(data));
            });
        }
      ```
     
6. After successful installation run the following command to start the application :
      ```javascript
       node app.js
      ```
   If you see *Server Has Started!!* then you have successfully setup everything and good to go with our application.








## API Reference
The following API's were used used to fetch Covid-19 data for our website that renders data in JSON format
  * [https://corona.lmao.ninja/v2/countries](https://corona.lmao.ninja/v2/countries)
  * [https://api.rootnet.in/covid19-in/stats/latest](https://api.rootnet.in/covid19-in/stats/latest)
  * [https://api.rootnet.in/covid19-in/stats/history](https://api.rootnet.in/covid19-in/stats/history)
  * [https://api.covid19india.org/resources/resources.json](https://api.covid19india.org/resources/resources.json)
  
The project also uses Maps api of mapmyindia.org to render maps
 * [https://www.mapmyindia.com/api/advanced-maps/doc/interactive-map-api](https://www.mapmyindia.com/api/advanced-maps/doc/interactive-map-api)



## Challenges we ran into

1. **Finding the right APIs :** Our first challenge was to find suitable APIs that would render data for our Covid-info website. It took us some time but we managed to find a website that had multiple APIs rendering Covid-19 related information in JSON format. It was then easier for us to parse the JSON data into javascript object.

2. **Making choropleth maps with SVG and d3.js :** We thought of incorporating choropleth maps in our website for better visualisation of Covid-19 situation. Being new to web development we had absolutely no idea how to go about it. After going through several articles on *stackoverflow.com* we learnt *d3.js* library could be useful to us. *d3.js* is a javascript library that helps you bring data to life using HTML, SVG, and CSS. But using the library and understanding its usage was very challenging. Also to render our map we needed *topojson* data of the world. Thanks to this great tutorial on [YouTube](https://www.youtube.com/watch?v=045-bsOsbJc) which made our learning process easier.

3. **Web scrapping dynamic data :**  Building of the Covid-19 news scrapper was a difficult task for us. We had never done web scrapping before. After going through several tutorials we successfully used *request.js* and *cheerio.js* to scrap data from a website. But our task was to build a news scrapper whose data constantly gets updated with time. After a lot of research we learnt that the previous tools could scrape only static data. We then took help of *puppeteer.js* which is headless chrome browser suitable for scrapping dynamic data.

4. **Problem of using Google maps API from India :**  In our online grocery store project, for ease of identification and navigation to shops we wanted to add a maps feature. Our first choice was google maps API. In order to use the API we needed to set-up a payment method with a recurring-transaction allowable credit card. Also for Indian users google does not accept debit cards. Since we could not setup a payment method we had a hard time in finding a suitable free maps API. Thats when we found 
[mapmyindia APIs](https://www.mapmyindia.com/api/). This API provides accurate mapping functionalities, with some additional features to google maps and has a user friendly documentation.

5. **Interchange of data in MongoDB :**  In our online grocery store project we had a very difficult time in interchanging data in our mongodb database. Our task was to make it easier for shopkeepers to maintain the record of orders under *New Orders*, *Payment Pending* and *Completed* categories. With one click the user must be able to transfer the order from *New Orders* to *Payment Pending* category. To overcome this problem we had to redesign the schema of our orders model keeping all the above categories as separate from one another. This helped in proper transfer of data. 

6. **Using authentication feature :** This was one of the most important features of our grocery project. We had to ensure no two users can have same username, each shop is identified by a unique id, users cannot place online orders without logging in and so on.  For this we used  passport.js library which provides simple, unobtrusive authentication for Node.js. Also its great documentation helped us incorporate it properly in our project.

7. **Non-availability of members at one location :** Due to current Covid-19 crisis our team was working on this project from three different locations. This was quite difficult in many occasions but still we coordinated well with each other. We were constantly in touch with each other over phone and updated the developments of our project on GitHub.
















## Contribute
Our team is new to web development. Although we have tried our best to make our application robust and secure, errors might have crept in. If you have any ideas, just [open an issue](https://github.com/shankhanil007/Covid-Info-v3/issues) and tell us what you think.

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.

  1. Fork it (https://github.com/your_userID/Covid-Info-v3/fork)
  2. Create your own branch (git checkout -b views/newPages)
  3. Commit your changes (git commit -am 'Added new auth feature')
  4. Push to the branch (git push origin views/newPages)
  5. Create a new Pull Request





## Credits
   * Rajat Sharma(3rd year ECE UG at Sardar Vallabhbhai National Institute of Technology, Surat) for acting as our mentor and constantly guiding us throughout the project.
   * [MapmyIndia Interactive Map JS](https://github.com/MapmyIndia/mapmyindia-interactive-map-js-api) for their detailed GitHub repository on how to use thier features. 
   * [COVID-19 REST API for India](https://github.com/amodm/api-covid19-in) for providing opensource APIs related to Covid-19 information and helping thousands of developers.


#### Developed by : HyperText Coders


