import React, { useMemo, useState } from "react";

import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Leaf,
  UserRound,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Bell,
  Plus,
  ChevronRight,
  Clock3,
  CheckCircle2,
  CircleAlert,
  Activity,
  Menu,
  X,
  ArrowUpRight,
  MoreHorizontal,
  Stethoscope,
  ClipboardList,
  HeartPulse,
  TrendingUp,
  UserPlus,
  CalendarPlus,
  FileText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const initialPatients = [
  {
    id: "AS-1001",
    name: "Aarav Sharma",
    age: 42,
    gender: "Male",
    condition: "Stress & Fatigue",
    therapy: "Abhyanga",
    therapist: "Dr. Mehta",
    status: "Active",
    progress: 72,
    lastVisit: "12 Aug 2026",
  },
  {
    id: "AS-1002",
    name: "Ananya Patel",
    age: 35,
    gender: "Female",
    condition: "Insomnia",
    therapy: "Shirodhara",
    therapist: "Dr. Rao",
    status: "Active",
    progress: 84,
    lastVisit: "12 Aug 2026",
  },
  {
    id: "AS-1003",
    name: "Vikram Joshi",
    age: 51,
    gender: "Male",
    condition: "Digestive Issues",
    therapy: "Virechana",
    therapist: "Dr. Mehta",
    status: "Pending",
    progress: 41,
    lastVisit: "10 Aug 2026",
  },
  {
    id: "AS-1004",
    name: "Meera Kulkarni",
    age: 29,
    gender: "Female",
    condition: "Migraine",
    therapy: "Nasya",
    therapist: "Dr. Kulkarni",
    status: "Active",
    progress: 66,
    lastVisit: "11 Aug 2026",
  },
  {
    id: "AS-1005",
    name: "Rohan Desai",
    age: 46,
    gender: "Male",
    condition: "Joint Stiffness",
    therapy: "Basti",
    therapist: "Dr. Rao",
    status: "Completed",
    progress: 100,
    lastVisit: "08 Aug 2026",
  },
];

const therapies = [
  {
    name: "Abhyanga",
    category: "Oil Therapy",
    description: "Full-body Ayurvedic oil massage used for relaxation and rejuvenation.",
    duration: "60 min",
    patients: 18,
    color: "green",
  },
  {
    name: "Shirodhara",
    category: "Mind & Relaxation",
    description: "Continuous flow of warm herbal oil traditionally used for relaxation.",
    duration: "45 min",
    patients: 12,
    color: "blue",
  },
  {
    name: "Virechana",
    category: "Panchakarma",
    description: "Traditional therapeutic cleansing procedure performed under supervision.",
    duration: "90 min",
    patients: 9,
    color: "orange",
  },
  {
    name: "Basti",
    category: "Panchakarma",
    description: "Traditional Ayurvedic therapeutic treatment administered according to plan.",
    duration: "60 min",
    patients: 7,
    color: "purple",
  },
  {
    name: "Nasya",
    category: "Head & Neck",
    description: "Traditional nasal herbal therapy used within an individualized treatment plan.",
    duration: "30 min",
    patients: 11,
    color: "teal",
  },
  {
    name: "Swedana",
    category: "Heat Therapy",
    description: "Herbal steam therapy commonly integrated into Panchakarma programs.",
    duration: "30 min",
    patients: 15,
    color: "red",
  },
];

const therapists = [
  {
    name: "Dr. Anil Mehta",
    specialty: "Panchakarma Specialist",
    patients: 14,
    appointments: 6,
    status: "Available",
    initials: "AM",
  },
  {
    name: "Dr. Priya Rao",
    specialty: "Ayurvedic Physician",
    patients: 11,
    appointments: 4,
    status: "Available",
    initials: "PR",
  },
  {
    name: "Dr. Neha Kulkarni",
    specialty: "Detox & Wellness",
    patients: 9,
    appointments: 5,
    status: "Busy",
    initials: "NK",
  },
  {
    name: "Dr. Sameer Shah",
    specialty: "Ayurvedic Consultant",
    patients: 8,
    appointments: 3,
    status: "Available",
    initials: "SS",
  },
];

