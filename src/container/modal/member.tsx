import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Button from "Component/Button";
import Input from "Component/Input";
import { ScreenWidth } from "src/styles";
import Dropdown from "Component/Dropdown";
import { Member } from "DB/entities/member";

const Banks = [
  {name: "국민"},
  {name: "기업"},
  {name: "신한"},
  {name: "농협"},
  {name: "새마을금고"},
  {name: "우리"},
  {name: "수협"},
  {name: "하나"},
  {name: "산업"},
  {name: "SC제일"},
  {name: "카카오"},
]
const MemberModal = (Props: {
  callback: (data: any) => void;
  onClose: () => void;
  data?: Member | null;
}) => {
  const [name, setName] = useState<string|number>(Props.data?.name || "");
  const [bank, setBank] = useState<{name?: string}|null>(Props.data?.bank ? {name: Props.data.bank} : null);
  const [account, setAccount] = useState<string|number>(Props.data?.account ?? "");
  console.log("member modal", Props.data);

  return (<Pressable style={styles.centeredView} onPress={Props.onClose}>
    <Pressable style={styles.modalView} onPress={e => e.stopPropagation()}>
      <Text style={styles.label}>이름</Text>
      <Input
        style={{borderWidth: 0, borderRadius: 0}}
        containerStyle={{width:"100%", backgroundColor: "#EDEDED"}}
        placeholder="이름"
        value={name}
        onChangeText={setName} />

      <Text style={styles.label}>계좌번호</Text>
      <View style={{flexDirection:"row"}}>
        <Dropdown
          selected={bank}
          onChangeSelected={setBank}
          values={Banks} />
        <Input
          style={{borderWidth: 0, borderRadius: 0}}
          containerStyle={{width:"65%", marginBottom: 8, marginLeft:4, backgroundColor: "#EDEDED"}}
          placeholder="계좌번호"
          keyboardType="numeric"
          value={account}
          onChangeText={setAccount} />
      </View>

      <Text style={styles.saveWraning}>{Props.data?.id === -1 && "수정된 결과는 바로 저장됩니다."}</Text>
      <View style={{flexDirection:"row"}}>
        <Button
          round
          title="확인"
          style={{flex:1,marginLeft:20}}
          onPress={() => {
            const result = {
              ...Props.data,
              name,
              bank: bank?.name ? bank.name : null,
              account: account ?? null,
              description:
                bank?.name && account
                  ? `${bank?.name ? bank.name : null} | ${account ?? null}`
                  : bank?.name ? bank?.name : (account ?? null)
            };
            if (JSON.stringify(Props.data) !== JSON.stringify(result)) {
              Props.callback(result);
            }
            Props.onClose();
          }}
        />
      </View>
    </Pressable>
  </Pressable>);
}

const styles = StyleSheet.create({
  centeredView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalView: {
    width: ScreenWidth * 0.8,
    margin: 10,
    backgroundColor: "white",
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  label: {
    color: "#000000",
    alignSelf: "flex-start",
    marginBottom: 6,
    marginTop: 12,
  },
  saveWraning: {
    color: "#F8503E",
    marginBottom: 24,
  },
});

export default MemberModal;
