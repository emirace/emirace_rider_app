import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useCallback } from "react";

const Backdrop: React.FC<BottomSheetBackdropProps> = useCallback(
  (props) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      pressBehavior="none"
    />
  ),
  []
);
export default Backdrop;
