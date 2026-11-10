import React, { useState } from 'react';
import { Mail, Phone, MapPin, Building2, CheckCircle2, Send, GraduationCap, Award, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12 font-sans">
      
      {/* Header with NSBM Aerial Feature */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          About NSTAY Web Platform
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Empowering NSBM Green University Students
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          NSTAY is the official boarding discovery web application dedicated to NSBM Green University students, faculty, and local hosts across Homagama and Pitipana.
        </p>
      </div>

      {/* Hero Campus Photo Showcase */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 h-72 sm:h-96 bg-slate-900">
        <img
          src="/src/assets/nsbm_aerial.jpg"
          alt="NSBM Green University Aerial Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Mahenwaththa, Pitipana, Homagama
          </span>
          <h2 className="text-xl sm:text-2xl font-bold mt-1">
            South Asia's First Purpose-Built Green University Campus
          </h2>
          <p className="text-xs text-slate-200 max-w-xl mt-1">
            Spanning over 60 acres with cutting-edge academic infrastructure, student center, and an eco-friendly living ecosystem.
          </p>
        </div>
      </div>

      {/* Core Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-3 shadow-xs">
          <div className="p-3 bg-emerald-50 w-fit rounded-xl text-emerald-700">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Proximity to Faculties</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Quick filtering for rooms within 2 to 10 minutes walking distance from the Faculty of Computing, Business, and Engineering.
          </p>
        </div>

        <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-3 shadow-xs">
          <div className="p-3 bg-blue-50 w-fit rounded-xl text-blue-700">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Verified Peer Reviews</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Reviews posted only by authenticated NSBM students with verified <code>.nsbm.ac.lk</code> domain credentials.
          </p>
        </div>

        <div className="p-6 bg-white border border-slate-200/90 rounded-2xl space-y-3 shadow-xs">
          <div className="p-3 bg-purple-50 w-fit rounded-xl text-purple-700">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Host Empowerment</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Local boarding owners in Homagama and Pitipana can effortlessly list accommodations and manage student reservations without middlemen.
          </p>
        </div>
      </div>

      {/* University Project Context with Computing Faculty Photo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
        <div className="lg:col-span-7 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-1 rounded-md">
            Faculty of Computing Initiative
          </span>
          <h3 className="text-xl font-bold text-slate-900">
            Built by NSBM Students, For NSBM Students
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            NSTAY originated as an academic and technological challenge under the mentorship of senior lecturers and the Dean of the Faculty of Computing at NSBM Green University. The platform was designed to solve the real logistical hurdles faced by first-year and returning undergraduates finding off-campus accommodation in Homagama.
          </p>
          <div className="pt-2">
            <Link
              to="/boardings"
              className="inline-block px-5 py-2.5 bg-[#4e89e7] hover:bg-[#3b78d6] text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
            >
              Browse Student Boardings
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-xl overflow-hidden shadow-md border border-slate-200 aspect-video">
            <img
              src="/src/assets/nsbm_foc.jpg"
              alt="Faculty of Computing NSBM"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

    </div>
  );
}

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSent(false);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12 font-sans">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Get in Touch
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">Contact NSTAY Support</h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
          Have questions about boarding listings, host registration, or university housing? Reach out anytime!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-slate-200 rounded-2xl text-center space-y-2 shadow-xs">
          <MapPin className="w-6 h-6 text-blue-600 mx-auto" />
          <h4 className="text-xs font-bold text-slate-900">Campus Location</h4>
          <p className="text-xs text-slate-500">NSBM Green University, Pitipana, Homagama</p>
        </div>

        <div className="p-6 bg-white border border-slate-200 rounded-2xl text-center space-y-2 shadow-xs">
          <Phone className="w-6 h-6 text-emerald-600 mx-auto" />
          <h4 className="text-xs font-bold text-slate-900">Direct Hotline</h4>
          <p className="text-xs text-slate-500">077 492 1232 / 011 544 5000</p>
        </div>

        <div className="p-6 bg-white border border-slate-200 rounded-2xl text-center space-y-2 shadow-xs">
          <Mail className="w-6 h-6 text-purple-600 mx-auto" />
          <h4 className="text-xs font-bold text-slate-900">Email Inquiries</h4>
          <p className="text-xs text-slate-500">support@nstay.lk</p>
        </div>
      </div>

      {/* Interactive Contact Form */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
        <h3 className="text-lg font-bold text-slate-900 mb-1">Send a Message to NSTAY Team</h3>
        <p className="text-xs text-slate-500 mb-6">We typically reply within 24 hours to students and hosts.</p>

        {sent ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-800 font-semibold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Thank you! Your message has been dispatched to our student assistance team.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sadeesha Jayaweera"
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@students.nsbm.ac.lk"
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Inquiry about boarding near Temple Junction"
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
              <textarea
                rows="4"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe what you are looking for..."
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#4e89e7] hover:bg-[#3b78d6] text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-2 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
