function calculateAverageMultiplier(){
	//calculates averages to the nearest minute, as Mod Fnord said it will - http://bit.ly/akMCGm
	var hoursStr = $('#hoursInput').val();
	var minutesStr = $('#minutesInput').val();
	var minutes = isNaN(parseInt(minutesStr)) ? 0 : parseInt(minutesStr);
	var hrs = isNaN(parseInt(hoursStr)) ? 0 : parseInt(hoursStr) * 60;
	var hours = hrs + minutes;
	if(hours === 0){
		//show the error
		var $err = $('#taskLengthError');
		$err.show();
		$('#hoursInput').focus();
		$err.delay(6000).slideUp();
	} else { //continue as wanted
		var startHoursStr = $('#startHoursInput').val();
		var startMinutesStr = $('#startMinutesInput').val();
		var startHours = isNaN(parseInt(startHoursStr)) ? 0 : parseInt(startHoursStr) * 60;
		var startMinutes = isNaN(parseInt(startMinutesStr)) ? 0 : parseInt(startMinutesStr);
		var start = startHours + startMinutes;
		var xpStr = $('#baseXPInput').val();
		var xp = isNaN(parseInt(xpStr)) ? 0 : parseInt(xpStr);
		var multiplier = 0;
		for(var i = start; i < hours + start; i++){
			multiplier += calculateMultiplier(i / 60);
		}
		multiplier /= hours;
		$('#multiplierInput').val(Math.round(multiplier * 1000) / 1000); //show to 3dp so it's nice to read, while still being useful
		xp *= multiplier;
		$('#newXPInput').val(Math.round(xp * 10) / 10); //show to 1dp as it is in-game
	}
}

function calculateMultiplier(time){
	var multiplier = time;
	if(multiplier >= 10){
		return 1.1;
	} else {
		multiplier -= 10;
		multiplier /= 7.5;
		multiplier *= multiplier;
		multiplier += 1.1;
		return multiplier;
	}
}

function inputFocus(el) {
	if(el.val() === '0'){
		el.val('');
	}
}

function inputBlur(el){
	var valStr = el.val();
	if(isNaN(valStr)){
		el.val('0');
	} if(valStr === ''){
		el.val('0');
	}
	//there are only 60 minutes in an hour
	var ID = el.attr('id');
	if(ID === 'startMinutesInput'){
		if(parseInt(valStr) > 60){
			el.val('60');
		}
	} else if(ID === 'minutesInput'){ //for some reason it doesn't work if lumped together
		if(parseInt(valStr) > 60){
			el.val('60');
		}
	}
}

$( document ).ready( function() {
	$('#calcMultiplierButton').click(function() {
		calculateAverageMultiplier();
	});
	var $input = $('#bonusWeekendTable .bonusInput');
	$input.focus(function() {
		inputFocus($(this));
	});
	$input.blur(function() {
		inputBlur($(this));
	});
	$input.keydown(function(e) {
		if(e.keyCode == '13'){
			calculateAverageMultiplier();
		}
	});
	//some sort of visual error now that it doesn't fill the result boxes with 'NaN'
	$('#bonusWeekendTable').after('<div id="taskLengthError"><strong>Note:</strong> The task needs a specified time that it takes to complete.</div>');
	$('#taskLengthError').hide();
});