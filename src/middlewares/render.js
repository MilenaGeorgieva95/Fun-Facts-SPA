import { render } from '../../node_modules/lit-html/lit-html.js'
import { navTemplate } from '../views/nav.js';
import { getUserData } from '../views/utils.js';
const root = document.querySelector('nav')

export function addRenderer(ctx, next) {
    const user = getUserData();
    if (user != null) {
        render(navTemplate(true), root)
    } else {
        render(navTemplate(false), root)
    }
    const container = document.querySelector('main')
    ctx.show = (html) => container.innerHTML = html
    ctx.render = (content) => render(content, container)
    next()
}