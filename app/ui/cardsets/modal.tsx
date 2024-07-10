import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button } from '@/app/ui/button';
import ReactDOM, { useFormState } from 'react-dom';
import { createCardset, updateCardset } from '@/app/lib/actions';
import {
    Wrapper,
    Header,
    StyledModal,
    HeaderText,
    CloseButton,
    Content,
    Backdrop,
} from '@/app/ui/modal.style';
import { Cardsets_Helper, Flashcard } from '@/app/lib/definitions';
import EditTable from '@/app/ui/cardsets/edit-table'
import CreateTable from '@/app/ui/cardsets/create-table';
import { CheckIcon } from '@heroicons/react/24/outline';
import CardsetsTable from '@/app/ui/cardsets/table';

export interface CreateProps {
    isShown: boolean;
    hide: () => void;
    headerText: string;
    fcl: Flashcard[];
}

export const CreateCSModal: FunctionComponent<CreateProps> = ({
    isShown,
    hide,
    headerText,
    fcl
}) => {
    const initialState = {
        message: "",
        errors: {
            title: [],
            // created_by: [],
            // share: [],
        }
    }

    let cards: string[] = []
    const [shareProp, setShareP] = useState<boolean>(true)
    const [shareText, setShareT] = useState<string>("Public")
    const shareToggle = () => {
        if (shareProp) {
            setShareT("Private")
            setShareP(false)
        } else {
            setShareT("Public")
            setShareP(true)
        }
    }

    const createCardsetWithCards = createCardset.bind(null, cards, shareProp)
    const [state, formAction] = useFormState(createCardsetWithCards, initialState)

    useEffect(() => {
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
                                        {state?.errors?.title &&
                                            state?.errors.title.map((error: string) => (
                                                <p className="mt-2 text-sm text-red-500" key={error}>
                                                    {error}
                                                </p>
                                            ))}
                                    </div>
                                </div>
                                <CreateTable fcl={fcl} cs={cards} />
                                {/* <TempTable fcl={fcl.flashcards}/> */}
                                <div className="grid grid-cols-2 items-center mt-6">
                                    <div className="flex justify-start">
                                        <Button
                                            type="button"
                                            onClick={shareToggle}
                                            className="w-1/3 text-lg justify-center"
                                        >
                                            {shareText}
                                        </Button>
                                    </div>
                                    <div className="flex justify-end gap-4">
                                        <Button type="button" onClick={hide} className="w-1/3 text-lg justify-center">Cancel</Button>
                                        <Button type="submit" className="w-1/3 text-lg justify-center">Save + Close</Button>
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

export interface ViewProps {
    isShown: boolean;
    hide: () => void;
    cs: Cardsets_Helper;
}

export const ViewCSModal: FunctionComponent<ViewProps> = ({
    isShown,
    hide,
    cs
}) => {

    const [cardList, setNext] = useState<Flashcard[]>(cs.cs_view.slice())

    const [cardView, flipText] = useState<any>()

    useEffect(() => {
        if (cardList.length > 0) {
            flipText(cardList[0].front_text)
        }
    }, [cardList])

    const flipCard = () => {
        if (cardList.length > 0) {
            if (cardView == cardList[0].front_text) {
                flipText(cardList[0].back_text)
            } else {
                flipText(cardList[0].front_text)
            }
        }
    }

    const goodAnswer = () => {
        cardList.shift()
        // const tempList = cardList.slice(1)
        if (cardList.length > 0) {
            setNext(cardList)
            flipText(cardList[0].front_text)
        } else {
            setNext(cs.cs_view.slice())
            hide()
        }
    }
    const badAnswer = () => {
        cardList.push(cardList[0])
        cardList.shift()
        setNext(cardList)
        flipText(cardList[0].front_text)
    }

    const view_modal = (
        <React.Fragment>
            <Backdrop />
            <Wrapper>
                <StyledModal>
                    <Header>
                        <HeaderText>{cs.title}</HeaderText>
                        <CloseButton onClick={hide}>X</CloseButton>
                    </Header>
                    <Content>
                        <div className="relative flex flex-col items-center ">
                            <button
                                onClick={() => flipCard()}
                                className="w-3/4 h-[50vh] content-center mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                            // className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 text-center"
                            >
                                {cardView}
                            </button>
                        </div>
                        <div className="relative flex flex-row justify-center">
                            <button
                                onClick={() => goodAnswer()}
                                className="flex h-10 items-center rounded-lg bg-green-600 px-20 py-5 m-10 text-sm font-medium text-white transition-colors 
                    hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                            >
                                <CheckIcon className="h-6" />
                            </button>
                            <button
                                onClick={() => badAnswer()}
                                className="flex h-10 items-center rounded-lg bg-red-600 px-20 py-5 m-10 text-sm font-medium text-white transition-colors 
                    hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                X
                            </button>
                        </div>
                    </Content>
                </StyledModal>
            </Wrapper>
        </React.Fragment>
    )
    return isShown ? ReactDOM.createPortal(view_modal, document.body) : null;
}

export interface EditProps {
    isShown: boolean;
    hide: () => void;
    headerText: string;
    cs: Cardsets_Helper;
}

export const EditCSModal: FunctionComponent<EditProps> = ({
    isShown,
    hide,
    headerText,
    cs
}) => {



    const [shareProp, setShareP] = useState<boolean>(cs.share)
    const [shareText, setShareT] = useState<string>(cs.share ? "Public" : "Private")
    const shareToggle = () => {
        if (shareProp) {
            setShareT("Private")
            setShareP(false)
        } else {
            setShareT("Public")
            setShareP(true)
        }
    }

    const initialState = {
        message: "",
        errors: {
            title: [],
            // created_by: [],
            // share: [],
        }
    }

    const updateCardsetWithCards = updateCardset.bind(null, cs.csid, cs.cards, shareProp)
    const [state, formAction] = useFormState(updateCardsetWithCards, initialState)

    useEffect(() => {
        if (state?.message === "updated") {
            // console.log("using effect")
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
                                        htmlFor="title"
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
                                            defaultValue={cs.title}
                                            required
                                        />
                                    </div>
                                    <div id="title-error" aria-live="polite" aria-atomic="true">
                                        {state?.errors?.title &&
                                            state?.errors.title.map((error: string) => (
                                                <p className="mt-2 text-sm text-red-500" key={error}>
                                                    {error}
                                                </p>
                                            ))}
                                    </div>
                                </div>
                                <EditTable fcl={cs.cs_fcl} cs={cs} />
                                <div className="grid grid-cols-2 items-center mt-6">
                                    <div className="flex justify-start">
                                        <Button
                                            type="button"
                                            onClick={shareToggle}
                                            className="w-1/3 text-lg justify-center"
                                        >
                                            {shareText}
                                        </Button>
                                    </div>
                                    <div className="flex justify-end gap-4">
                                        <Button type="button" onClick={hide} className="w-1/3 text-lg justify-center">Cancel</Button>
                                        <Button type="submit" className="w-1/3 text-lg justify-center">Save + Close</Button>
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