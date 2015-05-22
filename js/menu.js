spaceBetweenButtons = 5
extraMarginLeft = 0

$(document).ready(function(){
	runFunction();
});


function runFunction() {
	// Set variables for the function
	var baseWidth = $(".page-content-container").width()/2
	var baseHeight = $(".page-content-container").height()
	var titleNumber = $('.titles').children('.page-menu-trigger').length
	var titleWidth = $('.page-menu-trigger').outerHeight()
	var titleSize = titleWidth+spaceBetweenButtons
	var titleLeftPad = +$('.page-menu-trigger').css('padding-left').replace('px', '')
	var contentWidth = (baseWidth-$('.page-content').css('margin-left').replace('px', ''))*2
	
	// Set the width of the content based on the
	// width of the container and the elements margin
	$('.page-content').css({
		"width": contentWidth
	});
	$('#menu-content').css({
		"margin-left": titleWidth*(titleNumber-1)+(spaceBetweenButtons-1)*(titleNumber-1)
	});

	for (var i = 1; i <= titleNumber; i++) {
		// Set the starting positions of the buttons
		var targID = 'item' + i + '-page'
		$('#' + targID).css({
			"top":-baseWidth+(titleSize*(i-1)),
			"left":-baseHeight+(baseWidth-titleLeftPad/2),
			"width": baseHeight
		});

		// Set page titles
		$('#' + targID + '-content').children('p').prepend('<h3>' + $('#' + targID).text() + '</h3>')

	};

	// Listen for button click
	$(".page-menu-trigger").on('click', function() {

		// Reset the container
		$('.page-content').hide();
		$('.page-menu-trigger').show()
		
		// Move button then replace with information
		var targID = $(this).attr("id");
		$(this).animate({
			"top":-baseWidth + spaceBetweenButtons
		}, function() {
			$(this).fadeOut('fast');
			$('#'+targID+'-content').fadeIn('fast');
		});

		// Get the number of the button
		var arrayID = targID.split("");
		var thisItem = +arrayID[4];

		// Move the preceding buttons to the left
		for (var i = 1, j = thisItem-2; i < thisItem; i++, j--) {
			var shiftThis = '#item' + i + '-page'
			$(shiftThis).animate({
				"top":-baseWidth-titleWidth-(titleSize*j)
			});
		}

		// Move the following buttons to the right
		for (var i = thisItem + 1, j = 0; i <= titleNumber; i++, j++) {
			var shiftThis = '#item' + i + '-page'
			$(shiftThis).animate({
				"top": baseWidth+(titleSize*j)
			});
		}
	});
}




