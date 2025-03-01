import React, { useState } from 'react';
import { User, Video, Phone } from "lucide-react";
import { PlusCircle, XCircle } from "lucide-react";

const DoctorAppointment = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('19');
  const [selectedTime, setSelectedTime] = useState('11:30 AM');
  const [symptoms, setSymptoms] = useState([]);
  const [symptomInput, setSymptomInput] = useState('');
  const [appointmentMode, setAppointmentMode] = useState('');

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

  return (
    <>
      <header>
        <div className="container">
          <nav>
          <div className="logo">
  <span className="logo-icon">⚕️</span> MedConnect
</div>
            <ul className="nav-links">
              <li><a href="#">Services</a></li>
              <li><a href="#">Doctors</a></li>
              <li><a href="#">Locations</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="container">
        <h1>Book Your Appointment</h1>
        
        <div className="benefits">
          <div className="benefit-card">
            <div className="benefit-icon">🕒</div>
            <h3 className="benefit-title">Online Booking</h3>
            <p>Book appointments 24/7 from anywhere, without waiting on the phone.</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">📋</div>
            <h3 className="benefit-title">Easy Management</h3>
            <p>Reschedule or cancel appointments with just a few clicks.</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">📱</div>
            <h3 className="benefit-title">Appointment Reminders</h3>
            <p>Receive SMS or email reminders before your scheduled visit.</p>
          </div>
        </div>
        
        <div className="booking-container">
          <div className="booking-form">
            <h2 className="section-title">Patient Information</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input type="date" id="dob" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="visit-type">Appointment Type</label>
                <select id="visit-type" required>
                  <option value="" disabled selected>Select appointment type</option>
                  <option value="first-visit">First Visit</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="consultation">Consultation</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>

              <div className="form-group">
      <label>Mode of Appointment</label>
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
              
                  

    <div className="form-group">
      <label>Symptoms</label>
      <div className="symptoms-container flex gap-2">
        <input
          type="text"
          id="symptom-input"
          placeholder="Enter symptom"
          value={symptomInput}
          onChange={(e) => setSymptomInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddSymptom()}
          className="border rounded-lg px-3 py-2 w-full"
        />
        <button type="button" className="btn-small flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded-lg" onClick={handleAddSymptom}>
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

              <div className="form-group">
                <label htmlFor="reason">Reason for Visit</label>
                <textarea id="reason" placeholder="Briefly describe your reason for visiting..." required></textarea>
              </div>
            </form>


            <div className="doctors-section">
              <h2 className="section-title">Select Doctor</h2>
              <div className="doctor-cards">
                <div 
                  className={`doctor-card ${selectedDoctor === 0 ? 'selected' : ''}`} 
                  onClick={() => handleDoctorSelect(0)}
                >
                  <div className="doctor-img">👩‍⚕️</div>
                  <div className="doctor-name">Dr. Sarah Johnson</div>
                  <div className="doctor-specialty">Family Medicine</div>
                  <div className="doctor-rating">★★★★★ (4.9)</div>
                </div>
                
                <div 
                  className={`doctor-card ${selectedDoctor === 1 ? 'selected' : ''}`}
                  onClick={() => handleDoctorSelect(1)}
                >
                  <div className="doctor-img">👨‍⚕️</div>
                  <div className="doctor-name">Dr. Michael Chen</div>
                  <div className="doctor-specialty">Internal Medicine</div>
                  <div className="doctor-rating">★★★★★ (4.8)</div>
                </div>
                
                <div 
                  className={`doctor-card ${selectedDoctor === 2 ? 'selected' : ''}`}
                  onClick={() => handleDoctorSelect(2)}
                >
                  <div className="doctor-img">👩‍⚕️</div>
                  <div className="doctor-name">Dr. Lisa Rodriguez</div>
                  <div className="doctor-specialty">Pediatrics</div>
                  <div className="doctor-rating">★★★★★ (4.9)</div>
                </div>
                
                <div 
                  className={`doctor-card ${selectedDoctor === 3 ? 'selected' : ''}`}
                  onClick={() => handleDoctorSelect(3)}
                >
                  <div className="doctor-img">👨‍⚕️</div>
                  <div className="doctor-name">Dr. James Wilson</div>
                  <div className="doctor-specialty">Cardiology</div>
                  <div className="doctor-rating">★★★★★ (4.7)</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="calendar-section">
            <h2 className="section-title">Select Date & Time</h2>
            <div className="calendar">
              <div className="month-selector">
                <button className="arrow-btn">&#8249;</button>
                <div className="month-title">March 2025</div>
                <button className="arrow-btn">&#8250;</button>
              </div>
              
              <div className="weekdays">
                <div className="weekday">Sun</div>
                <div className="weekday">Mon</div>
                <div className="weekday">Tue</div>
                <div className="weekday">Wed</div>
                <div className="weekday">Thu</div>
                <div className="weekday">Fri</div>
                <div className="weekday">Sat</div>
              </div>
              
              <div className="days">
                <div className="day unavailable"></div>
                <div className="day unavailable"></div>
                <div className="day unavailable"></div>
                <div className="day unavailable"></div>
                <div className="day unavailable"></div>
                <div className="day unavailable">1</div>
                <div className="day unavailable">2</div>
                <div className="day unavailable">3</div>
                <div className="day unavailable">4</div>
                <div className="day unavailable">5</div>
                <div className="day unavailable">6</div>
                <div className="day unavailable">7</div>
                <div className="day available" onClick={() => handleDateSelect('8')}>8</div>
                <div className="day unavailable">9</div>
                <div className="day unavailable">10</div>
                <div className="day unavailable">11</div>
                <div className="day available" onClick={() => handleDateSelect('12')}>12</div>
                <div className="day available" onClick={() => handleDateSelect('13')}>13</div>
                <div className="day available" onClick={() => handleDateSelect('14')}>14</div>
                <div className="day available" onClick={() => handleDateSelect('15')}>15</div>
                <div className="day unavailable">16</div>
                <div className="day unavailable">17</div>
                <div className="day available" onClick={() => handleDateSelect('18')}>18</div>
                <div 
                  className={`day available ${selectedDate === '19' ? 'selected' : ''}`}
                  onClick={() => handleDateSelect('19')}
                >19</div>
                <div className="day available" onClick={() => handleDateSelect('20')}>20</div>
                <div className="day available" onClick={() => handleDateSelect('21')}>21</div>
                <div className="day available" onClick={() => handleDateSelect('22')}>22</div>
                <div className="day unavailable">23</div>
                <div className="day unavailable">24</div>
                <div className="day available" onClick={() => handleDateSelect('25')}>25</div>
                <div className="day available" onClick={() => handleDateSelect('26')}>26</div>
                <div className="day available" onClick={() => handleDateSelect('27')}>27</div>
                <div className="day available" onClick={() => handleDateSelect('28')}>28</div>
                <div className="day available" onClick={() => handleDateSelect('29')}>29</div>
                <div className="day unavailable">30</div>
                <div className="day unavailable">31</div>
              </div>
            </div>
            
            <div className="time-slots">
              <h3 className="section-title">Available Time Slots</h3>
              <div className="time-grid">
                <div className="time-slot available" onClick={() => handleTimeSelect('9:00 AM')}>9:00 AM</div>
                <div className="time-slot available" onClick={() => handleTimeSelect('9:30 AM')}>9:30 AM</div>
                <div className="time-slot unavailable">10:00 AM</div>
                <div className="time-slot unavailable">10:30 AM</div>
                <div className="time-slot available" onClick={() => handleTimeSelect('11:00 AM')}>11:00 AM</div>
                <div 
                  className={`time-slot available ${selectedTime === '11:30 AM' ? 'selected' : ''}`}
                  onClick={() => handleTimeSelect('11:30 AM')}
                >11:30 AM</div>
                <div className="time-slot unavailable">1:00 PM</div>
                <div className="time-slot available" onClick={() => handleTimeSelect('1:30 PM')}>1:30 PM</div>
                <div className="time-slot available" onClick={() => handleTimeSelect('2:00 PM')}>2:00 PM</div>
                <div className="time-slot available" onClick={() => handleTimeSelect('2:30 PM')}>2:30 PM</div>
                <div className="time-slot available" onClick={() => handleTimeSelect('3:00 PM')}>3:00 PM</div>
                <div className="time-slot unavailable">3:30 PM</div>
              </div>
            </div>
            
            <div className="summary-section" style={{ display: 'block' }}>
              <h3 className="section-title">Appointment Summary</h3>
              <div className="summary-box">
                <div className="summary-item">
                  <span className="item-label">Date:</span>
                  <span>March {selectedDate}, 2025</span>
                </div>
                <div className="summary-item">
                  <span className="item-label">Time:</span>
                  <span>{selectedTime}</span>
                </div>
                <div className="summary-item">
                  <span className="item-label">Doctor:</span>
                  <span>
                    {selectedDoctor === 0 && 'Dr. Sarah Johnson'}
                    {selectedDoctor === 1 && 'Dr. Michael Chen'}
                    {selectedDoctor === 2 && 'Dr. Lisa Rodriguez'}
                    {selectedDoctor === 3 && 'Dr. James Wilson'}
                    {selectedDoctor === null && 'Dr. Sarah Johnson'}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="item-label">Appointment Type:</span>
                  <span>New Patient Consultation</span>
                </div>
                <div className="summary-item">
                  <span className="item-label">Location:</span>
                  <span>MedConnect Main Clinic</span>
                </div>
              </div>
              
              <div className="confirmation-btns">
                <button className="btn">Confirm Appointment</button>
                <button className="btn btn-accent">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-col">
              <h3 className="footer-title">MedConnect</h3>
              <p>Connecting patients with quality healthcare through innovative technology solutions.</p>
            </div>
            
            <div className="footer-col">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li><a href="#">Find a Doctor</a></li>
                <li><a href="#">Our Services</a></li>
                <li><a href="#">Patient Portal</a></li>
                <li><a href="#">Insurance</a></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h3 className="footer-title">Patient Resources</h3>
              <ul className="footer-links">
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Patient Forms</a></li>
                <li><a href="#">Insurance Information</a></li>
                <li><a href="#">Medical Records</a></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h3 className="footer-title">Contact</h3>
              <ul className="footer-links">
                <li>📍 123 Medical Center Dr</li>
                <li>📞 (555) 123-4567</li>
                <li>✉️ support@medconnect.com</li>
              </ul>
            </div>
          </div>
          
          <div className="copyright">
            © 2025 MedConnect. All rights reserved.
          </div>
        </div>
      </footer>

      <style jsx>{`
        :root {
          --primary: #0dcfcf;
          --secondary: #0fa2b2;
          --accent: #FF4D6D;
          --light: #f5f5f5;
          --dark: #040404;
          --error: #D71646;
          --success: #E63946;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
          background-color: var(--light);
          color: var(--dark);
          line-height: 1.6;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        header {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          padding: 1rem 0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .logo {
          font-size: 1.8rem;
          font-weight: 700;
          display: flex;
          align-items: center;
        }
        
        .logo-icon {
          margin-right: 8px;
          font-size: 2rem;
        }
        
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .nav-links {
          display: flex;
          list-style: none;
        }
        
        .nav-links li {
          margin-left: 1.5rem;
        }
        
        .nav-links a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.3s;
        }
        
        .nav-links a:hover {
          opacity: 0.8;
        }
        
        main {
          padding: 2rem 0;
        }
        
        h1 {
          text-align: center;
          margin-bottom: 2rem;
          color: var(--secondary);
          font-size: 2.2rem;
        }
        
        .booking-container {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .booking-form {
          flex: 1;
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 6px 24px rgba(0,0,0,0.08);
          min-width: 320px;
        }
        
        .calendar-section {
          flex: 1;
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 6px 24px rgba(0,0,0,0.08);
          min-width: 320px;
        }
        
        .section-title {
          color: var(--secondary);
          margin-bottom: 1.5rem;
          font-weight: 600;
          border-bottom: 2px solid var(--primary);
          padding-bottom: 0.5rem;
          display: inline-block;
        }
        
        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        label {
          font-weight: 500;
          color: var(--dark);
        }
        
        input, select, textarea {
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }
        
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 2px rgba(13, 207, 207, 0.2);
        }
        
        textarea {
          resize: vertical;
          min-height: 100px;
        }
        
        .btn {
          background-color: var(--primary);
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s;
          text-align: center;
          margin-top: 1rem;
        }
        
        .btn:hover {
          background-color: var(--secondary);
        }
        
        .btn-accent {
          background-color: var(--accent);
        }
        
        .btn-accent:hover {
          background-color: #e13a5a;
        }
        
        .calendar {
          max-width: 100%;
        }
        
        .month-selector {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .month-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--secondary);
        }
        
        .arrow-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: var(--primary);
          cursor: pointer;
          transition: color 0.3s;
        }
        
        .arrow-btn:hover {
          color: var(--accent);
        }
        
        .weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
          text-align: center;
          margin-bottom: 0.5rem;
        }
        
        .weekday {
          font-weight: 600;
          color: var(--dark);
          padding: 0.5rem;
        }
        
        .days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
        }
        
        .day {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          font-weight: 500;
        }
        
        .day:hover {
          background-color: rgba(13, 207, 207, 0.1);
        }
        
        .day.available {
          border: 2px solid var(--primary);
          color: var(--primary);
        }
        
        .day.selected {
          background-color: var(--primary);
          color: white;
        }
        
        .day.unavailable {
          color: #ccc;
          cursor: not-allowed;
        }
        
        .time-slots {
          margin-top: 2rem;
        }
        
        .time-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-top: 1rem;
        }
        
        .time-slot {
          padding: 0.6rem;
          text-align: center;
          border: 1px solid #ddd;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.9rem;
        }
        
        .time-slot.available {
          border-color: var(--primary);
          color: var(--primary);
        }
        
        .time-slot.available:hover {
          background-color: var(--primary);
          color: white;
        }
        
        .time-slot.selected {
          background-color: var(--primary);
          color: white;
        }
        
        .time-slot.unavailable {
          color: #ccc;
          cursor: not-allowed;
        }
        
        .doctors-section {
          margin-top: 2rem;
        }
        
        .doctor-cards {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding: 0.5rem 0;
          margin-top: 1rem;
        }
        
        .doctor-card {
          min-width: 200px;
          padding: 1rem;
          border-radius: 10px;
          border: 1px solid #ddd;
          transition: all 0.3s;
          cursor: pointer;
        }
        
        .doctor-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
          border-color: var(--primary);
        }
        
        .doctor-card.selected {
          border-color: var(--primary);
          background-color: rgba(13, 207, 207, 0.05);
        }
        
        .doctor-img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #ddd;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: #888;
        }
        
        .doctor-name {
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        
        .doctor-specialty {
          font-size: 0.8rem;
          color: #666;
          margin-bottom: 0.5rem;
        }
        
        .doctor-rating {
          display: flex;
          align-items: center;
          font-size: 0.8rem;
          color: #f9a825;
        }
        
        .summary-section {
          margin-top: 2rem;
        }
        
        .summary-box {
          background-color: rgba(13, 207, 207, 0.1);
          border-radius: 10px;
          padding: 1.5rem;
          margin-top: 1rem;
        }
        
        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(13, 207, 207, 0.2);
        }
        
        .summary-item:last-child {
          border-bottom: none;
        }
        
        .item-label {
          font-weight: 500;
          color: var(--secondary);
        }
        
        .confirmation-btns {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        
        .benefits {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin: 3rem 0;
          gap: 1.5rem;
        }
        
        .benefit-card {
          flex: 1;
          min-width: 250px;
          padding: 1.5rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .benefit-icon {
          width: 60px;
          height: 60px;
          background-color: rgba(13, 207, 207, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          color: var(--primary);
          margin-bottom: 1rem;
        }
        
        .benefit-title {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--secondary);
        }
        
        footer {
          background-color: var(--secondary);
          color: white;
          padding: 2rem 0;
          margin-top: 4rem;
        }
        
        .footer-content {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
        }
        
        .footer-col {
          flex: 1;
          min-width: 200px;
        }
        
        .footer-title {
          font-weight: 600;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }
        
        .footer-links {
          list-style: none;
        }
        
        .footer-links li {
          margin-bottom: 0.5rem;
        }
        
        .footer-links a {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          transition: color 0.3s;
        }
        
        .footer-links a:hover {
          color: white;
        }
        
        .copyright {
          text-align: center;
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.2);
          font-size: 0.9rem;
          color: rgba(255,255,255,0.7);
        }
        
        @media (max-width: 768px) {
          .booking-container {
            flex-direction: column;
          }
          
          .time-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .logo {
            font-size: 1.4rem;
          }
          
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default DoctorAppointment;
