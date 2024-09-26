const tracks = document.querySelectorAll('.song-item');
        const audioPlayer = document.createElement('audio');
        let currentTrackIndex = 0;

        // Music Player Elements
        const playPauseBtn = document.getElementById('playPauseBtn');
        const progressBar = document.getElementById('progressBar');
        const currentCover = document.getElementById('currentCover');
        const currentTitle = document.getElementById('currentTitle');
        const currentArtist = document.getElementById('currentArtist');

        // Modal Elements
        const modal = document.getElementById('songModal');
        const addSongBtn = document.getElementById('addSongBtn');
        const closeModal = document.getElementsByClassName('close')[0];

        // Show modal when 'Add Song' button is clicked
        addSongBtn.onclick = function () {
            modal.style.display = 'block';
        }

        // Close modal when 'X' is clicked
        closeModal.onclick = function () {
            modal.style.display = 'none';
        }

        // Close modal if clicked outside the modal content
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        }

        // Function to load and play the selected track
        function loadTrack(index) {
            const songItem = tracks[index];
            const songAudio = songItem.querySelector('.song-file').src;
            const songTitle = songItem.querySelector('h5').textContent;
            const songArtist = songItem.querySelector('p').textContent;
            const songCover = songItem.querySelector('.song-cover').src;

            audioPlayer.src = songAudio;
            currentCover.src = songCover;
            currentTitle.textContent = songTitle;
            currentArtist.textContent = songArtist;

            audioPlayer.play();
            playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
        }

        // Play/Pause Button functionality
        playPauseBtn.addEventListener('click', function () {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
            } else {
                audioPlayer.pause();
                playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
            }
        });

        // When a play button is clicked
        document.querySelectorAll('.play-btn').forEach(button => {
            button.addEventListener('click', function () {
                currentTrackIndex = this.getAttribute('data-index');
                loadTrack(currentTrackIndex);
            });
        });

        // Progress Bar Update
        audioPlayer.addEventListener('timeupdate', function () {
            progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        });

        // Next/Previous Buttons
        document.getElementById('nextBtn').addEventListener('click', function () {
            currentTrackIndex = (parseInt(currentTrackIndex) + 1) % tracks.length;
            loadTrack(currentTrackIndex);
        });

        document.getElementById('prevBtn').addEventListener('click', function () {
            currentTrackIndex = (parseInt(currentTrackIndex) - 1 + tracks.length) % tracks.length;
            loadTrack(currentTrackIndex);
        });

        