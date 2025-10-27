libjava_warp.so:

app_ywallet_App.o: app_ywallet_App.cpp
	g++ -c -fPIC -I${JAVA_HOME}/include -I${JAVA_HOME}/include/linux app_ywallet_App.cpp

libjava_warp.so: app_ywallet_App.o
	g++ -shared -fPIC -o libjava_warp.so app_ywallet_App.o  -L/usr/lib -lwarp_api_ffi
