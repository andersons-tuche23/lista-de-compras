import styled from 'styled-components';

interface ItemProps {
  isChecked: boolean;
}

export const StyledShoppingListContainer = styled.div`
  width: 400px;
  margin: 20px auto;
  padding: 20px;
  background: linear-gradient(145deg, #f9f9f9, #e4e4e4);
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

export const Title = styled.h1`
  font-family: sans-serif;
  font-size: 20px;
  text-align: center;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;

  input {
    border-radius: 8px;
    padding-left: 10px;
  }

  &::placeholder {
    margin-left: 10px;
    color: #888; 
    opacity: 1; 
  }
`;

export const Item = styled.div<ItemProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: ${({ isChecked }) => (isChecked ? '#d4f7d4' : '#ffffff')};
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  margin-top: 15px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const Button = styled.button`
  background-color: #ff6666;
  border: none;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #ff4c4c;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const ClearButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; 
  margin-top: 20px; 
`;

export const RemainingItems = styled.p`
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
`;
