document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburger-button");
  const mobileMenu = document.getElementById("mobile-menu");

  const toggleMenu = () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex");
    hamburgerBtn.classList.toggle("toggle-btn");
  };

  hamburgerBtn.addEventListener("click", toggleMenu);

  mobileMenu.addEventListener("click", toggleMenu);
});
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var params = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    const serviceID = "service_ikivhll";
    const templateID = "template_zms5wvl";

    emailjs.init("V7Eu9xodbdUGFl_pA")
    emailjs
      .send(serviceID, templateID, params)
      .then((res) => {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
        console.log(res);
        alert("Your message was sent successfully");
      })
      .catch((err) => console.log(err));
  });
