import axios from "axios";

export async function getNotesApi(search = "") {
    return (await apiTemplate(`/notes/?search=${search}`, "GET")).data;
}

export async function getNoteApi(id) {
    return await apiTemplate(`/notes/${id}/`, "GET").catch(() => ({
        status: 404,
    }));
}

export async function saveNoteApi(data) {
    return (await apiTemplate("/notes/", "POST", data)).data;
}

export async function updateNoteApi(id, data) {
    return (await apiTemplate(`/notes/${id}/`, "PATCH", data)).data;
}

export async function deleteNoteApi(id) {
    await apiTemplate(`/notes/${id}/`, "DELETE");
}

async function apiTemplate(url, method, data = {}) {
    const response = await axios({
        method: method,
        url: process.env.REACT_APP_NOTES_APP_BASE_API_URL + url,
        data: data,
    });
    return response;
}
