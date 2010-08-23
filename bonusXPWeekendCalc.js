function calculateAverageMultiplier(){
	//calculates averages to the nearest minute
	var hoursStr = $('#hoursInput').val();
	var minutesStr = $('#minutesInput').val();
	var hours = (parseInt(hoursStr) * 60) + parseInt(minutesStr);
	if(isNaN(hours)){
		//don't do anything else
	} else { //continue as wanted
		var startHoursStr = $('#startHoursInput').val();
		var startMinutesStr = $('#startMinutesInput').val();
		var start = (parseInt(startHoursStr) * 60) + parseInt(startMinutesStr);
		if (isNaN(start)){
			start = 0;
		}
		var xpStr = $('#baseXPInput').val();
		var xp = parseInt(xpStr);
		if(isNaN(xp)){
			xp = 0;
		}	
		var multiplier = 0;
		for(var i = start; i < hours + start; i++){
			multiplier += calculateMultiplier(i / 60);
		}
		multiplier /= hours;
		$('#multiplierInput').val(Math.round(multiplier * 1000) / 1000); //show to 3dp
		xp *= multiplier;
		$('#newXPInput').val(Math.round(xp * 10) / 10);
	}
}

function calculateMultiplier(time){
	//console.log(time);
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
	$('.bonusInput').focus(function() {
		inputFocus($(this));
	});
	$('.bonusInput').blur(function() {
		inputBlur($(this));
	});
	$('.bonusInput').keydown(function(e) {
		if(e.keyCode == '13'){
			calculateAverageMultiplier();
		}
	});
});