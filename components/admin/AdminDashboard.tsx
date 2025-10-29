import React, { useState } from 'react';
import RoomChangeRequests from './RoomChangeRequests';
import ComplaintsView from './ComplaintsView';
import FeedbackView from './FeedbackView';

type AdminTab = 'requests' | 'complaints' | 'feedback';

interface AdminDashboardProps {
    setNotification: (notification: { message: string, type: 'success' | 'error' } | null) => void;
    onApproveRoomChange: (request: any) => Promise<void>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setNotification, onApproveRoomChange }) => {
    const [activeTab, setActiveTab] = useState<AdminTab>('requests');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'requests':
                return <RoomChangeRequests setNotification={setNotification} onApproveRoomChange={onApproveRoomChange} />;
            case 'complaints':
                return <ComplaintsView setNotification={setNotification} />;
            case 'feedback':
                return <FeedbackView setNotification={setNotification} />;
            default:
                return null;
        }
    }

    const TabButton: React.FC<{tabName: AdminTab, label: string}> = ({ tabName, label }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tabName ? 'bg-violet-600 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
            <div className="flex space-x-2 border-b mb-6">
                <TabButton tabName="requests" label="Room Change Requests" />
                <TabButton tabName="complaints" label="Hostel Complains" />
                <TabButton tabName="feedback" label="Feedback" />
            </div>
            <div>
                {renderTabContent()}
            </div>
        </div>
    );
};

export default AdminDashboard;
