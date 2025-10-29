import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { ComplaintRecord } from '../../types';

interface ComplaintsViewProps {
    setNotification: (notification: { message: string, type: 'success' | 'error' } | null) => void;
}

const ComplaintsView: React.FC<ComplaintsViewProps> = ({ setNotification }) => {
    const [complaints, setComplaints] = useState<ComplaintRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!db) return;
        const q = query(collection(db, 'complaints'), orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const complaintsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ComplaintRecord));
            setComplaints(complaintsData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching complaints:", error);
            setNotification({ message: 'Failed to fetch complaints.', type: 'error' });
            setLoading(false);
        });

        return () => unsubscribe();
    }, [setNotification]);
    
    if (loading) {
        return <div className="text-center p-8">Loading complaints...</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">All Hostel Complaints</h2>
            {complaints.length === 0 ? (
                <p className="text-gray-500">No complaints have been submitted yet.</p>
            ) : (
                <div className="space-y-4">
                    {complaints.map(complaint => (
                        <div key={complaint.id} className="border border-gray-200 p-4 rounded-lg">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold text-gray-800">{complaint.category}</p>
                                    <p className="text-sm text-gray-500">By: {complaint.userName}</p>
                                    {complaint.location && (
                                        <p className="text-sm text-gray-500">Location: {complaint.location.roomName}, Floor {complaint.location.floorNumber}</p>
                                    )}
                                </div>
                                <span className="text-xs text-gray-400">{complaint.createdAt?.toDate().toLocaleString()}</span>
                            </div>
                            <p className="mt-2 text-gray-700">{complaint.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ComplaintsView;
