import styled from 'styled-components';

export const OuterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding-top: 40px;
  padding-bottom: 100px;
`;

export const FormContainer = styled.div`
  display: grid;
  place-items: center;
  flex-grow: 2;
  width: max(624px, 50%);
`;

export const FormDiv = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 48px;
  border-radius: 15px;
  margin: auto 0;
  width: 100%;
  box-shadow: 3px 3px 13px 8px rgba(0, 0, 0, 0.05);
`;

export const LineDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.25rem;
  width: 100%;
`;
