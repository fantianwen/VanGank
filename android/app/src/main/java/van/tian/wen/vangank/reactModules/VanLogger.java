package van.tian.wen.vangank.reactModules;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.orhanobut.logger.Logger;

/**
 * 在js中组织adb输出
 */
public class VanLogger extends ReactContextBaseJavaModule {

    private static final String RN_LOGGER_NAME = "VanLogger";

    public VanLogger(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return RN_LOGGER_NAME;
    }

    @ReactMethod
    public void w(String message) {
        Logger.w(message);
    }

    @ReactMethod
    public void e(String message) {
        Logger.e(message);
    }

    @ReactMethod
    public void d(String message) {
        Logger.d(message);
    }

    @ReactMethod
    public void i(String message) {
        Logger.i(message);
    }

}
