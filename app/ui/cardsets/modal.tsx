import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button } from '@/app/ui/button';
import ReactDOM, { useFormState } from 'react-dom';
import { createCardset, updateFlashcard } from '@/app/lib/actions';
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
import TempTable from '@/app/ui/cardsets/temptable'


export interface CreateProps {
    isShown: boolean;
    hide: () => void;
    headerText: string;
}

export interface EditProps {
    isShown: boolean;
    hide: () => void;
    headerText: string;
}

export const CreateCSModal: FunctionComponent<CreateProps> = ({
    isShown,
    hide,
    headerText
}) => {
    const initialState = {
        message: "",
        errors: {
            name: [],
            created_by: [],
            share: [],
            // front_img: [],
            // back_img: []
        }
    }

    const [state, formAction] = useFormState(createCardset, initialState)

    const [fcl, dataSet] = useState<any>([])

    useEffect(() => {
        fetch('/api/fcapi')
            .then((res) => res.json())
            .then((data) => {
                dataSet(data)
            })
        // console.log("CHECKING USEEFFECT --create")
        // console.log(fcl.flashcards)
    }, [isShown])

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
                                        Card Set Title
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            id="title"
                                            type="title"
                                            name="title"
                                            placeholder="Title Your Card Set..."
                                            required
                                        />
                                    </div>
                                    <div id="front_text-error" aria-live="polite" aria-atomic="true">
                                        {state?.errors?.name &&
                                            state?.errors.name.map((error: string) => (
                                                <p className="mt-2 text-sm text-red-500" key={error}>
                                                    {error}
                                                </p>
                                            ))}
                                    </div>
                                </div>
                                <TempTable fcl={fcl.flashcards} />
                                <div className="mt-6 flex justify-end gap-4 mr-6 pb-6">
                                    <Button type="button" onClick={hide}>Cancel</Button>
                                    <Button type="submit" >Save + Close</Button>
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

export const EditCSModal: FunctionComponent<EditProps> = ({
    isShown,
    hide,
    headerText
}) => {

    const initialState = {
        message: "",
        errors: {
            name: [],
            created_by: [],
            share: [],
            // front_img: [],
            // back_img: []
        }
    }

    const [state, formAction] = useFormState(createCardset, initialState)

    const [fcl, dataSet] = useState<any>([])

    useEffect(() => {
        fetch('/api/fcapi')
            .then((res) => res.json())
            .then((data) => {
                dataSet(data)
            })
        // console.log("CHECKING USEEFFECT --edit")
        // console.log(fcl.flashcards)
    }, [isShown])

    // useEffect(() => {
    //     if (state?.message === "updated") {
    //         hide()
    //         state.message = ""
    //     }
    // }, [state])

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
                                        Card Set Title
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            id="title"
                                            type="title"
                                            name="title"
                                            placeholder="Title Your Card Set..."
                                            required
                                        />
                                    </div>
                                    <div id="front_text-error" aria-live="polite" aria-atomic="true">
                                        {state?.errors?.name &&
                                            state?.errors.name.map((error: string) => (
                                                <p className="mt-2 text-sm text-red-500" key={error}>
                                                    {error}
                                                </p>
                                            ))}
                                    </div>
                                </div>
                                <TempTable fcl={fcl.flashcards} />
                                <div className="mt-6 flex justify-end gap-4 mr-6 pb-6">
                                    <Button type="button" onClick={hide}>Cancel</Button>
                                    <Button type="submit" >Save + Close</Button>
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