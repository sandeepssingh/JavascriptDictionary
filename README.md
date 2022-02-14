# Javascript Dictionary
Javascript Dictionary with set, get, delete, undo and redo feature.
Special about this dictionary is that it will support undo and redo of its history.

The function takes an object and returns an object that has the following functions defined on it.

Methods
set(key, value) Assigns the value to the key. If the key does not exist, creates it.

get(key) Returns the value associated to the key.

del(key) removes the key from the object.

undo() Undo the last operation (set or del) on the object. Throws an exception if there is no operation to undo.

redo() Redo the last undo operation (redo is only possible after an undo). Throws an exception if there is no operation to redo.

After set() or del() are called, there is nothing to redo.

All actions must affect to the object passed to undoRedo(object) function. So you can not work with a copy of the object.

Any set/del after an undo should disallow new undos.
