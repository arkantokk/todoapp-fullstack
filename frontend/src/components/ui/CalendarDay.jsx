import { useState, memo } from 'react';
import { format, isSameMonth, isToday } from 'date-fns';
import RemoveBtn from './RemoveBtn';
import { THEMES } from '../../constants/themeStyles';
import { useSelector } from 'react-redux';




const CalendarDay = memo(({ day, currentDate, tasks = [], onAddTask, onToggle, isExpanded = false, handleRemove }) => {
    const [inputValue, setInputValue] = useState('');
    const {theme} = useSelector(state => state.auth);
    const themeClasses = THEMES[theme] || 'bg-white';
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
        <div className={`relative flex flex-col h-full  border p-1  transition-colors ${isCurrentMonth ? themeClasses : 'bg-gray-100'} ${isCurrentDay ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>

            <div className="flex justify-end mb-1">
                <span className={`text-xs md:text-xl font-bold ${isCurrentDay ? 'text-blue-600' : 'text-gray-700'}`}>
                    {format(day, 'd')}
                </span>
            </div>


            <div className="flex-1 overflow-hidden">

                {!isExpanded && tasks.length > 0 && (
                    <div className="absolute top-1.5 left-1.5 flex gap-1 md:hidden">
                        {tasks.slice(0, 3).map(task => (
                            <div key={task._id} className={`w-1.5 h-1.5 rounded-full ${task.completed ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                        ))}
                        {tasks.length > 3 && <span className="text-[8px] leading-none text-gray-400">+</span>}
                    </div>
                )}

                <div className={`
                    ${isExpanded ? 'flex' : 'hidden md:flex'} 
                    flex-col  h-full overflow-y-auto
                `}>

                    {/* THERE IS TEXT MAP   */}
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <div key={task._id} className="flex items-start gap-2 text-xs group w-ful h-6">

                                {isExpanded ? (
                                    <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                onToggle(task._id, !task.completed);
                                            }}
                                            className="peer appearance-none w-4 h-4 border border-gray-300 rounded bg-white checked:bg-blue-500 checked:border-blue-500 cursor-pointer focus:ring-2 focus:ring-blue-300 transition-colors"
                                        />
                                        <svg className="absolute w-3 h-3 text-white hidden peer-checked:block pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                ) : (
                                    
                                    <div className={` mt-[9px] w-1.5 h-1.5 rounded-full shrink-0 ${task.completed ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                                )}

                                {/* there is text of todo */}
                                <span
                                    className={`flex-1 truncate min-w-0 leading-5 mt-0.5 text-left ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
                                    onClick={(e) => {
                                        
                                        onToggle(task._id, !task.completed);
                                    }}
                                >
                                    {task.text}
                                </span>

                                {isExpanded && (
                                    <div className="shrink-0">
                                        <RemoveBtn
                                            text="X"
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
                            <div className="h-full flex items-center justify-center text-gray-400 text-xl italic">
                                No tasks
                            </div>
                        )
                    )}
                </div>
            </div>


            {isExpanded && (
                <div className='mt-2'>
                    <input
                        type="text"
                        className="w-full text-sm text-black border rounded px-2 py-2 focus:outline-none focus:border-blue-500 bg-transparent"
                        placeholder="Add task..."
                        value={inputValue}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                    <button
                        onClick={handleButtonClick}
                        className='flex items-center justify-center text-white bg-slate-600 w-full rounded-md py-2 my-2 hover:bg-slate-700 transition font-medium'
                    >
                        Create Task
                    </button>
                </div>
            )}
        </div>
    );
});

export default CalendarDay;