##Index.html

#### Two input fields.
	|_ inputField
	|_ inputField1

#### Two calander container's - Both calander conatiners inner elements are defined with same classes.
	|_ calendarContainer
	|_ calendarContainer 1

#### config object consists of these properties
  	|_ container         - calander containers class  
  	|_ numOfDays		 - Number of days to be displayed in the calander  
  	|_ numOfDiabledRows  - Number of disabled rows to be diaplayed in the calander   
  	|_ weekNames		 - First two characters of the Weeks in specificlanguage(calanders: 1-Dutch,2-English )
  	|_ monthName		 - Name of the Months in specificlanguage(calanders: 1-Dutch,2-English )
  	|_ monthNumber 		 - Months number in order
  	|_ inputBoxName		 - Input field class names
  	|_ disabledDays		 - Array of diabled days

##script.js

* Functionalities are discribed by comments in the file

---------------------------------------------------------------------------------------------------------------

### Justification
	|
	|\_ The widget is built by only using jQuery as insisted, The config object descripbed inside index.html.
	|\_ The first of each month contains a black band with first three characters.
	|\_ I have disabled sundays and the days those are specified in config through 'disabledDays' Saturdays can be 
	|	  disabled in script.js 
	|\_ I have specified the number of days to 180 in config at 'numOfDays'
 	 \_ UX are handled as specified in the problem statement

---------------------------------------------------------------------------------------------------------------
###### Best viewed in `Google Chrome`
 
