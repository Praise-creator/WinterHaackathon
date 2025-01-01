document.getElementById('generate-btn').addEventListener('click', function () {
    const fileUpload = document.getElementById('file-upload');
    const hoursInput = document.getElementById('hours-input').value;
    const fileInfo = document.getElementById('file-info');
    const scheduleList = document.getElementById('schedule-list');

    // Check if a file is selected
    if (!fileUpload.files.length) {
        fileInfo.textContent = "Please select a syllabus PDF.";
        return;
    }

    // Check if hours input is valid
    if (!hoursInput || isNaN(hoursInput)) {
        fileInfo.textContent = "Please enter a valid number of hours.";
        return;
    }

    const file = fileUpload.files[0];
    const fileName = file.name;
    fileInfo.textContent = `Processing ${fileName}...`;

    // You can add logic to process the PDF here and extract due dates, assignments, etc.
    // For now, we'll simulate adding assignments to the schedule.

    scheduleList.innerHTML = ''; // Clear previous schedule

    // Simulate dividing assignments into chunks based on user input
    const totalAssignments = 5; // Example: 5 assignments in the syllabus
    const hoursPerDay = parseInt(hoursInput, 10);

    for (let i = 1; i <= totalAssignments; i++) {
        const li = document.createElement('li');
        li.textContent = `Assignment ${i}: Complete in ${hoursPerDay} hours on day ${i}`;
        scheduleList.appendChild(li);
    }
});
