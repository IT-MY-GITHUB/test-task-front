const onDomLoaded = () => {
  const form = document.getElementById("taskForm");
  const inputNodeList = getInputElementsFromForm(form);
  restoreProgressFromStorage(inputNodeList);
  handleTaskProgress();
  form.addEventListener("change", () => {
    saveProgressToStorage(inputNodeList);
    handleTaskProgress();
  });
};

/**
 * @param {Node} form
 * @return {NodeList}
 */
const getInputElementsFromForm = (form) => {
  return form.querySelectorAll('input[type="checkbox"]');
};

/**
 * @param {NodeList} inputNodeList
 */
const saveProgressToStorage = (inputNodeList) => {
  const progressData = [].map.call(inputNodeList, (node) => node.checked);
  localStorage.setItem("progress", JSON.stringify(progressData));
};

/**
 * @param {NodeList} inputNodeList
 */
const restoreProgressFromStorage = (inputNodeList) => {
  const progressData = JSON.parse(localStorage.getItem("progress")) || [];
  if (progressData.length === inputNodeList.length) {
    progressData.forEach((isChecked, id) => {
      inputNodeList[id].checked = isChecked;
    });
  }
};

/**
 * Displays a message if the process is complete
 */
const handleTaskProgress = () => {
  const progressData = JSON.parse(localStorage.getItem("progress")) || [];
  const progress = progressData.filter((bool) => bool);
  document.getElementById("taskDone").textContent =
    progressData.length && progressData.length === progress.length
      ? "Готово? Чего же вы ждёте? Скорее отправляйте нам результат! Удачи:)"
      : "";
};

document.addEventListener("DOMContentLoaded", onDomLoaded);

// Ajax. TEST TASK
jQuery(document).ready(function ($) {
  $(".task-form").submit(function () {
    var str = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "https://httpbin.org/post",
      data: str,
      success: function (msg) {
        if (msg) {
          alert(
            `Отправка выполнена удачна. Ответ от сервиса \"httpbin.org\": ${JSON.stringify(
              msg.form
            )}`
          );
        }
      },
    });
    return false;
  });
});
