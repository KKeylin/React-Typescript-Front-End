# 60-Minute Front-End Developer Test

## Overview
Welcome to our front-end developer assessment! This test is designed to evaluate your React, TypeScript, and CSS skills within a 60-minute timeframe.

## Test Format: Q&A Style Completion

### Question 1: Project Setup & Understanding (5 minutes)
**Q: What technologies are used in this project?**
**A: Expected Response:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui components

**Q: How do you start the development server?**
**A: Expected Response:** `npm run dev` or `npm start`

### Question 2: Component Creation (15 minutes)
**Q: Create a `TaskCard` component that displays:**
- Task title
- Task description  
- Priority level (High, Medium, Low) with color coding
- Completion status
- Due date
- Delete and Edit buttons

**A: Requirements:**
- Use TypeScript with proper interfaces
- Apply appropriate styling using the design system
- Make it responsive
- Handle click events for edit/delete buttons

### Question 3: State Management (10 minutes)
**Q: Implement state management for the task list:**
- Add new tasks
- Mark tasks as complete/incomplete
- Delete tasks
- Edit existing tasks

**A: Requirements:**
- Use React hooks (useState, useEffect)
- Implement proper TypeScript types
- Persist data to localStorage
- Handle edge cases (empty states, validation)

### Question 4: Form Implementation (15 minutes)
**Q: Create a task form with validation:**
- Title (required, max 100 characters)
- Description (optional, max 500 characters)
- Priority dropdown (High, Medium, Low)
- Due date picker
- Form validation with error messages

**A: Requirements:**
- Use controlled components
- Implement form validation
- Show error states
- Clear form after submission
- Use proper TypeScript types

### Question 5: Styling & UX (10 minutes)
**Q: Enhance the UI with:**
- Smooth animations/transitions
- Loading states
- Empty state when no tasks
- Responsive design for mobile
- Hover effects and micro-interactions

**A: Requirements:**
- Use Tailwind CSS classes
- Follow the existing design system
- Ensure accessibility (proper ARIA labels)
- Smooth user experience

### Question 6: Advanced Features (5 minutes)
**Q: Add ONE of the following features:**
- Search functionality to filter tasks
- Sort tasks by priority or due date
- Drag and drop to reorder tasks
- Export tasks to JSON

**A: Choose based on your strengths and time remaining**

## Evaluation Criteria

### Code Quality (30%)
- Clean, readable code
- Proper TypeScript usage
- Component structure and reusability
- Error handling

### Functionality (25%)
- All requirements implemented
- App works without bugs
- Edge cases handled
- Form validation works

### Styling & UX (25%)
- Responsive design
- Consistent styling
- Good user experience
- Accessibility considerations

### Problem Solving (20%)
- Approach to complex features
- Code organization
- Time management
- Creative solutions

## Starter Code
The project includes:
- ✅ Basic project setup with React, TypeScript, Tailwind
- ✅ Design system and component library (shadcn/ui)
- ✅ Routing setup
- ⏳ **Your task:** Complete the task management application

## Getting Started
1. Clone this repository
2. Run `npm install`
3. Run `npm run dev`
4. Open `http://localhost:8080`
5. Start coding!

## Submission Guidelines
- Complete as many questions as possible within 60 minutes
- Commit your code frequently
- Add comments explaining complex logic
- If you run out of time, document what you would implement next

## Time Management Tips
- Spend 5 minutes planning your approach
- Focus on core functionality first
- Polish and styling should come after basic features work
- Don't get stuck on one feature - move on and come back if time permits

## Bonus Points
- Adding unit tests
- Implementing keyboard shortcuts
- Adding animations with Framer Motion
- Using React Hook Form for advanced form handling
- Implementing custom hooks for reusable logic

Good luck! 🚀

---

**Note:** This test evaluates practical skills used in day-to-day development. Focus on writing production-quality code that you'd be proud to show in a code review.