const appointments = [
  {
    time: "09:00 AM",
    patient: "Aarav Sharma",
    therapy: "Abhyanga",
    therapist: "Dr. Mehta",
    status: "Confirmed",
  },
  {
    time: "10:00 AM",
    patient: "Ananya Patel",
    therapy: "Shirodhara",
    therapist: "Dr. Rao",
    status: "Confirmed",
  },
  {
    time: "11:30 AM",
    patient: "Vikram Joshi",
    therapy: "Virechana",
    therapist: "Dr. Mehta",
    status: "Pending",
  },
  {
    time: "01:00 PM",
    patient: "Meera Kulkarni",
    therapy: "Nasya",
    therapist: "Dr. Kulkarni",
    status: "Confirmed",
  },
];

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [page, setPage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const [patients, setPatients] = useState(initialPatients);
  const [search, setSearch] = useState("");

  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  const [selectedPatient, setSelectedPatient] = useState(null);

  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "Female",
    condition: "",
    therapy: "Abhyanga",
    therapist: "Dr. Mehta",
  });

  const [newAppointment, setNewAppointment] = useState({
    patient: "",
    therapy: "Abhyanga",
    therapist: "Dr. Mehta",
    time: "09:00 AM",
  });

  const filteredPatients = useMemo(() => {
    const term = search.toLowerCase();

    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(term) ||
        patient.id.toLowerCase().includes(term) ||
        patient.condition.toLowerCase().includes(term) ||
        patient.therapy.toLowerCase().includes(term)
    );
  }, [patients, search]);

  function login(e) {
    e.preventDefault();

    if (
      email.trim().toLowerCase() === "admin@ayursutra.com" &&
      password === "admin123"
    ) {
      setLoggedIn(true);
      return;
    }

    alert(
      "Invalid login.\n\nDemo credentials:\nadmin@ayursutra.com\nadmin123"
    );
  }

  function logout() {
    setLoggedIn(false);
    setEmail("");
    setPassword("");
  }

  function navigate(destination) {
    setPage(destination);
    setMobileOpen(false);
    setSelectedPatient(null);
  }

  function addPatient(e) {
    e.preventDefault();

    if (!newPatient.name || !newPatient.age || !newPatient.condition) {
      alert("Please complete the required patient information.");
      return;
    }

    const patient = {
      id: `AS-${1000 + patients.length + 1}`,
      name: newPatient.name,
      age: Number(newPatient.age),
      gender: newPatient.gender,
      condition: newPatient.condition,
      therapy: newPatient.therapy,
      therapist: newPatient.therapist,
      status: "Active",
      progress: 0,
      lastVisit: "13 Aug 2026",
    };

    setPatients((current) => [patient, ...current]);

    setNewPatient({
      name: "",
      age: "",
      gender: "Female",
      condition: "",
      therapy: "Abhyanga",
      therapist: "Dr. Mehta",
    });

    setShowPatientModal(false);
  }

  function addAppointment(e) {
    e.preventDefault();

    if (!newAppointment.patient) {
      alert("Please select a patient.");
      return;
    }

    setShowAppointmentModal(false);
    alert("Appointment scheduled successfully.");
  }

  if (!loggedIn) {
    return (
      <LoginScreen
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        login={login}
      />
    );
  }

  return (
    <div className="app-shell">
      <Sidebar
        page={page}
        navigate={navigate}
        logout={logout}
        mobileOpen={mobileOpen}
        closeMobile={() => setMobileOpen(false)}
      />

      <main className="main-content">
        <Topbar
          page={page}
          onMenu={() => setMobileOpen(true)}
          search={search}
          setSearch={setSearch}
        />

        {page === "dashboard" && (
          <Dashboard
            navigate={navigate}
            patients={patients}
            setSelectedPatient={setSelectedPatient}
            setShowPatientModal={setShowPatientModal}
            setShowAppointmentModal={setShowAppointmentModal}
          />
        )}

        {page === "patients" && (
          <PatientsPage
            patients={filteredPatients}
            search={search}
            setSearch={setSearch}
            setShowPatientModal={setShowPatientModal}
            setSelectedPatient={setSelectedPatient}
          />
        )}

        {page === "therapies" && <TherapiesPage />}

        {page === "schedule" && (
          <SchedulePage
            patients={patients}
            setShowAppointmentModal={setShowAppointmentModal}
          />
        )}

        {page === "therapists" && <TherapistsPage />}

        {page === "reports" && <ReportsPage />}

        {page === "settings" && <SettingsPage />}
      </main>

      {showPatientModal && (
        <PatientModal
          patient={newPatient}
          setPatient={setNewPatient}
          onClose={() => setShowPatientModal(false)}
          onSubmit={addPatient}
        />
      )}

      {showAppointmentModal && (
        <AppointmentModal
          appointment={newAppointment}
          setAppointment={setNewAppointment}
          patients={patients}
          onClose={() => setShowAppointmentModal(false)}
          onSubmit={addAppointment}
        />
      )}

      {selectedPatient && (
        <PatientProfile
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
}

function LoginScreen({
  email,
  password,
  setEmail,
  setPassword,
  login,
}) {
  return (
    <div className="login-screen">
      <div className="login-left">
        <div className="login-brand">
          <div className="brand-mark large">
            <Leaf size={32} />
          </div>

          <div>
            <div className="brand-name">AyurSutra</div>
            <div className="brand-tagline">Intelligent Panchakarma Care</div>
          </div>
        </div>

        <div className="login-hero">
          <span className="eyebrow">
            <Sparkles size={14} />
            SMART AYURVEDIC CARE
          </span>

          <h1>
            Transforming
            <br />
            Panchakarma
            <br />
            <span>Management.</span>
          </h1>

          <p>
            A centralized platform for patient management, therapy
            scheduling, practitioner coordination and treatment tracking.
          </p>

          <div className="login-features">
            <div>
              <ShieldCheck />
              <span>Secure patient management</span>
            </div>

            <div>
              <CalendarDays />
              <span>Intelligent therapy scheduling</span>
            </div>

            <div>
              <Activity />
              <span>Real-time treatment tracking</span>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <form className="login-card" onSubmit={login}>
          <div className="mobile-brand">
            <div className="brand-mark">
              <Leaf size={24} />
            </div>
            <strong>AyurSutra</strong>
          </div>

          <div className="login-heading">
            <span className="eyebrow">WELCOME BACK</span>
            <h2>Sign in to your workspace</h2>
            <p>
              Manage your Panchakarma center from one intelligent
              dashboard.
            </p>
          </div>

          <label>Email address</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@ayursutra.com"
          />

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          <div className="login-options">
            <label className="remember">
              <input type="checkbox" />
              Remember me
            </label>

            <button
              type="button"
              className="text-button"
              onClick={() =>
                alert("Please contact your administrator.")
              }
            >
              Forgot password?
            </button>
          </div>

          <button className="login-button">
            Sign in
            <ArrowUpRight size={18} />
          </button>

          <div className="demo-box">
            <strong>Demo Access</strong>
            <span>admin@ayursutra.com</span>
            <span>admin123</span>
          </div>
        </form>

        <div className="login-footer">
          © 2026 AyurSutra · Panchakarma Management Platform
        </div>
      </div>
    </div>
  );
}

function Sidebar({
  page,
  navigate,
  logout,
  mobileOpen,
  closeMobile,
}) {
  const menu = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "patients",
      label: "Patients",
      icon: Users,
    },
    {
      id: "schedule",
      label: "Therapy Schedule",
      icon: CalendarDays,
    },
    {
      id: "therapies",
      label: "Therapies",
      icon: Leaf,
    },
    {
      id: "therapists",
      label: "Therapists",
      icon: UserRound,
    },
    {
      id: "reports",
      label: "Reports & Analytics",
      icon: BarChart3,
    },
  ];

  return (
    <>
      {mobileOpen && (
        <div className="mobile-overlay" onClick={closeMobile} />
      )}

      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="brand-mark">
            <Leaf size={22} />
          </div>

          <div className="sidebar-brand">
            <strong>AyurSutra</strong>
            <span>Care Management</span>
          </div>

          <button className="close-sidebar" onClick={closeMobile}>
            <X />
          </button>
        </div>

        <div className="workspace">
          <span className="workspace-label">WORKSPACE</span>

          <div className="workspace-card">
            <div className="workspace-icon">
              <HeartPulse size={17} />
            </div>

            <div>
              <strong>AyurSutra Wellness</strong>
              <span>Mumbai · Main Center</span>
            </div>

            <ChevronRight size={15} />
          </div>
        </div>

        <nav>
          <span className="nav-label">MAIN MENU</span>

          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={`nav-item ${
                  page === item.id ? "active" : ""
                }`}
                onClick={() => navigate(item.id)}
              >
                <Icon size={19} />
                <span>{item.label}</span>

                {item.id === "schedule" && (
                  <small>5</small>
                )}
              </button>
            );
          })}

          <span className="nav-label secondary">SYSTEM</span>

          <button
            className={`nav-item ${
              page === "settings" ? "active" : ""
            }`}
            onClick={() => navigate("settings")}
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="user-card">
            <div className="avatar">AD</div>

            <div>
              <strong>Administrator</strong>
              <span>Super Admin</span>
            </div>

            <MoreHorizontal size={18} />
          </div>

          <button className="logout-button" onClick={logout}>
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}

