import { html } from '../../node_modules/lit-html/lit-html.js'
import { createFact } from '../api/data.js'
import { createSubmitHandler } from './utils.js'

const createTemplate = (onSubmit) => html`
<section id="create">
  <div class="form">
    <h2>Add Fact</h2>
    <form @submit=${onSubmit} class="create-form">
      <input type="text" name="category" id="category" placeholder="Category"/>
      <input type="text" name="image-url" id="image-url" placeholder="Image URL"/>
      <textarea id="description" name="description" placeholder="Description" rows="10" cols="50"></textarea>
      <textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="10" cols="50"></textarea>
      <button type="submit">Add Fact</button>
    </form>
  </div>
</section>`

export async function createPage(ctx) {
  ctx.render(createTemplate(createSubmitHandler(onCreate)))

  async function onCreate(data) {
    if (Object.values(data).some(value => value == '')) {
      return alert('All fields are required!')
    }
    const { category, ['image-url']: imageUrl, description, ['additional-info']: moreInfo } = data;
    await createFact({ category, imageUrl, description, moreInfo });
    ctx.page.redirect('/dashboard')
  }
}