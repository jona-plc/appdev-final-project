'use client';
import { useState } from 'react';

const userSchema = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: '',
  mapType: 'address', // 'address' or 'iframe'
  mapInput: '',
};

export default function UserRegisterPage() {
  const [newUser, setNewUser] = useState(userSchema);
  const [mapUrl, setMapUrl] = useState('');
  const [modalState, setModalState] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [modalType, setModalType] = useState<'success' | 'error'>('success');

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const updatedUser = { ...newUser, [e.target.name]: e.target.value };
    setNewUser(updatedUser);

    if (e.target.name === 'mapInput' || e.target.name === 'mapType') {
      let input = e.target.name === 'mapType' ? newUser.mapInput : e.target.value;
      let mapType = e.target.name === 'mapType' ? e.target.value : newUser.mapType;
      let url = '';

      if (mapType === 'address') {
        const encoded = encodeURIComponent(input);
        url = `https://www.openstreetmap.org/export/embed.html?search=${encoded}`;
      } else if (mapType === 'iframe') {
        const match = input.match(/src\s*=\s*"([^"]+)"/);
        url = match ? match[1].replace(/&amp;/g, '&') : input.trim();
      }

      setMapUrl(url);
    }
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation before registration
    if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.phoneNumber || !newUser.mapInput) {
      setModalType('error');
      setModalMessage('Please fill out all fields.');
      setModalState(true);
      return;
    }

    // Simulate user registration success
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    setNewUser(userSchema);
    setMapUrl('');

    setModalType('success');
    setModalMessage('User Registered Successfully!');
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center mt-20">User Registration</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-10">
          <form onSubmit={handleUserSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input type="text" name="firstName" value={newUser.firstName} onChange={handleUserChange} className="w-full p-2 mt-1 border rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" name="lastName" value={newUser.lastName} onChange={handleUserChange} className="w-full p-2 mt-1 border rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" value={newUser.email} onChange={handleUserChange} className="w-full p-2 mt-1 border rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="text" name="phoneNumber" value={newUser.phoneNumber} onChange={handleUserChange} className="w-full p-2 mt-1 border rounded-lg" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Map Input Type</label>
              <select name="mapType" value={newUser.mapType} onChange={handleUserChange} className="w-full p-2 mt-1 border rounded-lg">
                <option value="address">Full Address</option>
                <option value="iframe">OpenStreetMap Iframe URL or HTML</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {newUser.mapType === 'address'
                  ? 'Enter Full Address'
                  : 'Paste iframe URL or full iframe HTML'}
              </label>
              <input
                type="text"
                name="mapInput"
                value={newUser.mapInput}
                onChange={handleUserChange}
                className="w-full p-2 mt-1 border rounded-lg"
                required
              />
            </div>

            {mapUrl && (
              <div className="mt-6">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Map Preview:</h2>
                <iframe
                  className="w-full h-72 border rounded-lg"
                  src={mapUrl}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            )}

            <button type="submit" className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-lg">Register</button>
          </form>
        </div>

        {/* Modal */}
        {modalState && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
            <div className={`bg-white p-6 rounded-lg shadow-md w-96 ${modalType === 'error' ? 'border-red-500' : 'border-green-500'}`}>
              <h2 className="text-xl font-semibold text-center text-gray-800">{modalType === 'error' ? 'Error' : 'Success'}</h2>
              <p className="mt-4 text-center text-gray-600">{modalMessage}</p>
              <button
                onClick={closeModal}
                className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
