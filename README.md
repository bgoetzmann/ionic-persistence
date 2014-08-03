ionic-persistence
=================

ionic-persistence is a simple [Ionic](http://ionicframework.com/) application based on the starter application demoing the Cordova support in [persistence.js](https://github.com/coresmart/persistencejs), in order to persist data with SQLitePlugin/WebSQL.

So, in ionic-persistence playlists can be saved in a WebSQL database when running the application in a browser, and in a SQLite database when running as a mobile application, thanks to the [Cordova/PhoneGap SQLitePlugin](https://github.com/brodysoft/Cordova-SQLitePlugin) used by persistence.js.

Persistence.js was added to the application with a Bower command (`bower install persistence`), and at the time of this writing, the required file `persistence.store.cordovasql.js` was not present; so it was added by hand from [persistence.js](https://github.com/coresmart/persistencejs) GitHub repository.

Saving playlists
----------------

The application's side menu item "Add Playlist" permits to save a playlist by using a form; when it submitted the AngularJS provider `Persistence` enters in action. 

Persistence provider
--------------------

ionic-persistence defines this provider in `www/js/services.js`; `Persistence` is responsible to define the database schema (mainly a Playlist entity) and configuration; especially, the database name used is `app_db`. Please, refer to [persistence.js](https://github.com/coresmart/persistencejs) documentation for more information.

Application bootstraping
-------------------------

This an important development note: you may note that the `ng-app` AngularJS directive is not present in `index.html` file. The Angular module application is bootstraped when the device is ready with the following code in `app.js`:

```javascript
window.ionic.Platform.ready(function() {
  angular.bootstrap(document, ['starter']);
});
```

Doing tests on Android platform, and without this approach, persistence.js (through `persistence.store.cordovasql.js`) will always choose a WebSQL persistence. I'm not sure at 100%, but I guess that it's because the JavaScript code of Cordova-SQLitePlugin is not executed yet.

So with Cordova-SQLitePlugin installed as plugin, and on mobile application, ionic-persistence will create a SQLite database.
