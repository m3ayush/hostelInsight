import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Page, Floor, Room } from '../types';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
// FIX: Corrected import path to be explicit.
import { db } from '../firebase';

interface ComplaintProps {
    navigateTo: (page: Page) => void;
    user: User;
    setNotification: (notification: { message: string, type: 'success' | 'error' } | null) => void;
    floors: Floor[];
}

const Complaint: React.FC<ComplaintProps> = ({ navigateTo, user, setNotification, floors }) => {
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFloorId, setSelectedFloorId] = useState('');
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const [roomOptions, setRoomOptions] = useState<Room[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (selectedFloorId) {
            const selectedFloor = floors.find(f => f.id === selectedFloorId);
            setRoomOptions(selectedFloor ? selectedFloor.rooms : []);
            setSelectedRoomId(''); // Reset room selection when floor changes
        } else {
            setRoomOptions([]);
            setSelectedRoomId('');
        }
    }, [selectedFloorId, floors]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!category || !description) {
            setNotification({message: 'Please fill in all required fields.', type: 'error'});
            return;
        }
        if (!db) {
            setNotification({message: 'Database not connected.', type: 'error'});
            return;
        }

        setIsSubmitting(true);
        try {
            const selectedFloor = floors.find(f => f.id === selectedFloorId);
            const selectedRoom = selectedFloor?.rooms.find(r => r.id === selectedRoomId);

            await addDoc(collection(db, "complaints"), {
                userId: user.uid,
                userName: user.displayName || user.email,
                category,
                description,
                location: selectedRoomId ? {
                    floorId: selectedFloorId,
                    roomId: selectedRoomId,
                    roomName: selectedRoom?.name,
                    floorNumber: selectedFloor?.floorNumber
                } : null,
                status: 'Pending',
                createdAt: serverTimestamp(),
            });
            setNotification({message: 'Your complaint has been submitted successfully!', type: 'success'});
            setCategory('');
            setDescription('');
            setSelectedFloorId('');
            setSelectedRoomId('');
        } catch (error) {
            console.error("Error submitting complaint: ", error);
            setNotification({message: 'Failed to submit complaint. Please try again.', type: 'error'});
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <button onClick={() => navigateTo(Page.Dashboard)} className="mb-6 text-violet-600 hover:text-violet-800 font-semibold">
                &larr; Back to Dashboard
            </button>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Lodge a Complaint</h1>
                    <p className="mt-2 text-lg text-gray-600">We are here to help. Please let us know what's wrong.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 transition"
                        >
                            <option value="">Select a category...</option>
                            <option value="Room Maintenance">Room Maintenance</option>
                            <option value="Mess/Food Quality">Mess/Food Quality</option>
                            <option value="Cleanliness">Cleanliness</option>
                            <option value="Noise Complaint">Noise Complaint</option>
                            <option value="Staff Behavior">Staff Behavior</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                         <div>
                            <label htmlFor="floor" className="block text-sm font-medium text-gray-700 mb-1">Floor (optional)</label>
                            <select
                                id="floor"
                                value={selectedFloorId}
                                onChange={(e) => setSelectedFloorId(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 transition"
                            >
                                <option value="">Select a floor</option>
                                {floors.map(floor => (
                                    <option key={floor.id} value={floor.id}>Floor {floor.floorNumber}</option>
                                ))}
                            </select>
                        </div>
                         <div>
                            <label htmlFor="room" className="block text-sm font-medium text-gray-700 mb-1">Room (optional)</label>
                            <select
                                id="room"
                                value={selectedRoomId}
                                onChange={(e) => setSelectedRoomId(e.target.value)}
                                disabled={!selectedFloorId}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 transition disabled:bg-gray-100"
                            >
                                <option value="">Select a room</option>
                                {roomOptions.map(room => (
                                     <option key={room.id} value={room.id}>{room.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                        <textarea
                            id="description"
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Please describe the issue in detail..."
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 transition"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-4 bg-violet-600 text-white font-bold rounded-lg hover:bg-violet-700 disabled:bg-gray-400 transition-colors"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Complaint;