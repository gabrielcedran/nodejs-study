import { jest } from '@jest/globals';

// es modules is relatevly new in node, thus it's necessary to mock things with jest in this way
// it's basically mocking this exports before they being imported
jest.unstable_mockModule('../src/db.js', () => ({
    getDB: jest.fn(),
    saveDB: jest.fn(),
    insert: jest.fn(),
}));

// these are dynamic imports (or async imports).
// the reason for the usage here is because we need to mock the db behaviour first.
// with commonjs it's way simpler.
const { insert, getDB, saveDB }  = await import('../src/db.js');
const { newNote, getAllNotes, removeNote } = await import('../src/noteRepository.js');

beforeEach(() => {
    insert.mockClear();
    getDB.mockClear();
    saveDB.mockClear();
});


test('newNote insert data and returns it', async () => {
    const note = "walk don and bob";
    const tags = ["don", "bob"];
    const data = {
        tags, 
        content: note,
        id: Date.now(), 
    }

    // this is how the mock should behave
    insert.mockResolvedValue(data);

    const result = await newNote(note, tags);
    expect(result).toEqual(data);
})