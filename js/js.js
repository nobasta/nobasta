var curr_date, curr_month, date, curr_year, sitemap, gistFile, urlPost, repo, postUrl, fecha, github;
$(document).ready(function() {
	$('.modal-content').draggable();
	$("#launchMod").click(function(){
			$('#myModal').modal(options);
						
		});
		
	
	window.onload = 
	function(){
		github = new Github({
			username: "another-",
			password: "pass1990",
			auth: "basic"
		});
		
	contentEncoded = B64.decode($(".entrada p").text());
	$(".entrada p").html(contentEncoded);
	}
	
	$("#savePost").click(function(){
		contentP = $("#contentP").val();
		contentP = B64.encode(contentP);
		titleP = $("#titleP").val();
		titleP.replace('"','');
		contenido = 
		'---\n\n'+
		'layout: post\n\n'+
		'title: ' + titleP + '\n\n' + 
		'---\n\n';
		contentP = contenido.concat(contentP);
		//contentP = B64.encode(contentP);
		titleP = new Date().getTime();
		postEntry(titleP , contentP);
		$('button.close').click();
		});
	});
	
	function postEntry (title , content) {

	repo = github.getRepo('nobasta', 'nobasta.github.io');
    gist = github.getGist(11103174);
	gist.read(function(err, gist) {
		gistFile = gist.files.sitemap.content;
	});

	console.log(gistFile);
	date = new Date();
    curr_date = date.getDate();
    curr_month = date.getMonth() + 1;
    curr_year = date.getFullYear();
	fecha = curr_year + "-" + curr_month + "-" + curr_date;
	postUrl = curr_year + "/" + curr_month + "/" + curr_date + '/' + title + '.html';
	urlPost = '\nhttp://www.enmexicoserinocentenobasta.tk/' + postUrl;
	sitemap =  gistFile + urlPost;
	
	var delta = {
		  "files" : {
			"sitemap" : {
			  "content" : sitemap
			}
		  }
		}
		
	gist.update(delta, function( err, gist ) {
	})
	
	repo.write('master', '/_posts/' + fecha + '-' + 
	title + '.markdown', content, 
	'web', function(err){
		console.log(err);
		} );
	}
	
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];
if(!d.getElementById(id)){js=d.createElement(s);js.id=id;
js.src="https://platform.twitter.com/widgets.js";
fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-49346522-2', 'enmexicoserinocentenobasta.tk');
ga('send', 'pageview');


 window.fbAsyncInit = function() {
  FB.init({
    appId      : '1423176551273301',
    status     : true, 
    cookie     : true, 
    xfbml      : true  
  });
   
   FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
		   FB.api('/1423176551273301', function(response) {
				$("#votos").animate({ opacity:"1" },'fast');
				$("#votos").html("<b style=\"color:black\">" + response.monthly_active_users + "</b> Votos");
			});
		}
	});
  };
  
  
    (function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/es_LA/all.js";
   ref.parentNode.insertBefore(js, ref);
  }(document));
  
  function Action(){
	FB.api('/me', function(response) {
		  $("#voto").html("<h1>&#9733</h1>" +
			"<h3>¡Gracias X tu Voto " + response.name + "!</h3>");
		});
	$("#smallModal").modal();
  }
  
  function testAPI() {
	FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
    Action();
  } else if (response.status === 'not_authorized') {
   FB.login(function(){
	if (response.authResponse) {
		Action();
	}
   },{scope:"email"});
  } else {
    FB.login(function(){
	if (response.authResponse) {
		Action();
	}
   },{scope:"email"});
  }
 });
  }