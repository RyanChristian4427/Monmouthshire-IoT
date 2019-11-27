import speech_recognition as sr

recognizer = sr.Recognizer()

mic = sr.Microphone()
print('talk')

with mic as source:
    recognizer.adjust_for_ambient_noise(source)
    audio = recognizer.listen(source)

response = {
    'success': True,
    'error': None,
    'transcription': None
}

try:
    response['transcription'] = recognizer.recognize_google(audio)
except sr.RequestError:
    # API was unreachable or unresponsive
    response['success'] = False
    response['error'] = 'API unavailable'
except sr.UnknownValueError:
    # speech was unintelligible
    response['error'] = 'Unable to recognize speech'
print(response)
