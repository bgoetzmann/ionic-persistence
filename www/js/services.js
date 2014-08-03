angular.module('starter.services', [])

.factory('Persistence', function($q) {
    //persistence.store.memory.config(persistence);  

    persistence.store.cordovasql.config(persistence, 'app_db', '0.0.1', 'Database description', 5 * 1024 * 1024, 0);

    var entities = {};

    entities.Playlist = persistence.define('Playlist', {
      title: 'TEXT'
    });

    persistence.debug = true;
    persistence.schemaSync();

    return {
      Entities: entities,

      add: function(playlist) {
        persistence.add(playlist);
        persistence.flush();
      },
      
      getAllPlaylists: function() {
        var defer = $q.defer();

        entities.Playlist.all().list(null, function (playlists) {
          defer.resolve(playlists);
        });

        return defer.promise;
      }
    };
  })