# Haramaya Department Navigator 🎓

Find your perfect department at Haramaya University through a personalized quiz and GPA analysis.

🌐 **Live App**: [Your Deployment URL Here]

## For Students 📚

### What This App Does:
- Helps you discover which department matches your interests and grades
- Takes 5 minutes to complete a 10-question quiz
- Analyzes your freshman GPA against real department requirements
- Provides personalized recommendations with backup options
- Shows you realistic chances based on competitiveness

### How to Use:
1. **Sign Up** - Create a free account with your email
2. **Take the Quiz** - Answer 10 questions about your interests and work preferences
3. **Enter Your GPA** - Input your freshman GPA (0.0-4.0 scale)
4. **Get Results** - See your best match, Plan B options, and reach departments
5. **Make Informed Decisions** - Use results to guide your department selection

### Features ✨
- 🔐 Secure login (your data is private)
- 🌓 Dark/Light mode for comfortable viewing
- 📊 Real Haramaya University GPA requirements
- 🎯 Smart matching: 60% GPA + 40% interests
- 📱 Works on phones, tablets, and computers
- 🏫 Covers all 5 colleges and 27 departments

## Tech Stack 🛠️

- React 18 + Vite
- Supabase (Auth & Database)
- React Router v6
- Pure CSS

## How the Recommendation System Works 🎯
1. **Quiz Questions** (10 targeted questions):
   - Work preference (people vs objects/machines)
   - Screen time comfort
   - Blood/hospital comfort
   - Helping people importance
   - Indoor vs outdoor work
   - Problem-solving enjoyment
   - Memorization ability
   - Math & physics interest
   - Data pattern recognition
   - Animals & nature interest

2. **GPA Input**:
   - Freshman GPA (0.0-4.0 scale)
   - Determines eligibility for departments

3. **Scoring Algorithm**:
   - Interest score: 40% weight (based on quiz answers)
   - GPA score: 60% weight (eligibility + competitiveness)
   - Each department scored on both factors
   - Eligibility check: GPA ≥ minimum required
   - Best eligible match = recommended department

4. **Results Include**:
   - Main recommendation with eligibility status
   - Plan B options (3 eligible backups)
   - Reach options (close departments to work toward)
   - Competitiveness level (Strong chance, Competitive, Reach)
   - Reality check about competitive placement

### Real Haramaya University Colleges & Departments

**College of Health & Medical Sciences (CHMS)** 🏥
- Medicine (3.85+), Nursing (3.20-3.50), Pharmacy (3.20-3.50)
- Medical Laboratory (3.20-3.50), Veterinary Medicine (3.20+)

**College of Computing & Informatics (CCI)** 💻
- Software Engineering (3.40+), Computer Science (3.0+)
- Information Systems (3.0+), IT (3.0+), Statistics (2.0-2.5)

**Haramaya Institute of Technology (HiT)** 🏭
- Civil (3.0+), Hydraulics (3.0+), Electrical (3.0+)
- Mechanical (3.0+), Chemical (2.50-3.65), Food Engineering (2.50-3.65)

**College of Agriculture & Environmental Sciences (CAES)** 🌱
- Agribusiness (2.0-3.0), Agricultural Economics (2.0-3.0)
- Natural Resources (2.0-3.0), Environmental Science (2.0-3.0)

**College of Natural & Computational Sciences (CNCS)** 🔬
- Biotechnology (2.80+), Applied Physics (2.0-3.20)
- Applied Mathematics (2.0-3.20)

## Important Notes ⚠️

- **This is a guidance tool**, not an official university placement system
- **Always consult** with academic advisors before making final decisions
- **GPA requirements** are based on recent trends and may change
- **Competitive departments** may require higher GPAs than the minimum
- **Talk to seniors** in your target departments for real experiences

## Privacy & Security 🔒

- Your account is secured with Supabase authentication
- Quiz results are processed locally in your browser
- No personal data is shared with third parties
- You can delete your account anytime

## Feedback & Support 💬

Found a bug? Have suggestions? Want to add more departments?
- Open an issue on GitHub
- Contact the developer
- Share with fellow students

## For Developers 👨‍💻

Want to run this locally or contribute?

**Quick Start:**
```bash
npm install
npm run dev
```

**Environment Variables:**
Create `.env` file:
```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

**Deploy:**
```bash
npm run build
```

See `HOW_TO_RUN.md` for detailed setup instructions.

---

**Built with ❤️ by Nuhamin for Haramaya University Students**

*Remember: Your future is shaped by your passion and effort, not just a quiz result. Use this as one tool among many in your decision-making journey.* 🌟
