'use server';
import { z } from 'zod'
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth'
import bcrypt from 'bcrypt'
import { Cardset, Cardsets_Helper, Flashcard } from '@/app/lib/definitions';
import { v4 } from 'uuid'
import { getUser } from '@/app/lib/data';

const UserSchema = z.object({
  uid: z.string(),
  name: z.string({
    required_error: 'Please enter your name.',
  }),
  email: z.string({
    required_error: 'Please enter your e-mail address.',
  }).email({
    message: 'Please enter a valid e-mail'
  }),
  password: z.string({
    required_error: 'Please enter your password.'
  }).min(6, {
    message: 'Password must be at least 6 characters'
  }),
});

const CreateUser = UserSchema.omit({ uid: true });
export type UserState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function createUser(prevState: UserState, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Register User.',
    };
  }
  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
        INSERT INTO users (name, email, password)
        VALUES (${name}, ${email}, ${hashedPassword})
        `;
  } catch (error) {
    return {
      errors: {},
      message: `Database Error: Failed to Create User.\n${error}`,
    }
  }

  revalidatePath('/login');
  redirect('/login');
  // Test it out:
  //   console.log(rawFormData);
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

// --------------------- Flash Cards ------------------------
const FCSchema = z.object({
  fcid: z.string(),
  front_text: z.string(),
  back_text: z.string(),
  front_img: z.string(),
  back_img: z.string()
});

const CreateFC = FCSchema.omit({ fcid: true, front_img: true, back_img: true });
export type FCState = {
  errors?: {
    front_text?: string[];
    back_text?: string[];
    // front_img?: string[];
    // back_img?: string[];
  };
  message?: string | null;
} | undefined

export async function createFlashcard(prevState: FCState, formData: FormData) {
  const validatedFields = CreateFC.safeParse({
    front_text: formData.get('front_text'),
    back_text: formData.get('back_text'),
    // front_img: formData.get('front_img'),
    // back_img: formData.get('back_img'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Flashcard.',
    };
  }
  const { front_text, back_text } = validatedFields.data;
  const front_img = 'N/A'
  const back_img = 'N/A'
  // const { front_text, back_text, front_img, back_img } = validatedFields.data;
  try {
    const usr = await getUser()
    const fcid = v4()

    await sql`
        INSERT INTO flashcards (fcid, front_text, back_text, front_img, back_img)
        VALUES (${fcid}, ${front_text}, ${back_text}, ${front_img}, ${back_img})
        `;

    await sql`
        INSERT INTO users_flashcards (uid, fcid)
        VALUES (${usr.uid}, ${fcid})
        `

  } catch (error) {
    console.log(error)
    return {
      errors: {},
      message: `Database Error: Failed to Create Flashcard.\n${error}`,
    }
  }
  console.log("FC Created")

  // not sure if below will be necessary -- want to make this into a modal form
  revalidatePath('/dashboard/flashcards');
  // redirect('/dashboard/flashcards');

  return {
    errors: {},
    message: "created"
  }
}

export async function deleteFlashcard(id: string) {
  try {
    await sql`DELETE FROM flashcards WHERE fcid = ${id}`
  } catch (error) {
    return {
      message: `Database Error: Failed to Delete Flashcard ${id} `,
    }
  }
  revalidatePath('/dashboard/flashcards')
  redirect('/dashboard/flashcards');
}

const UpdateFlashcard = FCSchema.omit({ fcid: true, front_img: true, back_img: true })

export async function updateFlashcard(fcid: string, prevState: FCState, formData: FormData) {
  const validatedFields = UpdateFlashcard.safeParse({
    front_text: formData.get('front_text'),
    back_text: formData.get('back_text'),
    // front_img: formData.get('front_img'),
    // back_img: formData.get('back_text'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Create Flashcard.',
    }
  }
  // const { front_text, back_text, front_img, back_img } = validatedFields.data;
  const { front_text, back_text } = validatedFields.data;
  const front_img = "", back_img = ""

  console.log("update time")

  try {
    await sql`
    UPDATE flashcards
    SET front_text = ${front_text},
        back_text = ${back_text},
        front_img = ${front_img},
        back_img = ${back_img}
    WHERE fcid = ${fcid}
    `;
  } catch (error) {
    console.log(error)
    return {
      errors: {},
      message: `Database Error: Failed to Update Flashcard: ${fcid}`
    }
  }
  console.log('updated')
  revalidatePath('/dashboard/flashcards');
  return {
    errors: {},
    message: "updated"
  }
}

// --------------------- Card Sets ------------------------
const CSSchema = z.object({
  csid: z.string(),
  title: z.string(),
  created_by: z.string(),
  share: z.boolean()
});

const CreateCS = CSSchema.omit({ csid: true, created_by: true, share: true});
export type CSState = {
  errors?: {
    title?: string[];
    // created_by?: string[];
    // share?: string[];
  };
  message?: string | null;
} | undefined

export async function createCardset(cards: string[], share: boolean, prevState: CSState, formData: FormData) {
  const validatedFields = CreateCS.safeParse({
    title: formData.get('title'),
    // created_by: formData.get('created_by'),
    // share: formData.get('share')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Flashcard.',
    };
  }
  // const { name, created_by, share } = validatedFields.data;
  const { title } = validatedFields.data;
  // const share = true
  const csid = v4()

  // console.log(cards)

  try {
    const usr = await getUser()

    await sql`
        INSERT INTO cardsets (csid, title, created_by, share)
        VALUES (${csid}, ${title}, ${usr.name}, ${share})
        `;

    await sql`
      INSERT INTO users_cardsets (uid, csid)
      VALUES (${usr.uid}, ${csid})
    `

    // build insert sql so I can send multiple inserts at once
    const arr = cards.map((c) => ({ csid: csid, fcid: c }));

    await sql.query(
      `INSERT INTO cardsets_flashcards (csid, fcid)
       SELECT csid, fcid FROM json_populate_recordset(null::cardsets_flashcards, $1)`,
      [JSON.stringify(arr)]
    );

  } catch (error) {
    console.log(error)
    return {
      errors: {},
      message: `Database Error: Failed to Create Card Set.\n${error}`,
    }
  }
  revalidatePath('/dashboard/flashcards');

  return {
    errors: {},
    message: "created"
  }
}

const UpdateCardset = CSSchema.omit({ csid: true, created_by: true, share: true })

export async function updateCardset(csid: string, cards: string[], share: boolean, prevState: CSState, formData: FormData) {
  const validatedFields = UpdateCardset.safeParse({
    title: formData.get('title'),
    // created_by: formData.get('created_by'),
    // share: formData.get('share')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Flashcard.',
    };
  }
  // const { name, created_by, share } = validatedFields.data;
  const { title } = validatedFields.data;
  // const share = true

  // console.log(cards)

  try {
    // update cardset
    await sql`
      UPDATE 
        cardsets
      SET 
        title = ${title},
        share = ${share}
      WHERE 
        csid = ${csid}
      `;

    // clear list of fc from cs
    await sql`
      DELETE FROM
        cardsets_flashcards
      WHERE 
        csid = ${csid}
    `
    // add updated list of fc from cs
    // build update sql so I can send multiple inserts at once
    const arr = cards.map((c) => ({ csid: csid, fcid: c }));

    await sql.query(
      `INSERT INTO cardsets_flashcards (csid, fcid)
       SELECT csid, fcid FROM json_populate_recordset(null::cardsets_flashcards, $1)`,
      [JSON.stringify(arr)]
    );

  } catch (error) {
    console.log(error)
    return {
      errors: {},
      message: `Database Error: Failed to Create Card Set.\n${error}`,
    }
  }

  revalidatePath('/dashboard/flashcards');

  return {
    errors: {},
    message: "updated"
  }
}

export async function deleteCardset(id: string) {
  try {
    await sql`DELETE FROM cardsets WHERE csid = ${id}`
  } catch (error) {
    return {
      message: `Database Error: Failed to Delete Card Set ${id}`,
    }
  }
  revalidatePath('/dashboard/flashcards')
  redirect('/dashboard/flashcards');
}

export async function copyCardset(cs: Cardsets_Helper) {
    const csid = v4()
    try {
    const usr = await getUser()

    await sql`
        INSERT INTO cardsets (csid, title, created_by, share)
        VALUES (${csid}, ${cs.title}, ${cs.created_by}, ${cs.share})
        `;

    await sql`
    INSERT INTO users_cardsets (uid, csid)
    VALUES (${usr.uid}, ${csid})
    `;

    const arr = cs.cs_view.map((c) => ({ uid: usr.uid, fcid: c.fcid }));
    
    await sql.query(
      `INSERT INTO users_flashcards (uid, fcid)
        SELECT uid, fcid FROM json_populate_recordset(null::users_flashcards, $1)`,
      [JSON.stringify(arr)]
    );

    const arr2 = cs.cs_view.map((c) => ({ csid: csid, fcid: c.fcid }));

    await sql.query(
      `INSERT INTO cardsets_flashcards (csid, fcid)
       SELECT csid, fcid FROM json_populate_recordset(null::cardsets_flashcards, $1)`,
      [JSON.stringify(arr2)]
    );

  } catch (error) {
    return {
      message: `Database Error: Failed to Copy Card Set ${cs.csid}`,
    }
  }
  revalidatePath('/dashboard/cardsets/browse')
  redirect('/dashboard/cardsets/browse');
}