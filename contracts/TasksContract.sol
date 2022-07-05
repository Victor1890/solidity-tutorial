// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TasksContract {

    // variable public definition
    uint public taskCounter = 0;

    // constructor
    constructor() {
        createTask("Make the new tasks", "This is a new task");
    }

    // is like a class
    struct Task {
        uint id;
        string title;
        string desc;
        bool done;
        uint createdAt;
    }

    // event; it is like websocket event
    event TaskToggle(uint id, bool done);

    event TaskCreated (
        uint id,
        string title,
        string desc,
        bool done,
        uint createdAt
    );

    mapping(uint256 => Task) public tasks;

    function createTask(string memory _title, string memory _desc) public {
        taskCounter++;
        
        tasks[taskCounter] = Task(taskCounter, _title, _desc, false, block.timestamp);

        emit TaskCreated(taskCounter, _title, _desc, false, block.timestamp);
    }

    function toggleDone(uint _id) public {
        Task memory _task = tasks[_id];
        _task.done = !_task.done;
        tasks[_id] = _task;

        emit TaskToggle(_id, _task.done);
    }

}