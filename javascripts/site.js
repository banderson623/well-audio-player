document.observe("dom:loaded", function(){
  form_labelizer();
  // mock_slider();
  tagify();
  fake_play();
  fake_player_controls();
  make_searchable();
  // State restore
  is_loaded();
  // set_play_location();
  
});


// Takes a precedeing or following <label> tag and 
// sets it to the default form value
function form_labelizer(){
  $$('form input','form select', 'form textarea').each(function(el){
    var label = null;
    if(el.previous().tagName == 'LABEL') {
      label = el.previous();
    } else if(el.next().tagName == 'LABEL') {
     // console.log('after');
     label =  el.next();
    }
    if(label != null){
      label.hide();
      el.default_value = label.innerHTML;
      
      var add_default = function(el){if (el.value == ''){  
                                      el.value = el.default_value;
                                      el.addClassName('default');          
                                    }};
                                          
      var remove_default = function(el){
                             if (el.default_value == el.value){  
                               el.value = ''; 
                               el.removeClassName('default');
                             }};
      
      add_default(el);
      el.observe('focus', function(){remove_default(this)});
      el.observe('blur',  function(){add_default(this);});

    }
  });
}

function make_searchable(){
  $('search_form').observe('submit', function(evnt){evnt.stop();});
  $('search').observe('keydown', function(){do_search(this)});
  $('search').observe('keyup', function(){do_search(this)});
}


function do_search(field){
  // console.log("Field value '" + field.value + "'");
  
  var searchable = $$('div.recording .searchable');
  var recordings = $$('div.recording');
  var showing = [];
  // var searching = field.value.toLowerCase().split(' ');
  var search_string = field.value.toLowerCase();
  
  if(field.value.length <= 0){
    $$('div.recording').invoke('show');
  } else {
    searchable.each(function(el){
      if(el.innerHTML.toLowerCase().include(search_string)){
        showing.push(el.up('div.recording'));
      }
    });  
    recordings.each(function(el){
      if(!showing.include(el)){el.hide();}
    });
  }
}



// function  increment_time(){
//   s.setValue(1 + s.value);
// }

function tagify(){
  $$('#current_tags a', ".tags a").each(function(el){
      el.title = "Show only recordings with the tag: " + el.innerHTML + ".";
  });
}


function is_loaded(){
  if(window.state.isSet('au')){
    load_recording($(window.state.get('au')));
  }
}

function unload_current_playing(){
  if(window.pe !== undefined){
    window.pe.stop();
    window.pe = null;
  }
  
  $$('.recording').each(function(recording){
     if(recording.getOpacity() < 1.0){
       new Effect.Opacity(recording, {to:100, duration:0.55});
     }
   })
  
   new Effect.Opacity($('player'), {
     to:0,
     duration: 0.35,
   });
}

function load_recording(recording){
  window.state.set('au',recording.id);
  var str = $(recording).down('h2').innerHTML.replace(/<(.*)/,'');
    
  if($('player').getOpacity() < 1.0) {
    setTimeout(function(){
      $('player').down('h2#current_name').update(str);
      new Effect.Opacity($('player'), {
        to:100,
        from:0,
        duration: 1,
        delay:0.75
      });
    }, 375);
  } else {
    $('player').down('h2#current_name').update(str);
  }
  
  

  new Effect.Opacity($(recording), {
    to: 0.5,
    duration:0.5,
  });
  
}

function fake_play(){
  $$('.recording .controls a.play').each(function(el){
    el.observe('click', function(evnt){
      //var delta =  $('player').positionedOffset().top - el.up('div.recording').positionedOffset().top + 25
      unload_current_playing();
      load_recording(el.up('div.recording'));
      setTimeout(function(){
        s.setValue(0);
        start_playing();
      },350);
      evnt.stop();
    });
  });
}

function start_playing(){
  var play_control_el = $('play');
  var pause_control_el = $('pause');
  var playing_indicator_el = $('playing');
  
  window.pe = new PeriodicalExecuter(increment_time, 1);
  play_control_el.hide();
  playing_indicator_el.appear();
  pause_control_el.show();
}

function fake_player_controls(){
  var play_control_el = $('play');
  var pause_control_el = $('pause');
  var playing_indicator_el = $('playing');
  playing_indicator_el.hide();
  pause_control_el.hide();
  
  $('play').observe('click', start_playing);
  
  $('pause').observe('click', function(){
    window.pe.stop();
    play_control_el.show();
    playing_indicator_el.fade({duration:0.25});
    pause_control_el.hide();
  })
  
}


// var State = Class.create({
//   // representation: new Hash(),
//   
//   initialize: function(){
//     console.log('new');
//     this.h = new Hash();
//     this._parse();
//   },
//   
//   set: function(key,val){
//     this._parse();
//     this.h.set(key,val);
//     this._writeToLocation();
//   },
//   
//   get: function(key){
//     this._parse();
//     return this.h.get(key);
//   },
//   
//   // returns the hash
//   getAll: function(){
//     return this.h;
//   },
//   
//   isSet: function(key){
//     return this.get(key) !== undefined
//   },
//   
//   remove: function(key){
//     this.h.remove(key);
//     this._writeToLocation();
//   },
//   
//   //private
//   
//   _writeToLocation: function(){
//     console.log("Writing hash to url: " + this.h.inspect());
//     document.location.hash = this.h.toQueryString();
//   },
//   
//   _parse: function(){
//     document.location.hash.replace(/#|#&/,'').split('&').each(function(keyval){
//       keyval = keyval.split('=');
//       this.h.set(keyval[0],keyval[1]);
//     }.bind(this));
//   }
// })

var state = new State();