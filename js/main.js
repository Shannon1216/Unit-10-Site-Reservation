

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA1bkT6cioEpZK6kSPauCl_IIcuQKDa534",
    authDomain: "reservation-site-e6f04.firebaseapp.com",
    databaseURL: "https://reservation-site-e6f04.firebaseio.com",
    projectId: "reservation-site-e6f04",
    storageBucket: "reservation-site-e6f04.appspot.com",
    messagingSenderId: "843921611167"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var objectName = {};

//objectToUpdate.propertyToAdd = getTextOfClickedListItem;

// initialize the configuration of map
function initMap() {

  var styles = [
{
  stylers: [
  { hue: '#602320'},
  { saturation: -60 }
  ]
},{
  featureType: 'road',
  elementType: 'geometry', 
  stylers: [
  {lightness: 100 },
  {visibility: 'simplified' }
  ]
}, {
  featureType: 'road',
  elementType: 'labels',
  stylers: [
  {visibility: 'off' }
  ]
}, {
  featureType: 'water',
  elementType: 'geometry',
  stylers: [
  { color: '#404041'},
  { visibility: 'inherit'},
  { weight: '8'}
  ]
   }
];
  
navigator.geolocation.getCurrentPosition(function(position) {
   
    // create an object to store lat/lng data
    var userLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    
     var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat:40.8054491, lng: -73.9654415},
      zoom: 10,
      scrollwheel: true,
      styles: styles
    });




//first marker(user location)
    // use Marker constructor to add a marker to map
    var marker = new google.maps.Marker({
      position: {lat:40.8054491, lng: -73.9654415},
      map: map,
      title: 'Monk Cafe'
  });
       // Creating an InfoWindow object
   var infowindow = new google.maps.InfoWindow({
  content: '<h1>Monk Cafe</h1>'+
  '<p>1600 North Blvd</p>'+
  '<p>New York</p>'
 
});

  google.maps.event.addListener(marker, 'click', function() {
  infowindow.open(map, marker);
});


});

}

initMap();
