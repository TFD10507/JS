// --------寫一個函式，將指定文字左邊補零------------

function str_pad(my_num, digits){
  
  var my_num_str = my_num.toString(); // "7"
  while(my_num_str.length < digits){ // 3 < 3
    my_num_str = "0" + my_num_str; // "007"
  }
  
  return my_num_str; // "007"
}

//var result = str_pad(9, 2);
//console.log(result);  // "09"


var result2 = str_pad(7, 3);
//console.log(result2);  // "007"




// ----------------------使用遞迴，費氏數列------------------
var i = 0;
function fibonacci(n){
  if(n < 0){
    return;
  }

  i++; // 1
  if(n == 0){
    return 0;
  }
  if(n == 1){
    return 1;
  }
  return fibonacci(n - 2) + fibonacci(n - 1); // 0 + 1
}


console.log( fibonacci(2) + "。fibonacci 函式執行了 " + i + " 次" );




//------------在 console 中輸出的結果是差「幾」天： ----------
function DateDiff(date1, date2) {

  var date1_obj = new Date(date1);
  var date2_obj = new Date(date2);
  //console.log(date1_obj.getTime() - date2_obj.getTime())

  // 把相差的毫秒數轉換為天數
  var days_diff = parseInt( Math.abs( date1_obj.getTime() - date2_obj.getTime() ) / 1000 / 60 / 60 / 24 );
  return days_diff;
}

console.log( DateDiff("2019-12-31", "2020-01-02") );
//console.log( DateDiff("2019-12-30", "2020-01-03") );
//console.log( DateDiff("2019-12-30", "2019-12-30") );



// ----------------------cookie------------------------

// 設定 cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  // 取得 cookie 的值
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  // 檢查某 cookie 是否存在
  function checkCookie(cname) {
    var cookie_value = getCookie(cname);
    if (cookie_value != "") {
      return true;
    } else {
      return false;
    }
  }