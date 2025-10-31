import React from 'react';
import { Page, UserBooking } from '../types';
import Icon from './icons/IconMap';

interface DashboardProps {
    navigateTo: (page: Page) => void;
    userName: string;
    needsSeeding: boolean;
    onSeedData: () => void;
    userBooking: UserBooking | null;
}

const serviceOptions = [
    { name: 'Room Book', description: 'Find and book a new room', icon: 'Room Book', page: Page.RoomBooking, color: 'bg-blue-100', textColor: 'text-blue-800' },
    { name: 'Room Change', description: 'Request to change your room', icon: 'Room Change', page: Page.RoomChange, color: 'bg-green-100', textColor: 'text-green-800' },
    { name: 'Laundry Service', description: 'Submit clothes for laundry', icon: 'Laundry', page: Page.LaundryService, color: 'bg-purple-100', textColor: 'text-purple-800' },
    { name: 'Mess Menu', description: 'View the weekly meal plan', icon: 'Dinner', page: Page.MessMenu, color: 'bg-orange-100', textColor: 'text-orange-800' },
    { name: 'Hostel Complain', description: 'Submit any issues or complaints', icon: 'Hostel Complain', page: Page.Complaint, color: 'bg-red-100', textColor: 'text-red-800' },
    { name: 'Feedback', description: 'Share your experience with us', icon: 'Feedback', page: Page.Feedback, color: 'bg-yellow-100', textColor: 'text-yellow-800' },
    { name: 'Personal Details', description: 'Update your contact and guardian info', icon: 'Personal Details', page: Page.PersonalDetails, color: 'bg-teal-100', textColor: 'text-teal-800' },
    { name: 'Late Entry', description: 'Request for late entry to the hostel', icon: 'Late Entry', page: Page.LateEntry, color: 'bg-indigo-100', textColor: 'text-indigo-800' },
    { name: 'Leave Apply', description: 'Request for leave from the hostel', icon: 'Leave Apply', page: Page.LeaveApply, color: 'bg-cyan-100', textColor: 'text-cyan-800' },
] as const;


const Dashboard: React.FC<DashboardProps> = ({ navigateTo, userName, needsSeeding, onSeedData, userBooking }) => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Welcome, {userName}!</h1>
                <p className="mt-2 text-lg text-gray-600">Manage your college hostel room and services.</p>
            </div>

            {needsSeeding ? (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md mb-8">
                    <h3 className="font-bold">Database is Empty</h3>
                    <p>Your hostel data needs to be initialized. Click the button below to add the sample floors and rooms to your database.</p>
                    <button onClick={onSeedData} className="mt-2 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600">
                        Seed Initial Hostel Data
                    </button>
                </div>
            ) : userBooking ? (
                 <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-violet-500">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Your Current Room Booking</h2>
                    <div className="grid grid-cols-2 gap-4 text-gray-600">
                       <p><strong>Room:</strong> {userBooking.roomName}</p>
                       <p><strong>Floor:</strong> {userBooking.floorNumber}</p>
                    </div>
                </div>
            ) : (
                 <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md mb-8">
                    <h3 className="font-bold">No Room Booked</h3>
                    <p>You haven't booked a room yet. Go to the "Room Book" section to find your spot!</p>
                </div>
            )}


            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-700">Quick Actions</h2>
                <p className="text-gray-500">Select an option to get started</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceOptions.map(option => (
                     <button
                        key={option.name}
                        onClick={() => navigateTo(option.page)}
                        className={`group p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-start text-left ${option.color} hover:scale-105 transform`}
                     >
                        <div className={`p-3 rounded-full bg-white mb-4`}>
                             <Icon name={option.icon as any} className={`h-7 w-7 ${option.textColor}`} />
                        </div>
                        <h3 className={`text-lg font-semibold ${option.textColor}`}>{option.name}</h3>
                        <p className={`text-sm ${option.textColor} opacity-80 mt-1`}>{option.description}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
