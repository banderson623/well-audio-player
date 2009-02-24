new Test.Unit.Runner({
  testShouldInstantiate: function () {
    var player = new Player(10);    
    this.assertInstanceOf(player, Player);
  }
  
});