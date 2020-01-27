#include "json.h"
#include "device.h"
#include "cycleirrigation.h"
#include "irrigation.h"
#include <vector>


JSON::JSON(char *jsonString) {
    for (char *p = jsonString; *p; p++) {
        if (*p == '{' || *p == '}' || *p == '"')
            continue;
        else if (*p == ':' || *p == ',')
            jsonData << " ";
        else
            jsonData << *p;
    }
}

void JSON::buildObjects() {
    std::string deviceType;
    std::string tempData;
    std::vector<std::string> deviceData;
    while (jsonData >> deviceType) {
        if (deviceType == "cycleIrrigation") {
            JSON::buildCycleIrrigation();
        }
        else if (deviceType == "irrigation") {
            JSON::buildIrrigation();
        }
    }
}

void JSON::buildCycleIrrigation() {
    std::string id;
    int pin;
    std::string notes;
    int arrCycleOnTime[3];
    int arrCycleOffTime[3];
    int arrBlackoutStartTime[3];
    int arrBlackoutStopTime[3];

    jsonData >> id >> pin >> notes 
             >> arrCycleOnTime[0] >> arrCycleOnTime[1] >> arrCycleOnTime[2]
             >> arrCycleOffTime[0] >> arrCycleOffTime[1] >> arrCycleOffTime[3]
             >> arrBlackoutStartTime[0] >> arrBlackoutStartTime[1] >> arrBlackoutStartTime[2]
             >> arrBlackoutStopTime[0] >> arrBlackoutStopTime[1] >> arrBlackoutStopTime[2];

    std::vector<Device *>::iterator it;
    for (it = Device::deviceList.begin(); it != Device::deviceList.end(); it++) {
        if ((*it)->getId() == id) {
            (*it)->editCycleIrrigation(new CycleIrrigation(id, pin, notes, arrCycleOnTime, arrCycleOffTime,
                                                        arrBlackoutStartTime, arrBlackoutStopTime));
            return; 
        }
    }
    Device::deviceList.push_back(new CycleIrrigation(id, pin, notes, arrCycleOnTime, arrCycleOffTime,
                                                    arrBlackoutStartTime, arrBlackoutStopTime));
}

void JSON::buildIrrigation() {
    bool foundMatch;
    for (int i = 0; i < 7; i++) {
        jsonData >> tempData;
        deviceData.push_back(tempData);
    }
    std::vector<Device *>::iterator it;
    for (it = Device::deviceList.begin(); it != Device::deviceList.end(); it++) {
        if ((*it)->getId() == deviceData[0])
            foundMatch = true;
    }
    if (!foundMatch) {
        Device::deviceList.push_back(new CycleIrrigation(deviceData[0],
            std::stoi(deviceData[1]), deviceData[2], std::stoi(deviceData[3]), 
            std::stoi(deviceData[4]), std::stoi(deviceData[5]), 
            std::stoi(deviceData[6])));
    }

}
