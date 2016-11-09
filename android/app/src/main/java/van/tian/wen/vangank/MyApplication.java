package van.tian.wen.vangank;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.orhanobut.logger.Logger;

import java.util.Arrays;
import java.util.List;

import van.tian.wen.vangank.reactModules.VanLoggerReactPackage;

public class MyApplication extends Application implements ReactApplication {

    @Override
    public void onCreate() {
        super.onCreate();
        Logger
                .init("VanLogger")
                .methodCount(3)
                .methodOffset(2);
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        protected boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new VanLoggerReactPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}
