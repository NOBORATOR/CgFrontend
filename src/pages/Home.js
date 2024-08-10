import React from 'react';
import { NavLink } from 'react-router-dom';

export function Home() {
  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="bg-cover bg-center h-96" style={{ backgroundImage: "url('BG IMAGE LINK')" }}>
        <div className="container mx-auto h-full flex flex-col justify-center items-center text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900">Join the Ultimate Tournament Experience</h2>
          <p className="text-lg md:text-2xl mt-4 text-gray-700">Compete in tournaments, connect with friends, and elevate your gaming skills.</p>
          <NavLink to={'/tournament'} className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">Register Now</NavLink>
        </div>
      </section>

      {/* Tournaments Section */}
      <section id="tournaments" className="py-12">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Tournaments</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Example Tournament Cards */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold text-gray-900">Tournament 1</h4>
              <p className="mt-2 text-gray-700">GARENA</p>
              <p className="mt-2 text-gray-700">Game: FREE FIRE</p>
              <NavLink to={'/tournament'} className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Register</NavLink>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold text-gray-900">Tournament 2</h4>
              <p className="mt-2 text-gray-700">KRAFTON, Inc</p>
              <p className="mt-2 text-gray-700">BGMI</p>
              <NavLink to={'/tournament'} className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Register</NavLink>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold text-gray-900">Tournament 3</h4>
              <p className="mt-2 text-gray-700">UPCOMING MORE GAMES</p>
              <p className="mt-2 text-gray-700">Game: CS:GO, COD, ETC</p>
              <NavLink to={'/tournament'} className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Register</NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Connect with Friends Section */}
      <section id="connect" className="py-12 bg-gray-200">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Connect with Friends</h3>
          <p className="text-lg text-gray-700 mb-4">Stay connected with your gaming community. Invite friends, form teams, and chat with fellow gamers.</p>
          <NavLink to={'/friends'} className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700">Start Connecting</NavLink>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 p-4 text-center">
        <p className="text-gray-900">&copy; 2024 Nobo & Ayu All rights reserved.</p>
      </footer>
    </div>
  );
};
