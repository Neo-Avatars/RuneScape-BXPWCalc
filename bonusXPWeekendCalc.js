var BXPWCalc = {

calculateAverageMultiplier: function(){
	var xpStr = $('#baseXPInput').val();
	var xp = isNaN(parseInt(xpStr)) ? 0 : parseInt(xpStr, 10);
	if( $('#SummoningTaskBox').is(':checked') ){
		var multiplier = 1.1;
		BXPWCalc.displayMultiplier( multiplier, xp );
	} else {
		var hoursStr = $('#hoursInput').val();
		var minutesStr = $('#minutesInput').val();
		var minutes = isNaN(parseInt(minutesStr, 10)) ? 0 : parseInt(minutesStr, 10);
		var hrs = isNaN(parseInt(hoursStr, 10)) ? 0 : parseInt(hoursStr, 10) * 60;
		var hours = hrs + minutes;
		if(hours === 0){
			//show the error
			var $err = $('#taskLengthError');
			$err.show();
			//$('#hoursInput').focus(); //can be annoying with the auto-calculate feature
			BXPWCalc.displayMultiplier( 1.1, xp );
			$err.delay(6000).slideUp();
		} else { //continue as wanted
			var startHoursStr = $('#startHoursInput').val();
			var startMinutesStr = $('#startMinutesInput').val();
			var startHours = isNaN(parseInt(startHoursStr, 10)) ? 0 : parseInt(startHoursStr, 10) * 60;
			var startMinutes = isNaN(parseInt(startMinutesStr, 10)) ? 0 : parseInt(startMinutesStr, 10);
			var start = startHours + startMinutes;
			var multiplier = 0;
			for(var i = start; i < hours + start; i++){
				multiplier += BXPWCalc.fetchMultiplier(i);
			}
			multiplier /= hours;
			BXPWCalc.displayMultiplier( multiplier, xp );
		}
	}
},

displayMultiplier: function( multiplier, xp ){
	$('#multiplierInput').val(Math.round(multiplier * 1000) / 1000); //show to 3dp so it's nice to read, while still being useful
	xp *= multiplier;
	$('#newXPInput').val(Math.round(xp * 10) / 10); //show to 1dp as it is in-game
},

fetchMultiplier: function(time){
	if( time >= 600 ){
		return 1.1;
	}
	if(time < 30){
		return 2.7;
	} else if(time < 60){
		return 2.55;
	} else if(time < 90){
		return 2.4;
	} else if(time < 120){
		return 2.25;
	} else if(time < 150){
		return 2.1;
	} else if(time < 180){
		return 2.0;
	} else if(time < 210){
		return 1.9;
	} else if(time < 240){
		return 1.8;
	} else if(time < 270){
		return 1.7;
	} else if(time < 300){
		return 1.6;
	} else if(time < 330){
		return 1.5;
	} else if(time < 360){
		return 1.45;
	} else if(time < 390){
		return 1.4;
	} else if(time < 420){
		return 1.35;
	} else if(time < 450){
		return 1.3;
	} else if(time < 480){
		return 1.25;
	} else if(time < 510){
		return 1.2;
	} else if(time < 540){
		return 1.175;
	} else if(time < 570){
		return 1.15;
	} else if(time < 600){
		return 1.125;
	} else {
		return 1.5;
	}
},

inputFocus: function(el) {
	if(el.val() === '0'){
		el.val('');
	}
},

inputBlur: function(el){
	var valStr = el.val();
	if(isNaN(valStr)){
		el.val('0');
	} else if(valStr === ''){
		el.val('0');
	}
	//there are only 60 minutes in an hour
	BXPWCalc.validateNumeric(el);
},

validateNumeric: function(el){
	var valStr = el.val();
	if(isNaN(valStr)){
		return;
	} else if(valStr === ''){
		return;
	}
	var ID = el.attr('id');
	if(ID === 'startMinutesInput'){
		if(parseInt(valStr, 10) > 60){
			el.val('60');
		}
	} else if(ID === 'minutesInput'){ //for some reason it doesn't work if lumped together
		if(parseInt(valStr, 10) > 60){
			el.val('60');
		}
	}
},

init: function() {
	$('#calcMultiplierButton, #SummoningTaskBox').click(function() {
		BXPWCalc.calculateAverageMultiplier();
	});
	var $input = $('#bonusWeekendTable .bonusInput');
	$input.focus(function() {
		BXPWCalc.inputFocus($(this));
	});
	$input.blur(function() {
		BXPWCalc.inputBlur($(this));
		BXPWCalc.calculateAverageMultiplier();
	});
	$input.keydown(function(e) {
		if(e.keyCode == '13'){
			BXPWCalc.calculateAverageMultiplier();
		}
	});
	$input.keyup(function(){
		BXPWCalc.validateNumeric($(this));
		BXPWCalc.calculateAverageMultiplier();
	});
	//some sort of visual error now that it doesn't fill the result boxes with 'NaN'
	$('#bonusWeekendTable').after('<div id="taskLengthError"><strong>Note:</strong> The task needs a specified time that it takes to complete.</div>');
	$('#taskLengthError').hide();
}

};

$( document ).ready( function() {
	BXPWCalc.init();
});