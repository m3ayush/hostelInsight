import React from 'react';
import { Page } from '../../types';
import Icon from '../icons/IconMap';

interface AdminDashboardProps {
    navigateTo: (page: Page) => void;
}

const adminOptions = [
    { name: 'Room Change Requests', description: 'Approve or reject room change requests', icon: 'Room Change', page: Page.AdminRoomChangeRequests, color: 'bg-blue-100', textColor: 'text-blue-800' },
    { name: 'Hostel Complains', description: 'View and manage student complaints', icon: 'Hostel Complain', page: Page.AdminComplaints, color: 'bg-red-100', textColor: 'text-red-800' },
    { name: 'Feedback', description: 'Review student feedback and ratings', icon: 'Feedback', page: Page.AdminFeedback, color: 'bg-yellow-100', textColor: 'text-yellow-800' },
    { name: 'Student Database', description: 'View and manage student details', icon: 'Student Database', page: Page.AdminStudentDatabase, color: 'bg-teal-100', textColor: 'text-teal-800' },
] as const;


const AdminDashboard: React.FC<AdminDashboardProps> = ({ navigateTo }) => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Admin Panel</h1>
                <p className="mt-2 text-lg text-gray-600">Manage all hostel operations from here.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {adminOptions.map(option => (
                     <button
                        key={option.name}
                        onClick={() => navigateTo(option.page)}
                        className={`group p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-start text-left ${option.color} hover:scale-105 transform`}
                     >
                        <div className={`p-3 rounded-full bg-white mb-4`}>
                             <Icon name={option.icon} className={`h-7 w-7 ${option.textColor}`} />
                        </div>
                        <h3 className={`text-lg font-semibold ${option.textColor}`}>{option.name}</h3>
                        <p className={`text-sm ${option.textColor} opacity-80 mt-1`}>{option.description}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;