# really-wake-up-app

## Install packages (first installation / or package updates)
```bash
npm install
```

## Run the app (web)
```bash
ionic serve
```
## Run the app (android version) from Windows

Requirements:
- Android Studio
- Java
- Node (npm)

### Build app
```bash
npm run build
```

### Sync to capacitor files
```bash
npx cap sync
```

### Run android app
```bash
npx cap run android
```

### Run android IDE (studio)
```bash
npx cap open android
```

# Alarm Workflow using Capacitor

## Main components
1. **Storage**: Store user alarms
2. **Local Notifications**: Start alarm at the good moment
3. **Background Runner**: Manage continuous background alarm
4. **Puzzle UI**: UI to stop alarm

## Required permissions (android)

```java
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
<uses-permission android:name="android.permission.USE_FULL_SCREEN_INTENT" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
```

## Alarm Full Lifecycle

### A. Alarm Configuration
1. The user add an alarm from the application
2. The alarm is stored in the local storage
3. The system plan a local notification for the specified alarm time
4. If the app is closed, the Android system keep in mind the notification information

### B. Triggering the alarm

1. At the specified alarm time, even if the app is closed, Android trigger the notification

2. The system can:
    - Display a standard notification
    - Wake up the device if the notification use an advanced parameter
    - Start app in background from specific "intent"

### C. Keep alarm active

1. The sound is played by the notification
2. To continue to play the sound until the puzzle is solved:
    - Etheir the notification is configured as "persistent" with repetition
    - Or a background service is started via background runner

### D. User interaction

1. The user see the notification and listen the alarm
2. By pushing on the notification, the application start
3. The application detects that it has been opened from an alarm notification
4. The puzzle is immediatly displayed

### E. Solving and end of the lifecycle

1. The user solve the puzzle
2. The alarm is stopped (sound and notification)
3. If the alarm is recurrent, it is reprogrammed for the next occurence