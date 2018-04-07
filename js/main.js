

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
var reservationData = {};

// set the day when an option is clicked on
$('.reservation-day li').on('click', function() {
  reservationData.day = $(this).text();
});

// when submitted, the name data should be set
// and all data should be sent to your database
$('.reservation-form').on('submit', function(event) {
  event.preventDefault();

  reservationData.name = $('.reservation-name').val();


  // create a section for reservations data in your db
  var reservationsReference = database.ref('reservations');

  reservationsReference.push(reservationData);
});


// retrieve reservations data when page loads and when reservations are added
function getReservations() {

  // use reference to database to listen for changes in reservations data
  database.ref('reservations').on('value', function(results) {

    // Get all reservations stored in the results we received back from Firebase
    var allReservations = results.val();

    // remove all list reservations from DOM before appending list reservations
    $('.reservations').empty();

    // iterate (loop) through all reservations coming from database call
    for (var reservation in allReservations) {

      // Create an object literal with the data we'll pass to Handlebars
      var context = {
        name: allReservations[reservation].name,
        day: allReservations[reservation].day,
        reservationId: reservation
      };


      // Get the HTML from our Handlebars reservation template
      var source = $("#reservation-template").html();

      // Compile our Handlebars template
      var template = Handlebars.compile(source);

      // Pass the data for this reservation (context) into the template
      var reservationListItem = template(context);

      // Append newly created reservation to reservations list.
      $('.reservations').append(reservationListItem);

    }

  });

}

// When page loads, get reservations
getReservations();

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
