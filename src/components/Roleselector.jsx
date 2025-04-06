// src/components/Roleselector.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Roleselector = () => {
  const [selected, setSelected] = useState(null);
  const [hoveredRole, setHoveredRole] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (role) => {
    setSelected(role);
    setTimeout(() => {
      navigate(`/signup/${role}`);
    }, 600);
  };

  const roleCards = [
    {
      role: "actor",
      title: "Actor",
      subtitle: "Showcase Your Talent",
      icon: "🎭",
      description: "Join a vibrant community of actors, discover exciting roles, and build your professional portfolio.",
      features: [
        "Create a stunning digital portfolio",
        "Get notified of relevant casting calls",
        "Connect with industry professionals",
        "Track your audition progress"
      ],
      gradient: "from-fuchsia-600 to-pink-600",
      hoverGradient: "from-fuchsia-700 to-pink-700",
      shadowColor: "shadow-fuchsia-500/20",
      bgPattern: "radial-gradient(circle at 50% 50%, rgba(217, 70, 239, 0.05) 0%, transparent 25%)"
    },
    {
      role: "director",
      title: "Director",
      subtitle: "Bring Vision to Life",
      icon: "🎬",
      description: "Access a pool of talented actors, streamline your casting process, and manage productions efficiently.",
      features: [
        "Post and manage casting calls",
        "Advanced actor search filters",
        "Organize audition schedules",
        "Direct messaging with talents"
      ],
      gradient: "from-cyan-500 to-blue-600",
      hoverGradient: "from-cyan-600 to-blue-700",
      shadowColor: "shadow-blue-500/20",
      bgPattern: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 25%)"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#0A0F1C] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0A0F1C] to-[#0A0F1C] flex items-center justify-center p-4 sm:p-8">
      <AnimatePresence mode="wait">
        {!selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl w-full mx-auto"
          >
            <div className="text-center mb-16 relative">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative inline-block"
              >
                <span className="absolute -inset-2 bg-gradient-to-r from-fuchsia-600/20 to-blue-600/20 blur-xl rounded-full" />
                <h1 className="relative text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-blue-600 text-5xl sm:text-7xl font-black tracking-tight mb-4">
                  Film Connect
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto font-medium"
              >
                Where talent meets opportunity in the film industry
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12 px-4">
              {roleCards.map((card, index) => (
                <motion.div
                  key={card.role}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => handleSelect(card.role)}
                  className={`group relative overflow-hidden rounded-3xl cursor-pointer transform transition-all duration-500
                    ${hoveredRole === card.role ? 
                      `bg-gradient-to-br ${card.hoverGradient}` : 
                      `bg-gradient-to-br ${card.gradient}`
                    }
                    ${card.shadowColor} shadow-2xl
                    border border-white/10
                  `}
                  style={{ background: hoveredRole === card.role ? 
                    `${card.hoverGradient}, ${card.bgPattern}` : 
                    `${card.gradient}, ${card.bgPattern}` 
                  }}
                  onHoverStart={() => setHoveredRole(card.role)}
                  onHoverEnd={() => setHoveredRole(null)}
                >
                  <div className="relative z-10 p-8 sm:p-10">
                    <div className="text-6xl mb-6 transform transition-transform duration-300 group-hover:scale-110">{card.icon}</div>
                    <div className="space-y-2 mb-8">
                      <h2 className="text-4xl font-bold text-white">{card.title}</h2>
                      <p className="text-xl text-white/80 font-medium">{card.subtitle}</p>
                    </div>
                    <p className="text-gray-100 mb-8 text-lg leading-relaxed">{card.description}</p>
                    <ul className="space-y-4">
                      {card.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-white/90 text-lg">
                          <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent z-0" />
                  <div className="absolute -bottom-24 -right-24 w-96 h-96 opacity-[0.07] transition-transform duration-500 group-hover:scale-110">
                    <div className="text-white text-[250px]">{card.icon}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <p className="text-gray-400 text-lg">
                Already have an account?{" "}
                <Link 
                  to="/login/actor"
                  className="relative inline-block group"
                >
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-blue-600 font-semibold hover:opacity-80 transition-opacity">
                    Sign in to your account
                  </span>
                  <span className="absolute inset-x-0 -bottom-0.5 h-px bg-gradient-to-r from-fuchsia-500/40 to-blue-600/40 group-hover:h-[2px] transition-all" />
                </Link>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Roleselector;
