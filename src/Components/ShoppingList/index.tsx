import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  StyledShoppingListContainer,
  Item,
  Button,
  Title,
  InputContainer,
  RemainingItems,
  ClearButtonContainer,
} from "./styles";

interface ItemType {
  id: string;
  name: string;
  checked: boolean;
}

const ShoppingList = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [newItem, setNewItem] = useState("");
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const savedItems = localStorage.getItem("shoppingList");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("shoppingList", JSON.stringify(items));
    } else {
      localStorage.removeItem("shoppingList");
    }
  }, [items]);

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, { id: uuidv4(), name: newItem, checked: false }]);
      setNewItem("");
    } else {
      alert("O nome do item não pode estar vazio!");
    }
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const toggleChecked = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const editItem = (id: string) => {
    setEditingItem(id);
    setEditText(items.find((item) => item.id === id)?.name || "");
  };

  const saveEdit = (id: string) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, name: editText } : item))
    );
    setEditingItem(null);
    setEditText("");
  };

  const clearAllItems = () => {
    setItems([]);
  };

  const uncompletedItems = items.filter((item) => !item.checked).length;

  return (
    <StyledShoppingListContainer>
      <Title>Lista de Mercado</Title>
      <InputContainer>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Adicionar novo item"
          aria-label="Novo item de compra"
        />
        <Button onClick={addItem}>Adicionar</Button>
      </InputContainer>
      {items.map((item) => (
        <Item key={item.id} isChecked={item.checked}>
          {editingItem === item.id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                aria-label={`Editar item ${item.name}`}
              />
              <Button onClick={() => saveEdit(item.id)}>Salvar</Button>
            </>
          ) : (
            <>
              <span>{item.name}</span>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleChecked(item.id)}
                aria-label={`Marcar ${item.name} como completo`}
              />
              <Button onClick={() => deleteItem(item.id)}>Excluir</Button>
              <Button onClick={() => editItem(item.id)}>Editar</Button>
            </>
          )}
        </Item>
      ))}
      {items.length > 0 && (
        <RemainingItems>{uncompletedItems} itens restantes</RemainingItems>
      )}
      {items.length > 0 && (
        <ClearButtonContainer>
          <Button onClick={clearAllItems}>Limpar Tudo</Button>
        </ClearButtonContainer>
      )}
    </StyledShoppingListContainer>
  );
};

export default ShoppingList;
