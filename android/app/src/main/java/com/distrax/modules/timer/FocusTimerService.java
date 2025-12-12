package com.distrax.modules.timer;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import androidx.core.app.NotificationCompat;
import com.facebook.react.ReactApplication;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.distrax.R; 

public class FocusTimerService extends Service {

    private Handler handler = new Handler();
    private int remainingSeconds;
    private static final String CHANNEL_ID = "FocusTimerChannel";

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent != null) {
            remainingSeconds = intent.getIntExtra("duration", 3600);
        }
        createNotificationChannel();
        
        startForeground(1, buildNotification("Focus Session Active"));

        handler.post(timerRunnable);
        return START_STICKY;
    }

    private Runnable timerRunnable = new Runnable() {
        @Override
        public void run() {
            try {
                ReactContext reactContext = ((ReactApplication) getApplication()).getReactNativeHost().getReactInstanceManager().getCurrentReactContext();
                
                if (reactContext != null) {
                    WritableMap map = Arguments.createMap();
                    map.putInt("remaining", remainingSeconds);
                    
                    reactContext
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("timerUpdate", map);
                }
            } catch (Exception e) {
                // React Context might not be ready yet
            }

            if (remainingSeconds > 0) {
                remainingSeconds--;
                handler.postDelayed(this, 1000);
            } else {
                stopSelf();
            }
        }
    };

    private Notification buildNotification(String text) {
        return new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("DistraX Focus")
                .setContentText(text)
                .setSmallIcon(R.mipmap.ic_launcher) 
                .setPriority(NotificationCompat.PRIORITY_LOW)
                .build();
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID,
                    "Focus Timer Service",
                    NotificationManager.IMPORTANCE_LOW
            );
            NotificationManager manager = getSystemService(NotificationManager.class);
            if (manager != null) manager.createNotificationChannel(channel);
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
