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
      font-size: 19px;
    }
  }
  .tab-menu-list {
    position: fixed;
    left: 0;
    top: 0;
    z-index: -10;
    opacity: 0;
    width: 0;
    height: 0;
    overflow: hidden;
    visibility: hidden;
    gap: 1rem;
    .chakra-tabs__tab {
      gap: 5px;
      border: 1px solid #2f855a;
      color: #2f855a;
      &[aria-selected="true"] {
        color: #fff;
      }
      svg {
        font-size: 1.2rem;
        margin-top: 1px;
      }
      font-size: 1rem;
    }
  }
  .table-header {
  }
  .btn-top-move {
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    z-index: 10;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.25);
    font-size: 1.5rem;
  }
`;

export const TabMenuStyle = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
  li button {
    padding: 1rem 1.2rem;
    background-color: #fff;
    border: 1px solid #ccc;
    color: #555;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 13px;
    font-size: 1rem;
    font-weight: 600;
    gap: 7px;
    transition: all 0.3s;
    svg {
      font-size: 1.2rem;
    }
    &.on {
      background-color: #2f855a;
      border-color: #2f855a;
      color: #fff;
      &:hover {
        background-color: #29754f;
        border-color: #29754f;
      }
    }
    &:hover {
      border-color: #2f855a;
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
  border-top: 2px solid #555;
  border-bottom: 1px solid #555;
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
