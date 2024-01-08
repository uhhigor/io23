import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskForm = () => {
    const navigate = useNavigate();
    const [taskType, setTaskType] = useState('Both');
    const [category, setCategory] = useState('');
    const [timePeriod, setTimePeriod] = useState('');
    const [templates, setTemplates] = useState([]);
    const [filteredTemplates, setFilteredTemplates] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState('');
    const [selectedClass, setSelectedClass] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/task_template');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                const templatesData = data.queryResult || [];
                console.log('Data from server:', templatesData);
                setTemplates(templatesData);
                setFilteredTemplates(templatesData);
            } catch (error) {
                console.error('Error fetching templates:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filtered = templates.filter((template) => {
            const matchesTaskType = taskType === 'Both' ? true : template.isQuiz === parseInt(taskType, 10);
            const matchesCategory = category === '' || template.category === category;
            const matchesTimePeriod = timePeriod === '' || template.timePeriod === timePeriod;
            return matchesTaskType && matchesCategory && matchesTimePeriod;
        });
        setFilteredTemplates(filtered);
    }, [taskType, category, timePeriod, templates]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedTemplate = templates.find(template => template.id === parseInt(selectedTaskId, 10));
        console.log('Submitted:', { selectedTemplate, selectedClass });
        try {
            const response = await fetch("http://localhost:8000/task/addTask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({selectedTemplate, selectedClass /*, UserType*/}),
            });
            console.log(response);
        } catch (error) {
            console.error('Błąd podczas tworzenia zadania:', error);
        }
        // Wysylamy taska oraz informacje o tym kto wysyla taska - nauczyciel czy dyrektor
        // {[name, desc, point, ..], classId, userType}
        // Tutaj możesz obsłużyć przesłane dane, np. wysłać do API
    };
    return (
        <div className="container mt-5">
            <h2>Create New Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Rodzaj zadania</label>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="quiz"
                            value="Quiz"
                            checked={taskType === '1'}
                            onChange={() => setTaskType('1')}
                        />
                        <label className="form-check-label" htmlFor="quiz">
                            Quiz
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="irl"
                            value="IRL"
                            checked={taskType === '0'}
                            onChange={() => setTaskType('0')}
                        />
                        <label className="form-check-label" htmlFor="irl">
                            IRL
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="both"
                            value="Both"
                            checked={taskType === 'Both'}
                            onChange={() => setTaskType('Both')}
                        />
                        <label className="form-check-label" htmlFor="both">
                            Oba typy zadań
                        </label>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Kategoria</label>
                    <select
                        className="form-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Wybierz kategorię</option>
                        <option value="recycling">recykling</option>
                        <option value="waterSaving">oszczędzanie wody</option>
                        <option value="energySaving">oszczędzanie energii</option>
                        <option value="reusing">wykorzystywanie wtórne</option>
                        <option value="ecoTransport">transport publiczny</option>
                        <option value="wasteDisposal">pozbywanie się odpadów</option>
                        <option value="paperSaving">oszczędzanie papieru</option>
                        <option value="organicFood">produkty ekologiczne</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Czas na zadanie</label>
                    <select
                        className="form-select"
                        value={timePeriod}
                        onChange={(e) => setTimePeriod(e.target.value)}
                    >
                        <option value="">Wybierz czas wykonania zadania</option>
                        <option value="daily">dzień</option>
                        <option value="weekly">tydzień</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Zadania</label>
                    <select
                        className="form-select"
                        value={selectedTaskId}
                        onChange={(e) => setSelectedTaskId(e.target.value)}
                    >
                        <option value="">Wybierz zadanie</option>
                        {filteredTemplates.map((template) => (
                            <option key={template.id} value={template.id}>
                                {`Opis: ${template.description}, Punkty: ${template.points}`}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Klasa</label>
                    <select
                        className="form-select"
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                    >
                        <option value="">Wybierz klasę</option>
                        <option value="1">Klasa 1</option>
                        <option value="2">Klasa 2</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    Utwórz zadanie
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/')}>Powrót</button>
            </form>
        </div>
    );
};

export default TaskForm;
