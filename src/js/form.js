document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("js-contact-form");
  const formError = document.getElementById("js-form-error");
  const agreeError = document.getElementById("js-agree-error");

  function clearFieldError(el) {
    el.classList.remove("is-error");
  }

  document.querySelectorAll(".js-required").forEach(el => {
    el.addEventListener("input", () => clearFieldError(el));
  });

  document.querySelectorAll(".js-required-checkbox input").forEach(el => {
    el.addEventListener("change", () => {
      document.querySelector(".js-required-checkbox").classList.remove("is-error");
    });
  });

  document.getElementById("agree").addEventListener("change", () => {
    agreeError.style.display = "none";
  });

  form.addEventListener("submit", function(e) {
    e.preventDefault(); // ← 最初に止める

    let hasError = false;
    formError.style.display = "none";
    agreeError.style.display = "none";

    document.querySelectorAll(".js-required").forEach(el => {
      if (!el.value.trim()) {
        el.classList.add("is-error");
        hasError = true;
      }
    });

    const group = document.querySelector(".js-required-checkbox");
    if (group.querySelectorAll("input:checked").length === 0) {
      group.classList.add("is-error");
      hasError = true;
    }

    const agree = document.getElementById("agree");
    let agreeInvalid = !agree.checked;

    if (hasError) {
      formError.style.display = "block";
      formError.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if(agreeInvalid) {
      agreeError.style.display = "block";
      agreeError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if(hasError || agreeInvalid) return;

    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://docs.google.com/forms/d/e/1FAIpQLSd3Io0pWgvGfZJ9t0GTmO_ttyXDIDRrnJ4CTk1HNjN8XL7zKQ/formResponse', true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) { // 4はリクエスト完了を意味します
            window.location.href = "thanks.html";

            // 以下の行でフォームの入力をリセットします
            form.reset();
        }
    };

    xhr.send(formData);
  });
});