# T-Planet
Built using Next.js
Database - Postgres

-- database set up, seeded users, flash cards, card sets, connections btwn the 3
-- initialize dashboard/welcome, login page + auth config, actions, sidenav
    ** need to update actions
    ** need to work on front-end (ui)
     
-- work on login page
    * add middleware.ts
    * generate secret (openssl rand -base64 32) and update .env
    ** login page works!

-- work on creating new user
    * registration page built (basic) and link on login page redirects
    * name, email, password are requested + validated
    * error creating user in DB -- likely because of uid.
        This is ok bc the reason I built the registration page was to test things with UID
        Namely auto-generation of primary key for uid.

Working on displaying table for flashcards
    * basic set up is done for table + fetching + buttons
    * currently error with fetching - NeonDbError: operator does not exist: character varying = uuid
    * also need to set up table skeletons

    -- fixed issue with fetching (need to make sure all IDs are type uuid)
    -- set up basic functionality for table!
        ** Good : display flashcards, searchable, pagination, buttons exist
        ** TODO : button functionality, table skeletons
                idk why cardset page count keeps throwing errors ?
                also need to fix pagination because change page on FC affects CS

OK so let me start with table skeletons, then pagination, then buttons
    ** Skeletons for Flashcards and Cardsets tables look good!
    ** pagination is funny bc based on URL for query. so going to use scrollbar instead.
        ++ GOOD GOOD
        -- Probably going to re-intro pagination later bc could have WAYTOOMANY flashcards
        -- Probably need to add cute way to sort/filter/something
    ** Update position of tables to be responsive to screen size
        -- issue with table displaying data on small screens ??
    -- issue with Search affecting both tables
    ..... actually jk let's just implement both pagination and scrolling lmao
        ++ GOOD GOOD
        
Time to work on buttons ~
    So let's start with DELETE -> Create -> Edit -> View -> Browse

    Delete works with confirmation message

    Working on Create Flashcard modal
        ++ modal view works (might need to play with styling)
        -- need to create form
            ** basic form created, style and functionality need work

        ++ did a bit of work styling modal form