import { default as styled } from 'styled-components';

export const ContactListStyled = styled.ul`
    list-style: square;
    & > li:not(:last-of-type){
        margin-bottom: 10px;
    }
`;

export const ContactItem = styled.li`
    display: flex;
    gap: 5px;
`;