var getDates = function(config){
	$(document).ready(function(){
		var dNo, dateInfo, week ,month ,date ,year, dateArray = [], curDate, textFieldInfo, textFiledDate, textFiledMonth, textFiledYear, bodyHeight = $(".bodyContainer").height();
		var currentDate = new Date();
		var dayNo = config.numOfDays; dayRows = dayNo/7; 
		var idInfo = currentDate.toDateString().split(" ");
		var scrollingTo = idInfo[2]+idInfo[1]+idInfo[3];
		var monthNumber = {"Jan": "01", "Feb":"02", "Mar":"03", "Apr":"04", "May":"05", "Jun":"06", "Jul":"07", "Aug":"08", "Sep":"09", "Oct":"10", "Nov":"11", "Dec":"12"};
		$(".monthYearContainer", config.container).children()[0].innerHTML = config.monthName[currentDate.getMonth()] + " " + currentDate.getFullYear();

		/*Assigning week Name with their specified names*/
		for(var i=0; i<config.weekNames.length; i++){
			$(".weekContainer", config.container).append("<td>"+ config.weekNames[i] +"</td>");
		}

		if(currentDate.getDate() < 10){ curDate = "0"+currentDate.getDate()} else { curDate = currentDate.getDate()}

		var Tanker = function(){
			var weeks = {"Mo" : {"date" : [], "prop" : []},"Tu" : {"date" : [], "prop" : []},"We" : {"date" : [], "prop" : []},"Th" : {"date" : [], "prop" : []},"Fr" : {"date" : [], "prop" : []},"Sa" : {"date" : [], "prop" : []},"Su" : {"date" : [], "prop" : []}
			};
			return{
				weeks : weeks,
			};
		}

		var tank = new Tanker();
		
		/*if Saturdays have to diabled uncomment the below comment*/
		for(dNo=-2; dNo<=dayNo; dNo++){
			dateInfo = new Date(2015, 0, dNo);
			dateArray = dateInfo.toDateString().split(" ");
			date = dateInfo.toDateString().split(" ")[2];
			month = dateInfo.toDateString().split(" ")[1];
			week = dateInfo.toDateString().split(" ")[0].slice(0,2);
			year = dateInfo.toDateString().split(" ")[3];
			if( dateInfo < currentDate /*|| week == "Sa"*/ || week == "Su"){
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

		/*Dynamically assigned the dates*/
		for(var rowNo=0; rowNo<dayRows-1;rowNo++){
			$(".tableBody", config.container).append("<tr class='rowCell'><td class='Mo "+ tank.weeks['Mo'].prop[rowNo] +"'>"+ tank.weeks['Mo'].date[rowNo] +"</td><td class='Tu "+ tank.weeks['Tu'].prop[rowNo] +"'>"+ tank.weeks['Tu'].date[rowNo] +"</td><td class='We "+ tank.weeks['We'].prop[rowNo] +"'>"+ tank.weeks['We'].date[rowNo] +"</td><td class='Th "+ tank.weeks['Th'].prop[rowNo] +"'>"+ tank.weeks['Th'].date[rowNo] +"</td><td class='Fr "+ tank.weeks['Fr'].prop[rowNo] +"'>"+ tank.weeks['Fr'].date[rowNo] +"</td><td class='Sa "+ tank.weeks['Sa'].prop[rowNo] +"'>"+ tank.weeks['Sa'].date[rowNo] +"</td><td class='Su "+ tank.weeks['Su'].prop[rowNo] +"'>"+ tank.weeks['Su'].date[rowNo] +"</td></tr>");
		}

		/*Selecting the current day during the time of intialization*/		
		$("."+scrollingTo, config.container).addClass("selectedCellColor");

		/*Listens to the selection of dates*/
		$("td", config.container).click(function(data, element){	
			$("td", config.container).removeClass("selectedCellColor");
			if($(data.target).hasClass("enabled")){
				// toClose = $(data.target);
				$(data.target).addClass("selectedCellColor");
				textFieldInfo = $(data.target)[0].className.split(" ")[2];
				textFiledDate = textFieldInfo.slice(0,2);
				textFiledMonth = textFieldInfo.slice(2,5);
				textFiledYear = textFieldInfo.slice(5);
				$("."+config.inputBoxName).val(textFiledDate+ "-"+ monthNumber[textFiledMonth] + "-" + textFiledYear);
				$(".container", config.container).hide();
				$(".bodyContainer", config.container).hide();
			}
		});

		/*Event listener for the close button*/
		$(".close").click(function(data){
			$(".container", config.container).hide();
			$(".bodyContainer", config.container).hide();
		});

		/*Mouse event handler*/
		$("td")
		.mouseenter(function(data){
			$(data.target).addClass("mouseEnter");
		})
		.mouseleave(function(data){
			$(data.target).removeClass("mouseEnter");
			$("td").removeClass("mouseEnter");
			$("span").removeClass("mouseEnter");
		});

		/*Disabled specified days*/
		for(var i=0; i<=config.disabledDays.length; i++){
			$("."+config.disabledDays[i], config.container).removeClass("enabled").addClass("disabled");
		}

		/*Scrolling to the Present/selected date*/
		var flag=true;
		$("."+config.inputBoxName)
		.focusin(function(){

			$(".container", config.container).show();
			$(".bodyContainer", config.container).show();
			if(flag){
			 $("."+config.inputBoxName).val(curDate +"-"+ config.monthNumber[config.monthName[currentDate.getMonth()].slice(0,3)] +"-"+ currentDate.getFullYear());
			$(".bodyContainer", config.container).scrollTop($('.'+scrollingTo, config.container).offset().top - ((bodyHeight-80)+(config.numOfDiabledRows)*40));
			 flag = false;
			} else {
				$(".bodyContainer", config.container).scrollTop($('.'+scrollingTo)/*.position().top +(config.numOfDiabledRows)*40*/);
			} 	
		});

	});
};