//api key: dc6zaTOxFJmzC
//queryURL: http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=dc6zaTOxFJmzC & limit=5


var gifTastic = {

	buttonArray: ['dogs', 'cats', 'birds'],
	searchTerm: "",

	renderButtons: function() {

		//clean btnContainer before
		$('#btnContainer').empty();

		//add buttons
		for(var i=0; i<gifTastic.buttonArray.length; i++){

			var newBtn = $('<button>');
			newBtn.addClass('btn');
			newBtn.addClass('queryBtn');
			newBtn.attr('data-value', gifTastic.buttonArray[i]);
			newBtn.text(gifTastic.buttonArray[i]);
			$('#btnContainer').append(newBtn);

		}
	},


}


$(document).ready(function (){

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

	$('.queryBtn').on('click', function() {
		console.log("queryBtn is clicked");
	});
});