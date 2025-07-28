# PerMinute

A modern typing speed test application with multiple difficulty levels and customizable time durations.

## Features

- **Multiple Difficulty Levels**: Choose from 5 complexity levels ranging from newbie to master
- **Flexible Time Options**: Test your typing speed with 30-second or 60-second sessions
- **Real-time Statistics**: Track your words per minute (WPM) and accuracy percentage
- **Dark Theme**: Clean, modern interface with a cyberpunk-inspired color scheme
- **Responsive Design**: Works seamlessly across different screen sizes

## How to Use

1. Select your preferred difficulty level from the dropdown menu
2. Choose between 30-second or 60-second typing sessions
3. Click "New Game" to start a fresh typing test
4. Type the displayed words as accurately and quickly as possible
5. View your results including WPM and accuracy when the timer ends

## Difficulty Levels

- **Newbie**: Basic common words for beginners
- **Beginner**: Simple vocabulary with slightly longer words
- **Intermediate**: Mixed difficulty with more challenging terms
- **Advanced**: Complex words requiring higher typing proficiency
- **Master**: Professional-level vocabulary for expert typists

## Running the Application

### Option 1: Direct File Opening
Open `index.html` directly in your web browser.

### Option 2: Local Server
For the best experience, serve the files using a local web server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## Technical Details

The application is built using vanilla HTML, CSS, and JavaScript with no external dependencies. All styling is embedded inline for optimal loading performance.

## Browser Compatibility

Compatible with all modern web browsers including Chrome, Firefox, Safari, and Edge.
