const ProfessorReview = artifacts.require("ProfessorReview");

module.exports = function (deployer) {
    deployer.deploy(ProfessorReview);
};
