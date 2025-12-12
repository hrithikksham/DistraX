package com.distrax.modules.timer;

import android.content.Intent;
import androidx.core.content.ContextCompat;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class TimerModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public TimerModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @Override
    public String getName() {
        return "TimerModule";
    }

    @ReactMethod
    public void startTimer(int seconds) {
        Intent intent = new Intent(reactContext, FocusTimerService.class);
        intent.putExtra("duration", seconds);
        ContextCompat.startForegroundService(reactContext, intent);
    }

    @ReactMethod
    public void stopTimer() {
        Intent intent = new Intent(reactContext, FocusTimerService.class);
        reactContext.stopService(intent);
    }
}
