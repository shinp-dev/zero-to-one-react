import { useState } from 'react';

const users = ['Aki', 'Mika', 'Shun'];

export default function App() {
  const [firstName, setFirstName] = useState('Aki');
  const [lastName, setLastName] = useState('Tanaka');
  const [searchText, setSearchText] = useState('');

  // Props / Stateから計算できる値はEffectで同期しない。
  const fullName = `${firstName} ${lastName}`;
  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <main>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <p>{fullName}</p>

      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search users"
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </main>
  );
}
