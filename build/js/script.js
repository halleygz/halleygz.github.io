document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault();
  let params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_ikivhll";
  const templateID = "template_zms5wvl";

  emailjs.init("V7Eu9xodbdUGFl_pA");
  emailjs.send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
      console.log(res);
      alert("Your message was sent successfully");
    })
    .catch((err) => console.log(err));
});