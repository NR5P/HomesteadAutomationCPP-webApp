#ifndef JSON_H
#define HSON_H

#include <sstream>

class JSON {
    private:
        static std::stringstream jsonData;

    public:
        JSON(char *jsonString);
        static void buildObjects();
        static void buildCycleIrrigation();
        static void buildIrrigation();
};

#endif