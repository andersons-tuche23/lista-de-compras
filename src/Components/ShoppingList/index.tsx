import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { StyledShoppingListContainer, Item, Button, Title, InputContainer } from './styles'; 

interface ItemType {
  id: string;
  name: string;
  checked: boolean;
}

const ShoppingList = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [newItem, setNewItem] = useState('');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, { id: uuidv4(), name: newItem, checked: false }]);
      setNewItem('');
    }
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const toggleChecked = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const editItem = (id: string) => {
    setEditingItem(id);
    setEditText(items.find(item => item.id === id)?.name || '');
  };

  const saveEdit = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, name: editText } : item
    ));
    setEditingItem(null);
    setEditText('');
  };

  return (
    <StyledShoppingListContainer>
      <Title>Lista de Mercado</Title>
      <InputContainer>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add new item"
      />
      <Button onClick={addItem}>Adicionar</Button>
      </InputContainer>
      {items.map(item => (
        <Item key={item.id} isChecked={item.checked}>
          {editingItem === item.id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <Button onClick={() => saveEdit(item.id)}>Save</Button>
            </>
          ) : (
            <>
              <span>{item.name}</span>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleChecked(item.id)}
              />
              <Button onClick={() => deleteItem(item.id)}>Delete</Button>
              <Button onClick={() => editItem(item.id)}>Edit</Button>
            </>
          )}
        </Item>
      ))}
    </StyledShoppingListContainer>
  );
};

export default ShoppingList;
