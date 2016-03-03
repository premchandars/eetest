import Ember from 'ember';
import layout from '../templates/components/say-hello';

export default Ember.Component.extend({
  layout,
  preparetosay:function(){
    alert("Preparing to say");
  }.on("init"),
  aftersaid:function(){
    alert("Just said that")
  }.on("didInsertElement")
});
