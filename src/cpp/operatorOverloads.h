#ifndef OPERATOROVERLOADS_H
#define OPERATOROVERLOADS_H

#include <map>


std::ostream &operator<<(std::ostream &out, const CycleIrrigation &cycleIrrigation) {
    out << "cycleIrrigation" << " ";

    out << cycleIrrigation.getId() << " "; 
    out << cycleIrrigation.getName() << " "; 
    out << cycleIrrigation.getNotes() << " "; 
    out << cycleIrrigation.getPin() << " "; 
    out << cycleIrrigation.getState() << " "; 
    out << cycleIrrigation.areTimersOn() << " "; 

    out << cycleIrrigation.getCycleOntime() << " "; 
    out << cycleIrrigation.getCycleOfftime() << " "; 
    out << cycleIrrigation.getNextTimeOn() << " "; 
    out << cycleIrrigation.getNextTimeOff() << " "; 
    out << cycleIrrigation.getBlackoutStartTime() << " "; 
    out << cycleIrrigation.getBlackoutStopTime() << " "; 

    return out;
}


/*
std::istream &operator>>(std::istream &in, CycleIrrigation cycleIrrigation) {

}
*/


std::ostream &operator<<(std::ostream &out, const Irrigation &irrigation) {
    out << "cycleIrrigation" << " ";

    out << irrigation.getId() << " "; 
    out << irrigation.getName() << " "; 
    out << irrigation.getNotes() << " "; 
    out << irrigation.getPin() << " "; 
    out << irrigation.getState() << " "; 
    out << irrigation.areTimersOn() << " "; 

    out << "irrigationTimes" << " "; 

    std::map<time_t, time_t> irrigationTimes = irrigation.getIrrigationTimes();
    for (std::map<time_t, time_t>::iterator it = irrigationTimes.begin(); it != irrigationTimes.end(); it++) {
        out << static_cast<long int>(it->first) << " ";
        out << static_cast<long int>(it->second) << " ";
    }

    out << "end" << " ";

    return out;
}


/*
std::istream &operator>>(std::istream &in, Irrigation irrigation) {

}
*/



#endif