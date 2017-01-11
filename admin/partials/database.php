<?php 

	if ($_POST["action"] == "store") store($_POST['accid']);

	function store($accid){
		$existing = get_option("linnya-id");

		if (empty($existing)){
			add_option("linnya-id", $accid);
		}else{
			update_option("linnya-id", $accid);
		}
		echo $existing;
	}

	if ($_POST["action"] == "remove") remove();

	function remove(){
		delete_option("linnya-id");
		echo 'logout';
	}


 ?>