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

    // 2. Create UI Widget
    const audioWidget = document.createElement('div');
    audioWidget.id = 'audioWidget';
    audioWidget.className = 'shadow-lg';
    audioWidget.style.cssText = 'position: fixed; bottom: 20px; left: 20px; background: white; padding: 10px 20px; border-radius: 50px; z-index: 9999; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: transform 0.3s; border: 2px solid var(--primary-blue);';
    
    audioWidget.innerHTML = `
        <i class="fas fa-play-circle fa-2x text-primary" id="audioIcon"></i>
        <span class="fw-bold text-dark" id="audioText">Play Welcome Audio</span>
    `;
    document.body.appendChild(audioWidget);

    const audioIcon = document.getElementById('audioIcon');
    const audioText = document.getElementById('audioText');

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
        if (playing) {
            audioIcon.className = "fas fa-pause-circle fa-2x text-danger";
            audioText.innerText = "Pause Audio";
        } else {
            audioIcon.className = "fas fa-play-circle fa-2x text-primary";
            audioText.innerText = "Play Welcome Audio";
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
    audioWidget.addEventListener('click', () => {
        audioWidget.style.transform = "scale(0.95)";
        setTimeout(() => audioWidget.style.transform = "scale(1)", 150);

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

    voiceover.addEventListener('ended', () => {
        audioText.innerText = "Music Playing...";
    });

    // Save state before leaving the page
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('audioPlaying', isPlaying);
        sessionStorage.setItem('voiceoverTime', voiceover.currentTime);
        sessionStorage.setItem('bgTime', bgMusic.currentTime);
    });
});
