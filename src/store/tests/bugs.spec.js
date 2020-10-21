import { addBug, getUnresolvedBugs, resolvedBug, loadBugs } from "../bugs";
import configureStore from "../configureStore";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

// SOLITARY TEST
// describe("bugSlice", () =>{
//     describe("action creators", () =>{
//         it("addBug", () =>{
//             const bug = {description:"a"};
//             const result = addBug(bug);
//             const expected = {
//                 type:apiCallBegan.type,
//                 payload:{
//                     url:"/bugs",
//                     method:"post",
//                     data:bug,
//                     onSucess:bugAdded.type
//                 }
//             }
//             expect(result).toEqual(expected);
//         })
//     })
// })

describe("bugSlice", () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const bugsSlice = () => store.getState().entities.bugs;
  const createState = () => ({
    entities: {
      bugs: {
        list: [],
      },
    },
  });

  it("should add the bug to the store if it's saved to the server", async () => {
    //Arrange
    const bug = { description: "a" };
    const savedBug = { ...bug, id: 1 };
    fakeAxios.onPost("/bugs").reply(200, savedBug);
    //Act
    await store.dispatch(addBug(bug));
    //Assert
    expect(bugsSlice().list).toContainEqual(savedBug);
  });

  it("should not add bug to the store if it's not saved to the server", async () => {
    //Arrange
    const bug = { description: "a" };
    fakeAxios.onPost("/bugs").reply(500);
    //Act
    await store.dispatch(addBug(bug));
    //Assert
    expect(bugsSlice().list).toHaveLength(0);
  });

  it("should mark the bug as resolved if saved on server", async () => {
    //Arrange
    fakeAxios.onPatch("/bugs/1").reply(200, { id: 1, resolved: true });
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });
    //Act
    await store.dispatch(addBug({}));
    await store.dispatch(resolvedBug(1));
    //Assert
    expect(bugsSlice().list[0].resolved).toBe(true);
  });

  it("should not mark the bug as resolved if not saved on server", async () => {
    //Arrange
    fakeAxios.onPatch("/bugs/1").reply(500, { id: 1, resolved: true });
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });
    //Act
    await store.dispatch(addBug({}));
    await store.dispatch(resolvedBug(1));
    //Assert
    expect(bugsSlice().list[0].resolved).not.toBe(true);
  });

  describe("selectors", () => {
    it("getUnresolvedBugs", () => {
      //Arrange - Part of initialization
      const state = createState();
      state.entities.bugs.list = [
        { id: 1, resolved: true },
        { id: 2 },
        { id: 3 },
      ];
      //Act
      const result = getUnresolvedBugs(state);
      //Assert
      expect(result).toHaveLength(2);
    });
  });

  describe("loadingBugs", () => {
    describe("if the bugs exist in the cache", () => {
      it("they should not be fetched from the server agin", async () => {
        //Arrange
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);
        //Act
        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs());
        //Assert
        expect(fakeAxios.history.get.length).toBe(1);
      });
    });

    describe("if the bugs dont exist in the cache", () => {
      it("they should be fetched from the server and put in the store", async () => {
        //Assert
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);
        //Act
        await store.dispatch(loadBugs());
        //Assert
        expect(bugsSlice().list).toHaveLength(1);
      });

      describe("loading indicator", () => {
        it("should be true while fetching the bugs", () => {
          //Arrange
          fakeAxios.onGet("/bugs").reply(() => {
            expect(bugsSlice().loading).toBe(true);
            return [(200, [{ id: 1 }])];
          });
          //Act
          store.dispatch(loadBugs());
        });

        it("should be false after bugs are fetched", async () => {
          //Arrange
          fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);
          //Act
          await store.dispatch(loadBugs());
          // Assert
          expect(bugsSlice().loading).toBe(false);
        });

        it("should be false if the server returns error", async () => {
          //Arrange
          fakeAxios.onGet("/bugs").reply(200); //should be 500
          //Act
          await store.dispatch(loadBugs());
          // Assert
          expect(bugsSlice().loading).toBe(false);
        });
      });
    });
  });
});
