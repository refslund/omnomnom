var map;
var markers = [];
var circle;

function alignWidths() {
		$('#rad-label').width($('#loc-label').width());
}

// Initialize map
// - Set options and styling
// - Bind to DOM
// - Draw search area (circle) 
function init_map() {
	var myOptions = {
		zoom:12,
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
	
	//
	// add search area
	circle = new google.maps.Circle({
		strokeColor: '#abb5ba',
		strokeOpacity: 0.2,
		strokeWeight: 2,
		fillColor: '#9cbac9',
		fillOpacity: 0.35,
		map: this.map,
		center: {lat: 37.758, lng: -122.389},
		editable: true,
		draggable: true,
		radius: 1650
	});
	google.maps.event.addListener(circle, 'radius_changed', function() {
		setRadiusValue(circle.getRadius())
	});
	google.maps.event.addListener(circle, 'center_changed', function() {
		setLocationValues(circle.getCenter().lat(), circle.getCenter().lng())
	});
	this.circle = circle;
	// init values in html
	setRadiusValue(circle.getRadius())
	setLocationValues(circle.getCenter().lat(), circle.getCenter().lng())
}

google.maps.event.addDomListener(window, 'load', init_map);


function setLocationValues(lat, lng) {
	// round to three decimal places for display
	lat = Math.round((lat + 0.00001) * 1000) / 1000;
	lng = Math.round((lng + 0.00001) * 1000) / 1000;
	$('#lat').attr('value', lat);
	$('#lng').attr('value', lng);
}
function setRadiusValue(radius) {
	$('#radius').attr('value', radius);
}


// Reads location from DOM.
// Calls search service,
// and displays markers for result.
function findTrucksInSearchArea() {
	this.clearMarkers();
	
	$('#search-btn').addClass('blue');
	$('#search-btn-icon').removeClass('glyphicon-search');
	$('#search-btn-icon').addClass('glyphicon-cog');
	$('#search-btn').blur();
	
	var that = this;

	var lat = $('#lat').attr('value');
	var lng = $('#lng').attr('value');
	var radius = $('#radius').attr('value');
	var data = {lat: lat, lng: lng, radius: radius};
	
	$.post("/search", data, function(json) {
		for (var i=0; i < json.length; i++) {
			var truck = json[i];
			that.buildTruckMarker(truck);
	}},
	"json")
	.always(function() {
			$('#search-btn').removeClass('blue');
			$('#search-btn-icon').addClass('glyphicon-search');
			$('#search-btn-icon').removeClass('glyphicon-cog');
	});
}

function buildTruckMarker(truck) {
	var lat = truck.latitude;
	var lng = truck.longitude;
	var title = truck.applicant;
	var msg = truck.locationdescription + '<br>Type: ' + truck.facilitytype + '<br>' + truck.fooditems + '<br>';

	// marker
	var marker = new google.maps.Marker({
		map: this.map,
		position: new google.maps.LatLng(lat, lng)
	});
	// info window + click listener
	var infowindow = new google.maps.InfoWindow({
		content: '<strong>'+title+'<\/strong><br>'+msg,
		maxWidth: 300
	});
	google.maps.event.addListener(
		marker,
		'click',
		function() { infowindow.open(this.map, marker) }
	);
	this.markers.push(marker);
}

// Clears all food truck markers from the map
function clearMarkers() {
	for (var i = 0; i < this.markers.length; i++) {
		this.markers[i].setMap(null);
	}
	this.markers = [];
}
