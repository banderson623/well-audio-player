new Test.Unit.Runner({
  testDecimalPrecisionBasic: function () {
    var number = 5.321443;
    this.assertEqual("5.32", number.toDecimalPrecision(2));
    this.assertEqual("5.321", number.toDecimalPrecision(3));
    this.assertEqual("5", number.toDecimalPrecision(0));
    
  },
  
  testDecimalPrecisionRounding: function(){
    var number = 5.561443;
    this.assertEqual("6", number.toDecimalPrecision(0));
    this.assertEqual("5.6", number.toDecimalPrecision(1));
    this.assertEqual("5.56", number.toDecimalPrecision(2));
  },
  
  
  testToTimeCodeBasic: function(){
    this.assertEqual("1:10", (70).toTimeCode());
  },
  
  testTimeCodeLessThanSixtySeconds: function(){
    this.assertEqual("0:50", (50).toTimeCode());
  },
  
  testTimeCodeOneMinute: function(){
    this.assertEqual("1:00", (60).toTimeCode());
  },
  
  testTimeCodeNumberPlacement: function(){
    this.assertEqual("1:01", (61).toTimeCode());
  }
  
});