function Topbar({
  page,
  onMenu,
  search,
  setSearch,
}) {
  const titles = {
    dashboard: "Good morning, Administrator",
    patients: "Patient Management",
    schedule: "Therapy Schedule",
    therapies: "Panchakarma Therapies",
    therapists: "Therapist Management",
    reports: "Reports & Analytics",
    settings: "System Settings",
  };

  const subtitles = {
    dashboard: "Here is what's happening at your center today.",
    patients: "Manage patient records and treatment journeys.",
    schedule: "Coordinate therapies, practitioners and appointments.",
    therapies: "Manage your center's Panchakarma treatment catalog.",
    therapists: "Monitor practitioners and workload.",
    reports: "Understand patient and therapy performance.",
    settings: "Configure your AyurSutra workspace.",
  };

  return (
    <header className="topbar">
      <button className="mobile-menu" onClick={onMenu}>
        <Menu />
      </button>

      <div className="topbar-title">
        <div className="breadcrumb">
          AyurSutra <ChevronRight size={13} /> {page}
        </div>

        <h1>{titles[page]}</h1>
        <p>{subtitles[page]}</p>
      </div>

      <div className="topbar-actions">
        <div className="top-search">
          <Search size={17} />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patients..."
          />

          <kbd>⌘ K</kbd>
        </div>

        <button
          className="icon-button notification"
          onClick={() =>
            alert(
              "You have 5 pending appointments and 2 patient follow-ups."
            )
          }
        >
          <Bell size={19} />
          <i />
        </button>

        <div className="top-avatar">AD</div>
      </div>
    </header>
  );
}

