/* eslint-disable no-undef */
(() => {
	function clear_node(node){
		while(node.children.length > 0){
			node.removeChild(node.children[0]);
		}
	}

	function remove_toJSON(){
		// This gave me a lot of greif. e621 changes the toJSON
		// methods and creates not optimal JSON.
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
		delete Object.prototype.toJSON;
		delete Date.prototype.toJSON;
		delete String.prototype.toJSON;
		delete Array.prototype.toJSON;
		delete Number.prototype.toJSON;

		// Kira I don't know what this did, but it gave me errors. So I removed it.
		if(jQuery){
			jQuery.event.dispatch = () => '';
		}
	}

	clear_node(document.head);
	clear_node(document.body);
	remove_toJSON();
})();
