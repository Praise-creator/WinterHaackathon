document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-upload');
    const fileInfo = document.getElementById('file-info');
    const statusMessage = document.getElementById('status-message');

    // Validate file type and size before submitting
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                statusMessage.textContent = 'Error: Only PDF files are allowed.';
                statusMessage.style.color = 'red';
                fileInput.value = ''; // Clear the input
                fileInfo.textContent = 'No file selected';
            } else {
                fileInfo.textContent = `Selected file: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
                statusMessage.textContent = '';
            }
        }
    });

    // Handle form submission
    uploadForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const file = fileInput.files[0];
        if (!file) {
            statusMessage.textContent = 'Please select a file to upload.';
            statusMessage.style.color = 'red';
            return;
        }

        const formData = new FormData();
        formData.append('document', file); // "document" matches the backend field name

        try {
            statusMessage.textContent = 'Uploading...';
            statusMessage.style.color = 'blue';

            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                statusMessage.textContent = result.message;
                statusMessage.style.color = 'green';
            } else {
                throw new Error('Upload failed. Please try again.');
            }
        } catch (error) {
            statusMessage.textContent = error.message;
            statusMessage.style.color = 'red';
        }
    });
});
