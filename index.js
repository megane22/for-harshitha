var myTasks = [];

function Task(text, duration) {
    this.text = text;  
    this.duration = duration;
    
    this.stringify = function () {
        return this.text + ": " + this.duration;
    };
}

function findPair(aListOfTasks) {
	for(var index1 = 0; index1 < aListOfTasks.length; index1++) {
		for(var index2 = index1 + 1; index2 < aListOfTasks.length; index2++) {
			pickTask1 = aListOfTasks[index1];
			pickTask2 = aListOfTasks[index2];
			console.log(pickTask1.duration + pickTask2.duration);
			if (pickTask1.duration + pickTask2.duration == 60) {
				var newPair = [];
				newPair.push(index1);
				newPair.push(index2);
				return newPair;
			}
		}
	}
	return [];
}

function checkTasks() {
	for (var i = 1; i <= 4; i++) {
		var taskId = "task" + i;
		var durId = "dur" + i;

		var taskTitle = document.getElementById(taskId).value;
		var taskTime = parseInt(document.getElementById(durId).value);
		console.log(taskTitle);
		console.log(taskTime);

		var resultPlace = document.getElementById("resultats");
		var newRes = document.createElement("SPAN");
		var newTask = new Task(taskTitle, taskTime);

		newRes.innerHTML = newTask.stringify();
		resultPlace.appendChild(newRes);

		myTasks.push(newTask);
	
	}
	console.log(myTasks.length);

	var newPair = findPair(myTasks);
	console.log(newPair);

	var sched1 = schedule(myTasks);
	console.log(sched1);
}

function schedule(aListOfTasks) {
	var schedule = [];
	var taskCopy = aListOfTasks;
	while (taskCopy.length > 0) {
		//Try to find a pair first
		var taskPair = findPair(aListOfTasks);
		if (taskPair.length > 0) {
			schedule.push(taskCopy[taskPair[0]]);
			schedule.push(taskCopy[taskPair[1]]);
			schedule.push(new Task("break", 10));

			taskCopy.splice(taskPair[0], 1);
			taskCopy.splice(taskPair[1]-1, 1);
		}

		//If no pair, just add the first thing from the tasks
		else {
			schedule.push(taskCopy[0]);
			if (taskCopy[0].duration >= 30) {
				schedule.push(new Task("break", 5));
			}
			taskCopy.splice(0, 1);
		}
	}

	return schedule;
}