//api key: dc6zaTOxFJmzC
//queryURL: http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=dc6zaTOxFJmzC & limit=5


var gifTastic = {

	buttonArray: ['dogs', 'cats', 'birds', 'lol', 'fail', 'laugh', 'basketball', 'poke', 'kobi', 'billy'],

	renderButtons: function() {

		//clean btnContainer before
		$('#btnContainer').empty();

		//add buttons
		for(var i=0; i<gifTastic.buttonArray.length; i++){
			var newBtn = $('<button>');
			// newBtn.addClass('btn');
			newBtn.addClass('queryBtn');
			newBtn.attr('data-value', gifTastic.buttonArray[i]);
			newBtn.html('<span>' + gifTastic.buttonArray[i] + '</span>');
			$('#btnContainer').append(newBtn);
		}
	},

	displayInfo: function (e) {

		$('#displayGIFs').empty();
		e.preventDefault();

		var value = $(this).attr('data-value');
		console.log(value);
      	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + value + "&api_key=dc6zaTOxFJmzC&limit=10&offset=6";

      	$.ajax({
      		url: queryURL,
      		method: 'GET'
      	}).done(function(event){
      		
      		var results = event.data;
      		console.log(results);

      		for(var i=0; i<results.length; i++){

      			var imageDiv = $('<div>');
      			imageDiv.addClass('gifItems');

      			var animateLink = results[i].images.fixed_height.url;
      			var stillLink = results[i].images.fixed_height_still.url;

      			//append rating
      			var p = $('<p>').text("Rating: " + results[i].rating);

      			//img attributes
      			var gifImage = $('<img>');
      			gifImage.addClass('gifs');
      			gifImage.attr('data-animate', animateLink);
      			gifImage.attr('data-still', stillLink);
      			gifImage.attr('data-state', 'still');
      			gifImage.attr('src', stillLink);
      			
      			imageDiv.append(p);
      			imageDiv.append(gifImage);

      			$('#displayGIFs').append(imageDiv);
      		}

      		gifTastic.animateGif();
      	});
	},

	animateGif: function () {
		$('.gifs').on('click', function(){

			//grab current state of gif
			var state = $(this).attr('data-state');

			if(state === 'still'){

				$(this).attr('src', $(this).attr('data-animate') );
        		$(this).attr('data-state', 'animate');
			} else {

				$(this).attr('src', $(this).attr('data-still') );
        		$(this).attr('data-state', 'still');
			}
			
		})
	}
}


window.onload = function () {

	gifTastic.renderButtons();

	$('#searchBtn').on('click', function(event) {

		event.preventDefault();

		var input = $('#searchInput').val();

		console.log(input);

		if(input.length === 0){
			alert('type something to add');
		} else {
			gifTastic.buttonArray.push(input);
		}

		gifTastic.renderButtons();
	});

	// $('.queryBtn').on('click', gifTastic.displayInfo);
	$(document).on('click', '.queryBtn', gifTastic.displayInfo);

}
