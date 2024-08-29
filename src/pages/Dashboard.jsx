// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useFireAlerts } from '../hooks/useFireAlerts';
import { supabase } from '../services/supabase';
import Map from '../components/Map'; // Import the Map component

const Dashboard = () => {
  const { fetchFireAlerts } = useFireAlerts();
  const [fireAlerts, setFireAlerts] = useState([]);
  const [newAlert, setNewAlert] = useState({
    description: '',
    location: '',
    image: null,
  });

  // Fetch fire alerts on component mount
  useEffect(() => {
    const getFireAlerts = async () => {
      const alerts = await fetchFireAlerts();
      setFireAlerts(alerts);
    };
    getFireAlerts();
  }, [fetchFireAlerts]);

  // Handle file change for image upload
  const handleFileChange = (e) => {
    setNewAlert({
      ...newAlert,
      image: e.target.files[0],
    });
  };

  // Handle form submission to upload new fire alert
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image to Supabase Storage
    let imageUrl = '';
    if (newAlert.image) {
      const { data, error: uploadError } = await supabase.storage
        .from('fire-alerts')
        .upload(`public/${newAlert.image.name}`, newAlert.image);
        
      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        return;
      }
      
      // Get public URL of the uploaded image
      const { publicURL, error: urlError } = supabase.storage
        .from('fire-alerts')
        .getPublicUrl(`public/${newAlert.image.name}`);
      
      if (urlError) {
        console.error('Error getting public URL:', urlError);
        return;
      }
      
      imageUrl = publicURL;
    }

    // Insert new fire alert into Supabase database
    const { error } = await supabase
      .from('Fire_Alerts')
      .insert([{ description: newAlert.description, location: newAlert.location, image_url: imageUrl }]);

    if (error) {
      console.error('Error inserting fire alert:', error);
    } else {
      // Refresh the fire alerts list
      const alerts = await fetchFireAlerts();
      setFireAlerts(alerts);
      // Clear the form
      setNewAlert({
        description: '',
        location: '',
        image: null,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Fire Alerts List */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Fire Alerts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fireAlerts.length > 0 ? (
              fireAlerts.map((alert) => (
                <div key={alert.id} className="bg-white p-4 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold">{alert.description}</h4>
                  <p className="text-gray-600">Location: {alert.location}</p>
                  <p className="text-gray-600">Date: {new Date(alert.created_at).toLocaleDateString()}</p>
                  {alert.image_url && (
                    <img src={alert.image_url} alt="Fire Alert" className="mt-2 w-full h-32 object-cover rounded-lg" />
                  )}
                </div>
              ))
            ) : (
              <p>No fire alerts available.</p>
            )}
          </div>
        </section>

        {/* New Fire Alert Form */}
        <section>
          <h2 className="text-3xl font-semibold mb-4">Add New Fire Alert</h2>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="description">
                Description
              </label>
              <input
                type="text"
                id="description"
                value={newAlert.description}
                onChange={(e) => setNewAlert({ ...newAlert, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="location">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={newAlert.location}
                onChange={(e) => setNewAlert({ ...newAlert, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="image">
                Image
              </label>
              <input
                type="file"
                id="image"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </section>

        {/* Map Component */}
        <section className="mt-8">
          <h2 className="text-3xl font-semibold mb-4">Fire Locations Map</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Integrate the Map Component */}
            <Map fireAlerts={fireAlerts} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Forest Fire Alert System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
