Feature: LinkedList Functionality

@linkedlist  
    Scenario: Verify that user is able to navigate to "linkedlist" page
    Given user is on the Home page
    When user clicks Get Started button under linkedlist section
    Then user should be navigated to linkedlist page successfully
    
@linkedlist  
 Scenario: Verify that user is able to see the content of "Introduction" section
    Given user is on the linkedlist page
    When user clicks on "Introduction" section
    Then user should be able to see the content of "Introduction" section  


@linkedlist  
Scenario: Verify that user is able to navigate to "Try Here>>>" page from "Introduction" section
    Given The user is in the "Introduction" page
    When user clicks on "Try Here>>>" button in "Introduction" section
    Then user should be navigated to "Try Editor" page successfully from "Introduction" section

@linkedlist
Scenario: Verify that user is able to navigate to "Try Here>>>" page from "Creating Linked List" section
    Given The user is in the "Creating Linked List" page
    When user clicks on "Try Here>>>" button in "Creating Linked List" section
    Then user should be navigated to "Try Editor" page successfully from "Creating Linked List" section   

@linkedlist
Scenario: Verify that user is able to navigate to "Practice Questions" page

    When user clicks on "Practice Questions" section
    Then user should be able to see the content of "Practice Questions" section 

@linkedlist
Scenario: validate Creating Linked List Operations

    When user clicks on "Creating Linked List"
    Then user should be able to see the content of "Creating Linked List"

    
@linkedlist
Scenario: validate Types of Linked List Operations

    When user clicks on "Types of Linked List"
    Then user should be able to see the content of "Types of Linked List"

    @linkedlist
Scenario: validate Implement Linked List in Python Operations

    When user clicks on "Implement Linked List in Python"
    Then user should be able to see the content of "Implement Linked List in Python"


@linkedlist
Scenario: validate Traversal Operations

    When user clicks on "Traversal"
    Then user should be able to see the content of "Traversal"


@linkedlist
Scenario: validate Insertion Operations

    When user clicks on "Insertion"
    Then user should be able to see the content of "Insertion"

@linkedlist
Scenario: validate Deletion Operations

    When user clicks on "Deletion"
    Then user should be able to see the content of "Deletion"




