"use strict";

// 平均數函式練習
function avg(my_arr) {
    var sum = 0;
    for (var i = 0; i < my_arr.length; i++) {
        // sum = sum + my_arr[i];
        sum += my_arr[i];
    }
    var avg = sum / my_arr.length;
    return (avg);
}



function id(arr) {
    for (let i = 0; i < arr.length; i++) {

        if (!line_ids_unique.includes(arr[i])) {
            line_ids_unique.push(arr[i]);
        }
    }
    return (line_ids_unique);
}