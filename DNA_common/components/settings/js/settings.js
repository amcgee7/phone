console.log("start of settings.js");
var Settings={};

Settings.TemplateHTML = "DNA_common/components/settings/settings.html";

Settings.includeHTMLSucess = function(linkobj) {
   console.log("loaded settings.html");
   Settings.import = linkobj.path[0].import;
   Settings.settingsIconHTML = Settings.import.getElementById('settingsIcon');
   Settings.settingsMenuHTML = Settings.import.getElementById('settingsMenu');
/*
   Settings.settingsPageItemHTML = Settings.import.getElementById('settingsPageItem').innerHTML;
   $("body").append(Settings.import.getElementById('settingsTabs'));
*/
};
		
Settings.pageUpdate = function() {
	$('#settingsIcon').replaceWith(Settings.settingsIconHTML);
	$('#settingsMenu').replaceWith(Settings.settingsMenuHTML);
};

/*
Settings.addUpdateSettingsPage = function(name,page,onclick) {
	$("#settingsPage").append(Settings.settingsPageItemHTML);
}
*/

Settings.includeHTMLFailed = function(linkobj) {
	console.log("load settings.html failed");
	console.log(linkobj);
};

includeHTML(Settings.TemplateHTML, Settings.includeHTMLSucess, Settings.includeHTMLFailed);

console.log("end of settings.js");
