import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Button
} from 'react-native';
import {useState} from 'react';
import { Audio } from 'expo-av';

export default function AssetExample() {

  const [recording, setRecording] = useState();
  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    setRecording([recording, ...uri])
  }

  const playAudio = async (newAudioUrl) => {
 if (active === newAudioUrl) {
 try {
 if (isPlaying) {
 await SoundPlayer.pause(); // Pause the audio if already playing
 setIsPlaying(false);
 } else {
 await SoundPlayer.resume(); // Resume playing the audio if paused
 setIsPlaying(true);
 }
 } catch (error) {
 console.log('Oh no! An error occurred while pausing/resuming audio:', error);
 }
 } else {
 try {
 if (isPlaying) {
 await SoundPlayer.stop(); // Stop the currently playing audio
 }
 dispatch(setPlaying(newAudioUrl)); // Set the new audio URL
 setIsPlaying(true);
 const soundData = await SoundPlayer.getInfo();
 setTotalDuration(soundData?.duration);
 SoundPlayer.addEventListener('FinishedPlaying', () => {
 setIsPlaying(false); // Reset the playing state when audio finishes playing
 dispatch(clearPlaying(newAudioUrl));
 });
await SoundPlayer.playUrl(newAudioUrl); // Play the new audio
 const audio = await SoundPlayer.getInfo();
 setTotalDuration(audio?.duration);
 } catch (error) {
 console.log('Oops! An error occurred while playing audio:', error);
 }
 }
};

function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }
  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
        <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
        <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
          <Button style={styles.button} onPress={() => Sharing.shareAsync(recordingLine.file)} title="Share"></Button>
        </View>
      );
    });
  }

  const [ispause, setIspause] = useState(false);

  const handlepause = () => {
    if (ispause===true) {
      setIspause(false)
    } else {
      setIspause(true)
    }
  }

  
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>SOUND RECORDER</Text>
        <ImageBackground
          source={require('../assets/192692535528407.jpg')}
          style={styles.image}
        />

        <Text style={styles.numbers}>00:00:00</Text>

       <Image source={require('../assets/voice.png')} style={styles.voice} />
          
      {
        ispause ?
          <>
              <TouchableOpacity onPress={startRecording}>
                <Image source={require('../assets/record.png')} style={styles.mic} />
              </TouchableOpacity>

          </>
          :
          <>
          <TouchableOpacity onPress={handlepause}>
            <Image source={require('../assets/pause-button.png')} style={styles.mic} />
          </TouchableOpacity>
            
          </>
      }
        

        <TouchableOpacity  onPress={stopRecording}>
          <Image
            source={require('../assets/stop-button.png')}
            style={styles.stop}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: 500,
    color: 'white',
    marginLeft: 45,
    marginTop: -9,
    marginBottom: 8,
  },

  image: {
    height: 150,
    width: 330,
  },

  numbers: {
    color: '#ffff',
    fontSize: 48,
    fontWeight: 500,
    marginLeft: 80,
    marginTop: 90,
  },

  mic: {
    color: '#ffff',
    height: 80,
    width: 80,
    marginLeft: 130,
    marginTop: 150,
  },

  stop: {
    height: 50,
    width: 50,
    marginLeft: 220,
    marginTop: -67,
  },

  voice: {
    height: 130,
    width: 130,
    marginLeft: 100,
    marginTop: 60,
    marginBottom: -50,
  },
});
