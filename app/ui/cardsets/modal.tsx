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
import { Cardset, Cardsets_Flashcards_Helper, Cardsets_Helper, Flashcard } from '@/app/lib/definitions';
import EditTable from '@/app/ui/cardsets/edit-table'
import CreateTable from '@/app/ui/cardsets/create-table';
import { effect } from 'zod';
import { toggle } from '@nextui-org/react';

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

    const updateCardsetWithCards = createCardset.bind(null, cards)
    const [state, formAction] = useFormState(updateCardsetWithCards, initialState)

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

export interface ViewProps{
    isShown: boolean;
    hide: () => void;
    cs: Cardsets_Helper;
}

export const ViewCSModal: FunctionComponent<ViewProps> = ({
    isShown,
    hide,
    cs
}) => {

    const [cardList, setNext] = useState<Flashcard[]>(cs.cs_view)
    let ft = ''
    if (cardList.length > 0){
        ft = cardList[0].front_text
    }
    const [cardView, flipText] = useState<any>(ft)

    const flipCard = () => {
        if(cardList.length > 0){
            if (cardView == cardList[0].front_text) {
                flipText(cardList[0].back_text)
              } else {
                flipText(cardList[0].front_text)
              }
        }
    }

    const goodAnswer = () => {
        // cardList.shift()
        if(cardList.length > 0){
            setNext(cardList.slice(1))
            flipText(cardList[0].front_text)
        } else{
            setNext(cs.cs_view)
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
                <div className="relative flex flex-col">
                    <button
                    onClick={() => goodAnswer()}
                    className="content-center mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                    >
                        GOOD
                    </button>
                    <button
                    onClick={() => badAnswer()}
                    className="content-center mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                    >
                        BAD
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

    const initialState = {
        message: "",
        errors: {
            title: [],
            // created_by: [],
            // share: [],
        }
    }

    const updateCardsetWithCards = updateCardset.bind(null, cs.csid, cs.cards)
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