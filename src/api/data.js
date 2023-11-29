import { get, post, put, del } from "./api.js";

const endpoints = {
  allFacts: "/data/facts?sortBy=_createdOn%20desc",
  facts: "/data/facts/",
  likes: '/data/likes',
  fact: '/data/facts'

};

export function getAllFacts() {
  return get(endpoints.allFacts);
}
export function getFactById(id) {
  return get(`${endpoints.facts}${id}`)
}
export function deleteFactById(id) {
  return del(`${endpoints.facts}${id}`)
}
export function likeFact(factId) {
  return post(endpoints.likes, { factId });
}
export function getIsLiked(factId, userId) {
  return get(`${endpoints.likes}?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}
export function getAllLikes(factId) {
  return get(`${endpoints.likes}?where=factId%3D%22${factId}%22&distinct=_ownerId&count`);
}
export function createFact(data) {
  return post(endpoints.fact, data)
}
export function editFact(id, data) {
  return put(`${endpoints.facts}${id}`, data)
}


export function getAllMembersInTeam(teamId) {
  return get(`/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`)
}


export function getAllJoinedTeams(userId) {
  return get(`/data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`)
}

export function cancelRemoveMember(memberId) {
  return del(`/data/members/${memberId}`)
}
export function approveMember(memberId) {
  return put(`/data/members/${memberId}`, { status: 'member' })
}

export function removeMember(memberId) {
  return del(`/data/members/${memberId}`)
}
