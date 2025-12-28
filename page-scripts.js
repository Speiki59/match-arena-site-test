document.addEventListener("DOMContentLoaded", () => {
  // focus name field on model open
  document.querySelector(".self_book_btn").addEventListener("click", () => {
    setTimeout(() => {
      document.querySelector("input[name=name]").focus();
    }, 500);
  });
  //
  const phone_input = document.getElementById("phone_number");
  IMask(phone_input, {
    mask: "+{7}(000)00-000-00",
    lazy: false,
  });
  const agreement = document.getElementById("agreement");
  const submit = document.querySelector(".submit_btn");
  agreement.addEventListener("change", e => {
    if (agreement.checked) {
      submit.disabled = false;
      submit.classList.remove("_dis");
    } else {
      submit.disabled = true;
      submit.classList.add("_dis");
    }
  });
  const form = document.getElementById("booking_form");
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!phone_input.value.match(/[\+]7[(][0-9]{3}[)][0-9]{2}-[0-9]{3}-[0-9]{2}/gm)) {
      phone_input.focus();
    } else {
      const formData = new FormData(form);
      formData.append(
        "city",
        window.location.href.split("/").pop().split(".").shift().split('#')[0] === "prm"
          ? "Пермь"
          : "Екатеринбург"
      );
      const response = await fetch("send.php", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        if (result.code == "1") {
          form.reset();
          window.location.href = window.location.href.split("#")[0] + "#success";
        } else {
          window.location.href = window.location.href.split("#")[0] + "#error";
        }
      }
    }
  });

  // Выбор города

  const currentCity = document.querySelector(".city​-selection");
  currentCity.innerHTML =
    window.location.href.split("/").pop().split(".").shift() === "prm" ? "Пермь" : "Екатеринбург";

  // Анимация скрола

  const animated = Array.from(document.querySelectorAll(".anim"));

  animated.forEach(el => {
    var observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting === true) {
          entries[0].target.classList.add("animated_in");
        }
      },
      { threshold: [0.1] }
    );

    observer.observe(el);
  });
});
