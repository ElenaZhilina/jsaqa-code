Feature: Ticket Booking

  Scenario: Successful ticket booking
    Given I navigate to the booking page
    When I select a movie session
    And I book a free seat
    Then I should see a confirmation message

  Scenario: Trying to book an already booked ticket
    Given I navigate to the booking page
    When I select a movie session
    And I book a free seat
    And I try to book the same seat again
    Then I should see nothing
