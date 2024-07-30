import { ref, set } from 'firebase/database';
import { database } from './Firebase';

const testTypes = [
  'Lab Test',
  'Ultrasound',
  'X-Ray',
  'MRI',
  'CT Scan',
  'Urine Test',
  'Biopsy',
  'EKG',
];

const randomDate = (yearOffset) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - yearOffset);
  date.setMonth(Math.floor(Math.random() * 12));
  date.setDate(Math.floor(Math.random() * 28) + 1); // Ensure date is between 1 and 28 to avoid month overflow
  return date;
};

const randomResult = (type, yearOffset = 0) => {
  const date = randomDate(yearOffset);
  switch (type) {
    case 'Blood Test':
      return {
        testName: 'Blood Test',
        date: date.toLocaleDateString(),
        parameters: [
          { name: 'RBC', value: (4 + Math.random()).toFixed(2), unit: '10^6/micl', range: '4-5.2' },
          { name: 'Hemoglobin', value: (12.5 + Math.random() * 3.5).toFixed(1), unit: 'g/dL', range: '12.5-16' },
          { name: 'Hematocrit', value: (36 + Math.random() * 6).toFixed(0), unit: '%', range: '36-42' },
          { name: 'MCV', value: (80 + Math.random() * 20).toFixed(1), unit: 'fL', range: '80-100' },
          { name: 'Basophils', value: (0 + Math.random()).toFixed(1), unit: '%', range: '0-2' },
          { name: 'Neutrophils', value: (1.8 + Math.random() * 5.9).toFixed(2), unit: '10^3/micl', range: '1.8-7.7' },
          { name: 'Lymphocytes', value: (1.0 + Math.random() * 3.8).toFixed(2), unit: '10^3/micl', range: '1.0-4.8' },
        ],
      };
    case 'Lab Test':
      return {
        testName: 'Lab Test',
        date: date.toLocaleDateString(),
        parameters: [
          { name: 'Cholesterol', value: (100 + Math.random() * 140).toFixed(0), unit: 'mg/dL' },
          { name: 'Blood Sugar', value: (70 + Math.random() * 80).toFixed(0), unit: 'mg/dL' },
        ],
      };
    case 'Ultrasound':
      return {
        testName: 'Ultrasound',
        date: date.toLocaleDateString(),
        parameters: [
          { name: 'Observation', value: 'Normal structure observed' },
        ],
      };
    case 'X-Ray':
      return {
        testName: 'X-Ray',
        date: date.toLocaleDateString(),
        parameters: [
          { name: 'Observation', value: 'No fractures or abnormalities detected' },
        ],
      };
    case 'MRI':
      return {
        testName: 'MRI',
        date: date.toLocaleDateString(),
        parameters: [
          { name: 'Observation', value: 'No issues detected' },
        ],
      };
    case 'CT Scan':
      return {
        testName: 'CT Scan',
        date: date.toLocaleDateString(),
        parameters: [
          { name: 'Observation', value: 'CT scan shows no issues' },
        ],
      };
    case 'Urine Test':
      return {
        testName: 'Urine Test',
        date: date.toLocaleDateString(),
        parameters: [
          { name: 'pH', value: (4 + Math.random() * 4).toFixed(1), unit: '' },
          { name: 'Glucose', value: 'Negative', unit: '' },
        ],
      };
    case 'Biopsy':
      return {
        testName: 'Biopsy',
        date: date.toLocaleDateString(),
        parameters: [
          { name: 'Observation', value: 'Biopsy results are benign' },
        ],
      };
    case 'EKG':
      return {
        testName: 'EKG',
        date: date.toLocaleDateString(),
        parameters: [
          { name: 'Observation', value: 'EKG shows normal heart rhythm' },
        ],
      };
    default:
      return {};
  }
};

export const generateTestResults = async (userId) => {
  const results = [];

  // Always include a blood test for each year
  for (let i = 0; i < 10; i++) {
    results.push(randomResult('Blood Test', i));
  }

  const numResults = Math.floor(Math.random() * (4 - 2 + 1) + 2); // Generate between 2 and 4 additional results

  for (let i = 0; i < numResults; i++) {
    const testType = testTypes[Math.floor(Math.random() * testTypes.length)];
    results.push(randomResult(testType));
  }

  console.log('Generated test results:', results);

  const resultsRef = ref(database, `testresults/${userId}`);
  await set(resultsRef, results);
  console.log('Test results saved to database for user:', userId);
};
