# Requirements Document

## Introduction

The Haramaya Department Recommender is a web application designed to help Haramaya University freshman students (especially Natural Science students) discover which academic department best matches their interests, strengths, and academic performance. The system provides an interactive quiz experience combined with grade analysis to generate personalized department recommendations in a friendly, student-centered manner.

## Glossary

- **System**: The Haramaya Department Recommender web application
- **User**: A Haramaya University freshman student using the application
- **Quiz**: A set of technical and psychological questions designed to assess student preferences and aptitudes
- **Recommendation**: A suggested academic department based on quiz responses and grade inputs
- **Department**: An academic program within a college at Haramaya University
- **College**: A grouping of related academic departments
- **Auth_Service**: Supabase authentication service managing user sessions
- **Theme**: Visual appearance mode (dark or light) of the application
- **Score**: Calculated value combining quiz responses (40%) and grades (60%) to determine department fit
- **Dashboard**: The main authenticated page shown after login
- **Session**: An authenticated user's active connection to the application

## Requirements

### Requirement 1: User Authentication

**User Story:** As a freshman student, I want to create an account and sign in securely, so that I can save my progress and access personalized recommendations.

#### Acceptance Criteria

1. THE Auth_Service SHALL provide sign up functionality using email and password
2. THE Auth_Service SHALL provide sign in functionality using email and password
3. WHEN a User successfully signs in, THE System SHALL create a Session
4. WHEN a Session is created, THE System SHALL redirect the User to the Dashboard
5. THE System SHALL provide a sign out function that clears the Session
6. WHEN a User signs out, THE System SHALL redirect the User to the sign in page
7. WHILE a Session is active, THE System SHALL maintain User authentication state across page navigation


### Requirement 2: Global Navigation Bar

**User Story:** As a User, I want to see a consistent navigation bar on all authenticated pages, so that I can easily access theme settings, see my username, and sign out.

#### Acceptance Criteria

1. WHILE a Session is active, THE System SHALL display a navigation bar on all authenticated pages
2. THE navigation bar SHALL display the User's username with the text "Welcome, [username]"
3. THE navigation bar SHALL display a theme toggle icon
4. THE navigation bar SHALL display a sign out button
5. WHEN the User clicks the sign out button, THE System SHALL execute the sign out function
6. THE navigation bar SHALL remain visible and functional in both dark and light Theme modes

### Requirement 3: Theme Management

**User Story:** As a User, I want to switch between dark and light modes, so that I can use the application comfortably in different lighting conditions.

#### Acceptance Criteria

1. THE System SHALL provide a Theme toggle control in the navigation bar
2. WHEN the application first loads, THE System SHALL set the Theme to match the User's system preference
3. WHEN a User clicks the Theme toggle, THE System SHALL switch between dark and light Theme modes
4. THE System SHALL persist the User's Theme preference
5. WHEN a User returns to the application, THE System SHALL apply the User's saved Theme preference
6. THE System SHALL display a moon icon when light Theme is active
7. THE System SHALL display a sun icon when dark Theme is active
8. THE System SHALL maintain readable contrast ratios in both Theme modes

### Requirement 4: Application Branding

**User Story:** As a User, I want to see a recognizable icon for the application, so that I can easily identify it in my browser tabs and bookmarks.

#### Acceptance Criteria

1. THE System SHALL provide a favicon based on the application name initials
2. THE favicon SHALL use letters as the main design element
3. THE favicon SHALL include a small graphic element such as an arrow, compass, or book
4. THE favicon SHALL be readable at 16x16 pixel resolution
5. THE System SHALL provide the favicon in ICO format
6. THE System SHALL provide the favicon in PNG format at 16x16 and 32x32 pixel resolutions
7. THE System SHALL provide the favicon in SVG format for in-app use
8. THE favicon SHALL maintain visual clarity in both dark and light Theme modes

### Requirement 5: Dashboard Landing Page

**User Story:** As a User who has just logged in, I want to see a welcoming page that explains what the application does, so that I understand how to get started.

#### Acceptance Criteria

1. WHEN a User first accesses the Dashboard, THE System SHALL display a hero section with the title "🎓 Not sure which department fits you? Let's figure it out."
2. THE hero section SHALL display the subtitle "Answer a few simple questions and see which department matches you — not the hype."
3. THE Dashboard SHALL display a primary call-to-action button labeled "Start Journey 🚀"
4. THE Dashboard SHALL display a friendly advice card with rotating messages
5. THE advice card SHALL display one of the following messages: "💡 Quick advice: Don't choose a department because everyone is talking about it. Choose the one where you can grow without burning out." OR "🌱 Just saying… Pressure fades. Skills stay."
6. THE Dashboard SHALL display a "How It Works" section with three steps: "1️⃣ Answer questions", "2️⃣ Add grades", "3️⃣ See recommendations"
7. THE Dashboard SHALL display time information "⏱️ Takes about 5–7 minutes"
8. THE Dashboard SHALL display the note "No right or wrong answers. Be honest — it helps you more 😉"


### Requirement 6: College and Department Exploration

**User Story:** As a User, I want to browse available colleges and their departments, so that I can understand my options before taking the quiz.

#### Acceptance Criteria

