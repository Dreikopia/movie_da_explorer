import { Client, TablesDB, ID, Query } from "appwrite";

// 1. Get our Appwrite IDs

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;


// 2. Connect to Appwrite

const client = new Client()
    .setEndpoint("https://sgp.cloud.appwrite.io/v1")
    .setProject(PROJECT_ID);


// 3. Create our database connection

const database = new TablesDB(client);


// 4. Update the search count

export const updateSearchCount = async (searchTerm, movie) => {

    try {

        // Check if this search already exists
        const result = await database.listRows(
            DATABASE_ID,
            TABLE_ID,
            [
                Query.equal("searchTerm", searchTerm),
            ]
        );


        // 5. If the search already exists

        if (result.rows.length > 0) {

            const row = result.rows[0];

            await database.updateRow(
                DATABASE_ID,
                TABLE_ID,
                row.$id,
                {
                    count: row.count + 1,
                }
            );


            // 6. If the search does NOT exist

        } else {

            await database.createRow(
                DATABASE_ID,
                TABLE_ID,
                ID.unique(),
                {
                    searchTerm,
                    count: 1,
                    movie_id: movie.id,
                    movie_title: movie.title,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }
            );

        }

    } catch (error) {

        console.error("Error updating search count:", error);

    }

};

export const getTrendingMovies = async () => {
    try {
        const result = await database.listRows(
            DATABASE_ID,
            TABLE_ID,
            [
                Query.limit(20),
                Query.orderDesc("count")
            ]
        );

        return result.rows;

    } catch (error) {
        console.error("Error getting trending movies:", error);
        return [];
    }
}