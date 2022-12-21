import React from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import useModalStore from "../../store/modal";
import MemberModal from "./member";
import { ScreenWidth } from "src/styles";

const ModalContainer = () => {
  const modal = useModalStore((state: any) => state);
  const modalCallback = (response: any) => modal?.data?.callback?.(response) || null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal.isOpen}
      onRequestClose={modal.closeModal}
    > 
      <Pressable style={styles.centeredView} onPress={modal.closeModal}>
        <Pressable style={styles.modalView} onPress={e => e.stopPropagation()}>
        {modal.data?.type === "member"
          && <MemberModal
          data={modal.data?.data}
          onClose={modal.closeModal}
          callback={modalCallback} />
        }
        </Pressable>
      </Pressable>
    </Modal>
  );
};

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
    // margin: 10,
    backgroundColor: "white",
    // padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 12,
  },
//   centeredView: {
//     position: "absolute",
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.7)",
//   },
});

export default ModalContainer;
