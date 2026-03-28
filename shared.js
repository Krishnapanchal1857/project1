// ══════════════════════════════════════════
// SAKSHAR — Shared JS (auth, data, utils)
// ══════════════════════════════════════════

// ── AUTH ──
const ADMIN_EMAIL = 'admin@sakshar.edu';
const ADMIN_PASS  = 'Sakshar@Admin2025';

function getUsers(){try{return JSON.parse(localStorage.getItem('sakshar_users')||'[]')}catch{return[]}}
function saveUsers(u){localStorage.setItem('sakshar_users',JSON.stringify(u))}
function getCurrentUser(){try{return JSON.parse(localStorage.getItem('sakshar_current')||'null')}catch{return null}}
function setCurrentUser(u){localStorage.setItem('sakshar_current',JSON.stringify(u))}
function clearCurrentUser(){localStorage.removeItem('sakshar_current')}
function isAdmin(){const u=getCurrentUser();return u&&u.email===ADMIN_EMAIL}

function requireAuth(){
  const u=getCurrentUser();
  if(!u){showToast('🔐 Please login first!','warn');setTimeout(()=>{window.location.href='login.html'},1200);return false;}
  return true;
}
function requireAdmin(){
  if(!isAdmin()){showToast('🔐 Admin access only!','warn');setTimeout(()=>{window.location.href='login.html'},1200);return false;}
  return true;
}

// ── TOAST ──
let toastTimer;
function showToast(msg,type='ok'){
  let t=document.getElementById('sakshar-toast');
  if(!t){t=document.createElement('div');t.id='sakshar-toast';t.className='toast';t.innerHTML='<span id="t-msg"></span>';document.body.appendChild(t);}
  document.getElementById('t-msg').textContent=msg;
  t.style.borderLeftColor=type==='warn'?'#D97706':type==='err'?'#DC2626':'var(--saffron)';
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),3200);
}

// ── NAV RENDER ──
function renderNav(active){
  const nav=document.getElementById('main-nav-links');
  if(!nav)return;
  const u=getCurrentUser();
  if(!u){
    nav.innerHTML=`
      <a href="index.html" class="nav-btn ${active==='home'?'active':''}">Home</a>
      <a href="login.html" class="nav-btn ${active==='login'?'active':''}">Login</a>
      <a href="signup.html" class="nav-btn nav-btn-primary">Sign Up Free</a>`;
  } else if(u.email===ADMIN_EMAIL){
    nav.innerHTML=`
      <a href="admin.html" class="nav-btn ${active==='admin'?'active':''}">🛡 Admin Panel</a>
      <span style="color:rgba(255,255,255,0.5);font-size:0.85rem;padding:0 8px">Admin</span>
      <button class="nav-logout" onclick="doLogout()">Logout</button>`;
  } else {
    nav.innerHTML=`
      <a href="dashboard.html" class="nav-btn ${active==='dashboard'?'active':''}">Dashboard</a>
      <a href="resources.html" class="nav-btn ${active==='resources'?'active':''}">📚 Resources</a>
      <a href="smriti.html" class="nav-btn ${active==='smriti'?'active':''}">🤖 SMRITI AI</a>
      <a href="notes.html" class="nav-btn ${active==='notes'?'active':''}">📝 Notes</a>
      <a href="about.html" class="nav-btn ${active==='about'?'active':''}">About</a>
      <a href="feedback.html" class="nav-btn ${active==='feedback'?'active':''}">Feedback</a>
      <div style="display:flex;align-items:center;gap:8px">
        <div class="nav-avatar">${u.fname?u.fname[0].toUpperCase():'S'}</div>
        <button class="nav-logout" onclick="doLogout()">Logout</button>
      </div>`;
  }
}

function doLogout(){
  clearCurrentUser();
  showToast('👋 Logged out successfully!');
  setTimeout(()=>{window.location.href='index.html'},900);
}

// ── REVEAL OBSERVER ──
function initReveal(){
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});
  },{threshold:0.08});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}

// ── MODAL ──
function openModal(title,html){
  document.getElementById('modal-title').textContent=title;
  document.getElementById('modal-body').innerHTML=html;
  document.getElementById('sakshar-modal').classList.add('open');
}
function closeModal(){document.getElementById('sakshar-modal')?.classList.remove('open');}

