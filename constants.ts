import { DailyMenu, Floor } from './types';

export const ADMIN_EMAIL = 'admin@hostelinsight.com';

export const initialHostelData: Floor[] = Array.from({ length: 9 }, (_, i) => ({
  id: `floor-${i + 1}`,
  floorNumber: i + 1,
  rooms: Array.from({ length: 21 }, (_, j) => ({
    id: `room-${i * 21 + j + 1}`,
    name: `Room ${i * 21 + j + 1}`,
    capacity: 3,
    students: [],
    maintenance: false,
  })),
}));

export const messMenuData: DailyMenu[] = [
  {
    day: 'Mon',
    meals: [
      { name: 'Breakfast', items: ['Idli', 'Sambar', 'Coconut Chutney', 'Tea/Coffee'] },
      { name: 'Lunch', items: ['Rice', 'Dal', 'Mixed Veg', 'Chapati', 'Curd'] },
      { name: 'Snacks', items: ['Vada Pav', 'Tea'] },
      { name: 'Dinner', items: ['Rice', 'Sambar', 'Beans Curry', 'Chapati', 'Salad'] },
    ],
  },
    {
    day: 'Tue',
    meals: [
        { name: 'Breakfast', items: ['Poha', 'Jalebi', 'Tea'] },
        { name: 'Lunch', items: ['Chole', 'Bhature', 'Salad'] },
        { name: 'Snacks', items: ['Bread Pakora', 'Coffee'] },
        { name: 'Dinner', items: ['Paneer Butter Masala', 'Chapati', 'Rice'] },
    ],
  },
  {
    day: 'Wed',
    meals: [
        { name: 'Breakfast', items: ['Idli Sambhar', 'Coconut Chutney'] },
        { name: 'Lunch', items: ['Kadhi Pakoda', 'Rice', 'Chapati'] },
        { name: 'Snacks', items: ['Veg Sandwich', 'Juice'] },
        { name: 'Dinner', items: ['Aloo Gobi', 'Dal', 'Chapati'] },
    ],
  },
  {
    day: 'Thu',
    meals: [
        { name: 'Breakfast', items: ['Oats', 'Milk', 'Fruits'] },
        { name: 'Lunch', items: ['Dal Makhani', 'Rice', 'Naan'] },
        { name: 'Snacks', items: ['Pasta', 'Tea'] },
        { name: 'Dinner', items: ['Bhindi Fry', 'Chapati', 'Dal'] },
    ],
  },
  {
    day: 'Fri',
    meals: [
        { name: 'Breakfast', items: ['Dosa', 'Sambhar', 'Chutney'] },
        { name: 'Lunch', items: ['Veg Biryani', 'Raita'] },
        { name: 'Snacks', items: ['Kachori', 'Coffee'] },
        { name: 'Dinner', items: ['Malai Kofta', 'Chapati', 'Rice'] },
    ],
  },
  {
    day: 'Sat',
    meals: [
        { name: 'Breakfast', items: ['Puri Sabji', 'Halwa'] },
        { name: 'Lunch', items: ['Shahi Paneer', 'Naan', 'Rice'] },
        { name: 'Snacks', items: ['Dhokla', 'Tea'] },
        { name: 'Dinner', items: ['Special Thali', 'Ice Cream'] },
    ],
  },
  {
    day: 'Sun',
    meals: [
        { name: 'Breakfast', items: ['Chole Kulche', 'Lassi'] },
        { name: 'Lunch', items: ['Paneer Tikka Masala', 'Rice', 'Chapati'] },
        { name: 'Snacks', items: ['Spring Roll', 'Juice'] },
        { name: 'Dinner', items: ['Kadhai Paneer', 'Dal', 'Chapati'] },
    ],
  },
];
