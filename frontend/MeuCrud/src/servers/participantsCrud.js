import { API_URL } from "./configApi";

// Error preset messages
const ERRORS = {
    FETCH_PARTICIPANTS: "Não foi possível conectar à casa",
    FETCH_PAREDAO: "Não foi possível carregar o paredão",
    CREATE_PARTICIPANT: "Erro ao adicionar participante",
    UPDATE_PARTICIPANT: "Erro ao atualizar participante",
    DELETE_PARTICIPANT: "Erro ao remover participante",
    TOGGLE_PAREDAO: "Erro ao atualizar o paredão",
    ELIMINATE_PARTICIPANT: "Erro ao eliminar participante",
    VOTE_PARTICIPANT: "Erro ao registrar voto",
    ALREADY_ELIMINATED: "Este participante já foi eliminado",
    ALREADY_IN_PAREDAO: "Este participante já está no paredão",
    NOT_IN_PAREDAO: "Este participante não está no paredão",
    INACTIVE_PARTICIPANT: "Este participante foi removido do sistema",
    ALREADY_INACTIVE: "Este participante já foi removido do sistema",
};

// Validations for easy code
function isEliminated(participant) {
    return participant.status === "Eliminado(a)";
}

function isInParedao(participant) {
    return participant.status === "No paredão";
}

function isInactive(participant) {
    return participant.isActive === false;
}

// Search for all particpants (that are active in the system)
export async function getParticipants() {

    try {

        const response = await fetch(`${API_URL}/participants?isActive=true`);

        if (!response.ok) throw new Error(ERRORS.FETCH_PARTICIPANTS);

        const data = await response.json();

        return { data, error: null };

    } catch (error) {

        return { data: [], error: error.message };

    }
}

// Search for participants in Paredão
export async function getParedao() {

    try {

        const response = await fetch(`${API_URL}/participants?isActive=true&status=No paredão`);

        if (!response.ok) throw new Error(ERRORS.FETCH_PAREDAO);

        const data = await response.json();

        return { data, error: null };

    } catch (error) {

        return { data: [], error: error.message };

    }
}

// Create a new active participant
export async function createParticipant(participant) {

    try {

        const response = await fetch(`${API_URL}/participants`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...participant,
                status: "Na casa",
                emParedao: false,
                votes: null,
                isActive: true
            })
        });

        if (!response.ok) throw new Error(ERRORS.CREATE_PARTICIPANT);

        return { data: await response.json(), error: null };

    } catch (error) {

        return { data: null, error: error.message };

    }
}

// Chang Personal Information about the Participants
export async function updateParticipant(id, participant) {

    try {

        if (isInactive(participant)) {
            return { data: null, error: ERRORS.INACTIVE_PARTICIPANT }; // If theyre inactive (soft-deleted) from the system, does not work
        }

        const response = await fetch(`${API_URL}/participants/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ // Just the personal information ;)
                name: participant.name,
                state: participant.state,
                age: participant.age,
                occupation: participant.occupation,
                phone: participant.phone
            })
        });

        // Error Handling
        if (!response.ok) throw new Error(ERRORS.UPDATE_PARTICIPANT);

        return { data: await response.json(), error: null };

    } catch (error) {

        return { data: null, error: error.message };

    }
}

// Soft Delete
export async function deleteParticipant(participant) {

    try {

        if (isInactive(participant)) {
            return { error: ERRORS.ALREADY_INACTIVE }; // If theyre inactive (soft-deleted) from the system, does not work
        }

        const response = await fetch(`${API_URL}/participants/${participant.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                isActive: false
            })
        });

        // Error Handling
        if (!response.ok) throw new Error(ERRORS.DELETE_PARTICIPANT);

        return { error: null };

    } catch (error) {

        return { error: error.message };

    }
}

// This function will switch between the participant being or not at Paredao
export async function toggleParedao(participant) {

    try {

        if (isInactive(participant)) {
            return { data: null, error: ERRORS.INACTIVE_PARTICIPANT }; // If theyre inactive (soft-deleted) from the system, does not work
        }

        const entering = !isInParedao(participant);

        if (entering && isEliminated(participant)) {
            return { data: null, error: ERRORS.ALREADY_ELIMINATED }; // If theyre eliminated, does not work
        }

        const response = await fetch(`${API_URL}/participants/${participant.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: entering ? "No paredão" : "Na casa", // Switches between entering or leaving
                emParedao: entering, // Switches between entering or leaving
                votes: entering ? 0 : null // Enter with zero votes OR leaves with null votes
            })
        });

        // Error Handling
        if (!response.ok) throw new Error(ERRORS.TOGGLE_PAREDAO);

        return { data: await response.json(), error: null };

    } catch (error) {

        return { data: null, error: error.message };

    }
}

// Changes status to Eliminado
export async function eliminateParticipant(participant) {

    try {

        if (isInactive(participant)) {
            return { data: null, error: ERRORS.INACTIVE_PARTICIPANT }; // Does not work if theyre inactive
        }

        if (isEliminated(participant)) {
            return { data: null, error: ERRORS.ALREADY_ELIMINATED }; // Does not work if theyre already eliminated
        }

        const response = await fetch(`${API_URL}/participants/${participant.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: "Eliminado(a)",
                emParedao: false
            })
        });

        // Error Handling
        if (!response.ok) throw new Error(ERRORS.ELIMINATE_PARTICIPANT);

        return { data: await response.json(), error: null };

    } catch (error) {

        return { data: null, error: error.message };

    }
}

// Votes a participant that is at the Paredao
export async function voteParticipant(participant) {

    try {

        if (isInactive(participant)) {
            return { data: null, error: ERRORS.INACTIVE_PARTICIPANT }; // Does not work if theyre inactive
        }

        if (isEliminated(participant)) {
            return { data: null, error: ERRORS.ALREADY_ELIMINATED }; // Does not work if theyre already eliminated
        }

        if (!isInParedao(participant)) {
            return { data: null, error: ERRORS.NOT_IN_PAREDAO }; // Does not work if theyre not in Paredao
        }

        const response = await fetch(`${API_URL}/participants/${participant.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                votes: participant.votes + 1
            })
        });

        // Error Handling
        if (!response.ok) throw new Error(ERRORS.VOTE_PARTICIPANT);

        return { data: await response.json(), error: null };

    } catch (error) {

        return { data: null, error: error.message };

    }
}