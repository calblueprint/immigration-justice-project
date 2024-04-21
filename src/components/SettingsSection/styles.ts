import COLORS from '@/styles/colors';
import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 0.625rem;
  border: 1px solid ${COLORS.blueMid};
  padding: 3rem;
  gap: 2.5rem;
`;

export const SectionHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const EditButton = styled.button`
  width: 1.875rem;
  height: 1.875rem;
  background: none;
  border: none;
  cursor: pointer;

  background-image: url('data:image/svg+xml,%3csvg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg"%3e%3cg clip-path="url(%23clip0_1777_5841)"%3e%3cpath d="M27.6328 1.77148C26.3496 0.488281 24.2754 0.488281 22.9922 1.77148L21.2285 3.5293L26.9648 9.26563L28.7285 7.50195C30.0117 6.21875 30.0117 4.14453 28.7285 2.86133L27.6328 1.77148ZM10.1016 14.6621C9.74414 15.0195 9.46875 15.459 9.31055 15.9453L7.57617 21.1484C7.40625 21.6523 7.54102 22.209 7.91602 22.5898C8.29102 22.9707 8.84766 23.0996 9.35742 22.9297L14.5605 21.1953C15.041 21.0371 15.4805 20.7617 15.8438 20.4043L25.6465 10.5957L19.9043 4.85352L10.1016 14.6621ZM5.625 4.25C2.51953 4.25 0 6.76953 0 9.875V24.875C0 27.9805 2.51953 30.5 5.625 30.5H20.625C23.7305 30.5 26.25 27.9805 26.25 24.875V19.25C26.25 18.2129 25.4121 17.375 24.375 17.375C23.3379 17.375 22.5 18.2129 22.5 19.25V24.875C22.5 25.9121 21.6621 26.75 20.625 26.75H5.625C4.58789 26.75 3.75 25.9121 3.75 24.875V9.875C3.75 8.83789 4.58789 8 5.625 8H11.25C12.2871 8 13.125 7.16211 13.125 6.125C13.125 5.08789 12.2871 4.25 11.25 4.25H5.625Z" fill="%23292929"/%3e%3c/g%3e%3cdefs%3e%3cclipPath id="clip0_1777_5841"%3e%3crect width="30" height="30" fill="white" transform="translate(0 0.5)"/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e');
  background-repeat: no-repeat;
  background-size: 1.875rem 1.875rem;
  background-position: center;
`;

export const SectionRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 1.25rem;
`;

export const KeyValueBlurb = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.25rem;
`;
