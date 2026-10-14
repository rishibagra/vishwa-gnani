import React, { useState, useEffect } from 'react';
import API_URL from '../config';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activePhoto, setActivePhoto] = useState(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  // Dynamic Admin Check: Reads currently logged-in user details from localStorage
  const storedUser = JSON.parse(localStorage.getItem('userInfo') || localStorage.getItem('user') || '{}');
  const currentUserEmail = storedUser.email || localStorage.getItem('userEmail') || '';
  
  // Checks if user is admin dynamically based on database role or stored admin flag
  const isAdmin = 
    storedUser.role === 'admin' || 
    localStorage.getItem('isAdmin') === 'true' || 
    !!localStorage.getItem('token');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/admin/events`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setEvents(data);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  // DELETE EVENT HANDLER (DYNAMIC ADMIN CHECK & HEADER)
  const handleDeleteEvent = async (e, eventId) => {
    e.stopPropagation();

    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/api/admin/event/${eventId}`, {
        method: 'DELETE',
        headers: {
          'x-admin-email': currentUserEmail // 👈 Dynamically sends logged-in user's email
        }
      });

      if (response.ok) {
        setEvents(events.filter(event => (event._id || event.id) !== eventId));
        if (selectedEvent && (selectedEvent._id || selectedEvent.id) === eventId) {
          setSelectedEvent(null);
        }
        alert('Event deleted successfully');
      } else {
        const errData = await response.json().catch(() => ({}));
        alert(`Failed to delete event: ${errData.message || 'Unauthorized'}`);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event');
    }
  };

  // MOVE IMAGE IN GALLERY MODAL (ADMIN ONLY)
  const moveImage = (index, direction) => {
    if (!isAdmin || !selectedEvent || !selectedEvent.images) return;
    const newImages = [...selectedEvent.images];
    const targetIndex = index + direction;

    if (targetIndex < 0 || targetIndex >= newImages.length) return;

    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;

    setSelectedEvent({
      ...selectedEvent,
      images: newImages,
      mainImage: newImages[0]
    });
  };

  // MAKE SELECTED IMAGE COVER PHOTO (ADMIN ONLY)
  const setAsCover = (index) => {
    if (!isAdmin || !selectedEvent || index === 0) return;
    const newImages = [...selectedEvent.images];
    const [selectedImg] = newImages.splice(index, 1);
    newImages.unshift(selectedImg);

    setSelectedEvent({
      ...selectedEvent,
      images: newImages,
      mainImage: newImages[0]
    });
  };

  // SAVE REORDERED GALLERY TO BACKEND (DYNAMIC ADMIN CHECK & HEADER)
  const saveImageOrder = async () => {
    if (!isAdmin || !selectedEvent) return;
    const eventId = selectedEvent._id || selectedEvent.id;

    try {
      setIsSavingOrder(true);
      const res = await fetch(`${API_URL}/api/admin/event/${eventId}/reorder`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-email': currentUserEmail // 👈 Dynamically sends logged-in user's email
        },
        body: JSON.stringify({ images: selectedEvent.images }),
      });

      if (res.ok) {
        alert('Gallery photo sequence updated successfully!');
        fetchEvents();
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(`Failed to save image order: ${errorData.message || 'Unauthorized'}`);
      }
    } catch (err) {
      console.error('Error saving image order:', err);
      alert('Server error updating image order.');
    } finally {
      setIsSavingOrder(false);
    }
  };

  return (
    <main className="bg-[#FBF6F0] min-h-screen py-12 px-4 sm:px-8 text-[#2C3238]">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* HEADER */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E57E51]">
            Our Journey & Impact
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            Past Events & Works
          </h1>
          <p className="text-sm text-[#2C3238]/70 max-w-xl mx-auto">
            Explore the meaningful events, community drives, and welfare projects conducted by Vishwagnani Seva Trust.
          </p>
        </div>

        {/* LOADING & EMPTY STATES */}
        {loading ? (
          <div className="text-center py-16 text-gray-500 font-bold">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 text-gray-500 font-bold bg-white/50 rounded-3xl border border-dashed border-gray-300">
            No events found.
          </div>
        ) : (
          /* EVENTS LIST GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((item) => {
              const coverImage = item.mainImage || item.images?.[0] || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop';
              const photos = item.images && item.images.length > 0 ? item.images : [coverImage];
              const eventId = item._id || item.id;

              return (
                <div
                  key={eventId}
                  onClick={() => setSelectedEvent({ ...item, images: photos, mainImage: coverImage })}
                  className="group bg-white rounded-3xl overflow-hidden shadow-md border border-[#BDC3E8]/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
                >
                  <div>
                    <div className="h-52 overflow-hidden relative">
                      <img
                        src={coverImage}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* DELETE BUTTON (ADMIN ONLY) */}
                      {isAdmin && (
                        <button
                          onClick={(e) => handleDeleteEvent(e, eventId)}
                          className="absolute top-3 left-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110 z-10 cursor-pointer"
                          title="Delete Event"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}

                      {item.date && (
                        <span className="absolute bottom-3 left-3 bg-[#2C3238]/80 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-xs">
                          {item.date}
                        </span>
                      )}
                      {photos.length > 0 && (
                        <span className="absolute top-3 right-3 bg-[#EE9665] text-white font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                          📸 {photos.length} Photos
                        </span>
                      )}
                    </div>

                    <div className="p-6 space-y-2">
                      <h3 className="text-lg font-black text-[#2C3238] uppercase tracking-tight group-hover:text-[#E57E51] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#2C3238]/70 leading-relaxed line-clamp-3 font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-1">
                    <span className="text-xs font-extrabold text-[#E57E51] group-hover:underline flex items-center gap-1">
                      View Full Event Gallery & Details →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* GALLERY MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#FBF6F0] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 p-6 sm:p-8 relative">
            
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#2C3238] text-white font-bold text-sm flex items-center justify-center hover:bg-[#E57E51] transition-colors shadow-md z-10 cursor-pointer"
            >
              ✕
            </button>

            <div className="mb-6 space-y-3 pr-10 border-b border-gray-200 pb-6">
              <span className="text-xs font-black text-[#E57E51] uppercase tracking-widest bg-[#E57E51]/10 px-3 py-1 rounded-full">
                {selectedEvent.date}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#2C3238] uppercase tracking-tight">
                {selectedEvent.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#2C3238]/80 font-medium leading-relaxed whitespace-pre-line">
                {selectedEvent.description}
              </p>
            </div>

            {/* GALLERY TOOLBAR */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 bg-amber-50 p-3 rounded-2xl border border-amber-200">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-[#2C3238] uppercase tracking-wide">
                  📸 Event Gallery ({selectedEvent.images ? selectedEvent.images.length : 1})
                </h3>
              </div>

              {isAdmin && (
                <button
                  onClick={saveImageOrder}
                  disabled={isSavingOrder}
                  className="bg-[#E57E51] hover:bg-[#d46a3d] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {isSavingOrder ? 'Saving...' : '💾 Save New Sequence'}
                </button>
              )}
            </div>

            {/* IMAGES GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {(selectedEvent.images || [selectedEvent.mainImage]).map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl overflow-hidden bg-white shadow-md border-2 border-white flex flex-col"
                >
                  <div 
                    onClick={() => setActivePhoto(imgUrl)}
                    className="relative h-44 cursor-pointer overflow-hidden"
                  >
                    <img
                      src={imgUrl.startsWith('http') ? imgUrl : `${API_URL}/${imgUrl.replace(/^\/+/, '')}`}
                      alt={`${selectedEvent.title} photo ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {idx === 0 && (
                      <span className="absolute top-2 left-2 bg-emerald-600 text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded-md shadow-md z-10">
                        ★ Cover Photo
                      </span>
                    )}

                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs uppercase tracking-wider">
                      🔍 Enlarge
                    </div>
                  </div>

                  {/* REORDER BAR (ADMIN ONLY) */}
                  {isAdmin && (
                    <div className="bg-[#2C3238] p-2 flex items-center justify-between gap-1 text-white text-xs">
                      <button
                        type="button"
                        onClick={() => moveImage(idx, -1)}
                        disabled={idx === 0}
                        className="bg-white/10 hover:bg-white/30 disabled:opacity-30 px-2 py-1 rounded text-xs font-bold cursor-pointer"
                        title="Move Left"
                      >
                        ◄
                      </button>

                      {idx !== 0 ? (
                        <button
                          type="button"
                          onClick={() => setAsCover(idx)}
                          className="text-[10px] bg-[#E57E51] hover:bg-[#d46a3d] px-2 py-1 rounded font-bold uppercase tracking-wider cursor-pointer"
                        >
                          Make Cover
                        </button>
                      ) : (
                        <span className="text-[10px] text-emerald-400 font-bold uppercase">Main</span>
                      )}

                      <button
                        type="button"
                        onClick={() => moveImage(idx, 1)}
                        disabled={idx === selectedEvent.images.length - 1}
                        className="bg-white/10 hover:bg-white/30 disabled:opacity-30 px-2 py-1 rounded text-xs font-bold cursor-pointer"
                        title="Move Right"
                      >
                        ►
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* FULLSCREEN PREVIEW */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-5xl w-full flex justify-center">
            <img
              src={activePhoto.startsWith('http') ? activePhoto : `${API_URL}/${activePhoto.replace(/^\/+/, '')}`}
              alt="Fullscreen preview"
              className="max-h-[85vh] w-auto object-contain rounded-2xl shadow-2xl border-2 border-white/20"
            />
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-12 right-0 text-white font-bold text-xs bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-md hover:bg-white/40 transition-colors cursor-pointer"
            >
              Close Fullscreen ✕
            </button>
          </div>
        </div>
      )}

    </main>
  );
}