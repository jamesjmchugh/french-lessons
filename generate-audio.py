#!/usr/bin/env python3
"""
Audio Generation Script for French Flashcards
Uses ElevenLabs API to generate MP3 pronunciations for all cards
"""

import os
import re
import time
import json
import urllib.request

# Load .env file if it exists
def load_env():
    env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    os.environ[key] = value

load_env()
API_KEY = os.environ.get('ELEVENLABS_API_KEY')
VOICES = {
    'male': 'GRKzEhPHr0FFNDlaqQei',   # French John
    'female': 'B7fiLqn1fkwb8VKxZsLm'   # Liloule
}

def generate_audio(text, voice_id, filename):
    """Generate audio for a single text with specified voice."""
    voice_name = 'French John' if voice_id == VOICES['male'] else 'Liloule'
    print(f'  [{voice_name}] "{text[:50]}{"..." if len(text) > 50 else ""}"')

    url = f'https://api.elevenlabs.io/v1/text-to-speech/{voice_id}'

    data = json.dumps({
        'text': text,
        'model_id': 'eleven_multilingual_v2',
        'language_code': 'fr',  # Explicitly tell ElevenLabs this is French
        'voice_settings': {
            'stability': 0.5,
            'similarity_boost': 0.75,
            'speed': 0.9  # Slightly slower for language learning
        }
    }).encode('utf-8')

    req = urllib.request.Request(url, data=data, method='POST')
    req.add_header('Accept', 'audio/mpeg')
    req.add_header('Content-Type', 'application/json')
    req.add_header('xi-api-key', API_KEY)

    try:
        with urllib.request.urlopen(req) as response:
            audio_data = response.read()
            with open(filename, 'wb') as f:
                f.write(audio_data)
    except urllib.error.HTTPError as e:
        print(f'    ERROR: {e.code} - {e.read().decode()}')
        raise

def parse_data_js(filepath):
    """Parse data.js to extract French text from each card."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract French text using regex
    # Pattern matches: french: "text with apostrophes" (double-quoted strings)
    # This correctly handles French apostrophes like j'ai, l'homme, etc.
    pattern = r'french:\s*"([^"]+)"'
    matches = re.findall(pattern, content)

    cards = [{'french': text, 'id': i} for i, text in enumerate(matches)]
    return cards

def generate_all_audio(start_from=0, limit=None):
    """Generate audio for all cards."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    data_file = os.path.join(script_dir, 'data.js')
    audio_dir = os.path.join(script_dir, 'audio')

    # Create audio directory if needed
    os.makedirs(audio_dir, exist_ok=True)

    # Parse cards
    print("Parsing data.js...")
    cards = parse_data_js(data_file)
    print(f"Found {len(cards)} cards\n")

    # Apply start/limit
    end_index = len(cards) if limit is None else min(start_from + limit, len(cards))
    cards_to_process = cards[start_from:end_index]

    generated = 0
    skipped = 0

    for i, card in enumerate(cards_to_process):
        idx = start_from + i
        french_text = card.get('french', '')
        if not french_text:
            continue

        print(f"Card {idx}/{len(cards)-1}: ", end='')

        for voice in ['male', 'female']:
            filename = os.path.join(audio_dir, f'{idx}-{voice}.mp3')

            # Skip if already exists
            if os.path.exists(filename):
                skipped += 1
                continue

            try:
                generate_audio(french_text, VOICES[voice], filename)
                generated += 1
                # Rate limiting - wait between API calls
                time.sleep(0.3)
            except Exception as e:
                print(f"    Failed: {e}")
                continue

        print()  # Newline after card

    print(f"\nComplete! Generated: {generated}, Skipped (existing): {skipped}")

def test_generation():
    """Test with just a few samples."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    audio_dir = os.path.join(script_dir, 'audio')
    os.makedirs(audio_dir, exist_ok=True)

    test_samples = [
        {'text': 'Je suis content de te voir.', 'id': 'test-1'},
        {'text': 'Bonjour, comment allez-vous?', 'id': 'test-2'},
    ]

    for sample in test_samples:
        print(f"Generating: {sample['text']}")
        for voice in ['male', 'female']:
            filename = os.path.join(audio_dir, f"{sample['id']}-{voice}.mp3")
            generate_audio(sample['text'], VOICES[voice], filename)
            time.sleep(0.3)
        print()

    print("Test complete!")

if __name__ == '__main__':
    import sys

    if not API_KEY:
        print('Error: ELEVENLABS_API_KEY environment variable not set')
        sys.exit(1)

    # Parse command line args
    if len(sys.argv) > 1:
        if sys.argv[1] == 'test':
            test_generation()
        elif sys.argv[1] == 'all':
            start = int(sys.argv[2]) if len(sys.argv) > 2 else 0
            limit = int(sys.argv[3]) if len(sys.argv) > 3 else None
            generate_all_audio(start_from=start, limit=limit)
        else:
            print("Usage: python generate-audio.py [test|all] [start] [limit]")
    else:
        print("Usage:")
        print("  python generate-audio.py test          - Generate test samples")
        print("  python generate-audio.py all           - Generate all cards")
        print("  python generate-audio.py all 0 10      - Generate cards 0-9")
        print("  python generate-audio.py all 100       - Generate from card 100 onwards")