1. THE Dashboard SHALL display college information as centered cards
2. WHEN displaying a college card, THE System SHALL show the college name
3. WHEN displaying a college card, THE System SHALL show a short description of the college
4. WHEN displaying a college card, THE System SHALL show a list of departments within that college
5. WHEN displaying a college card, THE System SHALL show an icon or emoji representing the college
6. WHEN a User hovers over a college card, THE System SHALL display a visual hover effect
7. WHEN the viewport width is below tablet size, THE System SHALL stack college cards vertically

### Requirement 7: Quiz System

**User Story:** As a User, I want to answer questions about my interests and abilities, so that the system can understand what department might suit me.

#### Acceptance Criteria

1. WHEN a User clicks "Start Journey", THE System SHALL display the Quiz
2. THE Quiz SHALL include both technical and psychological questions
3. WHILE the User is taking the Quiz, THE System SHALL display a progress indicator showing current question number and total questions
4. THE Quiz questions SHALL use friendly, student-like language
5. THE Quiz SHALL provide answer options on a scale of 1 to 5
6. WHEN a User completes all Quiz questions, THE System SHALL proceed to the grade input form
7. THE System SHALL store Quiz responses for Score calculation

### Requirement 8: Grade Input

**User Story:** As a User, I want to input my academic grades, so that the recommendation considers my academic performance.

#### Acceptance Criteria

1. WHEN a User completes the Quiz, THE System SHALL display a grade input form
2. THE grade input form SHALL accept numeric grade values
3. THE System SHALL store grade inputs for Score calculation
4. WHEN a User submits the grade input form, THE System SHALL proceed to Score calculation

### Requirement 9: Recommendation Calculation

**User Story:** As a User, I want the system to calculate which department fits me best, so that I can make an informed decision about my academic path.

#### Acceptance Criteria

1. WHEN a User completes both Quiz and grade input, THE System SHALL calculate a Score for each Department
2. THE System SHALL weight grades at 60% of the total Score
3. THE System SHALL weight Quiz responses at 40% of the total Score
4. THE System SHALL identify the Department with the highest Score as the Recommendation
5. IF multiple Departments have equal highest Scores, THE System SHALL provide an explanation of the tie
6. THE System SHALL store the calculated Recommendation


### Requirement 10: Department Visual Identity

**User Story:** As a User, I want to see visual representations of each department, so that I can quickly recognize and remember them.

#### Acceptance Criteria

1. THE System SHALL assign an emoji or illustration to each Department
2. THE Department visuals SHALL remain clear and recognizable in both dark and light Theme modes
3. THE System SHALL use contextually appropriate visuals such as 👨‍💻 for Software Engineering, 🧑‍💼💻 for Information Systems, 📊 for Statistics, 👩‍⚕️ for Medicine, ⚙️🏗️ for Engineering, 🧬 for Biology, and 🧪 for Chemistry

### Requirement 11: Results Display

**User Story:** As a User, I want to see my recommended department with clear explanations, so that I understand why it was suggested and can make an informed decision.

#### Acceptance Criteria

1. WHEN the Recommendation is calculated, THE System SHALL display a results page
2. THE results page SHALL display the recommended Department name
3. THE results page SHALL display the Department visual
4. THE results page SHALL display a Score breakdown showing Quiz and grade contributions
5. THE results page SHALL display an explanation of why the Department fits the User
6. THE results page SHALL highlight the User's matched strengths
7. THE explanation text SHALL use encouraging language such as "You seem to enjoy problem-solving and logical thinking. That's why Software Engineering could be a strong fit for you."
8. THE results page SHALL display reassurance text "This is guidance, not a final decision."

### Requirement 12: Database Structure

**User Story:** As a developer, I want a simple database structure, so that I can easily manage user data and recommendations without complex queries.

#### Acceptance Criteria

1. THE System SHALL use Supabase as the database service
2. THE System SHALL maintain a users table linked to Supabase authentication
3. THE System SHALL maintain a quiz_answers table to store User Quiz responses
4. THE System SHALL maintain a grades table to store User grade inputs
5. THE System SHALL maintain a recommendations table to store calculated Recommendations
6. THE database schema SHALL avoid complex joins requiring advanced database knowledge

### Requirement 13: User Experience Standards

**User Story:** As a User, I want the application to feel friendly and helpful, so that I feel comfortable using it to make important decisions.

#### Acceptance Criteria

1. THE System SHALL use friendly microcopy throughout the interface
2. WHEN a page or section has no content, THE System SHALL display helpful empty state messages
3. THE System SHALL apply subtle animations for fade and hover effects
4. THE System SHALL maintain a clean, modern visual design
5. THE System SHALL use language and context appropriate for Ethiopian university students
6. THE System SHALL use Gen-Z Ethiopian university tone in all text
7. THE System SHALL use simple English avoiding academic or formal language
8. THE System SHALL use light emoji usage to enhance friendliness without overwhelming the interface

### Requirement 14: Responsive Design

**User Story:** As a User accessing the application from different devices, I want the interface to work well on my phone, tablet, and computer, so that I can use it anywhere.

#### Acceptance Criteria

1. THE System SHALL implement a mobile-first responsive design approach
2. WHEN the viewport width is below mobile breakpoint, THE System SHALL optimize layout for small screens
3. WHEN the viewport width is at tablet size, THE System SHALL optimize layout for medium screens
4. WHEN the viewport width is at desktop size, THE System SHALL optimize layout for large screens
5. THE System SHALL ensure all interactive elements are easily tappable on touch devices
6. THE System SHALL maintain readability and usability across all viewport sizes
