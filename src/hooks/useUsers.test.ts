import { act, renderHook } from "@testing-library/react";

import { TIME_DELAY, useUsers } from "./useUsers";
import { User } from "../types/User";

describe("useUsers", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("returns no data initially", () => {
    const { result } = renderHook(() => useUsers());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("returns data after it loads", () => {
    const { result } = renderHook(() => useUsers());
    act(() => {
      jest.advanceTimersByTime(TIME_DELAY + 1);
    });
    expect(result.current.data).toBeDefined();
    expect(result.current.data).toHaveLength(3);
  });

  it("updates only the relevant user called by updateUser", () => {
    const idUserToEdit = 1001;
    const { result } = renderHook(() => useUsers());
    act(() => {
      jest.advanceTimersByTime(TIME_DELAY + 1);
    });
    const usersBeforeUpdateOnlyUser = result.current.data;
    const beforeUsersMap = new Map(
      usersBeforeUpdateOnlyUser?.map((user) => [user.idUser, user])
    );
    const currentUser = beforeUsersMap.get(idUserToEdit);
    expect(currentUser).toBeTruthy();

    const newUserData: User = {
      idUser: idUserToEdit,
      profile: {
        firstName: currentUser?.profile.firstName ?? "",
        lastName: currentUser?.profile.lastName ?? ""
      },
      role: "Support Technician"
    };

    act(() => {
      result.current.updateUser(idUserToEdit, newUserData);
    });
    act(() => {
      jest.advanceTimersByTime(TIME_DELAY + 1);
    });
    const usersAfterUpdateOnlyUser = result.current.data;
    usersAfterUpdateOnlyUser?.forEach((user) => {
      if(user.idUser === idUserToEdit) {
        expect(user).toStrictEqual(newUserData);
      } else {
        expect(user).toBe(
          beforeUsersMap.get(user.idUser)
        );
      }
    })
    expect(usersAfterUpdateOnlyUser).toHaveLength(usersBeforeUpdateOnlyUser?.length ?? 0);
  });
});
