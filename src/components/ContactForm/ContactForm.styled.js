import { default as styled } from 'styled-components';

export const ContactFormStyled = styled.form`
  width: ${(props) => props.theme.sizes.formInputWidth + 20}px;
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 20px;
`;