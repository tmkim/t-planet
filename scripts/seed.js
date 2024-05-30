const { db } = require('@vercel/postgres');
const {
    users,
    flashcards,
    cardsets,
    users_cardsets,
    users_flashcards,
    cardsets_flashcards,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "users" table if it doesn't exist
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        uid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

        console.log(`Created "users" table`);

        // Insert data into the "users" table
        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
        INSERT INTO users (uid, name, email, password)
        VALUES (${user.uid}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (uid) DO NOTHING;
      `;
            }),
        );

        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            createTable,
            users: insertedUsers,
        };
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}

async function seedFlashcards(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "invoices" table if it doesn't exist
        const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS flashcards (
    fcid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    front_text VARCHAR(255) NOT NULL,
    back_text VARCHAR(255) NOT NULL,
    front_img VARCHAR(255) NOT NULL,
    back_img VARCHAR(255) NOT NULL
  );
`;

        console.log(`Created "flashcards" table`);

        // Insert data into the "invoices" table
        const insertedFlashcards = await Promise.all(
            flashcards.map(
                (flashcard) => client.sql`
        INSERT INTO flashcards (front_text, back_text, front_img, back_img)
        VALUES (${flashcard.front_text}, ${flashcard.back_text}, ${flashcard.front_img}, ${flashcard.back_img})
        ON CONFLICT (fcid) DO NOTHING;
      `,
            ),
        );

        console.log(`Seeded ${insertedFlashcards.length} flashcards`);

        return {
            createTable,
            flashcards: insertedFlashcards,
        };
    } catch (error) {
        console.error('Error seeding flashcards:', error);
        throw error;
    }
}

async function seedCardsets(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "customers" table if it doesn't exist
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS cardsets (
        csid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_by VARCHAR(255) NOT NULL
      );
    `;

        console.log(`Created "cardsets" table`);

        // Insert data into the "customers" table
        const insertedCardsets = await Promise.all(
            cardsets.map(
                (cardset) => client.sql`
        INSERT INTO cardsets (csid, name, created_by)
        VALUES (${cardset.csid}, ${cardset.name}, ${cardset.created_by})
        ON CONFLICT (csid) DO NOTHING;
      `,
            ),
        );

        console.log(`Seeded ${insertedCardsets.length} card sets`);

        return {
            createTable,
            customers: insertedCardsets,
        };
    } catch (error) {
        console.error('Error seeding card sets:', error);
        throw error;
    }
}

async function seedUsersFlashcards(client) {
    try {

        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users_flashcards(
            uid VARCHAR(255) NOT NULL,
            fcid VARCHAR(255) NOT NULL,
            PRIMARY KEY(uid, fcid)
        );
    `;

        console.log("users_flashcards table created");

        const insertedUFC = await Promise.all(
            users_flashcards.map((ufc) => client.sql`
        INSERT INTO users_flashcards (uid, fcid)
        VALUES (${ufc.uid},${ufc.fcid})
        ON CONFLICT DO NOTHING;
        `)
        )
        console.log(`Seeded ${insertedUFC.length} users_flashcards`);

        return {
            createTable,
            users_flashcards: insertedUFC
        };

    } catch (error) {
        console.error('Error seeding users_flashcards:', error);
        throw error;
    }
}

async function seedUsersCardsets(client) {
    try {
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users_cardsets(
            uid VARCHAR(255) NOT NULL,
            csid VARCHAR(255) NOT NULL,
            PRIMARY KEY(uid, csid)
        );
    `;

        console.log("users_cardsets table created");

        const insertedUCS = await Promise.all(
            users_cardsets.map((ucs) => client.sql`
        INSERT INTO users_cardsets (uid, csid)
        VALUES (${ucs.uid},${ucs.csid})
        ON CONFLICT DO NOTHING;
        `)
        )
        console.log(`Seeded ${insertedUCS.length} users_cardsets`);

        return {
            createTable,
            users_cardsets: insertedUCS
        };

    } catch (error) {
        console.error('Error seeding users_cardsets:', error);
        throw error;
    }
}

async function seedCardsetsFlashcards(client) {
    try {
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS cardsets_flashcards(
            csid VARCHAR(255) NOT NULL,
            fcid VARCHAR(255) NOT NULL,
            PRIMARY KEY(csid, fcid)
        );
    `;

        console.log("cardsets_flashcards table created");

        const insertedCSFC = await Promise.all(
            cardsets_flashcards.map((csfc) => client.sql`
        INSERT INTO cardsets_flashcards (csid, fcid)
        VALUES (${csfc.csid},${csfc.fcid})
        ON CONFLICT DO NOTHING;
        `)
        )
        console.log(`Seeded ${insertedCSFC.length} cardsets_flashcards`);

        return {
            createTable,
            cardsets_flashcards: insertedCSFC
        };

    } catch (error) {
        console.error('Error seeding cardsets_flashcards:', error);
        throw error;
    }
}


async function main() {
    const client = await db.connect();

    await seedUsers(client);
    await seedFlashcards(client);
    await seedCardsets(client);
    await seedUsersFlashcards(client);
    await seedUsersCardsets(client);
    await seedCardsetsFlashcards(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});
