'use client'
// import { useRouter } from 'next/navigation';
import React, { FunctionComponent } from 'react';
// import { useDisclosure } from "@nextui-org/react";
import { Button } from '@/app/ui/button';
import ReactDOM, { useFormState } from 'react-dom';
import { createFlashcard, updateFlashcard } from '@/app/lib/actions';
import {
    Wrapper,
    Header,
    StyledModal,
    HeaderText,
    CloseButton,
    Content,
    Backdrop,
} from '@/app/ui/modal.style';
import { TAC_Back, TAC_Front } from '@/app/ui/textarea_custom';
import { Flashcard } from '@/app/lib/definitions';


export interface CreateProps {
    isShown: boolean;
    hide: () => void;
    headerText: string;
}

export interface EditProps {
    isShown: boolean;
    hide: () => void;
    headerText: string;
    fc: Flashcard;
}

export const CreateFCModal: FunctionComponent<CreateProps> = ({
    isShown,
    hide,
    headerText
}) => {
    const initialState = {
        message: "",
        errors: {
            front_text: [],
            back_text: [],
            // front_img: [],
            // back_img: []
        }
    }

    const [state, formAction] = useFormState(createFlashcard, initialState)

    React.useEffect(() => {
        if (state?.message === "created") {
            // console.log("using effect")
            hide()
            state.message = ""
        }
    }, [state])

    const create_modal = (
        <React.Fragment>
            <Backdrop />
            <Wrapper>
                <StyledModal>
                    <Header>
                        <HeaderText>{headerText}</HeaderText>
                        <CloseButton onClick={hide}>X</CloseButton>
                    </Header>
                    <form action={formAction}>
                        {/* <Content>{modalContent}</Content> */}
                        <Content>
                            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                                <div className="w-full">
                                    <label
                                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                        htmlFor="front_text"
                                    >
                                        Front Text
                                    </label>
                                    <div className="relative">
                                        <TAC_Front ft={''} />
                                    </div>
                                    <div id="front_text-error" aria-live="polite" aria-atomic="true">
                                        {state?.errors?.front_text &&
                                            state?.errors.front_text.map((error: string) => (
                                                <p className="mt-2 text-sm text-red-500" key={error}>
                                                    {error}
                                                </p>
                                            ))}
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label
                                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                        htmlFor="front_img"
                                    >
                                        Upload Front Image
                                    </label>
                                    <div className="relative">
                                        {/* <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            id="front_img"
            type="front_img"
            name="front_img"
            placeholder="Enter front image here"
          /> */}
                                        {/* <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" /> */}
                                    </div>
                                    {/* 
        <div id="front_img-error" aria-live="polite" aria-atomic="true">
          {state.errors?.front_img &&
            state.errors.front_img.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div> */}
                                </div>
                                <div>
                                    <label
                                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                        htmlFor="back_text"
                                    >
                                        Back Text
                                    </label>
                                    <div className="relative">
                                        <TAC_Back bt="" />
                                    </div>
                                    <div id="back_text-error" aria-live="polite" aria-atomic="true">
                                        {state?.errors?.back_text &&
                                            state?.errors.back_text.map((error: string) => (
                                                <p className="mt-2 text-sm text-red-500" key={error}>
                                                    {error}
                                                </p>
                                            ))}
                                    </div>
                                </div>
                                <div>
                                    <label
                                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                        htmlFor="back_img"
                                    >
                                        Upload Back Image
                                    </label>
                                    <div className="relative">
                                        {/* <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            id="back_img"
            type="back_img"
            name="back_img"
            placeholder="Enter back image here"
          /> */}
                                        {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label> */}
                                        {/* <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" /> */}
                                    </div>
                                    {/* <div id="back_img-error" aria-live="polite" aria-atomic="true">
          {state.errors?.back_img &&
            state.errors.back_img.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div> */}
                                    <div className="mt-6 flex justify-end gap-4 mr-6 pb-6">
                                        <Button type="button" onClick={hide}>Cancel</Button>
                                        <Button type="submit" >Save + Close</Button>
                                    </div>
                                </div>
                            </div>

                        </Content>

                    </form>
                </StyledModal>
            </Wrapper>
        </React.Fragment>
    );

    return isShown ? ReactDOM.createPortal(create_modal, document.body) : null;

}

