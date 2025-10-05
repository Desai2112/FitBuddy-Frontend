import React, { useState, useEffect } from 'react';
import { User, Video, Phone, PlusCircle, XCircle } from "lucide-react";
import AuthenticatedNavbar from "../../components/LandingPage/AuthenticatedNavbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const DoctorAppointment = () => {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [symptomInput, setSymptomInput] = useState('');
  const [appointmentMode, setAppointmentMode] = useState('in-person');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [doctors, setDoctors] = useState([]); // Ensure this is initialized as an empty array
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  // Form fields state
  const [formData, setFormData] = useState({
    visitType: '',
    reasonForVisit: ''
  });

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoadingDoctors(true);
        const response = await axios.get('http://localhost:5000/api/auth/doctors'); // Replace with your backend URL
        console.log('API Response:', response.data); // Debug: Log the raw response
      
        // Check if response.data is an array or has a 'doctors' property that is an array
        let doctorsArray = [];
        if (Array.isArray(response.data)) {
          doctorsArray = response.data; // Direct array case
        } else if (response.data && Array.isArray(response.data.doctors)) {
          doctorsArray = response.data.doctors; // Object with 'doctors' array case
        } else {
          throw new Error('Invalid data format received from API');
        }

        setDoctors(doctorsArray); // Set the extracted doctors array
      } catch (err) {
        console.error('Failed to fetch doctors:', {
          message: err.message,
          response: err.response ? err.response.data : null,
        });
        setError('Failed to load doctors. Please try again later.');
        setDoctors([]); // Fallback to empty array on error
      } finally {
        setLoadingDoctors(false);
      }
    };
    fetchDoctors();
  }, []);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // Function to generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push({ day: '', available: false });
    }

    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isAvailable = date >= today;
      days.push({
        day: day,
        available: isAvailable,
        date: date
      });
    }

    setCalendarDays(days);
  };

  // Generate calendar days when month changes
  useEffect(() => {
    generateCalendarDays();
  }, [currentMonth]);

  const handlePrevMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentMonth(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentMonth(newDate);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleDoctorSelect = (index) => {
    setSelectedDoctor(index);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleAddSymptom = () => {
    if (symptomInput.trim() !== '') {
      setSymptoms([...symptoms, symptomInput]);
      setSymptomInput('');
    }
  };

  const handleRemoveSymptom = (index) => {
    const newSymptoms = [...symptoms];
    newSymptoms.splice(index, 1);
    setSymptoms(newSymptoms);
  };

  const handleAppointmentModeChange = (mode) => {
    setAppointmentMode(mode);
  };

  // Get doctor ID based on selected index
  const getDoctorId = () => {
    if (Array.isArray(doctors) && doctors.length > 0 && selectedDoctor !== null) {
      return doctors[selectedDoctor]._id;
    }
    return null;
  };
  
  // Function to calculate end time based on selected time
  const calculateEndTime = (startTime) => {
    // Parse the time string
    const [time, period] = startTime.split(' ');
    let [hours, minutes] = time.split(':').map(num => parseInt(num, 10));
    
    // Convert to 24-hour format for easier calculation
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    // Add 30 minutes
    minutes += 30;
    if (minutes >= 60) {
      minutes -= 60;
      hours += 1;
    }
    
    // Convert back to 12-hour format
    let newPeriod = period;
    if (hours >= 12) {
      newPeriod = 'PM';
      if (hours > 12) hours -= 12;
    } else if (hours === 0) {
      hours = 12;
      newPeriod = 'AM';
    }
    
    // Format the end time string
    return `${hours}:${minutes.toString().padStart(2, '0')} ${newPeriod}`;
  };

  // Submit appointment function
  const handleSubmitAppointment = async () => {
    // Validate required fields
    if (selectedDoctor === null) {
      setError('Please select a doctor');
      return;
    }

    if (!selectedDate) {
      setError('Please select a date');
      return;
    }

    if (!selectedTime) {
      setError('Please select a time');
      return;
    }

    if (!formData.visitType) {
      setError('Please select an appointment type');
      return;
    }

    if (!formData.reasonForVisit) {
      setError('Please provide a reason for your visit');
      return;
    }

    // Calculate end time based on selected start time
    const endTime = calculateEndTime(selectedTime);

    // Prepare appointment data with new timeSlot format
    const appointmentData = {
      doctorId: getDoctorId(),
      appointmentDate: selectedDate,
      timeSlot: {
        startTime: selectedTime,
        endTime: endTime
      },
      type: formData.visitType,
      mode: appointmentMode,
      symptoms: symptoms,
      reasonForVisit: formData.reasonForVisit
    };
    
    console.log(appointmentData);

    try {
      setLoading(true);
      setError('');

      // Make API request
      const response = await axios.post('http://localhost:5000/api/appointment', appointmentData, { withCredentials: true });

      setSuccess('Appointment booked successfully!');

      // Redirect to appointments page or show success message
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to book appointment';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Your appointment information will be lost.')) {
      navigate('/dashboard');
    }
  };

  // Render loading state for doctors
  const renderDoctorLoadingState = () => (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
      <p className="text-gray-600">Loading doctors...</p>
    </div>
  );

  // Render error state for doctors
  const renderDoctorErrorState = () => (
    <div className="p-6 text-center">
      <div className="text-red-500 text-lg mb-4">⚠️ Failed to load doctors</div>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthenticatedNavbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-cyan-700 mb-6">Book Your Appointment</h1>

        {/* Show error message if any */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Show success message if any */}
        {success && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Success: </strong>
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="section-title text-xl font-semibold text-cyan-700 mb-6 pb-2 border-b-2 border-cyan-500">Patient Information</h2>
            <form>
              {/* <div className="form-group mb-4">
                <label htmlFor="name" className="block mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full border rounded-lg px-3 py-2"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group mb-4">
                <label htmlFor="email" className="block mb-1 font-medium">Email Address</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full border rounded-lg px-3 py-2"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group mb-4">
                <label htmlFor="phone" className="block mb-1 font-medium">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="w-full border rounded-lg px-3 py-2"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

         */}

              <div className="form-group mb-4">
                <label htmlFor="visitType" className="block mb-1 font-medium">Appointment Type</label>
                <select
                  id="visitType"
                  required
                  className="w-full border rounded-lg px-3 py-2"
                  value={formData.visitType}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>Select appointment type</option>
                  <option value="first-visit">First Visit</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="consultation">Consultation</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>

              <div className="form-group mb-4">
                <label className="block mb-2 font-medium">Mode of Appointment</label>
                <div className="mode-selector flex gap-4">
                  <div
                    className={`mode-option flex items-center gap-2 p-3 rounded-lg cursor-pointer ${appointmentMode === 'in-person' ? 'bg-blue-100' : 'bg-gray-100'}`}
                    onClick={() => handleAppointmentModeChange('in-person')}
                  >
                    <User className="w-6 h-6 text-blue-500" />
                    <span>In-Person</span>
                  </div>
                  <div
                    className={`mode-option flex items-center gap-2 p-3 rounded-lg cursor-pointer ${appointmentMode === 'video' ? 'bg-blue-100' : 'bg-gray-100'}`}
                    onClick={() => handleAppointmentModeChange('video')}
                  >
                    <Video className="w-6 h-6 text-blue-500" />
                    <span>Video</span>
                  </div>
                  <div
                    className={`mode-option flex items-center gap-2 p-3 rounded-lg cursor-pointer ${appointmentMode === 'phone' ? 'bg-blue-100' : 'bg-gray-100'}`}
                    onClick={() => handleAppointmentModeChange('phone')}
                  >
                    <Phone className="w-6 h-6 text-blue-500" />
                    <span>Phone</span>
                  </div>
                </div>
              </div>

              <div className="form-group mb-4">
                <label className="block mb-2 font-medium">Symptoms</label>
                <div className="symptoms-container flex gap-2">
                  <input
                    type="text"
                    id="symptom-input"
                    placeholder="Enter symptom"
                    value={symptomInput}
                    onChange={(e) => setSymptomInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSymptom())}
                    className="border rounded-lg px-3 py-2 w-full"
                  />
                  <button
                    type="button"
                    className="btn-small flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded-lg"
                    onClick={handleAddSymptom}
                  >
                    <PlusCircle className="w-5 h-5" /> Add
                  </button>
                </div>

                <div className="symptoms-list flex flex-wrap gap-2 mt-3">
                  {symptoms.map((symptom, index) => (
                    <div key={index} className="symptom-tag flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-lg">
                      {symptom}
                      <button type="button" className="remove-btn text-red-500" onClick={() => handleRemoveSymptom(index)}>
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group mb-4">
                <label htmlFor="reasonForVisit" className="block mb-1 font-medium">Reason for Visit</label>
                <textarea
                  id="reasonForVisit"
                  placeholder="Briefly describe your reason for visiting..."
                  required
                  className="w-full border rounded-lg px-3 py-2 min-h-24"
                  value={formData.reasonForVisit}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </form>

            <div className="doctors-section mt-8">
              <h2 className="section-title text-xl font-semibold text-cyan-700 mb-6 pb-2 border-b-2 border-cyan-500">Select Doctor</h2>

              {loadingDoctors && renderDoctorLoadingState()}

              {!loadingDoctors && (!Array.isArray(doctors) || doctors.length === 0) && (
                <div className="p-6 text-center">
                  <div className="text-red-500 text-lg mb-4">⚠️ No doctors available</div>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
                  >
                    Retry
                  </button>
                </div>
              )}

              {!loadingDoctors && Array.isArray(doctors) && doctors.length > 0 && (
                <div className="doctor-cards grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctors.map((doctor, index) => (
                    <div
                      key={index}
                      className={`doctor-card p-4 border rounded-lg cursor-pointer transition-all ${selectedDoctor === index ? 'border-cyan-500 bg-cyan-50' : 'border-gray-200 hover:border-cyan-300'}`}
                      onClick={() => handleDoctorSelect(index)}
                    >
                      <div className="doctor-img bg-cyan-100 rounded-full w-16 h-16 flex items-center justify-center mb-3 text-3xl">
                        {doctor.gender === 'female' ? '👩‍⚕️' : '👨‍⚕️'}
                      </div>
                      <div className="doctor-name font-semibold mb-1">{doctor.name}</div>
                      <div className="doctor-specialty text-sm text-gray-600 mb-2">{doctor.specialty}</div>
                      <div className="doctor-rating text-yellow-500">
                        {'★'.repeat(Math.floor(doctor.rating))}
                        {'☆'.repeat(5 - Math.floor(doctor.rating))}
                        &nbsp;({doctor.rating})
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-cyan-700 mb-6 pb-2 border-b-2 border-cyan-500">
                Select Date & Time
              </h2>

              <div className="calendar mb-8">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-cyan-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h3 className="text-lg font-semibold text-gray-700">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h3>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-cyan-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day, index) => (
                    <motion.div
                      key={index}
                      whileHover={day.available ? { scale: 1.1 } : {}}
                      whileTap={day.available ? { scale: 0.95 } : {}}
                      className={`
                        aspect-square flex items-center justify-center rounded-lg text-sm
                        ${!day.day ? 'invisible' : ''}
                        ${day.available
                          ? 'cursor-pointer hover:bg-cyan-50 border-2 ' +
                          (selectedDate === day.date.toISOString().split('T')[0]
                            ? 'border-cyan-500 bg-cyan-50 text-cyan-600'
                            : 'border-transparent hover:border-cyan-200')
                          : 'text-gray-400 cursor-not-allowed bg-gray-50'}
                      `}
                      onClick={() => day.available && handleDateSelect(day.date.toISOString().split('T')[0])}
                    >
                      {day.day}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Available Time Slots</h3>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
                    '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM',
                    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
                  ].map((time) => (
                    <motion.div
                      key={time}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        p-2 text-center text-sm rounded-lg cursor-pointer transition-colors
                        ${selectedTime === time
                          ? 'bg-cyan-500 text-white'
                          : 'border border-cyan-200 text-cyan-600 hover:bg-cyan-50'}
                      `}
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-cyan-700 mb-6 pb-2 border-b-2 border-cyan-500">
                Appointment Summary
              </h2>
              <div className="space-y-4 bg-cyan-50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-gray-600">Selected Date:</span>
                  <span className="font-medium">
                    {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time Slot:</span>
                  <span className="font-medium">
                    {selectedTime ? `${selectedTime} - ${calculateEndTime(selectedTime)}` : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Doctor:</span>
                  <span className="font-medium">
                    {selectedDoctor !== null && Array.isArray(doctors) && doctors.length > 0
                      ? doctors[selectedDoctor].name
                      : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mode:</span>
                  <span className="font-medium capitalize">{appointmentMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium capitalize">{formData.visitType || 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Symptoms:</span>
                  <span className="font-medium">
                    {symptoms.length > 0 ? symptoms.join(', ') : 'None specified'}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitAppointment}
                  className={`px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors flex items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>Confirm Appointment</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-cyan-700 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">MedConnect</h3>
              <p className="text-cyan-100">Connecting patients with quality healthcare through innovative technology solutions.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-cyan-100 hover:text-white transition-colors">Find a Doctor</a></li>
                <li><a href="#" className="text-cyan-100 hover:text-white transition-colors">Our Services</a></li>
                <li><a href="#" className="text-cyan-100 hover:text-white transition-colors">Patient Portal</a></li>
                <li><a href="#" className="text-cyan-100 hover:text-white transition-colors">Insurance</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Patient Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-cyan-100 hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="text-cyan-100 hover:text-white transition-colors">Patient Forms</a></li>
                <li><a href="#" className="text-cyan-100 hover:text-white transition-colors">Insurance Information</a></li>
                <li><a href="#" className="text-cyan-100 hover:text-white transition-colors">Medical Records</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-cyan-100">📍 123 Medical Center Dr</li>
                <li className="text-cyan-100">📞 (555) 123-4567</li>
                <li className="text-cyan-100">✉️ support@medconnect.com</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8 pt-6 border-t border-cyan-600 text-cyan-200 text-sm">
            © 2025 MedConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DoctorAppointment;