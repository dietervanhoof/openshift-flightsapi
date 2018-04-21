CREATE TABLE IF NOT EXISTS flights (
    flight_id                   serial PRIMARY KEY,
    origin                      text,
    destination                 text,
    scheduleddeparturedate      timestamp with time zone
);