import { getUserData } from "../views/utils.js";
import { approveMember, cancelRemoveMember, getMemberById, joinTeam, removeMember } from "./data.js";

export async function join(ctx) {
    const teamId = ctx.params.teamId
    const joining = await joinTeam(teamId);
    ctx.page.redirect(`/browse/${teamId}`)
}
export async function leaveCancel(ctx) {
    const teamId = ctx.params.teamId
    const memberId = ctx.params.memberId
    const user = getUserData();
    const leaved = await cancelRemoveMember(memberId)
    ctx.page.redirect(`/browse/${teamId}`)
}

export async function approve(ctx) {
    const teamId = ctx.params.teamId
    const memberId = ctx.params.memberId
    const memberDetails = await getMemberById(memberId)
    memberDetails.status = 'member'
    const approved = await approveMember(memberId, memberDetails)
    ctx.page.redirect(`/browse/${teamId}`)
}

export async function remove(ctx) {
    const teamId = ctx.params.teamId
    const memberId = ctx.params.memberId
    const removed = await removeMember(memberId);
    ctx.page.redirect(`/browse/${teamId}`)
}