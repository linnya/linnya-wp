(function() {
    'use strict';
    var $ = jQuery;
    var url = "http://account.linnya.com";
	
    var config = {
		apiKey: "AIzaSyBWRQNO4iBKBxBCJySq4BWd15weM_pU9ks",
		authDomain: "linnya.firebaseapp.com",
		databaseURL: "https://linnya.firebaseio.com",
		storageBucket: "project-5810392278591381337.appspot.com",
		messagingSenderId: "28894065280"
	};

  	firebase.initializeApp(config);
      
    firebase.auth().signOut();
    
    $("#create").live("click", function() {

    	var data = {firstName: $("#firstName").val(), lastName: $("#lastName").val(), email: $("#email").val(), website: $("#website").val(), password: $("#password").val(), password2: $("#password2").val(), agree: $("#agree")[0].checked}

    	if(data.agree === false) {
    		Materialize.toast('Please agree the terms!', 2000);
    	}else{
    		if(data.password !== data.password2){
    			Materialize.toast('Passwords dont match!', 2000);
    		}else{
    			if(data.firstName && data.lastName && data.email && data.website && data.password) {
    				create(data);
    			}else{
    				Materialize.toast('Please, fill in all fields!', 2000);
    			}
    		}
    	}
    	
	});

	function create(obj) {
		$.post(url+"/api/v1/account/auth/signup", obj, success).fail(error);

		function success(data){
			Materialize.toast(data.result, 2000);
      auth(obj);
		}

		function error(data){
      if(data.status === 0) Materialize.toast("Server offline", 2000);
			Materialize.toast(data.responseJSON.result, 2000);
		}
	}
  $("#logout").live("click", function() {
        logout();
  });

	$("#signin").live("click", function() {
    	var data = {email: $("#email").val(), password: $("#password").val()};

    	if(!data.email && !data.password) Materialize.toast("Please, fill in all fields!", 2000);

    	if(data.email && data.password){
    		auth(data);
    	}

	});

    function auth(data) {
        firebase.auth().signInWithEmailAndPassword(data.email, data.password).catch(function(error) {
          if(error) Materialize.toast("Authentication failed: "+error.message, 2000);
        });
        var flag;

        firebase.auth().onAuthStateChanged(function(user) {
          if(user && !flag) {
              flag = true;
              Materialize.toast("Success: Follow the steps to activate", 2000);
              store(user.uid);
          }
        });
    }

    function store(uid) {
       $.post({
          url:'admin.php?page=linnya-chat-database',
          data: { action : 'store', accid: uid },
          success: function (res) {
              window.location = "admin.php?page=linnya-chat-tutorial";
              console.log(res);
          },
          error: function (error) {
              console.log(error);
          }
        });
    }
    function logout() {
      Materialize.toast("We are redirecting!", 2000);
       $.post({
          url:'admin.php?page=linnya-chat-database',
          data: { action : 'remove'},
          success: function (res) {
              window.location = "admin.php?page=linnya-chat-signin";
          },
          error: function (error) {
              console.log(error);
          }
        });
    }

})();