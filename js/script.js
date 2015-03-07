$(document).ready(function(){
		var dNo, dateInfo, week ,month ,date ,year, dateArray = [], curDate, textFieldInfo, textFiledDate, textFiledMonth, textFiledYear, previousScroll;
		var currentDate = new Date();
		var dayNo = 180; dayRows = dayNo/7; 
		var idInfo = currentDate.toDateString().split(" ");
		var scrollingTo = idInfo[2]+idInfo[1]+idInfo[3];
		var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "Spetember", "October", "November", "December"];
		var MonthNumber = {"Jan": "01", "Feb":"02", "Mar":"03", "Apr":"04", "May":"05", "Jun":"06", "Jul":"07", "Aug":"08", "Sep":"09", "Oct":"10", "Nov":"11", "Dec":"12"};
		
		$(".monthYearContainer").children()[0].innerHTML = monthName[currentDate.getMonth()] + " " + currentDate.getFullYear();
		if(currentDate.getDate() < 10){ curDate = "0"+currentDate.getDate()} else { curDate = currentDate.getDate()}
		$(".inputField").val(curDate +"-"+ MonthNumber[monthName[currentDate.getMonth()].slice(0,3)] +"-"+ currentDate.getFullYear());

		var Tanker = function(){
			var weeks = {"Mo" : {"date" : [], "prop" : []},"Tu" : {"date" : [], "prop" : []},"We" : {"date" : [], "prop" : []},"Th" : {"date" : [], "prop" : []},"Fr" : {"date" : [], "prop" : []},"Sa" : {"date" : [], "prop" : []},"Su" : {"date" : [], "prop" : []}
			};
			return{
				weeks : weeks,
			};
		}

		var tank = new Tanker();

		for(dNo=-2; dNo<=dayNo; dNo++){
			dateInfo = new Date(2015, 0, dNo);
			dateArray = dateInfo.toDateString().split(" ");
			date = dateInfo.toDateString().split(" ")[2];
			month = dateInfo.toDateString().split(" ")[1];
			week = dateInfo.toDateString().split(" ")[0].slice(0,2);
			year = dateInfo.toDateString().split(" ")[3];
			
			
			if( dateInfo <= currentDate /*|| week == "Sa"*/ || week == "Su"){
				if(date == "01"){
					tank.weeks[week].date.push(parseInt(date)+'<span class=monthStart>'+month+'</span>');
				} else {
					tank.weeks[week].date.push(parseInt(date));
				}
				tank.weeks[week].prop.push("disabled " + (date+month+year));
			} else {
				if(date == "01"){
					tank.weeks[week].date.push(parseInt(date)+'<span class=monthStart>'+month+'</span>');
				} else {
					tank.weeks[week].date.push(parseInt(date));
				}
				tank.weeks[week].prop.push("enabled " + (date+month+year));
			}
		}

		for(var u=0; u<dayRows-1;u++){
			$(".tableBody").append("<tr class='rowCell'><td class='Mo "+ tank.weeks['Mo'].prop[u] +"'>"+ tank.weeks['Mo'].date[u] +"</td><td class='Tu "+ tank.weeks['Tu'].prop[u] +"'>"+ tank.weeks['Tu'].date[u] +"</td><td class='We "+ tank.weeks['We'].prop[u] +"'>"+ tank.weeks['We'].date[u] +"</td><td class='Th "+ tank.weeks['Th'].prop[u] +"'>"+ tank.weeks['Th'].date[u] +"</td><td class='Fr "+ tank.weeks['Fr'].prop[u] +"'>"+ tank.weeks['Fr'].date[u] +"</td><td class='Sa "+ tank.weeks['Sa'].prop[u] +"'>"+ tank.weeks['Sa'].date[u] +"</td><td class='Su "+ tank.weeks['Su'].prop[u] +"'>"+ tank.weeks['Su'].date[u] +"</td></tr>");
		}
		
		$("."+scrollingTo).addClass("selectedCellColor");

		// var monthScroller=currentDate.getMonth();
		// var monthScroller = 2;
		// $(".bodyContainer").scroll(function(data){
			
		// 	$(".monthYearContainer").children()[0].innerHTML = monthName[monthScroller] + " " + currentDate.getFullYear();
		// 	if(previousScroll < ($(".bodyContainer").scrollTop())){
		// 		$(".monthYearContainer").children()[0].innerHTML = monthName[monthScroller] + " " + currentDate.getFullYear();
		// 		monthScroller = monthScroller+1;
		// 	} else {
		// 		$(".monthYearContainer").children()[0].innerHTML = monthName[monthScroller] + " " + currentDate.getFullYear();
		// 		monthScroller = monthScroller-1;
		// 	}
		// 	previousScroll = $(".bodyContainer").scrollTop();
		// });

		$(".tableBody").click(function(data, element){	
			$("td").removeClass("selectedCellColor");	
			if($(data.target).hasClass("enabled")){
				toClose = $(data.target);
				$(data.target).addClass("selectedCellColor");
				
				textFieldInfo = $(data.target)[0].className.split(" ")[2];
				textFiledDate = textFieldInfo.slice(0,2);
				textFiledMonth = textFieldInfo.slice(2,5);
				textFiledYear = textFieldInfo.slice(5);
				$(".inputField").val(textFiledDate+ "-"+ MonthNumber[textFiledMonth] + "-" + textFiledYear);
			}
		});

		$(".close").click(function(data){
			$(".container").hide();
			$(".bodyContainer").hide();
			// $("td").removeClass("selectedCellColor");
		});

		$(".bodyContainer").scrollTop($('.'+scrollingTo).offset().top - ($(".bodyContainer").height()/*+40*/));
		previousScroll = $('.'+scrollingTo).offset().top;

		$(".inputField").focusin(function(){
			$(".container").show();
			$(".bodyContainer").show();
		});

	});
