document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-upload');
    const fileInfo = document.getElementById('file-info');
    const statusMessage = document.getElementById('status-message');
    const parsedInfoContainer = document.getElementById('parsed-info');

    uploadForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const file = fileInput.files[0];
        if (!file) {
            statusMessage.textContent = 'Please select a file to upload.';
            statusMessage.style.color = 'red';
            return;
        }

        const formData = new FormData();
        formData.append('document', file);

        try {
            statusMessage.textContent = 'Uploading and processing...';
            statusMessage.style.color = 'blue';

            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                statusMessage.textContent = 'File processed successfully!';
                statusMessage.style.color = 'green';

                displayAssignments(result.data.assignments);
            } else {
                throw new Error('File upload or processing failed.');
            }
        } catch (error) {
            statusMessage.textContent = error.message;
            statusMessage.style.color = 'red';
        }
    });

    function displayAssignments(assignments) {
        parsedInfoContainer.innerHTML = `
            <h3>Assignments</h3>
            <ul>
                ${assignments
                    .map(
                        (assignment, index) => `
                    <li>
                        <strong>Task:</strong> ${assignment.task} <br />
                        <strong>Due Date:</strong> ${assignment.dueDate} <br />
                        <label for="hours-${index}">Estimated Hours:</label>
                        <input type="number" id="hours-${index}" min="1" step="1" />
                    </li>
                `
                    )
                    .join('')}
            </ul>
            <button id="generate-plan">Generate Study Plan</button>
        `;

        document
            .getElementById('generate-plan')
            .addEventListener('click', () => generatePlan(assignments));
    }

    async function generatePlan(assignments) {
        const hoursPerAssignment = assignments.map((_, index) => {
            const input = document.getElementById(`hours-${index}`);
            return parseInt(input.value, 10) || 0;
        });

        try {
            const response = await fetch('/schedule', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ assignments, hoursPerAssignment }),
            });

            if (response.ok) {
                const result = await response.json();
                displayStudyPlan(result.studyPlan);
            } else {
                throw new Error('Failed to generate study plan.');
            }
        } catch (error) {
            statusMessage.textContent = error.message;
            statusMessage.style.color = 'red';
        }
    }

    function displayStudyPlan(studyPlan) {
        parsedInfoContainer.innerHTML = `
            <h3>Study Plan</h3>
            <ul>
                ${studyPlan
                    .map(
                        (plan) => `
                    <li>
                        <strong>Task:</strong> ${plan.task} <br />
                        <strong>Due Date:</strong> ${plan.dueDate} <br />
                        <strong>Schedule:</strong>
                        <ul>
                            ${plan.schedule.map((entry) => `<li>${entry}</li>`).join('')}
                        </ul>
                    </li>
                `
                    )
                    .join('')}
            </ul>
        `;
    }
});
