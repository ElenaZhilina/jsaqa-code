Feature: Ticket Booking

  Scenario: Successful ticket booking
    Given I navigate to the ticket booking page
    When I book a standard seat
    Then I should see a confirmation message

  Scenario: Booking another ticket
    Given I navigate to the ticket booking page
    When I book a standard seat
    Then I should see a confirmation message

  Scenario: Trying to book an already booked ticket
    Given I navigate to the ticket booking page
    When I try to book a seat that is already taken
    Then I should not see a confirmation message
