"use strict"

let task_list = document.getElementsByClassName("task_list")[0];
let task_add = document.getElementsByClassName("task_add")[0];
let task_name = document.getElementsByClassName("task_name")[0];

// 點擊enter鍵也可以輸入待辦項目
task_name.addEventListener("keydown", function (e) {
  // enter 的 ASCII Code 碼
  if (e.which === 13) {
    task_add.click();
  }
});
// console.log(task_add);

// 當點擊新增時把項目新增進去
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
                    <input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${task_text}">
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

    // 為抓取資料而命名
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
    // 儲存到資料庫
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
                      <input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${tasks[i].name}">
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

// 綁定移除鍵
document.addEventListener("click", function (e) {
  let btn_delete = e.target.classList.contains("btn_delete");
  let closest_li = e.target.closest("li");
  if (btn_delete) {
    let r = confirm("確認移除？");
    if (r) {
      // 從localstorage移除資料
      let item_id = closest_li.getAttribute("data-id");
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      // 準備用來放要存到 localStorage 裡的資料
      let updated_tasks = [];

      tasks.forEach(function (task, i) {
        if (item_id != task.item_id) {
          updated_tasks.push(task);
        }
      });

      // 回存至 localStorage
      localStorage.setItem("tasks", JSON.stringify(updated_tasks));

      closest_li.classList.add("fade_out");
      setTimeout(function () {
        closest_li.remove();
      }, 1000);
    }
  }
});

// 清空鍵
let btn_empty = document.getElementsByClassName("btn_empty")[0];
btn_empty.addEventListener("click", function () {
  if (btn_empty) {
    let e = confirm("確認清空？");
    if (e) {

      localStorage.clear();

      let task_list_lis = task_list.querySelectorAll("li");
      console.log(task_list_lis);
      for (let i = 0; i < task_list_lis.length; i++) {
        task_list_lis[i].classList.add("fade_out");
      }
      setTimeout(function () {
        task_list_lis.forEach(function (task_list_li, i) {
          task_list_li.remove();
        });
      }, 1000);
    }
  }
});

// 更新鍵
document.addEventListener("click", function (e) {
  let btn_update = e.target.classList.contains("btn_update");
  let task_list_li = e.target.closest("li");
  let task_name_update = task_list_li.querySelector("input.task_name_update");
  let p_el = task_list_li.querySelector("p.para");

  if (btn_update) {
    // 原本都是未定義屬性，當點擊更新後，增加屬性 true
    // 點擊更新後切換class: -none
    if (e.target.getAttribute("data-edit") == undefined) {
      e.target.setAttribute("data-edit", true);
      p_el.classList.toggle("-none");
      task_name_update.classList.toggle("-none");
    } else { 
      let update_task_text = (task_name_update.value).trim();
      if (update_task_text == "") {
        alert("請輸入待辦事項");
      } else {
        p_el.innerHTML = update_task_text;
        p_el.classList.toggle("-none");

        task_name_update.value = update_task_text;
        task_name_update.classList.toggle("-none");

        e.target.removeAttribute("data-edit");
        // 更新 localStorage 中，name 欄位的資料 //
        let item_id = task_list_li.getAttribute("data-id");
        // 取得 localStorage 內的內容
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.forEach(function (task, i) {
          if (item_id == task.item_id) {
            tasks[i].name = update_task_text;
          }
        });
        // 更新 localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    }
  }
});

// 排序(往上)
document.addEventListener("click", function (e) {
  let task_list_li_up = e.target.closest("li");
  let task_list_li_down = task_list_li_up.previousElementSibling;
  // console.log(task_list_li_up);
  // console.log(task_list_li_down);
  let btn_up = e.target.classList.contains("btn_up");
  let task_list_li_null = "";
  console.log(task_list_li_null);
  task_list_li_null = task_list_li_up;
  task_list_li_up = task_list_li_down;
  task_list_li_down = task_list_li_null;
});
