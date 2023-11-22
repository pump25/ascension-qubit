int state2 = 0;
int state3 = 0;
int state4 = 0;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(6, INPUT);
  pinMode(5, INPUT);
  pinMode(4, INPUT);
}

void loop() {
  if(
    state2 != digitalRead(6) || 
    state3 != digitalRead(5) || 
    state4 != digitalRead(4)
  ){
    state2 = digitalRead(6);
    state3 = digitalRead(5);
    state4 = digitalRead(4);
    
    Serial.print(state2);
    Serial.print(",");
    Serial.print(state3);
    Serial.print(",");
    Serial.println(state4);
    delay(50);
  }
}
