const TaskContract = artifacts.require('TasksContract');

contract('TasksContract', () => {

    before(async () => {
        this.taskContract = await TaskContract.deployed();
    });

    it("Migrate deployed successfully", () => {
        const address = this.taskContract.address;

        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, '');
        assert.notEqual(address, '0x0');
    });

    it("Get task list", async () => {
        const counter = await this.taskContract.taskCounter();
        const task = await this.taskContract.tasks(counter);

        assert.equal(task.id.toNumber(), counter);
        assert.equal(task.title, "Make the new tasks");
        assert.equal(task.desc, "This is a new task");
        assert.equal(task.done, false);
        assert.equal(counter, 1);
    });

    it("Task created successfully", async () => {
        const result = await this.taskContract.createTask("a", "B");
        const taskEvent = result.logs[0].args;
        const counter = await this.taskContract.taskCounter();


        assert.equal(counter, 2);
        assert.equal(taskEvent.id.toNumber(), 2);
        assert.equal(taskEvent.title, "a");
        assert.equal(taskEvent.desc, "B");
        assert.equal(taskEvent.done, false);
    });

    it("Task toggle done", async () => {
        const result = await this.taskContract.toggleDone(1);
        const taskEvent = result.logs[0].args;

        assert.equal(taskEvent.id.toNumber(), 1);
        assert.equal(taskEvent.done, true);

    });

});