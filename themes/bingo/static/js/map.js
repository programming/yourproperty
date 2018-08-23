var geocoder,map,circle1,circle2,infowindow,service,lat,lng;var markersArray=[];function initialize(){geocoder=new google.maps.Geocoder();var latlng=new google.maps.LatLng(1.352083,103.81983600000001);var mapOptions={zoom:11,center:latlng}
map=new google.maps.Map(document.getElementById('map'),mapOptions)}
function getLatLong(){var postalCode='singapore '+document.getElementById('postalCode').value;geocoder.geocode({'address':postalCode},function(results,status){if(status=='OK'){map.setCenter(results[0].geometry.location);clearOverlays()
if(circle1)circle1.setMap(null);if(circle2)circle2.setMap(null);lat=results[0].geometry.location.lat();lng=results[0].geometry.location.lng();var marker=new google.maps.Marker({map:map,position:results[0].geometry.location,icon:'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'});markersArray.push(marker);map.setZoom(14);map.setCenter(marker.getPosition());var inputLocation={lat,lng};infowindow=new google.maps.InfoWindow();var service=new google.maps.places.PlacesService(map);service.nearbySearch({location:inputLocation,radius:2000,type:['school'],keyword:['primary']},callback);circle1=new google.maps.Circle({strokeColor:'#FF0000',strokeOpacity:0.8,strokeWeight:2,fillColor:'#FF0000',fillOpacity:0.15,map:map,center:inputLocation,radius:1000});circle2=new google.maps.Circle({strokeColor:'#528BE2',strokeOpacity:0.8,strokeWeight:2,fillColor:'#528BE2',fillOpacity:0.15,map:map,center:inputLocation,radius:2000})}else{alert('Geocode was not successful for the following reason: '+status)}})}
function callback(results,status){if(status===google.maps.places.PlacesServiceStatus.OK){for(var i=0;i<results.length;i++){createMarker(results[i])}}}
function createMarker(place){var placeLoc=place.geometry.location;var marker=new google.maps.Marker({map:map,position:place.geometry.location});markersArray.push(marker);google.maps.event.addListener(marker,'click',function(){infowindow.setContent(place.name);infowindow.open(map,this)})}
function clearOverlays(){for(var i=0;i<markersArray.length;i++){markersArray[i].setMap(null)}
markersArray.length=0}
$(document).ready(function(){var input=document.getElementById('postalCode');input.addEventListener('keyup',function(event){event.preventDefault();if(event.keyCode===13){document.getElementById('postalCodeSubmit').click()}})})