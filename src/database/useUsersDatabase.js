import { useSQLiteContext } from "expo-sqlite";

export function useUsersDatabase() {
    const database = useSQLiteContext();

    async function authUser({ email, password }) {
        try {
            const result = await database.getFirstAsync(`
                SELECT id, nome, email, role FROM users WHERE email = '${email}' and senha = '${password}' 
                `)
            return result
        } catch (error) {
            console.log("Error in authUser: ", error);
            throw error;
        }
    }
    
    async function getAllUsers() {
        try {
            const result = await database.getAllAsync("SELECT id, nome, email, role FROM users");
            return result;
        } catch (error) {
            console.error("Error in getAllUsers: ", error);
            throw error;
        }
    }

    return {
        authUser,
        getAllUsers,
    };
}