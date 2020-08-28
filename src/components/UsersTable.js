import React, { useState, useEffect } from 'react';

export default function UsersTable({ users }) {
    const [sorts, setSorts] = useState({
        firstName: 0,
        lastName: 0
    })
    const upDateSort = name => {
        setSorts({
            ...sorts,
            [name]: (sorts[name] + 1) % 3
        })
    }

    const [filters, setFilters] = useState({
        firstName: "",
        lastName: ""
    })
    const updateFilter = (name, newValue) => {
        setFilters({
            ...filters,
            [name]: newValue.toLowerCase()
        })
    }

    const visableUsers = users.filter((user) => {
        if (!user.firstName.toLowerCase().includes(filters.firstName)) return false;
        if (!user.lastName.toLowerCase().includes(filters.lastName)) return false;


        return true;
    }).sort((a, b) => {
        let result = 0
        if (sorts.firstName) {
            result = a.firstName.localeCompare(b.firstName)
            if (sorts.firstName === 2) result *= -1;
            if (result) return result;
        }
        if (sorts.lastName) {
            result = a.lastName.localeCompare(b.lastName)
            if (sorts.lastName === 2) result *= -1;
            if (result) return result;
        }

        return result
    })
    return (
        <table>
            <thead>
                <tr>
                    <th onClick={() => upDateSort("firstName")}>
                        first
                        {sorts.firstName ? sorts.firstName === 1 ? '↓' : '↑' : ' '}
                    </th>
                    <th onClick={() => upDateSort("lastName")}>
                        last
                        {sorts.lastName ? sorts.lastName === 1 ? '↓' : '↑' : ' '}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <input placeholder="First" value={filters.firstName} onChange={(e) => updateFilter("firstName", e.target.value)} />
                    </td>
                    <td>
                        <input placeholder="Last" value={filters.lastName} onChange={(e) => updateFilter("lastName", e.target.value)} />
                    </td>
                </tr>
                {visableUsers.map((user) =>
                    <tr key={user.id} >
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}