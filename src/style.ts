import styled from "styled-components";

// Styled Components
export const Table = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const Header = styled.li`
  font-weight: bold;
  border-bottom: 2px solid #000;
  display: flex;
  font-size: 12px;
  background-color: #f1f1f1;
`;

export const Row = styled.li`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
`;

export const Cell = styled.span`
  padding: 0.5rem;
  text-align: left;
  border-right: 1px solid #ccc;
  input::placeholder {
    color: #bbb;
  }
  input:read-only {
    background-color: #f1f1f1;
    color: #aaa;
  }
  &:last-child {
    border-right: none;
  }
`;
