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
            result.current.showEditUserDialog(testUser);
        });
        expect(result.current.isOpenEditUserDialog).toBe(true);
        expect(result.current.selectedUserEditUserDialog).toEqual(testUser);
    });

    it("closes dialog and clears selected user", () => {
        const { result } = renderHook(() => useEditUserDialog());
        act(() => {
            result.current.showEditUserDialog(testUser);
            result.current.closeEditUserDialog();
        });
        expect(result.current.isOpenEditUserDialog).toBe(false);
        expect(result.current.selectedUserEditUserDialog).toBeNull();
    });
});