import { API_URL } from "./configApi";

export async function getParticipants() {

    try {

        const response = await fetch(`${API_URL}/participants`);
        if (!response.ok) throw new Error("Erro ao buscar participantes");

        const data = await response.json();

        return { data, error: null };

    } catch (error) {

        return { data: [], error: error.message };

    }
}

export async function getParedao() {

    try {

        const response = await fetch(`${API_URL}/participants?emParedao=true`);
        if (!response.ok) throw new Error("Erro ao buscar paredão");

        const data = await response.json();

        return { data, error: null };

    } catch (error) {

        return { data: [], error: error.message };

    }
}

export async function createParticipant(participant) {

    try {

        const response = await fetch(`${API_URL}/participants`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(participant)
        });

        if (!response.ok) throw new Error("Erro ao criar participante");

        return { data: await response.json(), error: null };

    } catch (error) {

        return { data: null, error: error.message };

    }
}

export async function updateParticipant(id, participant) {

    try {

        const response = await fetch(`${API_URL}/participants/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(participant)
        });

        if (!response.ok) throw new Error("Erro ao atualizar participante");

        return { data: await response.json(), error: null };

    } catch (error) {

        return { data: null, error: error.message };

    }
}

export async function deleteParticipant(id) {

    try {

        const response = await fetch(`${API_URL}/participants/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Erro ao eliminar participante");

        return { error: null };

    } catch (error) {

        return { error: error.message };

    }
}

export async function toggleParedao(participant) {

    try {

        const updated = {
            ...participant,
            emParedao: !participant.emParedao,
            votes: !participant.emParedao ? 0 : participant.votes
        };

        const response = await fetch(`${API_URL}/participants/${participant.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updated)
        });

        if (!response.ok) throw new Error("Erro ao atualizar paredão");

        return { data: await response.json(), error: null };

    } catch (error) {

        return { data: null, error: error.message };

    }
}

export async function voteParticipant(participant) {

    try {

        const updated = {
            ...participant,
            votes: participant.votes + 1
        };

        const response = await fetch(`${API_URL}/participants/${participant.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updated)
        });

        if (!response.ok) throw new Error("Erro ao registrar voto");

        return { data: await response.json(), error: null };

    } catch (error) {

        return { data: null, error: error.message };

    }
}