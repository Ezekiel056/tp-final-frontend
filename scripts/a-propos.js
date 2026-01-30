import { faqQuestions } from "./faq-questions.js";

const btnSendMessage = document.getElementById("btn-send-message");
const formContact = document.getElementById("contact-form");
const faqSearchInput = document.getElementById("faq-search-input");

let searchFaqStr = "";

main();

function main() {
  showQuestions();
}

function showQuestions() {
  const faq = document.querySelector(".faq-container");
  if (faq) {
    faq.innerHTML = "";
    faqQuestions.forEach((item) => {
      if (searchFaqStr.trim() != "") {
        if (!item.question.toLowerCase().includes(searchFaqStr.toLowerCase())) {
          console.log(searchFaqStr.trim());
          return;
        }
      }
      console.log("ok");
      const div = document.createElement("div");
      div.classList.add("faq-item");
      div.innerHTML = `
            <button
              aria-label="${item.question}"
              type="button"
              class="faq-button collapsed"
            >
              <span>${item.question}</span>
            </button>
            <div class="faq-response">
              <p>${item.answer}</p>
            </div>
      `;
      faq.appendChild(div);
    });

    document.querySelectorAll(".faq-button").forEach((elem) => {
      elem.addEventListener("click", () => {
        elem.classList.toggle("collapsed");
      });
    });
  }
}

function checkContactForm() {
  let validForm = true;
  if (!formContact) {
    throw new Error("Unable to find formContact");
  }

  const data = new FormData(formContact);
  for (const elem of formContact) {
    if (elem.getAttribute("required") == "") {
      checkInput(elem.name, elem.id);
    }
  }

  return validForm;

  /*****************************************
   ******* Internal functions
   *****************************************/

  function checkInput(name, id) {
    document.getElementById(id).classList.remove("required");
    if (!validData(name)) {
      validForm = false;
      showRequiered(id);
    }
  }

  function validData(name) {
    let value = data.get(name);
    if ([null, undefined, ""].includes(value?.trim())) return false;

    switch (name) {
      case "message":
        return value.length > 100;
      case "email":
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
    }
    return true;
  }

  function showRequiered(id) {
    const e = document.getElementById(id);
    if (e) {
      e.classList.add("required");
    }
  }
}

function sendMessage() {
  if (!formContact) {
    return false;
  }

  return true;
}

/*****************************************
 ******* Events Listeners
 *****************************************/

btnSendMessage.addEventListener("click", (e) => {
  e.preventDefault();
  if (checkContactForm()) {
    if (sendMessage()) {
      alert("Votre message a bien été envoyé ");
      formContact.reset();
    }
  }
});

faqSearchInput.addEventListener("input", () => {
  searchFaqStr = faqSearchInput.value;
  showQuestions();
});
