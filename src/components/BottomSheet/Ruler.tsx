import React, { useState } from "react";

import { View } from "react-native";

import { BottomSheetCallback } from "../../store/bottomSheet";
import Button from "../Button";
import SlideRuler from "../SlideRuler";

const Ruler = (Props: { callback?: BottomSheetCallback; }) => {
  const [value, setValue] = useState(1000);

  return (<View style={{ flexDirection: "column", width: "100%", height: "100%" }}>
    <View style={{flex: 1, justifyContent: "center"}}>
      <SlideRuler value={value} onChange={setValue} />
    </View>
    <Button title="완료" onPress={() => Props.callback?.("is Ruler Callback!!") }/>
  </View>)
}

export default Ruler;
