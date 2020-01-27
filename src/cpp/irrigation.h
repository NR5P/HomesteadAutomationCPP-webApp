#ifndef IRRIGATION_H
#define IRRIGATION_H

#include "device.h"
#include <ctime>
#include <string>
#include <map>
#include "gpio.h"
#include <iostream>

class Irrigation : public Device {
    private:
        static const time_t unixTimeStamp = 0;
        std::map<time_t,time_t> irrigationTimes;

    public:
        Irrigation(std::string id, int pin, std::string notes, std::map<int*, int*> mapIrrigationTimes)
            : Device(id, pin, notes) 
        {
            for (std::map<int*, int*>::iterator it = mapIrrigationTimes.begin(); it != mapIrrigationTimes.end(); ++it) {
                setIrrigationTime(it->first, it->second);
            }
        }

        friend std::istream &operator>>(std::istream &in, Irrigation &irrigation);
        friend std::ostream &operator<<(std::ostream &out, const Irrigation &irrigation);

        void run();
        void setIrrigationTime(int*, int*);

        //getters
        std::map<time_t, time_t> getIrrigationTimes() const {
            return irrigationTimes;
        }
};

inline std::ostream &operator<<(std::ostream &out, const Irrigation &irrigation) {
    out << "{";
    out << "\"cycleIrrigation\":{";

    out << "\"id\":\"" << irrigation.id << "\""; 
    out << "\"name\":\"" << irrigation.name << "\""; 
    out << "\"notes\":\"" << irrigation.notes << "\""; 
    out << "\"pin\":\"" << irrigation.pin << "\""; 
    out << "\"state\":\"" << irrigation.state << "\""; 
    out << "\"areTimersOn\":\"" << irrigation.areTimersOn << "\""; 

    out << "\"irrigationTimes\":[" << "\""; 

    std::map<time_t, time_t> irrigationTimes = irrigation.getIrrigationTimes();
    for (std::map<time_t, time_t>::iterator it = irrigationTimes.begin(); it != irrigationTimes.end(); it++) {
        out << static_cast<long int>(it->first) << " ";
        out << static_cast<long int>(it->second) << " ";
    }
    out << "]";

    out << "}}";

    return out;
}


inline std::istream &operator>>(std::istream &in, Irrigation &irrigation) {
    in >> irrigation.id;
    in >> irrigation.name;
    in >> irrigation.notes;
    in >> irrigation.pin;
    // TODO: this needs to keep checking for irrigation times somewhere.
}


#endif