// ── FOOTER HTML ──
function renderFooter(){
  const f=document.getElementById('main-footer');
  if(!f)return;
  f.innerHTML=`
  <div class="footer-grid">
    <div>
      <div class="footer-logo">SAK<span>SHAR</span></div>
      <p class="footer-desc">India's free academic resource hub for every student — textbooks, reference books, practice papers, PYQ and AI-powered study help.</p>
    </div>
    <div>
      <div class="footer-col-title">Platform</div>
      <a class="footer-link" href="index.html">Home</a>
      <a class="footer-link" href="resources.html">Resources</a>
      <a class="footer-link" href="smriti.html">SMRITI AI</a>
      <a class="footer-link" href="notes.html">Notes Upload</a>
    </div>
    <div>
      <div class="footer-col-title">Departments</div>
      <a class="footer-link">B.Tech (CSE/MECH/CIVIL)</a>
      <a class="footer-link">Pharmacy</a>
      <a class="footer-link">BSc IT / BCA</a>
      <a class="footer-link">B.Com / BA</a>
      <a class="footer-link">11th & 12th Boards</a>
    </div>
    <div>
      <div class="footer-col-title">Info</div>
      <a class="footer-link" href="about.html">About Us</a>
      <a class="footer-link" href="feedback.html">Feedback</a>
      <a class="footer-link" href="admin.html">Admin Login</a>
    </div>
  </div>
  <div class="footer-bottom">
    <div>© 2025 <span style="color:var(--saffron);font-weight:700">SAKSHAR</span> — Made with ❤️ for Indian Students</div>
    <div>SMRITI Project | All Resources Free</div>
  </div>`;
}

