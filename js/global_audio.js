document.addEventListener('DOMContentLoaded', () => {
    // 1. Create Audio Elements
    const bgMusic = document.createElement('audio');
    bgMusic.id = 'bgMusic';
    bgMusic.loop = true;
    bgMusic.innerHTML = '<source src="audio/background.mp3" type="audio/mpeg">';
    document.body.appendChild(bgMusic);

    const voiceover = document.createElement('audio');
    voiceover.id = 'voiceover';
    voiceover.innerHTML = '<source src="audio/voiceover.mp3" type="audio/mpeg">';
    document.body.appendChild(voiceover);

    // 2. Get UI Widget (now defined in HTML for specific pages)
    const audioWidget = document.getElementById('audioWidget');
    let audioIcon = document.getElementById('audioIcon');
    let audioText = document.getElementById('audioText');

    // 3. Audio Logic & State
    bgMusic.volume = 0.2;
    voiceover.volume = 1.0;

    let isPlaying = sessionStorage.getItem('audioPlaying') === 'true';

    // Restore time state from previous page
    const storedVoiceTime = sessionStorage.getItem('voiceoverTime');
    const storedBgTime = sessionStorage.getItem('bgTime');
    
    if (storedVoiceTime) voiceover.currentTime = parseFloat(storedVoiceTime);
    if (storedBgTime) bgMusic.currentTime = parseFloat(storedBgTime);

    const updateUI = (playing) => {
        if (!audioWidget) return;
        if (playing) {
            if(audioIcon) audioIcon.className = "fas fa-pause-circle fa-lg text-danger";
            if(audioText) audioText.innerText = "Pause Audio";
            audioWidget.classList.add('playing');
        } else {
            if(audioIcon) audioIcon.className = "fas fa-play-circle fa-lg text-primary";
            if(audioText) audioText.innerText = "Play Welcome Audio";
            audioWidget.classList.remove('playing');
        }
    };

    // If it was playing on the previous page, continue playing
    if (isPlaying) {
        updateUI(true);
        // Play might be blocked by browser navigation, catch errors silently
        bgMusic.play().catch(e => console.log('Autoplay blocked across navigation'));
        voiceover.play().catch(e => {
            console.log('Autoplay blocked across navigation');
            isPlaying = false;
            updateUI(false);
        });
    }

    // Toggle Play/Pause on click
    if (audioWidget) {
        audioWidget.addEventListener('click', () => {
            if (!isPlaying) {
                bgMusic.play().catch(e => console.log('Background music not found'));
                voiceover.play().catch(e => console.log('Voiceover not found'));
                isPlaying = true;
            } else {
                bgMusic.pause();
                voiceover.pause();
                isPlaying = false;
            }
            updateUI(isPlaying);
        });
    }

    voiceover.addEventListener('ended', () => {
        if(audioText) audioText.innerText = "Music Playing...";
    });

    // Save state before leaving the page
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('audioPlaying', isPlaying);
        sessionStorage.setItem('voiceoverTime', voiceover.currentTime);
        sessionStorage.setItem('bgTime', bgMusic.currentTime);
    });
});
