import styled from 'styled-components';

export const TextInputNotSelected = styled.div`
  display: flex;
  flex-direction: column;
`; 

export const InputSuggestionText = styled.p`
  color: #B3B3B3;
  font-size: 16px;
  font-family: Inter;
  font-weight: 400;
  line-height: 19.20px;
  word-wrap: break-word
`
export const ExistingInputText = styled.input`
  color: #565656;
  font-size: 16px;
  font-family: Inter;
  font-weight: 400;
  line-height: 19.20px;
  word-wrap: break-word
`
/*
export const ErrorInputText = styled.p`
  color: #D13E40;
  font-size: 16px;
  font-family: Inter;
  font-weight: 400;
  line-height: 19.20px;
  word-wrap: break-word
`
*/ 
export const ErrorInputText = styled.input`
  ...ExistingInputText, 
  color: #D13E40;
`

export const InputTitleText = styled.h1`
  color: #555555;
  font-size: 24px;
  font-family: Inter;
  font-weight: 500;
  line-height: 28.80px;
  word-wrap: break-word
`