// ══════════════════════════════════════════
// SUBJECT DATA
// ══════════════════════════════════════════
const SUBJECTS = {
  '12sci': {
    label:'12th Science',icon:'🔬',color:'#DC2626',bg:'#FFEEEE',
    sems:{
      'PCM Stream':['Physics','Chemistry','Mathematics','English','Information Technology (IT)','Computer Science Part 1','Computer Science Part 2'],
      'PCB Stream':['Physics','Chemistry','Biology','English','Information Technology (IT)'],
      'PCMB Stream':['Physics','Chemistry','Mathematics','Biology','English']
    }
  },
  '12com': {
    label:'12th Commerce',icon:'💹',color:'#0891B2',bg:'#E8F8FC',
    sems:{
      'Core Subjects':['English','Organization of Commerce / Business Studies','Bookkeeping and Accountancy','Economics','Secretarial Practice (SP)','Mathematics / Statistics'],
      'Optional Subjects':['Information Technology (IT)','Computer Science','Environmental Education (EVS)','Physical Education / Health & Physical Education']
    }
  },
  '12arts': {
    label:'12th Arts / HSC',icon:'🎨',color:'#DB2777',bg:'#FFF0F7',
    sems:{
      'Main Subjects':['English','History','Geography','Political Science','Economics','Sociology','Psychology','Philosophy'],
      'Additional Subjects':['Information Technology (IT)','Computer Science','Environmental Education (EVS)']
    }
  },
  bscit: {
    label:'BSc IT / BCA',icon:'💻',color:'#7C3AED',bg:'#F3EEFF',
    sems:{
      'Semester 1':['Imperative Programming (C Language)','Digital Electronics','Operating Systems','Discrete Mathematics','Communication Skills'],
      'Semester 2':['Object Oriented Programming (OOP)','Microprocessor Architecture','Web Programming','Numerical Methods','Green Computing'],
      'Semester 3':['Data Structures','Computer Networks','Database Management Systems (DBMS)','Applied Mathematics','Python Programming'],
      'Semester 4':['Core Java','Introduction to Embedded Systems','Computer-Oriented Statistical Techniques','Software Engineering','Computer Graphics and Animation'],
      'Semester 5':['Software Project Management','Internet of Things (IoT)','Advanced Web Programming','Artificial Intelligence','Linux System Administration'],
      'Semester 6':['Enterprise Java','Security in Computing','Big Data Analytics','Project Work / Internship']
    }
  },
  bcom: {
    label:'B.Com',icon:'📊',color:'#D97706',bg:'#FFF3E8',
    sems:{
      'Semester 1':['Financial Accounting – I','Business Economics – I','Business Communication – I','Business Environment'],
      'Semester 2':['Financial Accounting – II','Business Economics – II','Business Communication – II','Principles of Management'],
      'Semester 3':['Financial Accounting – III','Business Law','Commerce – I (Business Planning & Entrepreneurship)','Foundation Course – I'],
      'Semester 4':['Financial Accounting – IV','Business Law – II','Commerce – II (Service Sector)','Foundation Course – II'],
      'Semester 5':['Cost Accounting','Direct Taxation','Financial Management','Auditing – I'],
      'Semester 6':['Indirect Taxation (GST)','Auditing – II','Export Marketing / International Business']
    }
  },
  ba: {
    label:'BA (Arts)',icon:'🏛️',color:'#059669',bg:'#EDFAF2',
    sems:{
      'Semester 1':['Foundation Course – I','Communication Skills / English','Major Subject – Paper I','Major Subject – Paper II','Allied / Elective Subject'],
      'Semester 2':['Foundation Course – II','Communication Skills / English – II','Major Subject – Paper III','Major Subject – Paper IV','Allied / Elective Subject'],
      'Semester 3':['Foundation Course – III','Major Subject – Paper V','Major Subject – Paper VI','Elective Subject'],
      'Semester 4':['Foundation Course – IV','Major Subject – Paper VII','Major Subject – Paper VIII','Elective Subject'],
      'Semester 5':['Major Subject – Paper IX','Major Subject – Paper X','Applied / Skill Based Course'],
      'Semester 6':['Major Subject – Paper XI','Major Subject – Paper XII','Project / Dissertation']
    }
  },
  btech_cse: {
    label:'B.Tech – CSE',icon:'⚙️',color:'#2563EB',bg:'#EBF3FF',
    sems:{
      'Semester 1':['Engineering Mathematics I','Engineering Physics','Basic Electrical Engineering','Programming for Problem Solving (C)','Engineering Graphics'],
      'Semester 2':['Engineering Mathematics II','Basic Electronics','Data Structures','Environmental Studies','Engineering Mechanics'],
      'Semester 3':['Discrete Mathematics','Digital Electronics','Object Oriented Programming','Computer Organization'],
      'Semester 4':['Design and Analysis of Algorithms','Operating Systems','Database Management Systems','Software Engineering'],
      'Semester 5':['Computer Networks','Microprocessors','Artificial Intelligence','Web Technologies'],
      'Semester 6':['Machine Learning','Compiler Design','Cloud Computing','Information Security'],
      'Semester 7':['Big Data Analytics','Internet of Things','Elective Subject','Project I'],
      'Semester 8':['Advanced Elective','Major Project','Internship / Industrial Training']
    }
  },
  btech_mech: {
    label:'B.Tech – Mechanical',icon:'🔧',color:'#EA580C',bg:'#FFF4EE',
    sems:{
      'Semester 1':['Engineering Mathematics I','Engineering Physics','Engineering Chemistry','Engineering Graphics','Workshop Practice'],
      'Semester 2':['Engineering Mathematics II','Engineering Mechanics','Basic Electrical Engineering','Material Science'],
      'Semester 3':['Thermodynamics','Strength of Materials','Manufacturing Processes','Machine Drawing'],
      'Semester 4':['Fluid Mechanics','Theory of Machines','Heat Transfer','Mechanical Measurements'],
      'Semester 5':['Machine Design','Internal Combustion Engines','Industrial Engineering','CAD/CAM'],
      'Semester 6':['Refrigeration and Air Conditioning','Automobile Engineering','Robotics','Mechatronics'],
      'Semester 7':['Power Plant Engineering','Advanced Manufacturing','Elective Subject','Project I'],
      'Semester 8':['Industrial Training','Major Project','Advanced Elective']
    }
  },
  btech_civil: {
    label:'B.Tech – Civil',icon:'🏗️',color:'#0891B2',bg:'#E8F8FC',
    sems:{
      'Semester 1':['Engineering Mathematics I','Engineering Physics','Engineering Chemistry','Engineering Graphics','Workshop Practice'],
      'Semester 2':['Engineering Mathematics II','Engineering Mechanics','Basic Electrical Engineering','Environmental Studies'],
      'Semester 3':['Strength of Materials','Structural Analysis','Fluid Mechanics','Building Materials'],
      'Semester 4':['Geotechnical Engineering','Concrete Technology','Hydrology','Transportation Engineering'],
      'Semester 5':['Structural Design','Environmental Engineering','Construction Technology','Surveying'],
      'Semester 6':['Water Resources Engineering','Foundation Engineering','Irrigation Engineering','Construction Management'],
      'Semester 7':['Advanced Structural Design','Environmental Impact Assessment','Elective Subject','Project I'],
      'Semester 8':['Major Project','Internship / Industrial Training','Advanced Elective']
    }
  },
  pharma: {
    label:'Pharmacy (B.Pharm)',icon:'💊',color:'#059669',bg:'#EDFAF2',
    sems:{
      'Semester 1':['Human Anatomy and Physiology – I','Pharmaceutical Analysis – I','Pharmaceutics – I','Pharmaceutical Inorganic Chemistry','Communication Skills'],
      'Semester 2':['Human Anatomy and Physiology – II','Pharmaceutical Organic Chemistry – I','Biochemistry','Pathophysiology','Computer Applications in Pharmacy'],
      'Semester 3':['Pharmaceutical Organic Chemistry – II','Physical Pharmaceutics – I','Pharmaceutical Microbiology','Pharmacognosy – I'],
      'Semester 4':['Medicinal Chemistry – I','Physical Pharmaceutics – II','Pharmacology – I','Pharmacognosy – II'],
      'Semester 5':['Medicinal Chemistry – II','Industrial Pharmacy – I','Pharmacology – II','Pharmaceutical Jurisprudence'],
      'Semester 6':['Medicinal Chemistry – III','Pharmacology – III','Herbal Drug Technology','Biopharmaceutics and Pharmacokinetics'],
      'Semester 7':['Industrial Pharmacy – II','Pharmacy Practice','Novel Drug Delivery System','Elective Subject'],
      'Semester 8':['Biostatistics and Research Methodology','Social and Preventive Pharmacy','Project Work']
    }
  },
  nursing:{
    label:'Nursing / GNM / ANM',icon:'🏥',color:'#65A30D',bg:'#F0FCEA',
    sems:{
      'Year 1':['Anatomy & Physiology','Microbiology','Psychology & Sociology','Fundamentals of Nursing','First Aid'],
      'Year 2':['Medical-Surgical Nursing','Pharmacology','Community Health Nursing','Nutrition & Dietetics'],
      'Year 3':['Pediatric Nursing','Mental Health Nursing','Obstetrics & Midwifery','Nursing Management','Research & Statistics']
    }
  }
};

