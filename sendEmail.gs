function sendEmail() {
  
  // Activates this sheet everytime we run the function
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Emails").activate();
  
  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var emailTemplateSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Email Body Template").getRange("A1").getValue();
  
   // Get the last row where you have some data
  var lr = ss.getLastRow();
  
  // Count number of email quotas you have left.
  //var quotaLeft = MailApp.getRemainingDailyQuota()-95;
  var quotaLeft = MailApp.getRemainingDailyQuota();
  //Logger.log(quotaLeft);
  
  if((lr-1) > quotaLeft){
    Browser.msgBox("You have " + quotaLeft + " emails left and you're trying to send " + (lr-1) + " emails. Emails were not sent!");
  }else {
     // Loop through the emails and send emails one by one
  
    for(var i=2; i<=lr; i++){
      var currentStudentEmail = ss.getRange(i, 1).getValue();
      var currentStudentName = ss.getRange(i, 2).getValue();
      var currentStudentClass = ss.getRange(i, 3).getValue();
      var currentStudentDate = ss.getRange(i, 4).getDisplayValue();
      
 
      // Create an object to hold email dynamic data
      var emailInfo = {
        name:  currentStudentName,
        class: currentStudentClass,
        date:  currentStudentDate
      };
      var emailBody = emailTemplate(emailInfo, emailTemplateSheet);
      var currentEmailSubjct = "Reminder: Your class " + currentStudentClass +" tomorrow";  
        //Loop through the object.
      
     // Logger.log(emailBody);
      
      //Logger.log(currentEmail);
      //var currentEmailBody = emailTemplateSheet.replace("{name}",currentStudentName).replace("{class}",currentStudentClass);
      //Logger.log(emailBody);
      
      MailApp.sendEmail(currentStudentEmail, currentEmailSubjct, emailBody, {name:"LLC English Learning Center"});
    }
  }
  // var emailText = emailTemplateSheet.replace("{name}","Stduent").replace("{class}","class name");
  // Logger.log(emailText);
  
}
function emailTemplate(obj, emailTemplateSheet){
  
  var emailBody = emailTemplateSheet;
  for(let [key, value] of Object.entries(obj)){
    emailBody = emailBody.replace("{" + key +"}",value);
    //Logger.log(emailBody);
  }
  
  return emailBody;
}
