import { StudantCreate } from "../interfaces/studants.interface";

export function validateStudentData({ name, cpf, ra, email }: StudantCreate): void {
    if (!name || !cpf || !ra || !email) {
        throw new Error('Todos os campos são obrigatórios.');
    }

    if (typeof cpf !== 'string') {
        throw new Error('CPF inválido.');
    }

    if (typeof ra !== 'string') {
        throw new Error('RA inválido.');
    }

    if (typeof email !== 'string') {
        throw new Error('Email inválido.');
    }
}