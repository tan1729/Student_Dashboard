// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProfessorReview {
    struct Review {
        uint256 id; // Added id for unique identification
        string studentName;
        string courseName;
        uint8 rating1;
        uint8 rating2;
        string feedback;
    }

    Review[] public reviews;

    // Event to be emitted when a new review is added
    event ReviewAdded(
        uint256 indexed id, // Emit id with event
        string studentName,
        string courseName,
        uint8 rating1,
        uint8 rating2,
        string feedback
    );

    function addReview(
        string memory _studentName,
        string memory _courseName,
        uint8 _rating1,
        uint8 _rating2,
        string memory _feedback
    ) public {
        uint256 reviewId = reviews.length; // Use the current length as the ID
        reviews.push(Review(reviewId, _studentName, _courseName, _rating1, _rating2, _feedback));

        // Emit the ReviewAdded event
        emit ReviewAdded(reviewId, _studentName, _courseName, _rating1, _rating2, _feedback);
    }

    function getReview(uint256 index) public view returns (string memory, string memory, uint8, uint8, string memory) {
        Review storage review = reviews[index];
        return (review.studentName, review.courseName, review.rating1, review.rating2, review.feedback);
    }
}
