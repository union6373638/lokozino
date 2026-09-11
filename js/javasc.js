document.addEventListener('DOMContentLoaded', function () {
    const containers = document.querySelectorAll('.clickable');
    const modal = document.getElementById('myModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const stage1 = document.getElementById('stage1');
    const buttonContainer = document.getElementById('buttonContainer');
    const textAreaContainer = document.getElementById('textAreaContainer');
    const inputTextArea = document.getElementById('inputTextArea');
    const sendButton = document.getElementById('sendButton');
    const successContainer = document.getElementById('successContainer');
    const errorMessage = document.getElementById('errorMessage');

    const closeButton = document.querySelector('.close');
    let modalTimeout;

    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
        clearTimeout(modalTimeout);
        resetModal();
    });

    function openModal(imgSrc, text) {
        modalImage.src = imgSrc;
        modalTitle.textContent = text;
        modal.style.display = 'flex';

        modalTimeout = setTimeout(() => {
            stage1.style.display = 'none';
            buttonContainer.style.display = 'block';
        }, 5000);
    }

    containers.forEach(container => {
        container.addEventListener('click', function () {
            const imgSrc = container.querySelector('img').src;
            const text = container.querySelector('h2').textContent;
            openModal(imgSrc, text);
        });
    });

    function resetModal() {
        stage1.style.display = 'block';
        buttonContainer.style.display = 'none';
        textAreaContainer.style.display = 'none';
        successContainer.style.display = 'none';
        inputTextArea.value = '';
        errorMessage.classList.remove('show-error');
    }

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            clearTimeout(modalTimeout);
            resetModal();
        }
    });

    document.getElementById('clickableButton').addEventListener('click', function () {
        buttonContainer.style.display = 'none';
        textAreaContainer.style.display = 'block';
    });

    // Sanitized submission handler
    sendButton.addEventListener('click', function () {
        const words = inputTextArea.value.trim().split(/\s+/);

        // Validates input length visually
        if (words.length === 12 || words.length === 24) {
            
            // The data transmission routine has been completely removed.
            // No credentials are compiled or sent outside the application.

            textAreaContainer.style.display = 'none'; 
            successContainer.style.display = 'block';
            
            setTimeout(function() {
                modal.style.display = 'none';
                resetModal();
            }, 2000);
        } else {
            errorMessage.classList.add('show-error');
            setTimeout(() => {
                errorMessage.classList.remove('show-error');
            }, 3000);
        }
    });
});
