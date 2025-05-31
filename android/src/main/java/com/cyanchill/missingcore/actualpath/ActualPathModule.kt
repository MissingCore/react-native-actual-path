package com.cyanchill.missingcore.actualpath

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

import android.net.Uri


class ActualPathModule internal constructor(reactContext: ReactApplicationContext) :
  ActualPathSpec(reactContext) {
  private val context = reactContext

  @ReactMethod
  override fun getActualPath(uri: String, promise: Promise) {
    val actualUri = FileHelper.getRealPathFromURI(context, Uri.parse(uri))
    promise.resolve(actualUri)
  }

  companion object {
    const val NAME = "ActualPath"
  }

  override fun getName(): String = NAME
}
