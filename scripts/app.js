(function ($) {
	'use strict';

	  window.app = {
      name:'pearl .audio',
      setting: {
        folded: false,
        container: false,
        color: 'primary',
        bg: ''
      }
    };

    var setting = 'jqStorage-'+app.name+'-Setting',
        storage = $.localStorage,
        color;

    if( storage.isEmpty(setting) ){
        storage.set(setting, app.setting);
    }else{
        app.setting = storage.get(setting);
    }
    var v = window.location.search.substring(1).split('&');
    for (var i = 0; i < v.length; i++)
    {
        var n = v[i].split('=');
        app.setting[n[0]] = (n[1] == "true" || n[1]== "false") ? (n[1] == "true") : n[1];
        storage.set(setting, app.setting);
    }



		// // TODO user authentification based on google-firebase setup for demos
		// // Auth signInWithEmailAndPassword
		// function authenticate(){
		// 	// Initialize Firebase
		// 	const config = {
		// 		apiKey: "AIzaSyBDJnQw4BJCAuY6gfXHJJ9cHRQRAPx28qc",
    // 		authDomain: "pearl-audio.firebaseapp.com",
    // 		databaseURL: "https://pearl-audio.firebaseio.com",
    // 		storageBucket: "pearl-audio.appspot.com",
    // 		messagingSenderId: "545160685145"
  	// 	};
  	// 	firebase.initializeApp(config);
		//
		// 	// Get elements
		// 	const email = document.getElementByID('email');
		// 	const password = document.getElementByID('password');
		// 	const submit = document.getElementByID('submit')
		//
		// 	// Add login event
		// 	submit.addEventListener('click', e => {
		// 		// Get email and password
		// 		const email = email.value;
		// 		const password = password.value;
		// 		const auth = firebase.auth();
		//
		// 		//Sign in
		// 		const promise = auth.signInWithEmailAndPassword(email, password);
		// 		promise.catch(e => console.log(e.message));
		// 	})
		// 	}
		// }

		setTheme();
    // initialization of the theme setup for user
    function setTheme(){

      $('body').removeClass($('body').attr('data-ui-class')).addClass(app.setting.bg).attr('data-ui-class', app.setting.bg);
      app.setting.folded ? $('#aside').addClass('folded') : $('#aside').removeClass('folded');
      $('#aside').length == 0 && (app.setting.container ? $('.app-header .navbar, .app-content').addClass('container') : $('.app-header .navbar, .app-content').removeClass('container'));

      $('.switcher input[value="'+app.setting.color+'"]').prop('checked', true);
      $('.switcher input[value="'+app.setting.bg+'"]').prop('checked', true);

      $('[data-target="folded"] input').prop('checked', app.setting.folded);
      $('[data-target="container"] input').prop('checked', app.setting.container);

      if(color != app.setting.color){
        uiLoad.remove('css/theme/'+color+'.css');
        uiLoad.load('css/theme/'+app.setting.color+'.css');
        color = app.setting.color;
      }
    }

    // click to switch
    $(document).on('click.setting', '.switcher input', function(e){
      var $this = $(this), $target;
      $target = $this.parent().attr('data-target') ? $this.parent().attr('data-target') : $this.parent().parent().attr('data-target');
      app.setting[$target] = $this.is(':checkbox') ? $this.prop('checked') : $(this).val();
      storage.set(setting, app.setting);
      setTheme(app.setting);
    });

})(jQuery);
