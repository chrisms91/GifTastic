//api key: dc6zaTOxFJmzC
//queryURL: http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=dc6zaTOxFJmzC & limit=5


var gifTastic = {

	buttonArray: ['you', 'should', 'drink', 'beer', 'everyday', 'laugh', 'lol', 'party', 'dogs', 'cats', 'chanel'],
	offset: 0,
	loadLimit: 10,
	results: {},


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

	loadData: function (input, inputQuery) {
		console.log("loadData() is called");
		var value = input;
		var queryURL = inputQuery;

		console.log(value);
		console.log(queryURL);

		$.ajax({
      		async: false,
      		url: queryURL,
      		method: 'GET'
      	}).done(function(event){
      		
      		//store data in object variable results.
      		gifTastic.results = event.data;
      	});
	},

	displayInfo: function () {

		// var value = $(this).attr('data-value');
		// console.log(value);
  //     	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + value + "&api_key=dc6zaTOxFJmzC&limit=200";
  //     	var results;

      	//grab data from ajax call.
      	

      	console.log("displayInfo() is called");
      	console.log("offset: " + gifTastic.offset);

  		for(var i=gifTastic.offset; i< gifTastic.offset + 10; i++){

  			var imageDiv = $('<div>');
  			imageDiv.addClass('gifItems');

  			var animateLink = gifTastic.results[i].images.fixed_height.url;
  			var stillLink = gifTastic.results[i].images.fixed_height_still.url;

  			//append rating
  			var p = $('<p>').text("Rating: " + gifTastic.results[i].rating);

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
	},

	//when user click image, it changes src to animate gif.
	animateGif: function () {

		$(document).on('click', '.gifs', function(){
			//grab current state of gif
			var state = $(this).attr('data-state');
			console.log(state);

			if(state === 'still'){

				$(this).attr('src', $(this).attr('data-animate') );
        		$(this).attr('data-state', 'animate');
			} else {

				$(this).attr('src', $(this).attr('data-still') );
        		$(this).attr('data-state', 'still');
			}
		})

		//DIDNT WORK FOR SOME REASON AFTER LOADED MORE DATA ON SCROLL';;;

		// $('.gifs').on('click', function(){

		// 	//grab current state of gif
		// 	var state = $(this).attr('data-state');

		// 	if(state === 'still'){

		// 		$(this).attr('src', $(this).attr('data-animate') );
  //       		$(this).attr('data-state', 'animate');
		// 	} else {

		// 		$(this).attr('src', $(this).attr('data-still') );
  //       		$(this).attr('data-state', 'still');
		// 	}
			
		// })
	}
}


window.onload = function () {

	$('[data-toggle="tooltip"]').tooltip();

	//render initial buttons 
	gifTastic.renderButtons();

	//handle event when searchBtn is clicked
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
	//since queryBtns are dynamically created, it has to be handled with $(document) level
	$(document).on('click', '.queryBtn', function(event) {

		var input = $(this).attr('data-value');
		var inputQuery = "http://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=dc6zaTOxFJmzC&limit=200";

		gifTastic.loadData(input, inputQuery);

		gifTastic.offset = 0;
		event.preventDefault();
		$('#displayGIFs').empty();
		gifTastic.displayInfo();

	});

	gifTastic.animateGif();

	// when scroll is at bottom, load more data.
	$(window).scroll(function () {
		if($(window).scrollTop() === $(document).height() - $(window).height()){

			//check limit of offset before increment so it won't go over results.length
			if(gifTastic.offset < gifTastic.results.length - gifTastic.loadLimit){
				gifTastic.offset += 10;
			}

			//add little delay before load more images.
			setTimeout(gifTastic.displayInfo, 1000);
		}
  	})

}
