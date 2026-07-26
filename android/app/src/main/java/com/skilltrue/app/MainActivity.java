package com.skilltrue.app;

import android.os.Bundle;
import androidx.core.splashscreen.SplashScreen;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Must be called before super.onCreate() per AndroidX SplashScreen docs.
        SplashScreen.installSplashScreen(this);
        super.onCreate(savedInstanceState);
    }
}
