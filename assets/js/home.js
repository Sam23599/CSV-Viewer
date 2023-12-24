// Delete file from DOM and DB
const deleteButtons = document.querySelectorAll('.delete-file-btn');
deleteButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();

        const deleteUrl = button.href;

        fetch(deleteUrl, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    // If the response is successful, remove the parent div with class 'file-block'
                    const fileBlock = button.closest('.file-block');
                    if (fileBlock) {
                        fileBlock.remove();
                    }
                } else {
                    console.error('Delete request failed:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error during fetch:', error);
            });
    });
});




// change button 'uploaded -> upload' when browse file is clicked
const browseFileText = document.querySelector(".browse-files");
browseFileText.addEventListener('click', async (e) => {
    uploadButton.innerHTML = 'Upload';
})




// no file selected toggle
const cancelAlertButton = document.querySelector(".cancel-alert-button");
cancelAlertButton.addEventListener("click", () => {
    cannotUploadMessage.style.cssText = "display: none;";
});




// file upload to DB and too DOM
const uploadButton = document.querySelector('.upload-button');
const fileInput = document.querySelector('.default-file-input');
const cannotUploadMessage = document.querySelector('.cannot-upload-message');
const filesList = document.querySelector('.files-list');
uploadButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const isFileUploaded = fileInput.value;
    const isFileDropped = document.querySelector(".default-file-input").value

    if (isFileUploaded !== '' || isFileDropped !== '') {
        fetch('/csvUpload', {
            method: 'POST',
            body: new FormData(document.querySelector('.form-container')),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error('Upload request failed:', response.statusText);
                    throw new Error('Upload request failed');
                }
            })
            .then(fileDetails => {
                // Create a new file block DOM element with animations
                const newFileBlock = document.createElement('div');
                newFileBlock.classList.add('file-block');
                newFileBlock.style.animation = 'fadeIn linear 0.8s';

                newFileBlock.innerHTML += `
                    <div class="file-info">
                        <span class="material-icons-outlined file-icon"> description </span>
                        <span class="file-name">${fileDetails.filename}</span>
                    </div>
                    <a href="/csvView/${fileDetails._id}">
                        <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                    </a>
                    <a href="/csvDelete/${fileDetails._id}" class="delete-file-btn">
                        <span class="material-icons remove-file-icon">delete</span>
                    </a>
                `;

                filesList.appendChild(newFileBlock);

                let animation = 0;
                const id = setInterval(frame, 10);
                function frame() {
                    if (animation >= 390) {
                        clearInterval(id);
                        uploadButton.innerHTML = `<span class="material-icons-outlined upload-button-icon"> check_circle </span> Uploaded`;
                    } else {
                        animation += 5;
                    }
                }
            })
            .catch(error => {
                console.error('Error during fetch:', error);
            });
    } else {
        cannotUploadMessage.style.cssText = 'display: flex; animation: fadeIn linear 1.5s;';
    }
});




// drag and drop file 
const draggableFileArea = document.querySelector(".drag-file-area");
const uploadIcon = document.querySelector(".upload-icon");
const dragDropText = document.querySelector(".dynamic-message");

var isAdvancedUpload = function () {
    var div = document.createElement('div');
    return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
}();

if (isAdvancedUpload) {
    ["drag", "dragstart", "dragend", "dragover", "dragenter", "dragleave", "drop"].forEach(evt =>
        draggableFileArea.addEventListener(evt, e => {
            e.preventDefault();
            e.stopPropagation();
        })
    );

    ["dragover", "dragenter"].forEach(evt => {
        draggableFileArea.addEventListener(evt, e => {
            e.preventDefault();
            e.stopPropagation();
            uploadIcon.innerHTML = 'file_download';
            dragDropText.innerHTML = 'Drop your file here!';
        });
    });

    ["dragleave", "dragend"].forEach(evt => {
        draggableFileArea.addEventListener(evt, e => {
            e.preventDefault();
            // e.stopPropagation();
            uploadIcon.innerHTML = 'file_upload';
            dragDropText.innerHTML = 'Drag & drop any file here';
        })
    })

    draggableFileArea.addEventListener("drop", e => {
        uploadIcon.innerHTML = 'check_circle';
        dragDropText.innerHTML = 'File Dropped Successfully!';
        document.querySelector(".label").innerHTML = `
            drag & drop or 
            <span class="browse-files">
                <input type="file" name="filename" accept=".csv" class="default-file-input"/>
                <span class="browse-files-text"> browse file</span> 
            </span>
        `;
        uploadButton.innerHTML = `Upload`;

        const fileInputDrop = document.querySelector('.default-file-input');

        const files = e.dataTransfer.files;
        fileInputDrop.files = files;
    });
}
