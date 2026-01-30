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
  const enableFiltre = searchFaqStr.trim() != "";
  if (faq) {
    faq.innerHTML = "";
    faqQuestions.forEach((faqItem) => {
      let item = { ...faqItem };
      // filtre les questions / réponses en fonction des termes rechercés
      if (enableFiltre) {
        if (
          !item.question.toLowerCase().includes(searchFaqStr.toLowerCase()) &&
          !item.answer.toLowerCase().includes(searchFaqStr.toLowerCase())
        ) {
          return; // ignore cette itération si ca ne match pas
        }
      }

      if (enableFiltre) {
        const escaped = searchFaqStr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`(${escaped})`, "gi");
        item.question = item.question.replace(regex, "<mark>$1</mark>");
        item.answer = item.answer.replace(regex, "<mark>$1</mark>");
      }

      const div = document.createElement("div");
      div.classList.add("faq-item");
      div.innerHTML = `
            <button
              aria-label="${item.question}"
              type="button"
              class="faq-button ${enableFiltre ? "" : "collapsed"}"
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
