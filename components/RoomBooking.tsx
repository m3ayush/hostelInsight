import React, { useState } from 'react';
import { Page, Floor, Room, UserBooking } from '../types';
import { User } from 'firebase/auth';
import BookingModal from './BookingModal';

interface RoomBookingProps {
    navigateTo: (page: Page) => void;
    floors: Floor[];
    user: User;
    onBookRoom: (floorId: string, roomId: string, studentId: string, fullName: string) => void;
    userBooking: UserBooking | null;
    setNotification: (notification: { message: string; type: 'success' | 'error' } | null) => void;
}

const RoomBooking: React.FC<RoomBookingProps> = ({ navigateTo, floors, user, onBookRoom, userBooking, setNotification }) => {
    const [selectedFloorIndex, setSelectedFloorIndex] = useState(0);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

    const selectedFloor = floors[selectedFloorIndex];

    const handleRoomClick = (room: Room) => {
        if (userBooking) {
            setNotification({ message: 'You have already booked a room. Please go to Room Change if you wish to change it.', type: 'error' });
            return;
        }
        if (room.students.length < room.capacity) {
            setSelectedRoom(room);
        }
    };

    const getRoomStatus = (room: Room) => {
        if (room.maintenance) return 'Maintenance';
        if (room.students.length >= room.capacity) return 'Full';
        if (room.students.length > 0) return 'Partial';
        return 'Available';
    };

    const statusStyles = {
        Available: 'bg-green-100 border-green-400 text-green-800',
        Partial: 'bg-orange-100 border-orange-400 text-orange-800',
        Full: 'bg-red-100 border-red-400 text-red-800',
        Maintenance: 'bg-gray-200 border-gray-400 text-gray-600',
    };
    
    const totalCapacity = floors.reduce((acc, floor) => acc + floor.rooms.reduce((sum, room) => sum + room.capacity, 0), 0);
    const totalOccupied = floors.reduce((acc, floor) => acc + floor.rooms.reduce((sum, room) => sum + room.students.length, 0), 0);
    const spotsAvailable = totalCapacity - totalOccupied;

    return (
        <div className="max-w-7xl mx-auto">
            <button onClick={() => navigateTo(Page.Dashboard)} className="mb-6 text-violet-600 hover:text-violet-800 font-semibold">
                &larr; Back to Dashboard
            </button>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center space-x-4">
                        <div className="bg-violet-100 p-3 rounded-lg">
                            <svg className="h-8 w-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-8h1m-1 4h1m-1 4h1M9 3v2m6-2v2"></path></svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">Premium Student Hostel</h1>
                            
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-center bg-gray-100 p-2 rounded-lg">
                            <p className="font-bold text-xl text-gray-800">{totalOccupied}</p>
                            <p className="text-xs text-gray-500">of {totalCapacity} occupied</p>
                        </div>
                        <div className="text-center bg-gray-100 p-2 rounded-lg">
                            <p className="font-bold text-xl text-gray-800">{spotsAvailable}</p>
                            <p className="text-xs text-gray-500">spots available</p>
                        </div>
                        
                    </div>
                </div>

                <div className="text-center my-8">
                    <h2 className="text-3xl font-bold text-violet-600">Floor {selectedFloor?.floorNumber}</h2>
                    <p className="text-gray-500 mt-1">Select a room to view details and book your spot</p>
                </div>

                <div className="flex justify-center space-x-2 mb-6">
                    {floors.map((floor, index) => (
                        <button key={floor.id} onClick={() => setSelectedFloorIndex(index)} className={`px-4 py-2 rounded-lg font-semibold ${selectedFloorIndex === index ? 'bg-violet-600 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                            {floor.floorNumber}
                        </button>
                    ))}
                </div>

                <div className="flex justify-center items-center space-x-6 mb-8 text-sm text-gray-800">
                    <div className="flex items-center space-x-2"><span className="h-3 w-3 bg-green-400 rounded-full"></span><span>Available</span></div>
                    <div className="flex items-center space-x-2"><span className="h-3 w-3 bg-orange-400 rounded-full"></span><span>Partial</span></div>
                    <div className="flex items-center space-x-2"><span className="h-3 w-3 bg-red-400 rounded-full"></span><span>Full</span></div>
                    <div className="flex items-center space-x-2"><span className="h-3 w-3 bg-gray-400 rounded-full"></span><span>Maintenance</span></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {selectedFloor?.rooms.map(room => {
                        const status = getRoomStatus(room);
                        const style = statusStyles[status];
                        return (
                            <button 
                                key={room.id}
                                onClick={() => handleRoomClick(room)}
                                className={`p-4 rounded-lg border-2 transition hover:shadow-lg hover:scale-105 transform ${style}`}
                                disabled={status === 'Full' || status === 'Maintenance'}
                            >
                                <p className="font-semibold">{room.name}</p>
                                <div className="flex items-center justify-center space-x-1 mt-2 text-sm">
                                    <UserIcon className="h-4 w-4" />
                                    <span>{room.students.length} / {room.capacity}</span>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>

            {selectedRoom && selectedFloor && (
                <BookingModal
                    room={selectedRoom}
                    floorNumber={selectedFloor.floorNumber}
                    onClose={() => setSelectedRoom(null)}
                    onBookRoom={(studentId, fullName) => onBookRoom(selectedFloor.id, selectedRoom.id, studentId, fullName)}
                    user={user}
                />
            )}
        </div>
    );
};

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);


export default RoomBooking;
