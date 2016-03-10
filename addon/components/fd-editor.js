import Ember from 'ember';
import layout from '../templates/components/fd-editor';

export default Ember.Component.extend({
  layout,
  editor:null,
  oninit:function(){
    this.get("custombuttons")();
  }.on("init"),
  "defaultoptions":{
      toolbarInline: false,
      placeholderText:"Descripition",
      language:"en-us",
      imagePaste: true,
      imageUpload: false,
      savecursorpositon:true,
      pasteAllowLocalImages:true,
      pasteDeniedAttrs:['class', 'id'],
      toolbarButtons:['bold', 'italic', 'underline', 'strikeThrough', '|', 'outdent', 'indent' ,'insertImage','|' ,'undo', 'redo', 'clearFormatting','|','cannedresponse','inserPlaceholder']

  },
  oninsert:function(){
      var ed="#"+this.editorid;
      console.log(ed);
      console.log($(ed));
      $(ed)[0].fdeditor={
          insert:function(msg){
              $(ed).froalaEditor("html.insert", msg);
          }
      };
      console.log($(ed)[0].fdeditor)
  }.on("didInsertElement"),

  "newoptions":Ember.computed(function(){
     if(this.get("options")){
       return $.extend(defaultoptions,this.get("options"));
     }else{
       return this.get("defaultoptions");
     }
  }),

  "newvalue":Ember.computed(function(){
    return this.get("value");
  }),

  buttons:function(){
//    if( !( $.FroalaEditor.defaultcustombuttonsadded)){
//
//      $.FroalaEditor.defaultcustombuttonsadded=true;
//    }



                $.FroalaEditor.DefineIcon('cannedresponse', {NAME: 'database'});
                $.FroalaEditor.RegisterCommand('cannedresponse', {
                  title: 'Canned Response',
                  type: 'dropdown',
                  focus: false,
                  undo: false,
                  refreshAfterCallback: true,
                  options: {
                    'v1': 'Email Template',
                    'v2': 'Get back to you'
                  },
                  callback: function (cmd, val) {
                     console.log('Hello!'+val +JSON.stringify(this.opts.htmlAllowedTags));
                  },
                  // Callback on refresh.
                  refresh: function ($btn) {
                    //console.log ('do refresh');
                  },
                  // Callback on dropdown show.
                  refreshOnShow: function ($btn, $dropdown) {
                    console.log ('do refresh when show');
                  }
                });

  },



  actions: {
    contentChanged: function(event, editor) {
    var temp=editor.html.get(true);
    
//     console.log(temp);
//     
//      if(temp.includes("fr-marker")){
//           editor.selection.clear();
//      }
//      if(this.get("newoptions").savecursorpositon && ! temp.includes("fr-marker")){
//          editor.selection.save();
//      }
//      this.set("value",editor.html.get(true));
    },
    focus: function(event, editor) {
//      if(this.get("newoptions").savecursorpositon ){
//       editor.selection.save();
//      }
//      this.set("value",editor.html.get(true));
    },
    click: function(event,editor,eee){
        if(editor){
            if(this.get("newoptions").savecursorpositon ){
              editor.selection.save();
            }
           this.set("value",editor.html.get(true));
        }
        
    },
    blur: function(event,editor,eee){
        
        var temp=editor.html.get(true);
        console.log("temp has  marker "+temp.includes("fr-marker"));
        if(temp.includes("fr-marker")){
           this.set("value",editor.html.get(true));
        }else{
           var t='<span class="fr-marker" data-id="0" data-type="false" style="display: none; line-height: 0;">​</span><span class="fr-marker" data-id="0" data-type="true" style="display: none; line-height: 0;">​';
           this.set("value",t+editor.html.get(true));
        }
        
    }
  }

});
