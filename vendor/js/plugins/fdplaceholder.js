
(function ($) {
// Define popup template.
$.extend($.FroalaEditor.POPUP_TEMPLATES, {
  'fdplaceholder.popup': '[_BUTTONS_][_CUSTOM_LAYER_]'
});

// Define popup buttons.
$.extend($.FroalaEditor.DEFAULTS, {
  fdplaceholderButtons: ['popupClose', '|', 'popupButton1', 'popupButton2'],
});

// The custom popup is defined inside a plugin (new or existing).
$.FroalaEditor.PLUGINS.fdplaceholder = function (editor) {
  // Create custom popup.
  function initPopup () {
    // Load popup template.
    var template = $.FroalaEditor.POPUP_TEMPLATES.customPopup;
    if (typeof template == 'function') template = template.apply(editor);

    // Popup buttons.
    var popup_buttons = '';

    // Create the list of buttons.
    if (editor.opts.fdplaceholderButtons.length > 1) {
      popup_buttons += '<div class="fr-buttons">';
      popup_buttons += editor.button.buildList(editor.opts.fdplaceholderButtons);
      popup_buttons += '</div>';
    }

    // Load popup template.
    var template = {
      buttons: popup_buttons,
      custom_layer: '<div><div><ul><li>Tickets</li><li>Tickets Fields</li><li>Requester</li><li>Company</li>\n\
          <li>Helpdesk</li></ul></div><div><div id="Tickets"> Tickets fields </div><div id="Requester" style="display:none">Requester Fields</div></div></div>'
    };

    // Create popup.
    var $popup = editor.popups.create('fdplaceholder.popup', template);

    return $popup;
  }

  // Show the popup
  function showPopup () {
    // Get the popup object defined above.
    var $popup = editor.popups.get('fdplaceholder.popup');

    // If popup doesn't exist then create it.
    // To improve performance it is best to create the popup when it is first needed
    // and not when the editor is initialized.
    if (!$popup) $popup = initPopup();

    // Set the editor toolbar as the popup's container.
    editor.popups.setContainer('fdplaceholder.popup', editor.$tb);

    // If the editor is not displayed when a toolbar button is pressed, then set BODY as the popup's container.
    // editor.popups.setContainer('placeholder.popup', $('body'));

    // Trigger refresh for the popup.
    // editor.popups.refresh('placeholder.popup');

    // This custom popup is opened by pressing a button from the editor's toolbar.
    // Get the button's object in order to place the popup relative to it.
    var $btn = editor.$tb.find('.fr-command[data-cmd="inserPlaceholder"]');

    // Compute the popup's position.
    var left = $btn.offset().left + $btn.outerWidth() / 2;
    var top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);

    // Show the custom popup.
    // The button's outerHeight is required in case the popup needs to be displayed above it.
    editor.popups.show('fdplaceholder.popup', left, top, $btn.outerHeight());
  }

  // Hide the custom popup.
  function hidePopup () {
    editor.popups.hide('fdplaceholder.popup');
  }
  
  function insertmy(){
      alert("test");
      editor.html.insert("Prem is a clever boy");
  }

  // Methods visible outside the plugin.
  return {
    showPopup: showPopup,
    hidePopup: hidePopup,
    insertmy:insertmy
  }
};



// Define an icon and command for the button that opens the custom popup.
$.FroalaEditor.DefineIcon('inserPlaceholder', { NAME: 'star'});
$.FroalaEditor.RegisterCommand('inserPlaceholder', {
  title: 'Show Popup',
  icon: 'inserPlaceholder',
  undo: false,
  focus: false,
  popup:true,
  callback: function () {
    console.log(this);
    this.fdplaceholder.showPopup();
  },
  plugin: 'fdplaceholder'
});
$.FroalaEditor.DefineIcon('insertmy', {NAME: 'plus'});
$.FroalaEditor.RegisterCommand('insertmy', {
  title: 'Insert HTML',
  focus: true,
  undo: true,
  refreshAfterCallback: true,
  callback: function () {
    this.html.insert('My New HTML');
  },
  plugin:'fdplaceholder'

});

// Define custom popup close button icon and command.
$.FroalaEditor.DefineIcon('popupClose', { NAME: 'times' });
$.FroalaEditor.RegisterCommand('popupClose', {
  title: 'Close',
  undo: false,
  focus: false,
  callback: function () {
    this.fdplaceholder.hidePopup();
  }
});

// Define custom popup 1.
$.FroalaEditor.DefineIcon('popupButton1', { NAME: 'bell-o' });
$.FroalaEditor.RegisterCommand('popupButton1', {
  title: 'Button 1',
  undo: false,
  focus: false,
  callback: function () {
    alert("popupButton1 was pressed");
  }
});

// Define custom popup 2.
$.FroalaEditor.DefineIcon('popupButton2', { NAME: 'bullhorn' });
$.FroalaEditor.RegisterCommand('popupButton2', {
  title: 'Button 2',
  undo: false,
  focus: false,
  callback: function () {
    alert("popupButton2");
  }
});

})(jQuery);
