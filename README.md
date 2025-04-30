# Countdown Web Application

This is a countdown web application developed as a solution to the **Natural Cycles Frontend Challenge**. The application is built using **Angular 19.2.9** and **Angular Material** for UI components, ensuring responsiveness and a smooth user experience.

## Features

- Countdown timer that displays the time remaining until the specified end date.
- Ability to define the event name and the end date.
- Responsive design that works well in both portrait and landscape orientations.
- If the event date is set to today and a title is provided, a celebratory confetti effect is displayed to enhance the user experience.
- Persistence of event name and end date between page reloads using **localStorage**.
- Code formatted using **Prettier** for consistency and readability.

## Installation

Before proceeding with the installation, make sure you have Node.js and npm installed on your machine.

1. Clone the repository: `git clone <repository-url>`

2. Navigate to the project directory: `cd nc-countdown-app`

3. Install dependencies: `npm install`

## Usage

1. Start the development server: `ng serve`

2. Open your browser and visit `http://localhost:4200`.

3. Specify the end date and event name in the input fields.

4. The countdown timer will start automatically, displaying the time remaining to the specified end date.

### Mobile & Tablet & Desktop Views

<div style="text-align: center;">
    <img src="https://res.cloudinary.com/dxqyvjf5r/image/upload/v1746017526/nc_countdown/Screenshot_2025-04-30_at_14.51.56_robdet.png" alt=" Mobile View" width="450" style="margin: 50px;">
    <img src="https://res.cloudinary.com/dxqyvjf5r/image/upload/v1746017488/nc_countdown/Screenshot_2025-04-30_at_14.51.13_yarlnm.png" alt=" Tablet View" width="450" style="margin: 50px;">
    <img src="https://res.cloudinary.com/dxqyvjf5r/image/upload/v1746017443/nc_countdown/Screenshot_2025-04-30_at_14.47.53_isewlg.png" alt="Desktop View" width="450" style="margin: 50px;"> a
</div>

<div style="text-align: center;">
    <img src="https://res.cloudinary.com/dxqyvjf5r/image/upload/v1746017890/nc_countdown/Screenshot_2025-04-30_at_14.57.52_ytnh93.png" alt="Countdown Timer" width="900" style="margin: 50px;">
</div>

<div style="text-align: center;">
    <img src="https://res.cloudinary.com/dxqyvjf5r/image/upload/v1746017943/nc_countdown/Screenshot_2025-04-30_at_14.58.51_lhe85u.png" alt="Event Details" width="300" height="auto" style="margin: 50px;">
    <img src="https://res.cloudinary.com/dxqyvjf5r/image/upload/v1746018013/nc_countdown/Screenshot_2025-04-30_at_14.59.59_onuy8s.png" alt="Event Date Picker" width="300" height="auto" style="margin: 50px;">
    <img src="https://res.cloudinary.com/dxqyvjf5r/image/upload/v1746017713/nc_countdown/Screenshot_2025-04-30_at_14.54.31_p3qats.png" alt="Mobile Countdown View" width="300" height="auto" style="padding: 50px;">
    <img src="https://res.cloudinary.com/dxqyvjf5r/image/upload/v1746018742/nc_countdown/Screenshot_2025-04-30_at_15.12.09_ltf2ok.png" alt="Mobile Countdown View" width="300" height="auto" style="padding: 50px;">
</div>

## Improvement Suggestions

- Date Removal Button: A feature to remove the selected event date has been worked on in the `feature/add-delete-date-button` branch. Unfortunately, there are a few bugs that haven't been fully resolved yet, so it hasn't been merged into the main branch.
- Implement unit tests for critical components and functionality.
- Support Multiple Languages: Implement functionality to display the countdown and event details in different languages, allowing users to interact with the app in their native language.
- To enhance user experience, ai can be used to find the event details entered and redirect to the event's website.
- Notifications & Reminders: Add notifications or reminders to alert users as the event approaches, or if the event date is changed.
- Social Sharing Integration: Allow users to share the countdown event on social media platforms like Instagram, X, or WhatsApp to spread awareness about the event.



