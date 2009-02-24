// Player Object lives here, please be nice
// This code is responsible for maintaining the large player, the visual display as
// well as instructing the sound mananger library to start stop and queue up new
// audio files as well.

// I am not sure how this JSON will or will not be used, for now ignore this.
// JSON Example
// var recording = {
//   name: "True Joy",
//   date: "01/09/09",
//   description: "What is Joy? When should we be joyful? How should we be joyful? Paul answers all of these in the first chapter of Philippians. True Joy is not circumstanical, nor strictly and emotion, its a heart attitude based on our love and experience with Christ.",
//   duration: "14:12",
//   tags: "Sean Barber, Philippians, Sunday Evening",
//   audio_file: "blabla.mp3"
// }

var Player = Class.create({
  
  options: {
    track_element: 'track',
    handle_element: 'handle',
    current_time_element: 'current_time'
  },
  
  initialize: function(duration){
    // Duration is in seconds
    this._duration = duration;
    this._sound_manager_loaded = false;
    this._slider = null;
    this._buildSlider();
    this._initSoundManager();
  },
  
  
  setTime: function(seconds){
    this._slider.setValue(seconds);
  },
  
  
  // Private methods, don't touch!
  
  _buildSlider: function(){
    this._slider = new Control.Slider(this.options.handle_element, this.options.track_element,{
                          range: $R(0,this._duration),
                          increment: 1,
                        });
    this._slider.options.onSlide =  this._updateCurrentTime.bind(this);
    this._slider.options.onChange =  this._updateCurrentTime.bind(this);    
  },
  
  _updateCurrentTime: function(current_location_in_seconds){
    // this._log('updating time to ' + current_location_in_seconds);
    // TODO: This really needs to tell the player to advance this far in to the audio.
    $(this.options.current_time_element).update(new Number(current_location_in_seconds).toTimeCode());
    // window.state.set('t',Math.round(value));
  },
  
  
  // Sounds manager functions
  
  _initSoundManager: function(){
    window.soundManager.onLoad = function(){this._sound_manager_loaded = true}.bind(this);
  },
  
  
  
  _log: function(str){
    if(console.log){
      console.log(str);
    }
  }
  
});

document.observe('dom:loaded', function(){
  window.well_player = new Player(100);
});