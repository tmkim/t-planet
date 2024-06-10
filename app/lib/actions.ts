'use server';
import { z } from 'zod'
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Statement, getJSDocReturnType } from 'typescript';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth'
import bcrypt from 'bcrypt'

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

const CreateFC = FCSchema.omit({ fcid: true });
export type FCState = {
  errors?: {
    front_text?: string[];
    back_text?: string[];
    front_img?: string[];
    back_img?: string[];
  };
  message?: string | null;
};

export async function createFlashcard(prevState: FCState, formData: FormData) {
  const validatedFields = CreateFC.safeParse({
    front_text: formData.get('front_text'),
    back_text: formData.get('back_text'),
    front_img: formData.get('front_img'),
    back_img: formData.get('back_img'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Flashcard.',
    };
  }
  const { front_text, back_text, front_img, back_img } = validatedFields.data;

  try {
    await sql`
        INSERT INTO users (front_text, back_text, front_img, back_img)
        VALUES (${front_text}, ${back_text}, ${front_img}, ${back_img})
        `;
  } catch (error) {
    return {
      errors: {},
      message: `Database Error: Failed to Create Flashcard.\n${error}`,
    }
  }

  // not sure if below will be necessary -- want to make this into a modal form
  revalidatePath('/dashboard/flashcards');
  redirect('/dashboard/flashcards');
}

export async function deleteFlashcard(id: string){
  try{
    await sql `DELETE FROM flashcards WHERE fcid = ${id}`
  } catch (error) {
    return {
      message: `Database Error: Failed to Delete Flashcard ${id} `,
    }
  }
  revalidatePath('/dashboard/flashcards')
  redirect('/dashboard/flashcards');
}

export async function deleteCardset(id: string){
  try{
    await sql `DELETE FROM cardsets WHERE csid = ${id}`
  } catch (error) {
    return {
      message: `Database Error: Failed to Delete Card Set ${id}`,
    }
  }
  revalidatePath('/dashboard/flashcards')
  redirect('/dashboard/flashcards');
}

const UpdateFlashcard = FCSchema.omit({fcid: true})

export async function updateFlashcard(fcid: string, prevState: FCState, formData: FormData){
  const validatedFields = UpdateFlashcard.safeParse({
    front_text: formData.get('front_text'),
    back_text: formData.get('back_text'),
    front_img: formData.get('front_img'),
    back_img: formData.get('back_text')
  });
  if (!validatedFields.success){
    return{
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Create Flashcard.',
    }
  }
  const {front_text, back_text, front_img, back_img} = validatedFields.data;

  try{
    await sql`
    UPDATE flashcards
    SET front_text = ${front_text},
        back_text = ${back_text},
        front_img = ${front_img},
        back_img = ${back_img}
    WHERE fcid = ${fcid}
    `;
  } catch (error){
    return {
      message: `Database Error: Failed to Update Flashcard: ${fcid}`
    }
  }

  // might not need bc modal
  revalidatePath('/dashboard/flashcards');
  redirect('/dashboard/flashcards');
}

// export async function deleteInvoice(id: string){
//   try{
//     await sql `DELETE FROM invoices WHERE id = ${id}`
//   } catch (error) {
//     return {
//       message: 'Database Error: Failed to Delete Invoice',
//     }
//   }
//   revalidatePath('/dashboard/invoices')
// }