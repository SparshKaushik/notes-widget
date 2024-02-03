package com.sparshkaushik.noteswidget;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableNativeArray;

import android.app.Activity;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;

public class SharedStorage extends ReactContextBaseJavaModule {
    ReactApplicationContext context;

    public SharedStorage(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    @Override
    public String getName() {
        return "SharedStorage";
    }

    @ReactMethod
    public void getAllAppWidgetIds(Callback callBack) {
        AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
        ComponentName componentName = new ComponentName(context, NotesWidget.class);
        int[] appWidgetIds = appWidgetManager.getAppWidgetIds(componentName);
        WritableNativeArray appWidgetIdsArray = new WritableNativeArray();
        for (int appWidgetId : appWidgetIds) {
            appWidgetIdsArray.pushInt(appWidgetId);
        }
        callBack.invoke(appWidgetIdsArray);
    }

    @ReactMethod
    public void set(String message, int id) {
        SharedPreferences.Editor editor = context.getSharedPreferences("DATA", Context.MODE_PRIVATE).edit();
        editor.putString("appData", message);
        editor.apply();

        Intent intent = new Intent(getCurrentActivity().getApplicationContext(), NotesWidget.class);
        intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, new int[] {id});
        getCurrentActivity().getApplicationContext().sendBroadcast(intent);

    }
}
