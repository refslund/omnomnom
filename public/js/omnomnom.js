var map;
var markers = [];

function init_map() {
	var myOptions = {
		zoom:10,
		center:new google.maps.LatLng(37.77, -122.39),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: [
			{
				featureType: 'all',
				stylers: [
					{ saturation: -80 }
				]
			},{
				featureType: 'road.arterial',
				elementType: 'geometry',
				stylers: [
					{ hue: '#00ffee' },
					{ saturation: 50 }
				]
			},{
				featureType: 'poi.business',
				elementType: 'labels',
				stylers: [
					{ visibility: 'off' }
				]
			}
		]				
	};
	this.map = new google.maps.Map(document.getElementById('map'), myOptions);
}

google.maps.event.addDomListener(window, 'load', init_map);

// TEST
// Dynamically add some markers
// TODO Delete function
function addMarker() {
	console.log('***** add marker');
	
	marker1 = new google.maps.Marker({
		map: this.map,
		position: new google.maps.LatLng(37.7748713162388, -122.398531708276)
	});
	this.markers.push(marker1);
	infowindow1 = new google.maps.InfoWindow({content:'<strong>Title<\/strong><br>palo alto<br>'});
	marker2 = new google.maps.Marker({
		map: this.map,
		position: new google.maps.LatLng(37.78, -122.5)
	});
	this.markers.push(marker2);
	google.maps.event.addListener(
		marker1,
		'click',
		function() {
			infowindow1.open(this.map, marker1);
		});
}

// TEST
// Look up food truck by locationid
// TODO Delete function
function findMeATruck() {
	var that = this;
	
	$.ajax({url: "/getsome", success: function(result){
		var json = JSON.parse(result);
		var truck = json[0];
		
		var lat = truck.latitude;
		var lng = truck.longitude;
		
		var marker = new google.maps.Marker({
			map: that.map,
			position: new google.maps.LatLng(lat, lng)
		});
		that.markers.push(marker);
	}});	
}

// Clears all food truck markers from the map
function clearMarkers() {
	for (var i = 0; i < this.markers.length; i++) {
		this.markers[i].setMap(null);
	}
	this.markers = [];
}
