/* jshint node: true */
'use strict';
var path = require('path'),util = require('util'),extend = util._extend;
var defaultOpt= {
	langs: [],
	plugins: []
};
module.exports = {
  name: 'eetest',
  included: function(app) {
    this._super.included(app);

    var options = extend(defaultOpt, app.options['fdeditor']);
    var validCSSPlugins = ['char_counter','code_view', 'colors', 'emoticons', 'file', 'fullscreen', 'image_manager', 'image', 'line_breaker', 'table', 'video'];
    var fdplugins=['cannedresponse','fdplaceholder'];


  //  app.import(app.bowerDirectory + '/froala-wysiwyg-editor/css/themes/gray.min.css');
    //ADDING LANGUAGES OTHER THAN ENGLISH
    if(options.hasOwnProperty('langs') && options.langs.length>0){
      options.langs.map(function(name) {
				console.log("-"+name);
        app.import(app.bowerDirectory + '/froala-wysiwyg-editor/js/languages/'+name+'.js');
      });
    }
    //ADDING PLUGINS
    if(options.hasOwnProperty('plugins') && options.plugins.length>0){
      options.plugins.map(function(name) {
        if(fdplugins.indexOf(name) === -1){
            if(validCSSPlugins.indexOf(name)>-1){
              app.import(app.bowerDirectory + '/froala-wysiwyg-editor/css/plugins/'+name+'.min.css');
            }
            app.import(app.bowerDirectory + '/froala-wysiwyg-editor/js/plugins/'+name+'.min.js');
        }else{
          app.import( 'vendor/js/plugins/'+name+'.js');
          app.import( 'vendor/css/plugins/'+name+'.css');
        }
      });
    }
  }
};
