import { useState } from 'react';

export default function AddProgramForm({ onProgramAdded }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Education',
    image: '',
    description: '',
    stats: '500+ Beneficiaries'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    // Default image fallback if left empty
    const newProgram = {
      ...formData,
      id: `custom-${Date.now()}`,
      image: formData.image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop'
    };

    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem('vg_custom_programs') || '[]');
    const updated = [newProgram, ...saved];
    localStorage.setItem('vg_custom_programs', JSON.stringify(updated));

    // Update parent page state
    onProgramAdded(newProgram);

    // Reset Form
    setFormData({ title: '', category: 'Education', image: '', description: '', stats: '500+ Beneficiaries' });
    setIsOpen(false);
  };

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-12 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-900">NGO Management Panel</h3>
          <p className="text-sm text-gray-600">Add new updates, community photos, and initiative notes.</p>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-5 rounded-lg shadow transition-all"
        >
          {isOpen ? 'Close Form' : '+ Add New Program / Photo'}
        </button>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-amber-200 pt-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-1">Initiative Title</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g., Rural Computer Education Lab"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 bg-white"
            >
              <option value="Education">Education</option>
              <option value="Vocational Training">Vocational Training</option>
              <option value="Early Childhood">Early Childhood</option>
              <option value="Community Support">Community Support</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Photo Image URL</label>
            <input
              type="url"
              name="image"
              placeholder="https://images.unsplash.com/..."
              value={formData.image}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 bg-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-1">Impact Stats / Milestone</label>
            <input
              type="text"
              name="stats"
              placeholder="e.g., 200 Students Empowered"
              value={formData.stats}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 bg-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-1">Program Notes & Description</label>
            <textarea
              name="description"
              required
              rows="3"
              placeholder="Add key notes, background info, or progress details here..."
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 bg-white"
            />
          </div>

          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              className="bg-gray-900 hover:bg-black text-white font-bold py-3 px-8 rounded-lg transition-all"
            >
              Save & Publish to Website
            </button>
          </div>
        </form>
      )}
    </div>
  );
}