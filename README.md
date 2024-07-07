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

6/16
    *** Card Set Create Modal/Form
    ** Make sure all CS actions are set up and functional
    ** Make sure all CS Modal buttons are good
    * Session User ID

    OK so let's start with the basic structure of the modal.
    We want:
        Title, Public/Private toggle
        Table with all flashcards
        Close, Save

    ~~ Card Set Create Modal ~~
    Working on fetching from database via modal (client component)
        Not sure if server actions are viable here or not (better for manipulate than fetch)
        currently running into issue with missing_connection_string (works in server component but not client component)

6/17
    *** Card Set Modal (fetching data from client component)
        ** functional checkboxes 

    OK so I think it's best to set up API for fetching right now instead of relying on fetching from DB bc of client components
        @/app/data.json
        @/app/api/
    Also need migration script
        @/app/migration/

    so I think I got the basic concept of API set up for fetching. My priority should be something like..
        -- Appropriate API routes to fetch data
        -- Use fetched data in app
        -- Directory cleanup

6/18
    Confirmed that I need to use "app/api/*/route.ts" for API routes
    WOOOO got APIs (GET) set up.
        Getting all flashcards was pretty straight forward.
            connect to db, use sql to query
        Difficulty was query by uuid
            need to cast the variable i'm searching for
                WHERE id = (${var})::uuid
    
    API Fetch TODO :
        Users?
        Card Sets
        FC by CS
        FC by User *
        CS by User *
            * need to set up session user id first, do later

    OKAYYYYYYYYYYY
    So I finally got the create CS modal to initiate how I want it to (basic). Have to work on functionality now.
        ++ Create Card Set button loads a modal
            ++ Title input
            ++ Flash Cards table is pre-populated
                ~~ TODO add search function, can do later
        ** Tested that API isn't fetched too often (but might still have to figure out some cleanup for that)
            ++ set [isShown] as dependency
            -- edit isn't called when create is used, and vice-versa
            -- but edit and created are called 2x/button on page refresh (??)

6/19
    Focused on resume today so not a lot of work done
    Some cleanup and set up API routes to implement later

6/22
    Took a brief break to deal with health issues + resume
    So let's see.. what do today?

    *** Create Card Set
        -- utilize check boxes to select flash cards
        -- insert into cardset - cardset info
        -- insert into cs_fc - one row per card in the set 

    So first we can make sure that checking the boxes selects the cards - print a list on submit
    Can do inserts with form actions because not fetching

    OK so I made some good progress today.
        * Checkboxes properly build a list of cards to add to the FC
        * Cardset creation is like half way there?
            - actual cardset is created, nice.
            - connection of cardsets_flashcards needs work
        * Set up temporary page /dashboard/cardsets/[id] to help check cs2fc connection
            -- kinda buggy bc can't like, view one, go back, then view another ??
            -- can sometimes, but something funny is going on
        * updated cardset table to use "title" instead of "name"
        * added some functions in data.ts to fetch cardset and cs2fc
        
6/24
    OK, so flash cards are working fully. Card sets are on their way.
    What do I have left to do?
        > fix bugginess
        > make pretty
        *** > get user session
        ** > edit card sets
        * > view flashcards
        * > view card sets

    So I can get user id just using my auth() from auth.ts thanks to next-auth v5
    but I can't get uid, only name and email. So I'm using email to query for uid.
    ^ adding this to data.ts so I don't have to pass around the user in my html.

    Now that I have my session UID, I need to update my queries to only grab flash cards for this user.
    Also need to make sure my connection tables are being updated properly when adding fc/user
        > fetch flashcards by UID
            - user_fc

        > fetch cardsets by UID
            - user_cs

    Currently working on updating fcapi 
        > didn't work when using fetch() from data.ts, maybe bc of nostore()?
        > it's ok, was unnecessary work anyways, don't need to do this.

    So let's start with fetching flashcards by UID
        * fetch list of fcid associated to uid using user_fc
            >> DONE
        * fetch list of csid assocaited to uid using user_cs
            >> DONE
        * make sure user_fc is properly populated
            >> DONE
        * make sure user_cs is properly populated
            >> DONE
            
    Flashcards page and cardset modal are both properly populated based on user!

Not sure why fcapi is being weird
SyntaxError: JSON.parse: unexpected end of data at line 1 column 1 of the JSON data

6/25
    *** pre-populate CS Edit checkboxes
    
    >> took a little detour to optimize cardset creation by building dynamic insert instead of doing multiple inserts
    >> update getUID to getUSER

    ***
        Built csapi/[csid]
            >> successfully returns all flashcards associated with cardset
        -- need to work on setting checkbox defaults

6/26
    *** pre-populate CS Edit checkboxes

    >> detour time lmao
        - restructured CS modal fetches to get flashcard list in page.tsx instead of in the modal (removed useEffect, makes less fetch calls)

    OK so now let's look at CS Edit checkboxes.
    I think this needs to be done within the modal because it's specific to each cardset (table row)
    So each table row should have the csid available to make an API call. Let's make sure we can get the list of cards in use properly first.
    
7/5 I'M BAAAAAAAAAACK
    So let's get back to editing card sets.

    I need to focus on making sure the correct cards are being fetched.
    then I can worry about populating the checkboxes.

    GOTTEMMMMMM
    ***
    Edit CS Modal pre-populated with check marks !! 
    Added new definition, Cardsets_Flashcards_List, which is basically Flashcard except with "checked: boolean"
    So now in cardsets/table.tsx, I do some logic while getting list of flashcards
        Use cs_fc table to get list of flashcards included in each cardset, then add "checked" boolean to each one
        Pass new list that includes "checked"
    I think this is a good spot to have it done as we're setting up mapping for this table specifically.

    ** ok next, gotta make updating cardsets actually work.
    Set up cardset_helper definition to hold list of cards + list including checked boolean

    Updating card sets is all good!
        Submitting updates the database properly
        Opening edit modal is properly pre-populated

    OKKKKK so...
        Cardsets
            +++ Create
            +++ Update
            +++ Delete
            ~~ View (confirmed that proper list is fetched, need to work on interactivity)
            ** Browse others' card sets

    Next things I need to do --
        Flash Card View
        Card Set View
        Card Set Browse

        Bug testing and cleanup and make pretty

7/7
    Today let's start working on viewing our flash cards.
    *** Single Flashcard View
    ** Card Set View

    >> Single Flashcard View
        - Modal
        - Start by showing front side view
        - Click flashcard to toggle between front and back

        ~~ DONE ~~

    >> Card Set View
        - Modal (?)
        Similar to SFV but option to select whether you were right/wrong (+ 2 buttons)
        Selecting right/wrong moves to next FC
            If right, FC won't be shown again during set
            If wrong, FC will be placed back into stack to try again later
        
        So my main concern here is doing things modally and making sure states are saved properly
        But I want to make sure certain logic doesn't occur until button is pressed, or it will take too long to load.

        OK so I got some basic functionality working, need to make buttons prettier.
        Also slight issue with "good" where it doesn't always move on to the next FC
        Stack closes and resets after completion
            -- having issue with reset