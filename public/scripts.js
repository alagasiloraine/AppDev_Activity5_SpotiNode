const tracks = document.querySelectorAll('.song-item');
        const audioPlayer = document.createElement('audio');
        let currentTrackIndex = 0;

        const playPauseBtn = document.getElementById('playPauseBtn');
        const progressBar = document.getElementById('progressBar');
        const currentCover = document.getElementById('currentCover');
        const currentTitle = document.getElementById('currentTitle');
        const currentArtist = document.getElementById('currentArtist');

        function loadTrack(index) {
            const songItem = tracks[index];
            const songAudio = songItem.querySelector('.song-file').src;
            const songTitle = songItem.querySelector('h3').textContent;
            const songArtist = songItem.querySelector('p').textContent;
            const songCover = songItem.querySelector('.song-cover').src;

            audioPlayer.src = songAudio;
            
            currentCover.src = songCover;
            currentTitle.textContent = songTitle;
            currentArtist.textContent = songArtist;

            audioPlayer.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }

        playPauseBtn.addEventListener('click', function () {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                audioPlayer.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        document.querySelectorAll('.play-btn').forEach(button => {
            button.addEventListener('click', function () {
                currentTrackIndex = this.getAttribute('data-index');
                loadTrack(currentTrackIndex);  
            });
        });

        audioPlayer.addEventListener('timeupdate', function () {
            progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        });

        document.getElementById('nextBtn').addEventListener('click', function () {
            currentTrackIndex = (parseInt(currentTrackIndex) + 1) % tracks.length;
            loadTrack(currentTrackIndex);
        });

        document.getElementById('prevBtn').addEventListener('click', function () {
            currentTrackIndex = (parseInt(currentTrackIndex) - 1 + tracks.length) % tracks.length;
            loadTrack(currentTrackIndex);
        });

        const addSongBtn = document.getElementById('addSongBtn');
        const songModal = document.getElementById('songModal');
        const closeModal = document.querySelector('.close');

        addSongBtn.addEventListener('click', function () {
            songModal.style.display = 'block';
        });

        closeModal.addEventListener('click', function () {
            songModal.style.display = 'none';
        });

        window.addEventListener('click', function (event) {
            if (event.target == songModal) {
                songModal.style.display = 'none';
            }
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function () {
                const songId = this.getAttribute('data-id');

                const userConfirmed = confirm('Are you sure you want to delete this song?');
                if (userConfirmed) {
                    fetch(`/delete-song/${songId}`, {
                        method: 'DELETE'
                    })
                    .then(response => {
                        if (response.ok) {
                            this.closest('.song-item').remove();
                        } else {
                            alert('Failed to delete the song.');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('An error occurred while trying to delete the song.');
                    });
                }
            });
        });

const editSongModal = document.getElementById('editSongModal');
const closeEditModal = document.getElementById('closeEditModal');

document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', function () {

        const songId = this.getAttribute('data-id');
        const songTitle = this.getAttribute('data-title');
        const songArtist = this.getAttribute('data-artist');
        const songImage = this.getAttribute('data-image');
        const songFile = this.getAttribute('data-file');

        document.getElementById('editSongId').value = songId;
        document.getElementById('editTitle').value = songTitle;
        document.getElementById('editArtist').value = songArtist;

        const previewImage = document.getElementById('editPreviewImage');
        previewImage.src = songImage;

        document.getElementById('editCoverImage').value = "";
        document.getElementById('editMusicFile').value = "";

        editSongModal.style.display = 'block';
    });
});

closeEditModal.addEventListener('click', function () {
    editSongModal.style.display = 'none';
});

window.addEventListener('click', function (event) {
    if (event.target == editSongModal) {
        editSongModal.style.display = 'none';
    }
});
