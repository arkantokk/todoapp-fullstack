import { useState, useMemo } from 'react';
import {
    startOfMonth, endOfMonth, startOfWeek, endOfWeek,
    eachDayOfInterval, addMonths, subMonths, 
} from 'date-fns';

export const useCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const days = useMemo(() => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(currentDate);
        const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
        const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

        return eachDayOfInterval({ start: startDate, end: endDate });
    }, [currentDate]);

    const nextMonth = () => setCurrentDate(prev => addMonths(prev, 1));
    const prevMonth = () => setCurrentDate(prev => subMonths(prev, 1));
    const goToToday = () => setCurrentDate(new Date());

    return { currentDate, days, nextMonth, prevMonth, goToToday };
};