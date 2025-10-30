import { User as FirebaseUser } from 'firebase/auth';

export enum Page {
  Dashboard,
  RoomBooking,
  RoomChange,
  MessMenu,
  Complaint,
  Feedback,
  LaundryService,
  LateEntry,
  PersonalDetails,
  // Admin Pages
  AdminDashboard,
  AdminLateEntryRequests,
  AdminRoomChangeRequests,
  AdminComplaints,
  AdminFeedback,
  AdminStudentDatabase,
}

export interface Meal {
  name: 'Breakfast' | 'Lunch' | 'Snacks' | 'Dinner';
  items: string[];
}

export interface DailyMenu {
  day: string;
  meals: Meal[];
}

export interface Student {
  uid: string;
  name: string;
  studentId: string;
}

export interface StudentDetails {
    uid: string;
    fullName: string;
    phoneNumber: string;
    homeAddress: string;
    fatherName: string;
    fatherMobile: string;
    motherName: string;
    motherMobile: string;
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  students: Student[];
  maintenance: boolean;
}

export interface Floor {
  id: string;
  floorNumber: number;
  rooms: Room[];
}

export interface UserBooking {
    floorId: string;
    roomId: string;
    roomName: string;
    floorNumber: number;
}

// Admin Panel Types
export interface RoomChangeRequest {
    id: string;
    userId: string;
    userName: string;
    currentRoom: {
        floorId: string;
        roomId: string;
        roomName: string;
        floorNumber: number;
    };
    preferredRoom: {
        floorId: string;
        roomId: string;
        roomName: string;
        floorNumber: number;
    } | null;
    reason: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    createdAt: any; // Firestore Timestamp
}

export interface ComplaintRecord {
    id: string;
    userId: string;
    userName: string;
    category: string;
    description: string;
    location: {
        floorId: string;
        roomId: string;
        roomName: string;
        floorNumber: number;
    } | null;
    status: 'Pending' | 'Resolved';
    createdAt: any; // Firestore Timestamp
}

export interface FeedbackRecord {
    id: string;
    userId: string;
    userName: string;
    rating: number;
    category: string;
    comment: string;
    createdAt: any; // Firestore Timestamp
}

export interface LaundryRequest {
    id: string;
    userId: string;
    userName: string;
    floorId: string;
    roomId: string;
    floorNumber: number;
    roomName: string;
    numberOfClothes: number;
    laundryNumber: string;
    bagNumber: string;
    status: 'Pending' | 'Processing' | 'Completed';
    createdAt: any; // Firestore Timestamp
}

export interface LateEntryRequest {
    id: string;
    userId: string;
    userName: string;
    departureTime: any; // Firestore Timestamp
    expectedReturnTime: any; // Firestore Timestamp
    reason: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    createdAt: any; // Firestore Timestamp
}