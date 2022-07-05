const TaskContract = artifacts.require("TasksContract");

module.exports = function (deployer) {
  deployer.deploy(TaskContract);
};
