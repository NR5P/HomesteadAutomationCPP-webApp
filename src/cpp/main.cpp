#include "cycleirrigation.h"
#include "irrigation.h"
#include "device.h"

#include <sys/socket.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <unistd.h>
#include <thread>

#include <iostream>

#define PORT 9005


static std::vector<Device *> deviceList;

void runDevices() {
    while(Device::areTimersOn() == true) {
        for (auto device : deviceList) {
            device->run();
        }
    }
}

int main(int arc, char *argv[]) {

    std::thread thread_object(runDevices);

    char server_message[256] = "";
    int network_socket, new_socket, valread; 
    struct sockaddr_in address; 
    int opt = 1; 
    int addrlen = sizeof(address); 
    char buffer[1024] = {0}; 

    // Creating socket file descriptor 
    if ((network_socket = socket(AF_INET, SOCK_STREAM, 0)) == 0) 
    { 
        perror("socket failed"); 
        exit(EXIT_FAILURE); 
    } 

    // define the server address
    address.sin_family = AF_INET; 
    address.sin_addr.s_addr = INADDR_ANY; 
    address.sin_port = htons( PORT ); 

    //bind the socket to ip and port
    if (bind(network_socket, (struct sockaddr*)&address, sizeof(address)) < 0) {
        perror("bind failed"); 
        exit(EXIT_FAILURE); 
    }

    if (listen(network_socket, 10) < 0) 
    { 
        perror("listen"); 
        exit(EXIT_FAILURE); 
    } 

    if (new_socket = accept(network_socket, NULL, NULL))
    { 
        perror("accept"); 
        exit(EXIT_FAILURE); 
    } 


    close(network_socket);
    return 0;
}
