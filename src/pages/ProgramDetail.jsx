import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProgramDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    category: '',
    image: '',
    description: '',
    stats: ''
  });

  // Fetch program from MongoDB backend
  useEffect(() => {
    const fetchProgramDetail = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/programs`);
        if (res.ok) {
          const data = await res.json();
          const found = data.find((p) => String(p._id) === String(id) || String(p.id) === String(id));
          if (found) {
            setProgram(found);
            setEditForm({
              title: found.title || '',
              category: found.category || '',
              image: found.image || found.imageUrl || '',
              description: found.description || '',
              stats: found.stats || ''
            });
          }
        }
      } catch (error) {
        console.error('Error fetching program detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramDetail();
  }, [id]);

  // Handle Input Changes in Edit Mode
  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Save Updates to MongoDB backend (or state)
  const handleSaveUpdates = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/admin/program/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      
      if (res.ok) {
        setProgram({ ...program, ...editForm });
        setIsEditing(false);
        alert('Program updated successfully!');
      } else {
        // Fallback for local update if backend put route isn't configured yet
        setProgram({ ...program, ...editForm });
        setIsEditing(false);
        alert('Program updated locally!');
      }
    } catch (err) {
      console.error('Failed to update program:', err);
      alert('Error connecting to server');
    }
  };

  // Delete Program Activity
  const handleDeleteProgram = async () => {
    if (window.confirm('Are you sure you want to delete this program/activity?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/admin/program/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          navigate('/');
        } else {
          alert('Failed to delete program from server');
        }
      } catch (err) {
        console.error('Failed to delete:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h2 className="text-xl font-bold text-gray-600">Loading program details...</h2>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Program not found.</h2>
        <Link to="/" className="text-[#E57E51] font-bold hover:underline mt-4 inline-block">← Return to Home</Link>
      </div>
    );
  }

  const coverImg = program.image || program.imageUrl || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop';

  return (
    <main className="bg-[#FBF6F0] min-h-screen py-12 px-4 sm:px-8 text-[#2C3238]">
      <div className="max-w-4xl mx-auto">
        
        {/* TOP BAR / BACK & ADMIN ACTIONS */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="text-[#E57E51] font-bold hover:underline text-sm uppercase tracking-wider">
            ← Back to Home
          </Link>
          
          {isAdmin && (
            <div className="space-x-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-[#2C3238] hover:bg-[#E57E51] text-white text-xs font-bold py-2 px-4 rounded-xl shadow transition-all uppercase tracking-wider"
              >
                {isEditing ? 'Cancel Editing' : '✏️ Edit Program'}
              </button>
              <button
                onClick={handleDeleteProgram}
                className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold py-2 px-4 rounded-xl border border-red-200 transition-all uppercase tracking-wider"
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>

        {/* MAIN CONTAINER CARD */}
        <div className="bg-white rounded-[2rem] shadow-md overflow-hidden border border-gray-100 p-6 sm:p-10">
          {!isEditing ? (
            // VIEW MODE
            <div>
              <div className="h-80 w-full rounded-[1.5rem] overflow-hidden mb-6 shadow-sm">
                <img
                  src={coverImg}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {program.category && (
                <span className="bg-[#A4D8EC] text-[#1E3A4A] text-[10px] font-black uppercase px-3.5 py-1.5 rounded-full tracking-wider">
                  {program.category}
                </span>
              )}

              <h1 className="text-2xl sm:text-4xl font-black text-[#2C3238] uppercase tracking-tight mt-4 mb-4">
                {program.title}
              </h1>

              <p className="text-[#2C3238]/80 leading-relaxed text-sm sm:text-base mb-8 whitespace-pre-line font-medium">
                {program.description}
              </p>
              
              {/* IMPACT MILESTONE BOX */}
              <div className="bg-[#FBF6F0] p-6 rounded-2xl border border-[#E57E51]/20 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="font-black text-xs uppercase tracking-widest text-[#E57E51]">Milestone Impact</h3>
                  <p className="text-[#2C3238] font-black text-lg mt-0.5">{program.stats || 'Active community welfare initiative'}</p>
                </div>
                <button className="w-full sm:w-auto bg-[#E57E51] hover:bg-[#EE9665] text-white font-bold py-3 px-8 rounded-xl shadow transition-all uppercase tracking-wider text-xs">
                  Support This Initiative
                </button>
              </div>
            </div>
          ) : (
            // EDIT & UPDATE MODE
            <form onSubmit={handleSaveUpdates} className="space-y-6">
              <h2 className="text-xl font-black text-[#2C3238] uppercase tracking-tight border-b pb-4">
                Edit Program Details
              </h2>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C3238] mb-1">Program Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={editForm.title}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E57E51] font-medium text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2C3238] mb-1">Category / Badge</label>
                  <input
                    type="text"
                    name="category"
                    value={editForm.category}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E57E51] font-medium text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2C3238] mb-1">Impact Milestone Stats</label>
                  <input
                    type="text"
                    name="stats"
                    value={editForm.stats}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E57E51] font-medium text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C3238] mb-1">Image URL (Cloudinary Link)</label>
                <input
                  type="url"
                  name="image"
                  value={editForm.image}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E57E51] font-medium text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2C3238] mb-1">Program Description & Notes</label>
                <textarea
                  name="description"
                  required
                  rows="6"
                  value={editForm.description}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E57E51] font-medium text-sm"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2.5 rounded-xl border border-gray-300 font-bold text-xs uppercase tracking-wider text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#E57E51] hover:bg-[#EE9665] text-white font-bold py-2.5 px-8 rounded-xl shadow transition-all uppercase tracking-wider text-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </main>
  );
}