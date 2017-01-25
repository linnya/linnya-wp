(function() {
    'use strict';

  angular
    .module('controllers', [])
      .controller('chatCtrl', chatCtrl);

  function chatCtrl($scope, $http, $window, messages, $firebaseObject, $firebaseArray, $rootScope){
    this.chatInit = chatInit;
    this.timeCoverter = timeCoverter;
    this.inviteAcc = inviteAcc;
    this.emojiSelect = emojiSelect;
    $scope.uploadFiles = uploadFiles;
    this.minimize = minimize;
    this.maxmize = maxmize;
    this.updateGuestProfile = updateGuestProfile;
    this.encode_utf8 = encode_utf8;
    this.getExtension = getExtension;
    this.getAgentLastAct = getAgentLastAct;
    this.sendEmail = sendEmail;

    function sendEmail(data) {
      data.accid = $scope.accid;
      $http.post('http://account.linnya.com/api/v1/public/email/offline', data, {header : {'Content-Type' : 'application/json; charset=UTF-8'}}).then(function successCallback(response) {
       if(response.status === 200) $scope.sended = true;
      });

    }

    function getExtension(filename) {
      if(filename) return filename.substr(filename.lastIndexOf('.')+1)
    };

    function updateGuestProfile(data, msg) {
      if(data.fullName && data.email){
        var uid = firebase.auth().currentUser.uid;
        var fireProfile = firebase.database().ref('customers/'+$scope.accid+"/"+uid+"/profile");
        fireProfile.update(data);
        msg.status = 'read';
        $scope.msgs.$save(msg);
      }
    };

    function minimize() {
      $scope.control = 'minimized';
    };

    function maxmize() {
      $scope.control = 'chat';
    };

    $scope.size = window.innerHeight;
    $scope.msgs = [];
    $scope.sendMsg = sendMsg;

    this.emojis = [
    {
      name: 'smiles', icon: 'http://client.linnya.com/svg/emoticon.svg', 
      list:[
        {name: 'grinning face', unicode: '\uD83D\uDE00'},
        {name: 'face with tears of joy', unicode: '\uD83D\uDE02'},
        {name: 'smiling face with open mouth & smiling eyes', unicode: '\uD83D\uDE04'},
        {name: 'winking face', unicode: '\uD83D\uDE09'},
        {name: 'smiling face with smiling eyes', unicode: '\uD83D\uDE0A'},
        {name: 'face savouring delicious food', unicode: '\uD83D\uDE0B'},
        {name: 'smiling face with sunglasses', unicode: '\uD83D\uDE0E'},
        {name: 'smiling face with heart-eyes', unicode: '\uD83D\uDE0D'},
        {name: 'face blowing a kiss', unicode: '\uD83D\uDE18'},
        {name: 'kissing face', unicode: '\uD83D\uDE17'},
        {name: 'slightly smiling face', unicode: '\uD83D\uDE42'},
        {name: 'thinking face', unicode: '\uD83E\uDD14'},
        {name: 'neutral face', unicode: '\uD83D\uDE10'},
        {name: 'expressionless face', unicode: '\uD83D\uDE11'},
        {name: 'face with open mouth', unicode: '\uD83D\uDE2E'},
        {name: 'sleeping face', unicode: '\uD83D\uDE34'},
        {name: 'relieved face', unicode: '\uD83D\uDE0C'},
        {name: 'face with stuck-out tongue', unicode: '\uD83D\uDE1B'},
        {name: 'face with stuck-out tongue & winking eye', unicode: '\uD83D\uDE1C'},
        {name: 'unamused face', unicode: '\uD83D\uDE12'},
        {name: 'pensive face', unicode: '\uD83D\uDE14'},
        {name: 'loudly crying face', unicode: '\uD83D\uDE2D'},
        {name: 'angry face', unicode: '\uD83D\uDE20'},
        {name: 'frowning face with open mouth', unicode: '\uD83D\uDE26'},
      ]
    },
    {
      name: 'smiles', icon: 'http://client.linnya.com/svg/thumb-up.svg',
      list:[
        {name: 'thumbs up', unicode: '\uD83D\uDC4D'},
        {name: 'thumbs down', unicode: '\uD83D\uDC4E'},
        {name: 'raised fist', unicode: '\u270A'},
        {name: 'waving hand', unicode: '\uD83D\uDC4B'},
        {name: 'clapping hands', unicode: '\uD83D\uDC4F'},
        {name: 'writing hand', unicode: '\u270D'},
        {name: 'nail polish', unicode: '\uD83D\uDC85'},
        {name: 'raised hand', unicode: '\u270B'},
        {name: 'OK hand', unicode: '\uD83D\uDC4C'},
        {name: 'raising hands', unicode: '\uD83D\uDE4C'},
        {name: 'folded hands', unicode: '\uD83D\uDE4F'},
        {name: 'open hands', unicode: '\uD83D\uDC50'},
        {name: 'red heart', unicode: '\u2764'},
        {name: 'broken heart', unicode: '\uD83D\uDC94'},
        {name: 'two hearts', unicode: '\uD83D\uDC95'},
        {name: 'sparkling heart', unicode: '\uD83D\uDC96'},
        {name: 'love letter', unicode: '\uD83D\uDC8C'},
        {name: 'heart with ribbon', unicode: '\uD83D\uDC9D'},
        {name: 'kiss mark', unicode: '\uD83D\uDC8B'},
        {name: 'eyes', unicode: '\uD83D\uDC40'},
        {name: 'kiss: woman, man', unicode: '\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC66'},
        {name: 'man and woman holding hands', unicode: '\uD83D\uDC6B'},
        {name: 'wrapped gift', unicode: '\uD83C\uDF81'},
        {name: 'reminder ribbon', unicode: '\uD83C\uDF97'},
      ]
      
    },
    {
      name: 'smiles', icon: 'http://client.linnya.com/svg/food-apple.svg', 
      list:[
        {name: 'grapes', unicode: '\uD83C\uDF47'},
        {name: 'melon', unicode: '\uD83C\uDF48'},
        {name: 'watermelon', unicode: '\uD83C\uDF49'},
        {name: 'tangerine', unicode: '\uD83C\uDF4A'},
        {name: 'lemon', unicode: '\uD83C\uDF4B'},
        {name: 'banana', unicode: '\uD83C\uDF4C'},
        {name: 'pineapple', unicode: '\uD83C\uDF4D'},
        {name: 'red apple', unicode: '\uD83C\uDF4E'},
        {name: 'bacon', unicode: '\uD83E\uDD53'},
        {name: 'hamburger', unicode: '\uD83C\uDF54'},
        {name: 'pizza', unicode: '\uD83C\uDF55'},
        {name: 'hot dog', unicode: '\uD83C\uDF2D'},
        {name: 'french fries', unicode: '\uD83C\uDF5F'},
        {name: 'taco', unicode: '\uD83C\uDF2E'},
        {name: 'bento box', unicode: '\uD83C\uDF71'},
        {name: 'rice ball', unicode: '\uD83C\uDF59'},
        {name: 'ice cream', unicode: '\uD83C\uDF68'},
        {name: 'birthday cake', unicode: '\uD83C\uDF82'},
        {name: 'chocolate bar', unicode: '\uD83C\uDF6B'},
        {name: 'lollipop', unicode: '\uD83C\uDF6D'},
        {name: 'clinking beer mugs', unicode: '\uD83C\uDF7B'},
        {name: 'tropical drink', unicode: '\uD83C\uDF79'},
        {name: 'cocktail glass', unicode: '\uD83C\uDF78'},
        {name: 'wine glass', unicode: '\uD83C\uDF77'},
      ]
    },
    {
      name: 'smiles', icon: 'http://client.linnya.com/svg/football.svg',
      list:[
        {name: 'soccer ball', unicode: '\u26BD'},
        {name: 'baseball', unicode: '\u26BE'},
        {name: 'basketball', unicode: '\uD83C\uDFC0'},
        {name: 'american football', unicode: '\uD83C\uDFC8'},
        {name: 'pool 8 ball', unicode: '\uD83C\uDFB1'},
        {name: 'tennis', unicode: '\uD83C\uDFBE'},
        {name: 'bowling', unicode: '\uD83C\uDFB3'},
        {name: 'boxing glove', unicode: '\uD83E\uDD4A'},
        {name: 'person running: medium skin tone', unicode: '\uD83C\uDFC3\uD83C\uDFFD'},
        {name: 'person fencing', unicode: '\uD83E\uDD3A'},
        {name: 'person surfing: medium skin tone', unicode: '\uD83C\uDFC4\uD83C\uDFFD'},
        {name: 'person rowing boat: medium skin tone', unicode: '\uD83D\uDEA3\uD83C\uDFFD'},
        {name: 'person swimming', unicode: '\uD83C\uDFCA'},
        {name: 'person biking', unicode: '\uD83D\uDEB4'},
        {name: 'racing car', unicode: '\uD83C\uDFCE'},
        {name: 'person cartwheeling', unicode: '\uD83E\uDD38'},
        {name: 'person juggling', unicode: '\uD83E\uDD39'},
        {name: 'person lifting weights', unicode: '\uD83C\uDFCB'},
        {name: 'person golfing', unicode: '\uD83C\uDFCC'},
        {name: 'horse racing', unicode: '\uD83C\uDFC7'},
        {name: 'direct hit', unicode: '\uD83C\uDFAF'},
        {name: 'video game', unicode: '\uD83C\uDFAE'},
        {name: 'game die', unicode: '\uD83C\uDFB2'},
        {name: 'joker', unicode: '\uD83C\uDCCF'},
      ]
    },
    {
      name: 'smiles', icon: 'http://client.linnya.com/svg/skull.svg',
      list:[
        {name: 'skull and crossbones', unicode: '\u2620'},
        {name: 'angry face with horns', unicode: '\uD83D\uDC7F'},
        {name: 'ogre', unicode: '\uD83D\uDC79'},
        {name: 'goblin', unicode: '\uD83D\uDC7A'},
        {name: 'skull', unicode: '\uD83D\uDC80'},
        {name: 'alien', unicode: '\uD83D\uDC7D'},
        {name: 'robot face', unicode: '\uD83E\uDD16'},
        {name: 'alien monster', unicode: '\uD83D\uDC7E'},
        {name: 'clown face', unicode: '\uD83E\uDD21'},
        {name: 'pile of poo', unicode: '\uD83D\uDCA9'},
        {name: 'see-no-evil monkey', unicode: '\uD83D\uDE48'},
        {name: 'hear-no-evil monkey', unicode: '\uD83D\uDE49'},
        {name: 'speak-no-evil monkey', unicode: '\uD83D\uDE4A'},
        {name: 'smiling cat face with open mouth', unicode: '\uD83D\uDE3A'},
        {name: 'cat face with tears of joy', unicode: '\uD83D\uDE39'},
        {name: 'nauseated face', unicode: '\uD83E\uDD22'},
        {name: 'face with medical mask', unicode: '\uD83D\uDE37'},
        {name: 'detective: medium skin tone', unicode: '\uD83D\uDD75\uD83C\uDFFD'},
        {name: 'guard: medium-light skin tone', unicode: '\uD83D\uDC82\uD83C\uDFFC'},
        {name: 'snowman', unicode: '\u2603'},
        {name: 'full moon with face', unicode: '\uD83C\uDF1D'},
        {name: 'performing arts', unicode: '\uD83C\uDFAD'},
        {name: 'baby angel', unicode: '\uD83D\uDC7C'},
        {name: 'bat', unicode: '\uD83E\uDD87'},
      ] 
    }
    ];

    function encode_utf8(str) {
      return str.codePointAt(0).toString(16)
    }
    function emojiSelect(parent, index) {
      var unicode = this.emojis[parent].list[index].unicode;
      if(!this.write) this.write = {};
      if(this.write.content) this.write.content = this.write.content + unicode;
      if(!this.write.content) this.write.content = unicode;
      setTimeout(function() {
        carretPosition('input-compose');
      }, 50);
      
    }
    function carretPosition(id) {
     var node = document.getElementById(id);
     var caret = node.innerHTML.length;
      node.focus();
      var textNode = node.firstChild;
      // var caret = 10; // insert caret after the 10th character say
      var range = document.createRange();
      range.setStart(textNode, caret);
      range.setEnd(textNode, caret);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
    function inviteAcc(){
      var uid = firebase.auth().currentUser.uid;
      var ref = firebase.database().ref('now/'+$scope.accid+"/"+uid);
      ref.child('invite').update({status:'accepted'});
      chatInit(true);
    }
    function chatInit(invite){
      var uid = firebase.auth().currentUser.uid;
      if(!$scope.now) now(uid);
      console.log("chat init");
      getCustomization('chat');
      if(!invite) var obj = {createdAt: firebase.database.ServerValue.TIMESTAMP, status: 'waiting', by: 'client'};
      if(invite) var obj = {createdAt: firebase.database.ServerValue.TIMESTAMP, status: 'chatting', by: 'agent', agentID: $scope.agent.$id};
      activeRoom(uid, function (data) {
        if(!data) createRoomMeta(obj);
      });
    }

    function createRoomMeta(obj) {
      var uid = firebase.auth().currentUser.uid;
      var fireRoom = firebase.database().ref('room_meta').child($scope.accid).child(uid);
      var list = $firebaseArray(fireRoom);
      list.$add(obj).then(function(ref) {
          console.log("Room Metada created successfully");
          $scope.now.status = 'Chatting';
          $scope.now.rid = ref.key;
          $scope.now.$save();
          roomListener(ref.key);
          checkRoomStatus(uid, ref.key);
      });

    }
    // firebase.auth().signOut();

    firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        console.log('o usuario logado: '+user.uid);
        now(user.uid);
        checkAttendanceStatus();
        visitorData(user.uid);
      }else{
        signinAnon();
      }
    });
    function checkRoomStatus(uid, rid) {
      console.log('check room' + rid);
      var fireRoom = firebase.database().ref('room_meta').child($scope.accid).child(uid).child(rid);
      fireRoom.on('value', function(snapshot){
        var data = snapshot.val();
        if(data.agentID) agentProfile(data.agentID);
        if(data.status === 'finished'){
          console.log('chat finished');
          setTimeout(function() {
            delete $scope.agent;
            delete $scope.now;
            delete $scope.msgs;
            delete $scope.control;
            checkAttendanceStatus();
          }, 10000);
        }
      });
    }
    function getAgentLastAct(time) {
      if(time){
        var date = new Date(time);
        var dateNow = new Date();
        var diffMin = dateNow.getMinutes() - date.getMinutes();
        if(date.getDay() !== dateNow.getDay()) return 'Last Activity at: '+ dateCoverter(time); 
        if(diffMin >= 5) return 'Last Activity at: '+ timeCoverter(time);
        if(diffMin <= 5) return 'Online';
      }
    }
    function dateCoverter(time) {
      var date = new Date(time);
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var y = date.getFullYear();
      return m+'/'+d+'/'+y;
    }
    function checkAttendanceStatus() {
      var fireAct = firebase.database().ref('activity/'+$scope.accid);
      fireAct.on('value', function(snapshot) {
        if($scope.availableAgents) delete $scope.availableAgents;
        var data = snapshot.val();
        for(var i in data){
          if(data[i].status === 'Online') {
            $scope.availableAgents = [];
            data[i].$id = i;
            $scope.availableAgents[i] = data[i];
          }
        }
        if(!$scope.control){
          if($scope.availableAgents) getCustomization('mini-online');
          if(!$scope.availableAgents) getCustomization('mini-offline');
        }
        if($scope.availableAgents && $scope.control === 'mini-offline') getCustomization('mini-online');
        if(!$scope.availableAgents && $scope.control === 'mini-online') getCustomization('mini-offline');

      });
    };

    function now(uid){
      var fireNow = firebase.database().ref('now/'+$scope.accid+"/"+uid);
      $scope.now = $firebaseObject(fireNow);

      fireNow.on('value', function(snapshot) {
        var data = snapshot.val();
        if(data && data.invite){
          agentProfile(data.invite.agentID);
          if(data.invite.status == 'received') getCustomization('invite');
          if(data.invite.status == 'sent') fireNow.child("invite").update({status: "received"});
        }
        if(!data) {
          var obj = {};
          obj.status = 'Viewing';
          obj.started = firebase.database.ServerValue.TIMESTAMP;
          fireNow.update(obj);
        }
        // if(data) fireNow.child("lastUpdate").set(firebase.database.ServerValue.TIMESTAMP);
      });
    }

    function signinAnon(){
      firebase.auth().signInAnonymously().catch(function(error) {
        if (error) {
            console.log("Login Failed!", error);
        };
      });
    };
    function getCustomization(control){
        var fireCustom = firebase.database().ref('accounts/'+$scope.accid+"/custom");
        if(!$scope.custom){
          fireCustom.once('value').then(function(snapshot) {
            var data = snapshot.val();
            $scope.custom = data;
            if (!$rootScope.$$phase) $scope.$apply();
          });
        };
        $scope.control = control;
        if (!$rootScope.$$phase) $scope.$apply();
    }
    function timeCoverter(time){
      function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }
      var date = new Date(time);
      return addZero(date.getHours())+':'+addZero(date.getMinutes());
    }
    function sendMsg(data){
      if(data){
        var obj = {time:firebase.database.ServerValue.TIMESTAMP, by: 'guest', content: data.content, type: 'text', status: 'sent'};
        $scope.msgs.$add(obj).then(function(ref) {
          // console.log('msg sended');
        });
        delete data.content;
      }
    }
    function roomListener(rid){
      var uid = firebase.auth().currentUser.uid;
      var fireListener = firebase.database().ref('room_messages/'+$scope.accid).child(uid).child(rid);

      $scope.msgs = new messages(fireListener);

    };

    function activeRoom(uid, callback) {
      var fireRoom = firebase.database().ref('room_meta/'+$scope.accid+"/"+uid);
      fireRoom.once('value', function(snapshot){
        var data = snapshot.val();
        var result = null;
        if(data){
          for(var i in data){
            if(data[i].status !== 'finished') {
              data[i].$id = i;
              result = data[i];
            }
          }
          callback(result);
        }else{
          callback(result);
        }
      });
    }
    function ifRoomExists(uid, callback){
        activeRoom(uid, function(data) {
          if(data){
            checkRoomStatus(uid, data.$id); 
            chatRecovery(data.$id, data.agentID);
          }
        });
    }
    function chatRecovery(rid, agentID){
      console.log('chat recovered');
      getCustomization('chat');
      roomListener(rid);
      if(agentID) agentProfile(agentID);
    }

    function visitorData(uid){
      var ref = firebase.database().ref('customers/'+$scope.accid+"/"+uid);
      ref.on('value', function(snapshot) {
        var data = snapshot.val();
          if(!data) createNewVisitor(ref, uid);
          if(data) {
            loop(data.navigation.path);
            if(!$scope.visitor) ifRoomExists(uid);
            $scope.visitor = data;
          }
      });
    }
    function createNewVisitor(firebaseCollection, uid){
      console.log("Create new visitor");
      var data = {};
      data.navigation = {path: window.location.href, title: document.title};

      // get location
      $http.get('http://account.linnya.com/api/v1/public/track', {header : {'Content-Type' : 'application/json; charset=UTF-8'}}).then(function successCallback(response) {
        data.address = response.data.address;
        data.device = response.data.device;
        firebaseCollection.set(data);
      });
      loop(data.navigation.path, data);
    };

    function agentProfile(uid){
      var fireAgent = firebase.database().ref('users/'+$scope.accid+"/"+uid);
      $scope.agent = $firebaseObject(fireAgent);
      if (!$rootScope.$$phase) $scope.$apply();
    }
    
    function updateNavigator(data){
      var uid = firebase.auth().currentUser.uid;
      var navigation = {path: window.location.href, title: document.title};
      var fireVisitor = firebase.database().ref('customers/'+$scope.accid+"/"+uid).child('navigation');
      fireVisitor.update({path: data});
    };

    function loop(oldUrl, data){
      setInterval(function() {
        if(!oldUrl || oldUrl != window.location.href) updateNavigator(window.location.href);
        // console.log(window.location.href);
      }, 4000);
    }

    function uploadFiles(files){
      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      var d = day + "-" + month + "-" + year;
      
      var storageRef = firebase.storage().ref();

      var filesRef = storageRef.child($scope.accid).child(d).child(files[0].name);

      console.log('sending a new file' + files[0].name);
      var metadata = {
        contentType: files[0].type
      };

      var uploadTask = filesRef.put(files[0], metadata);

      uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        $scope.current = progress;
        if (!$rootScope.$$phase) $scope.$apply();
        if(progress === 100) delete $scope.current;
        console.log(snapshot);
      }, function(error) {
        console.log(error)
      }, function() {
        console.log(uploadTask.snapshot);

        console.log(uploadTask.snapshot.downloadURL);
        var obj = {time:firebase.database.ServerValue.TIMESTAMP, by: 'guest', content: files[0].name, link: uploadTask.snapshot.downloadURL, type: files[0].type, status: 'sent'};
        $scope.msgs.$add(obj).then(function(ref) {
          console.log('msg sended');
        });
        // callback(uploadTask.snapshot.downloadURL);
      });

    };

  }

  chatCtrl.$inject = ['$scope', '$http', '$window', 'messages', '$firebaseObject', '$firebaseArray', '$rootScope'];

})();
