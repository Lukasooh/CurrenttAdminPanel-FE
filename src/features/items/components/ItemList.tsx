import React, { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../services/itemsApi';
import { Item } from '../types';

export const ItemList: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);

    const fetchItems = async () => {
        const data = await getItems();
        setItems(data);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleDelete = async (id: string) => {
        await deleteItem(id);
        fetchItems();
    };

    return (
        <ul>
            {items.map((item) => (
                <li key={item.id}>
                    {item.firstName} {item.email}
                    <button onClick={() => handleDelete(item.id)}>❌</button>
                </li>
            ))}
        </ul>
    );
};
