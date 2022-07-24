import React, { useRef, useState } from 'react';
import { TouchableOpacity, Text, View } from "react-native";
import Popover, { PopoverMode, PopoverPlacement } from 'react-native-popover-view';
import { Mode } from 'react-native-popover-view/dist/Types';

type PopoverProps = {
  text: string | React.ReactNode | React.ReactNode[];
  children: React.ReactNode | React.ReactNode[];
  width?: number;
  mode?: PopoverMode;
  placement?: PopoverPlacement;
  onFocus?: () => void;
}
const PopoverView = (Props: PopoverProps) => {
  const touchable = useRef();
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableOpacity ref={touchable} onPress={() => setOpen(true)}>
        {typeof Props.text === "string"
          ? <Text style={{color: "black", padding: 8}}>{Props.text}</Text>
          : Props.text
        }
      </TouchableOpacity>
      <Popover
        mode={Props.mode || PopoverMode.RN_MODAL}
        placement={Props.placement || PopoverPlacement.AUTO}
        from={touchable}
        isVisible={open}
        arrowShift={-0.7}
        // arrowSize={0}
        backgroundStyle={{ opacity: 0.5 }}
        popoverStyle={{ width: Props.width }}
        onOpenStart={() => Props.onFocus?.()}
        onRequestClose={() => setOpen(false)}>
        {Props.children}
      </Popover>
    </>
  );
}

export default PopoverView;
