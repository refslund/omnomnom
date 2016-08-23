function initializeMap() {
	console.log('initializeMap');
//    var mapOptions = {
//            center: new google.maps.LatLng(40.435833800555567, -78.44189453125),
//            mapTypeId: google.maps.MapTypeId.ROADMAP,
//            zoom: 11
//          };	 
//    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
};


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
			map = new google.maps.Map(document.getElementById('map'), myOptions);
			marker1 = new google.maps.Marker({
				map: map,
				position: new google.maps.LatLng(37.7748713162388, -122.398531708276)
			});
			infowindow1 = new google.maps.InfoWindow({content:'<strong>Title<\/strong><br>palo alto<br>'});
			marker2 = new google.maps.Marker({
				map: map,
				position: new google.maps.LatLng(37.78, -122.5)
			});
			google.maps.event.addListener(
				marker1,
				'click',
				function() {
					infowindow1.open(map,marker1);
				});
			//infowindow1.open(map,marker1); // pre-open
		}
		google.maps.event.addDomListener(window, 'load', init_map);

