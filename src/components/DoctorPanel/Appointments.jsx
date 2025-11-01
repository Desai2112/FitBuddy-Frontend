import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, X, FileText, CheckCircle, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import axiosInstance from '../../api/axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('scheduled'); // Changed default to 'scheduled'
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [doctorNotes, setDoctorNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
    setCurrentPage(1); // Reset to first page when filter changes
  }, [filter, appointments]);

  const fetchAppointments = async () => {
    try {
      const response = await axiosInstance.get('/api/appointment/doctor-schedule');
      const fetchedAppointments = response.data.data || [];
      
      // Sort appointments: newest first (by creation date or appointment date)
      const sortedAppointments = fetchedAppointments.sort((a, b) => {
        const dateA = new Date(a.appointmentDate || a.createdAt);
        const dateB = new Date(b.appointmentDate || b.createdAt);
        return dateB - dateA; // Descending order (newest first)
      });
      
      setAppointments(sortedAppointments);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to fetch appointments');
      setLoading(false);
    }
  };

  const filterAppointments = () => {
    let filtered = [];
    
    if (filter === 'all') {
      // Show all appointments
      filtered = appointments;
    } else if (filter === 'scheduled') {
      // Show only pending, confirmed, and scheduled appointments (not completed or cancelled)
      filtered = appointments.filter(apt => 
        apt.status === 'pending' || 
        apt.status === 'confirmed' || 
        apt.status === 'scheduled'
      );
    } else {
      // Show specific status
      filtered = appointments.filter(apt => apt.status === filter);
    }
    
    setFilteredAppointments(filtered);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of appointments section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await axiosInstance.patch(`/api/appointment/${appointmentId}/status`, {
        status: newStatus
      });
      fetchAppointments();
    } catch (err) {
      setError('Failed to update appointment status');
    }
  };

  const handleCompleteClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCompleteModal(true);
    setDoctorNotes('');
  };

  const handleCompleteSubmit = async () => {
    if (!doctorNotes.trim()) {
      setError('Please enter doctor notes before completing the appointment');
      return;
    }

    setIsSubmitting(true);
    try {
      await axiosInstance.patch(`/api/appointment/${selectedAppointment._id}/status`, {
        status: 'completed',
        doctorNotes: doctorNotes
      });
      setShowCompleteModal(false);
      setSelectedAppointment(null);
      setDoctorNotes('');
      fetchAppointments();
      setError(null);
    } catch (err) {
      setError('Failed to complete appointment');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-4 border-teal-500 mx-auto" />
          <p className="mt-4 text-sm sm:text-base text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  // Pagination component
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const showEllipsis = totalPages > 7;

      if (!showEllipsis) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 4) {
          for (let i = 1; i <= 5; i++) pages.push(i);
          pages.push('...');
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 3) {
          pages.push(1);
          pages.push('...');
          for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
        } else {
          pages.push(1);
          pages.push('...');
          for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
          pages.push('...');
          pages.push(totalPages);
        }
      }
      return pages;
    };

    return (
      <div className="flex items-center justify-between mt-6 px-4 sm:px-0">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredAppointments.length)} of {filteredAppointments.length} appointments
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="px-2 sm:px-3 py-1.5 sm:py-2 text-gray-500">...</span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
                  currentPage === page
                    ? 'bg-teal-500 text-white font-semibold'
                    : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                {page}
              </button>
            )
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Appointments</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage your patient appointments</p>
        </div>
        <div className="w-full sm:w-auto flex items-center gap-2">
          <Filter size={18} className="text-gray-500 sm:hidden" />
          <select 
            value={filter}
            className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="scheduled">Scheduled</option>
            <option value="all">All Appointments</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg flex items-start sm:items-center justify-between text-sm sm:text-base"
        >
          <span className="flex-1">{error}</span>
          <button onClick={() => setError(null)} className="text-red-700 hover:text-red-900 ml-2 flex-shrink-0">
            <X size={18} />
          </button>
        </motion.div>
      )}

      {/* Empty State */}
      {filteredAppointments.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="text-teal-500" size={32} />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
            No Appointments Found
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            {filter === 'scheduled' 
              ? "You don't have any scheduled appointments." 
              : filter === 'all'
              ? "You don't have any appointments yet."
              : `No ${filter} appointments to display.`}
          </p>
        </motion.div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-4">
            {currentAppointments.map((appointment, index) => (
              <motion.div
                key={appointment._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 space-y-3"
              >
                {/* Patient Info */}
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-md">
                    <span className="text-white font-semibold text-lg">
                      {appointment.patientId?.name?.charAt(0)?.toUpperCase() || <User size={20} />}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">
                      {appointment.patientId?.name || 'Unknown Patient'}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {appointment.patientId?.email || 'No email provided'}
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full shadow-sm flex-shrink-0
                    ${
                      appointment.status === 'confirmed' ? 'bg-green-100 text-green-800 border border-green-200' :
                      appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                      appointment.status === 'cancelled' ? 'bg-red-100 text-red-800 border border-red-200' :
                      appointment.status === 'completed' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                      appointment.status === 'scheduled' ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' :
                      'bg-gray-100 text-gray-800 border border-gray-200'
                    }
                  `}>
                    {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1) || 'Unknown'}
                  </span>
                </div>

                {/* Date & Time */}
                <div className="flex flex-col sm:flex-row gap-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-900">
                    <Calendar size={16} className="text-teal-600 flex-shrink-0" />
                    <span className="truncate">
                      {appointment.appointmentDate 
                        ? new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })
                        : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} className="text-teal-600 flex-shrink-0" />
                    <span className="truncate">
                      {appointment.timeSlot 
                        ? `${appointment.timeSlot.startTime} - ${appointment.timeSlot.endTime}` 
                        : 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {appointment.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(appointment._id, 'confirmed')}
                        className="flex-1 px-3 py-2 text-sm bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors shadow-sm font-medium"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleStatusChange(appointment._id, 'cancelled')}
                        className="flex-1 px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-sm font-medium"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {(appointment.status === 'confirmed' || appointment.status === 'scheduled') && (
                    <button
                      onClick={() => handleCompleteClick(appointment)}
                      className="w-full px-3 py-2 text-sm bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors shadow-sm flex items-center justify-center gap-2 font-medium"
                    >
                      <CheckCircle size={16} />
                      Mark Complete
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-teal-50 to-teal-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-teal-900 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-teal-900 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-teal-900 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-teal-900 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentAppointments.map((appointment, index) => (
                    <motion.tr
                      key={appointment._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-md flex-shrink-0">
                            <span className="text-white font-semibold text-lg">
                              {appointment.patientId?.name?.charAt(0)?.toUpperCase() || <User size={20} />}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">
                              {appointment.patientId?.name || 'Unknown Patient'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {appointment.patientId?.email || 'No email provided'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-900 font-medium mb-1">
                          <Calendar size={16} className="text-teal-600" />
                          {appointment.appointmentDate 
                            ? new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })
                            : 'N/A'}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock size={16} className="text-teal-600" />
                          {appointment.timeSlot 
                            ? `${appointment.timeSlot.startTime} - ${appointment.timeSlot.endTime}` 
                            : 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full shadow-sm
                          ${
                            appointment.status === 'confirmed' ? 'bg-green-100 text-green-800 border border-green-200' :
                            appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                            appointment.status === 'cancelled' ? 'bg-red-100 text-red-800 border border-red-200' :
                            appointment.status === 'completed' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                            appointment.status === 'scheduled' ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' :
                            'bg-gray-100 text-gray-800 border border-gray-200'
                          }
                        `}>
                          {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1) || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex items-center gap-2">
                          {appointment.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(appointment._id, 'confirmed')}
                                className="px-3 py-1.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors shadow-sm"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => handleStatusChange(appointment._id, 'cancelled')}
                                className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-sm"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {(appointment.status === 'confirmed' || appointment.status === 'scheduled') && (
                            <button
                              onClick={() => handleCompleteClick(appointment)}
                              className="px-3 py-1.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors shadow-sm flex items-center gap-1"
                            >
                              <CheckCircle size={16} />
                              Complete
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <Pagination />
        </>
      )}

      {/* Complete Appointment Modal */}
      <AnimatePresence>
        {showCompleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => !isSubmitting && setShowCompleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="text-teal-600" size={18} />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">Complete Appointment</h2>
                    <p className="text-xs sm:text-sm text-gray-600 truncate max-w-[200px] sm:max-w-none">
                      {selectedAppointment?.patientId?.name || 'Patient'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => !isSubmitting && setShowCompleteModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                  disabled={isSubmitting}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Doctor Notes <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  placeholder="Enter consultation notes, diagnosis, prescriptions, and recommendations..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[150px] sm:min-h-[200px] resize-y"
                  disabled={isSubmitting}
                />
                <p className="mt-2 text-xs sm:text-sm text-gray-500">
                  Please provide detailed notes about the consultation before completing the appointment.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
                <button
                  onClick={() => setShowCompleteModal(false)}
                  className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base order-2 sm:order-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCompleteSubmit}
                  className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base order-1 sm:order-2"
                  disabled={isSubmitting || !doctorNotes.trim()}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      <span className="hidden sm:inline">Completing...</span>
                      <span className="sm:hidden">Please wait...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={18} />
                      <span className="hidden sm:inline">Complete Appointment</span>
                      <span className="sm:hidden">Complete</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Appointments;