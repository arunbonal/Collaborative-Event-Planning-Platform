# TOPIC : collaborative event planning platform

# ENTITIES
- User
- Guests
- Venue
- Event
- Package (how grand?)
- Vendor
- Staff
- Expenses
- Feedback
- Registration
- Ticket

# Attributes of each entity
- USER
    - user id
    - name
    - email
    - phone
    - password

- GUESTS
    - guest id (primary key)
    - name
    - event id (foreign key)

- VENUE
    - venue id
    - venue name
    - location
    - description

- EVENT
    - event id (primary key)
    - event type
    - event title
    - event description
    - event date with starting and ending time (composite attribute)
    - event location
    - user id (foreign key)
    - event status
    - registration amount (only for paid events)

- PACKAGE
    - package id
    - package name
    - description
    - venue
    - duration
    - price
    - itenary

- VENDOR
    - vendor id
    - vendor name
    - vendor phone
    - service type
    - rating

- STAFF
    - staff id (primary key)
    - staff name
    - staff phone
    - event id (foreign key)

- FINANCE
    - vendor cost
    - event income
    - profit

- FEEDBACK
    - feedback id
    - event id
    - user id
    - rating
    - comments
    - date of feedback

- REGISTRATION
    - registration id
    - guest id
    - guest name
    - guest phone
    - event id
    - registered Date
    - resgistration amount
    - payment status

- TICKET
    - ticket id
    - event id
    - guest id
    - ticket type (only for paid events)
    - price