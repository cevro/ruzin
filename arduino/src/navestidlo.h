#include "Arduino.h"

class Navestidlo {
  private:
    int scomPin;
    uint8_t mask;
    int data = 5;
    int lockTime;
    uint8_t status = 1;

  public:

    void setNavest(int id) {
      this->data = id ;
      this->mask = 0x00000001;
    }

  public:
    void clock() {
      if (this->lockTime < 300) {
        this->lockTime += 10;
        return;
      }

      switch (this->status) {
        case 1:
          digitalWrite(this->scomPin, LOW);
          this->status = 2;
          break;
        case 2:
          digitalWrite(this->scomPin, HIGH);
          this->status = 3;
          this->mask = 0x00000001;
          break;
        case 3:
          digitalWrite(this->scomPin, (this->data & this->mask) ? HIGH : LOW);
          this->mask <<= 1;
          if (!this->mask) {
            this->status = 4;
          }
          break;
        case 4:
          digitalWrite(this->scomPin, HIGH);
          this->lockTime = 0;

          this->status = 1;
          break;
      }
    }

  public:

    int getNavest() {
      //Serial.println(this->data);
      return this->data;
    }

  public:

    void setPin(int pin) {
      this->scomPin = pin;
      pinMode(pin, OUTPUT);
      digitalWrite(this->scomPin, HIGH);
    }
} ;
