// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFireAlerts } from "../hooks/useFireAlerts";

const Home = () => {
  const { fetchFireAlerts } = useFireAlerts();
  const [fireAlerts, setFireAlerts] = useState([]);
  const getFireAlerts = async () => {
    const alerts = await fetchFireAlerts();
    setFireAlerts(alerts);
  };
  // Fetch recent fire alerts on component mount
  useEffect(() => {
    getFireAlerts();
  }, [fetchFireAlerts]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Forest Fire Alert System</h1>
          <nav>
            <Link to="/dashboard" className="mx-4 hover:underline">
              Dashboard
            </Link>
            <Link to="/login" className="mx-4 hover:underline">
              Login
            </Link>
            <Link to="/register" className="mx-4 hover:underline">
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <section className="text-center mb-8">
          <h2 className="text-3xl font-semibold mb-4">
            Welcome to the Forest Fire Alert System
          </h2>
          <p className="text-lg mb-4">
            Stay informed about the latest forest fire alerts in Uttarakhand.
            Our system provides real-time updates and predictions to help you
            stay safe.
          </p>
          {/* Updated image path */}
          <img
            src="/images\Forest_background.jpg"
            alt="Forest Fire Alert"
            className="mx-auto w-full max-w-md rounded-lg shadow-lg"
          />
        </section>

        {/* Recent Fire Alerts */}
        <section>
          <h3 className="text-2xl font-semibold mb-4">Recent Fire Alerts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fireAlerts.length > 0 ? (
              fireAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <h4 className="text-xl font-semibold">{alert.description}</h4>
                  <p className="text-gray-600">Location: {alert.location}</p>
                  <p className="text-gray-600">
                    Date: {new Date(alert.created_at).toLocaleDateString()}
                  </p>
                  {alert.image_url && (
                    <img
                      src={alert.image_url}
                      alt="Fire Alert"
                      className="mt-2 w-full h-32 object-cover rounded-lg"
                    />
                  )}
                </div>
              ))
            ) : (
              <p>No recent fire alerts available.</p>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} Forest Fire Alert System. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
