import { registerUser } from "../api/auth.js";
import { createSubmitHandler } from "./utils.js";
import { html } from '../../node_modules/lit-html/lit-html.js'

const registerTemplate = (onSubmit) => html`
<section id="register">
  <div class="form">
    <h2>Register</h2>
    <form  @submit=${onSubmit} class="register-form">
      <input type="text" name="email" id="register-email" placeholder="email"/>
      <input type="password" name="password" id="register-password" placeholder="password"/>
      <input type="password" name="re-password" id="repeat-password" placeholder="repeat password"/>
      <button type="submit">register</button>
      <p class="message">Already registered? <a href="/login">Login</a></p>
    </form>
  </div>
</section>`

export function registerPage(ctx) {
  ctx.render(registerTemplate(createSubmitHandler(onRegister)))

  async function onRegister({ email, password, ["re-password"]: repass }) {
    if (!email || !password) {
      return alert('All fields are required!')
    }
    if (password != repass) {
      return alert("Passwords don't match!")
    }

    await registerUser(email, password);
    ctx.page.redirect('/');
  }
}
