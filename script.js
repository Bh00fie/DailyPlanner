// Store variables from HTML Classes
var container = $('.container');
var timeBlocks = $('.time-block');
var saveButton = $('.saveBtn i');

// Function to check local storage for saved events and show information if stored
function localStorageEvents() {
  var savedEvent = JSON.parse(localStorage.getItem("saved"));
  if (savedEvent !== null) {
    timeBlocks.each(function() {
      var description = $(this).find('.description textarea');
      var selectedTime = parseInt($(this).attr("id"));
      for (var i = 0; i < savedEvent.length; i++) {
        if (savedEvent[i].hour == selectedTime) {
          description.val(savedEvent[i].text);
          break;
        }
      }
    });
  }
}

localStorageEvents();

// Using moment.js, get current day data and show in specific format
var today = moment();
$('#currentDay').text(today.format("dddd, Do MMMM YYYY"));

// Targets all Rows and check each against the current time
var currentTime = moment().hour();
timeBlocks.each(function() {
  var description = $(this).find('.description');
  var selectedTime = parseInt($(this).attr("id"));
  if (selectedTime === currentTime) {
    description.addClass("present");
  } else if (selectedTime < currentTime) {
    description.addClass("past");
  } else if (selectedTime > currentTime) {
    description.addClass("future");
  }
});

// Function for saving text to local storage
function saveEvent(event) {
    var description = $(event.target).closest('.time-block').find('.description textarea');
    var eventDescription = description.val();
    var hourEvent = $(event.target).closest('.time-block').attr("id");
    var savedEvent = JSON.parse(localStorage.getItem("saved")) || [];
    var saved = {
      hour: hourEvent,
      text: eventDescription
    };

}