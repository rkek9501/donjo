import React, { useRef, useCallback, useMemo, useEffect, useState } from "react";

import {
  View,
  Text,
  BackHandler
} from "react-native";

import {
  BottomSheetTextInput
} from '@gorhom/bottom-sheet';
import { BottomSheetCallback } from "../../store/bottomSheet";
import Button from "../Button";


const Member = (Props: { callback?: BottomSheetCallback }) => {
  const [name, setName] = useState("");
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");

  return (<View>
    <Text>Awesome 🎉</Text>
    <BottomSheetTextInput
      placeholder="이름을 입력해주세요."
      value={name}
      onChangeText={(t) => setName(`${t}`)}
    />
    <BottomSheetTextInput
      placeholder="은행을 입력해주세요."
      value={bank}
      onChangeText={(t) => setBank(`${t}`)}
    />
    <BottomSheetTextInput
      placeholder="계좌번호를 입력해주세요."
      value={account}
      onChangeText={(t) => setAccount(`${t}`)}
    />
    <Button title="확인" onPress={() => Props.callback?.("is Member Callback!!") }/>
  </View>)
}

export default Member;
