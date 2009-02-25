new Test.Unit.Runner({
    
  setup: function(){
    this.state_namespace = 'audio_state';
    
    // Calling a private method to setup test
    // new CookieState(this.state_namespace)._eraseCookie();
    this.cs = new CookieState(this.state_namespace);
    this.cs.set('cookie_should_persist',"true");
  },

  testTester: function(){
    this.assert(true);
  },
  
  testCookieStateInstantiation: function () {
    var cookie_state = new CookieState(this.state_namespace);
    cookie_state.set('this_is_a_test',42);
    this.assertEqual(cookie_state.get('this_is_a_test'), 42);
    this.assertEqual(cookie_state.get('cookie_should_persist'), "true");
  },
  
  testCookieWithRandomValue: function(){
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var final_string = '';
    for(var i = 0; i<=20; i++){
      final_string+= letters[(Math.round(Math.random() * 25))];
    }
    this.cs.set('random',final_string);
    this.assertEqual(this.cs.get('random'), final_string);
  }
  
  // testCookieWithLotsOfSets: function(){
  //   for(var i = 0; i<=20; i++){
  //     this.cs.set('random',final_string);
  //   }
  // }
  
  
  // teardown: function(){
  //   new CookieState(this.state_namespace).removeAll();
  // }
  
  
});