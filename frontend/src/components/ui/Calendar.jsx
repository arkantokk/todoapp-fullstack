import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { useCalendar } from '../../hooks/useCalendar';
import { fetchTodos, selectTodosGroupedByDate, addTodo, toggleTodoStatus, deleteTodo } from '../../store/slices/todoSlice';
import { motion, AnimatePresence } from 'framer-motion';
import CalendarDay from './CalendarDay';
import DropDown from '../DropDown'
import { useSwipeable } from 'react-swipeable'

const CalendarPage = () => {
    const dispatch = useDispatch();
    const { days, currentDate, nextMonth, prevMonth, goToToday } = useCalendar();
    const { isLoading } = useSelector(state => state.todos);
    const tasksByDate = useSelector(selectTodosGroupedByDate);
    const [selectedDay, setSelectedDay] = useState(null);

    const swipeHandlers = useSwipeable({
        onSwipedLeft: nextMonth,
        onSwipedRight: prevMonth,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    if (isLoading) {
        return (
            <></>
        )
    }

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    const closeExpandedView = () => {
        setSelectedDay(null);
    };

    const handleAddTask = (day, text) => {
        dispatch(addTodo({ text, date: day.toISOString() }));
    };

    const handleToggleTask = (id, completed) => {
        dispatch(toggleTodoStatus({ id, completed }));
    };

    const handleRemoveTask = (id) => {
        dispatch(deleteTodo(id));
    }



    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto md:min-h-screen flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl md:text-3xl font-bold capitalize flex">
                    {format(currentDate, 'MMMM yyyy')}
                    <div className="pl-5"><DropDown /></div>
                </h2>
                <div className="hidden md:visible md:flex gap-2 w-full md:w-auto justify-center">
                    <button onClick={prevMonth} className="px-4 py-2 bg-white text-black border rounded hover:bg-gray-50">Prev</button>
                    <button onClick={goToToday} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Today</button>
                    <button onClick={nextMonth} className="px-4 py-2 bg-white text-black border rounded hover:bg-gray-50">Next</button>
                </div>
            </div>

            <div {...swipeHandlers} className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 shadow-sm overflow-hidden rounded-lg">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                    <div key={d} className="bg-gray-50 p-2 text-center font-semibold text-gray-500 text-sm h-10">
                        {d}
                    </div>
                ))}

                {days.map((day) => {
                    const dateKey = format(day, 'yyyy-MM-dd');
                    const dayTasks = tasksByDate[dateKey] || [];

                    return (
                        <div
                            key={day.toISOString()}
                            onClick={() => handleDayClick(day)}
                            className="bg-white min-h-[5rem] md:min-h-[8rem] cursor-pointer hover:bg-blue-50 transition-colors"
                        >
                            <CalendarDay
                                day={day}
                                currentDate={currentDate}
                                tasks={dayTasks}
                                onAddTask={handleAddTask}
                                onToggle={handleToggleTask}

                            />
                        </div>
                    );
                })}
            </div>

            <AnimatePresence>
                {selectedDay && (
                    <motion.div

                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}

                        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm"
                        onClick={closeExpandedView}
                    >
                        <motion.div

                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}

                            className="bg-white w-full max-w-2xl h-[70vh] rounded-xl shadow-2xl p-6 relative flex flex-col"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={closeExpandedView}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl transition-transform hover:rotate-90"
                            >
                                ✕
                            </button>

                            <h3 className="text-2xl font-bold mb-6 border-b pb-4">
                                {format(selectedDay, 'EEEE, d MMMM yyyy')}
                            </h3>

                            <div className="flex-1 overflow-auto">
                                <CalendarDay
                                    day={selectedDay}
                                    currentDate={currentDate}
                                    tasks={tasksByDate[format(selectedDay, 'yyyy-MM-dd')] || []}
                                    onAddTask={handleAddTask}
                                    onToggle={handleToggleTask}
                                    handleRemove={handleRemoveTask}
                                    isExpanded={true}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CalendarPage;