document.getElementById('fileInput').addEventListener('change', function (event) {
    const files = event.target.files;
    const previewContainer = document.getElementById('imagePreviewContainer');
    previewContainer.innerHTML = '';

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('image-preview');
            const img = document.createElement('img');
            img.src = e.target.result;

            // Adjust image dimensions if it exceeds max width or height
            img.onload = function () {
                const maxWidth = 800;
                const maxHeight = 600;
                let width = img.width;
                let height = img.height;

                if (width > maxWidth || height > maxHeight) {
                    const aspectRatio = width / height;

                    if (width > maxWidth) {
                        width = maxWidth;
                        height = width / aspectRatio;
                    }

                    if (height > maxHeight) {
                        height = maxHeight;
                        width = height * aspectRatio;
                    }

                    img.width = width;
                    img.height = height;
                }
            };

            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-image');
            removeButton.textContent = 'x';
            removeButton.addEventListener('click', () => {
                imgContainer.remove();
            });

            imgContainer.appendChild(img);
            imgContainer.appendChild(removeButton);
            previewContainer.appendChild(imgContainer);
        };
        reader.readAsDataURL(file);
    });
});

document.getElementById('compression').addEventListener('input', function () {
    document.getElementById('compressionValue').textContent = `${this.value}%`;
});

document.getElementById('convertButton').addEventListener('click', function () {
    const fileInput = document.getElementById('fileInput').files;
    const compression = document.getElementById('compression').value;
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    const format = document.getElementById('format').value;
    const lossless = document.getElementById('lossless').checked;
    const output = document.getElementById('output');

    if (fileInput.length === 0) {
        alert('Please upload at least one image.');
        return;
    }

    output.innerHTML = `<h3>Processing...</h3>`;

    // Simulate conversion process
    setTimeout(() => {
        output.innerHTML = `<h3>Conversion Complete</h3><p>Image(s) converted to ${format} with ${compression}% compression${lossless ? ' and lossless compression' : ''}.</p>`;
    }, 2000);
});

document.querySelectorAll('.presets button').forEach(button => {
    button.addEventListener('click', function () {
        const size = this.getAttribute('data-size');
        if (size === '20-50KB') {
            document.getElementById('compression').value = 10;
            document.getElementById('compressionValue').textContent = '10%';
        } else if (size === '2MB') {
            document.getElementById('compression').value = 80;
            document.getElementById('compressionValue').textContent = '80%';
        }
    });
});
