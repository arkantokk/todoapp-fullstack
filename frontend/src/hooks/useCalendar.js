import { useState, useMemo } from 'react';
import {
    startOfMonth, startOfWeek, addMonths, subMonths, addDays
} from 'date-fns';

export const useCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const days = useMemo(() => {
        const monthStart = startOfMonth(currentDate);
        const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });

        const calendarDays = [];
        let day = startDate;

        for (let i = 0; i < 42; i++) {
            calendarDays.push(day);
            day = addDays(day, 1);
        }

        return calendarDays;
    }, [currentDate]);

    const nextMonth = () => setCurrentDate(prev => addMonths(prev, 1));
    const prevMonth = () => setCurrentDate(prev => subMonths(prev, 1));
    const goToToday = () => setCurrentDate(new Date());

    return { currentDate, days, nextMonth, prevMonth, goToToday };
};