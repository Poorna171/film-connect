import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';

const reportReasons = [
  {
    id: 'spam',
    label: 'Spam',
    description: 'Posting unwanted commercial content or spam'
  },
  {
    id: 'inappropriate',
    label: 'Inappropriate Content',
    description: 'Photos or videos that contain inappropriate content'
  },
  {
    id: 'fake',
    label: 'Fake Profile',
    description: 'Profile that impersonates someone else'
  },
  {
    id: 'harassment',
    label: 'Harassment or Bullying',
    description: 'Harassing or bullying other users'
  },
  {
    id: 'hate_speech',
    label: 'Hate Speech',
    description: 'Hate speech or symbols'
  },
  {
    id: 'violence',
    label: 'Violence or Dangerous Organizations',
    description: 'Promoting violence or dangerous organizations'
  },
  {
    id: 'intellectual_property',
    label: 'Intellectual Property Violation',
    description: 'Copyright or trademark infringement'
  },
  {
    id: 'scam',
    label: 'Scam or Fraud',
    description: 'Fraudulent or misleading content'
  }
];

const ReportModal = ({ isOpen, onClose, targetId }) => {
  const [selectedReason, setSelectedReason] = useState(null);
  const [step, setStep] = useState('select'); // 'select', 'confirm', 'success'
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (step === 'select' && selectedReason) {
      setStep('confirm');
    } else if (step === 'confirm') {
      // Here you would typically send the report to your backend
      console.log('Submitting report:', {
        targetId,
        reason: selectedReason,
        description
      });
      setStep('success');
    }
  };

  const handleClose = () => {
    setStep('select');
    setSelectedReason(null);
    setDescription('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-[#0A0F1C] rounded-xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="border-b border-white/10 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Report</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {step === 'select' && (
            <>
              <p className="text-gray-400 mb-4">
                Please select a reason for reporting this profile:
              </p>
              <div className="space-y-2">
                {reportReasons.map((reason) => (
                  <button
                    key={reason.id}
                    onClick={() => setSelectedReason(reason.id)}
                    className={`w-full p-4 rounded-lg text-left transition-colors ${
                      selectedReason === reason.id
                        ? 'bg-fuchsia-500'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-medium">{reason.label}</div>
                    <div className="text-sm text-gray-400 mt-1">
                      {reason.description}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 'confirm' && (
            <>
              <div className="flex items-center space-x-3 text-yellow-500 mb-4">
                <AlertTriangle className="w-5 h-5" />
                <span>Additional Information</span>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please provide any additional details about your report..."
                className="w-full h-32 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-fuchsia-500 resize-none"
              />
            </>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Thank You for Reporting</h3>
              <p className="text-gray-400">
                We'll review your report and take appropriate action.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 p-4 flex justify-end space-x-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            Cancel
          </button>
          {step !== 'success' && (
            <button
              onClick={handleSubmit}
              disabled={step === 'select' && !selectedReason}
              className={`px-4 py-2 rounded-lg transition-colors ${
                step === 'select' && !selectedReason
                  ? 'bg-white/10 cursor-not-allowed'
                  : 'bg-fuchsia-500 hover:bg-fuchsia-600'
              }`}
            >
              {step === 'select' ? 'Next' : 'Submit Report'}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReportModal; 