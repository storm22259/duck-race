String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};
String.prototype.replaceAt = function (index, character) {
  return (
    this.substr(0, index) + character + this.substr(index + character.length)
  );
};
String.prototype.toHHMMSS = function () {
  var seconds = parseInt(this, 10);
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds - hours * 3600) / 60);
  seconds = seconds - hours * 3600 - minutes * 60;
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
};
String.prototype.ucfirst = function () {
  var firstLetter = this.substr(0, 1);
  return firstLetter.toUpperCase() + this.substr(1);
};
String.prototype.timeToMill = function () {
  var timerArr = this.split(":");
  var h = parseInt(timerArr[0]);
  var m = parseInt(timerArr[1]);
  var s = parseInt(timerArr[2]);
  return (s + m * 60 + h * 60 * 60) * 1000;
};
String.prototype.splice = function (idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};
String.prototype.formatedMilliseconds = function () {
  var s = parseInt(this);
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;
  return {
    hms:
      hrs.toString().zeroPad(2) +
      ":" +
      mins.toString().zeroPad(2) +
      ":" +
      secs.toString().zeroPad(2),
    ms: ms.toString().zeroPad(3),
    sec: secs,
  };
};
String.prototype.zeroPad = function (max) {
  return this.length < max ? ("0" + this).zeroPad(max) : this;
};
Math.getRandomArbitrary = function (min, max) {
  var key;
  if (window.crypto) {
    if (window.crypto.getRandomValues !== undefined) {
      var randomBuffer = new Uint32Array(1);
      window.crypto.getRandomValues(randomBuffer);
      key = randomBuffer[0] / (0xffffffff + 1);
    } else {
      key = Math.random();
    }
  } else {
    key = Math.random();
  }
  if (min === undefined && max === undefined) return key;
  var isInteger = Math.floor(min) === min && Math.floor(max) === max;
  var float = key * (max - min) + min;
  var integer = Math.floor(key * (max - min + 1)) + min;
  return isInteger ? integer : float;
};
Array.prototype.shuffle = function () {
  var i = this.length,
    j,
    temp;
  if (i === 0) return this;
  while (--i) {
    j = Math.getRandomArbitrary(0, i);
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
};
Array.prototype.clone = function () {
  return this.slice(0);
};
