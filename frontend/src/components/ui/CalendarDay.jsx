import { useState, memo } from 'react';
import { format, isSameMonth, isToday } from 'date-fns';
import RemoveBtn from './RemoveBtn';
import { THEMES } from '../../constants/themeStyles';
import { useSelector } from 'react-redux';

const CalendarDay = memo(({ day, currentDate, tasks = [], onAddTask, onToggle, isExpanded = false, handleRemove }) => {
    const [inputValue, setInputValue] = useState('');
    const { theme } = useSelector(state => state.auth);

    const themeClasses = isSameMonth(day, currentDate) ? (THEMES[theme] || 'bg-white') : 'bg-gray-100';
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            onAddTask(day, inputValue);
            setInputValue('');
        }
    };

    const triggerAddTask = () => {
        if (inputValue.trim()) {
            onAddTask(day, inputValue);
            setInputValue('');
        }
    };

    const handleButtonClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        triggerAddTask();
    };

    const isCurrentMonth = isSameMonth(day, currentDate);
    const isCurrentDay = isToday(day);

    return (
        <div 
            className={`
                relative flex flex-col h-full border transition-all
                ${themeClasses} 
                ${isCurrentDay ? '!border-blue-500' : 'border-gray-200'}
                /* 2. Важливо: прибрали p-1, щоб сітка починалася рівно від краю */
            `}
        >
            <div className={`h-6 flex items-center justify-end px-1 ${isCurrentDay ? 'bg-blue-50/50' : ''}`}>
                <span className={`text-xs md:text-sm font-bold ${isCurrentDay ? 'text-blue-600' : 'text-gray-700'}`}>
                    {format(day, 'd')}
                </span>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col relative">
                {!isExpanded && tasks.length > 0 && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-start pt-1 pl-1 gap-1 md:hidden pointer-events-none">
                        {tasks.slice(0, 3).map(task => (
                            <div key={task._id} className={`w-1.5 h-1.5 rounded-full shadow-sm ${task.completed ? 'bg-gray-400' : 'bg-blue-500'}`}></div>
                        ))}
                        {tasks.length > 3 && <span className="text-[8px] leading-none text-gray-500 font-bold">+</span>}
                    </div>
                )}

                <div className={`
                    ${isExpanded ? 'flex' : 'hidden md:flex'} 
                    flex-col h-full overflow-y-auto
                `}>
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <div 
                                key={task._id} 
                                className="flex items-center gap-2 text-xs group w-full h-6 shrink-0 px-1 hover:bg-black/5 transition-colors"
                            >
                                {isExpanded ? (
                                    <div className="relative flex items-center justify-center shrink-0">
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                onToggle(task._id, !task.completed);
                                            }}
                                            className="peer appearance-none w-3.5 h-3.5 border border-gray-400 rounded bg-white/80 checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
                                        />
                                        <svg className="absolute w-2.5 h-2.5 text-white hidden peer-checked:block pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                ) : (
                                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${task.completed ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                                )}

                                <span
                                    className={`
                                        flex-1 truncate min-w-0 text-left pt-[2px]
                                        ${task.completed ? 'line-through text-gray-400' : 'text-gray-800 font-medium'}
                                    `}
                                    onClick={(e) => onToggle(task._id, !task.completed)}
                                >
                                    {task.text}
                                </span>

                                {isExpanded && (
                                    <div className="shrink-0">
                                        <RemoveBtn
                                            text="×"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemove(task._id);
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        isExpanded && (
                            <div className="mt-2 text-center text-gray-400 text-xs italic">
                                No tasks
                            </div>
                        )
                    )}
                </div>
            </div>

            {isExpanded && (
                <div className='p-1 bg-white/90 backdrop-blur-sm border-t border-gray-200 shadow-sm z-10'>
                    <input
                        type="text"
                        className="w-full text-sm text-black border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 bg-white"
                        placeholder="Add task..."
                        value={inputValue}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                    <button
                        onClick={handleButtonClick}
                        className='flex items-center justify-center text-white bg-slate-700 w-full rounded py-1.5 mt-1 hover:bg-slate-800 transition text-xs font-bold uppercase tracking-wider'
                    >
                        Add
                    </button>
                </div>
            )}
        </div>
    );
});

export default CalendarDay;