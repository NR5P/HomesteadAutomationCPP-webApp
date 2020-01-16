#ifndef OPERATOROVERLOADS_H
#define OPERATOROVERLOADS_H

#include <map>


std::ostream &operator<<(std::ostream &out, const CycleIrrigation &cycleIrrigation) {
    out << "{";
    out << "\"" << "cycleIrrigation" << "\":" << "{";

    out << "\"" << "id" << "\":\"" << cycleIrrigation.getId() << "\","; 
    out << "\"" << "name" << "\":\"" << cycleIrrigation.getName() << "\","; 
    out << "\"" << "notes" << "\":\"" << cycleIrrigation.getNotes() << "\","; 
    out << "\"" << "pin" << "\":" << cycleIrrigation.getPin() << ","; 
    out << "\"" << "state" << "\":" << cycleIrrigation.getState() << ","; 
    out << "\"" << "timersOn" << "\":\"" << cycleIrrigation.areTimersOn() << "\","; 

    out << "\"" << "cycleOnTime" << "\":\"" << cycleIrrigation.getCycleOntime() << "\","; 
    out << "\"" << "cycleOffTime" << "\":\"" << cycleIrrigation.getCycleOfftime() << "\","; 
    out << "\"" << "getNextTimeOn" << "\":\"" << cycleIrrigation.getNextTimeOn() << "\","; 
    out << "\"" << "getNextTimeOff" << "\":\"" << cycleIrrigation.getNextTimeOff() << "\","; 
    out << "\"" << "blackoutStartTime" << "\":\"" << cycleIrrigation.getBlackoutStartTime() << "\","; 
    out << "\"" << "blackoutStopTime" << "\":\"" << cycleIrrigation.getBlackoutStopTime() << "\","; 

    out << "}";
    out << "}";
    return out;
}


/*
std::istream &operator>>(std::istream &in, CycleIrrigation cycleIrrigation) {

}
*/


std::ostream &operator<<(std::ostream &out, const Irrigation &irrigation) {
    out << "{";
    out << "\"" << "cycleIrrigation" << "\":" << "{";

    out << "\"" << "id" << "\":\"" << irrigation.getId() << "\","; 
    out << "\"" << "name" << "\":\"" << irrigation.getName() << "\","; 
    out << "\"" << "notes" << "\":\"" << irrigation.getNotes() << "\","; 
    out << "\"" << "pin" << "\":" << irrigation.getPin() << ","; 
    out << "\"" << "state" << "\":" << irrigation.getState() << ","; 
    out << "\"" << "timersOn" << "\":\"" << irrigation.areTimersOn() << "\","; 

    out << "\"" << "irrigationTimes" << "\":["; 

    std::map<time_t, time_t> irrigationTimes = irrigation.getIrrigationTimes();
    for (std::map<time_t, time_t>::iterator it = irrigationTimes.begin(); it != irrigationTimes.end(); it++) {
        out << "{";
        out << "\"" << "timeStart" << "\":" << static_cast<long int>(it->first) << ",";
        out << "\"" << "duration" << "\":" << static_cast<long int>(it->second) << ",";
        out << "},";
    }

    out << "],";

    out << "}";
    out << "}";

    return out;
}


/*
std::istream &operator>>(std::istream &in, Irrigation irrigation) {

}
*/



#endif