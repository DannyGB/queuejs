Execution Queue

Goals:

Provide an asynchronuous JavaScript module that consists of an execution queue that can make various intelligent decisions about whether to execute an item in the queue.
It will make use of JavaScript (Ecmascript6) promises to enable asynchronous operation

Scope:

1. Allow consumers to add work to an execution queue
2. Allow consumers to register a work item type that describes rules about a queued item of the same type. These rules will be outlined later
3. Allow consumers to un-register a work item type
4. Allow consumers to queue both work items of a previously registered type and also anonymous work items.

Further work:

1. De-qeueuing of waiting work
2. Prioritise work items
3. Allow changing of the processer execution interval
4. Repeatable execution

Requirements:

1. Execute the queued items in the order they were queued

2. Limit execution of a typed work item to a timespan from when the work was queued

	i.e: Only execute the work item if the processor begins execution within x seconds of the work item being queued 
	
3. Limit execution of a typed work item to maximum number of executions per timespan

	i.e. Only execute the work item if a work item of the same type has not been executed for x number of seconds

4. Anonymous work items will be executed with no queue logic being performed
