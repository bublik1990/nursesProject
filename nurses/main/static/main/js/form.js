// send form with personal information

const questionnaireForm = document.querySelector("#questionnaire__form");
const popupCloseButton = document.querySelector(".popup__button");
const backdrop = document.querySelector(".backdrop");
const addEducationEl = document.querySelector(".form__add-education");
const extraEducationContainer = document.querySelector(
  ".extra__education-form"
);

questionnaireForm.addEventListener("submit", sendForm);
addEducationEl.addEventListener("click", addEducation);
let popupTimer;
let formId = 1;

function sendForm(e) {
  e.preventDefault();
  clearQuestionnaireFormErrorMessages();

  // console.log($(this).serialize());
  $.ajax({
    type: "POST",
    data: $(this).serialize(),
    url: "",
    success: function (response) {
      console.log("success");
      questionnaireForm.reset();
      openPopupWindow();
      popupTimer = setTimeout(closePopupWindow, 3000);
    },
    error: function (response) {
      console.log("error");
      const errors = response.responseJSON.errors;
      const formset_errors = response.responseJSON.formset_errors;
      // console.log(errors, formset_errors);

      appendQuestionnaireFormErrorMessages(errors);
      appendEducationFormSetErrorMessages(formset_errors);
    },
  });
}

function openPopupWindow() {
  backdrop.classList.remove("is-hidden");
  popupCloseButton.addEventListener("click", closePopupWindow);
  backdrop.addEventListener("click", closePopupWindow);
}

function closePopupWindow() {
  backdrop.classList.add("is-hidden");
  popupCloseButton.removeEventListener("click", closePopupWindow);
  backdrop.removeEventListener("click", closePopupWindow);
  if (popupTimer) {
    clearTimeout(popupTimer);
  }
}

function clearQuestionnaireFormErrorMessages() {
  const errorMessages = document.querySelectorAll(
    "#questionnaire__form .errors"
  );

  for (const message of errorMessages) {
    message.innerHTML = "";
  }
}

function appendQuestionnaireFormErrorMessages(errors) {
  for (key in errors) {
    const errorMessagesEl = document.querySelector(
      `label[for="id_${key}"] .errors`
    );

    for (const error of errors[key]) {
      let li = document.createElement("li");
      li.append(error);
      errorMessagesEl.append(li);
    }
  }
}

function appendEducationFormSetErrorMessages(errors) {
  console.log(errors);
  for (let i = 0; i < errors.length; i += 1) {
    const formErrors = errors[i];
    for (const field in formErrors) {
      let errorMessagesEl = document.querySelector(
        `label[for="id_form-${i}-${field}"] .errors`
      );

      for (const error of formErrors[field]) {
        let li = document.createElement("li");
        li.append(error);
        errorMessagesEl.append(li);
      }
    }
  }
}

function addEducation(event) {
  if (event) {
    event.preventDefault();
  }
  increaseTotalFormsCount();
  const formCount = document.getElementById("id_form-TOTAL_FORMS").value;
  if (formCount > 3) {
    addEducationEl.classList.add("is-hidden");
  }

  emptyFormClone = makeNewFormFromEmpty();
  addEducationForm(emptyFormClone);
}

function makeNewFormFromEmpty() {
  const emptyFormClone = document
    .querySelector("#empty-form .form__education")
    .cloneNode(true);
  const regex = new RegExp("__prefix__", "g");
  emptyFormClone.innerHTML = emptyFormClone.innerHTML.replace(regex, formId);
  emptyFormClone.setAttribute("id", `id-form-${formId}`);
  let closeButton = document.createElement("button");
  closeButton.textContent = String.fromCharCode(0x2715); //"U+00D7";
  closeButton.setAttribute("class", "delete-educationform");
  closeButton.setAttribute("type", "button");
  closeButton.setAttribute("value", `id-form-${formId}`);
  closeButton.addEventListener("click", deleteCurrentEducationForm);
  emptyFormClone.append(closeButton);
  formId++;
  return emptyFormClone;
}

function addEducationForm(newForm) {
  extraEducationContainer.append(newForm);
}

function increaseTotalFormsCount() {
  const totalFormsCount = document.getElementById("id_form-TOTAL_FORMS");
  totalFormsCount.value = +totalFormsCount.value + 1;
  return totalFormsCount.value;
}

function decreaseTotalFormsCount() {
  const totalFormsCount = document.getElementById("id_form-TOTAL_FORMS");
  totalFormsCount.value = +totalFormsCount.value - 1;
}

function deleteCurrentEducationForm(event) {
  if (event) {
    event.preventDefault();
  }

  const formToDelete = document.getElementById(this.value);
  formToDelete.remove();
  this.removeEventListener("click", deleteCurrentEducationForm);
  decreaseTotalFormsCount();
  const formCount = document.getElementById("id_form-TOTAL_FORMS").value;
  if (formCount < 4) {
    addEducationEl.classList.remove("is-hidden");
  }
}
