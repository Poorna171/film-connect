import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaUpload, FaFile } from 'react-icons/fa';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';

const ApplyToRole = () => {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actorPortfolio, setActorPortfolio] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    const fetchRoleAndPortfolio = async () => {
      try {
        // Fetch role details
        const savedRoles = JSON.parse(localStorage.getItem('roles') || '[]');
        const roleData = savedRoles.find(r => r.id === parseInt(roleId));
        if (!roleData) throw new Error('Role not found');
        setRole(roleData);

        // Fetch actor's portfolio
        // For now, we'll use a mock portfolio since we don't have an API
        const mockPortfolio = {
          bio: "Experienced actor with 5 years in theater and film",
          skills: ["Acting", "Voice-over", "Stunts"],
          experience: "Lead role in 3 independent films, supporting role in TV series"
        };
        setActorPortfolio(mockPortfolio);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoleAndPortfolio();
  }, [roleId]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setResumeFile(file);
      setResumeUrl(''); // Clear URL if file is uploaded
    } else {
      alert('Please upload a PDF or Word document');
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setResumeUrl(''); // Clear URL if file is uploaded
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    try {
      if (!resumeFile && !resumeUrl) {
        alert('Please provide either a resume file or URL');
        return;
      }

      // For now, we'll save to localStorage since we don't have an API
      const applications = JSON.parse(localStorage.getItem('applications') || '[]');
      const newApplication = {
        id: Date.now(),
        actorId: currentUser.uid,
        roleId: role.id,
        roleTitle: role.title,
        portfolio: actorPortfolio,
        status: 'Pending',
        submittedAt: new Date().toISOString(),
        coverLetter: e.target.coverLetter.value,
        resume: resumeFile ? resumeFile.name : resumeUrl,
        availability: e.target.availability.value
      };
      
      applications.push(newApplication);
      localStorage.setItem('applications', JSON.stringify(applications));
      
      alert('🎉 Application submitted successfully!');
      navigate('/actor/applications');
    } catch (err) {
      console.error('Error submitting application:', err);
      alert('Failed to apply');
    }
  };

  if (loading) {
    return (
      <DashboardLayout userRole="actor">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout userRole="actor">
        <div className="text-center text-red-500">{error}</div>
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/actor/roles')}
            className="px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Back to Roles
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="actor">
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => navigate('/actor/roles')}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <FaArrowLeft className="w-4 h-4 mr-2" />
          Back to Roles
        </button>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
          <h1 className="text-2xl font-bold mb-4">Apply for {role.title}</h1>
          
          <div className="mb-6 space-y-4">
            <p className="text-gray-400">{role.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
              <div>
                <span className="font-medium">Location:</span> {role.location}
              </div>
              <div>
                <span className="font-medium">Deadline:</span>{' '}
                {new Date(role.deadline).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Requirements:</span> {role.requirements}
              </div>
              <div>
                <span className="font-medium">Compensation:</span> {role.compensation}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmitApplication} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Cover Letter
              </label>
              <textarea
                name="coverLetter"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                rows="6"
                placeholder="Tell us why you're perfect for this role..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Resume (Upload or URL)
              </label>
              <div className="space-y-4">
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    isDragging ? 'border-fuchsia-500 bg-fuchsia-500/10' : 'border-white/10'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="resume-upload"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileInput}
                  />
                  <label
                    htmlFor="resume-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <FaUpload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-gray-400">
                      Drag and drop your resume here, or{' '}
                      <span className="text-fuchsia-500">click to browse</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Supported formats: PDF, DOC, DOCX
                    </p>
                  </label>
                </div>

                {resumeFile && (
                  <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                    <div className="flex items-center">
                      <FaFile className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-gray-400">{resumeFile.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setResumeFile(null)}
                      className="text-red-500 hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                )}

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#0A0F1C] text-gray-400">OR</span>
                  </div>
                </div>

                <input
                  type="url"
                  value={resumeUrl}
                  onChange={(e) => {
                    setResumeUrl(e.target.value);
                    setResumeFile(null); // Clear file if URL is entered
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                  placeholder="Enter resume URL (optional if file is uploaded)"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Availability
              </label>
              <input
                type="text"
                name="availability"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                placeholder="Your availability for this role"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/actor/roles')}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Submit Application
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplyToRole; 