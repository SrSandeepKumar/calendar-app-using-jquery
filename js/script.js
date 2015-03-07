var getDates = function(config){
	$(document).ready(function(){
		var dNo, dateInfo, week ,month ,date ,year, dateArray = [], curDate, textFieldInfo, textFiledDate, textFiledMonth, textFiledYear, previousScroll, bodyHeight = $(".bodyContainer").height();
		var currentDate = new Date();
		var dayNo = config.numOfDays; dayRows = dayNo/7; 
		var idInfo = currentDate.toDateString().split(" ");
		var scrollingTo = idInfo[2]+idInfo[1]+idInfo[3];
		var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "Spetember", "October", "November", "December"];
		var MonthNumber = {"Jan": "01", "Feb":"02", "Mar":"03", "Apr":"04", "May":"05", "Jun":"06", "Jul":"07", "Aug":"08", "Sep":"09", "Oct":"10", "Nov":"11", "Dec":"12"};
		
		$(".monthYearContainer").children()[0].innerHTML = monthName[currentDate.getMonth()] + " " + currentDate.getFullYear();
		if(currentDate.getDate() < 10){ curDate = "0"+currentDate.getDate()} else { curDate = currentDate.getDate()}
		// $(".inputField").val(curDate +"-"+ MonthNumber[monthName[currentDate.getMonth()].slice(0,3)] +"-"+ currentDate.getFullYear());

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

		for(var rowNo=0; rowNo<dayRows-1;rowNo++){
			$(".tableBody").append("<tr class='rowCell'><td class='Mo "+ tank.weeks['Mo'].prop[rowNo] +"'>"+ tank.weeks['Mo'].date[rowNo] +"</td><td class='Tu "+ tank.weeks['Tu'].prop[rowNo] +"'>"+ tank.weeks['Tu'].date[rowNo] +"</td><td class='We "+ tank.weeks['We'].prop[rowNo] +"'>"+ tank.weeks['We'].date[rowNo] +"</td><td class='Th "+ tank.weeks['Th'].prop[rowNo] +"'>"+ tank.weeks['Th'].date[rowNo] +"</td><td class='Fr "+ tank.weeks['Fr'].prop[rowNo] +"'>"+ tank.weeks['Fr'].date[rowNo] +"</td><td class='Sa "+ tank.weeks['Sa'].prop[rowNo] +"'>"+ tank.weeks['Sa'].date[rowNo] +"</td><td class='Su "+ tank.weeks['Su'].prop[rowNo] +"'>"+ tank.weeks['Su'].date[rowNo] +"</td></tr>");
		}
		

		$(".tableBody").click(function(data, element){	
			$("td").removeClass("selectedCellColor");
			if($(data.target).hasClass("enabled")){
				toClose = $(data.target);
				$(data.target).addClass("selectedCellColor");
				// scrollingTo = 
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
			// scrollingTo = $(data.target)[0].className.split(" ")[2];
		});

		$("td")
		.mouseenter(function(data){
			$(data.target).addClass("mouseEnter");
		})
		.mouseleave(function(data){
			$(data.target).removeClass("mouseEnter");
			$("span").removeClass("mouseEnter");
		});

		// $(".bodyContainer").scrollTop($('.'+scrollingTo).offset().top - (($(".bodyContainer").height()-90)+(config.numOfDiabledRows*46)));
		// previousScroll = $('.'+scrollingTo).offset().top;
		var flag=true;
		$(".inputField")
		.focusin(function(){
			$(".container").show();
			$(".bodyContainer").show();
			$("."+scrollingTo).addClass("selectedCellColor");
			if(flag){
			 // $(".inputField").val(curDate +"-"+ MonthNumber[monthName[currentDate.getMonth()].slice(0,3)] +"-"+ currentDate.getFullYear());
			$(".bodyContainer").scrollTop($('.'+scrollingTo).offset().top - ((bodyHeight-80)+(config.numOfDiabledRows)*40));
			flag = false;
			} else {
				$(".bodyContainer").scrollTop($('.'+scrollingTo).offset().top +(config.numOfDiabledRows)*40);
			} 	
		});

	});
};