export function setUserData(userData) {
  localStorage.setItem("userData", JSON.stringify(userData));
}
export function getUserData() {
  return JSON.parse(localStorage.getItem("userData"));
}
export function clearUserData() {
  localStorage.removeItem("userData");
}

// export function addSubmitListener(form, callback) {
//   form.addEventListener("submit", onSubmit);

//   function onSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(form);
//     const data = Object.fromEntries(formData.entries());
//     callback(data);
//   }
// }

export function createSubmitHandler(callback) {
  return function (event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    callback(data, form)
  }
}
