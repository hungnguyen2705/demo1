document.addEventListener('DOMContentLoaded', function() {
    
    // --- PHẦN 1: XỬ LÝ UPLOAD ẢNH ---
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const uploadContent = document.getElementById('uploadContent');
    const previewContainer = document.getElementById('previewContainer');
    const previewImage = document.getElementById('previewImage');
    const closePreviewBtn = document.getElementById('closePreview');

    // Sự kiện kéo thả (Drag & Drop)
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Hiệu ứng khi kéo file vào vùng chọn
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.add('drag-active');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('drag-active');
        }, false);
    });

    // Xử lý khi thả file
    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    // Xử lý khi chọn file từ nút bấm
    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    // Hàm hiển thị ảnh
    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    uploadContent.classList.add('hidden');
                    previewContainer.classList.remove('hidden');
                }
                reader.readAsDataURL(file);
            } else {
                alert("Vui lòng chọn file ảnh!");
            }
        }
    }

    // Nút đóng xem trước (Xóa ảnh)
    closePreviewBtn.addEventListener('click', function() {
        fileInput.value = ''; // Reset input
        previewImage.src = '';
        previewContainer.classList.add('hidden');
        uploadContent.classList.remove('hidden');
    });


    // --- PHẦN 2: XỬ LÝ POPUP LOGIN ---
    const loginModal = document.getElementById('loginModal');
    const openLoginBtn = document.getElementById('openLogin');
    const closeLoginBtn = document.getElementById('closeLogin');

    // Mở Modal
    if(openLoginBtn) {
        openLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.remove('hidden');
            // Timeout nhỏ để CSS transition hoạt động mượt mà
            setTimeout(() => {
                loginModal.classList.add('show');
            }, 10);
        });
    }

    // Đóng Modal (Nút X)
    if(closeLoginBtn) {
        closeLoginBtn.addEventListener('click', closeModal);
    }

    // Đóng Modal (Click ra ngoài vùng trắng)
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            closeModal();
        }
    });

    function closeModal() {
        loginModal.classList.remove('show');
        setTimeout(() => {
            loginModal.classList.add('hidden');
        }, 300); // Chờ 0.3s cho hiệu ứng mờ dần kết thúc
    }
});