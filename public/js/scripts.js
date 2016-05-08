$(document).ready(function(){
	console.log("We are jQuery")
	$('#rsvp').on('click', function (e){
		console.log("clicked")
	})
	  $( "#datepicker" ).datepicker({
	    numberOfMonths: 1,
	    showButtonPanel: true,
	    onSelect: function(dateSelected) {
	      // console.log(dateSelected);
	      // console.log(this.value);
	      $.ajax({
	        type: "POST",
	        url: '/events-date',
	        data: {event_date: dateSelected} 
	      })
	      .done(function(data){
	        console.log(data);
	        $('#events-ul').empty();
	        for (var i = 0; i < data.length; i++) {
	          // console.log(data[i])
	          var html = buildSearchedEvent(data[i])
	          // console.log(html)
	          $('#events-ul').append(html)
	        };
	      })
	    }
	  });

	  $( "#datepickerInput" ).datepicker({
	    changeMonth: true,
	    changeYear: true
	  });
});