import { useSQLiteContext } from "expo-sqlite"

export function useBicyclesDatabase() {
    const database=useSQLiteContext();

    async function createBicycles({ user_id, user_nome, valor_estimado, marca, modelo, data_fabricacao, categoria }) {
        const statment = await database.prepareAsync(`
            INSERT INTO bicycles (user_id, user_nome, valor_estimado, marca, modelo, data_fabricacao, categoria)
            VALUES ($user_id, $user_nome, $valor_estimado, $marca, $modelo, $data_fabricacao, $categoria)
            `)
        try {
            const result = await statment.executeAsync({
                $user_id: user_id,
                $user_nome: user_nome,
                $valor_estimado: valor_estimado,
                $marca: marca,
                $modelo: modelo,
                $data_fabricacao: data_fabricacao,
                $categoria: categoria
            });
            const insertedID = result.lastInsertRowId.toString();
            return {insertedID}
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            await statment.finalizeAsync();
        }
    }

    return {
        createBicycles,
    };
}