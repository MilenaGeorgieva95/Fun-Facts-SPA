import { loginUser } from "../api/auth.js";
import { createSubmitHandler } from "./utils.js";
import { html } from '../../node_modules/lit-html/lit-html.js'

const loginTemplate = (onSubmit) => html`
<section id="login">
    <div class="form">
      <h2>Login</h2>
      <form @submit=${onSubmit} class="login-form">
        <input type="text" name="email" id="email" placeholder="email" />
        <input type="password" name="password" id="password" placeholder="password"/>
        <button type="submit">login</button>
        <p class="message">
          Not registered? <a href="/register">Create an account</a>
        </p>
      </form>
    </div>
</section>`

export function loginPage(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(onLogin)))

    async function onLogin({ email, password }) {
        let error = ''
        if (!email || !password) {
            error = 'All fields are required!';
        }
        if (error) {
            ctx.render(loginTemplate(createSubmitHandler(onLogin), error));
            return
        }
        await loginUser(email, password);
        ctx.page.redirect('/');
    }
}
