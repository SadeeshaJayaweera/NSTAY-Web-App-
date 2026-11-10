import React from 'react';
import { Dumbbell, Coffee, BookOpen, Bus, Users, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ActivitiesPage() {
  const activities = [
    {
      icon: <Dumbbell className="w-5 h-5 text-emerald-600" />,
      title: "NSBM Olympic Sports Complex & Pool",
      desc: "Full Olympic-standard 50m swimming pool, international indoor gymnasium, basketball and tennis courts, and university cricket grounds. Most Pitipana boardings are within 3-8 minutes walking distance.",
      location: "Inside NSBM Campus Ground",
      image: "/src/assets/nsbm_sports_pool.jpg"
    },
    {
      icon: <Coffee className="w-5 h-5 text-amber-600" />,
      title: "Student Cafeterias & Late Night Hangouts",
      desc: "Pitipana and Temple Junction host vibrant student eateries, fresh juice bars, bakeries, and dining lounges offering budget-friendly student meals open until late during exam weeks.",
      location: "Pitipana & Temple Junction",
      image: "/src/assets/nsbm_cafe_hangout.jpg"
    },
    {
      icon: <BookOpen className="w-5 h-5 text-blue-600" />,
      title: "Modern Library & 24/7 Study Pods",
      desc: "Multi-floor state-of-the-art university library equipped with high-speed fiber internet, research carrels, computer pods, and air-conditioned silent study floors.",
      location: "NSBM Central Academic Complex",
      image: "/src/assets/nsbm_library_life.jpg"
    },
    {
      icon: <Bus className="w-5 h-5 text-purple-600" />,
      title: "NSBM Shuttle & Transit Services",
      desc: "Direct bus connections from Homagama Railway Station (Route 128, 280) stopping right outside NSBM university gates every 10 minutes, connecting boardings across the region.",
      location: "Pitipana Main Bus Stand",
      image: "/src/assets/nsbm_campus_front.jpg"
    },
    {
      icon: <Users className="w-5 h-5 text-rose-600" />,
      title: "Academic Collaboration & Hackathons",
      desc: "Active computing clubs, business societies, IEEE student branches, and project hackathons that bring undergraduates together across all academic faculties.",
      location: "Faculty of Computing & Student Center",
      image: "/src/assets/nsbm_student_discussion.jpg"
    },
    {
      icon: <Shield className="w-5 h-5 text-teal-600" />,
      title: "24/7 Campus Security & Gated Boardings",
      desc: "The Pitipana green perimeter is under dedicated university security patrols, ensuring safe and well-lit walking paths for students returning from evening lectures.",
      location: "Perimeter & Mahenwaththa Road",
      image: "/src/assets/nsbm_campus_students.jpg"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 font-sans">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Campus Life & Surrounding Activities
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Life Around NSBM Green University
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Living near campus offers seamless access to world-class sports amenities, study sanctuaries, convenient bus routes, and a thriving student community in Pitipana and Homagama.
        </p>
      </div>

      {/* Visual Activity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((act, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={act.image}
                  alt={act.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                  {act.location}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-slate-50 rounded-lg border border-slate-100">
                    {act.icon}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {act.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed pt-1">
                  {act.desc}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <Link
                to="/boardings"
                className="w-full py-2 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-xs font-semibold rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Find Boardings Near Here</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Footer */}
      <div className="p-8 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl text-center text-white space-y-3 shadow-lg">
        <h3 className="text-xl font-bold">
          Ready to Choose a Boarding Close to Campus Facilities?
        </h3>
        <p className="text-xs text-emerald-100 max-w-xl mx-auto">
          Filter accommodations by walking distance to the sports complex, library, or Pitipana Junction in our directory.
        </p>
        <div className="pt-2">
          <Link
            to="/boardings"
            className="inline-block px-7 py-2.5 bg-white text-emerald-900 text-xs font-bold rounded-lg shadow-sm hover:bg-emerald-50 transition-colors"
          >
            Explore Boarding Directory
          </Link>
        </div>
      </div>

    </div>
  );
}
