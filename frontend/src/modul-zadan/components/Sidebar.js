import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const studentID = 1; // Do testów
    //const studentID = localStorage.getItem('studentID');

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const startQuiz = async (task) => {
        try {
            const response = await fetch("http://localhost:8000/quiz", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({task}),
          });
            const url = await response.text();
            window.location.href = url;
        } catch (error) {
            console.error('Błąd podczas rozpoczynania quizu:', error);
        }
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`http://localhost:8000/show-task/${studentID}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Odebrane dane:", data);
                setTasks(data);
            } catch (error) {
                console.error('Błąd podczas pobierania zadań:', error);
            }
        };

        fetchTasks();
    }, [studentID]);

    const completedTasks = tasks.filter(task => task.isCompleted).length;
    const totalTasks = tasks.length;
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''} `}>
            <button className="btn btn-secondary mb-2 toggle-button" onClick={toggleSidebar}>
                {isOpen ? 'Ukryj Zadania' : 'Pokaż Zadania'}
            </button>
            <h2>Zadania</h2>
            <div className="progress mb-2">
                <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <div className="scrollable-container">
                {Array.isArray(tasks) &&
                    tasks.map(task => (
                        <div key={task.id} className="card mb-2" style={{ width: '95%', margin: '0 auto' }}>
                            <div className="card-body">
                                <h5 className="card-title">{task.category}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Data wykonania: {task.dueDate}</h6>
                                <p className="card-text">{task.description}</p>
                                <span className={`badge ${task.isCompleted ? 'bg-success' : 'bg-danger'}`}>
                                    {task.isCompleted ? 'Zaliczone' : 'Niezaliczone'}
                                </span>
                            </div>
                            {task.isQuiz === 1 && task.isCompleted === 0 &&(
                                <button className="btn btn-primary" onClick={() => startQuiz(task)}>
                                    Rozpocznij quiz
                                </button>
                            )}
                        </div>
                    ))}
            </div>
            <button className="btn btn-primary mt-4" onClick={() => navigate('/task-form')}>
                Utwórz nowe zadanie
            </button>
        </div>
    );
};

export default Sidebar;