const DEPT_LIST = [
  {id:'12sci',label:'12th Science',icon:'🔬'},
  {id:'12com',label:'12th Commerce',icon:'💹'},
  {id:'12arts',label:'12th Arts',icon:'🎨'},
  {id:'bscit',label:'BSc IT / BCA',icon:'💻'},
  {id:'bcom',label:'B.Com',icon:'📊'},
  {id:'ba',label:'BA',icon:'🏛️'},
  {id:'btech_cse',label:'B.Tech CSE',icon:'⚙️'},
  {id:'btech_mech',label:'B.Tech Mech',icon:'🔧'},
  {id:'btech_civil',label:'B.Tech Civil',icon:'🏗️'},
  {id:'pharma',label:'Pharmacy',icon:'💊'},
  {id:'nursing',label:'Nursing',icon:'🏥'},
];

// Resource type data generator
function getResources(deptId){
  const dept=SUBJECTS[deptId];if(!dept)return{};
  const allSubs=Object.values(dept.sems).flat();
  const textbooks=allSubs.slice(0,Math.min(allSubs.length,8)).map(s=>({name:s+' — Textbook',author:'Prescribed University Text',type:'textbook'}));
  const reference=allSubs.slice(0,Math.min(allSubs.length,6)).map(s=>({name:s+' — Reference Guide',author:'Standard Reference',type:'reference'}));
  const notes=allSubs.slice(0,Math.min(allSubs.length,6)).map(s=>({name:s+' — Handwritten Notes',author:'SAKSHAR Community',type:'notes'}));
  const practice=allSubs.slice(0,Math.min(allSubs.length,5)).map(s=>({name:s+' — Practice Paper Set',author:'SAKSHAR Team',type:'practice'}));
  const pyq=allSubs.slice(0,Math.min(allSubs.length,4)).map(s=>({name:s+' — PYQ 2015–2024',author:'University Exam Board',type:'pyq'}));
  return{textbooks,reference,notes,practice,pyq};
}

const INDIAN_STATES=['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Chandigarh','Jammu & Kashmir','Ladakh','Puducherry'];
