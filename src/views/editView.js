import { html } from '../../node_modules/lit-html/lit-html.js'
import { editFact, getFactById } from '../api/data.js';
import { createSubmitHandler } from './utils.js'

const editTemplate = (onSubmit, data) => html`
<section id="edit">
  <div class="form">
    <h2>Edit Fact</h2>
    <form @submit=${onSubmit} class="edit-form"> 
       <input .value=${data.category} type="text" name="category" id="category" placeholder="Category"/>
       <input .value=${data.imageUrl} type="text" name="image-url" id="image-url" placeholder="Image URL"/>
       <textarea .value=${data.description} id="description" name="description" placeholder="Description" rows="10" cols="50"></textarea>
       <textarea .value=${data.moreInfo} id="additional-info" name="additional-info" placeholder="Additional Info" rows="10" cols="50"></textarea>
       <button type="submit">Post</button>
    </form>
  </div>
</section>`

export async function editPage(ctx) {
    const factId = ctx.params.id;
    const factData = await getFactById(factId)
    ctx.render(editTemplate(createSubmitHandler(onEdit), factData));

    async function onEdit(data) {
        if (Object.values(data).some(value => value == '')) {
            return alert('All fields are required!')
        }
        const { category, ['image-url']: imageUrl, description, ['additional-info']: moreInfo } = data
        await editFact(factId, { category, imageUrl, description, moreInfo });
        ctx.page.redirect(`/details/${factId}`)
    }
}