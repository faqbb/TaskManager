import React, { useState, useEffect } from 'react';

const TaskEditModal = ({ task, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false,
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        completed: task.completed || false,
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 "
      onClick={onClose}
    >
      <div
        className="bg-[#141414] rounded-lg p-6 w-96 shadow-lg "
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 className="text-2xl font-semibold text-center mb-4 text-white">Editar Tarea</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-white">
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300 text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-white">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 text-white"
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="completed"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="completed" className="text-sm font-medium text-white">
              Completada
            </label>
          </div>
          <div className="flex justify-between gap-2">
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-purple-400 to-red-400 text-white font-semibold rounded-lg shadow-md hover:from-purple-500 hover:to-red-500 transition duration-300 ease-in-out"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 bg-gradient-to-r from-blue-300 to-violet-300 text-white font-semibold rounded-lg shadow-md hover:from-blue-400 hover:to-violet-400 transition duration-300 ease-in-out"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskEditModal;
