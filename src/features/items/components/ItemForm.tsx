import React, { useState } from 'react';
import { createItem } from '../services/itemsApi';

export const ItemForm: React.FC<{ onAdd: () => void }> = ({ onAdd }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async () => {
        await createItem({ firstName, lastName, email, role });
        setFirstName('');
        setLastName('');
        setEmail('');
        setRole('');
        onAdd();
    };

    return (
        <div>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" />
            <button onClick={handleSubmit}>Add</button>
        </div>
    );
};
