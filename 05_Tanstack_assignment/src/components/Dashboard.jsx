import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get_user, add_user, delete_user, update_user } from '../api/Dashboard_api_requests';

const Dashboard = () => {
    const [newUser, setNewUser] = useState(
        { first_name: '', 
           last_name: '' });
    const queryClient = useQueryClient();

    const { data: users, isLoading, isError, error: queryError } = useQuery({
        queryKey: ['users'],
        queryFn: get_user,
    });

    const mutation = useMutation({
        mutationFn: add_user,
        onSuccess: () => {
            console.log("user added successfully");
            queryClient.invalidateQueries(['users']);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(newUser);
    };

    const deleteMutation = useMutation({
        mutationFn: delete_user,
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        },
    });

    const handleDelete = (userId) => {
        deleteMutation.mutate(userId);
    };

    const [editUser, setEditUser] = useState(null);
    const [editUserId, setEditUserId] = useState(null);
    const [editedUser, setEditedUser] = useState({ first_name: '', last_name: '' });

    const updateMutation = useMutation({
        mutationFn: update_user,
        onSuccess: () => {
            console.log("ho gya user update");
            queryClient.invalidateQueries(['users']);
            setEditUserId(null); 
            setEditedUser({ first_name: '', last_name: '' }); 
        },
    });

    const handleEdit = (user) => {
        setEditUserId(user.id);
        setEditedUser({ first_name: user.first_name, last_name: user.last_name });
    };

    const handleUpdate = () => {
        updateMutation.mutate({ ...editedUser, id: editUserId });
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching users: {queryError.message}</p>;

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users?.map((user) => (
                    <li key={user.id}>
                        {user.first_name} {user.last_name}
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                        <button onClick={() => handleEdit(user)}>Update</button>
                        {editUserId === user.id && (
                            <>
                                <input
                                    type="text"
                                    onChange={(e) => setEditedUser({ ...editedUser, first_name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    onChange={(e) => setEditedUser({ ...editedUser, last_name: e.target.value })}
                                />
                                <button onClick={handleUpdate}>Save</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newUser.first_name}
                    onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                />
                <input
                    type="text"
                    value={newUser.last_name}
                    onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default Dashboard;