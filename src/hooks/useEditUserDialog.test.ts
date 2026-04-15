import { renderHook, act } from "@testing-library/react";
import { useEditUserDialog } from "./useEditUserDialog";

const OLD_ROLE = "Engineer";
const createTestUser = () => ({
    idUser: 1,
    profile: {
      firstName: "ABC",
      lastName: "DEF",
    },
    role: OLD_ROLE,
});

const testUser = createTestUser();

describe("useEditUserDialog", () => {
    it("opens dialog and sets selected user", () => {
        const { result } = renderHook(() => useEditUserDialog());
        act(() => {
            result.current.editUserDialogActions.show(testUser);
        });
        expect(result.current.editUserDialogState.isOpen).toBe(true);
        expect(result.current.editUserDialogState.selectedUser).toEqual(testUser);
    });

    it("closes dialog and clears selected user", () => {
        const { result } = renderHook(() => useEditUserDialog());
        act(() => {
            result.current.editUserDialogActions.show(testUser);
            result.current.editUserDialogActions.close();
        });
        expect(result.current.editUserDialogState.isOpen).toBe(false);
        expect(result.current.editUserDialogState.selectedUser).toBeNull();
    });
});