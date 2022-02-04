var ghToken = ""; //Your access token
var group_id = ""; //The Group ID
var group = "https://gitlab.estig.ipb.pt/api/v4/groups/" + group_id + "/invitations?access_token="+ghToken;
var form = FormApp.openById('1ziTkef4CfOpYjjClnd7W4awMiyOrWWOfib6kS9kuK4s');

ScriptApp.newTrigger('onFormSubmit')
.forForm(FormApp.getActiveForm())
.onFormSubmit()
.create;

function onFormSubmit(e){
  var formResponses = form.getResponses();
  var sz = formResponses.length.toFixed(0); //Last Response
  var formResponse = formResponses[sz-1]; //Get Last Response
  var itemResponse = formResponse.getItemResponses()[0];//get Last Item Response
  let gitlab = "https://gitlab.estig.ipb.pt/";
  if (itemResponse.getResponse().toString[0]=='h'){
      Logger.log("tru");
  }
  let str = itemResponse.getResponse();
  str = str.toString();
  //Checks if the the person submited the email(aXXXXX@alunos.ipb.pt) instead of the LDAP username(aXXXXX) or if the person submited their profile url https://gitlab.estig.ipb.pt/aXXXXX
  if (str[0] != "a"){
    if (str[0] > '0' && str[0] < '9'){
      if (String(str).length == 5){
        var append = "a" + str;
        str = append;
      } 
    }else if (String(str).startsWith(gitlab)){
      Logger.log("YES");
      str = String(str).replace("//","/");
      const str_ = String(str).split("/");
      str = str_[2];
    }else{
      throw 'Parameter is not a number!';
    }
  }else if (String(str).search("@")){
      const str_1 = String(str).split("@");
      str = str_1[0];   
  }

  var dataString = 'email=' + str + '@alunos.ipb.pt&access_level=10';
  Logger.log(dataString);
  var options = {
    'method': 'POST',
    'payload' : dataString
  };
  Logger.log('Inviting: %s',str+"@alunos.ipb.pt");
  var response = UrlFetchApp.fetch(group , options);
  console.log(response.getContentText());

}
