import api from "../axios";
import { Patient } from "../types";

const LIMIT = 10;

export const getPatients = async (page: number): Promise<Patient[]> => {
    const skip = (page - 1) * LIMIT;

    const response = await api.get(
        `/users?limit=${LIMIT}&skip=${skip}`
    );

    return response.data.users.map((user: any) => ({
        id: user.id.toString(),
        name: `${user.firstName} ${user.lastName}`,
        age: user.age,
        condition: "General Checkup",
    }));
};
