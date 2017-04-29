document.getElementById('assignmentId').value = gup('assignmentId'); 

var i1= decodeURIComponent(gup('i1'));
var i2= decodeURIComponent(gup('i2'));
var i3= decodeURIComponent(gup('i3'));
var i4= decodeURIComponent(gup('i4'));

//alert(document.getElementById('assignmentId').value);

var imgSrc = "https://www.cs.utexas.edu/~dgurari/Projects/vqAnswerCollection/Images/";
loadData();

/*** Check if the worker is PREVIEWING the HIT or if they've ACCEPTED the HIT**/
if (gup('assignmentId') == "ASSIGNMENT_ID_NOT_AVAILABLE")
{
  // If we're previewing, disable the button and give it a helpful message
  if(document.getElementById('submitLabels') != null){
    document.getElementById('submitLabels').disabled = true;
    document.getElementById('submitLabels').value = "You must ACCEPT the HIT before you can submit the results.";
  }
} else {
  var form = document.getElementById('VQADisagreement');
  if (document.referrer && (document.referrer.indexOf('workersandbox') != -1) ) {
		// Form action for sandbox
        form.action = "https://workersandbox.mturk.com/mturk/externalSubmit";
		// form action for AMT prod
		//form.action = "https://www.mturk.com/mturk/externalSubmit";
  }
}

function loadData(){
  var length = 4;
  for(var count=1;count<=length;count++){
	var reqStr = decodeURIComponent(gup('i'+count));
    var split_str = reqStr.split('|');
    //alert('i'+count+" Image ="+split_str[0]);
	if(split_str[4]=='A'){
		imgSrc = "https://cvc.ischool.utexas.edu/~anuparna/VQA/images/Disagreement_VQAAbstractImages/";
	}
	else if(split_str[4]=='R'){
		imgSrc = "https://cvc.ischool.utexas.edu/~anuparna/VQA/images/Disagreement_VQARealImages/";
	}
	document.getElementById("i"+count).src = imgSrc+split_str[0];
	document.getElementById("img"+count).value = split_str[0];
	document.getElementById("datasetId"+count).value=split_str[4];
	
	document.getElementById("entropyId"+count).value=split_str[3];
	if(document.getElementById("q"+count) != null){
		//alert(escape(split_str[1]));
		document.getElementById("q"+count).innerHTML = "<u>Question:</u>&nbsp;"+(split_str[1]).replace(/\+/g,'&nbsp;');
		if(document.getElementById("a"+count) != null){
			var answers=(split_str[2]).replace(/\+/g,'&nbsp;');
			//alert(answers);
			var ansArr = answers.split('#');
			var ansStr = "<b><u>Answer Choices:</u><br \></b>";
			for(var i=0;i<ansArr.length;i++){
				ansStr+=(i+1)+". "+ansArr[i]+"<br />";	
			}
			document.getElementById("a"+count).innerHTML = ansStr;
		}
    }
  }
}

function gup( name )
{
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var tmpURL = window.location.href;
  //alert(tmpURL);
  var results = regex.exec( tmpURL );
  if( results == null )
    return "";
  else
    return results[1];
}


var form = document.querySelector("form");
form.addEventListener("submit", function(event) {
	var alertMsg="";
	for(var i=1;i<=4;i++){
		var att_name="reason"+i;
		var selectElement = document.getElementsByName(att_name);
		var radio_length=selectElement.length;
		var selectedValue="";
		for(var ii=0;ii<radio_length;ii++){
			if(selectElement[ii].checked){
				selectedValue=selectElement[ii].value;
				break;
			}
		}
		if(selectedValue == ""){
			alertMsg+=("Please select a reason for disagreement for Image "+i+"\n");
		}
	}	
	if(alertMsg != ""){
		alert(alertMsg);
		event.preventDefault();
	}
});
/** Collapsible Instructions script below**/
var open = true;
var heightChecked = false;
var initHeight = 0;
var intval = null;
function slideToggle(boxId,minText,maxText,buttonId1,buttonId2) {
    window.clearInterval(intval);
    var box = document.getElementById(boxId);
	if(box.offsetHeight>0){
		open=true;
	}
	else{
		open=false;
	}
    if(!heightChecked) {
        initHeight = box.offsetHeight;
        heightChecked = true;
    }
	//alert(initHeight);
    if(open) {
		//alert("on close");
        var h = initHeight;
        open = false;
        intval = setInterval(function(){
			h--;
			box.style.height = h + 'px';
			if(h <= 0)
				window.clearInterval(intval);
			}, 1
		);
		document.getElementById(buttonId1).value=maxText;
		document.getElementById(buttonId2).value=maxText;
		document.getElementById(boxId).style.visibility='hidden';
    }
    else {
        var h = 0;
        open = true;
	    intval = setInterval(function(){
			h++;
			box.style.height = h + 'px';
			//alert(h);
			if(h >= initHeight){
				window.clearInterval(intval);				
			}
		  }, 1
		);
		document.getElementById(buttonId1).value=minText;
		document.getElementById(buttonId2).value=minText;
		document.getElementById(boxId).style.visibility='visible';
    }
}
(function(){
   var ut_id = "89db89925ab3a3b01b67798eb6a89955";
   //alert(ut_id);
   if (UTWorkerLimitReached(ut_id)) {
       //document.getElementById('VQADisagreement').style.display = 'none';
       //document.getElementsByTagName('body')[0].innerHTML = "<p>Thank you for your participation.<br/>You have already completed the maximum number of HITs allowed by this requester. <br/>Please click <b>'Return HIT'</b>.</p>";
   }
})();