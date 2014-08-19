  // Visit http://apidev.accuweather.com/developers/languages for a list of supported languages

// Contact AccuWeather to get an official key. They key in this
// example is temporary and should NOT be used it in production.
//var apiKey = "cloudBurst"; 

var language = 'en';
//var apiKey = 'c15a496f002b40aaad42797852e9b09e';
var api = 'apidev';
//var api = 'api';
var apiKey = 'cloudburst';

var severeWeatherInterval = setInterval(checkSevereWeather,300000);

function getCurrentLatLong(){
	//This will be updated later to interface with a GPS device 
	return {"lat":33.472404,"long":-104.545898}
	//lat:33.349960,long:-105.68.2983
}

function getLocationKey(){
	var coords = getCurrentLatLong();

	//Call to get the Key
	keyCall = {
			type: "GET",
			url: "http://"+api+".accuweather.com/locations/v1/cities/geoposition/search.json?q="+coords.lat+","+coords.long+"&apikey="+apiKey,
			dataType: "jsonp"
	}	
	return keyCall;
}

function getSevereWeatherAlert(locationKey){
	alertCall = {
		type:"GET",	
		url:"http://"+api+".accuweather.com/alerts/v1/"+locationKey+".json?apikey="+apiKey+"&details=true",
		dataType: "jsonp"
	}
	return alertCall;
}

function checkSevereWeather(){
	$.when($.ajax(getLocationKey())).then(function(response){$.when($.ajax(getSevereWeatherAlert(response.Key))).then(function(alertResponse){
		//severe weather return data
			if(alertResponse.length != 0 && $("#weather_alert").length == 0){
				var block = generateSevereWeatherAlert(alertResponse[0]);
				$("body").append(block);
			}
		})
	});
}

function generateSevereWeatherAlert(alertInfo){
	var alertBlock = $(document.createElement('div')).attr("id","weather_alert");
	
	var dismiss = $(document.createElement('span')).addClass("dismissAlert fontSizeXXLarge").html("&times;").click(function(ev){$(ev.target).closest("#weather_alert").remove()});
	
	var header = $(document.createElement('h1')).html("Severe Weather Alert");
	
	var description = $(document.createElement('p')).html(alertInfo.Description.Localized);
	var category = $(document.createElement('p')).html("Category: "+alertInfo.Category);
	var area = $(document.createElement('p')).html("Area: "+alertInfo.Area.Name);

	var source = $(document.createElement('p')).html("Source: "+alertInfo.Source);

	var text = $(document.createElement('p')).html(alertInfo.Area[0].Text);

	alertBlock.append(dismiss,header,description,category,area,source,text);
	return alertBlock;
}