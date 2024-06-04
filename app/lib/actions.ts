'use server';
import { z } from 'zod'
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getJSDocReturnType } from 'typescript';
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

// --------------------- Flash Cards ------------------------
const FCSchema = z.object({
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

const CreateFC = UserSchema.omit({ uid: true });
export type FCState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function createFlashcard(prevState: FCState, formData: FormData) {
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
      message: `Database Error: Failed to Create Flashcard.\n${error}`,
    }
  }

  // not sure if below will be necessary -- want to make this into a modal form
  revalidatePath('/dashboard/flashcards');
  redirect('/dashboard/flashcards');
}

export async function deleteFlashcard(id: string){
  try{
    await sql `DELETE FROM flashcards WHERE id = ${id}`
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Flashcard',
    }
  }
  revalidatePath('/dashboard/flashcards')
}

// const UpdateInvoice = FormSchema.omit({id: true, date: true})

// export async function updateInvoice(id: string, prevState: State, formData: FormData) {
//     const validatedFields = UpdateInvoice.safeParse({
//       customerId: formData.get('customerId'),
//       amount: formData.get('amount'),
//       status: formData.get('status'),
//     });
//     if (!validatedFields.success) {
//       return {
//         errors: validatedFields.error.flatten().fieldErrors,
//         message: 'Missing Fields. Failed to Create Invoice.',
//       };
//     } 
//     const { customerId, amount, status } = validatedFields.data;
//     const amountInCents = amount * 100;

//     try{
//       await sql`
//         UPDATE invoices
//         SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
//         WHERE id = ${id}
//       `;
//     } catch (error) {
//       return {
//         message: 'Database Error: Failed to Update Invoice.',
//       }
//     }

//     revalidatePath('/dashboard/invoices');
//     redirect('/dashboard/invoices');
//   }

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