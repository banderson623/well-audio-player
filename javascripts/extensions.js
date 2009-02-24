Number.prototype.toDecimalPrecision = function(number_of_decimal_places) {  
  return Math.round(this * Math.pow(10,number_of_decimal_places)) / Math.pow(10,number_of_decimal_places);
} 


Number.prototype.toTimeCode = function(){
  minutes = Math.floor(this/60.0);
  seconds = Math.round(this - (minutes * 60.0));
  if(seconds == 60) {
    minutes+=1;
    seconds = 0;
  }
  if((""+seconds).length == 1) seconds = "0"+seconds;
  return minutes + ":" + seconds;
  
}
