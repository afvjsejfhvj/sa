function loadProfileImage(event) {
    var image = document.getElementById('profileImage');
    image.src = URL.createObjectURL(event.target.files[0]);
}