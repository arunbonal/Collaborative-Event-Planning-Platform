# TOPIC : tourism management system

# ENTITIES
- User
- Tour Package
- Destination
- Booking
- Accomodation
- Attractions
- Transport
- Review
- Payment
- Travel Guide/Agent

# Attributes of each entity
- USER
    - user id
    - name
    - email
    - phone
    - address
    - user type (tourist, travel agent)
    - password

- TOUR PACKAGE
    - package id
    - package name
    - description
    - destination
    - duration
    - price
    - itenary
    - category (family, adventure, couple)

- DESTINATION
    - destination id
    - destination name
    - location
    - description
    - best time to visit

- BOOKING
    - booking id
    - user id
    - package id
    - booking date
    - travel date
    - number of people
    - total price
    - status (confirmed, pending, canceled)

- ACCOMODATION
    - accomodation id
    - accomodation name
    - type (hotel, resort, hostel)
    - location
    - price per night
    - rating

- ATTRACTION
    - attraction id
    - attraction name
    - description
    - attraction type (natural, cultural, historical)
    - location
    - entry fee

- TRANSPORT
    - transport id
    - transport type (flight, bus, train, car rental)
    - provider
    - price (/hr or /km)

- REVIEW
    - review id
    - user id
    - package id
    - rating
    - comments
    - review date

- PAYMENT
    - payment id
    - booking id
    - user id
    - payment date
    - amount
    - payment method (card, upi...)
    - status (successful, pending, failed)

- TRAVEL AGENT/GUIDE
    - agent id
    - agent name
    - agent phone
    - agency name
    - commission rate

# RELATIONSHIPS OF ENTITIES

