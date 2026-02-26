// Audio Generation Script for French Flashcards
// Uses ElevenLabs API to generate MP3 pronunciations

const fs = require('fs');
const path = require('path');

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICES = {
    male: 'GRKzEhPHr0FFNDlaqQei',   // French John
    female: 'B7fiLqn1fkwb8VKxZsLm'   // Liloule
};

async function generateAudio(text, voiceId, filename) {
    console.log(`Generating: "${text}" with voice ${voiceId === VOICES.male ? 'French John' : 'Liloule'}...`);

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': API_KEY
        },
        body: JSON.stringify({
            text: text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75
            }
        })
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`API error: ${response.status} - ${error}`);
    }

    const audioBuffer = await response.arrayBuffer();
    fs.writeFileSync(filename, Buffer.from(audioBuffer));
    console.log(`Saved: ${filename}`);
}

async function testGeneration() {
    // Create audio directory if it doesn't exist
    const audioDir = path.join(__dirname, 'audio');
    if (!fs.existsSync(audioDir)) {
        fs.mkdirSync(audioDir);
    }

    // Test samples - one with each voice
    const testSamples = [
        { text: "Je suis content de te voir.", voice: 'male', file: 'test-male-1.mp3' },
        { text: "Je suis content de te voir.", voice: 'female', file: 'test-female-1.mp3' },
        { text: "Bonjour, comment allez-vous?", voice: 'male', file: 'test-male-2.mp3' },
        { text: "Bonjour, comment allez-vous?", voice: 'female', file: 'test-female-2.mp3' },
    ];

    for (const sample of testSamples) {
        const filepath = path.join(audioDir, sample.file);
        await generateAudio(sample.text, VOICES[sample.voice], filepath);
        // Small delay to avoid rate limiting
        await new Promise(r => setTimeout(r, 500));
    }

    console.log('\nTest generation complete! Check the /audio folder.');
}

testGeneration().catch(console.error);
