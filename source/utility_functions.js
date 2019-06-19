// Getting elements, used because they get lengthy
function $d(id, node = document){
	return node.getElementById(id);
}

function $c(classname, node = document){
	return Array.from(node.getElementsByClassName(classname));
}

function $q(options, node = document){
	return Array.from(node.querySelectorAll(options));
}

// Logging, because its more useful to have good messages
function $e(message){
	$l(message);
	$m(message);
}

function $l(message){
	console.log(message);
}

function $m(message){
	document.getElementById('message_box').innerText = message;
}

// Add event listener to id with action and function
function $el(id, action, func){
	const node = $d(id) || document.body;
	node.addEventListener(action, func);
}
