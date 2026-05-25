#include <jni.h>
#include "app_ywallet_App.h"

extern "C" {
    #include "../../../../../binding.h"
}

JNIEXPORT jint JNICALL Java_app_ywallet_App_newAccount
  (JNIEnv *, jobject) {
    init_wallet((char *)".");
    CResult_u32 result = new_account(0, (char *)"test", (char*)"", 0);
    return result.value;
}

