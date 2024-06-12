import React, { FunctionComponent } from 'react';
import ReactDOM, { useFormState } from 'react-dom';

import {
  Wrapper,
  Header,
  StyledModal,
  HeaderText,
  CloseButton,
  Content,
  Backdrop,
} from './modal.style';
import { Button } from './button';
import { createFlashcard } from '../lib/actions';

export interface ModalProps {
  isShown: boolean;
  hide: () => void;
  saveAndClose: () => void;
  modalContent: JSX.Element;
  headerText: string;
}

export const Modal: FunctionComponent<ModalProps> = ({
  isShown,
  hide,
  saveAndClose,
  modalContent,
  headerText,
}) => {
  // const initialState = {
  //   message: "",
  //   errors: {
  //     front_text: [],
  //     back_text: [],
  //     front_img: [],
  //     back_img: []
  //   }
  // }
  // const [state, dispatch] = useFormState(createFlashcard, initialState);
  
  const modal = (
    <React.Fragment>
      <Backdrop />
      <Wrapper>
        <StyledModal>
          <Header>
            <HeaderText>{headerText}</HeaderText>
            <CloseButton onClick={hide}>X</CloseButton>
          </Header>
          {/* <form action={dispatch}> */}
            <Content>{modalContent}</Content>
            <div className="mt-6 flex justify-end gap-4 mr-6 pb-6">
              <Button type="button" onClick={hide}>Cancel</Button>
              {/* <Button type="submit">Save + Close</Button> */}
            </div>
          {/* </form> */}
        </StyledModal>
      </Wrapper>
    </React.Fragment>
  );

  return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};