import styled from "styled-components";

export const WrapperStyle = styled.div`
  width: 100%;
  .container {
    padding-bottom: 3rem;
  }
  .content-box {
    padding: 1.5rem;
  }
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
    gap: 3px;
    border-top: 1px solid #ddd;
    padding: 2rem 0;
    svg {
      font-size: 17px;
      margin-top: 2px;
    }
  }
  .view-header {
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 1rem 0;
    .chakra-checkbox__label {
      font-size: 13px;
    }
  }
  .top-info {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    color: #555;
    gap: 4px;
    padding-left: 2px;
    margin-bottom: 1rem;
  }
  .tab-table-box {
    padding: 0;
  }
  .excel-btn-box {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    gap: 10px;
  }
  .btn-exit {
    display: flex;
    align-items: center;
    gap: 5px;
    width: 400px;
    height: 60px;
  }
  .btn-delete {
    right: 0;
    width: auto;
    height: 60px;
    svg {
      font-size: 20px;
    }
  }
`;

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
