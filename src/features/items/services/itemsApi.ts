import { Item } from '../types';

const API_URL = 'http://localhost:3000/items';

export const getItems = async (): Promise<Item[]> => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createItem = async (item: Omit<Item, 'id'>) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return res.json();
};

export const deleteItem = async (id: string) => {
  const token = localStorage.getItem('access_token');
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
};
