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

Did a bit of work on create-form UI
    ++ set up upload file button and customizable text area, needs more work on functionality 
    -- need to work on button functionality
    ++ started working on edit form a bit, need to fix up UpdateFlashcard

    ++ fixed UpdateFlashcard
    -- working on passing id to modal
        .. currently edit button is set up to bring CreateFC Modal bc errors with EditFC Modal
        .. something with fetching flashcards by ID. Need to figure out appropriate timing for fetching data.

    ughhhh why is fetching data with modal weird? Maybe need to redo the way I set up modal?
    issue appears to be trying to fetch data while using client (bad bc data security)
    but need to use client to use modal? maybe? iDONO

6/11 TODO --
    *** Figure out EditFC Modal
    ** CreateFC Modal Buttons // EditFC Modal Buttons
    * CreateCS Modal
    * Apply same logic to EditCS Modal

    OK so current status with EditFC Modal --
        Clicking button brings up Modal, but none of the info is populated, and site refreshes (almost) immediately
        So why is it refreshing? I think it has to do with timing of update function.
            >> Issue was that I tried to make the button a form
            So how do I pass a form action? can I do button action? yes but issue with await fetch

    So, I think I figured out how to fetch data from client
        ** useEffect() lets me await in client component
    But there's an issue in edit-form with useFormState ... ?
        ok so it looks like it's because calling for a fetch in the Update button could return "undefined", so I had to add "| undefined" to the definition of FCState. Not sure if this is safe or not. But it works for now. We'll have to see what behavior we observe.

    ok so useEffect() didn't actually work.. HMM.. 
    ok so I rearranged some things and it seems to do things at the proper time but failing to fetch data
    OKAYYYY GOT IT TO POPULATE
        TL;DR : I'm already fetching data when populating the table, use that instead of trying to fetch on update
        i'm so stupid lmao but this is kinda obvious fix.

    SO .... Priority for the day (***) fulfilled.
    *** Clicking on Edit button will bring up modal with information pre-filled (front and back text)

    NEXT STEP -- ** CreateFC Modal Buttons // EditFC Modal Buttons
    So I need to get the buttons working -- Cancel, Save + Exit, Save + Next
    Right now, priorities are Cancel, Save + Exit .... Save + Next will be TODO.

6/12
    So I got the buttons to toggle the modal off, but need to figure out best way to apply server actions to query database.
    So I'm playing with a few different ideas right now...
        >> Toggling modal works best if {hide} is added during myModal, but server actions dont work well there
        >> Server actions should be in the create/edit-form, but toggling doesn't work well there.
        .... so either I'm doing something wrong, or these belong separately (maybe could add a listener or something to help hook things together?)

        For now, I'm leaving them separate, and focusing on making sure that submitting form actually performs server action
            -- right now, working on making sure flashcards can be CREATED
            -- next, make sure flashcards can be UPDATED
            -- finally, work on making them work along with toggling.

        Currently, issue with creating ---
            Flashcard is created properly, but getting >> TypeError: state is undefined
                Stems from (app-pages-browser)/./app/ui/flashcards/create-form.tsx
                but not sure what the issue is.

                OK so the issue ended up just being how var state was called in create-form. Had to adjust for possible undefined.

6/13
    *** Finish CreateFC button functionality, EditFC button functionality
    ** Start working on CS Modals

    WOOO got CreateFC modal to be fully functional (basic)
        -- can add front/back text, cancel, and save
        -- Modal closes properly
        * replaced create-form with fc_modal
        * useEffect() triggers toggle on formAction success
        ... did a bit of file directory structure cleanup

    Next up -- EditFC function
        ++ AND WE ARE GOOD GOOD
        * replaced edit-form with fc_modal

    FC TODO : 
        *** Query based on session user 
        ** Images !!
        * Save + Add New

    Ok, next need to do CS Modals
        Basic requirements -- 
            CREATE :
                Cardset Title
                Table with checkmarks to select which flashcards to include
                    Can copy from main flashcards page but update styling and add checkmarks column
                    ++ Checkmark functionality
                Close, Save
            Edit : 
                Same but pre-populate checkmarks. Utilize CARDSET_FLASHCARDS table.