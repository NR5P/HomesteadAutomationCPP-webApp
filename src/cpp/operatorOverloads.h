#ifndef OPERATOROVERLOADS_H
#define OPERATOROVERLOADS_H



std::ostream &operator<<(std::ostream &out, const CycleIrrigation &cycleIrrigation) {
    out << "{";
    out << "cycleIrrigation: {";

    out << "\"" << "id" << "\":\"" << cycleIrrigation.getId() << "\""; 
    out << "\"" << "name" << "\":\"" << cycleIrrigation.getName() << "\""; 
    out << "\"" << "notes" << "\":\"" << cycleIrrigation.getNotes() << "\""; 


    out << "}";
    out << "}";
    return out;
}

std::istream &operator>>(std::istream &in, CycleIrrigation cycleIrrigation) {

}

std::ostream &operator<<(std::ostream &out, const Irrigation &irrigation) {
    out << "test";
    out << "one";
    out << "two";
    return out;
}

std::istream &operator>>(std::istream &in, Irrigation irrigation) {

}



#endif