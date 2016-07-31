//set button to add tasks

$(document).ready(function(){

	//http://blog.teamtreehouse.com/what-is-python
if(document.cookie === null){
	document.cookie = 'expires=Thu, 16-07-17 21:25:05 GMT; tasklist = 0;';
}


$('.addButton').click(addTaskRow);

});

var addTaskRow = function(){

	var taskName = prompt("What is the task name?")
	document.cookie = 'tasklist = ' + get_cookie('tasklist') + '/' + taskName

	refresh();

}

var rowClicked = function(){
	document.cookie = "tasklist = " + get_cookie('tasklist').replace(this.text(),this.text() + " is complete!");
	refresh();
}

var refresh = function(){
	$('.Tasks').empty();
	var taskNames = get_cookie('tasklist').split("/").filter(function(name){return name !== "null"})
	
	var UnfinishedTasks = taskNames.filter(function(name){return name.indexOf("is complete!") === -1});
	console.log(UnfinishedTasks);
	var FinishedTasks = taskNames.filter(function(name){return UnfinishedTasks.indexOf(name) === -1})
	console.log(FinishedTasks);
	UnfinishedTasks.forEach(function(taskname){makeNewRow(taskname)});
	FinishedTasks.forEach(function(taskname){makeNewRow(taskname)});

	function makeNewRow(taskName){
		console.log(taskName);
		var newRow = $('<li>' + taskName +  '</li>')
		var unfinished = taskName.indexOf("is complete!") == -1;
		if(unfinished){
			newRow.css("border","thick solid red")
			newRow.css("background","pink")
			newRow.css("margin","2.5px")
		} else {
			newRow.css("background","aquamarine");
			newRow.css("border","thick solid green");
		}
		newRow.css("box-shadow","10px 10px 5px #888888");
		newRow.click(rowClicked.bind(newRow));
		$('.Tasks').append(newRow);

	}

}