export const EditFCModal: FunctionComponent<EditProps> = ({
    isShown,
    hide,
    headerText,
    fc
}) => {
    const initialState = {
        message: "",
        errors: {
            front_text: [],
            back_text: [],
            // front_img: [],
            // back_img: []
        }
    }

    const updateFlashcardWithId = updateFlashcard.bind(null, fc.fcid);
    const [state, formAction] = useFormState(updateFlashcardWithId, initialState)

    React.useEffect(() => {
        if (state?.message === "updated") {
            hide()
            state.message = ""
        }
    }, [state])

    const edit_modal = (
        <React.Fragment>
            <Backdrop />
            <Wrapper>
                <StyledModal>
                    <Header>
                        <HeaderText>{headerText}</HeaderText>
                        <CloseButton onClick={hide}>X</CloseButton>
                    </Header>
                    <form action={formAction}>
                        {/* <Content>{modalContent}</Content> */}
                        <Content>
                            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                                <div className="w-full">
                                    <label
                                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                        htmlFor="front_text"
                                    >
                                        Front Text
                                    </label>
                                    <div className="relative">
                                        <TAC_Front ft={fc.front_text} />
                                    </div>
                                    <div id="front_text-error" aria-live="polite" aria-atomic="true">
                                        {state?.errors?.front_text &&
                                            state?.errors.front_text.map((error: string) => (
                                                <p className="mt-2 text-sm text-red-500" key={error}>
                                                    {error}
                                                </p>
                                            ))}
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label
                                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                        htmlFor="front_img"
                                    >
                                        Upload Front Image
                                    </label>
                                    <div className="relative">
                                        {/* <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            id="front_img"
            type="front_img"
            name="front_img"
            placeholder="Enter front image here"
          /> */}
                                        {/* <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" /> */}
                                    </div>
                                    {/* 
        <div id="front_img-error" aria-live="polite" aria-atomic="true">
          {state.errors?.front_img &&
            state.errors.front_img.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div> */}
                                </div>
                                <div>
                                    <label
                                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                        htmlFor="back_text"
                                    >
                                        Back Text
                                    </label>
                                    <div className="relative">
                                        <TAC_Back bt={fc.back_text} />
                                    </div>
                                    <div id="back_text-error" aria-live="polite" aria-atomic="true">
                                        {state?.errors?.back_text &&
                                            state?.errors.back_text.map((error: string) => (
                                                <p className="mt-2 text-sm text-red-500" key={error}>
                                                    {error}
                                                </p>
                                            ))}
                                    </div>
                                </div>
                                <div>
                                    <label
                                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                        htmlFor="back_img"
                                    >
                                        Upload Back Image
                                    </label>
                                    <div className="relative">
                                        {/* <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            id="back_img"
            type="back_img"
            name="back_img"
            placeholder="Enter back image here"
          /> */}
                                        {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label> */}
                                        {/* <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" /> */}
                                    </div>
                                    {/* <div id="back_img-error" aria-live="polite" aria-atomic="true">
          {state.errors?.back_img &&
            state.errors.back_img.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div> */}
                                    <div className="mt-6 flex justify-end gap-4 mr-6 pb-6">
                                        <Button type="button" onClick={hide}>Cancel</Button>
                                        <Button type="submit" >Save + Close</Button>
                                    </div>
                                </div>
                            </div>
                        </Content>
                    </form>
                </StyledModal>
            </Wrapper>
        </React.Fragment>
    );

    return isShown ? ReactDOM.createPortal(edit_modal, document.body) : null;

}