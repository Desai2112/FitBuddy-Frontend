import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaDumbbell } from 'react-icons/fa';
import axiosInstance from '../../api/axios';

const OtpVerificationModal = ({
  isOpen,
  onClose,
  email,
  onVerificationSuccess,
  title = "Verify Your Email",
  description = "Enter the 6-digit code we sent to your email"
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOpen]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return;

    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Clear errors when user types
    if (error) setError('');

    // Auto-focus next input or blur the last one
    if (value) {
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      } else {
        inputRefs.current[index].blur();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();

    // If pasted data looks like a 6-digit code
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);

      // Focus the last input
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all digits are filled
    if (otp.some(digit => digit === '')) {
      setError('Please enter all digits of the verification code');
      return;
    }

    setLoading(true);

    try {
      // Call the verify endpoint
      const response = await axiosInstance.post('/api/auth/verify', {
        email: email,
        otp: otp.join(''),
      });

      if (response.data.success) {
        // Call the success callback
        onVerificationSuccess();
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Invalid verification code. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendDisabled(true);
    setCountdown(60); // 60 second cooldown

    try {
      // Call resend endpoint
      await axiosInstance.post('/api/auth/resend-otp', {
        email: email
      });

      // Clear existing OTP values
      setOtp(['', '', '', '', '', '']);

      // Focus first input
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Failed to resend verification code. Please try again later.'
      );
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      initial="hidden"
      animate="visible"
      variants={overlayVariants}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative z-10"
        variants={modalVariants}
        onClick={e => e.stopPropagation()}
      >
        <motion.div className="flex justify-center mb-6" variants={itemVariants}>
          <div className="text-3xl flex items-center gap-2 font-bold uppercase">
            <FaDumbbell style={{ color: '#0eab8f' }} />
            <p>FIT</p>
            <p style={{ color: '#0eab8f' }}>BUDDY</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="mt-2 text-center text-3xl font-bold text-gray-800">
            {title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {description} {email && <span className="font-semibold">{email}</span>}
          </p>
        </motion.div>

        {error && (
          <motion.div
            className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded"
            variants={itemVariants}
          >
            <p className="text-red-700 text-sm">{error}</p>
          </motion.div>
        )}

        <motion.form
          className="mt-8 space-y-5"
          onSubmit={handleSubmit}
          variants={itemVariants}
        >
          <motion.div
            className="flex justify-center space-x-3"
            variants={itemVariants}
            onPaste={handlePaste}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{
                  focusRing: '#0eab8f',
                  '--tw-ring-color': 'rgba(14, 171, 143, 0.5)'
                }}
              />
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <button
              type="submit"
              disabled={loading || otp.some(digit => !digit)}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-300 relative overflow-hidden disabled:opacity-70"
              style={{ background: 'linear-gradient(135deg, #0eab8f 0%, #0ba380 100%)' }}
            >
              <motion.span
                className="absolute inset-0 z-0"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
                  backgroundSize: '200% 100%'
                }}
              />
              <span className="relative z-10">
                {loading ? 'Verifying...' : 'Verify Code'}
              </span>
            </button>
          </motion.div>

          <motion.div
            className="text-center mt-4"
            variants={itemVariants}
          >
            <p className="text-sm text-gray-600">
              Didn't receive the code?{' '}
              {resendDisabled ? (
                <span className="text-sm text-gray-500">
                  Resend in {countdown}s
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="font-semibold hover:text-opacity-80"
                  style={{ color: '#0eab8f' }}
                >
                  Resend Code
                </button>
              )}
            </p>
          </motion.div>

          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-medium hover:underline"
              style={{ color: '#0eab8f' }}
            >
              Cancel
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default OtpVerificationModal;