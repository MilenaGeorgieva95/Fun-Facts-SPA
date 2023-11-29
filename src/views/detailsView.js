import { html } from '../../node_modules/lit-html/lit-html.js'
import { deleteFactById, getAllLikes, getFactById, getIsLiked as getIsLiked, likeFact } from '../api/data.js';
import { getUserData } from './utils.js'

const detailsTemplate = (data, onDelete, onLike) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${data.imageUrl} alt="example1" />
        <p id="details-category">${data.category}</p>
        <div id="info-wrapper">
            <div id="details-description">
                <p id="description">${data.description}</p>
                <p id ="more-info">${data.moreInfo}</p>
            </div>

            <h3>Likes:<span id="likes">${data.likes}</span></h3>

            <div id="action-buttons">
            ${data.control == 'owner' ? html`<a href="/edit/${data._id}" id="edit-btn">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : null}
            ${data.control == 'user' && !data.liked ? html`<a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>` : null}
            </div>
        </div>
    </div>
<section>`

export async function detailsPage(ctx) {
    const factId = ctx.params.id;
    const user = getUserData();

    let promises = [getFactById(factId), getAllLikes(factId)];
    if (user) {
        promises.push(getIsLiked(factId, user._id))
    }
    const [factData, totalLikes, isLiked] = await Promise.all(promises);
    factData.likes = totalLikes;
    factData.liked = !!isLiked;

    if (!user) {
        factData.control = 'guest'
    }
    if (user && user._id === factData._ownerId) {
        factData.control = 'owner'
    }
    if (user && user._id !== factData._ownerId) {
        factData.control = 'user'
    }
    ctx.render(detailsTemplate(factData, onDelete, onLike))

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete the fact?');
        if (choice) {
            await deleteFactById(factId);
            ctx.page.redirect('/dashboard')
        }
    }

    async function onLike() {
        await likeFact(factId);
        factData.liked = true;
        factData.likes++;
        ctx.render(detailsTemplate(factData, onDelete, onLike));

    }
}

