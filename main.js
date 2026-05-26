document.addEventListener("DOMContentLoaded", () => {
    /* ==========================
       PAGE REFERENCES
    ========================== */
    console.log("JS LOADED");


    const entrance = document.getElementById("entrance");
    const game = document.getElementById("game");
    const story = document.getElementById("story");
    const hub = document.getElementById("hub");
    const cakeCut = document.getElementById("cakeCut");

    const enterBtn = document.getElementById("enterBtn");
    const continueBtn = document.getElementById("continueBtn");
    const birthdayCake = document.getElementById("birthdayCake");
    const cutMessage = document.getElementById("cutMessage");
    const openMemories = document.getElementById("openMemories");

    const storyText = document.getElementById("storyText");
    const nextMessage = document.getElementById("nextMessage");

    const gameMessage = document.getElementById("gameMessage");

    /* ==========================
       PAGE SWITCHING
    ========================== */

    function showPage(page) {

        document
            .querySelectorAll(".page")
            .forEach(section => {
                section.classList.remove("active");
            });

        page.classList.add("active");
        setMood(page.id);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    function setMood(pageId) {

        document.body.classList.remove(
            "entranceMood",
            "storyMood",
            "secretMood",
            "finalMood"
        );

        switch (pageId) {

            case "entrance":
                document.body.classList.add("entranceMood");
                break;

            case "story":
                document.body.classList.add("storyMood");
                break;

            case "secretRoom":
                document.body.classList.add("secretMood");
                break;

            case "finalSurprise":
                document.body.classList.add("finalMood");
                break;

        }

    }
    function cinematicDoorOpen(targetPage, text = "Entering...") {

        const doorTransition = document.getElementById("doorTransition");
        const transitionText = document.getElementById("transitionText");
        const doorCreak = document.getElementById("doorCreak");

        if (!doorTransition) {
            showPage(targetPage);
            return;
        }

        transitionText.textContent = text;

        doorTransition.classList.add("active");

        flashLightning();

        if (doorCreak) {
            doorCreak.currentTime = 0;
            doorCreak.play();
        }

        setTimeout(() => {
            showPage(targetPage);
        }, 900);

        setTimeout(() => {
            doorTransition.classList.remove("active");
        }, 1500);

    }
    /* ==========================
       ENTRANCE -> GAME
    ========================== */

    enterBtn.addEventListener("click", () => {

        flashLightning();

        document.body.classList.add("screen-shake");

        showToast("Something is watching you...");

        setTimeout(() => {

            alert(
                "⚠ WARNING ⚠\n\nThis mansion remembers everything..."
            );

        }, 800);

        setTimeout(() => {

            document.body.classList.remove("screen-shake");

            cinematicDoorOpen(game, "Entering The Mansion...");

        }, 2200);

    });
    const introLines = [
        "A mysterious mansion has appeared tonight...",
        "The air feels cold...",
        "The moon is watching...",
        "Inside are memories, secrets, and one final surprise ❤️"
    ];

    let introIndex = 0;

    function typeIntroLine() {
        const introText = document.getElementById("introText");
        introText.textContent = "";

        let i = 0;
        const line = introLines[introIndex];

        const typing = setInterval(() => {
            introText.textContent += line.charAt(i);
            i++;

            if (i >= line.length) {
                clearInterval(typing);

                setTimeout(() => {
                    introIndex = (introIndex + 1) % introLines.length;
                    typeIntroLine();
                }, 1600);
            }
        }, 45);
    }

    typeIntroLine();

    /* ==========================
       CAKE GAME
    ========================== */

    const wrongObjects =
        document.querySelectorAll(".wrong");

    wrongObjects.forEach(item => {

        item.addEventListener("click", () => {

            const responses = [
                "Not this one 👻",
                "The ghosts are laughing 😂",
                "Keep searching ❤️",
                "That's definitely not cake 😭"
            ];

            gameMessage.textContent =
                responses[
                Math.floor(
                    Math.random() *
                    responses.length
                )
                ];

        });

    });

    const cake =
        document.getElementById("cake");

    cake.addEventListener("click", () => {

        gameMessage.innerHTML =
            "🎂 You found the birthday cake!";

        continueBtn.classList.remove("hidden");

    });

    /* ==========================
       GAME -> STORY
    ========================== */

    continueBtn.addEventListener("click", () => {

        cinematicDoorOpen(cakeCut, "Entering The Cake Room...");

    });
    /* ==========================
       CAKE CUTTING GAME
    ========================== */

    let cuts = 0;

    const cutMessages = [

        "One wish ❤️",

        "For happiness ❤️",

        "For success ❤️",

        "For endless smiles ❤️",

        "For us ❤️"

    ];

    birthdayCake.addEventListener("click", () => {

        cuts++;

        if (cuts <= 5) {

            cutMessage.textContent =
                cutMessages[cuts - 1];

        }

        if (cuts === 5) {
            burstHearts();

            birthdayCake.innerHTML = "🍰";

            birthdayCake.style.transform =
                "scale(1.3) rotate(10deg)";

            setTimeout(() => {

                birthdayCake.style.transform =
                    "scale(1) rotate(0deg)";

            }, 500);
            openMemories.classList.remove("hidden");

            cutMessage.innerHTML =
                "🎉 Happy Birthday My Love ❤️";

        }

    });
    openMemories.addEventListener("click", () => {

        cinematicDoorOpen(story, "Opening Memories...");

        startStory();

    });

    function burstHearts() {

        for (let i = 0; i < 15; i++) {

            const heart =
                document.createElement("div");

            heart.innerHTML = "❤️";

            heart.classList.add("heart");

            heart.style.left =
                (40 + Math.random() * 20) + "vw";

            document.body.appendChild(heart);

            setTimeout(() => {

                heart.remove();

            }, 8000);

        }

    }
    /* ==========================
       STORY SYSTEM
    ========================== */

    const messages = [

        "Before I met you, life was simply moving.",

        "Then somehow, you appeared.",

        "And suddenly ordinary days became special.",

        "Your voice became my favorite sound.",

        "Your smile became my favorite view.",

        "Your happiness became important to me.",

        "And without even realizing it...",

        "You became my world ❤️"

    ];

    let currentMessage = 0;

    function typeWriter(text) {

        storyText.textContent = "";

        let i = 0;

        const typing = setInterval(() => {

            storyText.textContent += text.charAt(i);

            i++;

            if (i >= text.length) {

                clearInterval(typing);

            }

        }, 70);

    }

    function startStory() {

        currentMessage = 0;

        typeWriter(
            messages[currentMessage]
        );

    }

    nextMessage.addEventListener("click", () => {

        currentMessage++;

        if (
            currentMessage <
            messages.length
        ) {

            typeWriter(
                messages[currentMessage]
            );

        }

        else {

            cinematicDoorOpen(hub, "Entering The Grand Hall...");

        }

    });

    /* ==========================
       MODALS
    ========================== */

    const galleryDoor =
        document.getElementById("galleryDoor");

    const voiceDoor =
        document.getElementById("voiceDoor");

    const letterDoor =
        document.getElementById("letterDoor");

    const galleryModal =
        document.getElementById("galleryModal");

    const voiceModal =
        document.getElementById("voiceModal");

    const letterModal =
        document.getElementById("letterModal");
    const cinemaDoor =
        document.getElementById("cinemaDoor");

    const cinemaModal =
        document.getElementById("cinemaModal");

    galleryDoor.addEventListener("click", () => {

        galleryVisited = true;

        checkFinalUnlock();

        galleryModal.style.display = "block";

    });

    voiceDoor.addEventListener("click", () => {

        voiceVisited = true;

        checkFinalUnlock();

        voiceModal.style.display = "block";

        // Pause background soundtrack
        if (bgMusic) {
            bgMusic.pause();
            musicToggle.textContent = "🎵";
        }

    });

    letterDoor.addEventListener("click", () => {

        letterModal.style.display = "block";

    });
    const secretDoor = document.getElementById("secretDoor");
    const secretRoom = document.getElementById("secretRoom");

    secretDoor.addEventListener("click", () => {
        cinematicDoorOpen(secretRoom, "Unlocking Secret Room...");
    });
    cinemaDoor.addEventListener("click", () => {

        cinemaModal.style.display = "block";

        if (bgMusic) {

            bgMusic.pause();

            musicToggle.textContent = "🎵";

        }

    });

    /* ==========================
       CLOSE MODALS
    ========================== */

    document
        .querySelectorAll(".close")
        .forEach(btn => {

            btn.addEventListener("click", () => {

                galleryModal.style.display = "none";
                voiceModal.style.display = "none";
                letterModal.style.display = "none";
                cinemaModal.style.display = "none";

                /* STOP VOICE PLAYER */
                audioPlayer.pause();
                audioPlayer.currentTime = 0;

                document
                    .querySelector(".album-art")
                    .classList.remove("playing");

                playPauseBtn.textContent = "▶";

                /* STOP ALL CINEMA VIDEOS */
                document
                    .querySelectorAll("#cinemaModal video")
                    .forEach(video => {

                        video.pause();
                        video.currentTime = 0;

                    });

                /* Resume background soundtrack */
                if (bgMusic && bgMusic.paused) {

                    bgMusic.play();
                    musicToggle.textContent = "🔇";

                }

            });

        });
    /* ==========================
       CLICK OUTSIDE MODAL
    ========================== */

    window.addEventListener("click", e => {

        if (
            e.target === galleryModal ||
            e.target === voiceModal ||
            e.target === letterModal
        ) {

            galleryModal.style.display = "none";
            voiceModal.style.display = "none";
            letterModal.style.display = "none";
            cinemaModal.style.display = "none";

            // Resume soundtrack
            if (bgMusic && bgMusic.paused) {
                bgMusic.play();
                musicToggle.textContent = "🔇";
            }

        }

    });

    /* ==========================
       FLOATING HEARTS
    ========================== */

    function createHeart() {

        const heart =
            document.createElement("div");

        heart.classList.add("heart");

        heart.innerHTML = "❤️";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.fontSize =
            Math.random() * 20 + 15 + "px";

        document.body.appendChild(
            heart
        );

        setTimeout(() => {

            heart.remove();

        }, 8000);

    }

    setInterval(
        createHeart,
        3500
    );

    /* ==========================
       LIGHTNING EFFECT
    ========================== */

    const lightning =
        document.getElementById("lightning");

    function flashLightning() {

        lightning.style.opacity = "0.9";

        setTimeout(() => {

            lightning.style.opacity = "0";

        }, 100);

    }

    setInterval(() => {

        const chance =
            Math.random();

        if (chance > 0.7) {

            flashLightning();

        }

    }, 5000);
    const thunderAudio =
        document.getElementById("thunderAudio");

    setInterval(() => {

        const chance = Math.random();

        if (chance > .75) {

            flashLightning();

            if (thunderAudio) {

                thunderAudio.currentTime = 0;
                thunderAudio.play();

            }

        }

    }, 7000);

    /* ==========================
       SECRET MOON EASTER EGG
    ========================== */
    let moonClicks = 0;

    const moon = document.querySelector(".moon");

    if (moon) {

        moon.addEventListener("click", () => {

            moonClicks++;

            if (moonClicks === 5) {

                alert(
                    "🌙 Secret Unlocked!\n\nYou found a hidden memory ❤️"
                );

            }

        });

    }

    /* ==========================
       GALLERY PLACEHOLDER
    ========================== */

    /* ==========================
       GALLERY SYSTEM
    ========================== */

    const galleryGrid =
        document.getElementById("galleryGrid");

    const imageViewer =
        document.getElementById("imageViewer");

    const viewerImg =
        document.getElementById("viewerImg");

    const viewerCaption =
        document.getElementById("viewerCaption");

    const closeViewer =
        document.getElementById("closeViewer");

    const prevBtn =
        document.getElementById("prevBtn");

    const nextBtn =
        document.getElementById("nextBtn");
    const photoAudioA = document.getElementById("photoAudioA");
    const photoAudioB = document.getElementById("photoAudioB");

    let activePhotoAudio = photoAudioA;
    let inactivePhotoAudio = photoAudioB;
    let photoFadeInterval;

    const photoSongs = [

        "audio/pic1.mp3",
        "audio/pic2.mp3",
        "audio/pic3.mp3",
        "audio/pic4.mp3",
        "audio/pic5.mp3",
        "audio/pic6.mp3",
        "audio/pic7.mp3",
        "audio/pic8.mp3",
        "audio/pic9.mp3",
        "audio/pic10.mp3",

        "audio/pic11.mp3",
        "audio/pic12.mp3",
        "audio/pic13.mp3",
        "audio/pic14.mp3",
        "audio/pic15.mp3",
        "audio/pic16.mp3",
        "audio/pic17.mp3",
        "audio/pic18.mp3",
        "audio/pic19.mp3",
        "audio/pic20.mp3",

        "audio/pic21.mp3",
        "audio/pic22.mp3",
        "audio/pic23.mp3",
        "audio/pic24.mp3",
        "audio/pic25.mp3",
        "audio/pic26.mp3",
        "audio/pic27.mp3",
        "audio/pic28.mp3",
        "audio/pic29.mp3",
        "audio/pic30.mp3",

        "audio/pic31.mp3",
        "audio/pic32.mp3",
        "audio/pic33.mp3",
        "audio/pic34.mp3",
        "audio/pic35.mp3"

    ];

    function playPhotoSong(songSrc) {

        clearInterval(photoFadeInterval);

        inactivePhotoAudio.pause();
        inactivePhotoAudio.currentTime = 0;

        inactivePhotoAudio.src = songSrc;
        inactivePhotoAudio.loop = true;
        inactivePhotoAudio.volume = 0;

        inactivePhotoAudio.play();

        photoFadeInterval = setInterval(() => {

            if (activePhotoAudio.volume > 0.05) {
                activePhotoAudio.volume -= 0.05;
            } else {
                activePhotoAudio.pause();
                activePhotoAudio.currentTime = 0;
                activePhotoAudio.volume = 0;
                activePhotoAudio.loop = false;
            }

            if (inactivePhotoAudio.volume < 0.45) {
                inactivePhotoAudio.volume += 0.05;
            }

            if (inactivePhotoAudio.volume >= 0.45) {

                clearInterval(photoFadeInterval);

                const temp = activePhotoAudio;
                activePhotoAudio = inactivePhotoAudio;
                inactivePhotoAudio = temp;

            }

        }, 120);

    }

    /* ==========================
       PHOTO CAPTIONS
    ========================== */

    const captions = [

        "Ee Yakshi Kadikuo? 🫦🌚 ",
        "Saree Udutha Shundarii🤌😭",
        "Still obsessed with ur Smile 😩❤️",
        "My comfort person ❤️",
        "This smile heals everything ✨❤️",
        "Forever my favorite human 🥰❤️",
        "You make life beautiful 🌝❤️",
        "My heart lives here ❤️",
        "Prime Aishuu meets Current Aishuu 😭❤️",
        "The reason I smile randomly 😁❤️",

        "My safe place 😇❤️",
        " Awwwwwwwwwwwww😍❤️",
        "Shundariiiiiiiiiiiiiii 🤌🥹",
        "You look magical here 🥺❤️",
        "My whole world 🌝❤️",
        "Still can’t believe I found you 😭❤️",
        "My happiness in one photo 🥰❤️",
        "I Got My Eye On YOUUU 🫶❤️",
        "Beautiful inside and out ❤️",
        "My forever favorite person 🌝❤️",

        "The Night We Met 🫠❤️",
        "I'd melt every single time 🥰❤️",
        "Ninthe Chiri Njan Kandannu 😫💫",
        "This picture owns my heart 🥹❤️",
        "Her 😁✨",
        "My daily serotonin 😇❤️",
        "Your smile > everything 😭❤️",
        "The best part of my life  💎",
        "🫠",
        "My fav person forever ✨❤️",

        "You deserve the entire universe 🥹❤️",
        "Where is my sweety? 🥺❤️",
        "Aishuu FM 🎶❤️",
        "Looks just like a dream 🌝❤️",
        "Happy Birthday Mutheee 🥳❤️"

    ];

    let currentImage = 0;

    const images = [];

    /* ==========================
       LOAD 35 IMAGES
    ========================== */

    for (let i = 1; i <= 35; i++) {

        const img =
            document.createElement("img");

        img.src = `images/pic${i}.jpg`;

        img.alt = `Memory ${i}`;

        img.loading = "lazy";

        images.push(img.src);

        img.addEventListener("click", () => {

            currentImage = i - 1;

            openViewer();

        });

        galleryGrid.appendChild(img);

    }

    /* ==========================
       OPEN VIEWER
    ========================== */

    function openViewer() {

        imageViewer.style.display = "flex";

        viewerImg.src =
            images[currentImage];

        viewerCaption.textContent =
            captions[currentImage];

        /* ==========================
           PHOTO MUSIC SYSTEM
        ========================== */

        if (photoSongs[currentImage]) {

            // Pause mansion ambience
            if (bgMusic) {

                bgMusic.pause();

                musicToggle.textContent = "🎵";

            }

            // Pause voice vault
            audioPlayer.pause();

            // CROSSFADE SONG
            playPhotoSong(
                photoSongs[currentImage]
            );

        }

    }
    /* ==========================
       CLOSE VIEWER
    ========================== */

    closeViewer.addEventListener("click", () => {

        imageViewer.style.display = "none";

        /* ==========================
           STOP PHOTO MUSIC
        ========================== */

        /* ==========================
        STOP PHOTO MUSIC
     ========================== */

        activePhotoAudio.pause();

        inactivePhotoAudio.pause();

        activePhotoAudio.currentTime = 0;

        inactivePhotoAudio.currentTime = 0;
        /* ==========================
           RESUME MANSION AMBIENCE
        ========================== */

        if (bgMusic) {

            bgMusic.volume = 0;

            bgMusic.play();

            musicToggle.textContent = "🔇";

            let fadeAudio = setInterval(() => {

                if (bgMusic.volume < 0.45) {

                    bgMusic.volume += 0.05;

                } else {

                    clearInterval(fadeAudio);

                }

            }, 200);

        }

    });

    /* ==========================
       NEXT IMAGE
    ========================== */

    nextBtn.addEventListener("click", () => {

        currentImage++;

        if (currentImage >= images.length) {

            currentImage = 0;

        }

        openViewer();

    });

    /* ==========================
       PREVIOUS IMAGE
    ========================== */

    prevBtn.addEventListener("click", () => {

        currentImage--;

        if (currentImage < 0) {

            currentImage =
                images.length - 1;

        }

        openViewer();

    });

    /* ==========================
       AUDIO PLACEHOLDER
    ========================== */
    const audioPlayer =
        document.getElementById("audioPlayer");


    const trackTitle =
        document.getElementById("trackTitle");
    const progressBar =
        document.getElementById("progressBar");

    const currentTimeEl =
        document.getElementById("currentTime");

    const durationEl =
        document.getElementById("duration");

    const tracks = [

        {
            src: "audio/voice1.mp3",
            title: "Voice Message 1 ❤️"
        },

        {
            src: "audio/voice2.mp3",
            title: "Voice Message 2 ❤️"
        },

        {
            src: "audio/voice3.mp3",
            title: "Voice Message 3 ❤️"
        },

        {
            src: "audio/voice4.mp3",
            title: "Voice Message 4 ❤️"
        },

        {
            src: "audio/voice5.mp3",
            title: "Voice Message 5 ❤️"
        },

        {
            src: "audio/voice6.mp3",
            title: "Voice Message 6 ❤️"
        },

        {
            src: "audio/voice7.mp3",
            title: "Voice Message 7 ❤️"
        },

        {
            src: "audio/voice8.mp3",
            title: "Voice Message 8 ❤️"
        },

        {
            src: "audio/voice9.mp3",
            title: "Voice Message 9 ❤️"
        },

        {
            src: "audio/voice10.mp3",
            title: "Voice Message 10 ❤️"
        },

        {
            src: "audio/voice11.mp3",
            title: "Voice Message 11 ❤️"
        },

        {
            src: "audio/voice12.mp3",
            title: "Voice Message 12 ❤️"
        },

        {
            src: "audio/voice13.mp3",
            title: "Voice Message 13 ❤️"
        },

        {
            src: "audio/voice14.mp3",
            title: "Voice Message 14 ❤️"
        }

    ];




    let currentTrack = 0;

    function playTrack(src, title) {

        document.querySelector(".equalizer").style.opacity = "1";

        currentTrack =
            tracks.findIndex(
                track => track.src === src
            );

        audioPlayer.src = src;

        trackTitle.textContent = title;

        audioPlayer.play();

        document
            .querySelector(".album-art")
            .classList.add("playing");

    }

    window.playTrack = playTrack;



    /*
    
    Later we will create:
    
    Spotify style player
    
    Voice playlist
    
    Album art
    
    Progress bar
    
    Auto next song
    
    Custom controls
    */
    const envelope =
        document.getElementById("envelope");

    const secretLetter =
        document.getElementById("secretLetter");

    const typedLetter =
        document.getElementById("typedLetter");

    const fullLetter = `

Happy Birthday My Love ❤️

I never expected someone so far away
could become such an important part
of my life.

You made ordinary days special.

You made difficult days easier.

Your voice became my comfort.

Your smile became my happiness.

You inspired me to become better,
dream bigger and believe more.

No matter how many miles separate us,
you will always have a place in my heart.

Thank you for being you.

Thank you for existing.

And thank you for choosing me.

Happy Birthday My Whole World ❤️

`;

    envelope.addEventListener("click", () => {

        letterVisited = true;

        checkFinalUnlock();

        envelope.style.display = "none";

        secretLetter.classList.remove("hidden");

        let i = 0;

        typedLetter.textContent = "";

        const typing = setInterval(() => {

            typedLetter.textContent +=
                fullLetter.charAt(i);

            i++;

            if (i >= fullLetter.length) {

                clearInterval(typing);

            }

        }, 30);

    });
    let galleryVisited = false;
    let voiceVisited = false;
    let letterVisited = false;

    const finalBtn =
        document.getElementById("finalBtn");

    const finalSurprise =
        document.getElementById("finalSurprise");
    /* ==========================
       LETTER PLACEHOLDER
    ========================== */

    /*
    Later we will add:
    
    Envelope opening animation
    
    Typewriter letter
    
    Personal message
    
    Floating hearts
    
    Final surprise ending
    */
    /* ==========================
       FINAL SURPRISE UNLOCK
    ========================== */

    function checkFinalUnlock() {

        if (
            galleryVisited &&
            voiceVisited &&
            letterVisited
        ) {

            finalBtn.classList.remove("hidden");

            finalBtn.animate([
                { transform: "scale(1)" },
                { transform: "scale(1.15)" },
                { transform: "scale(1)" }
            ], {
                duration: 1000,
                iterations: 3
            });

        }

    }
    finalBtn.addEventListener("click", () => {

        const endingTransition =
            document.getElementById("endingTransition");

        const endingLine =
            document.getElementById("endingLine");

        endingTransition.classList.add("show");

        endingLine.innerHTML =
            "Some people leave...<br>but their memories learn how to stay.";

        // stop ambience slowly
        if (bgMusic) {

            let fadeOut = setInterval(() => {

                if (bgMusic.volume > 0.05) {

                    bgMusic.volume -= 0.05;

                } else {

                    bgMusic.pause();

                    clearInterval(fadeOut);

                }

            }, 200);

        }

        setTimeout(() => {

            endingLine.innerHTML =
                "And maybe that's why this mansion still exists.";

        }, 5000);

        setTimeout(() => {

            endingTransition.classList.remove("show");

            cinematicDoorOpen(
                finalSurprise,
                "One Last Memory..."
            );

        }, 9500);

    });
    audioPlayer.addEventListener("timeupdate", () => {

        if (!isNaN(audioPlayer.duration)) {

            const progress =
                (audioPlayer.currentTime /
                    audioPlayer.duration) * 100;

            progressBar.style.width =
                progress + "%";

            currentTimeEl.textContent =
                formatTime(audioPlayer.currentTime);

            durationEl.textContent =
                formatTime(audioPlayer.duration);

        }

    });

    audioPlayer.addEventListener("loadedmetadata", () => {

        if (!isNaN(audioPlayer.duration)) {

            durationEl.textContent =
                formatTime(audioPlayer.duration);

        }

    });

    function formatTime(seconds) {

        if (isNaN(seconds)) return "0:00";

        const mins =
            Math.floor(seconds / 60);

        const secs =
            Math.floor(seconds % 60);

        return mins + ":" +
            (secs < 10 ? "0" : "") +
            secs;

    }
    audioPlayer.addEventListener("ended", () => {

        currentTrack++;

        if (currentTrack >= tracks.length) {

            currentTrack = 0;

        }

        playTrack(
            tracks[currentTrack].src,
            tracks[currentTrack].title
        );

    });
    const prevTrack =
        document.getElementById("prevTrack");

    const nextTrack =
        document.getElementById("nextTrack");

    prevTrack.addEventListener("click", () => {

        currentTrack--;

        if (currentTrack < 0) {

            currentTrack =
                tracks.length - 1;

        }

        playTrack(
            tracks[currentTrack].src,
            tracks[currentTrack].title
        );

    });

    nextTrack.addEventListener("click", () => {

        currentTrack++;

        if (currentTrack >= tracks.length) {

            currentTrack = 0;

        }

        playTrack(
            tracks[currentTrack].src,
            tracks[currentTrack].title
        );

    });
    const playPauseBtn =
        document.getElementById("playPauseBtn");
    document.querySelector(".equalizer").style.opacity = ".25";

    playPauseBtn.addEventListener("click", () => {

        if (audioPlayer.paused) {

            audioPlayer.play();

            document
                .querySelector(".album-art")
                .classList.add("playing");

            playPauseBtn.textContent = "⏸";

        } else {

            audioPlayer.pause();

            document
                .querySelector(".album-art")
                .classList.remove("playing");

            playPauseBtn.textContent = "▶";

        }

    });
    console.log("END OF FILE REACHED");

    /* ==========================
       UPGRADE PACK FUNCTIONS
    ========================== */
    const toast = document.getElementById("toast");
    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.remove("hidden");
        toast.classList.add("show");
        setTimeout(() => { toast.classList.remove("show"); setTimeout(() => toast.classList.add("hidden"), 250); }, 2200);
    }

    function saveVisit(room) {
        localStorage.setItem("birthdayVisit_" + room, "yes");
    }
    function hasVisit(room) {
        return localStorage.getItem("birthdayVisit_" + room) === "yes";
    }
    function updateUnlockPanel() {
        const states = {
            gallery: galleryVisited,
            voice: voiceVisited,
            letter: letterVisited
        };
        const checks = [
            ["galleryCheck", states.gallery],
            ["voiceCheck", states.voice],
            ["letterCheck", states.letter]
        ];
        let done = 0;
        checks.forEach(([id, ok]) => {
            const el = document.getElementById(id);
            if (ok) { done++; el?.classList.add("done"); }
        });
        const unlockText = document.getElementById("unlockText");
        if (unlockText) unlockText.textContent = `${done}/3 rooms visited. ${done === 3 ? "Final surprise unlocked ❤️" : "Keep exploring the mansion..."}`;
        if (done === 3) {
            finalBtn.classList.remove("hidden");
        }
    }

    galleryDoor.addEventListener("click", () => { saveVisit("gallery"); updateUnlockPanel(); showToast("Gallery room visited 📸"); });
    voiceDoor.addEventListener("click", () => { saveVisit("voice"); updateUnlockPanel(); showToast("Voice vault visited 🎵"); });
    envelope.addEventListener("click", () => { saveVisit("letter"); updateUnlockPanel(); showToast("Letter opened 💌"); });
    updateUnlockPanel();

    const gallerySearch = document.getElementById("gallerySearch");
    if (gallerySearch) {
        gallerySearch.addEventListener("input", () => {
            const term = gallerySearch.value.toLowerCase();
            [...galleryGrid.children].forEach((img, index) => {
                img.style.display = captions[index].toLowerCase().includes(term) ? "block" : "none";
            });
        });
    }
    const surprisePhotoBtn = document.getElementById("surprisePhotoBtn");
    if (surprisePhotoBtn) {
        surprisePhotoBtn.addEventListener("click", () => {
            currentImage = Math.floor(Math.random() * images.length);
            openViewer();
        });
    }

    const progressContainer = document.querySelector(".progress-container");
    if (progressContainer) {
        progressContainer.addEventListener("click", e => {
            if (!audioPlayer.duration) return;
            const rect = progressContainer.getBoundingClientRect();
            audioPlayer.currentTime = ((e.clientX - rect.left) / rect.width) * audioPlayer.duration;
        });
    }

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            galleryModal.style.display = "none";
            voiceModal.style.display = "none";
            letterModal.style.display = "none";
            imageViewer.style.display = "none";
        }
        if (imageViewer.style.display === "flex") {
            if (e.key === "ArrowRight") nextBtn.click();
            if (e.key === "ArrowLeft") prevBtn.click();
        }
    });

    const loveNotes = [

        "Happy Birthday ❤️ The world got a little luckier the day you were born.",

        "Official birthday reminder: You're not allowed to worry about anything today 😌✨",

        "I was going to buy the perfect gift, but then I remembered you already have great taste 😏❤️",

        "The birthday girl is looking suspiciously beautiful today 👑❤️",

        "Fun fact: Birthdays become 73% better when you're this cute 😭❤️",

        "I hope today gives you as many reasons to smile as you've given other people 😊❤️",

        "Some people age. You just keep leveling up ✨❤️",

        "You make 'getting older' look unfairly good 😏",

        "If birthdays were competitions, you'd win best smile every year ❤️",

        "The candles aren't the brightest thing today... you are 🌙❤️",

        "The moon asked me to tell you it's tired of losing the beauty contest 🌙😌",

        "Today's forecast: Cake, smiles, and everyone reminding you how special you are 🎂❤️",

        "I still think heaven is missing an angel 🪽❤️",

        "Warning: Excessive cuteness detected. Proceed carefully 😭❤️",

        "Happy Birthday to my favorite distraction 😏❤️"

    ];
    const newNoteBtn = document.getElementById("newNoteBtn");
    const dailyNote = document.getElementById("dailyNote");
    if (newNoteBtn && dailyNote) {
        newNoteBtn.addEventListener("click", () => {
            dailyNote.textContent = loveNotes[Math.floor(Math.random() * loveNotes.length)];
        });
    }
    const replayBtn = document.getElementById("replayBtn");
    if (replayBtn) { replayBtn.addEventListener("click", () => showPage(entrance)); }
    const unlockSecret = document.getElementById("unlockSecret");
    const secretInput = document.getElementById("secretInput");
    const secretMessage = document.getElementById("secretMessage");
    const backToHall =
        document.getElementById("backToHall");

    backToHall.addEventListener("click", () => {

        cinematicDoorOpen(hub, "Returning To Grand Hall...");

    });

    unlockSecret.addEventListener("click", () => {

        const password = secretInput.value.toLowerCase();

        if (password === "iloveyou") {

            secretMessage.innerHTML = "❤️ Access Granted ❤️";

            burstHearts();

        } else {

            secretMessage.innerHTML = "Wrong password 😭";

        }

    });





    const cursorGlow = document.getElementById("cursorGlow");

    window.addEventListener("mousemove", e => {

        cursorGlow.style.left = e.clientX + "px";

        cursorGlow.style.top = e.clientY + "px";

    });
    const canvas = document.getElementById("fireworks");

    if (canvas) {

        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];

        function createFirework() {

            for (let i = 0; i < 80; i++) {

                particles.push({
                    x: canvas.width / 2,
                    y: canvas.height / 2,
                    dx: (Math.random() - 0.5) * 8,
                    dy: (Math.random() - 0.5) * 8,
                    life: 100
                });

            }

        }

        function animateFireworks() {

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = particles.length - 1; i >= 0; i--) {

                const p = particles[i];

                p.x += p.dx;
                p.y += p.dy;

                p.life--;

                ctx.beginPath();
                ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = "#ff2d6f";
                ctx.fill();

                if (p.life <= 0) {

                    particles.splice(i, 1);

                }

            }

            requestAnimationFrame(animateFireworks);

        }

        animateFireworks();

        setInterval(createFirework, 3000);

    }
    const cinemaVideos =
        document.querySelectorAll("#cinemaModal video");

    cinemaVideos.forEach(video => {

        video.addEventListener("play", () => {

            /* STOP BACKGROUND MUSIC */

            if (bgMusic) {

                bgMusic.pause();

                musicToggle.textContent = "🎵";

            }

            /* PAUSE OTHER VIDEOS */

            cinemaVideos.forEach(other => {

                if (other !== video) {

                    other.pause();

                }

            });

        });

    });
    window.addEventListener("load", () => {
        const loader = document.getElementById("loader");

        setTimeout(() => {
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.display = "none";
            }, 600);

        }, 1200);
    });

    function createPetal() {
        const petal = document.createElement("div");

        petal.classList.add("petal");
        petal.innerHTML = "🌹";

        petal.style.left = Math.random() * 100 + "vw";
        petal.style.animationDuration = Math.random() * 5 + 5 + "s";

        document.body.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, 10000);
    }

    if (window.innerWidth > 768) {
        setInterval(createPetal, 1800);
    }

    const musicToggle = document.getElementById("musicToggle");
    const bgMusic = document.getElementById("bgMusic");

    if (musicToggle && bgMusic) {

        musicToggle.addEventListener("click", () => {

            if (bgMusic.paused) {

                bgMusic.play();
                musicToggle.textContent = "🔇";

            } else {

                bgMusic.pause();
                musicToggle.textContent = "🎵";

            }

        });

    }
    window.addEventListener("load", () => {

        const introBoom = document.getElementById("introBoom");

        setTimeout(() => {

            if (introBoom) {
                introBoom.currentTime = 0;
                introBoom.play();
            }

        }, 1200);

    });
    const memoryWhisper = document.getElementById("memoryWhisper");

    const emotionalQuotes = [

        "Birthdays are just proof the world wanted more of you ❤️",
        "Every memory here comes with a smile attached 😌✨",
        "Warning: This website contains dangerous levels of cuteness 😏❤️",
        "Another year older, somehow another year prettier 😏✨",
        "The real birthday mystery is how you're still getting cuter every year  😭❤️",
        "Some people collect photos. I accidentally collected too many memories of you 📸❤️",
        "The birthday girl has entered the mansion 👑✨",
        "Birthday status: Looking beautiful without even trying 😌❤️"

    ];

    function showMemoryWhisper() {

        if (!memoryWhisper) return;

        const quote =
            emotionalQuotes[
            Math.floor(Math.random() * emotionalQuotes.length)
            ];

        memoryWhisper.textContent = quote;

        memoryWhisper.classList.remove("hidden");

        setTimeout(() => {
            memoryWhisper.classList.add("show");
        }, 50);

        setTimeout(() => {
            memoryWhisper.classList.remove("show");

            setTimeout(() => {
                memoryWhisper.classList.add("hidden");
            }, 1200);

        }, 4200);

    }

    setInterval(() => {

        const activePage = document.querySelector(".page.active");

        if (
            activePage &&
            activePage.id !== "entrance" &&
            Math.random() > 0.45
        ) {
            showMemoryWhisper();
        }

    }, 14000);
});