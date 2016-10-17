angular.module('Lunona').constant("API",{
	baseURL:"http://lunona.com/api/TranslatorService.svc/",
	frontURL:"http://lunona.com/api/FrontEndServices.svc/",
	getURL:function(){
		return this.baseURL;
	},
	getStringsForLang:function(language){
		return this.baseURL+"GetStringsForLang?langiso="+language;
	},
	getLanguage:function(){
		return this.baseURL+"GetSupportedSiteLanguages";
	},
	checkLogin:function(uname, language){
		return this.frontURL+"CheckEmailOrNickname?EoN="+uname+"&LanguageISO="+language;
	},
	doLogin:function(){
		return this.frontURL+"LogInUser";
	},
	loginnamesuggestions:function(name){
		return this.frontURL+"GetNewLoginNameSuggestions";
	},
	getcountries:function(){
		return this.frontURL+"GetCountries";
	},
	getstates:function(state){
		return this.frontURL+"GetStates?Country="+state;
	},

	getcityusingstate:function(country, state){
		return this.frontURL+"GetCitiesAndZip?country="+country+"&StateISO="+state;
	},
	
	getcity:function(country){
		return this.frontURL+"GetCitiesAndZip?country="+country;
	},
	getdateofbirth:function(year,month,date){
		return this.frontURL+"MakeDateValid?Year="+year+"&Month="+month+"&Day="+date;
	},
	postdata:function(){
		return this.frontURL+"registerNewUser";
	},
	

});