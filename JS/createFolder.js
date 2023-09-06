function fCreateFolder() {
alert(myTicket);



  var myBody = { type: "0", parent_id: "2000", name: "Project - "};


$(document).ready(function(){

var url = baseURL+'/api/v1/nodes';
$.support.cors = true;
$.ajax({
url:url,
type:"POST",
crossDomain: true,
data:myBody,
dataType:"json",
headers: { "OTCSTICKET": myTicket },
success:function(res){
alert("success!");
alert("Folder object id = " + res.id);
},
error:function(res){
alert("Bad thing happened! " + res.statusText);
}
});
});
}
