document.getElementById('generate-btn').addEventListener('click', function () {
    const fileUpload = document.getElementById('file-upload');
    const fileInfo = document.getElementById('file-info');
    const scheduleList = document.getElementById('schedule-list');
    const reader = new FileReader();

    // Ensure a file is selected
    if (!fileUpload.files.length) {
        fileInfo.textContent = "Please select a syllabus PDF.";
        return;
    }

    const file = fileUpload.files[0];
    fileInfo.textContent = `Processing ${file.name}...`;

    // Read the uploaded PDF
    reader.onload = async function (e) {
        const pdfData = new Uint8Array(e.target.result);

        try {
            const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
            let extractedText = "";

            // Extract text from all pages
            for (let i = 0; i < pdf.numPages; i++) {
                const page = await pdf.getPage(i + 1);
                const textContent = await page.getTextContent();
                extractedText += textContent.items.map((item) => item.str).join(" ") + "\n";
            }

            // Parse the text for assignments and due dates
            const assignments = parseAssignments(extractedText);

            // Display the parsed assignments
            scheduleList.innerHTML = "";
            if (assignments.length === 0) {
                scheduleList.innerHTML = "<li>No assignments found.</li>";
            } else {
                // Output assignments found
                assignments.forEach((assignment) => {
                    const li = document.createElement("li");
                    li.textContent = `Assignment: ${assignment.title} - Due: ${assignment.dueDate}`;
                    scheduleList.appendChild(li);
                });
            }
        } catch (error) {
            console.error(error);
            fileInfo.textContent = "Error processing the file.";
        }
    };

    reader.readAsArrayBuffer(file);
});

// Function to parse assignments from text
function parseAssignments(text) {
    const assignments = [];
    // Make the search broad for different formats of syllabi
    const assignmentRegex = /\b(Assignment|Homework|Lab|Project|Essay|Quiz|Paper)\s*\d*[:\-\.]?\s*[^]*?(?:Due[:\-\.]?\s*|\(Due:\s*|is due\s*|by\s+)(\w+\s\d{1,2},\s\d{4}|\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2}\s\w+\s\d{4})/gi;

    let match;
    while ((match = assignmentRegex.exec(text)) !== null) {
        assignments.push({
            title: match[0].trim(),
            dueDate: match[2].trim(),
        });
    }

    return assignments;
}
