package com.distrax.modules.overlay;

import android.content.Context;
import android.graphics.Color;
import android.graphics.PixelFormat;
import android.os.Build;
import android.view.Gravity;
import android.view.View;
import android.view.WindowManager;
import android.widget.TextView;
import android.widget.LinearLayout;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class OverlayModule extends ReactContextBaseJavaModule {

    private WindowManager windowManager;
    private View overlayView;
    private final ReactApplicationContext reactContext;

    public OverlayModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @Override
    public String getName() {
        return "OverlayModule";
    }

    @ReactMethod
    public void showOverlay() {
        if (overlayView != null) return;

        final WindowManager.LayoutParams params = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.MATCH_PARENT,
                WindowManager.LayoutParams.MATCH_PARENT,
                Build.VERSION.SDK_INT >= Build.VERSION_CODES.O ? WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY : WindowManager.LayoutParams.TYPE_PHONE,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE | WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL,
                PixelFormat.TRANSLUCENT
        );
        
        params.gravity = Gravity.CENTER;

        // UI Thread is required for View operations
        reactContext.runOnUiQueueThread(() -> {
            windowManager = (WindowManager) reactContext.getSystemService(Context.WINDOW_SERVICE);
            
            // Programmatic layout for simplicity, or inflate XML if added to resources
            LinearLayout layout = new LinearLayout(reactContext);
            layout.setBackgroundColor(Color.parseColor("#CC000000")); // Semi-transparent black
            layout.setGravity(Gravity.CENTER);
            
            TextView text = new TextView(reactContext);
            text.setText("Focus Mode Active");
            text.setTextColor(Color.WHITE);
            text.setTextSize(24);
            
            layout.addView(text);
            overlayView = layout;

            windowManager.addView(overlayView, params);
        });
    }

    @ReactMethod
    public void removeOverlay() {
        if (overlayView != null) {
            reactContext.runOnUiQueueThread(() -> {
                if (windowManager != null) {
                    windowManager.removeView(overlayView);
                    overlayView = null;
                }
            });
        }
    }
}