# Patient Dashboard

This project is a React-based patient dashboard application that allows healthcare professionals to view and manage patient data efficiently.

## Features

- Patient selection sidebar
- Diagnosis history visualization
- Diagnostic list display
- Patient details view
- Lab results display
- Blood pressure chart

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Getting Started

To get the project up and running, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/your-username/patient-dashboard.git
   cd patient-dashboard
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` (or the port specified in your console output).

## Project Structure

- `src/components/`: Contains React components for the dashboard
- `src/hooks/`: Custom React hooks, including `usePatientData`
- `src/types/`: TypeScript type definitions
- `src/config/`: Configuration files (e.g., chart options)

## Key Components

- `PatientDashboard`: Main component that orchestrates the dashboard layout
- `PatientSidebar`: Allows selection of patients
- `DiagnosisHistory`: Displays patient diagnosis history
- `BloodPressureChart`: Visualizes blood pressure data
- `PatientDetails`: Shows detailed patient information
- `LabResults`: Displays patient lab results

## Custom Hooks

- `usePatientData`: Manages patient data and selection
