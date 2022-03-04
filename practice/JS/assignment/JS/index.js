"use strict"

let task_list = document.getElementsByClassName("task_list")[0];
let task_add = document.getElementsByClassName("task_add")[0];
let task_name = document.getElementsByClassName("task_name")[0];
task_name.addEventListener("keydown", function (e) {
  // enter 的 ASCII Code 碼
  if (e.which === 13) {
    task_add.click();
  }
});
// console.log(task_add);
task_add.addEventListener("click", function () {
  let task_text = task_name.value.trim();
  // localStorage.setItem('task_text', task_text);
  // console.log(task_text);
  // 儲存到 localStorage
  let item_id = Date.now(); // timestamp 當做該項的 id
  if (task_text != "") {
    let list_html = `
                <li data-id = "${item_id}"">
                <div class="item_flex">
                    <div class="left_block">
                    <div class="btn_flex">
                        <button type="button" class="btn_up">往上</button>
                        <button type="button" class="btn_down">往下</button>
                    </div>
                    </div>
                    <div class="middle_block">
                    <div class="star_block">
                        <span class="star" data-star="1"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="2"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="3"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="4"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="5"><i class="fas fa-star"></i></span>
                    </div>
                    <p class="para">`+ task_text + `</p>
                    </div>
                    <div class="right_block">
                    <div class="btn_flex">
                        <button type="button" class="btn_update">更新</button>
                        <button type="button" class="btn_delete">移除</button>
                    </div>
                    </div>
                </div>
                </li>
                `
    task_list.insertAdjacentHTML("afterbegin", list_html);

    document.getElementsByClassName("task_name")[0].value = "";

    let task = {
      "item_id": item_id,
      "name": task_text, // 新增的待辦事項文字
      "star": 0 // 預設 0
    };
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) { // 若存在
      tasks.unshift(task);
    } else { // 若不存在
      tasks = [task];
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));

  }

});


function get_tasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  // console.log(tasks);
  if (tasks != null) {
    let list_html = "";
    for (let i = 0; i < tasks.length; i++) {
      // console.log(tasks);
      list_html += `
                <li data-id = "${tasks[i].item_id}"">
                  <div class="item_flex">
                    <div class="left_block">
                    <div class="btn_flex">
                        <button type="button" class="btn_up">往上</button>
                        <button type="button" class="btn_down">往下</button>
                    </div>
                    </div>
                    <div class="middle_block">
                    <div class="star_block">
                        <span class="star" data-star="1"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="2"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="3"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="4"><i class="fas fa-star"></i></span>
                        <span class="star" data-star="5"><i class="fas fa-star"></i></span>
                    </div>
                    <p class="para">`+ tasks[i].name + `</p>
                    </div>
                    <div class="right_block">
                    <div class="btn_flex">
                        <button type="button" class="btn_update">更新</button>
                        <button type="button" class="btn_delete">移除</button>
                    </div>
                    </div>
                  </div>
                </li>
                `
    }
    // let task_list = document.getElementsByClassName("task_list")[0];
    task_list.innerHTML = list_html;
    // task_list.insertAdjacentHTML("afterbegin", list_html);

  }
}

document.addEventListener("DOMContentLoaded", function () {

  get_tasks(); // DOMContentLoaded 事件發生時，執行這裡的程式

});

document.addEventListener("click", function (e) {
  let btn_delete = e.target.classList.contains("btn_delete");
  let closest_li = e.target.closest("li");
  closest_li.style.opacity = 1;
  if (btn_delete) {
    let r = confirm("確認移除？");
    if (r) {
      let interval_id = setInterval(function () {
        if (closest_li.style.opacity <= 0) {
          clearInterval(interval_id);
          closest_li.remove();
        } else {
          closest_li.style.opacity -= .1;
        }
      }, 100);
    }

    // if (r) {
    //   // 從localstorage移除資料
    //   let item_id = e.target.closest("li").getAttribute("data-id");
    //   let tasks = JSON.parse(localStorage.getItem("tasks"));
    //   let updated_tasks = [];

    //   tasks.forEach(function (task, i) {
    //     if(item_id != task.item_id){
    //       updated_tasks.push(task);
    //     }
    //   });

    //   // 回存至 localStorage
    //   localStorage.setItem("tasks", JSON.stringify(updated_tasks));
    // }
  }
});
