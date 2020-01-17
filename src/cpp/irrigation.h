#ifndef IRRIGATION_H
#define IRRIGATION_H

#include "device.h"
#include <ctime>
#include <string>
#include <map>
#include "gpio.h"

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

        friend std::istream &operator>>(std::istream &in, Irrigation irrigation);

        void run();
        void setIrrigationTime(int*, int*);

        //getters
        std::map<time_t, time_t> getIrrigationTimes() const {
            return irrigationTimes;
        }
};

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


std::istream &operator>>(std::istream &in, Irrigation irrigation) {
    in >> irrigation.id;
    in >> irrigation.name;
    in >> irrigation.notes;
    in >> irrigation.pin;
    // TODO: this needs to keep checking for irrigation times somewhere.
}


#endif
