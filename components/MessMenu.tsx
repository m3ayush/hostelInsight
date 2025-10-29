
import React, { useState } from 'react';
import { Page } from '../types';
import { messMenuData } from '../constants';
import Icon from './icons/IconMap';

interface MessMenuProps {
    navigateTo: (page: Page) => void;
}

const MessMenu: React.FC<MessMenuProps> = ({ navigateTo }) => {
    const [selectedDay, setSelectedDay] = useState('Mon');
    const menuForDay = messMenuData.find(d => d.day === selectedDay);

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-orange-50 rounded-lg">
             <button onClick={() => navigateTo(Page.Dashboard)} className="mb-6 text-violet-600 hover:text-violet-800 font-semibold">
                &larr; Back to Dashboard
            </button>
            <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Hostel Mess Menu</h1>
                <p className="mt-2 text-lg text-gray-600">Delicious and nutritious meals served daily</p>
            </div>

            <div className="bg-white p-2 rounded-lg shadow-md mb-8 flex justify-center flex-wrap gap-2">
                {messMenuData.map(({ day }) => (
                    <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${selectedDay === day ? 'bg-orange-500 text-white shadow' : 'text-gray-600 hover:bg-orange-100'}`}
                    >
                        {day}
                    </button>
                ))}
            </div>

            {menuForDay && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {menuForDay.meals.map(meal => (
                        <div key={meal.name} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <Icon name={meal.name as any} className="h-6 w-6 mr-3 text-orange-500" />
                                {meal.name}
                            </h3>
                            <ul className="space-y-2">
                                {meal.items.map((item, index) => (
                                    <li key={index} className="text-gray-600 flex items-start">
                                        <span className="text-orange-500 mr-2">&bull;</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MessMenu;
