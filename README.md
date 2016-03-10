# Ember-cli-fd-rteditor

This README outlines the details of collaborating on this Ember addon.

##TO Install this addon

Run this command from ember app dir

`ember install ember-froala`

`Copy "fonts" folder from bower_components/font-awesome and paste it into public folder`

` ember install git+ssh://git@github.com:premchandars/eetest.git --save `


add this option in ember-cli-build.js

    var app = new EmberApp(defaults, {

        fdeditor{

           //languages that are supported in your application other than en_us
           langs:["ar","bs","cs","da","de","en_ca","en_gb","es","et","fa","fi","fr","he","hr","hu","id","it","ja","ko","me","nb","nl","pl","pt_br","pt_pt","ro","ru","sr","sv","th","tr","ua","zh_cn","zh_tw"],

           //list of buttons or plugins that are needed for your application globally
           plugins:["align","char_counter","code_beautifier","code_view","colors","draggable","emoticons","entities","file","font_family","font-size","fullscreen","image_manager","image","inline_sytle","line_break","link","lists","paragraph_format","paragraph_style","quick_insert","quote","save","table","url","video","cannedresponse","placeholder"]
        }

    });



    New options

    {
        savecursorpositon:false,

    }
