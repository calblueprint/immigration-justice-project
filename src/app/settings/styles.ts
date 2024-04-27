import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 6.25rem 0;
`;

export const ContentContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: min(720px, 96%);
  margin: 0 auto;
  gap: 2.5rem;
`;

export const ButtonContainer = styled.footer`
  display: flex;
  gap: 2.5rem;
`;
