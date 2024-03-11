const fs = require('fs');

// Function to generate a random name
function generateName() {
    const names = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah'];
    const lastNames = ['Doe', 'Smith', 'Johnson', 'Brown', 'Wilson'];
    const randomFirstName = names[Math.floor(Math.random() * names.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${randomFirstName} ${randomLastName}`;
}

// Function to generate a random age between min and max
function generateAge(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random grade
function generateGrade() {
    const grades = ['A', 'B', 'C', 'D', 'F'];
    return grades[Math.floor(Math.random() * grades.length)];
}

// Generate 20 records
const records = [];
for (let i = 1; i <= 20; i++) {
    const record = {
        id: i,
        name: generateName(),
        age: generateAge(18, 25),
        grade: generateGrade()
    };
    records.push(record);
}

// Convert records to JSON format
const jsonData = JSON.stringify(records, null, 2);

// Write JSON data to a file
fs.writeFile('generated_students.json', jsonData, 'utf8', (err) => {
    if (err) {
        console.error('Error writing JSON file: ', err);
        return;
    }
    console.log('JSON file with 20 records has been generated successfully!');
});
