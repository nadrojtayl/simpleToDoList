//set button to add tasks

$(document).ready(function(){

	//http://blog.teamtreehouse.com/what-is-python
if(document.cookie === null){
	document.cookie = 'expires=Thu, 16-07-17 21:25:05 GMT; tasklist = 0;';
}

var addtoSS = addTaskRow.bind(null,'SelfStudy')
$('#SelfStudyButton').click(addtoSS);
$('#ErrandsButton').click(addTaskRow.bind(null,'Errands'));
$('#DailyButton').click(addTaskRow.bind(null,'Daily'));

refresh()
});

var addTaskRow = function(columnName){

	var taskName = prompt("What is the task name?")
	document.cookie = 'tasklist = ' + get_cookie('tasklist') + '/' + taskName + "(columnTag:" + columnName+ ")"
	refresh();

}

var rowClicked = function(){
	if(this.text().indexOf("is complete!") === -1){
		document.cookie = "tasklist = " + get_cookie('tasklist').replace(this.text(),this.text() + " is complete!");
	}
	refresh();
}

var refresh = function(){
	$('.Tasks').empty();
	var taskNames = get_cookie('tasklist').split("/").filter(function(name){return name !== "null"})
	var UnfinishedTasks = taskNames.filter(function(name){return name.indexOf("is complete!") === -1});
	var FinishedTasks = taskNames.filter(function(name){return UnfinishedTasks.indexOf(name) === -1})
	UnfinishedTasks.forEach(function(taskname){makeNewRow(taskname)});
	FinishedTasks.forEach(function(taskname){makeNewRow(taskname)});

	function makeNewRow(taskName){
		var newRow = $('<li>' + taskName.slice(0,taskName.search("columnTag:") -1) +  '</li>')
		var columnName = taskName.slice(taskName.search("columnTag:") + 10).replace(")","");
		
		var unfinished = taskName.indexOf("is complete!") == -1;
		if(unfinished){
			newRow.css("border","thick solid red")
			newRow.css("background","pink")
		} else {
			newRow.css("background","aquamarine");
			newRow.css("border","thick solid green");
		}
		newRow.css("margin","5px")
		newRow.css("box-shadow","10px 10px 5px #888888");
		newRow.click(rowClicked.bind(newRow));
		$('#' + columnName).append(newRow);

	}

}