function Dashboard({
  navigate,
  patients,
  setSelectedPatient,
  setShowPatientModal,
  setShowAppointmentModal,
}) {
  return (
    <div className="page-content">
      <section className="hero-banner">
        <div>
          <span className="eyebrow light">
            <Leaf size={14} />
            AYURVEDIC CARE · 13 AUG 2026
          </span>

          <h2>Better care starts with better coordination.</h2>

          <p>
            Keep every patient, therapy and practitioner aligned from
            one intelligent workspace.
          </p>

          <div className="hero-actions">
            <button
              className="hero-primary"
              onClick={() => setShowAppointmentModal(true)}
            >
              <CalendarPlus size={17} />
              Schedule therapy
            </button>

            <button
              className="hero-secondary"
              onClick={() => setShowPatientModal(true)}
            >
              <UserPlus size={17} />
              Add patient
            </button>
          </div>
        </div>

        <div className="hero-art">
          <div className="hero-circle">
            <Leaf size={70} strokeWidth={1} />
          </div>
        </div>
      </section>

      <div className="stat-grid">
        <StatCard
          title="Total Patients"
          value={patients.length}
          change="+12.5%"
          icon={Users}
          detail="vs last month"
        />

        <StatCard
          title="Today's Therapies"
          value="12"
          change="+8.2%"
          icon={Leaf}
          detail="vs yesterday"
        />

        <StatCard
          title="Active Therapists"
          value="8"
          change="Stable"
          icon={Stethoscope}
          detail="this week"
          neutral
        />

        <StatCard
          title="Completion Rate"
          value="92%"
          change="+4.8%"
          icon={TrendingUp}
          detail="vs last month"
        />
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <PanelHeader
            title="Today's Schedule"
            subtitle="Your upcoming therapy sessions"
            action="View full schedule"
            onClick={() => navigate("schedule")}
          />

          <div className="timeline">
            {appointments.map((appointment, index) => (
              <AppointmentRow
                key={index}
                appointment={appointment}
              />
            ))}
          </div>
        </section>

        <section className="panel">
          <PanelHeader
            title="Treatment Overview"
            subtitle="Current patient progress"
            action="View patients"
            onClick={() => navigate("patients")}
          />

          <div className="progress-list">
            {patients.slice(0, 4).map((patient) => (
              <div className="progress-row" key={patient.id}>
                <div className="mini-avatar">
                  {getInitials(patient.name)}
                </div>

                <div className="progress-info">
                  <div className="progress-title">
                    <strong>{patient.name}</strong>
                    <span>{patient.progress}%</span>
                  </div>

                  <div className="progress-track">
                    <div
                      style={{
                        width: `${patient.progress}%`,
                      }}
                    />
                  </div>

                  <span className="progress-sub">
                    {patient.therapy} · {patient.condition}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="dashboard-grid lower">
        <section className="panel">
          <PanelHeader
            title="Recent Patients"
            subtitle="Latest patient activity"
            action="View all"
            onClick={() => navigate("patients")}
          />

          <div className="patient-list">
            {patients.slice(0, 4).map((patient) => (
              <button
                className="patient-row"
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
              >
                <div className="mini-avatar">
                  {getInitials(patient.name)}
                </div>

                <div>
                  <strong>{patient.name}</strong>
                  <span>
                    {patient.id} · {patient.therapy}
                  </span>
                </div>

                <StatusBadge status={patient.status} />

                <ChevronRight size={17} />
              </button>
            ))}
          </div>
        </section>

        <section className="panel">
          <PanelHeader
            title="Quick Actions"
            subtitle="Common tasks"
          />

          <div className="quick-actions">
            <QuickAction
              icon={UserPlus}
              title="Register patient"
              description="Create a new patient record"
              onClick={() => setShowPatientModal(true)}
            />

            <QuickAction
              icon={CalendarPlus}
              title="Book therapy"
              description="Create a treatment appointment"
              onClick={() => setShowAppointmentModal(true)}
            />

            <QuickAction
              icon={FileText}
              title="Treatment report"
              description="Review patient progress"
              onClick={() => navigate("reports")}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function PatientsPage({
  patients,
  search,
  setSearch,
  setShowPatientModal,
  setSelectedPatient,
}) {
  return (
    <div className="page-content">
      <div className="page-toolbar">
        <div>
          <h2>All Patients</h2>
          <p>{patients.length} patients found</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowPatientModal(true)}
        >
          <Plus size={18} />
          Register patient
        </button>
      </div>

      <div className="filter-bar">
        <div className="filter-search">
          <Search size={18} />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID, condition or therapy..."
          />
        </div>

        <button className="filter-button">
          All patients
        </button>

        <button className="filter-button">
          Active
        </button>

        <button className="filter-button">
          Pending
        </button>
      </div>

      <section className="panel table-panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Patient ID</th>
                <th>Age / Gender</th>
                <th>Condition</th>
                <th>Therapy</th>
                <th>Progress</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>
                    <button
                      className="table-patient"
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <div className="mini-avatar">
                        {getInitials(patient.name)}
                      </div>

                      <div>
                        <strong>{patient.name}</strong>
                        <span>Last visit · {patient.lastVisit}</span>
                      </div>
                    </button>
                  </td>

                  <td>
                    <span className="muted-code">{patient.id}</span>
                  </td>

                  <td>
                    {patient.age} / {patient.gender}
                  </td>

                  <td>{patient.condition}</td>

                  <td>
                    <span className="therapy-pill">
                      {patient.therapy}
                    </span>
                  </td>

                  <td>
                    <div className="table-progress">
                      <div className="progress-track">
                        <div
                          style={{
                            width: `${patient.progress}%`,
                          }}
                        />
                      </div>

                      <span>{patient.progress}%</span>
                    </div>
                  </td>

                  <td>
                    <StatusBadge status={patient.status} />
                  </td>

                  <td>
                    <button className="row-more">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {patients.length === 0 && (
            <div className="empty-state">
              <Search size={30} />
              <strong>No patients found</strong>
              <span>Try a different search term.</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function TherapiesPage() {
  return (
    <div className="page-content">
      <div className="page-toolbar">
        <div>
          <h2>Therapy Catalog</h2>
          <p>6 active Panchakarma and wellness therapies</p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            alert("Therapy creation module is ready for integration.")
          }
        >
          <Plus size={18} />
          Add therapy
        </button>
      </div>

      <div className="therapy-grid">
        {therapies.map((therapy) => (
          <div className="therapy-card" key={therapy.name}>
            <div className={`therapy-icon ${therapy.color}`}>
              <Leaf size={23} />
            </div>

            <div className="therapy-card-top">
              <span>{therapy.category}</span>
              <button className="row-more">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <h3>{therapy.name}</h3>

            <p>{therapy.description}</p>

            <div className="therapy-meta">
              <span>
                <Clock3 size={15} />
                {therapy.duration}
              </span>

              <span>
                <Users size={15} />
                {therapy.patients} patients
              </span>
            </div>

            <button
              className="therapy-action"
              onClick={() =>
                alert(`${therapy.name} details opened.`)
              }
            >
              View therapy details
              <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SchedulePage({
  patients,
  setShowAppointmentModal,
}) {
  return (
    <div className="page-content">
      <div className="page-toolbar">
        <div>
          <h2>Therapy Calendar</h2>
          <p>Thursday, 13 August 2026</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowAppointmentModal(true)}
        >
          <Plus size={18} />
          New appointment
        </button>
      </div>

      <div className="schedule-layout">
        <section className="panel">
          <div className="calendar-header">
            <button className="calendar-nav">‹</button>
            <strong>August 2026</strong>
            <button className="calendar-nav">›</button>
          </div>

          <div className="week-days">
            {[
              "MON",
              "TUE",
              "WED",
              "THU",
              "FRI",
              "SAT",
              "SUN",
            ].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="calendar-grid">
            {Array.from({ length: 31 }, (_, index) => {
              const day = index + 1;
              const selected = day === 13;

              return (
                <div
                  className={`calendar-day ${
                    selected ? "selected" : ""
                  }`}
                  key={day}
                >
                  <span>{day}</span>

                  {day === 13 && (
                    <>
                      <div className="calendar-event green">
                        09:00 Abhyanga
                      </div>

                      <div className="calendar-event blue">
                        10:00 Shirodhara
                      </div>
                    </>
                  )}

                  {day === 14 && (
                    <div className="calendar-event orange">
                      11:30 Virechana
                    </div>
                  )}

                  {day === 17 && (
                    <div className="calendar-event purple">
                      10:00 Basti
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="panel today-panel">
          <PanelHeader
            title="Today's appointments"
            subtitle="4 scheduled sessions"
          />

          <div className="appointment-stack">
            {appointments.map((appointment, index) => (
              <AppointmentCard
                key={index}
                appointment={appointment}
              />
            ))}
          </div>

          <div className="capacity-card">
            <div>
              <span>Today's capacity</span>
              <strong>68%</strong>
            </div>

            <div className="capacity-track">
              <div />
            </div>

            <small>
              12 of 18 therapy slots booked
            </small>
          </div>
        </section>
      </div>
    </div>
  );
}

function TherapistsPage() {
  return (
    <div className="page-content">
      <div className="page-toolbar">
        <div>
          <h2>Clinical Team</h2>
          <p>Manage practitioners and their current workload.</p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            alert("Therapist registration module opened.")
          }
        >
          <Plus size={18} />
          Add therapist
        </button>
      </div>

      <div className="therapist-grid">
        {therapists.map((therapist) => (
          <div className="therapist-card" key={therapist.name}>
            <div className="therapist-head">
              <div className="large-avatar">
                {therapist.initials}
              </div>

              <button className="row-more">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <h3>{therapist.name}</h3>
            <p>{therapist.specialty}</p>

            <div className="availability">
              <span
                className={
                  therapist.status === "Available"
                    ? "dot green-dot"
                    : "dot orange-dot"
                }
              />

              {therapist.status}
            </div>

            <div className="therapist-stats">
              <div>
                <strong>{therapist.patients}</strong>
                <span>Patients</span>
              </div>

              <div>
                <strong>{therapist.appointments}</strong>
                <span>Today</span>
              </div>
            </div>

            <button
              className="view-profile"
              onClick={() =>
                alert(`${therapist.name} profile opened.`)
              }
            >
              View profile
              <ArrowUpRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsPage() {
  return (
    <div className="page-content">
      <div className="page-toolbar">
        <div>
          <h2>Performance Overview</h2>
          <p>Center activity for August 2026</p>
        </div>

        <button
          className="secondary-button"
          onClick={() =>
            alert("Report export prepared.")
          }
        >
          <FileText size={17} />
          Export report
        </button>
      </div>

      <div className="stat-grid">
        <StatCard
          title="Patients Served"
          value="148"
          change="+18.4%"
          icon={Users}
          detail="this month"
        />

        <StatCard
          title="Therapies Completed"
          value="426"
          change="+11.7%"
          icon={CheckCircle2}
          detail="this month"
        />

        <StatCard
          title="Appointments"
          value="512"
          change="+9.2%"
          icon={CalendarDays}
          detail="this month"
        />

        <StatCard
          title="Patient Satisfaction"
          value="94%"
          change="+2.6%"
          icon={HeartPulse}
          detail="average score"
        />
      </div>

      <div className="dashboard-grid">
        <section className="panel chart-panel">
          <PanelHeader
            title="Therapy Activity"
            subtitle="Completed sessions over the last 7 months"
          />

          <div className="bar-chart">
            {[55, 70, 62, 84, 73, 91, 86].map(
              (height, index) => (
                <div className="bar-column" key={index}>
                  <div className="bar-value">{height}</div>

                  <div className="bar-area">
                    <div style={{ height: `${height}%` }} />
                  </div>

                  <span>
                    {
                      [
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                      ][index]
                    }
                  </span>
                </div>
              )
            )}
          </div>
        </section>

        <section className="panel">
          <PanelHeader
            title="Therapy Distribution"
            subtitle="Current treatment mix"
          />

          <div className="distribution">
            <div className="donut">
              <div>
                <strong>72</strong>
                <span>patients</span>
              </div>
            </div>

            <div className="legend">
              <Legend color="green" label="Abhyanga" value="26%" />
              <Legend color="blue" label="Shirodhara" value="21%" />
              <Legend color="orange" label="Virechana" value="18%" />
              <Legend color="purple" label="Basti" value="14%" />
              <Legend color="teal" label="Other" value="21%" />
            </div>
          </div>
        </section>
      </div>

      <section className="panel insights-panel">
        <div className="insight-icon">
          <Sparkles size={22} />
        </div>

        <div>
          <span className="eyebrow">SYSTEM INSIGHT</span>

          <h3>
            Patient engagement is trending upward.
          </h3>

          <p>
            Appointment completion has increased by 9.2% this month,
            while average patient satisfaction reached 94%.
          </p>
        </div>

        <ArrowUpRight size={22} />
      </section>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="page-content">
      <section className="panel settings-panel">
        <div className="settings-heading">
          <div className="settings-icon">
            <Settings />
          </div>

          <div>
            <h2>Workspace Settings</h2>
            <p>Configure your AyurSutra workspace.</p>
          </div>
        </div>

        <div className="settings-row">
          <div>
            <strong>Center name</strong>
            <span>Displayed throughout the dashboard</span>
          </div>

          <input defaultValue="AyurSutra Wellness Center" />
        </div>

        <div className="settings-row">
          <div>
            <strong>Location</strong>
            <span>Primary treatment center</span>
          </div>

          <input defaultValue="Mumbai, Maharashtra" />
        </div>

        <div className="settings-row">
          <div>
            <strong>Appointment reminders</strong>
            <span>Send reminders for upcoming therapy sessions</span>
          </div>

          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span />
          </label>
        </div>

        <div className="settings-row">
          <div>
            <strong>Patient notifications</strong>
            <span>Enable patient communication features</span>
          </div>

          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span />
          </label>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            alert("Settings saved successfully.")
          }
        >
          Save changes
        </button>
      </section>
    </div>
  );
}

function PatientModal({
  patient,
  setPatient,
  onClose,
  onSubmit,
}) {
  return (
    <Modal title="Register New Patient" onClose={onClose}>
      <form onSubmit={onSubmit}>
        <div className="form-grid">
          <FormField label="Full name *">
            <input
              value={patient.name}
              onChange={(e) =>
                setPatient({
                  ...patient,
                  name: e.target.value,
                })
              }
              placeholder="Patient name"
            />
          </FormField>

          <FormField label="Age *">
            <input
              type="number"
              value={patient.age}
              onChange={(e) =>
                setPatient({
                  ...patient,
                  age: e.target.value,
                })
              }
              placeholder="Age"
            />
          </FormField>

          <FormField label="Gender">
            <select
              value={patient.gender}
              onChange={(e) =>
                setPatient({
                  ...patient,
                  gender: e.target.value,
                })
              }
            >
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
          </FormField>

          <FormField label="Primary condition *">
            <input
              value={patient.condition}
              onChange={(e) =>
                setPatient({
                  ...patient,
                  condition: e.target.value,
                })
              }
              placeholder="e.g. Stress & Fatigue"
            />
          </FormField>

          <FormField label="Therapy">
            <select
              value={patient.therapy}
              onChange={(e) =>
                setPatient({
                  ...patient,
                  therapy: e.target.value,
                })
              }
            >
              {therapies.map((therapy) => (
                <option key={therapy.name}>
                  {therapy.name}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Assigned therapist">
            <select
              value={patient.therapist}
              onChange={(e) =>
                setPatient({
                  ...patient,
                  therapist: e.target.value,
                })
              }
            >
              <option>Dr. Mehta</option>
              <option>Dr. Rao</option>
              <option>Dr. Kulkarni</option>
              <option>Dr. Shah</option>
            </select>
          </FormField>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="secondary-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button type="submit" className="primary-button">
            <UserPlus size={17} />
            Register patient
          </button>
        </div>
      </form>
    </Modal>
  );
}

function AppointmentModal({
  appointment,
  setAppointment,
  patients,
  onClose,
  onSubmit,
}) {
  return (
    <Modal title="Schedule Therapy" onClose={onClose}>
      <form onSubmit={onSubmit}>
        <div className="form-grid">
          <FormField label="Patient *">
            <select
              value={appointment.patient}
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  patient: e.target.value,
                })
              }
            >
              <option value="">Select patient</option>

              {patients.map((patient) => (
                <option key={patient.id} value={patient.name}>
                  {patient.name} · {patient.id}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Therapy">
            <select
              value={appointment.therapy}
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  therapy: e.target.value,
                })
              }
            >
              {therapies.map((therapy) => (
                <option key={therapy.name}>
                  {therapy.name}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Therapist">
            <select
              value={appointment.therapist}
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  therapist: e.target.value,
                })
              }
            >
              <option>Dr. Mehta</option>
              <option>Dr. Rao</option>
              <option>Dr. Kulkarni</option>
              <option>Dr. Shah</option>
            </select>
          </FormField>

          <FormField label="Time">
            <select
              value={appointment.time}
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  time: e.target.value,
                })
              }
            >
              <option>09:00 AM</option>
              <option>10:00 AM</option>
              <option>11:30 AM</option>
              <option>01:00 PM</option>
              <option>02:30 PM</option>
              <option>04:00 PM</option>
            </select>
          </FormField>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="secondary-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button type="submit" className="primary-button">
            <CalendarPlus size={17} />
            Schedule appointment
          </button>
        </div>
      </form>
    </Modal>
  );
}

function PatientProfile({
  patient,
  onClose,
}) {
  return (
    <div className="modal-backdrop">
      <div className="profile-modal">
        <div className="profile-modal-header">
          <div>
            <span className="eyebrow">PATIENT PROFILE</span>
            <h2>{patient.name}</h2>
            <p>{patient.id}</p>
          </div>

          <button className="close-modal" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="profile-summary">
          <div className="profile-avatar">
            {getInitials(patient.name)}
          </div>

          <div>
            <strong>{patient.condition}</strong>
            <span>
              {patient.age} years · {patient.gender}
            </span>
          </div>

          <StatusBadge status={patient.status} />
        </div>

        <div className="profile-grid">
          <div>
            <span>Current therapy</span>
            <strong>{patient.therapy}</strong>
          </div>

          <div>
            <span>Therapist</span>
            <strong>{patient.therapist}</strong>
          </div>

          <div>
            <span>Last visit</span>
            <strong>{patient.lastVisit}</strong>
          </div>

          <div>
            <span>Treatment progress</span>
            <strong>{patient.progress}%</strong>
          </div>
        </div>

        <div className="profile-progress">
          <div className="profile-progress-header">
            <strong>Treatment Journey</strong>
            <span>{patient.progress}% completed</span>
          </div>

          <div className="progress-track large">
            <div
              style={{
                width: `${patient.progress}%`,
              }}
            />
          </div>
        </div>

        <div className="profile-actions">
          <button
            className="secondary-button"
            onClick={() =>
              alert("Patient treatment history opened.")
            }
          >
            <ClipboardList size={17} />
            Treatment history
          </button>

          <button
            className="primary-button"
            onClick={() =>
              alert("New therapy appointment opened.")
            }
          >
            <CalendarPlus size={17} />
            Schedule therapy
          </button>
        </div>
      </div>
    </div>
  );
}

function Modal({
  title,
  onClose,
  children,
}) {
  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <span className="eyebrow">AYURSUTRA</span>
            <h2>{title}</h2>
          </div>

          <button className="close-modal" onClick={onClose}>
            <X />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

function FormField({
  label,
  children,
}) {
  return (
    <label className="form-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  detail,
  neutral,
}) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className="stat-icon">
          <Icon size={19} />
        </div>

        <span
          className={`stat-change ${
            neutral ? "neutral" : ""
          }`}
        >
          {change}
        </span>
      </div>

      <strong>{value}</strong>
      <span className="stat-title">{title}</span>
      <small>{detail}</small>
    </div>
  );
}

function PanelHeader({
  title,
  subtitle,
  action,
  onClick,
}) {
  return (
    <div className="panel-header">
      <div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>

      {action && (
        <button className="panel-action" onClick={onClick}>
          {action}
          <ChevronRight size={15} />
        </button>
      )}
    </div>
  );
}

function AppointmentRow({
  appointment,
}) {
  return (
    <div className="appointment-row">
      <div className="appointment-time">
        <Clock3 size={15} />
        {appointment.time}
      </div>

      <div className="appointment-patient">
        <div className="mini-avatar">
          {getInitials(appointment.patient)}
        </div>

        <div>
          <strong>{appointment.patient}</strong>
          <span>{appointment.therapy}</span>
        </div>
      </div>

      <div className="appointment-therapist">
        {appointment.therapist}
      </div>

      <StatusBadge status={appointment.status} />
    </div>
  );
}

function AppointmentCard({
  appointment,
}) {
  return (
    <div className="appointment-card">
      <div className="appointment-card-time">
        {appointment.time}
      </div>

      <div className="appointment-card-info">
        <strong>{appointment.patient}</strong>
        <span>
          {appointment.therapy} · {appointment.therapist}
        </span>
      </div>

      <StatusBadge status={appointment.status} />
    </div>
  );
}

function QuickAction({
  icon: Icon,
  title,
  description,
  onClick,
}) {
  return (
    <button className="quick-action" onClick={onClick}>
      <div className="quick-icon">
        <Icon size={19} />
      </div>

      <div>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      <ChevronRight size={17} />
    </button>
  );
}

function StatusBadge({
  status,
}) {
  const className = status
    .toLowerCase()
    .replace(/\s/g, "-");

  return (
    <span className={`status-badge ${className}`}>
      {status === "Confirmed" && (
        <CheckCircle2 size={13} />
      )}

      {status === "Pending" && (
        <CircleAlert size={13} />
      )}

      {status === "Active" && (
        <Activity size={13} />
      )}

      {status === "Completed" && (
        <CheckCircle2 size={13} />
      )}

      {status}
    </span>
  );
}

function Legend({
  color,
  label,
  value,
}) {
  return (
    <div className="legend-row">
      <span className={`legend-dot ${color}`} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default App;
